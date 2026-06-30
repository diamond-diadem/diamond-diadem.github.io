---
title: Comment utiliser l'image Apptainer Abinit ?
linkTitle: Tutoriel Abinit
weight: 1
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **abinit.sif** [disponible ici](/codes/scientific-computing/abinit/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/abinit-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


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

Pour les plus impatients, voici comment lancer un calcul Abinit parallèle sur `N` cœurs avec Apptainer, dans le cas où le répertoire courant contient l'image `abinit.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

## Utilisation détaillée du conteneur Abinit

Cette section présente différentes façons d'utiliser l'image Abinit. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer-crash-course).

### Introduction

Abinit est une suite logicielle open-source parallélisée avec MPI permettant de calculer les propriétés des matériaux via la théorie de la fonctionnelle de la densité (DFT).

L'exécutable principal de l'image se nomme `abinit`. La licence du code se trouve sous le chemin suivant : `/share/doc/abinit-10.4.7/COPYING`, et peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
apptainer exec abinit.sif cat /share/doc/abinit-10.4.7/COPYING
```

### Utilisation du conteneur Abinit pour les calculs parallèles

Le fichier d'entrée `input.abi` permet d'obtenir la pseudo-énergie totale, la longueur de liaison, la densité de charge et l'énergie d'atomisation de la molécule $H_2$ en suivant le [tutoriel de la documentation officielle](https://docs.abinit.org/tutorial/base1/). Une fois les fichiers d'entrée extraits, Abinit peut être exécuté en parallèle sur `N` cœurs comme suit :

```bash
apptainer exec abinit.sif mpirun -np <N> abinit input.abi
```

La commande ci-dessus utilise le mode parallèle « embarqué » d'Apptainer. Plus d'informations sur l'utilisation des conteneurs Apptainer en parallèle, y compris sur les clusters, sont disponibles sur [cette page](/documentation/use/apptainer-hpc).

</div>
