---
title: Accessing and using Diamond Guix Packages
weight: 5
description: "How to access and use DIAMOND Guix packages for scientific codes, enabling reproducible materials simulation software on HPC environments."
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before these explanations, it is necessary to have Guix installed on your machine; see [this link](/en/documentation/install/install-guix/) for more details.

This tutorial explains the main commands for interacting with Guix packages to create and interact with temporary software environments.

{{< /callout >}}

## Accessing Diamond packages

There are two ways to access Diamond Guix packages.

### Method 1: Use the stable channel configuration

The most reliable way is to use the `channels-stable.scm` file provided in the [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects) repository.

With this file, Guix commands can be run through:

```bash
guix time-machine -C channels-stable.scm -- <command>
```

This ensures that the correct versions of all dependencies are used.

For example, after cloning the repository, you can rebuild one of the Diamond containers with:

```bash
guix time-machine -C channels-stable.scm -- pack -f squashfs -S /bin=bin -S /share=share -m src/manifests/<image>.manifest
```

### Method 2: Add the Diamond Guix channel to the Guix configuration.

You can also add the Diamond Guix channel to your local Guix configuration. This makes Diamond packages available alongside the standard GNU Guix packages without using `guix time-machine`.

Create the file `~/.config/guix/channels.scm` and add the following content:

```scheme
;; Add DIAMOND packages to those provided by GNU Guix.
(cons (channel
        (name 'guix-channel)
        (url "https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-channel.git"))
      %default-channels)
```

Then update your package list:

```bash
guix pull
```

This command updates both the standard GNU Guix packages and the Diamond packages.

**Caution** 
> Once guix pull is complete, it is important to run the following commands to ensure that you are using the latest guix command: 
> 
>
> ```bash
> GUIX_PROFILE="$HOME/.config/guix/current"
> . "$GUIX_PROFILE/etc/profile"
> ```

You can check that the Diamond packages are available with:

```bash
guix search quantum-espresso
```

Then for example, `quantum-espresso` and `OpenMPI` can be installed with:

```bash
guix install quantum-espresso openmpi@4
```

---

## Using Guix packages

### Using `guix shell`

The `guix shell` command creates a temporary environment containing all the software needed to run a program.

We recommend using:

* the `--pure` option, which removes environment variables inherited from the host system (similar to Apptainer's `--cleanenv` option);
* a `manifest.scm` file, which lists all required packages.

Examples of manifests are available in the [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/-/tree/main/src/manifests) repository.

A typical usage is:

```bash
guix shell --pure -m quantum-espresso.manifest
```

This starts a clean environment containing all packages listed in the manifest.

---

### Using `guix time-machine`

Some applications require specific versions of dependencies. If you have updated your packages with `guix pull`, you may have newer versions that are incompatible with the software you want to use. The `guix time-machine` command allows you to use an older Guix package collection by restoring previous channels states. Diamond provides the `channels-stable.scm` file in [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects) repository, which pins compatible versions of all required dependencies. This allows Diamond packages to be used reliably.

For example, to create an environment containing `quantum-espresso` and OpenMPI:

```bash
guix time-machine -C channels-stable.scm -- shell --pure quantum-espresso openmpi@4 bash bash-completion
```

This creates a reproducible environment with the correct package and dependence versions.

</div>
