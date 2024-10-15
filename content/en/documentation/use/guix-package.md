---
title: How to interact with a Guix package?
weight: 5
---

<div align="justify">

{{< callout context="note" title="" icon="outline/info-circle" >}}

Before these explanations, it is necessary to have Guix installed on your machine; see [this link](/en/documentation/install/install-guix/) for more details.

This tutorial explains the main commands for interacting with Guix packages to create and interact with temporary software environments.

{{< /callout >}}

## How do I access diamond packages?

When using Guix, all available packages come from the default guix channel: [GNU Guix](https://hpc.guix.info/browse). However, it is possible to add *channels* to extend the list of available packages. As part of the DIAMOND project, some code has been packaged using Guix and are available in the [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages) channel. To add this specific channel and thus be able to install the packages using the `guix install` command, you need to create a `~/.config/guix/channels.scm` file on your machine or on the HPC infrastructure you will be using. This file needs to contain the following lines:

```bash
;; Add gricad packages to those Guix provides.
(cons (channel
        (name 'guix-packages)
        (url "https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages.git"))
      %default-channels)
```

Once this is done, the `guix pull` command will update the package collection from the standard channel (GNU Guix) and the Diamond channel (guix-packages).  

> **Caution** Once `guix pull` is complete, it is important to run the following commands to ensure that you are using the latest `guix` command:
>
>```bash
>GUIX_PROFILE="$HOME/.config/guix/current"
>. "$GUIX_PROFILE/etc/profile"
>```

Finally, to check that you have access to the Diamond packages, you can try searching for the `myquantum-espresso` package:

```bash
guix search myquantum-espresso
```

## How do I use Guix packages?

### The `guix shell` command

This command creates a temporary software environment containing the dependencies that allow the code to be used as desired. In general, we recommend the use of the `--pure` flag and a `manifest.scm` file. The former plays a similar role to the `--cleanenv` flag in [Apptainer](/en/documentation/use/apptainer-isolation-flags/) and is used to clean up the environment variables on the host system before the temporary software environment appears. The `manifest.scm` file lists all the packages required for the code to run correctly. Several examples of manifests are available in the gitlab repository, which contains all the Guix packages defined as part of the Diamond project: [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages/-/tree/master/manifests?ref_type=heads).

A classic use of the `guix shell` command can therefore be summarised in the following line

```bash
guix shell --pure -m mylammps_mpi_manifest.scm
```

### The `guix time-machine` command

Some packages require a specific version for a dependency. However, if you have run the `guix pull` command, then you have the latest versions of all packages. You may therefore find yourself in a situation where the code you want to use will not build. Don't panic, Guix has a ready-made solution for these problems! The `guix time-machine` command allows you to go back to a previous commit and thus access previous versions of dependencies. In practice, it is recommended to use a `channels.scm` file which contains the information about the desired commit. Again, several examples of channels files are available in the Diamond project's gitlab repository: [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages/-/tree/master/manifests/with_time_machine?ref_type=heads).

A typical use of the `guix time-machine' command can therefore be summarised in the following line

```bash
guix time-machine --channels=myquantum-espresso_channels.scm \
    -- shell --pure -m myquantum-espresso_manifest.scm
```

</div>