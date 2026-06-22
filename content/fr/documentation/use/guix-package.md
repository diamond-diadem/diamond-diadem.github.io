---
title: Accéder aux paquets Guix de DIAMOND
weight: 5
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Guix sur votre machine ; voir [ce lien](/documentation/install/install-guix/) pour plus de détails.

Ce tutoriel explicite les principales commandes permettant d'interagir avec les paquets Guix pour générer et interagir avec des environnements logiciels temporaires.

{{< /callout >}}

## Accéder aux paquets Diamond

Il existe deux façons d’accéder aux paquets Guix de Diamond.

### Méthode 1 : utiliser la configuration stable du canal

La méthode la plus fiable consiste à utiliser le fichier `channels-stable.scm` fourni dans le dépôt [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects).

Avec ce fichier, les commandes Guix peuvent être exécutées via :

```bash
guix time-machine -C channels-stable.scm -- <commande>
```

Cela garantit que les bonnes versions de toutes les dépendances sont utilisées.
Par exemple, après avoir cloné le dépôt, vous pouvez reconstruire l’un des conteneurs Diamond avec :

```bash
guix time-machine -C channels-stable.scm -- pack -f squashfs -S /bin=bin -S /share=share -m src/manifests/<image>.manifest
```

### Méthode 2 : ajouter le canal Guix de Diamond à la configuration de Guix.

Vous pouvez également ajouter le canal Guix de Diamond à votre configuration locale Guix. Les paquets Diamond seront alors disponibles aux côtés des paquets GNU Guix standards, sans avoir besoin d’utiliser `guix time-machine`.

Pour ceci, créez le fichier `~/.config/guix/channels.scm` et ajoutez-y le contenu suivant :

```scheme
;; Ajouter les paquets DIAMOND à ceux fournis par GNU Guix.
(cons (channel
        (name 'guix-channel)
        (url "https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/guix/guix-channel.git"))
      %default-channels)
```

Puis mettez à jour votre liste de paquets :

```bash
guix pull
```

Cette commande met à jour à la fois les paquets GNU Guix standards et les paquets Diamond.

**Attention**

> Une fois `guix pull` terminé, il est important d’exécuter les commandes suivantes afin de vous assurer que vous utilisez bien la version la plus récente de la commande `guix` :
> ```bash
> GUIX_PROFILE="$HOME/.config/guix/current"
> . "$GUIX_PROFILE/etc/profile"
> ```

Vous pouvez vérifier que les paquets Diamond sont disponibles avec :

```bash
guix search quantum-espresso
```

Ensuite, par exemple, `quantum-espresso` et `OpenMPI` peuvent être installés avec :

```bash
guix install quantum-espresso openmpi@4
```


## Utilisation des paquets Guix

### Utilisation de `guix shell`

La commande `guix shell` crée un environnement temporaire contenant toute la stack logiciel nécessaire à l’exécution d’un programme.

Il est recommandé d’utiliser :

* l’option `--pure`, qui supprime les variables d’environnement héritées du système hôte (similaire à l’option `--cleanenv` d’Apptainer) ;
* un fichier `manifest.scm`, qui liste tous les paquets nécessaires.

Des exemples de fichiers manifest sont disponibles dans le dépôt [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/-/tree/main/src/manifests).

Une utilisation typique est :

```bash
guix shell --pure -m quantum-espresso.manifest
```

Cette commande démarre un environnement propre contenant tous les paquets listés dans le manifeste.

### Utilisation de `guix time-machine`

Certaines applications nécessitent des versions spécifiques de leurs dépendances. Si vous avez mis à jour vos paquets avec `guix pull` vous pouvez disposer de versions plus récentes qui ne sont pas compatibles avec le code que vous souhaitez utiliser. La commande `guix time-machine` permet d’utiliser une ancienne collection de paquets Guix en restaurant l’état précédent des canaux. Diamond fournit le fichier `channels-stable.scm` dans le dépôt [apptainer-singularity-projects](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects). Ce fichier fixe des versions compatibles de toutes les dépendances nécessaires. Il permet ainsi d’utiliser les paquets Diamond de manière fiable.

Par exemple, pour créer un environnement contenant `quantum-espresso` et OpenMPI :

```bash
guix time-machine -C channels-stable.scm -- shell --pure quantum-espresso openmpi@4 bash bash-completion
```

Cette commande crée un environnement reproductible avec les versions correctes des paquets et de leurs dépendances.

</div>
