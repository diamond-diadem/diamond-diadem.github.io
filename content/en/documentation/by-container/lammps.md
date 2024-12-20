---
title: How to use LAMMPS Apptainer image ?
linkTitle: LAMMPS tutorial
weight: 1
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

In preamble, you need to have Apptainer installed on your machine ; see [this link](/en/documentation/install-apptainer/howto/) for more details.

This tutorial focuses on using the LAMMPS container image available at [this address](/en/codes/scientific-computing/lammps/). By following this link, you will get an Apptainer image (`.sif` file format) allowing you to create containers running LAMMPS.

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/).

To have a quick look at Apptainer's main commands, you may refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

<div class="youtube-video" data-video-id="MheJO_FndWw?si=ASHe6wYhiFqR1te9" language="en">
    <div class="youtube-placeholder en">
        <button class="popup-button">Consent to cookies</button>
    </div>
</div>

The image you downloaded is a relocatable and renamable file we recommend putting in a dedicated directory to easily find it. While it can be any directory, in this tutorial we will assume you put it in `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv lammps.sif $HOME/apptainer-images/lammps.sif
```

To illustrate the various commands, a set of LAMMPS input files is available in the form of an archive via [this link](/downloads/lammps-tutorial-inputs.tar.gz). The archive contains the necessary files to perform molecular dynamics calculations for a Silicon/Carbon hybrid system, where atom interactions are modeled using a *Modified Embedded Atom Method* (MEAM) potential. The files included are as follows:

* `data.meam` is a file containing the positions of Silicon and Carbon atoms, as well as the definition of the simulation box.
* `in.file` is the main LAMMPS input script. It defines the variables required by LAMMPS and provides the necessary instructions to perform molecular dynamics calculations.
* `library.meam` is a file of generic parameters used by the MEAM potential to represent *default* interactions between a wide variety of chemical elements.
* `SiC.meam` is also a file defining MEAM interaction parameters. Unlike the previous file, it specifically defines interactions between Silicon and Carbon atoms.

In this tutorial, we will assume that the input files contained in this archive are in the current directory:

```bash
tar -xzf DIAMOND-tutorial.tar.gz # Extracts the content of the archive, creates ./tutorial
cd ./tutorial
```

##  One liner command
For impatient folks, here is how to launch a parallel LAMMPS computation using the container image (previously downloaded and stored in `$HOME/apptainer-images/lammps.sif`). In the case where the current directory contains all  mandatory LAMMPS input files :

```bash
apptainer exec $HOME/apptainer-images/lammps.sif mpirun -np <N> lmp_mpi -in <input.lammps>
```

## Detailed usage for the LAMMPS container
This section presents different ways to use the LAMMPS image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Using the LAMMPS container for sequential runs
To run LAMMPS sequentially (*ie.* without parallelization) without any container, one would use the following command :

```bash
lmp_mpi -in in.file
```
where all LAMMPS input files (including `in.file`, the main input) are stored in the current directory.

To do the same inside a container, we can run three equivalent commands. In each case, we suppose the Apptainer image  `lammps.sif` can be found at `$HOME/apptainer-images/lammps.sif`.

* One can use `apptainer exec` to execute a specific command in the container.

```bash
apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -in in.file
```

* One can use `apptainer run` to call the container's *default* command, namely the `lmp_mpi` executable. We also append instructions at the end of the command allowing to locate LAMMPS input file.

```bash
apptainer run $HOME/apptainer-images/lammps.sif -in in.file # "lmp_mpi" is implicitly called by "run"
```

* One can eventually execute the image as a binary, which is strictly identical to using `apptainer run`.

```bash
$HOME/apptainer-images/lammps.sif -in in.file
```

### Using the LAMMPS container for parallel runs
The `$HOME/apptainer-images/lammps.sif` image embedds a parallelized (through **OpenMP** and **MPI**) version of LAMMPS.

In the case where no containerization would be used, the typical LAMMPS call would look like :

```bash
OMP_NUM_THREADS=2 mpirun -np 4 lmp_mpi -in in.file
```

Using the container, the same command becomes

```bash
apptainer exec --env OMP_NUM_THREADS=2 $HOME/apptainer-images/lammps.sif mpirun -np 4 lmp_mpi -in in.file
```

**Remark**
> Without any specification, LAMMPS uses by default a single **OpenMP** thread (`$OMP_NUM_THREADS=1`) and splitts **MPI** processes over all available cores.

In the previous command, we use the `mpirun` command provided by the embedded version of **OpenMPI** in the container to communicate directly with the host machine hardware. This *embedded* usage has a great advantage, since it uses only the tools installed in the container: it works on all host machines without requiring any installation. However, the version of **OpenMPI** present in the container is not designed to run optimally on all host machines, but to provide satisfactory performance on as wide a range of machines as possible. Typically, in the case of Quantum Espresso, processor utilisation peaks at 85-90% with embedded parallelization. Furthermore, this mode of parallelisation does not allow for distributed computing across multiple compute nodes. While easy porting at the cost of slightly degraded performance may be appropriate for simple testing on a local machine, this is not the case for a high performance computing infrastructure.

In cases where numerical performance is key, we recommend using a hybrid parallelisation mode, where we use the host machine's version of **OpenMPI** as an intermediary between the container's version and the host machine's hardware. See the [dedicated page](/documentation/use/apptainer_parallel/) for more details.

### Display help
To display the container's help message (supposing the image is stored at `$HOME/apptainer-images/lammps.sif`) :

```bash
apptainer run-help $HOME/apptainer-images/lammps.sif
```

To display the container's meta-data (code owner, version, image author, ...) :

