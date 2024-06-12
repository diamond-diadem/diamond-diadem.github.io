---
title: How to interact with an Apptainer image ?
---



{{< callout context="note" title="" icon="info-circle" >}}

In preamble, you need to have Apptainer installed on your machine ; see [this link](/en/documentation/install-apptainer/howto/) for more details.

This tutorial explains the main ways to interact with an Apptainer image in order to generate and manage containers. Instructions presented here are in principle also valid for any other Apptainer container. A tailor-made image dedicated to the present tutorial is available at [this address](/en/codes/scientific-computing/lammps/). By following this link, you will get an Apptainer image (`.sif` file format) that will allow you to create containers.

{{< /callout >}}



<iframe class="tuto-video" src="https://www.youtube.com/embed/tbHy7m1hOwM?si=sJXWIGunSeC4IJ1Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


 

The image you downloaded is a relocatable and renamable file we recommend putting in a dedicated directory to easily find it. While it can be any directory, in this tutorial we will assume you put it in `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv ./tutorial.sif $HOME/apptainer-images/tutorial.sif
```

## Apptainer : crash course
This section is aimed for people who have not used Apptainer yet.

The main way to interact with the image is through invoking the `apptainer` command, followed by different arguments :

* The `run` argument spawns a container from the image, runs the *container's default command* within the container, and then destroys it.

```bash
$ apptainer run $HOME/apptainer-images/tutorial.sif
```
**Note**
> If the command invoked by `apptainer run` allowed supplementary arguments (which is not the case here), they could be provided by appending them at the end.

* The `exec` argument is similar to the `run` argument, only invoking **any** specified command inside the container. For example :

```bash
$ apptainer exec $HOME/apptainer-images/tutorial.sif echo Hi from the container !
```
creates a container from the `$HOME/apptainer-images/tutorial.sif` image, invokes the `echo Hi from the container !` command within the container, and then destroys it.

* The `shell` argument allows to enter an interactive shell inside the container (the `Apptainer>` *prompt* then appears on the left of the command line), run successive commands, then exit the container using `exit` or `Crtl+D`, which also destroys it. For example :

```bash
$ apptainer shell $HOME/apptainer-images/tutorial.sif
Apptainer> pwd
Apptainer> cd ..
Apptainer> pwd
Apptainer> date
Apptainer> exit
$ 
```

**Remark**
> Playing with `exec` and `shell` using different images, you will sometimes notice the number of commands available inside the container is quite limited. Indeed, a container should ideally restrict its content to be as close as possible to the minimal tools to run the code it embedds. It should hence remove superfluous utilitaries, both for portability (image size) and security reasons.

* The `run-help` argument displays the image's associated help message.

```bash
apptainer run-help $HOME/apptainer-images/tutorial.sif
```

* The `inspect` argument displays the image's meta-data (image's author, version, creation date, ...).

```bash
apptainer inspect $HOME/apptainer-images/tutorial.sif
```

You may also directly execute the image, as a binary :

```bash
$ $HOME/apptainer-images/tutorial.sif
```
which is strictly equivalent to `apptainer run $HOME/apptainer-images/tutorial.sif`

## Environment variables
Many tools require environment variables definition to run. In principle, a correctly-built container pre-defines suitable default values for them, but it is common for a user to wish and modifiy one (or more). With Apptainer, you may specify the value you want an environment variable to have through the `--env` flag.

For instance, the default command invoked by `apptainer run $HOME/apptainer-images/tutorial.sif` is :

```bash
echo $GREET $USER "who just ran the default command of the container."
```
where the `$GREET` variable is defined to be "Welcome" by default in the container.

The `$USER` is automatically set so that its value inside the container is the same as for the host machine. This design choice is not specific to the image used in this tutorial. It is one of many Apptainer standard behaviours to ease functionning in a high-performance computation setting.

Those two variables may be redefined :

```bash
apptainer run --env GREET=Hello $HOME/apptainer-images/tutorial.sif
```
or

```bash
apptainer run --env USER=newusername $HOME/apptainer-images/tutorial.sif
```
**Remark**
> When one modifies `$USER`, Apptainer may display a message warning the environment variable's value is accepted but deviates from the standard behaviour.

```bash
WARNING: Environment variable USER already has value [newusername], will not forward new value [oldusername] from parent process environment
```


## Partial or total isolation
By default, Apptainer does not fully isolate the container from the host system. The following paths of the host are mounted and by default available from the container : `$HOME`, `$PWD` `/sys`, `/proc`, `/tmp`, `/var/tmp`, `/etc/resolve.conf` and `/etc/passwd`.

If one wishes to isolate the container from the host machine, Apptainer offers several options (to be added to `apptainer run`, `apptainer exec` or `apptainer shell`) :

* use the `--no-mount` flag to unbind one or several paths in the container, for instance

```bash
apptainer run --no-mount sys $HOME/apptainer-images/tutorial.sif
```

* use the `--no-home` flag to make `$HOME` unavailable for the container (although `$PWD` remains mounted) :

```bash
apptainer exec --no-home $HOME/apptainer-images/tutorial.sif ls $HOME
```
> Here, we see `$HOME` exists inside the container but does not match the one one host machine.

* use the `--containall` flag to completely isolate the container from the host.

```bash
apptainer run --containall $HOME/apptainer-images/tutorial.sif
```

It is likely, for instance when playing with the previous options, that the directory containing possibly required input or output files can not be accessed from the container ! It is then required to manually mount it to the container using the `--bind` flag. For example, one may imagine the following little exercise : create a file on the host machine, make it available inside the container, create a copy of it inside the container, and then retrieve the copy on the host machine.

```bash
# Creating a file on host
date > $PWD/test-host.txt

apptainer exec --bind $PWD:/opt \                 # Mounting the current directory to /opt in the container
    $HOME/apptainer-images/tutorial.sif           \
    cp /opt/test-host.txt /opt/test-container.txt # Create a copy of the file in the container

# Verification on host
cat $PWD/test-host.txt $PWD/test-container.txt
```

