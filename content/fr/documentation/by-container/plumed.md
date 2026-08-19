---
title: Comment utiliser l'image Apptainer PLUMED ?
linkTitle: Tutoriel PLUMED
weight: 4
description: "Tutoriel sur l'utilisation de l'image Apptainer PLUMED de DIAMOND : récupération du conteneur, exécution et cas d'usage pour l'analyse de trajectoires de dynamique moléculaire pré-calculées."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **plumed.sif** [disponible ici](/codes/scientific-computing/plumed/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/plumed-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour PLUMED est disponible sous forme d'archive via [ce lien](/downloads/plumed-tutorial-inputs.tar.gz).

Ces fichiers correspondent à un tutoriel issu de la [documentation officielle](https://www.plumed.org/doc-v2.9/user-doc/html/masterclass-21-1.html) de PLUMED. L'archive contient les fichiers suivants :

- `5-HT1B.pdb`: conformation de référence du récepteur 5-HT1B avec le ligand sérotonine,,
- `5-HT1B.xtc`: trajectoire de dynamique moléculaire du récepteur 5-HT1B avec le ligand sérotonine, pré-calculée par le logiciel GROMACS,
- `plumed.dat` : un script d'entrée PLUMED. 

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf plumed-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer une analyse avec PLUMED dans le cas où le répertoire courant contient l'image `plumed.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec plumed.sif plumed driver --mf_xtc 5-HT1B.xtc
```

## Utilisation détaillée du conteneur PLUMED

Cette section explique comment utiliser l'image PLUMED pour analyser un fichier de trajectoire de dynamique moléculaire pré-calculé. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

PLUMED est un code en source ouverte parallélisé et très versatile conçue pour améliorer les simulations en dynamique moléculaire (MD) et Monte Carlo (MC). Les fonctionnalités principales de PLUMED permettent le calcul et la manipulation de variables collectives, essentielles pour la caractérisation de l'état d'un système moléculaire. Le code est aussi équipé d'un set d'outil complet pour l'analyse et le post-traitement de données de simulation.

L'exécutable principal de l'image se nomme `plumed`.

### Visualisation du fichier de trajectoire avec VMD

Le fichier d'entrée `5-HT1B.xtc` décrit plus haut contient une trajectoire de dynamique moléculaire. Cette-dernière peut être visualisée avec le code VMD, entre autres.

Si VMD est installé localement, la commande suivante permet de visualiser la trajectoire :

```shell
vmd 5-HT1B.pdb 5-HT1B.xtc 
```

Si VMD n'est pas installé, le [conteneur VMD](/codes/visualisation/vmd) fourni par le site internet de Diamond peut être utilisé de le manière suivante :

```shell
apptainer exec vmd.sif vmd 5-HT1B.pdb 5-HT1B.xtc 
```

Comme mentionné dans le [tutoriel](https://www.plumed.org/doc-v2.9/user-doc/html/masterclass-21-1.html#:~:text=This%20is%20the%20raw%20trajectory%20generated%20by%20GROMACS.%20Therefore%20it%20is%20discontinuous%20due%20to%20periodic%20boundaries%20conditions%20(PBCs).) PLUMED, cette trajectoire apparaît discontinue à cause de conditions aux limites périodiques.

### Execution du script PLUMED à l'aide du driver de PLUMED

Le script d'entrée `plumed.dat` contient des instructions pour analyser la trajectoire `5-HT1B.xtc`. Le lecteur est invité à lire le contenu de ce script pour plus en savoir plus sur la syntaxe des scripts d'entrée PLUMED, ce dernier étant commentée de manière exhaustive. Pour en apprendre encore plus sur cette syntaxe, la page de la [documentation officielle](https://www.plumed.org/doc-v2.9/user-doc/html/masterclass-21-1.html#:~:text=A%20sample%20PLUMED%20input%20file) à la base du présent tutoriel contient aussi des liens cliquables pour chaque mot-clé, renvoyant vers la documentation de ces derniers.

Le script contient deux routines d'analyse :

- La première calcule la distance en nanomètres entre deux atomes donnés, indicés 1 et 10, et l'écrit tous les 10 pas de temps dans un fichier nommé `COLVAR1`,
- La deuxième calcule l'angle de torsion en radians entre les atomes 1, 10, 20 et 30 et l'écrit tous les 100 pas de temps dans un autre fichier nommé `COLVAR2`.

Le script peut être lancé avec le `driver` PLUMED de la façon suivante :

```shell
apptainer exec plumed.sif plumed driver --mf_xtc 5-HT1B.xtc
```

Notons que le script d'entrée est automatiquement reconnu par PLUMED à condition qu'il soit nommé `plumed.dat`. La commande précédente produit deux fichiers de sortie `COLVAR1` et `COLVAR2`. Dans chaque fichier, la première ligne décrit les champs physiques affichés.

### Pour aller plus loin

La documentation officielle de PLUMED contient un grand nombre de tutoriels listés sur [cette page](https://www.plumed.org/doc-v2.9/user-doc/html/tutorials.html). Les commandes permettant d'exécuter PLUMED depuis le conteneur PLUMED présentées dans le présent tutoriel peuvent être facilement extrapolées pour lancer ces exemples.

</div>
