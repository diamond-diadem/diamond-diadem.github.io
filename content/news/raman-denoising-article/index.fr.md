---
title: "Article publié - Débruitage Raman Noise2Noise"
summary: "A Practical Noise2Noise Denoising Pipeline for High-Throughput Raman Spectroscopy · Advanced Engineering Materials"
eventDate: "23 juillet 2026"
cardImage: "card.png"
weight: 25
toc: false
---

## A Practical Noise2Noise Denoising Pipeline for High-Throughput Raman Spectroscopy

{{< figure src="images/news/raman-denoising-article/denoiser-wide.png" alt="Pipeline de débruitage Noise2Noise : spectre Raman bruité → auto-encodeur convolutif 1D → spectre débruité" width="wide" >}}

L'article a été publié en ligne et en accès ouvert par *Advanced Engineering Materials* (Wiley). Il présente un pipeline de débruitage pratique basé sur l'approche Noise2Noise pour la spectroscopie Raman haut débit, développé dans le cadre d'une collaboration du projet DIAMOND avec la plateforme [LIBELUL](https://www.pepr-diadem.fr/projet/libelul/). L'approche repose sur un auto-encodeur convolutif 1D léger entraîné de manière auto-supervisée, ne nécessitant ni bibliothèque spectrale externe ni spectres de référence à rapport signal/bruit élevé. Le pipeline permet un gain de temps d'environ 65× sur l'ensemble du flux de travail, tout en préservant la fidélité spectrale et la discrimination de phase.

Le code du pipeline est disponible en open source sur [Zenodo](https://doi.org/10.5281/zenodo.18154207).

Accédez à [l'article publié](https://doi.org/10.1002/adem.71032).
