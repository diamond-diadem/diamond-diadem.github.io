---
title: Comment utiliser l'image Docker Abinit ?
linkTitle: Tutoriel Abinit
weight: 4
description: "Tutoriel sur l'utilisation de l'image Docker Abinit de DIAMOND : récupération du conteneur, exécution et cas d'usage pour les calculs DFT."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Docker**
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/abinit-tutorial-inputs.tar.gz)

{{< /callout >}}

{{< callout context="note" icon="tabler-icons/outline/alert-circle" >}}

Docker n'est pas intégré aux gestionnaires de tâches. L'exemple présenté ici est uniquement à titre de démonstration. Pour l'usage sur les clusters, il est recommandé de suivre [le tutoriel](/documentation/by-container/abinit) utilisant Apptainer.
{{< /callout >}}

## Télécharge l'image Docker

Avant commencer, l'image Docker doit être téléchargée et peut être étiquetée pour l'usage plus facile :

```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit abinit
```

## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour Abinit est disponible sous forme d'archive via [ce lien](/downloads/abinit-tutorial-inputs.tar.gz).

Ces fichiers correspondent à un tutoriel issu de la [documentation officielle](https://docs.abinit.org/tutorial/base1/) d'Abinit. L'archive contient les fichiers suivants :

- `H8.psp8` : pseudo-potentiels pour l'atome d'hydrogène,
- `input.abi` : fichier d'entrée Abinit.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf abinit-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul Abinit dans le cas où le répertoire courant tous les fichiers d'entrée nécessaires :

```bash
docker run --user $(id -u):$(id -u) -v /home:/home -e PWD -w $PWD abinit input.abi
```

## Utilisation détaillée du conteneur Abinit

Cette section présente différentes façons d'utiliser l'image Abinit.

### Introduction

Abinit est une suite logicielle open-source parallélisée avec MPI permettant de calculer les propriétés des matériaux via la théorie de la fonctionnelle de la densité (DFT).

L'exécutable principal de l'image se nomme `abinit`. La licence du code se trouve sous le chemin suivant : `/share/doc/abinit-10.4.7/COPYING`, et peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
docker run --entrypoint "" abinit cat /share/doc/abinit-10.4.7/COPYING
```

### Utilisation du conteneur Abinit pour les calculs parallèles

Le fichier d'entrée `input.abi` permet d'obtenir la pseudo-énergie totale, la longueur de liaison, la densité de charge et l'énergie d'atomisation de la molécule $H_2$ en suivant le [tutoriel de la documentation officielle](https://docs.abinit.org/tutorial/base1/). Une fois les fichiers d'entrée extraits, Abinit peut être exécuté en parallèle sur `N` cœurs comme suit :

```bash
docker run --entrypoint "" --user $(id -u):$(id -u) -v /home:/home -e PWD -w $PWD abinit mpirun -np <N> abinit input.abi
```

En définissant `--entrypoint` sur une chaîne vide, on peut exécuter n'importe quelle commande à l'intérieur du conteneur. Cependant, comme Docker n'est pas soumis aux restrictions de ressources imposées par les gestionnaires de tâches, il ne peut pas être utilisé avec SLURM ou OAR. Consultez [cette page](/documentation/faq/#docker-is-also-a-containerization-solution-why-dont-we-just-use-docker) pour une explication détaillée.

</div>
