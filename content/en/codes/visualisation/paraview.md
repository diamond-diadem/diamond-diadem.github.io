---
title: ParaView
title_visible: false
linkTitle: ParaView
icon: icon-paraview
toc: false
weight: 2
---

<a href="https://www.paraview.org/" target="_blank" class="codes-pages-top-logo">
    <img alt="ParaView" class="logo-paraview"/>
</a>

### Retrieve the Apptainer image

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

<div align="justify">

ParaView is an open-source software dedicated to the visualization and analysis of scientific data. It provides a powerful platform for 3D visualization, manipulation of large datasets, and the creation of interactive images. Primarily developed for applications in engineering, physics, and earth sciences, ParaView supports various data formats, including meshes, point clouds, and structured datasets.

This software is built on a modular architecture, allowing users to customize their workflows by integrating modules and extensions specific to their needs. ParaView offers advanced filtering, rendering, and analysis tools, facilitating in-depth exploration of complex data. It is compatible with multiple operating systems and can be used for both academic research and industrial projects requiring sophisticated scientific visualization.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/paraview" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">ParaView documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.paraview.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://www.paraview.org/resources/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/paraview-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
