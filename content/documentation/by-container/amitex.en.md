---
title: "How to use the AMITEX_FFTP Apptainer image ?"
linkTitle: AMITEX_FFTP tutorial
weight: 12
category: scientific-computing
code: amitex-fftp
description: "Tutorial on using the DIAMOND AMITEX_FFTP Apptainer container: pulling the image and running FFT-based mechanical simulations for materials."
---

{{< callout context="note" title="Prerequisites" >}}

- Apptainer or Docker (see either [our installation guide]({{% ref "/documentation/install/install-apptainer" %}}) or the corresponding official documentation)
- The [`amitex_fftp.sif` image]({{% ref "/codes/scientific-computing/amitex-fftp/" %}})
- The [input files](/downloads/amitex-tutorial-inputs.tar.gz)

{{< /callout >}}

For more information on Apptainer containers and their use, we provide [a description of Apptainer]({{% ref "/documentation/use/apptainer" %}}), a crash course on [how to use Apptainer]({{% ref "/documentation/use/apptainer-image" %}}), and of course there's also the [official Apptainer's documentation](https://apptainer.org/docs/user/latest/).

{{< callout context="tip" title="Apptainer or Docker?" icon="tabler-icons/outline/help-circle" >}}

Every command on this page is given for both Apptainer and Docker: pick your tool in any of the tabs below and the whole page follows your choice. Docker is fine for trying the image on your own computer, but on clusters you should use Apptainer ([why?]({{% ref "/faqs" %}}#why-not-docker)).

{{< /callout >}}

## Container image

Retrieve the AMITEX_FFTP image:

{{< tabs "amitex-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull amitex_fftp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp amitex_fftp
```

The second command gives the image the short name `amitex_fftp`, which is used in the rest of this tutorial.
{{< /tab >}}
{{< /tabs >}}

## Input files

Create a directory containing the archive of the **input files** (and, with Apptainer, the **amitex_fftp.sif** image). Move into this directory and extract the archive:

```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extracts the contents of the archive.
```

## One-line command

For those in a hurry, here is how to launch an **Amitex_FFTP** computation on `N` processes, in the case where the current directory contains all the necessary input files:

{{< tabs "amitex-quickstart" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun -np <N> amitex_fftp <args>
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun -np <N> amitex_fftp <args>
```

Here, `-v "$PWD":/work -w /work` makes the current directory available inside the container and runs the computation from there, `-u $(id -u):$(id -g)` ensures output files belong to you rather than to `root` (and lets `mpirun` start, as it refuses to run as root), and `--rm` deletes the container once the computation is over. On systems using SELinux (Fedora, RHEL…), append `:z` to the volume (`-v "$PWD":/work:z`) if you get "Permission denied" errors. The same prefix is used for every Docker command below.
{{< /tab >}}
{{< /tabs >}}

## Introduction

Amitex_FFTP is a massively parallel simulation code built around the MPI standard, allowing the computational workload to be distributed across multiple processes. There are two ways to run the containerized code in parallel:

- **MPI embedded** in the container => guaranteed to work, but limited to a single machine (a single node). Available with Apptainer and Docker.
- **Hybrid MPI** using the host machine’s MPI => works across multiple nodes but may introduce compatibility issues. Available with Apptainer only.

## Local simulation (embedded MPI)

{{< tabs "amitex-local" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Note that the command first launches **apptainer**, which then executes `mpirun amitex_fftp <args>` inside the container.
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

No parameters are passed to `mpirun`, so all available CPU cores are used for the computation.

## Cluster simulation (hybrid MPI)

Hybrid MPI relies on the host machine’s MPI, which a Docker container cannot use.

### Launch with the SLURM scheduler (recommended)

Example of a minimal launch script **job.sh**:

{{< tabs "amitex-slurm" >}}
{{< tab "Apptainer" >}}
```bash {frame="none"}
#!/bin/bash

#SBATCH --job-name=test_amitex
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer exec amitex_fftp.sif amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

The computation can then be launched with the command:

```bash
sbatch job.sh
```
{{< /tab >}}
{{< tab "Docker" >}}
Not available with Docker: it cannot use the host’s MPI, and cannot run inside SLURM jobs. Use the embedded MPI described in [Local simulation](#local-simulation-embedded-mpi) on a single machine, or switch to Apptainer ([why?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /tab >}}
{{< /tabs >}}

### Launch without a scheduler

{{< tabs "amitex-mpirun" >}}
{{< tab "Apptainer" >}}
```bash
mpirun -np <N> apptainer exec amitex_fftp.sif amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***The `mpirun` command must come from OpenMPI 4 for this to work.**
{{< /tab >}}
{{< tab "Docker" >}}
Not available with Docker: it cannot use the host’s MPI, and cannot run inside SLURM jobs. Use the embedded MPI described in [Local simulation](#local-simulation-embedded-mpi) on a single machine, or switch to Apptainer ([why?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /tab >}}
{{< /tabs >}}

## Visualizing the results

Generate strain curves with **Gnuplot**:

{{< tabs "amitex-gnuplot" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp gnuplot plot.gp
```
{{< /tab >}}
{{< /tabs >}}

This creates `concrete_stress_strain.svg`, which can then be displayed with a standard image viewer.

To visualize `.vtk` files, **Paraview** must be used. We provide a Paraview container [here]({{% ref "/codes/visualisation/paraview/" %}}). Once the Paraview container has been downloaded, the microstructure `concrete.vtk` can be visualized as follows:

{{< tabs "amitex-paraview" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif concrete.vtk
# Then in the graphical interface click "Apply" in the left Properties panel
# Then in the top menu bar select "MaterialId" in the drop-down menu instead of "Solid Color".
# Then in the top menu bar select "Surface" in the drop-down menu instead of "Outline".
```
{{< /tab >}}
{{< tab "Docker" >}}
Displaying a graphical window from a Docker container requires extra display options: see the Paraview page for the Docker usage.
{{< /tab >}}
{{< /tabs >}}

## (Advanced) User-defined material behavior law

### UMAT Behaviors

It is possible to define custom material behavior laws using a UMAT-compatible procedure. We will look at an example of a user-defined material behavior law used with AMITEX_FFTP. You can retrieve the example provided in the container with:

{{< tabs "amitex-umat-copy" >}}
{{< tab "Apptainer" >}}
```bash
cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat .
chmod -R u+w comportement_umat
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp sh -c 'cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat . && chmod -R u+w comportement_umat'
```
{{< /tab >}}
{{< /tabs >}}

The provided example is already compiled, so you can start by cleaning the `comportement_umat` directory:

{{< tabs "amitex-umat-clean" >}}
{{< tab "Apptainer" >}}
```bash
cd comportement_umat
apptainer exec ../amitex_fftp.sif make clean
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
cd comportement_umat
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp make clean
```
{{< /tab >}}
{{< /tabs >}}

You can now implement the desired behavior by modifying the files with your preferred text editor. Then, recompile the behavior law with:

{{< tabs "amitex-umat-make" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec ../amitex_fftp.sif make
cd ..
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp make
cd ..
```
{{< /tab >}}
{{< /tabs >}}

This creates `comportement_umat/libUmatAmitex.so`. Next, you need to modify **material.xml** to call this new behavior law by replacing, for example `<Material numM="2" Lib="" Law="elasiso"> [...] </Material>` with:

```xml
    <Material numM="2" Lib="comportement_umat/libUmatAmitex.so" Law="umatBCCHPP" >
                <Coeff Index="1" Type="Constant" Value="236.412E3"/>
                <Coeff Index="2" Type="Constant" Value="0.35"/>
                <Coeff Index="3" Type="Constant" Value="275.2E3"/>
                <Coeff Index="4" Type="Constant" Value="112.4E3"/>
                <Coeff Index="5" Type="Constant" Value="87.56E3"/>
                <Coeff Index="6" Type="Constant" Value="363."/>
                <Coeff Index="7" Type="Constant" Value="0."/>
                <Coeff Index="8" Type="Constant" Value="1000."/>
                <Coeff Index="9" Type="Constant" Value="10e-6"/>
                <Coeff Index="10" Type="Constant" Value="1e11"/>
                <Coeff Index="11" Type="Constant" Value="2.481e-7"/>
                <Coeff Index="12" Type="Constant" Value="100"/>
                <Coeff Index="13" Type="Constant" Value="3."/>
                <Coeff Index="14" Type="Constant" Value="2.e-6"/>
                <Coeff Index="15" Type="Constant" Value="0.84"/>
                <Coeff Index="16" Type="Constant" Value="1e5"/>
                <Coeff Index="17" Type="Constant" Value="1e5"/>
                <Coeff Index="18" Type="Constant" Value="1e-6"/>
                <Coeff Index="19" Type="Constant" Value="50"/>
                <Coeff Index="20" Type="Constant" Value="0"/>
                <Coeff Index="21" Type="Constant" Value="0.3"/>
                <Coeff Index="22" Type="Constant" Value="1."/>
                <Coeff Index="23" Type="Constant" Value="5.e-4"/>
                <Coeff Index="24" Type="Constant" Value="50"/>
                <Coeff Index="25" Type="Constant" Value="0."/>
                <Coeff Index="26" Type="Constant" Value="0."/>
                <Coeff Index="27" Type="Constant" Value="0."/>
                <IntVar Index="1" Type="Constant" Value="0."/>
                <IntVar Index="2" Type="Constant" Value="0."/>
                <IntVar Index="3" Type="Constant" Value="0."/>
                <IntVar Index="4" Type="Constant" Value="0."/>
                <IntVar Index="5" Type="Constant" Value="0."/>
                <IntVar Index="6" Type="Constant" Value="0."/>
                <IntVar Index="7" Type="Constant" Value="0."/>
                <IntVar Index="8" Type="Constant" Value="0."/>
                <IntVar Index="9" Type="Constant" Value="0."/>
                <IntVar Index="10" Type="Constant" Value="0."/>
                <IntVar Index="11" Type="Constant" Value="0."/>
                <IntVar Index="12" Type="Constant" Value="0."/>
                <IntVar Index="13" Type="Constant" Value="0."/>
                <IntVar Index="14" Type="Constant" Value="0."/>
                <IntVar Index="15" Type="Constant" Value="0."/>
                <IntVar Index="16" Type="Constant" Value="0."/>
                <IntVar Index="17" Type="Constant" Value="0."/>
                <IntVar Index="18" Type="Constant" Value="0."/>
                <IntVar Index="19" Type="Constant" Value="0."/>
                <IntVar Index="20" Type="Constant" Value="0."/>
                <IntVar Index="21" Type="Constant" Value="0."/>
                <IntVar Index="22" Type="Constant" Value="0."/>
                <IntVar Index="23" Type="Constant" Value="0."/>
                <IntVar Index="24" Type="Constant" Value="0."/>
                <IntVar Index="25" Type="Constant" Value="0."/>
                <IntVar Index="26" Type="Constant" Value="0."/>
                <IntVar Index="27" Type="Constant" Value="0."/>
                <IntVar Index="28" Type="Constant" Value="0."/>
                <IntVar Index="29" Type="Constant" Value="0."/>
                <IntVar Index="30" Type="Constant" Value="0."/>
                <IntVar Index="31" Type="Constant" Value="0."/>
                <IntVar Index="32" Type="Constant" Value="0."/>
                <IntVar Index="33" Type="Constant" Value="0."/>
                <IntVar Index="34" Type="Constant" Value="0."/>
                <IntVar Index="35" Type="Constant" Value="0."/>
                <IntVar Index="36" Type="Constant" Value="0."/>
                <IntVar Index="37" Type="Constant" Value="0."/>
                <IntVar Index="38" Type="Constant" Value="0."/>
                <IntVar Index="39" Type="Constant" Value="0."/>
                <IntVar Index="40" Type="Constant" Value="0."/>
                <IntVar Index="41" Type="Constant" Value="0."/>
                <IntVar Index="42" Type="Constant" Value="0."/>
                <IntVar Index="43" Type="Constant" Value="0."/>
                <IntVar Index="44" Type="Constant" Value="0."/>
                <IntVar Index="45" Type="Constant" Value="0."/>
                <IntVar Index="46" Type="Constant" Value="0."/>
                <IntVar Index="47" Type="Constant" Value="0."/>
                <IntVar Index="48" Type="Constant" Value="0."/>
                <IntVar Index="49" Type="Constant" Value="0."/>
    </Material>
```

You can now run the computation with the new behavior law, after removing `<Loading Tag="2"> [...] </Loading>` from **loading.xml**, which does not work in this example:

{{< tabs "amitex-run-umat" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

### MFRONT Behaviors

It is also possible to define custom material behavior laws using **mfront**. Here we present an example of a material behavior defined with mfront, then used with AMITEX_FFTP. The first step is to generate the dynamic library containing the UMAT function:

{{< tabs "amitex-mfront" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mfront --obuild --interface=umat Mazars.mfront
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mfront --obuild --interface=umat Mazars.mfront
```
{{< /tab >}}
{{< /tabs >}}

This creates `src/libUmatBehaviour.so`. You must then modify **material.xml** to call this new behavior law, replacing for example `<Material numM="2" Lib="" Law="elasiso"> [...] </Material>` by:

```xml
    <Material numM="2" Lib="src/libUmatBehaviour.so" Law="umatmazars" >
                    <Coeff Index="1" Type="Constant" Value="1.e+10"/>
                    <Coeff Index="2" Type="Constant" Value="0.2"/>
                    <Coeff Index="3" Type="Constant" Value="0."/>
                    <Coeff Index="4" Type="Constant" Value="0."/>
                    <Coeff Index="5" Type="Constant" Value="1.15"/>
                    <Coeff Index="6" Type="Constant" Value="0.8"/>
                    <Coeff Index="7" Type="Constant" Value="1391.3"/>
                    <Coeff Index="8" Type="Constant" Value="10000"/>
                    <Coeff Index="9" Type="Constant" Value="0.7"/>
                    <Coeff Index="10" Type="Constant" Value="9.375e-5"/>
                    <IntVar Index = "1" Type = "Constant" Value = "0." />
                    <IntVar Index = "2" Type = "Constant" Value = "0." />
                    <IntVar Index = "3" Type = "Constant" Value = "0." />
    </Material>
```

You can now run the computation with the new behavior law:

{{< tabs "amitex-run-mfront" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

Then visualize the results:

{{< tabs "amitex-gnuplot-end" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp gnuplot plot.gp
```
{{< /tab >}}
{{< /tabs >}}
