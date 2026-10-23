"""Pixel-exact dark-mode variants of light-background figures.

Every pixel is recoloured in place (geometry is untouched):
- anti-aliased pixels are unmixed into the two colours they blend (e.g. a
  line and the fill behind it), each recoloured on its own, so edges keep
  no halo of the light background;
- neutral colours (background, text, axes, grids, pastel fills) get their
  OKLab lightness inverted onto the site's dark palette;
- saturated colours (data, colormaps) are kept exactly;
- the result is un-matted against the dark background, so the figure is
  transparent and composites back exactly onto #2c2c2c.

Usage (requires numpy, scipy and pillow):

    python3 scripts/darken-figures.py static/images/notebooks/ml-training/*-light.png

Each `<name>-light.png` gets a `<name>-dark.png` next to it. Pages swap them
with the `swap-image` SCSS mixin.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import maximum_filter

# $body-bg-dark and $body-color-dark (hsl(224, 6%, 85%)) from
# assets/scss/common/_variables-custom.scss
BG = np.array([0x2C, 0x2C, 0x2C]) / 255
TEXT = np.array([213.4, 215.5, 220.6]) / 255

# Per-figure tuning, keyed by figure name (without -light):
# - c0/c1: chroma range over which pixels go from inverted to kept
#   (lower for colormaps whose dark, low-chroma end must be preserved);
# - cleartype: where sub-pixel anti-aliased text must be turned back into
#   greyscale anti-aliasing;
# - invert: where every pixel is inverted, whatever its chroma (pastel
#   diagram fills holding dark text, translucent legends over data).
# Regions are True for the whole image or a list of (left, top, right, bottom).
CONFIG = {
    "workflow-overview": dict(cleartype=True, invert=True),
    "causal-discovery-graph": dict(invert=True),
    "regression-models-comparison": dict(cleartype=True),
    "cdse-spectrum-prediction": dict(cleartype=[(0, 0, 1133, 195)]),
    "correlation-heatmap": dict(c0=0.02, c1=0.05),
    "bayesian-optimization-uncertainty": dict(c0=0.02, c1=0.05, invert=[(89, 440, 274, 487)]),
    "autoencoder-architecture": dict(invert=[(671, 0, 798, 45), (673, 51, 852, 99), (993, 0, 1410, 105), (785, 666, 1418, 720)]),
}


def srgb_to_lin(c):
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def lin_to_srgb(c):
    c = np.clip(c, 0, 1)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


M1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929],
               [0.2119034982, 0.6806995451, 0.1073969566],
               [0.0883024619, 0.2817188376, 0.6299787005]])
M2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468],
               [1.9779984951, -2.4285922050, 0.4505937099],
               [0.0259040371, 0.7827717662, -0.8086757660]])
M1_INV, M2_INV = np.linalg.inv(M1), np.linalg.inv(M2)


def to_oklab(rgb):
    return np.cbrt(srgb_to_lin(rgb) @ M1.T) @ M2.T


def _oklab_to_lin(lab):
    return ((lab @ M2_INV.T) ** 3) @ M1_INV.T


def _in_gamut(lin):
    return np.all((lin >= -1e-6) & (lin <= 1 + 1e-6), axis=-1)


def from_oklab(lab):
    """OKLab -> sRGB, reducing chroma (not clipping channels) to stay in gamut."""
    lo = np.zeros(lab.shape[:-1])
    hi = np.ones(lab.shape[:-1])
    for _ in range(16):
        mid = (lo + hi) / 2
        trial = lab.copy()
        trial[..., 1:] *= mid[..., None]
        inside = _in_gamut(_oklab_to_lin(trial))
        lo = np.where(inside, mid, lo)
        hi = np.where(inside, hi, mid)
    scale = np.where(_in_gamut(_oklab_to_lin(lab)), 1.0, lo)
    out = lab.copy()
    out[..., 1:] *= scale[..., None]
    return lin_to_srgb(_oklab_to_lin(out))


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def region_mask(shape, boxes):
    """True for the whole image, or a list of (left, top, right, bottom) boxes."""
    if boxes is True:
        return np.ones(shape, dtype=bool)
    mask = np.zeros(shape, dtype=bool)
    for left, top, right, bottom in boxes:
        mask[top:bottom, left:right] = True
    return mask


def remove_cleartype(rgb, box):
    """Turn sub-pixel text anti-aliasing into greyscale anti-aliasing.

    Only pixels touching dark ink are affected. Each channel's coverage is
    measured against the local backdrop (the brightest nearby colour, i.e.
    white or the node/plot fill the text sits on) and averaged, so fringes
    become plain blends of the backdrop and black.
    """
    # thin sub-pixel strokes are never dark in all channels, so use luminance
    ink = rgb @ np.array([0.2126, 0.7152, 0.0722]) < 0.55
    near_ink = maximum_filter(ink, size=(7, 11))  # fringes spread horizontally
    near_ink &= region_mask(near_ink.shape, box)
    backdrop = np.stack([maximum_filter(rgb[..., c], size=7) for c in range(3)], axis=-1)
    cover = np.clip(1 - rgb / np.maximum(backdrop, 1e-6), 0, 1).mean(axis=-1, keepdims=True)
    grey = backdrop * (1 - cover)
    return np.where(near_ink[..., None], grey, rgb)


def most_vivid(rgb, chroma, size=5):
    """Colour of the most saturated pixel in each size x size window."""
    h, w = chroma.shape
    r = size // 2
    pad_k = np.pad(chroma, r, mode="edge")
    pad_rgb = np.pad(rgb, ((r, r), (r, r), (0, 0)), mode="edge")
    best_k, best = chroma.copy(), rgb.copy()
    for dy in range(size):
        for dx in range(size):
            k = pad_k[dy:dy + h, dx:dx + w]
            up = k > best_k
            best_k = np.where(up, k, best_k)
            best = np.where(up[..., None], pad_rgb[dy:dy + h, dx:dx + w], best)
    return best


def best_partner(rgb, vivid, size=5, tol=0.04):
    """Far end of the blend between `vivid` and each pixel.

    Among the neighbours that, blended with `vivid`, reproduce the pixel
    within `tol`, keep the one farthest from `vivid` (the backdrop rather
    than another anti-aliased pixel of the same edge). Returns that colour,
    the blend factor t (share of `vivid`) and whether a fit was found.
    """
    h, w = rgb.shape[:2]
    r = size // 2
    pad_rgb = np.pad(rgb, ((r, r), (r, r), (0, 0)), mode="edge")
    best_span2 = np.full((h, w), 0.01)  # ignore partners too close to vivid
    best_c, best_t = rgb.copy(), np.ones((h, w, 1))
    for dy in range(size):
        for dx in range(size):
            c = pad_rgb[dy:dy + h, dx:dx + w]
            span = vivid - c
            span2 = (span ** 2).sum(axis=-1, keepdims=True)
            t = np.clip(((rgb - c) * span).sum(axis=-1, keepdims=True) / np.maximum(span2, 1e-9), 0, 1)
            err = np.linalg.norm(rgb - (c + t * span), axis=-1)
            better = (err < tol) & (span2[..., 0] > best_span2)
            best_span2 = np.where(better, span2[..., 0], best_span2)
            best_c = np.where(better[..., None], c, best_c)
            best_t = np.where(better[..., None], t, best_t)
    return best_c, best_t, best_span2 > 0.01


def darken(img, c0=0.04, c1=0.10, cleartype=None, invert=None):
    rgba = np.asarray(img.convert("RGBA"), dtype=np.float64) / 255
    a = rgba[..., 3:4]
    rgb = rgba[..., :3] * a + (1 - a)  # flatten onto white, as displayed in light mode
    if cleartype:
        rgb = remove_cleartype(rgb, cleartype)

    bg_lab, text_lab = to_oklab(BG), to_oklab(TEXT)
    keep_all = np.ones(rgb.shape[:2], dtype=bool)
    if invert:
        keep_all &= ~region_mask(rgb.shape[:2], invert)

    def recolour(colours):
        """Map pure colours: saturated ones are kept, neutral ones inverted
        (white -> background, black -> text colour, linear in between)."""
        lab = to_oklab(colours)
        chroma = np.hypot(lab[..., 1], lab[..., 2])
        w = (smoothstep(c0, c1, chroma) * keep_all)[..., None]
        inv_lab = bg_lab + (1 - lab[..., :1]) * (text_lab - bg_lab)
        inv_lab[..., 1:] += lab[..., 1:]
        return w * colours + (1 - w) * from_oklab(inv_lab), chroma

    out, chroma = recolour(rgb)

    # Anti-aliased pixels are blends of two neighbouring colours (a line and
    # the fill or background behind it). Unmix each pixel between the most
    # saturated colour around it and the backdrop it is blended with, and
    # recolour both separately, so edges between a kept and an inverted
    # colour leave no halo. Nearly pure pixels are left as they are.
    vivid = most_vivid(rgb, chroma)
    partner, t, found = best_partner(rgb, vivid)
    vivid_out, _ = recolour(vivid)
    partner_out, _ = recolour(partner)
    unmixed = t * vivid_out + (1 - t) * partner_out
    mix = found[..., None] * (1 - smoothstep(0.8, 0.95, t))
    out = mix * unmixed + (1 - mix) * out

    # un-matte against BG ("colour to alpha") so the page background shows through
    diff = out - BG
    alpha = np.where(diff >= 0, diff / (1 - BG), -diff / BG).max(axis=-1, keepdims=True)
    fg = np.where(alpha > 1e-6, BG + diff / np.maximum(alpha, 1e-6), 0)

    res = np.concatenate([fg, alpha], axis=-1)
    return Image.fromarray(np.round(np.clip(res, 0, 1) * 255).astype(np.uint8), "RGBA")


if __name__ == "__main__":
    for path in map(Path, sys.argv[1:]):
        name = path.stem.removesuffix("-light")
        dst = path.with_name(f"{name}-dark.png")
        darken(Image.open(path), **CONFIG.get(name, {})).save(dst, optimize=True)
        print(dst)
