---
title: "Raman Denoising Pipeline"
weight: 5
summary: "Noise2Noise denoising pipeline for high-throughput Raman spectroscopy"
description: "Description of the Noise2Noise-based denoising pipeline for high-throughput Raman spectroscopy developed within the DIAMOND project."
tablerIcon: tabler-icons/outline/wave-sine
toc: false
aliases:
  - /workflows/raman-denoising/description/
---

<div align="center">

<img src="/images/news/raman-denoising-article/denoiser-wide.png" alt="Noise2Noise denoising pipeline: noisy Raman spectrum → 1D convolutional autoencoder → denoised spectrum" class="img-denoiser-wide" style="max-width: 100%; margin-top: 1.5rem; margin-bottom: 1.5rem;">

</div>

<br/>

Artificial intelligence is core to DIAMOND's expertise for the PEPR DIADEM community. This workflow illustrates that expertise applied to experimental characterization: a practical Noise2Noise deep learning pipeline for denoising high-throughput Raman spectroscopy data, developed within the DIAMOND project in collaboration with the [LIBELUL platform](https://www.pepr-diadem.fr/projet/libelul-en/). It relies on a lightweight one-dimensional convolutional autoencoder trained using a self-supervised deep learning strategy, requiring neither external spectral libraries nor high signal-to-noise reference spectra. The pipeline achieves an effective workflow speedup of approximately 65× while preserving spectral fidelity and phase discrimination.

The method and its validation are described in:

- [A Practical Noise2Noise Denoising Pipeline for High-Throughput Raman Spectroscopy](https://doi.org/10.1002/adem.71032), *Advanced Engineering Materials* (2026)

The pipeline code is openly available on:

- [GitHub](https://github.com/diamond-diadem/diamond-dae-pipeline)
- [Zenodo](https://doi.org/10.5281/zenodo.18154207)

The raw Raman spectra used to train and evaluate the pipeline are openly available on [Zenodo](https://doi.org/10.5281/zenodo.18244161).
