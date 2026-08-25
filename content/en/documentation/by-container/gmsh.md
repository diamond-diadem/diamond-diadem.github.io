---
title: How to use Gmsh Apptainer image?
linkTitle: Gmsh tutorial
weight: 1
description: "Tutorial on using the DIAMOND Gmsh Apptainer container: pulling the image and usage example on a simple geometry with both CLI and GUI."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **gmsh.sif** image [available here](/en/codes/scientific-computing/gmsh/)
- Have downloaded the **input files** [available here](/downloads/gmsh-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a Gmsh input file is available in the form of an archive via [this link](/downloads/gmsh-tutorial-inputs.tar.gz). This file contains a Gmsh script defining a mesh on a simple rectangular 2D geometry. It corresponds to the first tutorial example from the Gmsh [official documentation](https://gmsh.info/doc/texinfo/gmsh.html#Gmsh-tutorial), titled *Geometry basics, elementary entities, physical groups*.

In this tutorial, we will assume that the input file contained in this archive is in the current directory. To extract it:

```bash
tar -xzf gmsh-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to run the input script in the case where the current directory contains the `gmsh.sif` container image and all necessary Gmsh input files:

```bash
apptainer exec gmsh.sif gmsh t1.geo -2
```

## Detailed usage for the Gmsh container

This section presents different ways to use the Gmsh image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

Gmsh is an open-source 3D finite element mesh generator.

The main executable in the image is the `gmsh` executable. The software version embedded in the image can be displayed with the following command:

```bash
apptainer exec gmsh.sif gmsh --version
```

The input file `t1.geo` presented above contains a Gmsh script that defines a simple rectangular 2D geometry. Interested readers are invited to read this script for more insight on Gmsh scripting syntax.

### Using Gmsh command line interface to generate and visualize a mesh

The following command runs Gmsh with the input script `t1.geo` and generates a mesh file named `t1.msh`:

```shell
apptainer exec gmsh.sif gmsh t1.geo -2
```

The result mesh can then be visualized through Gmsh graphical interface with the following command:

```shell
apptainer exec gmsh.sif gmsh t1.msh
```

<img alt="2D mesh on a rectangle surface" src="/images/tutorials/gmsh-tutorial/simple_mesh.png" />


### Using Gmsh graphical user interface to generate and visualize a mesh

Gmsh software also features a graphical user interface (GUI) that can be alternatively used to run the input script. First, the input script needs to be imported by Gmsh. The following command opens the graphical interface:

```shell
apptainer exec gmsh.sif gmsh
```

The `t1.geo` input file can then be imported with the *File->Open* button (or *Ctrl/Command+O*), which displays the imported geometry.

<img alt="Imported geometry displayed by Gmsh GUI" src="/images/tutorials/gmsh-tutorial/imported_geo.png" />

Alternatively, the script can be directly loaded when opening Gmsh GUI with the following command:

```shell
apptainer exec gmsh.sif gmsh t1.geo
```

Once the geometry is imported, it can be simply meshed with the *Mesh->2D* button. The resulting mesh can eventually be saved in a `t1.msh` file with the *File->Save Mesh* button.

### Using Gmsh graphical interface to modify a mesh

The *Mesh* module of the GUI features a comprehensive set of tools to customize the generated mesh. This section quickly introduces two of them: *Refine by splitting* and *Partition*.

Starting with the mesh generated in the previous section, the *Refine by splitting* button refines the mesh by splitting it uniformly into a finer mesh.

<img alt="Refined mesh" src="/images/tutorials/gmsh-tutorial/fine_mesh.png" />

This mesh can then be saved in the same way as presented earlier.

The second tool is the *Partition* tool. It uses an external library called METIS to split the mesh into multiple smaller meshes. Those meshes are then ready to be used with domain decomposition methods. The following figure shows the previously generated mesh split in 5 parts.

<img alt="Refined mesh partitionned in 5 sub-meshes" src="/images/tutorials/gmsh-tutorial/mesh_split.png" />

### To go further

The official documentation of Gmsh features many more tutorials to introduces the software tools and features. The interested reader may find this list [here](https://gmsh.info/doc/texinfo/gmsh.html#Gmsh-tutorial). The commands used in the present tutorial to run Gmsh from the container image can be easily extrapolated to run those additional examples.  

</div>
