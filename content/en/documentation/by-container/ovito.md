---
title: How to use the Ovito Apptainer image ?
linkTitle: Ovito tutorial
weight: 2
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before proceeding with these explanations, it is necessary to have Apptainer installed on your machine; see [this link](/en/documentation/install/install-apptainer/) for more details.

This tutorial details the usage of the Ovito code container image downloadable at [this address](/en/codes/visualisation/ovito/). By following this link, you retrieve an Apptainer image (file format `.sif`) that allows you to create containers capable of running Ovito.

For more information on Apptainer containers, please refer to the [dedicated page](/en/about/apptainer/).

To quickly grasp the main Apptainer commands, you can refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

<!-- <div class="youtube-video" data-video-id="YE_r67OEEFg?si=t1ZbARrAwnFjFdYj" language="en">
    <div class="youtube-placeholder en">
        <button class="popup-button">Consent to cookies</button>
    </div>
</div> -->

{{< video-with-consent id="YE_r67OEEFg?si=t1ZbARrAwnFjFdYjnc" >}}

<!-- <iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/YE_r67OEEFg?si=t1ZbARrAwnFjFdYj&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

This image is a relocatable and renamable file, which is recommended to be placed in a dedicated directory for easy retrieval; this directory can be any, and for the purpose of this tutorial, we assume you have placed it in a directory named `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
mv ovito.sif $HOME/apptainer-images/ovito.sif
```

To illustrate the operation of the visualization program, a set of atomic position files readable with Ovito are available as an archive via [this link](/downloads/ovito-tutorial-inputs.tar.gz). This archive contains the following files:

- `C-diamond.cif` which contains positions of Carbon atoms forming a diamond structure in the _Crystallographic Information File_ format, one of the standard text file formats for storing information about crystal structures.
- `POSCAR_Si-diamond` which is a file containing positions of another diamond structure, this time for Silicon atoms. The format of this file is used by the `VASP`, simulation code, very popular for studying the electronic structure of materials at the quantum scale.
- a set of `SiC.*.lmp` files contained in a subfolder `MD`. These files, in the format used by the classical atomistic simulation code `LAMMPS`, track the evolution of a Silicon/Carbon hybrid system during a molecular dynamics calculation.

In this tutorial, we will assume that the input files contained in this archive are in the current directory:

```bash
tar -xzf ovito-tutorial-inputs.tar.gz # Extracts the content of the archive, creates ./tutorial
cd ./tutorial
```

## One liner command

For those in a hurry, here's how to launch the Ovito visualization tool using the container image (previously downloaded and located at `$HOME/apptainer-images/ovito.sif`). In case the current directory contains an input file readable by Ovito:

```bash
apptainer run $HOME/apptainer-images/ovito.sif <input.file>
```

## Details to use Ovito container

