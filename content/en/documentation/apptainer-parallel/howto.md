---
title: Using Apptainer in parallel ?
linktitle: Using Apptainer in parallel ?
weight: 1
---

If the Apptainer image you want to use supports parallel computing, then OpenMPI is included within the container's libraries. In this case, it is beneficial to use this parallelization solution to speed up your computation. According to the official [documentation](https://apptainer.org/docs/user/latest/mpi.html) of Apptainer, there are two modes of using OpenMPI with Apptainer: hybrid mode and binding mode. These modes are recommended when the container is used on HPC (High-Performance Computing) infrastructures. However, a third mode can be employed if the container is run on a personal machine: the embedded mode. In this documentation, we will detail:

- the [embedded mode]({{< ref "#embedded_mode" >}}),
- the [hybrid mode]({{< ref "#hybrid_mode" >}}).

**Note**
> The Apptainer commands below have been simplified for readability. It is possible to combine the use of `mpirun` commands with the `--containall` flag, while mounting specific directories to the container with the `--bind` flags and specifying environment variables `--env`. The possibilities are numerous. We therefore advise you to take a look at the documentation related to these [topics]({{< ref "/content/en/documentation/use-apptainer-image/howto.md" >}}).

## Practical Example: Image with OpenMPI

A custom image dedicated to this tutorial is available by typing the following command:

```bash
# PULL
apptainer pull tutorial-openmpi.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/tutorial-openmpi.sif:latest
```

Thus, you retrieve an Apptainer image (file format `.sif`). This image is a relocatable and renamable file, which is recommended to place in a dedicated directory for easy retrieval; this can be any directory, and for this tutorial, we assume you have placed it in a directory named `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
mv ./tutorial.sif $HOME/apptainer-images/tutorial-openmpi.sif
```

This image will allow you to create containers embedding code parallelized with **OpenMPI**. This `omn3` code performs a series of multiplications of random $N \times N$  square matrices; the size of the matrices $N$  and the number of multiplications $M$ can be specified as arguments. For example, to parallelize ($M=1000$) multiplications of ($N \times N = 100 \times 100$) matrices on $8$ cores:

```bash
mpirun -np 8 omn3 100 1e3
```

The total cost is of the order of $O(MN^3)$, allowing easy adjustment of calculation time on various machines with different performances.

Finally, the image also includes a tool that evaluates the program's use of reserved cores in the background. After execution, you will find the average usage per core in the `CPU-usage` file.

## Embedded Mode {#embedded_mode}

If you want to use your Apptainer image in parallel on your local machine, you can use the OpenMPI library that was embedded when creating the container image.  
This approach has the huge advantage of exempting you from any concerns related to the version of OpenMPI installed on your machine, or even whether this library is installed at all.

It is then very simple, using the `apptainer exec` command, to execute `mpirun` commands that call the parallelization tools included in your container image:

```bash
apptainer exec \
  image_apptainer.sif \
  mpirun -np nb_procs command ...
```

However, this use of OpenMPI in embedded mode is mainly useful when you want to run tests on a local machine, where numerical performance is not a major priority. Indeed, this ease of use comes with a major drawback, as you do not fully exploit the host machine's hardware resources: the version of OpenMPI within the container is not optimized for your specific machine, and in most cases observed for writing this tutorial, CPU usage peaks at around 85-90%. (to see if we can reproduce this performance gap with the example. In any case, I propose to add this paragraph)

Another constraint of the embedded mode is that the Apptainer image must be run on a single physical machine. On a local machine, this is implicit as there is only one motherboard, one CPU, etc. On HPC infrastructures, processes are executed on compute nodes. Using the Apptainer image on a single node is similar to what happens on a personal machine: the container runs and uses as many processors as requested because everything is located on the same node. Problems arise when you want to use at least two compute nodes. By default, the `apptainer exec` command only makes one container appear, which cannot run on multiple physical machines (compute nodes). The solution would be to make as many containers appear as there are nodes used, and to make them communicate with each other. In practice, this is typically done using the recommended method in Apptainer documentation by using hybrid mode. This allows as many containers to appear as there are processors used, facilitating communication through the MPI protocol.

