---
title: Raman Denoising Pipeline Description
linkTitle: Description
toc: false
description: "Description of the Noise2Noise-based denoising pipeline for high-throughput Raman spectroscopy developed within the DIAMOND project."
---

<div align="center">

<img src="/images/news/raman-denoising-article/denoiser-wide.png" alt="Noise2Noise denoising pipeline: noisy Raman spectrum → 1D convolutional autoencoder → denoised spectrum" class="img-denoiser-wide" style="max-width: 100%;">

</div>

<br/>

This workflow provides a practical Noise2Noise denoising pipeline for high-throughput Raman spectroscopy, developed within the DIAMOND project in collaboration with the [LIBELUL platform](https://www.pepr-diadem.fr/projet/libelul-en/). It relies on a lightweight one-dimensional convolutional autoencoder trained using a self-supervised strategy, requiring neither external spectral libraries nor high signal-to-noise reference spectra. The pipeline achieves an effective workflow speedup of approximately 65× while preserving spectral fidelity and phase discrimination.

The method and its validation are described in:

- [A Practical Noise2Noise Denoising Pipeline for High-Throughput Raman Spectroscopy](https://doi.org/10.1002/adem.71032), *Advanced Engineering Materials* (2026)

The pipeline code is openly available on:

- [GitHub](https://github.com/diamond-diadem/diamond-dae-pipeline)
- [Zenodo](https://doi.org/10.5281/zenodo.18154207)

The raw Raman spectra used to train and evaluate the pipeline are openly available on [Zenodo](https://doi.org/10.5281/zenodo.18244161).