This section presents the different ways to use the Ovito image. For more details on Apptainer commands, please refer to [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

To execute Ovito without any containerization, one would use the command:

```bash
ovito <input.file.1> <input.file.2> ...
```

where the input files`input.file.*` are optional and allow loading the configurations that one wants to display directly at the application's launch.

With Apptainer, the operation is similar, with a few differences:

- Apptainer must be called to launch the container (a command line).
- if one wishes to isolate the container from their machine, then it must be ensured that access to the files to be loaded into Ovito is possible (two options in the previous command line).
- it has to be enforced, in such cases, that the container has access to the graphical resources of the host machine (another option).

Each of these points is detailed in the following sections.

### Launching the Ovito container with Apptainer

To run a command within an Apptainer container, one can use `apptainer exec <image name> <command>`, to which options can be added and will be detailed in the following parts. In our case, where the image is located at the path `$HOME/apptainer-images/ovito.sif`, and where the command is in the form `ovito C-diamond.cif` with the atomic configuration file `C-diamond.cif` in the current directory, we can do:

```bash
apptainer exec $HOME/apptainer-images/ovito.sif ovito C-diamond.cif
```

The execution of this command works as follows:

- creation of a container from the Apptainer image `$HOME/apptainer-images/ovito.sif`.
- execution, within this container, of the command `ovito C-diamond.cif`. An Ovito window then appears, with which one can interact as one would normally if Ovito were installed on their machine.
- once the application usage is finished (i.e., when the Ovito window is closed), destruction of the container and release of resources.

The same behavior can be replicated with `apptainer run` which directly calls the default command of the image, `ovito`, to which arguments can be added.

```bash
apptainer run $HOME/apptainer-images/ovito.sif C-diamond.cif # the "ovito" command is implicitely called.
```

Finally, one can directly call the image as an executable, which is strictly identical to using `apptainer run` (for variety, let's change the configuration file).

```bash
$HOME/apptainer-images/ovito.sif POSCAR_Si-diamond
```

### Isolation between the container and the host machine

By default, Apptainer does not fully isolate the container from the host system. One can either have partial or total isolation using respectively the flags `--no-mount` or `--no-home` and `--containall` (see [this link](/en/documentation/use/apptainer-isolation-flags) for more information). In case the `--containall` option is activated, we encounter two difficulties.

#### Sharing graphical tesources

On one hand, it is possible that an error message appears, informing you that one of the library plugins (`qt.qpa.xcb`), fails to connect to your display resources.

```bash
apptainer run --containall $HOME/apptainer-images/ovito.sif
[...]
qt.qpa.xcb: could not connect to display
[...]
Aborted
```

This is not an incompatibility between your machine and the container: the latter is trying to connect to the wrong graphical resources. This connection attempt is guided by the `$DISPLAY` environment variable, and the error comes from the fact that the value this variable takes inside the container does not match the one it takes on your machine.

This problem is directly due to the total isolation between the container and the host machine, since in this specific case, no environment variables from your machine are transmitted to the container by Apptainer.

To work around this problem, you simply need to specify to the `apptainer run` command (or `apptainer exec`) what value to assign to this environment variable within the container. For this, you can use the `--env <variable>=<value>` flag, as follows:

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/ovito.sif
```

#### File access

On the other hand, the directory containing the input files is not accessible within the container!

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/ovito.sif MD/SiC.*.lmp
[...]
ERROR: File does not exist: MD/SiC.0000.lmp
```

You then need to manually mount the current directory (`$PWD`) to the directory where you are by default in the container (`$HOME`) with the `--bind` flag. For example:

```bash
apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME \ # Mount the current directory to $HOME in the container.
  $HOME/apptainer-images/ovito.sif MD/SiC.*.lmp
```

in case the Ovito input files (in a `MD/` subfolder) are located in the current directory (`$PWD`).

> **Note**
> Note that when the `--containall` and `--bind` flags are used together, only the contents of directories explicitly mounted within the container can be loaded into Ovito. Similarly, in cases where we want to export our work to a configuration file, these options require us to export only to explicitly mounted directories, otherwise we risk not retrieving the files when the container is destroyed if we write to unshared directories.

### Display help

To display the container's help message (assuming the image is stored under `$HOME/apptainer-images/ovito.sif`):

```bash
apptainer run-help $HOME/apptainer-images/ovito.sif
```

To display the container's metadata (code owner, version, image author, etc.):

```bash
apptainer inspect $HOME/apptainer-images/ovito.sif
```

## Exercises

### Exercise 1

How to use the container image to open Ovito?

> **Data**
>
> - The image is located at the following path: `$HOME/apptainer-images/ovito.sif`
> - Initially, we do not want to specify which configuration file to load, but we want to be able to open them later through the Ovito graphical interface, without knowing _a priori_ where they are located on our machine.

Possible answers:

- `apptainer exec $HOME/apptainer-images/ovito.sif ovito`
- or `apptainer run $HOME/apptainer-images/ovito.sif`
- or `./$HOME/apptainer-images/ovito.sif`

Note that we do not specify an input file, and we do not use any isolation (no `--containall` flag) to be able to access our file tree within the container.

### Exercise 2

How to visualize only configurations prior to the 100th step of a molecular dynamics calculation with the Ovito container image?

> **Data**
>
> - The image is located at the following path: `$HOME/apptainer-images/ovito.sif`
> - The configuration files of the molecular dynamics calculation we are interested in are located in `$PWD/MD` on the host machine.
> - The configuration files are named `SiC.XXXX.lmp` (the first configuration is `SiC.0000.lmp` and the 42th is `SiC.0425.lmp`, for example).
> - Free choice for isolation between the container and the host machine.

Examples of possible answers:

- `apptainer exec $HOME/apptainer-images/ovito.sif ovito MD/SiC.00*.lmp`
- or `apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME $HOME/apptainer-images/ovito.sif MD/SiC.00*.lmp`

<!-- ## Frequently encountered issues with the Ovito image

### Issue Lorem ipsum
**Issue description** Lorem ipsum
**Solution**
This issue is caused by lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
