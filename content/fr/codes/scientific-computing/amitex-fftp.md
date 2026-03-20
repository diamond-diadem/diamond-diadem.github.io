---
title: AMITEX_FFTP
title_visible: false
linkTitle: AMITEX_FFTP
icon: icon-amitex-fftp
toc: false
weight: 20
---

<a href="https://amitexfftp.github.io/AMITEX/index.html" target="_blank" class="codes-pages-top-logo">
    <img alt="Abinit" class="logo-amitex">
</a>

### Récupérez l'image Apptainer

```bash
apptainer pull amitex_fftp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp-from-guix.sif:latest
```

<div align="justify">

**AMITEX_FFTP** est un solveur **distribué** basé sur les **FFT** pour la simulation mécanique **non linéaires** sur des **cellules unitaires hétérogènes** (décrites par des images 3D régulières). **AMITEX_FFTP** peut être utilisé aussi bien sur un ordinateur personnel, sur des clusters locaux que sur de grandes plateformes de **calcul haute performance (HPC)** afin de réaliser des simulations à grande échelle.

Le code combine une **implémentation massivement parallèle** avec une **interface utilisateur polyvalente** permettant de réaliser des simulations avec :

- des géométries complexes,
- diverses conditions de chargement,
- diverses lois de comportement (définies par l'utilisateur),
- petites déformations et grandes déformations,
- possibilité d’ajuster finement les sorties (résultats).

### Contenu principal de l'image

- **amitex_fftp** : `/gnu/store/df6rv9zlllzrp8rrwxlc5ixf20kylmnf-amitex_fftp-8.17.14/bin/amitex_fftp`

```
     ├── openmpi
     └── fftw
```

- **LICENCE_AMITEX.pdf** : `/gnu/store/df6rv9zlllzrp8rrwxlc5ixf20kylmnf-amitex_fftp-8.17.14/share/doc/amitex_fftp-8.17.14/LICENCE_AMITEX.pdf`
- **gnuplot** : `/gnu/store/gghd7a7wmcqrjir0r2kl5xb2gkcdq3iz-gnuplot-6.0.1/bin/gnuplot`
- **mfront** : `/gnu/store/m51plz005xw9g3n9zi9rbrxzsy6ix7qp-mfront-TFEL-4.2.1/bin/mfront`

```
     ├── gcc
     └── g++
```

- **gfortran** : `/gnu/store/7c98v6yhp4kwga380y9jjg1pf5cicxvd-gfortran-toolchain-14.3.0/bin/gfortran`

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/amitex" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation AMITEX_FFTP</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="<https://amitexfftp.github.io/AMITEX/index.html>" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="<https://amitexfftp.github.io/AMITEX/user_guide/map-site-user.html>" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/amitex-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
