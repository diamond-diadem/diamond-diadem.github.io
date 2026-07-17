---
title: Comment utiliser l'image Apptainer FreeFEM ?
linkTitle: Tutoriel FreeFEM
weight: 1
description: "Tutoriel sur l'utilisation du conteneur Apptainer FreeFEM de DIAMOND : récupération de l'image, exécution des calculs et exemples d'utilisation pour la résolution d'équations simples."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **freefem.sif** [disponible ici](/codes/scientific-computing/freefem/)
- Avoir téléchargé les **fichiers d'entrée** [disponibles ici](/downloads/freefem-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour FreeFEM est disponible sous forme d'archive via [ce lien](/downloads/freefem-tutorial-inputs.tar.gz).

Ces fichiers correspondent à deux exemples de tutoriels issus de la documentation officielle de FreeFEM :

- `poisson.edp` : un fichier d'entrée FreeFEM pour résoudre l'équation de Poisson sur une géométrie en forme de L avec adaptation de maillage et visualisation graphique en séquentiel issu de cet [exemple](https://doc.freefem.org/examples/misc.html#poisson-s-equation),
- `MPIGMRES2D.edp` : un fichier d'entrée FreeFEM pour résoudre un problème de type Poisson sur un carré unitaire en utilisant une méthode de décomposition de domaine en parallèle, issu de cet [exemple](https://doc.freefem.org/examples/parallelization.html#mpi-gmres-2d).

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf freefem-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul FreeFEM parallèle sur `N` cœurs avec Apptainer, dans le cas où le répertoire courant contient l'image `freefem.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec freefem.sif ff-mpirun -np N MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

## Utilisation détaillée du conteneur FreeFEM

Cette section présente différentes façons d'utiliser l'image FreeFEM. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

FreeFEM est un logiciel open-source pour résoudre les équations aux dérivées partielles en utilisant la méthode des éléments finis, avec un langage de script dédié pour définir les géométries, les maillages et les solveurs. Il prend en charge une large gamme d'éléments finis, la génération adaptative de maillages et le calcul parallèle (via PETSc, HPDDM, etc.), et fonctionne sur Windows, macOS et Linux.

L'exécutable séquentiel principal de l'image est `FreeFem++`. L'exécutable parallèle (MPI) est `FreeFem++-mpi`. Il peut être exécuté avec les modes parallèles hybride et embarqué d'Apptainer (voir [cette page](/documentation/use/apptainer-hpc) pour plus de détails sur ces modes). L'image contient également un exécutable raccourci vers `FreeFem++-mpi` appelé `ff-mpirun` qui ne peut être appelé que depuis l'intérieur du conteneur (mode embarqué uniquement). Ainsi, les commandes suivantes sont équivalentes :

```bash
apptainer exec freefem.sif mpirun -np N FreeFem++-mpi # Exécutable parallèle
apptainer exec freefem.sif ff-mpirun -np N # Exécutable raccourci parallèle
```

La licence du logiciel peut être trouvée sous le chemin suivant : `/share/doc/freefem-4.14/LICENSE.md`, et peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
apptainer exec freefem.sif cat /share/doc/freefem-4.14/LICENSE.md
```

### Utilisation du conteneur FreeFEM pour les calculs séquentiels

Le fichier d'entrée `poisson.edp` permet de résoudre l'équation de Poisson sur une géométrie en forme de L pour un ensemble donné de conditions aux limites. Le système est résolu de manière séquentielle en utilisant un solveur à gradient conjugué. Une boucle d'adaptation de maillage de $10$ itérations est effectuée. À chaque itération, le maillage est adapté en fonction du champ d'erreur de la solution précédente et une nouvelle solution est calculée et tracée sur le maillage actuel.

Pour exécuter cette simulation :

```bash
apptainer exec freefem.sif FreeFem++ poisson.edp
```

Une fenêtre interactive s'ouvre automatiquement pour visualiser les maillages et les solutions. Voici quelques touches utiles pour interagir avec ces tracés :

- Les touches `p` et `Entrée` affichent respectivement les tracés précédent et suivant,
- la touche `f` bascule entre les modes « remplissage iso » et « lignes iso-valeurs »,
- la touche `v` affiche la légende,
- la touche `?` affiche une fenêtre d'aide.

Les images du maillage final et de la solution attendus sont disponibles dans la [documentation officielle](https://doc.freefem.org/examples/misc.html#poisson-s-equation).

### Utilisation du conteneur FreeFEM pour les calculs parallèles

Le fichier d'entrée `MPIGMRES2D.edp` permet de résoudre un problème de type Poisson sur un carré unitaire décomposé en sous-domaines en parallèle sur plusieurs cœurs avec MPI. Le domaine est d'abord partitionné avec METIS, puis un maillage et une partition de l'unité sont construits automatiquement pour échanger des données entre les sous-domaines voisins. Le système linéaire est ensuite résolu avec un algorithme de type GMRES préconditionné par une méthode de Schwarz additive à un niveau (`-gmres 2`). L'argument `-k` contrôle le raffinement appliqué à chaque sous-domaine après partitionnement, et l'argument `-n` définit la résolution du maillage global.

Pour exécuter cette simulation, le conteneur FreeFEM peut être utilisé de deux manières différentes : le mode embarqué, où la bibliothèque MPI intégrée dans le conteneur est utilisée pour lancer les processus ou le mode hybride, où la bibliothèque MPI de l'hôte lance le conteneur lui-même pour chaque tâche.

**Mode embarqué** :

```bash
apptainer exec freefem.sif mpirun -np N FreeFem++-mpi MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

ou :

```bash
apptainer exec freefem.sif ff-mpirun -np N MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

**Mode hybride** :

```bash
mpirun -np N apptainer exec freefem.sif FreeFem++-mpi MPIGMRES2D.edp -d 1 -k 1 -gmres 2 -n 50
```

Plus d'informations sur l'utilisation des conteneurs Apptainer en parallèle, y compris sur les clusters et la différence entre les modes parallèle embarqué et hybride, sont disponibles sur [cette page](/documentation/use/apptainer-hpc).

</div>
