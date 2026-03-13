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

### Retrieve the Apptainer image

```bash
apptainer pull amitex-fftp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp-from-guix.sif:latest
```

<div align="justify">

**AMITEX_FFTP** is a **distributed** solver based on **FFTs** for **non-linear** mechanical simulations on **heterogeneous unit-cells** (described by regular 3D images). **AMITEX_FFTP** can be run either on individual PC, local clusters or on large **High Performance Computing** platforms to perform large scale simulations.

The code combines **massively parallel implementation** with a **versatile user interface** :

- various complex geometries,
- various loadings conditions,
- various behavior laws (user defined),
- small strain and finite strain simulations,
- possiblity to finely tune the outputs.

### Main content of the image:

- **amitex_fftp** : /gnu/store/kvj82gw5j78zrmpwfb16wx0fl71v9fsb-amitex_fftp-8.17.14/bin/amitex_fftp
- **LICENCE_AMITEX.pdf** : /gnu/store/kvj82gw5j78zrmpwfb16wx0fl71v9fsb-amitex_fftp-8.17.14/share/doc/amitex_fftp-8.17.14/LICENCE_AMITEX.pdf
- **gnuplot** : /gnu/store/gghd7a7wmcqrjir0r2kl5xb2gkcdq3iz-gnuplot-6.0.1/bin/gnuplot
- **mfront** : /gnu/store/m51plz005xw9g3n9zi9rbrxzsy6ix7qp-mfront-TFEL-4.2.1/bin/mfront

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/amitex" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">AMITEX_FFTP documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://amitexfftp.github.io/AMITEX/index.html" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://amitexfftp.github.io/AMITEX/user_guide/map-site-user.html" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Content to be added" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
