---
title: How to use CP2K Apptainer image?
linkTitle: CP2K tutorial
weight: 1
description: "Tutorial on using the DIAMOND CP2K Apptainer container: pulling the image and usage example for DFT computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **cp2k.sif** image [available here](/en/codes/scientific-computing/cp2k/)
- Have downloaded the **input files** [available here](/downloads/cp2k-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of CP2K input files is available in the form of an archive via [this link](/downloads/cp2k-tutorial-inputs.tar.gz).

Those files correspond to a tutorial example from the CP2K [official documentation](https://www.cp2k.org/howto:static_calculation). The archive contains the following files:

- `Si_bulk8.inp`: the main input file,
- `BASIS_SET`: contains parameters for the basis set used for this calculation,
- `GTH_POTENTIALS`: contains pseudopotentials parameters.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf cp2k-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a parallel CP2K computation on `N` cores using the container image in the case where the current directory contains the `cp2k.sif` container image and all necessary CP2K input files:

```bash
apptainer exec cp2k.sif mpirun -np <N> cp2k.psmp Si_bulk8.inp
```

## Detailed usage for the CP2K container

This section explains how to use the CP2K image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

CP2K is a parallelized open-source software suite designed for atomistic simulations in the fields of chemistry, physics, and materials science. It is primarily used for molecular dynamics, electronic structure calculations, and other multi-scale methods such as QM/MM (quantum mechanics/molecular mechanics). The software supports both multi-threading with OpenMP and parallel execution on multiple cores with MPI.

The main executable in the image is the `cp2k.psmp` executable. The following command displays the version of the executable:

```shell
apptainer exec cp2k.sif cp2k.psmp --version
```

The code license can be accessed from outside the container as follows:

```bash
cp2k_exe=$(apptainer exec cp2k.sif readlink -f /bin/cp2k.psmp)
cp2k_bin=$(apptainer exec cp2k.sif dirname $cp2k_exe)
cp2k_license=$(apptainer exec cp2k.sif find $cp2k_bin/.. -name "LICENSE")
apptainer exec cp2k.sif cat $cp2k_license
```

### Description of the example

The input files provided in the current tutorial are extracted from a CP2K [official documentation example](https://www.cp2k.org/howto:static_calculation) titled *How to Calculate Energy and Forces*. The example demonstrates a static self-consistent Kohn-Sham Density Functional Theory (DFT) energy and force calculation for a face-centered cubic bulk silicon system with 8 atoms in a cubic unit cell. The main input file, `Si_bulk8.inp`, defines the system and job parameters, including:
- **GLOBAL**: Project name (`Si_bulk8`), run type (`ENERGY_FORCE`), and print level (`LOW`).
- **FORCE_EVAL**: Uses the QUICKSTEP method for DFT calculations with:
  - **SUBSYS**: Specifies the silicon (`Si`) element, its basis set (`DZVP-GTH-PADE`), pseudopotential (`GTH-PADE-q4`), cell vectors, and atomic coordinates.
  - **DFT**: Configures basis set and pseudopotential files, grid settings (`NGRIDS 4`, `CUTOFF 300`, `REL_CUTOFF 60`), exchange-correlation functional (`PADE`), and SCF parameters (e.g., `SCF_GUESS ATOMIC`, `EPS_SCF 1.0E-7`).
  - **PRINT**: Enables output of atomic forces.

The other input files, `BASIS_SET` and `GTH_POTENTIALS`, contain parameters for the basis sets and pseudopotentials, respectively. Note that these files are also present in the container, in the `/share/cp2k/data` directory. As an example, the following command copies the `BASIS_SET` file embedded in the container image in the current directory:

```shell
apptainer exec cp2k.sif cp /share/cp2k/data/BASIS_SET ./
```

### Running the simulation

The following command runs the CP2K simulation on two cores using MPI library. The output of the simulation is written in the `Si_bulk8.out` file, as specified by the `-o` option. Note that this option appends output of successive runs to the `Si_bulk8.out` output file. This file should therefore be deleted before running a new computation.

```shell
apptainer exec cp2k.sif mpirun -np 2 cp2k.psmp -o Si_bulk8.out Si_bulk8.inp
```

The command above uses Apptainer "embedded" parallel mode. More information on using Apptainer containers in parallel, including usage on clusters and the difference between embedded and hybrid parallel modes, can be found on [this page](/en/documentation/use/apptainer-hpc).

### Reading the results

After the job completes, the following output files are generated:
- `Si_bulk8.out`: Main output file containing energy, forces, and convergence details.
- `Si_bulk8-RESTART.wfn`: Final Kohn-Sham wavefunctions.
- `Si_bulk8-RESTART.wfn.bak-1`: Wavefunctions from the previous SCF step.

The output file (`Si_bulk8.out`) includes:
- **SCF Convergence**: Number of steps, total energy, and energy changes per iteration.
- **Final Energies**: Breakdown of electronic, core, Hartree, exchange-correlation, and total energy.
- **Atomic Forces**: Forces on each atom (should sum to near-zero for a relaxed system).

The total energy and forces are printed in atomic units (a.u.). For metallic systems or those with small band gaps, smearing can be added to stabilize the calculation, introducing an electronic entropic energy term in the output. The [official example page](https://www.cp2k.org/howto:static_calculation) explains how to do so for the current simulation. The commands presented in the present tutorial can be easily extrapolated to run this additional section.

</div>
