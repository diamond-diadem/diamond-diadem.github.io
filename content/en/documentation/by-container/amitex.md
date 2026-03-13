---
title: "How to use the AMITEX_FFTP Apptainer image ?"
linkTitle: AMITEX_FFTP tutorial
weight: 7
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

### Prerequisites:

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **amitex-fftp.sif** image [available here](/en/codes/scientific-computing/amitex-fftp/)
- Have downloaded the **input files** [available here](/en/codes/scientific-computing/amitex-fftp/)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.


{{< /callout >}}

Create a directory containing the **amitex-fftp.sif** image and the **input files**, then move into this directory.

## One-line command

For those in a hurry, here is how to launch an **Amitex_FFTP** computation:

```bash
apptainer exec amitex-fftp.sif mpirun -np <N> amitex_fftp <args>
```



## Introduction

Amitex_FFTP is a massively parallel simulation code built around the MPI standard, allowing the computational workload to be distributed across multiple processes. There are two ways to run the containerized code in parallel:

- **MPI embedded** in the container => guaranteed to work, but limited to a single machine (a single node)
- **Hybrid MPI** using the host machine’s MPI => works across multiple nodes but may introduce compatibility issues.

## Local simulation (embedded MPI)

```bash
apptainer exec amitex-fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Note that the command first launches **apptainer**, which then executes `mpirun amitex_fftp <args>` inside the container.


## Cluster simulation (hybrid MPI)

### Launch without a scheduler

```bash
mpirun -np <N> apptainer run amitex-fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***The `mpirun` command must come from OpenMPI 4 for this to work.**

For reference, `apptainer run amitex-fftp.sif` is a shortcut for `apptainer exec amitex-fftp.sif amitex_fftp`.


### Launch with the SLURM scheduler (recommended)

Example of a minimal launch script **job.sh**:

```
#!/bin/bash

#SBATCH --job-name=Test_Amitex
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer run amitex-fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

The computation can then be launched with the command:

```bash
sbatch job.sh
```





## Visualizing the results

Generate strain curves with **Gnuplot**:

```bash
apptainer exec amitex-fftp.sif gnuplot < plot.gp
```

This creates `concrete_stress_strain.svg`, which can then be displayed with a standard image viewer.

To visualize `.vtk` files, **Paraview** must be used. We provide a Paraview container [here](/en/codes/visualisation/paraview/). Once the Paraview container has been downloaded, the microstructure concrete.vtk can be visualized as follows:

```bash
apptainer run paraview.sif concrete.vtk
# Then in the graphical interface click "Apply" in the left Properties panel
# Then in the top menu bar select "MaterialId" in the drop-down menu instead of "Solid Color".
```





## (Advanced) User-defined material behavior law

It is possible to define custom material behavior laws, notably using **mfront**. Here we present an example of a material behavior defined with mfront, then used with AMITEX_FFTP. The first step is to generate the dynamic library containing the UMAT function:

```bash
apptainer exec amitex-fftp.sif mfront --obuild --interface=umat Mazars.mfront
```

This creates `src/libUmatBehaviour.so`. You must then modify **materials.xml** to call this new behavior law, replacing for example `<Material numM="1" Lib="" Law="viscoelas_maxwell"> [...] </Material>` by:

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
apptainer exec amitex-fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Then visualize the results:

```bash	
apptainer exec amitex-fftp.sif gnuplot < plot.gp
```

</div>
