---
title: Comment utiliser l'image Apptainer NWChem ?
linkTitle: Tutoriel NWChem
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer NWChem de DIAMOND : récupération du conteneur et cas d'usage pour des calculs d'opimisation de géométrie."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **nwchem.sif** [disponible ici](/codes/scientific-computing/nwchem/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/nwchem-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un fichier d'entrée pour NWChem est disponible sous forme d'archive via [ce lien](/downloads/nwchem-tutorial-inputs.tar.gz). Ce fichier correspond à un tutoriel issu de la [documentation officielle](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) de NWChem.

Dans ce tutoriel, nous supposerons que le fichier d'entrée contenu dans cette archive se trouve dans le répertoire courant. Pour l'extraire :

```bash
tar -xzf nwchem-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul NWChem d'optimisation de géométrie avec Apptainer, dans le cas où le répertoire courant contient l'image `nwchem.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec nwchem.sif nwchem nwchem.nw > output.txt
```

## Utilisation détaillée du conteneur NWChem

Cette section explique comment utiliser l'image NWChem. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

NWChem est un logiciel open-source parallélisé conçu pour exécuter des calculs sur des systèmes chimiques allant des petites molécules aux matériaux à l’état solide et aux macromolécules. Il offre une gamme complète de méthodes de calculs, notamment la mécanique quantique (ab initio, DFT), la dynamique moléculaire et les simulations multi-échelles.

L'exécutable principal de l'image se nomme `nwchem`.

### Description de la simulation

Le fichier d'entrée `nwchem.nw` fourni dans le présent tutoriel est issu de la [page d'introduction](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) de la documentation du logiciel, il correspond à un exemple nommé *Water Molecule Sample Input File*. Comme décrit sur cette page, la simulation consiste à optimiser une molécule d'eau chargée positivement à l'aide de le théorie des perturbations de Møller-Plesset du second ordre (MP2), puis à calculer les fréquences propres pour la géométrie optimisée. Une optimisation de la géométrie par SCF est réalisée au préalable en utilisant une base peu coûteuse numériquement (STO-3G) pour initialiser la méthode MP2.

La [documentation](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) explique en détail les différentes directives utilisées dans le fichier d'entrée `nwchem.nw`. Voici un court résumé de ces descriptions :

- La directive `start` indique que cette simulation doit être lancée depuis son point de départ et non depuis un fichier *restart* déjà présent dans le répertoire courant,
- la directive `charge` définit la charge totale du système,
- la directive `basis` définit une base utilisée pour les optimisations,
- la directive `task` spécifie un calcul à mener, par exemple, la directive `task mp2 optimize` lance une optimisation MP2 avec une base préalablement définie.

### Lancement d'une simulation

La commande suivante permet de lancer une simulation NWChem avec le conteneur `nwchem.sif` :

```shell
apptainer exec nwchem.sif nwchem nwchem.nw > output.txt
```

Par défaut, la simulation est lancée en parallèle sur autant de threads OpenMP que possible. Un nombre de threads différent noté `N` peut être spécifié avec la commande suivante :

```shell
apptainer exec --env "OMP_NUM_THREADS=<N>" nwchem.sif nwchem nwchem.nw > output.txt
```

Le mot-clé `> output.txt` à la fin de la commande permet de rediriger la sortie de la simulation vers un fichier texte nommé `output.txt`. Une fois la simulation terminée, ce fichier peut être lu comme n'importe quel fichier texte. Le fichier `output.txt` contient de nombreuses informations, comme la version et la licence du code, le nombre de threads utilisés pour la simulation, le temps d'exécution total, ainsi que diverses quantités calculées par le programme.

### Pour aller plus loin

La [page d'introduction](https://nwchemgit.github.io/Getting-Started.html#water-molecule-sample-input-file) et la [documentation officielle](https://nwchemgit.github.io/index.html) contiennent de nombreux exemples qui présentent les différentes fonctionnalités du code. Les commandes présentées dans le présent tutoriel peuvent être facilement extrapolées pour lancer ces exemples.

</div>
