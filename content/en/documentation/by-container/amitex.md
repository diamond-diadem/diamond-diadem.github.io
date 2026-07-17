---
title: "How to use the AMITEX_FFTP Apptainer image ?"
linkTitle: AMITEX_FFTP tutorial
weight: 5
description: "Tutorial on using the DIAMOND AMITEX_FFTP Apptainer container: pulling the image and running FFT-based mechanical simulations for materials."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** or **Docker** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **amitex_fftp** image [available here](/en/codes/scientific-computing/amitex-fftp/)
- Have downloaded the **input files** [available here](/downloads/amitex-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}

Create a directory containing the **amitex_fftp.sif** image and the archive of the **input files**. Move into this directory and extract the archive as follows:

```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extracts the contents of the archive.
```

## One-line command

For those in a hurry, here is how to launch an **Amitex_FFTP** computation:

```bash
apptainer exec amitex_fftp.sif mpirun -np <N> amitex_fftp <args>
```

## Introduction

Amitex_FFTP is a massively parallel simulation code built around the MPI standard, allowing the computational workload to be distributed across multiple processes. There are two ways to run the containerized code in parallel:

- **MPI embedded** in the container => guaranteed to work, but limited to a single machine (a single node)
- **Hybrid MPI** using the host machine’s MPI => works across multiple nodes but may introduce compatibility issues.

## Local simulation (embedded MPI)

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Note that the command first launches **apptainer**, which then executes `mpirun amitex_fftp <args>` inside the container.

## Cluster simulation (hybrid MPI)

### Launch with the SLURM scheduler (recommended)

Example of a minimal launch script **job.sh**:


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

### Launch without a scheduler

```bash
mpirun -np <N> apptainer exec amitex_fftp.sif amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***The `mpirun` command must come from OpenMPI 4 for this to work.**


## Visualizing the results

Generate strain curves with **Gnuplot**:

```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```

This creates `concrete_stress_strain.svg`, which can then be displayed with a standard image viewer.

To visualize `.vtk` files, **Paraview** must be used. We provide a Paraview container [here](/en/codes/visualisation/paraview/). Once the Paraview container has been downloaded, the microstructure concrete.vtk can be visualized as follows:

```bash
apptainer run paraview.sif concrete.vtk
# Then in the graphical interface click "Apply" in the left Properties panel
# Then in the top menu bar select "MaterialId" in the drop-down menu instead of "Solid Color".
# Then in the top menu bar select "Surface" in the drop-down menu instead of "Outline".
```

## (Advanced) User-defined material behavior law

### UMAT Behaviors

It is possible to define custom material behavior laws using a UMAT-compatible procedure. We will look at an example of a user-defined material behavior law used with AMITEX_FFTP. You can retrieve the example provided in the container with:

```bash
cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat .
chmod -R u+w comportement_umat
```

The provided example is already compiled, so you can start by cleaning the `comportement_umat` directory:

```bash
cd comportement_umat
apptainer exec ../amitex_fftp.sif make clean
```

You can now implement the desired behavior by modifying the files with your preferred text editor. Then, recompile the behavior law with:

```bash
apptainer exec ../amitex_fftp.sif make
cd ..
```

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

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

### MFRONT Behaviors

It is also possible to define custom material behavior laws using **mfront**. Here we present an example of a material behavior defined with mfront, then used with AMITEX_FFTP. The first step is to generate the dynamic library containing the UMAT function:

```bash
apptainer exec amitex_fftp.sif mfront --obuild --interface=umat Mazars.mfront
```

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

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Then visualize the results:

```bash 
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```

{{< /tab >}}
{{< tab "Docker" >}}

Create a directory containing the archive of the **input files**. Move into this directory, extract the archive, and modify the file permissions as follows:

```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extracts the contents of the archive.
chmod -R a+rwx $(pwd) # Grants read, write, and execute permissions to all users on the files.
```

It is necessary to grant access permissions to other users on the files, because we will run Docker by specifying a different user.

We then enter the container with the following command:

```bash
docker run -v=$(pwd):/workdir -w=/workdir --user=1000:1000 --entrypoint=bash -it --rm gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp
```

- `-v=$(pwd):/workdir` mounts the current directory into the `/workdir` directory inside the container.
- `-w=/workdir` sets `/workdir` as the working directory inside the container.
- `--user=1000:1000` specifies the user with UID `1000` and GID `1000` inside the container. This prevents commands from being executed as `root`, which is safer and required to use `mpirun`.
- `--entrypoint=bash` and `-it` allow an interactive Bash shell to be launched.
- `--rm` automatically removes the container when exiting the shell.

## One-line command

For users in a hurry, here is how to launch an Amitex_FFTP computation once inside the container:

```bash
mpirun -np <N> amitex_fftp <args>
```

**`mpirun` refuses to run as the root user, so make sure to specify `--user=1000:1000` when starting Docker, or alternatively add `--allow-run-as-root` after each `mpirun` command.**

## Introduction

Amitex_FFTP is a massively parallel computation code built around the MPI standard, which distributes the computational workload across multiple processes. With Docker, it is only possible to use the **MPI embedded** inside the container. This guarantees proper operation, but limits execution to a single machine (a single node).

## Running the example

```bash
mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

No parameters are passed to `mpirun`, so all available CPU cores will be used for the computation.

## Visualizing the results

Generate the stress-strain curves using **Gnuplot**:

```bash
gnuplot < plot.gp
```

This creates `concrete_stress_strain.svg`, which can then be displayed using any standard image viewer.

To visualize `.vtk` files, you need to exit the container and use **ParaView**. We provide a ParaView container [here](/codes/visualisation/paraview/). Once the ParaView container has been downloaded, you can visualize the `concrete.vtk` microstructure as follows:

```bash
apptainer run paraview.sif concrete.vtk
# Then, in the graphical interface, click Apply in the Properties panel on the left
# Then, in the top menu bar, select MaterialId from the dropdown menu instead of Solid Color
# Then, in the top menu bar, select Surface from the dropdown menu instead of Outline
```

## (Advanced) User-defined material behavior law

### UMAT behaviors

It is possible to define custom material behavior laws using a UMAT-compatible procedure. We will look at an example of a user-defined material behavior law used with AMITEX_FFTP. You can retrieve the example provided in the container with:

```bash
cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat .
chmod -R a+rw comportement_umat
```

The provided example is already compiled, so we can start by cleaning the `comportement_umat` directory:

```bash
cd comportement_umat
make clean
```

You can now implement the desired behavior by modifying the files with your preferred text editor. Then, recompile the constitutive law with:

```bash
make
cd ..
```


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

```bash
mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

### MFRONT behaviors

It is also possible to define custom material behavior laws using **mfront**. Here we present an example of a material behavior defined with mfront, then used with AMITEX_FFTP. The first step is to generate the dynamic library containing the UMAT function:

```bash
mfront --obuild --interface=umat Mazars.mfront
```

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

```bash
mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Then visualize the results:

```bash
gnuplot < plot.gp
```

**Some files may be created with permissions that prevent them from being modified or deleted from outside the container. It is possible to change permissions from inside the container using for example: `chmod -R a+rwx $(pwd)`.**


{{< /tab >}}
{{< /tabs >}}

</div>
