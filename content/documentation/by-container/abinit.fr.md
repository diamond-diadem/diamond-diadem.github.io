---
title: Comment utiliser l'image de conteneur Abinit ?
linkTitle: Tutoriel Abinit
weight: 4
category: scientific-computing
icon: icon-abinit
description: "Tutoriel sur l'image de conteneur Abinit de DIAMOND avec Apptainer ou Docker : récupération de l'image, exécution et cas d'usage pour les calculs DFT."
---

{{< callout context="note" title="Prérequis" >}}

- Apptainer (voir soit [notre guide d'installation]({{% ref "/documentation/install/install-apptainer" %}}), soit [la documentation officielle](https://apptainer.org/docs/user/latest/quick_start.html#installation)) ou Docker (voir [le guide d'installation officiel](https://docs.docker.com/engine/install/))
- Les [fichiers d'entrée](/downloads/abinit-tutorial-inputs.tar.gz)

{{< /callout >}}

Pour plus d'informations sur les conteneurs Apptainer et leur utilisation, nous mettons à votre disposition [une description d'Apptainer]({{% ref "/documentation/use/apptainer" %}}), un guide rapide sur [comment utiliser Apptainer]( {{% ref "/documentation/use/apptainer-image" %}}), sans oublier bien sûr la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/).

{{< callout context="tip" title="Apptainer ou Docker ?" icon="tabler-icons/outline/help-circle" >}}

Chaque commande de cette page est donnée pour Apptainer et pour Docker : choisissez votre outil dans n'importe quel onglet ci-dessous et toute la page suit votre choix. Docker convient pour essayer l'image sur votre propre ordinateur, mais sur les clusters il faut utiliser Apptainer ([pourquoi ?]({{% ref "/faqs" %}}#why-not-docker)).

{{< /callout >}}

## Image de conteneur

Récupérez l'image Abinit :

{{< tabs "abinit-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit abinit
```

La seconde commande donne à l'image le nom court `abinit`, utilisé dans la suite de ce tutoriel.
{{< /tab >}}
{{< /tabs >}}

## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour Abinit est disponible sous forme d'archive via [ce lien](/downloads/abinit-tutorial-inputs.tar.gz).

Ces fichiers correspondent à un tutoriel issu de la [documentation officielle](https://docs.abinit.org/tutorial/base1/) d'Abinit. L'archive contient les fichiers suivants :

- `H.psp8` : pseudo-potentiels pour l'atome d'hydrogène,
- `input.abi` : fichier d'entrée Abinit.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf abinit-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul Abinit parallèle sur `N` cœurs, dans le cas où le répertoire courant contient tous les fichiers d'entrée nécessaires :

{{< tabs "abinit-quickstart" >}}
{{< tab "Apptainer" >}}
L'image `abinit.sif` est supposée se trouver dans le répertoire courant.

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work abinit mpirun -np <N> abinit input.abi
```

Ici, `-v "$PWD":/work -w /work` rend le répertoire courant accessible dans le conteneur et y lance le calcul, `-u $(id -u):$(id -g)` garantit que les fichiers de sortie vous appartiennent (et non à `root`), et `--rm` supprime le conteneur une fois le calcul terminé. Sur les systèmes utilisant SELinux (Fedora, RHEL…), ajoutez `:z` au volume (`-v "$PWD":/work:z`) si vous obtenez des erreurs « Permission denied ».
{{< /tab >}}
{{< /tabs >}}

## Utilisation détaillée du conteneur Abinit

Cette section présente différentes façons d'utiliser l'image Abinit. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

Abinit est une suite logicielle open-source parallélisée avec MPI permettant de calculer les propriétés des matériaux via la théorie de la fonctionnelle de la densité (DFT).

L'exécutable principal de l'image se nomme `abinit`. La licence du code se trouve sous le chemin suivant : `/share/doc/abinit-10.4.7/COPYING`, et peut être consultée depuis l'extérieur du conteneur comme suit :

{{< tabs "abinit-license" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec abinit.sif cat /share/doc/abinit-10.4.7/COPYING
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" abinit cat /share/doc/abinit-10.4.7/COPYING
```

La commande par défaut de l'image est `abinit` ; définir `--entrypoint ""` permet d'exécuter n'importe quelle autre commande dans le conteneur.
{{< /tab >}}
{{< /tabs >}}

### Lancer un calcul séquentiel

Le fichier d'entrée `input.abi` permet d'obtenir la pseudo-énergie totale, la longueur de liaison, la densité de charge et l'énergie d'atomisation de la molécule $H_2$ en suivant le [tutoriel de la documentation officielle](https://docs.abinit.org/tutorial/base1/). Une fois les fichiers d'entrée extraits, Abinit peut être exécuté sur un seul cœur comme suit :

{{< tabs "abinit-sequential" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run abinit.sif input.abi
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm -u $(id -u):$(id -g) -v "$PWD":/work -w /work -e PWD=/work abinit input.abi
```

Abinit a besoin de la variable d'environnement `PWD`, qui n'est pas définie lorsque `abinit` est lancé directement comme commande par défaut de l'image : `-e PWD=/work` la définit.
{{< /tab >}}
{{< /tabs >}}

### Utilisation du conteneur Abinit pour les calculs parallèles

Le même calcul peut être exécuté en parallèle sur `N` cœurs comme suit :

{{< tabs "abinit-parallel" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

La commande ci-dessus utilise le mode parallèle « embarqué » d'Apptainer. Plus d'informations sur l'utilisation des conteneurs Apptainer en parallèle, y compris sur les clusters, sont disponibles sur [cette page]({{% ref "/documentation/use/apptainer-hpc" %}}).
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work abinit mpirun -np <N> abinit input.abi
```

{{< callout context="caution" icon="tabler-icons/outline/alert-triangle" >}}
Avec Docker, les calculs parallèles sont limités aux cœurs d'une seule machine. Docker n'est pas intégré aux gestionnaires de tâches tels que SLURM ou OAR et ne peut donc pas être utilisé pour des calculs sur clusters : utilisez plutôt Apptainer ([pourquoi ?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /callout >}}
{{< /tab >}}
{{< /tabs >}}
