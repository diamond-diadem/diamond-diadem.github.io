---
title: How to use Quantum ESPRESSO Apptainer image?
linkTitle: Quantum ESPRESSO tutorial
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

In preamble, you need to have Apptainer installed on your machine; see [this link](/en/documentation/install/install-apptainer/) for more details.

This tutorial focuses on using the Quantum Espresso container image available at [this address](/en/codes/scientific-computing/quantum-espresso/). By following this link, you will get an Apptainer image (`.sif` file format) allowing you to create containers running Quantum Espresso.

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/).

To have a quick look at Apptainer's main commands, you may refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

<!-- <div class="youtube-video" data-video-id="8oKKGG0hy6A?si=1duVepl_lWvG24fC" language="en">
    <div class="youtube-placeholder en">
        <button class="popup-button">Consent to cookies</button>
    </div>
</div> -->

{{< video-with-consent id="8oKKGG0hy6A?si=1duVepl_lWvG24fC" >}}

<!-- <iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/8oKKGG0hy6A?si=1duVepl_lWvG24fC&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

This image is a relocatable and renamable file we recommend putting in a dedicated directory to easily find it. While it can be any directory, in this tutorial we will assume you put it in `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
mv quantum-espresso.sif $HOME/apptainer-images/quantum-espresso.sif
```

To illustrate the different commands, a set of Quantum Espresso input files is available in the form of an archive via [this link](/downloads/qe-tutorial-inputs.tar.gz). The archive contains the necessary files to perform an energy calculation for an organic system containing carbon, magnesium, sulfur, nitrogen, and hydrogen. The files are as follows:

- `qe-tutorial.in` is the main input file for Quantum Espresso, containing the parameters necessary to perform the calculation. The atom positions as well as the definition of the simulation box are also in this file. Finally, we specify where to find the pseudopotentials to describe the exchange-correlation interactions within the system (see below).
- The `pseudo` directory contains the pseudopotential file to model interactions between Silicon atoms in the system (`Si.pz-vbc.UPF`).

In this tutorial, we will assume that the input files contained in this archive are in the current directory:

```bash
tar -xzf DIAMOND-tutorial.tar.gz # Extracts the content of the archive, creates ./tutorial
cd ./tutorial
```

**Disclaimer**

> The commands presented here are for using the `pw.x` executable of Quantum Espresso. This is also the executable called by default by the `apptainer run` command. In the case where you want to call another executable, it is necessary to use `apptainer exec <options> <image> <executable-name>`.

## One liner command

For impatient folks, here is how to launch a parallel Quantum Espresso computation using the container image (previously downloaded and stored in `$HOME/apptainer-images/quantum-espresso.sif`). In the case where the current directory contains all mandatory Quantum Espresso input files:

```bash
apptainer exec $HOME/apptainer-images/quantum-espresso.sif mpirun -np <N> pw.x -in <input.quantum-espresso>
```

## Detailed usage for the Quantum Espresso container

This section presents different ways to use the Quantum Espresso image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer-crash-course).

### Using the Quantum Espresso container

To run Quantum Espresso without any container, one would use the following command:

```bash
pw.x -in qe-tutorial.in
```

where all Quantum Espresso input files (including `qe-tutorial.in`, the main input) are stored in the current directory.

To do the same inside a container, we can run three equivalent commands. In each case, we suppose the Apptainer image `quantum-espresso.sif` can be found at `$HOME/apptainer-images/quantum-espresso.sif`.

- One can use `apptainer exec` to execute a specific command in the container.

```bash
apptainer exec $HOME/apptainer-images/quantum-espresso.sif pw.x -in qe-tutorial.in
```

- One can use `apptainer run` to call the container's _default_ command, namely the `pw.x` executable. We also append instructions at the end of the command allowing to locate Quantum Espresso input file.

```bash
apptainer run $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in # "pw.x" is implicitly called by "run"
```

- One can eventually execute the image as a binary, which is strictly identical to using `apptainer run`.

```bash
$HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in
```

### Using the Quantum Espresso container for parallel runs

The `$HOME/apptainer-images/quantum-espresso.sif` image embeds a parallelized (through **OpenMP** and **MPI**) version of Quantum Espresso.

In the case where no containerization would be used, the typical Quantum Espresso call would look like:

```bash
OMP_NUM_THREADS=2 mpirun -np 4 pw.x -in qe-tutorial.in
```

Using the container, the same command becomes

