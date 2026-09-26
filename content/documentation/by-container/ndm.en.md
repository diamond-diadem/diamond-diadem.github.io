---
title: "How to use the NDM Apptainer image ?"
linkTitle: NDM tutorial
weight: 13
description: "Tutorial on using the DIAMOND NDM Apptainer container: pulling the image, running simulations, and usage examples for molecular dynamics."
---

{{< callout context="note" title="Prerequisites" >}}

- Apptainer (see either [our installation guide]({{% ref "/documentation/install/install-apptainer" %}}) or [the official documentation](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- The [`ndm.sif` image]({{% ref "/codes/scientific-computing/ndm/" %}})
- The [input files](/downloads/ndm-tutorial-inputs.tar.gz)

{{< /callout >}}

For more information on Apptainer containers and their use, we provide [a description of Apptainer]({{% ref "/documentation/use/apptainer" %}}), a crash course on [how to use Apptainer]({{% ref "/documentation/use/apptainer-image" %}}), and of course there's also the [official Apptainer's documentation](https://apptainer.org/docs/user/latest/).

Create a directory containing the **ndm.sif** image and the archive of the **input files**. Move into this directory and extract the archive as follows:

```bash
tar -xzf ndm-tutorial-inputs.tar.gz # Extracts the contents of the archive.
```

## One-line command

To launch a simulation with **NDM** using N processes, simply run the following command in a folder containing input files:

```bash
apptainer exec ndm.sif mpirun -np <N> rundm90_ndm_mpi
```

## Introduction

**NDM** is a distributed Fortran code for empirical potential molecular dynamics computations built around the MPI standard, allowing the computational workload to be distributed across multiple processes. There are two ways to run the containerized code in parallel:

- **MPI embedded** in the container => guaranteed to work, but limited to a single machine (a single node)
- **Hybrid MPI** using the host machine’s MPI => works across multiple nodes but may introduce compatibility issues.

## Local simulation (embedded MPI)

```bash
apptainer exec ndm.sif mpirun rundm90_ndm_mpi
```

Note that the command first launches **apptainer**, which then executes `mpirun rundm90_ndm_mpi` inside the container.

## Cluster simulation (hybrid MPI)

### Launch with the SLURM scheduler (recommended)

Example of a minimal launch script **job.sh**:

```bash {frame="none"}
#!/bin/bash

#SBATCH --job-name=test_ndm
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer run ndm.sif
```

For reference, `apptainer run ndm.sif` is a shortcut for `apptainer exec ndm.sif rundm90_ndm_mpi`.

The computation can then be launched with the command:

```bash
sbatch job.sh
```

### Launch without a scheduler

```bash
mpirun -np <N> apptainer run ndm.sif
```

**The `mpirun` command must come from OpenMPI 4 for this to work.**
