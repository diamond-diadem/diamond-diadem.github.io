---
title: How to use FreeFEM Apptainer image?
linkTitle: FreeFEM tutorial
weight: 6
description: "Tutorial on using the DIAMOND FreeFEM Apptainer container: pulling the image, running calculations, and usage examples for simple equations resolution."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **freefem.sif** image [available here](/en/codes/scientific-computing/freefem/)
- Have downloaded the **input files** [available here](/downloads/freefem-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of FreeFEM input files is available in the form of an archive via [this link](/downloads/freefem-tutorial-inputs.tar.gz).

Those files correspond to two tutorial examples from the FreeFEM official documentation:

- `poisson.edp`: A FreeFEM [sequential example](https://doc.freefem.org/examples/misc.html#poisson-s-equation) input file to solve the Poisson equation on a basic L-shaped geometry with mesh adaptation and graphic visualization,
- `MPIGMRES2D.edp`: A FreeFEM [parallel example](https://doc.freefem.org/examples/parallelization.html#mpi-gmres-2d) input file solving a Poisson-type problem on a unit square using domain decomposition.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf freefem-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a parallel FreeFEM computation on `N` cores using the container image in the case where the current directory contains the `freefem.sif` container image and all necessary FreeFEM input files:

```bash
apptainer exec freefem.sif ff-mpirun -np N MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

## Detailed usage for the FreeFEM container

This section presents different ways to use the FreeFEM image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

FreeFEM is an open-source software package for solving partial differential equations using the finite element method, with a dedicated scripting language for defining geometries, meshes, and solvers. It supports a wide range of finite elements, adaptive mesh generation, and parallel computing (via PETSc, HPDDM, and more), running on Windows, macOS, and Linux.

The main sequential executable in the image is `FreeFem++`. The parallel (MPI) executable is `FreeFem++-mpi`. It can be run with both the hybrid and embedded Apptainer parallel modes (see [this page](/en/documentation/use/apptainer-hpc) for more details on those modes). The image also contains a shortcut executable to `FreeFem++-mpi` called `ff-mpirun` that can only be called from within the container (embedded mode only). Hence, the following commands are equivalent:

```bash
apptainer exec freefem.sif mpirun -np N FreeFem++-mpi # Parallel executable
apptainer exec freefem.sif ff-mpirun -np N # Shortcut parallel executable
```

The software license can be found under the following path: `/share/doc/freefem-4.14/LICENSE.md`, and can be accessed from outside the container as follows:

```bash
apptainer exec freefem.sif cat /share/doc/freefem-4.14/LICENSE.md
```

### Using the FreeFEM container for sequential runs

The input file `poisson.edp` solves the Poisson equation on an L-shaped geometry for a given set of boundary conditions. The system is solved sequentially using a conjugate gradient solver. A mesh adaption loop of $10$ iterations is performed. At each loop, the mesh is adapted based on the error field of the previous solution and a new solution is computed and plot on the current mesh. 

To run this simulation:

```bash
apptainer exec freefem.sif FreeFem++ poisson.edp
```

An interactive window is automatically opened to visualize the result meshes and solutions. Here are some useful keys to interact with these plots:

- `p` and `Enter` keys display the previous and next plot respectively,
- `f` key switches between "iso fill" and "iso lines" modes,
- `v` key displays the legend,
- `?` key prompts a help window.

Images of the expected final mesh and solution are available on the [official documentation](https://doc.freefem.org/examples/misc.html#poisson-s-equation).

### Using the FreeFEM container for parallel runs

The input file `MPIGMRES2D.edp` solves a Poisson-type problem on a unit square, decomposed into overlapping subdomains, in parallel using MPI. The domain is first partitioned with METIS, then an overlapping mesh and a partition of unity are built automatically to exchange data between neighboring subdomains. The linear system is then solved with a GMRES algorithm preconditioned by a one-level additive Schwarz method (`-gmres 2`). The `-k` argument controls the refinement applied to each subdomain after partitioning, and `-n` sets the resolution of the global mesh.
To run this simulation, the FreeFEM container can be used in two different ways: embedded mode, where the MPI runtime bundled inside the container is used to launch the processes, or hybrid mode, where the host's MPI runtime launches the container itself for each task.

**Embedded mode**:

```bash
apptainer exec freefem.sif mpirun -np N FreeFem++-mpi MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

or:

```bash
apptainer exec freefem.sif ff-mpirun -np N MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

**Hybrid mode**:

```bash
mpirun -np N apptainer exec freefem.sif FreeFem++-mpi MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

More information on using Apptainer containers in parallel, including usage on clusters and the difference between embedded and hybrid parallel modes, can be found on [this page](/en/documentation/use/apptainer-hpc).

</div>