```bash
apptainer exec --env OMP_NUM_THREADS=2 $HOME/apptainer-images/quantum-espresso.sif mpirun -np 4 pw.x -in qe-tutorial.in
```

**Remark**

> Without any specification, Quantum Espresso uses by default all available **OpenMP** threads (or, if applicable, the number defined by the `OMP_NUM_THREADS` environment variable on the host machine) and splitts **MPI** processes over all available cores.

In the previous command, we use the `mpirun` command provided by the embedded version of **OpenMPI** within the container to communicate directly with the hardware of the host machine. This _embedded_ usage has a major advantage, as we only use the tools installed in the container: it works on all host machines without requiring installation. However, the version of **OpenMPI** within the container is not built to run optimally on all host machines, but to provide satisfactory performance on as wide a range of machines as possible. Typically, in the case of Quantum Espresso, we observe that CPU usage peaks between 85 and 90% with embedded parallelization. Moreover, this parallelization mode also does not allow distributed computing across multiple compute nodes. While ease of portability at the expense of slightly degraded performance may be suitable for conducting simple tests on a local machine, this is not the case on a high-performance computing infrastructure.

In cases where numerical performance is crucial, it is recommended to use a hybrid parallelization mode, where we use the **OpenMPI** version of the host machine as an intermediary between that of the container and the hardware of the host machine. For more details, please refer to the [dedicated page](/en/documentation/use/apptainer-parallel/).

### Display help

To display the container's help message (supposing the image is stored at `$HOME/apptainer-images/quantum-espresso.sif`):

```bash
apptainer run-help $HOME/apptainer-images/quantum-espresso.sif
```

To display the container's meta-data (code owner, version, image author, ...):

```bash
apptainer inspect $HOME/apptainer-images/quantum-espresso.sif
```

### Partial or total isolation

By default, Apptainer does not fully isolate the container from the host system. One can either have partial or total isolation using respectively the flags `--no-mount` or `--no-home` and `--containall` (see [this link](/en/documentation/use/apptainer-isolation-flags/) for more information).

Whenever `--containall` is activated, the directory on the host machine containing Quantum Espresso input-files cannot be accessed from the container!

```bash
apptainer run --containall $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in # qe-tutorial.in not found!
```

It is then required to manually mount the current directory (`$PWD`) to the one where we are located by default in the container (`$HOME`) using the `--bind` flag. For instance:

```bash
apptainer run --containall --bind $PWD:$HOME \ # Mounting the current directory to $HOME in the container.
  $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in
```

in the case where Quantum Espresso input files are in the current directory (`$PWD`).

## Exercices

### First exercice

How to use the container image to run a Quantum Espresso computation?

**Data**

> - The image is located at: `$HOME/apptainer-images/quantum-espresso.sif`
> - Input files (including the main input file `qe-tutorial.in`) are located in the current directory: `$PWD`

Possible answers:

- `apptainer run $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in`
- or `apptainer exec $HOME/apptainer-images/quantum-espresso.sif pw.x -in qe-tutorial.in`
- or `$HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in`

### Second exercice

How to use the container image to run a Quantum Espresso computation (1 **OpenMP** thread and 16 **MPI** cores)?

**Data**

> - The image is located at: `$HOME/apptainer-images/quantum-espresso.sif`
> - Input files (including the main input file `qe-tutorial.in`) are located in the current directory: `$PWD`

Example of a possible answer:

```bash
apptainer exec \
  --env OMP_NUM_THREADS=1
  $HOME/apptainer-images/quantum-espresso.sif \
  mpirun -np 16 pw.x -in qe-tutorial.in
```

where `--env OMP_NUM_THREADS=1` is mandatory, as without it the container uses by defalut all the available threads.

### Third exercice

How to use the container image to run a Quantum Espresso computation (2 **OpenMP** threads and 8 **MPI** cores) which is fully isolated from the host system?

**Data**

> - The image is located at: `$HOME/apptainer-images/quantum-espresso.sif`
> - Input files (including the main input file `qe-tutorial.in`) are located at: `$HOME/quantum-espresso-examples/exercice/`

Example of a possible answer:

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=2 \
  --bind $HOME/quantum-espresso-examples/exercice/=$HOME \
  $HOME/apptainer-images/quantum-espresso.sif \
  mpirun -np 8 pw.x -in qe-tutorial.in
```

<!-- ## Frequently encountered issues with the Quantum Espresso image

### Issue Lorem ipsum
**Issue description** Lorem ipsum
**Solution**
This issue is caused by lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
