---
title:  "How to use the ParaView Apptainer image?"
linkTitle: ParaView tutorial
weight: 4
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before proceeding with these explanations, it is necessary to have installed Apptainer on your machine; see [this link](/en/documentation/install-apptainer/howto/) for more details.

This tutorial details the usage of the container image of the ParaView code downloadable at [this address](/en/codes/visualisation/paraview/). By following this link, you obtain an Apptainer image (file format `.sif`) that allows you to create containers capable of running ParaView.

For more information about Apptainer containers, please consult the [dedicated page](/en/about/apptainer/).

To quickly grasp the main commands of Apptainer, you can refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

<!-- <div class="youtube-video" data-video-id="_pphW6i0qSI?si=CuCRPPPjFi-uAkfI" language="en">
    <div class="youtube-placeholder en">
        <button class="popup-button">Consent to cookies</button>
    </div>
</div> -->

{{< video-with-consent id="_pphW6i0qSI?si=CuCRPPPjFi-uAkfI" lang="en" >}}

<!-- <iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/_pphW6i0qSI?si=CuCRPPPjFi-uAkfI&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

This image is a relocatable and renamable file, which is recommended to be placed in a dedicated directory for easy retrieval; this directory can be any, and for the purposes of this tutorial, we assume you have placed it in a directory named `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
mv paraview.sif $HOME/apptainer-images/paraview.sif
```

To illustrate the functioning of the visualization program, a set of files readable with ParaView is available in archive form via [this link](/downloads/paraview-tutorial-inputs.tar.gz). This archive contains the following files:

* `tutorial-disk.ex2`, one of the example files provided by default with ParaView containing the structure of a hollow cylinder in the *ex2* format, typically used with the *ExodusII* finite element code.
* `tutorial-can.ex2`, also provided by default with ParaView, which allows reproducing the evolution of a cylindrical object (such as a can) crushed by a blunt object.

In this tutorial, we assume that the input files contained in this archive are in the current directory:

```bash
tar -xzf DIAMOND-tutorial.tar.gz # Extracts the contents of the archive, creating ./tutorial
cd ./tutorial
```

## One-line command

For those in a hurry, here's how to launch the ParaView visualization tool using the container image (downloaded beforehand and located at `$HOME/apptainer-images/paraview.sif`). In case the current directory contains a file readable by ParaView:

```bash
apptainer run $HOME/apptainer-images/paraview.sif <input.file>
```

### Detail of using the ParaView container

