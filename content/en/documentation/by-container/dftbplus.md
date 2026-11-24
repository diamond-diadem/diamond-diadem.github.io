---
title: How to use DFTB+ Apptainer image
linkTitle: DFTB+ tutorial
weight: 1
description: "Tutorial on using the DIAMOND DFTB+ Apptainer container: usage example for a geometry optimization."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** [(installation guide)](/en/documentation/install/install-apptainer/) or **Docker** [(installation guide)](https://docs.docker.com/engine/install/) installed
- Have downloaded [input files](/downloads/dftbplus-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}

{{< callout context="tip" title="Apptainer or Docker?" icon="tabler-icons/outline/help-circle" >}}

Every command on this page is given for both Apptainer and Docker: pick your tool in any of the tabs below and the whole page follows your choice. Docker is fine for trying the image on your own computer, but on clusters you should use Apptainer ([why?](/en/documentation/faq/#docker-is-also-a-containerization-solution-why-dont-we-just-use-docker)).

{{< /callout >}}

## Container image

Retrieve the DFTB+ image:

{{< tabs "dftbplus-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull dftbplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus dftbplus
```

The second command gives the image the short name `dftbplus`, which is used in the rest of this tutorial.
{{< /tab >}}
{{< /tabs >}}

## Input files

To illustrate the various commands, a set of DFTB+ input files is available in the form of an archive via [this link](/downloads/dftbplus-tutorial-inputs.tar.gz).

Those files correspond to a tutorial example from the DFTB+ [official recipes documentation](https://dftbplus-recipes.readthedocs.io/en/stable/moleculardynamics/startinggeometry.html), illustrating how to prepare a starting geometry for a molecular dynamics run. In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf dftbplus-tutorial-inputs.tar.gz
```

The archive contains the following files and directories:

- `initialstructre/dftb_in.hsd`: input file for the geometry optimization,
- `slakos/`: Slater-Koster parameter files (`*.skf`) and their `LICENSE`, describing the electronic interactions between the atom pairs of the system,
- `vibrations/dftb_in.hsd`: input file computing the Hessian (second derivatives) at the optimized geometry,
- `vibrations/modes_in.hsd`: input file for the `modes` post-processing tool, used to extract and animate the vibrational normal modes from the Hessian.

## Quickstart

For impatient folks, here is how to run the full workflow on `<N>` MPI processes and `<nt>` threads per task, assuming the current directory contains the `initialstructre`, `slakos` and `vibrations` directories from the input archive:

{{< tabs "dftbplus-quickstart" >}}
{{< tab "Apptainer" >}}
The `dftbplus.sif` image is assumed to be in the current directory.

```bash
cd initialstructre
apptainer exec --env "OMP_NUM_THREADS=<nt>" ../dftbplus.sif mpirun -np <N> dftb+ | tee output
cd ../vibrations
apptainer exec --env "OMP_NUM_THREADS=<nt>" ../dftbplus.sif mpirun -np <N> dftb+ | tee output
apptainer exec ../dftbplus.sif modes | tee output_modes
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/initialstructre dftbplus mpirun -np 2 dftb+ | tee output
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations dftbplus mpirun -np 2 dftb+ | tee output
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations dftbplus modes | tee output_modes
```

Here, `-v "$PWD":/work -w /work` makes the current directory available inside the container and runs the computation from there, `-u $(id -u):$(id -g)` ensures output files belong to you rather than to `root`, and `--rm` deletes the container once the computation is over. On systems using SELinux (Fedora, RHEL…), append `:z` to the volume (`-v "$PWD":/work:z`) if you get "Permission denied" errors.
{{< /tab >}}
{{< /tabs >}}

## Detailed usage for the DFTB+ container

This section explains how to use the DFTB+ image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

DFTB+ is an open-source software for computational chemistry and materials science simulations. It can compute energies, forces, vibrational properties and electronic transitions, and is highly configurable through its modular input format. The software supports both MPI parallelization and OpenMP multi-threading.

The main executable in the image is `dftb+`. Its version and citation information are printed automatically at the start of every run, in the header of the output.

The code license can be accessed from outside the container as follows:

{{< tabs "dftbplus-introduction" >}}
{{< tab "Apptainer" >}}
```bash
dftb_path=$(apptainer exec dftbplus.sif ls /gnu/store | grep dftb)
license_path=$(apptainer exec dftbplus.sif find /gnu/store/$dftb_path -name "LICENSE")
apptainer exec dftbplus.sif cat $license_path
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
dftb_path=$(docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus ls /gnu/store | grep dftb)
license_path=$(docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus find /gnu/store/$dftb_path -name "LICENSE")
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus cat $license_path
```
{{< /tab >}}
{{< /tabs >}}

### Description of the example

The input files provided in the current tutorial are extracted from a DFTB+ [official recipe](https://dftbplus-recipes.readthedocs.io/en/stable/moleculardynamics/startinggeometry.html) on preparing a starting geometry for molecular dynamics. The example system is a molecule made of carbon, oxygen and hydrogen atoms (38 atoms in total), described in Cartesian coordinates.

The workflow involves three DFTB+ runs:

- **Geometry optimization** (`initialstructre/dftb_in.hsd`): starts from the input geometry and relaxes it with a conjugate-gradient `Driver` until the maximum force component falls below `1e-5`. The electronic structure is computed self-consistently (`SCC = Yes`, `SCCTolerance = 1E-7`) with Fermi filling at 400 K, using the Slater-Koster files from the `slakos` directory (referenced with a relative `Type2FileNames` prefix) and an `s`/`p` angular momentum basis for H and C/O respectively. This run produces the optimized geometry, `geo_end.gen`.
- **Second derivatives** (`vibrations/dftb_in.hsd`): reads the optimized geometry produced above and switches the `Driver` to `SecondDerivatives`, computing the full Hessian matrix by finite differences (`Delta = 1e-4`). The result is written to `hessian.out`.
- **Normal modes** (`vibrations/modes_in.hsd`): fed to the `modes` post-processing tool together with the optimized geometry and the Slater-Koster files (needed for atomic masses), this input reads the Hessian and diagonalizes it to obtain the vibrational frequencies. `PlotModes = -20:-1` selects the 20 highest-frequency modes, and `Animate = Yes` writes an animated `.xyz` trajectory for each of them (`mode_95.xyz` to `mode_114.xyz`).

### Running the simulation

The geometry optimization is run on four cores using MPI, with two OpenMP threads per rank. It must be launched from inside the `initialstructre` directory, since the Slater-Koster files are referenced with a relative path:

{{< tabs "dftbplus-simulation" >}}
{{< tab "Apptainer" >}}
```bash
cd initialstructre
apptainer exec --env "OMP_NUM_THREADS=2" ../dftbplus.sif mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/initialstructre --env "OMP_NUM_THREADS=2" dftbplus mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< /tabs >}}

The vibrational (second-derivatives) calculation is run the same way, from inside the `vibrations` directory, which also refers to the optimized geometry with a relative path:

{{< tabs "dftbplus-vibration" >}}
{{< tab "Apptainer" >}}
```bash
cd vibrations
apptainer exec --env "OMP_NUM_THREADS=2" ../dftbplus.sif mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations --env "OMP_NUM_THREADS=2" dftbplus mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< /tabs >}}

Once the Hessian has been computed, the normal modes are extracted with the `modes` tool, still from inside the `vibrations` directory:

{{< tabs "dftbplus-modes" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec ../dftbplus.sif modes | tee output_modes
```

The command above uses Apptainer "embedded" parallel mode. More information on using Apptainer containers in parallel, including usage on clusters and the difference between embedded and hybrid parallel modes, can be found on [this page]({{% ref "/documentation/use/apptainer-hpc" %}}).

{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations --env "OMP_NUM_THREADS=2" dftbplus modes | tee output_modes
```

{{< callout context="caution" icon="tabler-icons/outline/alert-triangle" >}}
With Docker, parallel runs are limited to the cores of a single machine. Docker is not integrated with job schedulers such as SLURM or OAR, so it cannot be used for computations on clusters: use Apptainer instead ([why?](/en/documentation/faq/#docker-is-also-a-containerization-solution-why-dont-we-just-use-docker)).
{{< /callout >}}
{{< /tab >}}
{{< /tabs >}}

### Reading the results

After the geometry optimization completes, `initialstructre` contains, among others:
- `output`: main log, with SCF convergence and total energy at each optimization step,
- `dftb_pin.hsd`: the fully-resolved, parsed input actually used by DFTB+,
- `geo_end.gen` / `geo_end.xyz`: the optimized geometry, used as the starting point for the vibrational analysis.

After the second-derivatives run, `vibrations` contains, among others:
- `output`: main log for this run,
- `hessian.out`: the computed Hessian matrix,
- `born.out`: Born effective charges,
- `vibrations.tag`: machine-readable summary of the run, also written by the `modes` tool.

After running `modes`, `output_modes` lists the frequency (in cm⁻¹) of every requested mode. In this example, the six lowest modes are close to zero (translations and rotations of the whole molecule), while the requested top 20 modes range from about 1710 cm⁻¹ up to roughly 3067 cm⁻¹. For each of these, an animated trajectory file (`mode_95.xyz` to `mode_114.xyz`) is produced.

### Visualizing a mode

The animated `.xyz` trajectory of a mode can be visualized with the VMD software for example. The [VMD container]({{% ref "/codes/visualisation/vmd/" %}}) can be used for this purpose, for example for the highest-frequency mode:

```bash
apptainer exec ../vmd.sif vmd mode_114.xyz
```

</div>
