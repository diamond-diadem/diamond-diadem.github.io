---
title: How to use Neper Apptainer image?
linkTitle: Neper tutorial
weight: 4
description: "Tutorial on using the DIAMOND Neper Apptainer container: pulling the image, running calculations, and usage example on a simple tesselation mesh generation."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **neper.sif** image [available here](/en/codes/scientific-computing/neper/)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}

## Detailed usage for the Neper container

This section explains how to use the Neper image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

Neper is a software for modeling and simulating polycrystalline materials, generating and analyzing 2D/3D grain microstructures via Voronoi tessellations and experimental data meshing. It's a robust, efficient tool widely used by materials scientists for grain boundary, texture, and finite element analysis of polycrystals.

The main executable in the image is `neper`. The software version embedded in the container image can be displayed with the following command: 

```bash
apptainer exec neper.sif neper --version
```

The code license can be found under the following path: `/share/doc/neper-xx.xx.xx/COPYING` where `xx.xx.xx` is the software version. It can be accessed from outside the container as follows:

```bash
neper_version=$(apptainer exec neper.sif neper --version)
apptainer exec neper.sif cat /share/doc/neper-$neper_version/COPYING
```

The image also contains other useful executables, such as `gmsh` for mesh generation, or `povray` and `asy` for image generation.

### Using the Neper container to generate and mesh a simple tessellation

The Neper executable within the `neper.sif` container image can be interacted with by simply adding the `apptainer exec neper.sif` command before a `neper` command. To illustrate this, let us consider the following [tutorial](https://neper.info/doc/tutorials/simple_model.html) from the official documentation. A simple 100-cell tessellation can be generated as follows:

```bash
apptainer exec neper.sif neper -T -n 100
```

This tessellation can be visualized through the following command that generates a PNG file name `img1.png` that should look like the image represented in the tutorial:

```bash
apptainer exec neper.sif neper -V n100-id1.tess -print img1
```

It can be meshed with the following command:

```bash
apptainer exec neper.sif neper -M n100-id1.tess
```

The mesh can be visualized through the following command that generates a PNG file name `img2.png` that, again, should look like the meshed image represented in the tutorial:

```bash
apptainer exec neper.sif neper -V n100-id1.tess,n100-id1.msh -print img2
```

The rest of the commands exposed in the tutorial can be similarly extrapolated from these examples.

</div>
