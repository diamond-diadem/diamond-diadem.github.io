---
title: Description du pipeline de débruitage Raman
linkTitle: Description
toc: false
description: "Description du pipeline de débruitage Noise2Noise pour la spectroscopie Raman haut débit, développé dans le cadre du projet DIAMOND."
---

<div align="center">

<img src="/images/news/raman-denoising-article/denoiser-wide.png" alt="Pipeline de débruitage Noise2Noise : spectre Raman bruité → auto-encodeur convolutif 1D → spectre débruité" class="img-denoiser-wide" style="max-width: 100%;">

</div>

<br/>

L'intelligence artificielle et le deep learning sont au cœur de l'expertise de DIAMOND au service de la communauté PEPR DIADEM. Ce workflow illustre cette expertise appliquée à la caractérisation expérimentale : un pipeline de débruitage pratique basé sur le deep learning et l'approche Noise2Noise pour la spectroscopie Raman haut débit, développé dans le cadre du projet DIAMOND en collaboration avec la [plateforme LIBELUL](https://www.pepr-diadem.fr/projet/libelul/). L'approche repose sur un auto-encodeur convolutif 1D léger entraîné de manière auto-supervisée par deep learning, ne nécessitant ni bibliothèque spectrale externe ni spectres de référence à rapport signal/bruit élevé. Le pipeline permet un gain de temps d'environ 65× sur l'ensemble du flux de travail, tout en préservant la fidélité spectrale et la discrimination de phase.

La méthode et sa validation sont décrites dans :

- [A Practical Noise2Noise Denoising Pipeline for High-Throughput Raman Spectroscopy](https://doi.org/10.1002/adem.71032), *Advanced Engineering Materials* (2026)

Le code du pipeline est disponible en open source sur :

- [GitHub](https://github.com/diamond-diadem/diamond-dae-pipeline)
- [Zenodo](https://doi.org/10.5281/zenodo.18154207)

Les spectres Raman bruts ayant servi à l'entraînement et à l'évaluation du pipeline sont disponibles en accès libre sur [Zenodo](https://doi.org/10.5281/zenodo.18244161).