```bash
apptainer inspect $HOME/apptainer-images/lammps.sif
```

To run the help command specific to the LAMMPS executable in the container (`lmp_mpi`) :

```bash
apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -h
```

or

```bash
apptainer run $HOME/apptainer-images/lammps.sif -h
```
or

```bash
$HOME/apptainer-images/lammps.sif -h
```

### Partial or total isolation
By default, Apptainer does not fully isolate the container from the host system. One can either have partial or total isolation using respectively the flags `--no-mount` or `--no-home` and `--contain-all` (see [this link](/en/documentation/use/apptainer-isolation-flags) for more information).

Whenever `--containall` is activated, the directory on the host machine containing LAMMPS input-files cannot be accessed from the container !

```bash
apptainer run --containall $HOME/apptainer-images/lammps.sif -in in.file # in.file not found !
```

It is then required to manually mount the current directory (`$PWD`) to the one where we are located by default in the container (`$HOME`) using the `--bind` flag. For instance :

```bash
apptainer run --containall --bind $PWD:$HOME \ # Mounting the current directory to $HOME in the container.
  $HOME/apptainer-images/lammps.sif -in in.file
```

in the case where LAMMPS input files are in the current directory (`$PWD`).

### Interatomic potentials
In LAMMPS, atom interactions are modeled using force fields (or interatomic potentials), and their parameters are specified within formatted files. The type of interaction to apply (i.e., the type of file to look for) in each case is explicitly stated in the main LAMMPS input file.

For example, in our case, the in.file input file instructs LAMMPS to model Silicon/Carbon interactions using the parameters found in `SiC.meam`.

During execution, the code searches for files describing the interactions in the following order:

* First, it looks for a file corresponding (location, potential type, name, ...) to what's defined in the main input (`in.file`).
If nothing is found at the specified path in the main input file (`in.file``), for example, if the file has been inadvertently renamed:

```bash
mv SiC.meam old.meam # inadvertent renaming
```
then the code searches in the directory designated by the environment variable $LAMMPS_POTENTIALS.

For this specific container image, the `$LAMMPS_POTENTIALS` variable points inside the container to `/usr/share/lammps/potentials`. This directory contains the default potenital files included with the version LAMMPS present in the container.

In the (quite rare) case where one has another set of potential they wish to use by default (in `$HOME/Documents/softs/lammps/potentials/` for example), it is however possible to alter this behaviour. This is achievable in two ways :

* On one hand, we can overwite the content of `/usr/share/lammps/potentials` by mounting another directory from the host machine to this very path (using `--bind`). In such cases, `$LAMMPS_POTENTIALS` still points towards `/usr/share/lammps/potentials` but the content of this directory is overwritten.

```bash
# We overwrite /usr/share/lammps/potentials in the container.
apptainer run --bind $HOME/Documents/softs/lammps/potentials/:/usr/share/lammps/potentials \
  $HOME/apptainer-images/lammps.sif -in in.file
```

* On the other hand, one can also redefine `$LAMMPS_POTENTIALS` (using `--env`) to make it point to another path from the host machine . Here, `$LAMMPS_POTENTIALS` is modified and the code looks for potentials in the newly defined path.

```bash
# If no isolation option is used, $HOME/Documents/softs/lammps/potentials/
# is shared with the container.
apptainer run --env LAMMPS_POTENTIALS=$HOME/Documents/softs/lammps/potentials/\
  $HOME/apptainer-images/lammps.sif -in in.file
```

* However, make sure to ensure that this new directory is also accessible within the container. For example:

```bash
# By default, /opt/lammps-potentials is not shared between the host and the container
# We have to mount this directory with --bind.
apptainer run --env LAMMPS_POTENTIALS=/opt/lammps-potentials \ # redefining $LAMMPS_POTENTIALS
  --bind /opt/lammps-potentials:/opt/lammps-potentials       \ # mount the directory in the container
  $HOME/apptainer-images/lammps.sif -in in.file
```

## Exercices

### First exercice
How to use the container image to run a sequential LAMMPS computation ?

**Data**
> * The image is located at : `$HOME/apptainer-images/lammps.sif`
> * Input files (including the main input file `in.file`) are located in the current directory : `$PWD`

Possible answers :
* `apptainer run $HOME/apptainer-images/lammps.sif -in in.file`
* or `apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -in in.file`
* or `$HOME/apptainer-images/lammps.sif -in in.file`
* or

```bash
apptainer exec \
  --env OMP_NUM_THREADS=1 \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 1 lmp_mpi -in in.file
```


### Second exercice
How to use the container image to run a LAMMPS computation (1 **OpenMP** thread and 16 **MPI** cores) ?

**Data**
> * The image is located at : `$HOME/apptainer-images/lammps.sif`
> * Input files (including the main input file `in.file`) are located in the current directory : `$PWD`

Example of a possible answer :

```bash
apptainer exec \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 16 lmp_mpi -in in.file
```
where `--env OMP_NUM_THREADS=1` is implicit and use by default by the container.

### Third exercice
 How to use the container image to run a LAMMPS computation (2 **OpenMP** threads and 8 **MPI** cores) which is fully isolated from the host system ?

**Data**
> * The image is located at : `$HOME/apptainer-images/lammps.sif`
> * Input files (including the main input file `in.file`) are located at : `$HOME/lammps-examples/exercice/`

Example of a possible answer :

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=2 \
  --bind $HOME/lammps-examples/exercice/=$HOME \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 8 lmp_mpi -in in.file
```

<!-- ## Frequently encountered issues with the LAMMPS image

### Issue Lorem ipsum
**Issue description** Lorem ipsum
**Solution**
This issue is caused by lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