This section presents the various ways to use the ParaView image. For more details on Apptainer commands, please refer to [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

To run ParaView without any containerization, one would use the command:
```bash
paraview <input.file.1> <input.file.2> ...
```
where the input files `input.file.*` are optional and allow loading the structure(s) that you want to display directly upon application launch.
**Note**
> To display the loaded data, you need to apply visual rendering by clicking the `Apply` button in the `Properties` panel appearing on the left.

With Apptainer, the operation is similar, with a few differences:
* you need to call Apptainer to launch the container (a command line).
* if you want to isolate the container from your machine, then you need to ensure access to the files you want to load in ParaView (two options in the previous command line).
* you need to ensure, if necessary, that the container has access to the graphical resources of the host machine (another option).

Each of these points is detailed in the following sections.

### Launching the ParaView container with Apptainer

To launch a command in an Apptainer container, you can use `apptainer exec <image name> <command>`, to which you can add options detailed in the following sections. In our case, where the image is located at the path `$HOME/apptainer-images/paraview.sif`, and where the command is of the form `paraview tutorial-disk.ex2` with the configuration file `tutorial-disk.ex2` in the current directory, we can do:
```bash
apptainer exec $HOME/apptainer-images/paraview.sif paraview tutorial-disk.ex2
```

This command works as follows:

* creation of a container from the Apptainer image `$HOME/apptainer-images/paraview.sif`.
* execution, within this container, of the command `paraview tutorial-disk.ex2`. A ParaView window then appears, with which you can interact as you would normally if ParaView were installed on your machine.
* once the application usage is finished (i.e., when you close the ParaView window), the container is destroyed and resources are released.

We can replicate the same behavior with `apptainer run` which directly calls the default command of the image, `paraview`, to which arguments can be added.

```bash
apptainer run $HOME/apptainer-images/paraview.sif tutorial-disk.ex2 # the "paraview" command is implicitly called.
```

Finally, you can directly call the image as an executable, which is strictly identical to using `apptainer run` (for the sake of formality, let's change the configuration file).

```bash
$HOME/apptainer-images/paraview tutorial-can.ex2
```

### Isolation between the container and the host machine
By default, Apptainer does not fully isolate the container from the host machine's system; for partial or total isolation, respectively, the `--no-mount` or `--no-home` and `--containall` flags should be used (see [this link](/en/documentation/use/apptainer-isolation-flags) for more information). In cases where the `--containall` option is activated, we encounter two difficulties.

#### Sharing graphical resources
On one hand, it is possible that an error message appears, informing you that one of the library plugins (`qt.qpa.xcb`) fails to connect to your display resources.

```bash
apptainer run --containall $HOME/apptainer-images/paraview.sif
[...]
qt.qpa.xcb: could not connect to display
[...]
Aborted
```

This is not an incompatibility between your machine and the container: the latter is actually attempting to connect to the wrong graphical resources. This connection attempt is guided by the `$DISPLAY` environment variable, and the error arises because the value this variable takes within the container does not match the one it takes on your machine.

This problem is directly due to the total isolation between the container and the host machine, since in this specific case, no environment variable from your machine is transmitted to the container by Apptainer.

To circumvent this issue, simply specify to the `apptainer run` command (or `apptainer exec`) what value to assign to this environment variable within the container. For this, you can use the `--env <variable>=<value>` flag, as follows:

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/paraview.sif
```

#### File access
On the other hand, the directory containing the input files is not accessible within the container!

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/paraview.sif tutorial-disk.ex2
[...]
critical: Cannot open data file " "tutorial-disk.ex2" "
```

You must then manually mount the current directory (`$PWD`) to the directory where you are by default in the container (`$HOME`) with the `--bind` flag. For example:

```bash
apptainer run --containall --bind $PWD:$HOME \ # Mounts the current directory to $HOME in the container.
  $HOME/apptainer-images/paraview.sif tutorial-disk.ex2
```
in the case where the Paraview input files are located in the current directory (`$PWD`).

**Note**
> Note that in cases where the `--containall` and `--bind` flags are used together, only the contents of the directories explicitly mounted within the container can be loaded into ParaView. Similarly, in cases where we want to export our work to an output file, these options force us to export only to the explicitly mounted directories, otherwise we may not retrieve the files when the container is destroyed if we write to non-shared directories.

### Displaying help

To display the container's help message (assuming the image is stored under `$HOME/apptainer-images/paraview.sif`):

```bash
apptainer run-help $HOME/apptainer-images/paraview.sif
```

To display the container's metadata (code owner, version, image author, etc.):

```bash
apptainer inspect $HOME/apptainer-images/paraview.sif
```

## Exercises

### Exercise 1
How to use the container image to open ParaView?

> **Data**
> * The image is located at the following path: `$HOME/apptainer-images/paraview.sif`.
> * Initially, we do not want to specify which configuration file to load, but we want to be able to open them later through the ParaView graphical interface, without knowing *a priori* where they are located on our machine.

Possible answers:

* `apptainer exec $HOME/apptainer-images/paraview.sif paraview`
* or `apptainer run $HOME/apptainer-images/paraview.sif`
* or `./$HOME/apptainer-images/paraview.sif`

Note that we do not specify an input file, and we do not use any isolation (no `--containall` flag) to access our file tree within the container.

### Exercise 2

How to visualize an animation contained in a file with a ParaView container and save this animation in `avi` format?

> **Data**
> * The image is located at the following path: `$HOME/apptainer-images/paraview.sif`
> * The file containing the animation of interest is located at `$PWD/tutorial-can.ex2` on the host machine.
> * To display the loaded data, visual rendering needs to be applied by clicking the `Apply` button in the `Properties` panel appearing on the left.
> * It is possible to interact with the `Properties` panel and modify the viewpoint to highlight the animation.
> * Within ParaView, exporting to `avi` format can be done via `File > Save Animation`.
> * We will try to provide a solution without isolating the host machine from the container, and a solution isolating the container as much as possible from the host machine.

Examples of possible answers:
* `apptainer exec $HOME/apptainer-images/paraview.sif paraview tutorial-can.ex2`
* or `apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME $HOME/apptainer-images/paraview.sif tutorial-can.ex2`

<!-- ## Frequently encountered issues with the ParaView image

### Issue Lorem ipsum
**Issue description** Lorem ipsum
**Solution**
This issue is caused by lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
