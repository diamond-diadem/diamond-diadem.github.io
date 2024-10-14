---
title: How to install Apptainer ?
weight: 1
---

<div align="justify">

{{< callout context="note" title="" icon="outline/info-circle" >}}

This tutorial summarizes how to install the container management software [Apptainer](https://apptainer.org/). It is largely based on [official installation instructions](https://apptainer.org/docs/admin/1.2/installation.html#install-from-pre-built-packages), and one should read these more exhaustive ressources for more details.

Apptainer works on any modern Linux distribution ; however, it is not compatible with Windows and MacOS host kernels and does not run natively on those. It is recommended to use virtualization solutions in such cases, which will not be covered in this topic : see more information [here](https://apptainer.org/docs/admin/1.2/installation.html#installation-on-windows-or-mac).

Finally, this tutorial focuses on currently supported versions: if you are using a Linux distribution version that is no longer supported (for example, CentOS 7 or Ubuntu 18.04) and you encounter a difficult-to-resolve error, do not hesitate to [contact us](/en/contact)!

{{< /callout >}}

<iframe class="tuto-video" src="https://www.youtube.com/embed/0mDywp6CN30?si=ZbQDcgUXYLG1XuaU&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Install Ubuntu packages

<iframe class="tuto-video" src="https://www.youtube.com/embed/ZACVgNrc-ek?si=HfbWtXnYIOD4RYNn&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### One liner command
You can run the following commands to directly install Ubuntu packages :

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt update
sudo apt install -y apptainer
```

### Step-by-step detail
To install pre-built Ubuntu packages for `amd64` and `arm64` architectures, one needs to access Apptainer's *personal package archive* (PPA).

First, run this to ensure access to the `add-apt-repository` command :

```bash
sudo apt update
sudo apt install -y software-properties-common # Mandatory to be able to run next command
sudo add-apt-repository -y ppa:apptainer/ppa
```

Then, finish the installation using :

```bash
sudo apt update
sudo apt install -y apptainer
```

## Install Debian packages

<iframe class="tuto-video" src="https://www.youtube.com/embed/6J1iYrv9gzU?si=ITbew-euDfzvng9a&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### One liner command
You can run the following commands to directly install Debian packages :

```bash
sudo apt update
sudo apt install -y wget
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

### Step-by-step detail
To install pre-built Debian packages only for `amd64` architectures, one needs to access Apptainer's GitHub repository using `wget` :

```bash
sudo apt update
sudo apt install -y wget
```

Once  `wget` is available, the `.deb` package can be downloaded and installed locally :

```bash
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

## Installation for RedHat, Fedora, CentOS

<iframe class="tuto-video" src="https://www.youtube.com/embed/OuMyAWsiDDY?si=wGEheMjehqcB8-X8&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe class="tuto-video" src="https://www.youtube.com/embed/BQXcLOYe5Hw?si=mP4gb6T4VzCqUSwB&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### RPM packages from GitHub
With each new version release, a RPM (RedHat Package Manager) package is available on GitHub :

```bash
sudo yum install -y https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer-1.2.5-1.x86_64.rpm
```

### RPM packages from EPEL or Fedora
RPM packages are also available through EPEL (Extra Packages for Enterprise Linux).
Using RedHat, one first has to gain access to EPEL repositories :

```bash
sudo yum install -y epel-release
```

From here, use the following to install the package :

```bash
sudo yum install -y apptainer
```

## Install without superuser privileges

<iframe class="tuto-video" src="https://www.youtube.com/embed/tAsmuzLtVZI?si=jy4qoLdFcQk0z-9J&cc_lang_pref=en&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

For non-privileged users, a scripts is made available to install pre-built binaries together with several utilitaries mandatory to run Apptainer. The script works for Red Hat Enterprise Linux-derived systems, and also for Fedora, SUSE/OpenSUSE, Debian, and Ubuntu. It is however required to have access to `curl` `rpm2cpio` and `cpio` through the `$PATH` environment variable).

One can run the script using :

```bash
curl -s https://raw.githubusercontent.com/apptainer/apptainer/main/tools/install-unprivileged.sh | \
    bash -s - install-dir
```

Please note the global `apptainer` command will not be available with this installation, and it is required to call the executable using `install-dir/bin/apptainer`. We suggest to create an `apptainer` alias pointing to this executable in `~/.bashrc` or `~/.bash_aliases`.

## Install on Windows/MacOS

For Windows user, a dedicated documentation page can be found [here](/en/documentation/install-apptainer/apptainer-windows).

For Mac users, it is recommended to use Lima via Homebrew on the [Apptainer documentation](apptainer.org/docs/admin/main/installation.html#mac).

</div>
