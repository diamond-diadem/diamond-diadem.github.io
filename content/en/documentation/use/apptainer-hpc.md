---
title: Using containers on HPC clusters
linktitle: Using containers on HPC clusters
weight: 2
---

<div align="justify">

An important part of the codes provided by the DIAMOND platform are compatible with and designed to run on High Performance Computing (HPC) platforms. There are multiple ways of using HPC clusters, and we will differentiate between two cases:
- running single-process or shared-memory parallelized codes
- running distributed-memory parallelized codes (**MPI**).

The solution chosen for the DIAMOND platform (**Apptainer** for containerization and **Guix** for packaging) allows users to run any kind of codes, with some care required for MPI-parallelized codes.

## Single-process or shared-memory parallelized codes

The only requirement for running single-process and shared-memory parallelized codes is a container launcher. We recommend using **Apptainer** because of its simplicity of installation and use. In this category we typically include codes that have OpenMP parallelism which can be tuned with the `OMP_NUM_THREADS` environment variable.

## Distributed memory parallelized codes (MPI)

Some of the codes that we provide support distributed-memory parallelization with **MPI**. In those cases, **OpenMPI** is included within the container's libraries. *(It is possible to check whether MPI is available in the container by running `mpirun --version`. If mpirun is not found, then the code does not support MPI)*

There are two modes of using MPI with our containers:

- the [embedded mode]({{< ref "#embedded_mode" >}}), (`mpirun` inside the container)

  ​	=> guaranteed to work

  ​	=> limited to a single physical machine (a single node)

- the [hybrid mode]({{< ref "#hybrid_mode" >}}). (`mpirun` outside the container)

  ​	=> works across multiple nodes

  ​	=> possible compatibility issues

### Embedded Mode {#embedded_mode}

This mode relies entirely on the embedded OpenMPI installation to run. The advantage is that this mode avoids compatibility issues with the host MPI installation, but it is generally limited to **one physical machine**, so your local machine or a single node on a cluster. The other drawback is that we noticed CPU usage can peak at around 85-90% in some cases.

The embedded mode therefore consists of using the **`mpirun` command inside the container**. For example, one can use the `apptainer exec` command to execute `mpirun` commands inside the container :

```bash
apptainer exec <image>.sif mpirun -np <nb_procs> <command>
```



### Hybrid Mode {#hybrid_mode}

This mode consists of using the **`mpirun`** or a similar launcher command **outside the container**, on the `apptainer` command itself. This works natively with Apptainer which was designed for this purpose contrary to Docker, which would require setting up a lot of options that we will not detail here. In hybrid mode, the MPI launcher is provided by the host system, while the MPI application runs inside the Apptainer image, and the MPI libraries inside the container must remain compatible with the host MPI implementation to allow communication with the HPC interconnect. The difference between this hybrid mode and the embedded mode is represented on the diagram below:

<div class="text-center mt-4 mb-4">
        <img alt="OpenMPI Hybride" class="hybrid-ompi">
</div>

With this hybrid approach, we recommend using the **same OpenMPI version** on the cluster and inside the container whenever possible. There is also inter-version compatibility for OpenMPI but using different versions of OpenMPI can result in [performance drops](https://github.com/ckhroulev/apptainer-with-ompi/tree/main). In PEPR DIADEM, container images are built without prior knowledge of target machines, so we use a portable OpenMPI configuration provided by Guix that is designed to [work across different hardware environments](https://hpc.guix.info/blog/2019/12/optimized-and-portable-open-mpi-packaging/)

To check which version of OpenMPI is included in a given image, as well as other useful information, you can call `ompi_info` as follows:

```bash
apptainer exec <image>.sif ompi_info
```



#### Hybrid Mode with the SLURM scheduler (recommended)

Example of a minimal launch script **job.sh**:


```bash {frame="none"}
#!/bin/bash
#SBATCH --job-name=test_containers
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=2
#SBATCH --time=00:05:00

srun apptainer exec <image>.sif <command>
```

**If you encounter problems with `srun`, you may try `srun --mpi=pmi2` or `srun --mpi=pmix`**

The computation can then be submitted with:

```bash
sbatch job.sh
```



#### Hybrid Mode without a scheduler

```bash
# module load openmpi-x.x.x or equivalent might be necessary to access the right mpirun command
mpirun -np <nb_procs> apptainer exec <image>.sif <command>
```



#### Possible Hybrid Mode optimizations

One possible optimization is to share the Apptainer namespace between MPI ranks running on the same node which may improve performance in some cases. There are two ways of doing this. The easiest way is to use the dedicated `--sharens` flag. For example:

```bash
mpirun -np <nb_procs> apptainer exec --sharens <image>.sif <command>
```

It is also possible to do it "by-hand" with the following commands:

```bash
# launch one Apptainer instance on each compute node
mpirun -npernode 1 apptainer instance start <image>.sif instance_name

# run the code/script with the MPI command
mpirun -np <nb_procs> apptainer exec instance://instance_name /bin/bash -c "<command>"

# stop the Apptainer instances on each compute node
mpirun -npernode 1 apptainer instance stop instance_name
```




## Cluster specific documentation

Official documentation on the use of containers:

- [Gricad](https://gricad-doc.univ-grenoble-alpes.fr/hpc/softenv/container/)

- [TGCC](https://www-hpc.cea.fr/tgcc-public/en/html/toc/fulldoc/Virtualization.html?highlight=singularity)



**TGCC-DIAMOND specific:**

Running DIAMOND containers at TGCC is a bit different since `pcocc-rs` container launcher replaces Apptainer on the clusters. The user should first download the container `<image>.sif` from the DIAMOND website, and copy it to the cluster with `rsync`

Then, as described in the official documentation you should first import the container with:

```bash
pcocc-rs image import sif:<image>.sif <image>
```

It is then possible to run containers with:

- `pcocc-rs run --no-ep <image> <command>` equivalent to `apptainer exec <image>.sif <command>`

- `pcocc-rs run <image> <args>` equivalent to `apptainer run <image>.sif <args>`

To run MPI containers from the DIAMOND project, you can use the dedicated command `ccc_mprun -C` with two specific modules: `openmpi-4.1.4` and `guix`. Here is an example of a minimal script that can be submitted with `ccc_msub`:

```bash {frame="none"}
#!/usr/bin/env bash
#MSUB -r test_containers           # Job name
#MSUB -n 2                         # Number of tasks to use
#MSUB -T 3600                      # Elapsed time limit in seconds of the job
#MSUB -q milan                     # Partition name
#MSUB -m work,scratch              # To access storage

module load mpi/openmpi/4.1.4
module load pcocc-module/guix

ccc_mprun -C <image> -E '--ctr-module openmpi-4.1.4,guix' -- <command>
```

</div>
