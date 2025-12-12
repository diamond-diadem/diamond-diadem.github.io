
# Contributing to the DIAMOND website

## Markdown

### Syntax References

- [**Basics**](https://getdoks.org/docs/reference/markdown-basic-syntax/)
- [**Advanced**](https://getdoks.org/docs/reference/markdown-extended-syntax/)

### Math Support

The website supports `$...$` delimiters for LaTeX syntax in inline math. For block equations, use the following format:

```markdown
$$
(...)
$$
```

## YouTube Video Integration (Tutorials)

To integrate a YouTube video, use the custom Diamond shortcode:

```markdown
{{< video-with-consent id="{video-id}" >}}
```

Replace `{video-id}` with the YouTube video ID. To obtain this ID, go to the YouTube video page, click the "Share" button, and copy the link of the form `https://youtu.be/{video-id}`.

### Features of the Shortcode

- Maintains a fixed aspect ratio (48:27) with 100% width for optimal adaptability.
- Enables privacy-enhanced mode via `youtube-no-cookie.com`.
- Integrates cookie consent management (if configured in `config/`).
- Automatically adapts subtitles to match the page language.

## Links

To include links in Markdown, use the following syntax:

```markdown
[Link text](URL)
```

### Opening Links in a New Tab

To open a link in a new tab, use the following HTML syntax:

```html
<a href="https://example.com" target="_blank">Example</a>
```

The `target="_blank"` attribute ensures the link opens in a new tab.

### Internal Links

For internal links within the website, include only the part of the URL after the website's main address.

Example: To link to `https://diamond-diadem.github.io/en/codes/visualisation/paraview/`, use:

```markdown
[ParaView](/en/codes/visualisation/paraview/)
```

## Images

Place the image you want to add (e.g., `image.png`) in the `static/images/` folder in the site's source directory.

The basic Markdown syntax to embed an image is:

```markdown
![Alternative text for the image](/images/image.png)
```

In HTML, use:

```html
<img alt="Alternative text for the image" src="/images/image.png"/>   
```

### Adapting Images for Light/Dark Themes

If an image needs to adapt to light and dark themes, create two files: `image-light.png` and `image-dark.png` in `static/images`.

Then use:

```html
<img alt="Alternative text for the image" class="custom-image">
```

Add this code in `assets/scss/_custom.scss`:

```scss
.custom-image {
    content: url(/images/image-light.png);
}
@include color-mode(dark) {
    .custom-image {
        content: url(/images/image-dark.png);
    }
}
```

This ensures the image automatically adapts to the user's chosen theme.

## Codes section

### Generate a new code page

Use the interactive generator to scaffold code pages that follow the standard layout used under `content/<lang>/codes/*`.

1. Run `npm run new:code`.
2. Answer the prompts: category (`scientific-computing` or `visualisation`) via `s`/`v`, official website and documentation URLs, apptainer filename on the container registry, and a description of the code in both English and French. Multiline answers end with a single `.` line.
3. The tool  refreshes the Codes section landing page table/selects automatically.

Undo the most recent run with `npm run new:code -- --undo`.

Custom logos/icons are to be added manually; in practice this task is generally handled by the website administrator after your Markdown changes are done.
