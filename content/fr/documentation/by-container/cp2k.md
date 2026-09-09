---
title: Comment utiliser l'image Apptainer CP2K ?
linkTitle: Tutoriel CP2K
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer CP2K de DIAMOND : récupération du conteneur et cas d'usage pour les calculs DFT."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **cp2k.sif** [disponible ici](/codes/scientific-computing/cp2k/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/cp2k-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour CP2K est disponible sous forme d'archive via [ce lien](/downloads/cp2k-tutorial-inputs.tar.gz).

Ces fichiers correspondent à un exemple issu de la [documentation officielle](https://www.cp2k.org/howto:static_calculation) de CP2K. L'archive contient les fichiers suivants :

- `Si_bulk8.inp` : le fichier d'entrée principal,
- `BASIS_SET` : contient les paramètres de la base utilisée pour ce calcul,
- `GTH_POTENTIALS` : contient les paramètres des pseudopotentiels.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf cp2k-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul CP2K parallèle sur `N` cœurs avec Apptainer, dans le cas où le répertoire courant contient l'image `cp2k.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec cp2k.sif mpirun -np <N> cp2k.psmp Si_bulk8.inp
```

## Utilisation détaillée du conteneur CP2K

Cette section explique comment utiliser l'image CP2K. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

CP2K est un logiciel open-source parallélisé conçu pour effectuer des simulations atomistiques dans les domaines de la chimie, de la physique et des matériaux. Il est principalement utilisé pour des calculs de dynamique moléculaire, de structure électronique, et pour d’autres méthodes multi-échelles telles que QM/MM (*quantum mechanics/molecular mechanics*). Le logiciel prend en charge à la fois le multithreading avec OpenMP et l'exécution parallèle sur plusieurs cœurs avec MPI.

L'exécutable principal de l'image se nomme `cp2k.psmp`. La commande suivante affiche la version de cet exécutable :

```shell
apptainer exec cp2k.sif cp2k.psmp --version
```

La licence du code peut être affichée depuis l'extérieur du conteneur avec la commande suivante :

```bash
cp2k_exe=$(apptainer exec cp2k.sif readlink -f /bin/cp2k.psmp)
cp2k_bin=$(apptainer exec cp2k.sif dirname $cp2k_exe)
cp2k_license=$(apptainer exec cp2k.sif find $cp2k_bin/.. -name "LICENSE")
apptainer exec cp2k.sif cat $cp2k_license
```

### Description de l'exemple

Les fichiers d'entrée fournis dans ce tutoriel sont extraits d'un [exemple](https://www.cp2k.org/howto:static_calculation) de la documentation officielle de CP2K intitulé *Comment calculer l'énergie et les forces* (en anglais dans le texte original). Cet exemple implémente un calcul statique et auto-cohérent de l'énergie et des forces à l'aide de la théorie de la fonctionnelle de la densité (DFT) de Kohn-Sham pour un système de silicium massif à structure cubique à faces centrées comprenant 8 atomes dans une maille élémentaire cubique. Le fichier d'entrée principal, `Si_bulk8.inp`, définit les paramètres du système et de la tâche, notamment :
- **GLOBAL** : nom du projet (`Si_bulk8`), type d'exécution (`ENERGY_FORCE`) et niveau de verbosité (`LOW`).
- **FORCE_EVAL** : utilise la méthode QUICKSTEP pour les calculs DFT avec :
  - **SUBSYS** : spécifie l’élément silicium (`Si`), son ensemble de bases (`DZVP-GTH-PADE`), son pseudopotentiel (`GTH-PADE-q4`), les vecteurs de la maille et les coordonnées atomiques.
  - **DFT** : Configure les fichiers de jeu de bases et de pseudopotentiels, les paramètres de maillage (`NGRIDS 4`, `CUTOFF 300`, `REL_CUTOFF 60`), la fonctionnelle d’échange-corrélation (`PADE`) et les paramètres SCF (par exemple, `SCF_GUESS ATOMIC`, `EPS_SCF 1,0E-7`).
  - **PRINT** : Active l’affichage des forces atomiques.

Les autres fichiers d’entrée, `BASIS_SET` et `GTH_POTENTIALS`, contiennent respectivement les paramètres des ensembles de bases et des pseudopotentiels. Notez que ces fichiers sont également présents dans le conteneur, dans le répertoire `/share/cp2k/data`. À titre d’exemple, la commande suivante copie le fichier `BASIS_SET` depuis le conteneur vers le répertoire courant :

```shell
apptainer exec cp2k.sif cp /share/cp2k/data/BASIS_SET ./
```

### Exécution de la simulation

La commande suivante lance la simulation CP2K sur deux cœurs à l’aide de la bibliothèque MPI. Le résultat de la simulation est enregistré dans le fichier `Si_bulk8.out`, comme spécifié par l’option `-o`. Notez que cette option ajoute les résultats des exécutions successives à la fin du fichier de sortie `Si_bulk8.out`. Ce fichier doit donc être supprimé avant de lancer un nouveau calcul.

```shell
apptainer exec cp2k.sif mpirun -np 2 cp2k.psmp -o Si_bulk8.out Si_bulk8.inp
```

La commande ci-dessus utilise le mode parallèle « embarqué » d'Apptainer. Plus d'informations sur l'utilisation des conteneurs Apptainer en parallèle, y compris sur les clusters, sont disponibles sur [cette page](/documentation/use/apptainer-hpc).

### Lecture des résultats

Une fois le calcul terminé, les fichiers de sortie suivants sont générés :
- `Si_bulk8.out` : fichier de sortie principal contenant l'énergie, les forces et les détails de convergence,
- `Si_bulk8-RESTART.wfn` : fonctions d'onde Kohn-Sham finales,
- `Si_bulk8-RESTART.wfn.bak-1` : fonctions d'onde issues de l'étape SCF précédente.

Le fichier de sortie (`Si_bulk8.out`) comprend plusieurs sections:
- **Convergence SCF** : nombre d'étapes, énergie totale et variations d'énergie par itération,
- **Énergies finales** : détail de l’énergie électronique, l’énergie de noyau, l’énergie de Hartree, l’énergie d’échange-corrélation et l’énergie totale,
- **Forces atomiques** : forces exercées sur chaque atome (leur somme devrait être proche de zéro pour un système à l'équilibre).

L’énergie totale et les forces sont exprimées en unités atomiques (u.a.). Pour les systèmes métalliques ou ceux présentant de faibles bandes interdites, un lissage peut être ajouté afin de stabiliser le calcul, ce qui introduit un terme d’énergie entropique électronique dans les résultats. La [page de l'exemple](https://www.cp2k.org/howto:static_calculation) explique comment procéder pour la simulation en cours. Les commandes présentées dans ce tutoriel peuvent être facilement adaptées pour exécuter cette section supplémentaire.

</div>
