---
title: Comment interagir avec un paquet Guix ?
weight: 5
---

<div align="justify">

{{< callout context="note" title="" icon="outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Guix sur votre machine ; voir [ce lien](/documentation/install/install-guix/) pour plus de détails.

Ce tutoriel explicite les principales commandes permettant d'interagir avec les paquets Guix pour générer et interagir avec des environnements logiciels temporaires.

{{< /callout >}}

## Comment accéder aux paquets diamond ?

Quand vous utilisez Guix, l'ensemble des paquets disponibles proviennent du canal guix par défaut : [GNU Guix](https://hpc.guix.info/browse). Cependant, il est possible d'ajouter des *canaux* pour étendre la liste des paquets disponible. Dans le cadre du projet DIAMOND, certains codes ont été packagés via Guix et son disponible dans le canal [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages). Pour ajouter ce canal précis et donc pouvoir installer les paquets à l'aide de la commande `guix install`, il faut créer un fichier `~/.config/guix/channels.scm` sur votre machine ou sur l'infrastructure HPC que vous utiliserez. Ce fichier doit contenir les lignes suivantes :

```bash
;; Add gricad packages to those Guix provides.
(cons (channel
        (name 'guix-packages)
        (branch "public-packages")
        (url "https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages.git"))
      %default-channels)
```

Une fois ceci fait, la commande `guix pull` va mettre à jour la collection de paquets à partir du canal par défaut (GNU Guix) et du canal Diamond (guix-packages).

**Attention** 
>
> Une fois `guix pull` terminé, il est important d'exécuter les commandes suivantes, pour être sûr d'utiliser la commande `guix` à jour :
>
>```
>GUIX_PROFILE="$HOME/.config/guix/current"
>. "$GUIX_PROFILE/etc/profile"
>```

Enfin, pour vérifier que vous avez bien accès aux paquets Diamond, vous pouvez essayer de rechercher le paquet `quantum-espresso` :

```bash
guix search quantum-espresso
```

## Comment utiliser les paquets guix ?

### La commande `guix shell`

Cette commande fait apparaître un environnement logiciel temporaire contenant les dépendances permettant d'utiliser le code comme on le souhaite. En général, il est recommandé d'utiliser le flag `--pure` ainsi qu'un fichier `manifest.scm`. Pour le premier, il joue un rôle similaire au flag `--cleanenv` d'[Apptainer](/documentation/use/apptainer-isolation-flags/) et permet de nettoyer les variables d'environnement du système hôte avant l'apparition de l'environnement logiciel temporaire. Le fichier `manifest.scm` liste l'ensemble des paquets nécessaires à la bonne exécution du code. Plusieurs exemples de manifests sont disponible sur le dépôt gitlab regroupant l'ensemble des paquets Guix définis dans le cadre du projet Diamond : [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages/-/tree/master/manifests?ref_type=heads).

Une utilisation classique de la commande `guix shell` peut donc se résumer à la ligne suivante :

```bash
guix shell --pure -m lammps_mpi_manifest.scm
```

### La commande `guix time-machine`

Certains paquets requièrent une version spécifique d'une ou plusieurs dépendances. Cependant, si vous avez exécuté la commande `guix pull`, alors vous disposez des dernières versions de l'ensemble des paquets. Vous pouvez donc vous retrouvez dans un cas où le code que vous voulez utiliser ne se construit pas. Pas de panique, Guix a une solution tout faîte pour ces problèmes ! En effet, la commande `guix time-machine` vous permet de revenir à un commit précédent, et donc d'avoir accès à des versions antérieures des dépendances. En pratique, il est recommandé d'utiliser un fichier `channels.scm` qui contient les informations relatives au commit voulu. Encore une fois, plusieurs exemples de fichiers channels sont disponible sur le dépôt Gitlab du projet Diamond : [guix-packages](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix-packages/-/tree/master/manifests/with_time_machine?ref_type=heads).

Une utilisation classique de la commande `guix time-machine` peut donc se résumer à la ligne suivante :

```bash
guix time-machine --channels=quantum-espresso_channels.scm \
    -- shell --pure -m quantum-espresso_manifest.scm
```

</div>
