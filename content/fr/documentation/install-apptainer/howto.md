---
title: "Comment installer Apptainer ?"
weight: 1
# toc: true
---


{{< callout context="note" title="" icon="info-circle" >}}

Ce tutoriel présente succinctement le processus d'installation du logiciel de conteneurisation [Apptainer](https://apptainer.org/). Il est d'ailleurs largement basé sur les [instructions d'installations officielles](https://apptainer.org/docs/admin/1.2/installation.html#install-from-pre-built-packages), et nous vous invitons à consulter ces ressources pour plus de détails.

Le logiciel fonctionne sur toute distribution Linux moderne ; il ne tourne pas de façon native sur Windows et MacOS, n'étant pas compatible avec les noyaux de ces systèmes d'exploitation. Pour ces plateformes, une solution de machine virtuelle est préconisée et ne sera pas couverte ici : plus d'informations [ici](https://apptainer.org/docs/admin/1.2/installation.html#installation-on-windows-or-mac).

Enfin, ce tutoriel se concentre sur les versions en cours d'exploitation : si vous utilisez une version de distribution Linux qui n'est plus supportée (par exemple CentOS 7 ou Ubuntu 18.04) et que vous rencontrez une erreur difficile à résoudre, n'hésitez pas à [nous contacter](/contact) !

{{< /callout >}}



<!-- <video controls width="400px">
  <source src="https://www.youtube.com/embed/YDOH-mapNgo?si=A3SE_pXO4ty2aaL-" autoplay="false"/>
</video> -->

<iframe class="tuto-video" src="https://www.youtube.com/embed/YDOH-mapNgo?si=A3SE_pXO4ty2aaL-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>




<!-- Ce tutoriel présente succinctement le processus d'installation du logiciel de conteneurisation [Apptainer][apptainer-home-page]. Il est d'ailleurs largement basé sur les [instructions d'installations officielles][apptainer-install-linux], et nous vous invitons à consulter ces ressources pour plus de détails.

Le logiciel fonctionne sur toute distribution Linux moderne ; il ne tourne pas de façon native sur Windows et MacOS, n'étant pas compatible avec les noyaux de ces systèmes d'exploitation. Pour ces plateformes, une solution de machine virtuelle est préconisée et ne sera pas couverte ici : plus d'informations [ici][apptainer-vm-other-os]. -->

## Installation de paquets Ubuntu

### Commande en une ligne
Les commandes à lancer pour l'installation des paquets Ubuntu sont les suivantes :

```bash
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt update
sudo apt install -y apptainer
```

### Détail des étapes
Pour installer directement les paquets Ubuntu pré-construits destinés aux architectures `amd64` et `arm64`, il faut pouvoir accéder aux *archives de paquets personnels* (Personal Package Archive - PPA) d'Apptainer.

Dans un premier temps, il faut donc s'assurer d'avoir accès à la commande `add-apt-repository` :

```bash
sudo apt update 
sudo apt install -y software-properties-common # Pour pouvoir lancer la commande de la ligne suivante
sudo add-apt-repository -y ppa:apptainer/ppa
```

Ensuite, on termine l'installation ainsi :

```bash
sudo apt update
sudo apt install -y apptainer
```

## Installation de paquets Debian

### Commande en une ligne
Les commandes à lancer pour l'installation des paquets Debian sont les suivantes :

```bash
sudo apt update
sudo apt install -y wget
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

### Détail des étapes
Pour installer les paquets Debian pré-construits uniquement destinés aux architectures `amd64`, il faut accéder au dépôt GitHub contenant le paquet en installant `wget` :

```bash
sudo apt update
sudo apt install -y wget
```

Une fois `wget` disponible, on récupère le paquet `.deb` avant de l'installer sur la machine :

```bash
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

## Installation RedHat, Fedora, CentOS

<br>

<iframe class="tuto-video" src="https://www.youtube.com/embed/O969cm56-Ng?si=D54tNBfirRIlhq-A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<!-- <video controls width="50%">
  <source src="/videos/fr/install-centOS/installer-apptainer-centos-final-stfr.mp4" type="video/mp4" autoplay="false"/>
</video>  -->

### Paquets RPMs depuis GitHub
À l'arrivée de chaque nouvelle version, un paquet RPM (RedHat Package Manager) est disponible sur GitHub :

```bash
sudo yum install -y https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer-1.2.5-1.x86_64.rpm
```

### Paquets RPMs depuis EPEL ou Fedora
Les paquets sont également disponibles via EPEL (Extra Packages for Enterprise Linux).
Sous RedHat, il est préalablement nécessaire de pouvoir accéder aux dépôts EPEL :

```bash
sudo yum install -y epel-release
```

Dès lors, on peut installer les paquets ainsi :

```bash
sudo yum install -y apptainer
```

## Installation sans droits superutilisateur
Pour les utilisateurs sans droits administrateurs sur leur machine, il est également possible de recourir à un script installant des binaires pré-construits, comprenant une variété d'utilitaires dont Apptainer dépend. Le script fonctionne pour les distributions dérivées de Red Hat Enterprise Linux, mais aussi pour Fedora, SUSE/OpenSUSE, Debian, et Ubuntu. Il est toutefois nécessaire d'avoir accès (via la variable `$PATH`) aux outils suivants : `curl` `rpm2cpio` `cpio`.

Pour exécuter ce script, lancez la commande suivante :

```bash
curl -s https://raw.githubusercontent.com/apptainer/apptainer/main/tools/install-unprivileged.sh | \
    bash -s - install-dir
```

Toutefois, notez que pour exécuter Apptainer, la commande globale n'est pas directement accessible et il faut à la place lancer `install-dir/bin/apptainer`. Nous vous suggérons de créer un alias `apptainer` pointant vers cet exécutable dans votre `~/.bashrc` ou `~/.bash_aliases`.



[apptainer-home-page]: https://apptainer.org/
[apptainer-install-linux]: https://apptainer.org/docs/admin/1.2/installation.html#install-from-pre-built-packages
[apptainer-vm-other-os]: https://apptainer.org/docs/admin/1.2/installation.html#installation-on-windows-or-mac
