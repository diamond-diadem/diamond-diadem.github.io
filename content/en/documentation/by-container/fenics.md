---
title: How to use FEniCS container image
linkTitle: FEniCS tutorial
weight: 1
description: "Tutorial on using the DIAMOND FEniCS container image with Apptainer or Docker: pulling the image and usage example for FE computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** [(installation guide)](/en/documentation/install/install-apptainer/) or **Docker** [(installation guide)](https://docs.docker.com/engine/install/) installed
- Have downloaded **input files** [available here](/downloads/fenics-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}

{{< callout context="tip" title="Apptainer or Docker?" icon="tabler-icons/outline/help-circle" >}}

Every command on this page is given for both Apptainer and Docker: pick your tool in any of the tabs below and the whole page follows your choice. Docker is fine for trying the image on your own computer, but on clusters you should use Apptainer ([why?](/en/documentation/faq/#docker-is-also-a-containerization-solution-why-dont-we-just-use-docker)).

{{< /callout >}}

## Container image

Retrieve the FEniCS image:

{{< tabs "fenics-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull fenics.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics fenics
```

The second command gives the image the short name `fenics`, which is used in the rest of this tutorial.
{{< /tab >}}
{{< /tabs >}}


## Input files

To illustrate the various commands, a set of FEniCS input files is available in the form of an archive via [this link](/downloads/fenics-tutorial-inputs.tar.gz). The archive contains two Python script (`demo_poisson_1.py` and `demo_poisson_2.py`) describing the same Poisson equation with two different sets of boundary conditions. Those two scripts have been adapted from the [official documentation's](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/demos/demo_poisson.html) *Poisson equation* introductory example.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf fenics-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a FEniCS computation using the container image in the case where the current directory contains all necessary FEniCS input files:

{{< tabs "fenics-quickstart" >}}
{{< tab "Apptainer" >}}
The `fenics.sif` image is assumed to be in the current directory.

```bash
apptainer exec fenics.sif python3 demo_poisson_2.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -v "$PWD":/work -w /work fenics python3 demo_poisson_2.py
```

Here, `-v "$PWD":/work -w /work` makes the current directory available inside the container and runs the computation from there, `-u $(id -u):$(id -g)` ensures output files belong to you rather than to `root`, and `--rm` deletes the container once the computation is over. On systems using SELinux (Fedora, RHEL…), append `:z` to the volume (`-v "$PWD":/work:z`) if you get "Permission denied" errors.
{{< /tab >}}
{{< /tabs >}}

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

{{< tabs "fenics-simulation-1" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec fenics.sif python3 demo_poisson_1.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work fenics python3 demo_poisson_1.py
```
{{< /tab >}}
{{< /tabs >}}

This creates a `out_poisson/poisson.xdmf` output file that can be opened using Paraview. To interact with this output file with Paraview:

```shell
paraview out_poisson/poisson.xdmf
```

or with the [Paraview container](/en/codes/visualisation/paraview/) hosted by the Diamond project:

{{< tabs "fenics-visualize-1" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
# pull the Docker image
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview paraview

docker run --rm -u $(id -u):$(id -g) -e DISPLAY -e XAUTHORITY -v /tmp/.X11-unix:/tmp/.X11-unix --mount type=bind,src=$XAUTHORITY,dst=$XAUTHORITY --device /dev/dri -v "$PWD":/work -w /work paraview out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< /tabs >}}

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

{{< tabs "fenics-simulation-2" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec fenics.sif python3 demo_poisson_2.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work fenics python3 demo_poisson_2.py
```
{{< /tab >}}
{{< /tabs >}}

As described above, the output file can be opened with Paraview:

```shell
paraview out_poisson/poisson.xdmf
```

Or with the [Paraview](/en/codes/visualisation/paraview/) container:

{{< tabs "fenics-visualize-2" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm -u $(id -u):$(id -g) -e DISPLAY -e XAUTHORITY -v /tmp/.X11-unix:/tmp/.X11-unix --mount type=bind,src=$XAUTHORITY,dst=$XAUTHORITY --device /dev/dri -v "$PWD":/work -w /work paraview out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< /tabs >}}

<img alt="Paraview visualizationof the original problem solution" src="/images/tutorials/fenics-tutorial/complex_solution_paraview.png" />

### To go further

The [official documentation](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/index.html) provides multiple examples exhibiting the features of the software. Those examples can be easily run with the FEniCS container image by extrapolating the commands presented in this tutorial.

</div>
