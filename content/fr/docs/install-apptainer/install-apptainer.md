---
title: Comment installer Apptainer ?
type: docs
---

<!-- <video controls width="50%">
  <source src="/videos/fr/install-preamble/install-apptainer-preambule-stfr.mp4" type="video/mp4" autoplay="false"/>
</video>  -->
<br/>
<br/>

Ce tutoriel présente succinctement le processus d'installation du logiciel de conteneurisation [Apptainer][apptainer-home-page]. Il est d'ailleurs largement basé sur les [instructions d'installations officielles][apptainer-install-linux], et nous vous invitons à consulter ces ressources pour plus de détails.

Le logiciel fonctionne sur toute distribution Linux moderne ; il ne tourne pas de façon native sur Windows et MacOS, n'étant pas compatible avec les noyaux de ces systèmes d'exploitation. Pour ces plateformes, une solution de machine virtuelle est préconisée et ne sera pas couverte ici : plus d'informations [ici][apptainer-vm-other-os].

## Installation de paquets Ubuntu

### TL; DR Commande en une ligne
Les commandes à lancer pour l'installation des paquets Ubuntu sont les suivantes :

```
sudo apt update 
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt update
sudo apt install -y apptainer
```


### Détail des étapes
Pour installer directement les paquets Ubuntu pré-construits destinés aux architectures `amd64` et `arm64`, il faut pouvoir accéder aux *archives de paquets personnels* (Personal Package Archive - PPA) d'Apptainer.

Dans un premier temps, il faut donc s'assurer d'avoir accès à la commande `add-apt-repository` :

```
sudo apt update 
sudo apt install -y software-properties-common # Pour pouvoir lancer la commande de la ligne suivante
sudo add-apt-repository -y ppa:apptainer/ppa
```

Ensuite, on termine l'installation ainsi :

```
sudo apt update
sudo apt install -y apptainer
```

##  Installation de paquets Debian

### TL; DR Commande en une ligne
Les commandes à lancer pour l'installation des paquets Debian sont les suivantes :
```
sudo apt update
sudo apt install -y wget
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

### Détail des étapes
Pour installer les paquets Debian pré-construits uniquement destinés aux architectures `amd64`, il faut accéder au dépôt GitHub contenant le paquet en installant `wget` :
```
sudo apt update
sudo apt install -y wget
```

Une fois `wget` disponible, on récupère le paquet `.deb` avant de l'installer sur la machine :
```
cd /tmp
wget https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer_1.2.5_amd64.deb
sudo apt install -y ./apptainer_1.2.5_amd64.deb
```

## Installation RedHat, Fedora, CentOS

<!-- <video controls width="50%">
  <source src="/videos/fr/install-centOS/installer-apptainer-centos-final-stfr.mp4" type="video/mp4" autoplay="false"/>
</video>  -->

### Paquets RPMs depuis GitHub
À l'arrivée de chaque nouvelle version, un paquet RPM (RedHat Package Manager) est disponible sur GitHub :
```
sudo yum install -y https://github.com/apptainer/apptainer/releases/download/v1.2.5/apptainer-1.2.5-1.x86_64.rpm
```

### Paquets RPMs depuis EPEL ou Fedora
Les paquets sont également disponibles via EPEL (Extra Packages for Enterprise Linux).
Sous RedHat, il est préalablement nécessaire de pouvoir accéder aux dépôts EPEL :
```
sudo yum install -y epel-release
```

Dès lors, on peut installer les paquets ainsi :
```
sudo yum install -y apptainer
```

## Installation sans droits superutilisateur
Pour les utilisateurs sans droits administrateurs sur leur machine, il est également possible de recourir à un script installant des binaires pré-construits, comprenant une variété d'utilitaires dont Apptainer dépend. Le script fonctionne pour les distributions dérivées de Red Hat Enterprise Linux, mais aussi pour Fedora, SUSE/OpenSUSE, Debian, et Ubuntu. Il est toutefois nécessaire d'avoir accès (via la variable `$PATH`) aux outils suivants : `curl` `rpm2cpio` `cpio`.

Pour exécuter ce script, lancez la commande suivante :
```
curl -s https://raw.githubusercontent.com/apptainer/apptainer/main/tools/install-unprivileged.sh | \
    bash -s - install-dir
```

Toutefois, notez que pour exécuter Apptainer, la commande globale n'est pas directement accessible et il faut à la place lancer `install-dir/bin/apptainer`. Nous vous suggérons de créer un alias `apptainer` pointant vers cet exécutable dans votre `~/.bashrc` ou `~/.bash_aliases`.



[apptainer-home-page]: https://apptainer.org/
[apptainer-install-linux]: https://apptainer.org/docs/admin/1.2/installation.html#install-from-pre-built-packages
[apptainer-vm-other-os]: https://apptainer.org/docs/admin/1.2/installation.html#installation-on-windows-or-mac
