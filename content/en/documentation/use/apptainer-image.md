---
title: How to interact with an Apptainer image?
weight: 1
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

In preamble, you need to have Apptainer installed on your machine ; see [this link](/en/documentation/install-apptainer/howto/) for more details.

This tutorial explains the main ways to interact with an Apptainer image in order to generate and manage containers. Instructions presented here are in principle also valid for any other Apptainer container.

{{< /callout >}}

<!-- <iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/CPEsOTpOcic?si=59P2En0ztmJ0ykwu&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen ></iframe> -->

{{< video-with-consent id="CPEsOTpOcic?si=59P2En0ztmJ0ykwu" lang="en" >}}

A custom image dedicated to the practical application of this tutorial is available by typing the following command

```bash
apptainer pull tutorial.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/tutorial.sif:latest
```

The result is an Apptainer image (`.sif` file format). This image is a relocatable and renameable file, and it is advisable to place it in a dedicated directory for easy retrieval; this can be any directory, and for the purposes of this tutorial we'll assume you have placed it in a directory called `$HOME/apptainer-images`:

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
$ apptainer exec $HOME/apptainer-images/tutorial.sif echo "Hi from the container !"
```
creates a container from the `$HOME/apptainer-images/tutorial.sif` image, invokes the `echo "Hi from the container !"` command within the container, and then destroys it.

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


## Isolation between the host and the container
By default, pptainer does not fully isolate the container from the host system, but there are options to alter this behavior at different degrees. These options, and the directories share by default, are extensively discussed in a [dedicated tutorial section](/en/documentation/use/apptainer-isolation-flags/).

Here, we only present the most general option (`--containall`), which allows to isolate the container's environment and file system from the host at once.

```bash
apptainer run --containall $HOME/apptainer-images/tutorial.sif
```

It is likely, when playing with the previous option, that the directory containing possibly required input or output files can not be accessed from the container ! It is then required to manually mount it to the container using the `--bind` flag. For example, one may imagine the following little exercise : create a file on the host machine, make it available inside the container, create a copy of it inside the container, and then retrieve the copy on the host machine.

```bash
# Creating a file on host
date > $PWD/test-host.txt

apptainer exec                          \
    --containall                        \
    --bind $PWD:/opt                    \ # Mounting the current directory to /opt in the container
    $HOME/apptainer-images/tutorial.sif \
    cp /opt/test-host.txt /opt/test-container.txt # Create a copy of the file in the container

# Verification on host
cat $PWD/test-host.txt $PWD/test-container.txt
```

## See also
If this tutorial helped you to discover the basci usage of Apptainer, you can also take a look at the following pages to better take the platform tools into your own hands:
* [How to use a containerized code in parallel?](/en/documentation/apptainer-parallel/howto)
* [What are the options to isolate a container from its host?](/en/documentation/use/apptainer-isolation-flags)
* [What about Guix packages?](/en/documentation/TODO:page-to-come)
* [How to ask for help?](/en/documentation/TODO:page-to-come)

</div>
