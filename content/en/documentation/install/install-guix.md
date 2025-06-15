---
title: How to install Guix ?
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

This tutorial briefly describes the installation process for the [Guix](https://guix.gnu.org/) package management tool. It is largely based on the [official installation instructions](https://guix.gnu.org/manual/fr/html_node/Installation-binaire.html), and we invite you to consult those resources for more details.

The package software manager runs on any modern Linux distribution; it does not run natively on Windows and MacOS as it is not compatible with the kernels of these operating systems. For these platforms, a virtual machine solution such as Apptainer or a Docker container is recommended.

{{< /callout >}}

### Installation instructions

We recommend using the bash script provided by Guix, which automates all stages of the installation (download, installation and configuration). You will need to have the `wget` and `tar` packages installed on your machine. Also note that you will need super-user privileges to run the bash script.

The commands to run to install Ubuntu packages are as follows:

```bash
cd /tmp # to move to a temporary folder
wget https://git.savannah.gnu.org/cgit/guix.git/plain/etc/guix-install.sh # to download the installation bash script
chmod +x guix-install.sh # to run the bash script
sudo ./guix-install.sh # to run the bash script
```

Once the installation is complete, we recommend running the `guix pull` command to update the list of Guix packages from the main [GNU Guix](https://hpc.guix.info/browse) channel. Note that this command takes some time to run. To use the updated Guix daemon, you will then need to run the following lines:

```bash
GUIX_PROFILE="$HOME/.config/guix/current"
. "$GUIX_PROFILE/etc/profile"
```

## Installation without super-user rights

Although you do not require any special rights to use Guix, you will need super-user rights to install it:

- create the `/gnu/store` where all packages are stored,
- create isolated software environments for building packages using the Guix daemon.

If you're interested in this topic, we recommend you have a look at this [article](https://hpc.guix.info/blog/2017/09/reproducibility-and-root-privileges/) or [this one](https://hpc.guix.info/blog/2017/10/using-guix-without-being-root/). If you do not have super-user privileges on your machine, we advise you to contact your system administrator for installation.

## Install on Windows / MacOS

For Windows users, you can use a [similar solution](/en/documentation/install/apptainer-windows) to that of Apptainer and use Windows Subsystem for Linux (WSL2). However, installing Guix in WSL is far from trivial. We advise you to follow this [guide](https://gist.github.com/giuliano108/49ec5bd0a9339db98535bc793ceb5ab4).

For MacOS users, we recommend using a virtual machine or Docker. You can check this [link](https://pagure.io/projects/MSG/%2A).

</div>
