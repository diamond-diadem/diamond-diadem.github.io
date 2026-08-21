---
title: Comment utiliser l'image Apptainer Gmsh ?
linkTitle: Tutoriel Gmsh
weight: 4
description: "Tutoriel sur l'utilisation de l'image Apptainer Gmsh de DIAMOND : récupération du conteneur et cas d'usage sur une géométrie simple avec CLI et GUI"
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **gmsh.sif** [disponible ici](/codes/scientific-computing/gmsh/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/gmsh-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un fichier d'entrée d'entrée pour Gmsh est disponible sous forme d'archive via [ce lien](/downloads/gmsh-tutorial-inputs.tar.gz). Ce fichier contient un script Gmsh qui définit un maillage sur une surface rectangulaire simple en 2D. Il correspond au premier tutoriel de la [documentation officielle](https://gmsh.info/doc/texinfo/gmsh.html#Gmsh-tutorial) de Gmsh intitulé *Geometry basics, elementary entities, physical groups*.

Dans la suite de ce tutoriel, on supposera que le fichier d'entrée contenu dans l'archive est dans le répertoire courant. Pour l'extraire :

```bash
tar -xzf gmsh-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer le script fourni en entrée dans le cas où le répertoire courant contient l'image `gmsh.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec gmsh.sif gmsh t1.geo -2
```

## Utilisation détaillée du conteneur Gmsh

Cette section présente différentes façons d'utiliser l'image Gmsh. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

Gmsh est un logiciel en source ouverte pour la génération de maillages éléments finis en 3D.

L'exécutable principal de l'image se nomme `gmsh`. La version du code embarquée dans l'image peut être affichée avec la commande suivante :

```bash
apptainer exec gmsh.sif gmsh --version
```

Le fichier d'entrée `t1.geo` présenté plus haut contient un script Gmsh qui définit une surface rectangulaire simple en 2D. Le lecteur intéressé est invité à lire ce script pour en apprendre plus sur la syntaxe des scripts Gmsh.

### Utilisation de l'interface en ligne de commandes de Gmsh pour la génération et la visualisation de maillages

La commande suivante lance Gmsh avec le script d'entrée `t1.geo` et génère un fichier de maillage nommé `t1.msh`. 

```shell
apptainer exec gmsh.sif gmsh t1.geo -2
```

Le maillage stocké dans ce fichier peut être visualisé *via* l'interface graphique de Gmsh avec la commande suivante :

```shell
apptainer exec gmsh.sif gmsh t1.msh
```

<img alt="Surface rectangulaire maillée en 2D" src="/images/tutorials/gmsh-tutorial/simple_mesh.png" />

### Utilisation de l'interface graphique de Gmsh pour la génération et la visualisation de maillages

Gmsh possède aussi une interface graphique utilisateur (GUI) qui peut être utilisée pour lancer le script d'entrée. Pour commencer, le fichier d'entrée doit être importé par Gmsh. La commande suivante ouvre l'interface graphique :

```shell
apptainer exec gmsh.sif gmsh
```

Le fichier `t1.geo` peut ensuite être importé avec le bouton *File->Open* (ou *Ctrl/Command+O*). La géométrie importée s'affiche alors.

<img alt="Géométrie importée dans le GUI de Gmsh" src="/images/tutorials/gmsh-tutorial/imported_geo.png" />

Le script d'entrée peut aussi être chargé en même temps que l'interface graphique avec la commande suivante :

```shell
apptainer exec gmsh.sif gmsh t1.geo
```

Une fois la géométrie importée, celle-ci peut être maillée avec le bouton *Mesh->2D*. Le bouton *File->Save Mesh* permet de sauvegarder le maillage dans un fichier `t1.msh`.

### Utilisation de l'interface graphique de Gmsh pour la modification d'un maillage

Le module *Mesh* de l'interface graphique présente une suite d'outils exhaustive pour la manipulation des maillages. Cette partie du tutoriel en présente deux : *Refine by splitting* et *Partition*.

En partant du maillage simple généré précédemment, l'outil *Refine by splitting* raffine le maillage en sous-découpant chaque élément fini en éléments plus petits. 

<img alt="Maillage raffiné" src="/images/tutorials/gmsh-tutorial/fine_mesh.png" />

Le maillage peut alors être sauvegardé de la même façon que précédemment.

Le second outil est un outil de partitionnement. Il se base sur la bibliothèque externe METIS pour partitionner le maillage en différents sous-domaines prêt à être utilisés avec une méthode de décomposition de domaines. La figure ci-dessous montre le maillage généré précédemment découpé en 5 sous-domaines.

<img alt="Maillage raffiné partitionné en 5 sous-domaines" src="/images/tutorials/gmsh-tutorial/mesh_split.png" />

### Pour aller plus loin

La documentation officielle de Gmsh propose un grand nombre de tutoriels qui introduisent les différents outils et fonctionnalités du programme, disponibles [ici](https://gmsh.info/doc/texinfo/gmsh.html#Gmsh-tutorial). Les commandes présentées dans le présent tutoriel peuvent être facilement extrapolées pour faire tourner ces exemples supplémentaires.

</div>
