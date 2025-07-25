---
title: How to interact with a Guix package?
weight: 5
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before these explanations, it is necessary to have Guix installed on your machine; see [this link](/en/documentation/install/install-guix/) for more details.

This tutorial explains the main commands for interacting with Guix packages to create and interact with temporary software environments.

{{< /callout >}}

## How do I access diamond packages?

When using Guix, all available packages come from the default guix channel: [GNU Guix](https://hpc.guix.info/browse). However, it is possible to add _channels_ to extend the list of available packages. As part of the DIAMOND project, some code has been packaged using Guix and are available in the [guix-channel](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-channel) channel. To add this specific channel and thus be able to install the packages using the `guix install` command, you need to create a `~/.config/guix/channels.scm` file on your machine or on the HPC infrastructure you will be using. This file needs to contain the following lines:

```bash
;; Add gricad packages to those Guix provides.
(cons (channel
        (name 'guix-channel)
        (branch "public-packages")
        (url "https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-channel.git"))
      %default-channels)
```

Once this is done, the `guix pull` command will update the package collection from the standard channel (GNU Guix) and the Diamond channel (`guix-channel`).

**Caution**

> Once `guix pull` is complete, it is important to run the following commands to ensure that you are using the latest `guix` command:
>
> ```bash
> GUIX_PROFILE="$HOME/.config/guix/current"
> . "$GUIX_PROFILE/etc/profile"
> ```

Finally, to check that you have access to the Diamond packages, you can try searching for the `quantum-espresso` package:

```bash
guix search quantum-espresso
```

## How do I use Guix packages?

### The `guix shell` command

This command creates a temporary software environment containing the dependencies that allow the code to be used as desired. In general, we recommend the use of the `--pure` flag and a `manifest.scm` file. The former plays a similar role to the `--cleanenv` flag in [Apptainer](/en/documentation/use/apptainer-isolation-flags/) and is used to clean up the environment variables on the host system before the temporary software environment appears. The `manifest.scm` file lists all the packages required for the code to run correctly. Several examples of manifests are available in a dedicated Gitlab repository : [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-packages/-/tree/master/manifests?ref_type=heads).

A classic use of the `guix shell` command can therefore be summarised in the following line

```bash
guix shell --pure -m lammps_mpi_manifest.scm
```

### The `guix time-machine` command

Some packages require a specific version of one or more dependencies. However, if you have run the `guix pull` command, then you have the latest versions of all packages. So you may find yourself in a situation where the code you want to use won't build. Don't panic, Guix has a ready-made solution for these problems! The `guix time-machine` command allows you to revert to a previous commit, and thus access earlier versions of dependencies. In practice, it is recommended to use a `channels.scm` file containing information about the desired commit. Again, several examples of channel files are available in the dedicated Gitlab repository: [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-packages/-/tree/master/manifests/with_time_machine?ref_type=heads).

A typical use of the `guix time-machine' command can therefore be summarised in the following line

```bash
guix time-machine --channels=quantum-espresso_channels.scm \
    -- shell --pure -m quantum-espresso_manifest.scm
```

</div>
