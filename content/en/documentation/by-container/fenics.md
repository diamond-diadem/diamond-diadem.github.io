---
title: How to use FEniCS Apptainer image?
linkTitle: FEniCS tutorial
weight: 1
description: "Tutorial on using the DIAMOND FEniCS Apptainer container: pulling the image and usage example for FE computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **fenics.sif** image [available here](/en/codes/scientific-computing/fenics/)
- Have downloaded the **input files** [available here](/downloads/fenics-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of FEniCS input files is available in the form of an archive via [this link](/downloads/fenics-tutorial-inputs.tar.gz). The archive contains two Python script (`demo_poisson_1.py` and `demo_poisson_2.py`) describing the same Poisson equation with two different sets of boundary conditions. Those two scripts have been adapted from the [official documentation's](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/demos/demo_poisson.html) *Poisson equation* introductory example.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf fenics-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a FEniCS computation using the container image in the case where the current directory contains the `fenics.sif` container image and all necessary FEniCS input files:

```bash
apptainer exec fenics.sif python3 demo_poisson_2.py
```

## Detailed usage for the FEniCS container

This section presents different ways to use the FEniCS image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

FEniCS is an open-source software designed for the numerical resolution of partial differential equations (PDEs) using finite element methods. 

### Problem description

Here is the problem as described in the original tutorial:

For a domain $\Omega \subset \mathbb{R}^n$ with boundary $\partial\Omega = \Gamma_D \cup \Gamma_N$, the Poisson equation with particular boundary conditions reads:

$$
\begin{aligned}
-\nabla^2 u &= f \quad \text{in } \Omega, \\
u &= 0 \quad \text{on } \Gamma_D, \\
\nabla u \cdot n &= g \quad \text{on } \Gamma_N.
\end{aligned}
$$
where $f$ and $g$ are input data and $n$ denotes the outward directed boundary normal.

The variational problem reads: find $u \in V$ such that

$$
a(u, v) = L(v) \quad \forall v \in V,
$$

where $V$ is a suitable function space and

$$
a(u, v) := \int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x,
$$

$$
L(v) := \int_\Omega f v \, \mathrm{d}x + \int_{\Gamma_N} g v \, \mathrm{d}s.
$$

The expression $a(u, v)$ is the bilinear form and $L(v)$ is the linear form. It is assumed that all functions in $V$ satisfy the Dirichlet boundary conditions ($u = 0$ on $\Gamma_D$).

In this demo we consider:

- $\Omega = [0, 2] \times [0, 1]$ (a rectangle)
- $\Gamma_D = \{(0, y) \cup (2, y) \subset \partial\Omega\}$
- $\Gamma_N = \{(x, 0) \cup (x, 1) \subset \partial\Omega\}$

### Simplified version

In this first subsection, we consider the following simple expressions of $f$ and $g$ functions:

- $g(x,y) = 0$
- $f(x,y) = 10$

#### Analytical solution

With this simple set of boundary conditions, an analytical solution can be found as a function of $x$ alone:

$$u(x) = -5x^2 + 10x$$

This solution satisfies:

- $-\nabla^2 u = 10$ (the Poisson equation)
- $u(0) = u(2) = 0$ (Dirichlet boundary conditions)
- $\frac{\partial u}{\partial y} = 0$ at $y=0$ and $y=1$ (Neumann boundary conditions)

#### Input file description

The Python input file `demo_poisson_1.py` implements the FEniCS resolution for the simplified set of boundary conditions presented above. This script follows the structure of the official FEniCS tutorial:

1. **Mesh creation and function space definition**
   The script begins by importing the necessary modules and creating a rectangular mesh with 32×16 elements with the `mesh.create_rectangle` method,

2. **Boundary condition specification**
   Dirichlet boundary conditions are applied to the left ($x=0$) and right ($x=2$) boundaries,
   ```pyton
      f = fem.Constant(msh, ScalarType(10))
      g = fem.Constant(msh, ScalarType(0)) 
   ```

3. **Variational problem definition**
   The bilinear and linear forms are defined using UFL (Unified Form Language),

4. **Problem-solving**
   The linear problem is solved using PETSc's LU solver:
   ```python
   uh = problem.solve()
   ```

5. **Output and visualization**
   Results are saved in XDMF format for visualization with tools like ParaView.

#### Running the simulation

The following command runs the simulation with the simplified set of boundary conditions:

```shell
apptainer exec fenics.sif python3 demo_poisson_1.py
```

This creates a `out_poisson/poisson.xdmf` output file that can be opened using Paraview. To interact with this output file using the [Paraview container](/en/codes/visualisation/paraview/) hosted by the Diamond project:

```shell
apptainer run paraview.sif out_poisson/poisson.xdmf
```
then select *Xdmf3 Reader S*. The green *Apply* button on the left panel triggers the display of the equation solution computed by the software, as represented below.

<img alt="Paraview visualization of the simple problem solution" src="/images/tutorials/fenics-tutorial/simple_solution_paraview.png" />

This solution visually corresponds to the analytical solution computed above ($u(x) = -5x^2 + 10x$).

### Original tutorial's version

The present subsection considers a more complex set of boundary conditions, as defined in the [original tutorial](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/demos/demo_poisson.html):

- $g = \sin(5x)$
- $f = 10 \exp(-((x - 0.5)^2 + (y - 0.5)^2)/0.02)$

The input file `demo_poisson_2.py` defining this simulation is identical to the previous one except for the part that implements $g$ and $f$ functions' expressions:

```python
f = 10 * ufl.exp(-((x[0] - 0.5) ** 2 + (x[1] - 0.5) ** 2) / 0.02)
g = ufl.sin(5 * x[0])
```

The following command runs the simulation with this second set of boundary conditions:

```shell
apptainer exec fenics.sif python3 demo_poisson_2.py
```

As described above, the output file can be opened with [Paraview](/en/codes/visualisation/paraview/) as follows:

```shell
apptainer run paraview.sif out_poisson/poisson.xdmf
```

<img alt="Paraview visualizationof the original problem solution" src="/images/tutorials/fenics-tutorial/complex_solution_paraview.png" />

### To go further

The [official documentation](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/index.html) provides multiple examples exhibiting the features of the software. Those examples can be easily run with the FEniCS container image by extrapolating the commands presented in this tutorial.

</div>