## Hybrid Mode {#hybrid_mode}

We have just seen that using OpenMPI in embedded mode on HPC infrastructures, where numerical efficiency is central, would not be desirable due to suboptimal numerical performance. As explained in Apptainer's documentation, it is preferable to use the hybrid mode on HPC infrastructures. In this case, a "dialogue" must be set up between the host machine's OpenMPI (on the HPC infrastructure) and the OpenMPI embedded in the Apptainer image. To better understand the conceptual difference between this hybrid mode and the embedded mode discussed above, you can look at the diagram below.
(NOTE: INCLUDE EMBEDDED/HYBRID OPENMPI DIAGRAM HERE).

For hybrid parallelization, the call to the OpenMPI command (`mpirun`) is no longer made within the container - that is, after `apptainer exec` as in embedded mode - but outside of it. Thus, a command of the form is used:

```bash
mpirun -np nb_procs <OpenMPI-options> \
        apptainer exec image_apptainer.sif \
        command ...
```

With this approach, the version of OpenMPI installed on the host machine will be called, and it will exchange with the version of the library and the code installed within the container instantiated by `apptainer exec`. Depending on the host machine's specifics, some OpenMPI options (`<OpenMPI-options>`) may be necessary and are discussed further below.

In practice, to truly optimize performance, additional complexity is needed through the use of Apptainer instances. This allows homogenizing the namespaces of OpenMPI processes, thus favoring communication between processes. To do this, proceed as follows:

```bash
# launch an Apptainer instance on each compute node
mpirun -npernode 1 \
        apptainer instance start \
        image_apptainer.sif instance_name

# run the code/script with the MPI command
mpirun -np nb_procs \
        apptainer exec instance://instance_name \
        /bin/bash -c "command..."

# stop the Apptainer instances on each compute node
mpirun -npernode 1 \
        apptainer instance stop instance_name
```

If you want to use specific flags to run your container, you need to do so when creating the instance. For example, to mount specific directories with the `--bind` parameter, it would be:

```bash
mpirun -npernode 1 \
        apptainer instance start \
        --bind host_machine_path:container_path \
        image_apptainer.sif instance_name
```

## Tips and Best Practices

### OpenMPI Parameters

In practice, executing OpenMPI commands may require additional arguments or options such as `--prefix`, `plm_rsh_agent`, or `OMP_NUM_THREADS`. As these parameters may vary from one infrastructure to another, it is recommended to refer to the documentation of the respective infrastructures. Here are some related to the PEPR DIADEM:

- [Gricad](https://gricad-doc.univ-grenoble-alpes.fr/hpc/softenv/container/)
- [TGCC](https://www-hpc.cea.fr/tgcc-public/en/html/toc/fulldoc/Virtualization.html?highlight=singularity)
- and many others...

### Inter-Version Compatibility

Although there is inter-version compatibility for OpenMPI, using different versions of OpenMPI can result in [performance drops](https://github.com/ckhroulev/apptainer-with-ompi/tree/main). Therefore, it is simpler, when possible, to use the same version of OpenMPI on the host machine as in the container. This can be done in two ways: by selecting, when possible, the most suitable version of OpenMPI available on the HPC cluster you are using, or by directly installing the same version of OpenMPI as the cluster in the Apptainer image during its construction.
In the context of PEPR DIADEM, the container images made available are built without exhaustive prior knowledge of the machines they will be used on; it is thus difficult to choose *a priori* the version you need to include in the container.

If you want to know the version of OpenMPI included in a given image, as well as other useful information, you can call `ompi_info` as follows:

```bash
apptainer exec \
  image_apptainer.sif \
  ompi_info
```
