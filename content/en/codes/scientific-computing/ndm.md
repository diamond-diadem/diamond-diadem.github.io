---
title: NDM
title_visible: false
linkTitle: NDM
icon: icon-ndm
toc: false
weight: 21
---

<a href="https://github.com/jpcroc/NDM" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-ndm" aria-hidden="true"></span>
</a>

### Retrieve the Apptainer image

```bash
apptainer pull ndm.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ndm.sif:latest
```

<div align="justify">

**NDM** is a **distributed** Fortran code for empirical potential molecular dynamics computations.

</div>

### Main content of the image

**NDM** main executable: `/bin/rundm90_ndm_mpi`

This image of **NDM** is built using **MKL** Intel libraries and **GNU** compilers.

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/ndm" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">NDM documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://github.com/jpcroc/NDM" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://github.com/jpcroc/NDM" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/ndm-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}

