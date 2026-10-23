---
title: Comment utiliser l'image Apptainer Wannier90 ?
linkTitle: Tutoriel Wannier90
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer Wannier90 de DIAMOND : récupération du conteneur et cas d'usage pour le calcul des fonctions de Wannier à localisation maximale."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **wannier90.sif** [disponible ici](/codes/scientific-computing/wannier90/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/wannier90-tutorial-inputs.tar.gz)
- Optionnellement, avoir téléchargé [l'image XCrySDen]({{% ref "/codes/visualisation/xcrysden/" %}}) pour visualiser les fonctions de Wannier

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour Wannier90 est disponible sous forme d'archive via [ce lien](/downloads/wannier90-tutorial-inputs.tar.gz).

Ces fichiers correspondent aux deux premiers tutoriels de la [documentation officielle](https://wannier90.readthedocs.io/en/latest/tutorials/preliminaries/) du logiciel. Wannier90 est un outil de post-traitement : il se contente de lire des fichiers préalablement générés par un code de structure électronique à partir des principes fondamentaux et n'effectue aucun calcul DFT. L'archive contient deux répertoires, un par tutoriel.

**`tuto1`** : [tutoriel 1](https://wannier90.readthedocs.io/en/latest/tutorials/tutorial_1/) (*Gallium Arsenide — MLWFs for the valence bands*), avec les [fichiers d'entrée](https://github.com/wannier-developers/wannier90/tree/develop/tutorials/tutorial01) et une [solution commentée](https://wannier90.readthedocs.io/en/latest/tutorial_solutions/tutorial_solution_1/). Il contient :
- `gaas.win` : le fichier d’entrée principal. Il définit la structure cristalline de l’arséniure de gallium (GaAs), le nombre de fonctions de Wannier à calculer (4), la grille de points k (2×2×2) et l’estimation initiale pour les fonctions de Wannier,
- `gaas.mmn` : les matrices de chevauchement $M^{(\mathbf{k},\mathbf{b})}$ entre les parties périodiques des états de Bloch aux points k voisins,
- `gaas.amn` : les projections $A^{(\mathbf{k})}$ des états de Bloch sur un ensemble d’orbitales tests localisées,
- `UNK00001.1` à `UNK00008.1` : les états de Bloch dans la maille unitaire de l’espace réel, à raison d’un fichier par point k (8 fichiers). Ils ne sont nécessaires que pour tracer les fonctions de Wannier.

**`tuto2`** : [tutoriel 2](https://wannier90.readthedocs.io/en/latest/tutorials/tutorial_2/) (*Lead — Wannier-interpolated Fermi surface*), avec les [fichiers d'entrée](https://github.com/wannier-developers/wannier90/tree/develop/tutorials/tutorial02) et une [solution commentée](https://wannier90.readthedocs.io/en/latest/tutorial_solutions/tutorial_solution_2/). Il contient :
- `lead.win` : le fichier d’entrée principal. Il définit la structure cristalline du plomb (un atome de Pb dans la maille primitive cubique à faces centrées), le nombre de fonctions de Wannier à calculer (4), la grille de points k (4×4×4), l’estimation initiale pour les fonctions de Wannier et les mots-clés pour le calcul de la surface de Fermi,
- `lead.mmn` : les matrices de chevauchement $M^{(\mathbf{k},\mathbf{b})}$,
- `lead.amn` : les projections $A^{(\mathbf{k})}$ des états de Bloch sur un ensemble d’orbitales test localisées,
- `lead.eig` : les valeurs propres de Bloch à chaque point k. Elles ne sont nécessaires que pour l’interpolation des bandes.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf wannier90-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul Wannier90 dans le cas où le répertoire courant contient l'image `wannier90.sif` ainsi que les répertoires `tuto1` et `tuto2` extraits :

```bash
cd tuto1
apptainer exec ../wannier90.sif wannier90.x gaas
cd ../tuto2
apptainer exec ../wannier90.sif wannier90.x lead
```

## Utilisation détaillée du conteneur Wannier90

Cette section présente différentes façons d'utiliser l'image Wannier90. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

Wannier90 est un logiciel open source permettant de calculer les fonctions de Wannier maximales localisées (MLWF) en physique de la matière condensée. Il sert d'outil de post-traitement pour les codes de structure électronique ab initio, tels que Quantum ESPRESSO, VASP ou Abinit, et est utilisé pour l'interpolation de la structure de bande ainsi que pour le calcul des propriétés électroniques des métaux, des isolants et des matériaux topologiques.

L'exécutable principal de l'image est `wannier90.x`. La commande suivante affiche la version du code :

```shell
apptainer exec wannier90.sif wannier90.x --version
```

Il est possible d'accéder à la licence du code depuis l'extérieur du conteneur comme suit :

```bash
w_path=$(apptainer exec wannier90.sif ls /gnu/store | grep wannier)
license=$(apptainer exec wannier90.sif find /gnu/store/$w_path -name "LICENSE")
apptainer exec wannier90.sif cat $license
```

### Tutoriel 1 : MLWF pour les bandes de valence du GaAs, avec représentation graphique

#### Description de l'exemple

Les fichiers d’entrée fournis dans ce tutoriel sont extraits du [tutoriel officiel n° 1 de Wannier90](https://wannier90.readthedocs.io/en/latest/tutorials/tutorial_1/) (*Gallium Arsenide — MLWFs for the valence bands*). Cet exemple calcule les quatre MLWF couvrant les quatre bandes de valence du GaAs, puis les trace sur une grille en espace réel. Le fichier d’entrée principal, `gaas.win`, définit les paramètres du système et du calcul, notamment :
- **Fonctions de Wannier** : `num_wann = 4` fonctions de Wannier, optimisées pour un maximum de `num_iter = 20` itérations,
- **Cellule unitaire et atomes** : la cellule primitive cubique à faces centrées (exprimée en unités de Bohr),
- **Hypothèse de départ** : projections `As:sp3`, c’est-à-dire quatre orbitales de type sp³ centrées sur l’As. Le tutoriel officiel décrit cette hypothèse de départ comme quatre gaussiennes centrées sur les liaisons,
- **Points K** : une grille de Monkhorst-Pack 2×2×2 (`mp_grid`) et la liste des 8 points K,
- **Format de la fonction d’onde** : `wvfn_formatted=.true.` lit les états de Bloch (fichiers `UNK`) à partir de fichiers texte formatés, ce qui garantit que l’exemple fonctionne sur toutes les plateformes. La valeur par défaut (non formatée) doit être utilisée pour les exécutions en production,
- **Tracé** : `wannier_plot = true` demande à Wannier90 de tracer les MLWF sur une grille en espace réel, en plus de minimiser leur dispersion.

La première exécution du tutoriel officiel s'effectue sans le mot-clé `wannier_plot`, afin de minimiser uniquement la dispersion. L'étape de tracé est plus lente et utilise davantage de mémoire, car les MLWF doivent alors être représentées explicitement sur une grille en espace réel. Le fichier `gaas.win` de ce tutoriel inclut directement `wannier_plot = true`.

#### Exécution de la simulation

Les commandes suivantes permettent d'exécuter Wannier90 sur les fichiers d'entrée `gaas`. Tous les fichiers d'entrée partagent ce préfixe, et les fichiers de sortie sont enregistrés dans le répertoire courant avec le même préfixe.

```shell
cd tuto1
apptainer exec ../wannier90.sif wannier90.x gaas
```

#### Lecture des résultats

Une fois le traitement terminé, les fichiers de sortie suivants sont générés :
- `gaas.wout` : fichier de sortie principal, contenant l'analyse, la minimisation de la dispersion et le résumé des graphiques,
- `gaas.chk` : fichier checkpoint,
- `gaas_00001.xsf` à `gaas_00004.xsf` : les quatre MLWF sur une grille en espace réel, au format XCrySDen.

Les MLWF enregistrés dans les fichiers `.xsf` peuvent être visualisés avec XCrySDen. Par exemple, on peut utiliser l’[image de conteneur XCrySDen]({{% ref "/codes/visualisation/xcrysden/" %}}) fournie par la plateforme :

```shell
apptainer exec ../xcrysden.sif xcrysden --xsf gaas_00001.xsf
```

Une fois XCrySDen lancé, les paramètres suivants peuvent être définis dans le menu *Tools → Data Grid* pour visualiser les résultats :

```txt
Degree of triCubic Spline = 3;
Isovalue = 0.95;
Render +/- isovalue = yes
```

<img alt="Visualisation XCrySDen pour la molécule de GaAs" src="/images/tutorials/wannier90-tutorial/gaas1.png" />

### Tutoriel 2 : Surface de Fermi du plomb interpolée selon la méthode de Wannier

#### Description de l'exemple

Les fichiers d'entrée fournis dans ce tutoriel sont extraits du [tutoriel officiel n° 2 de Wannier90](https://wannier90.readthedocs.io/en/latest/tutorials/tutorial_2/) (*Lead — Wannier-interpolated Fermi surface*). Cet exemple calcule les fonctions d’onde de Fermi maximales (MLWF) pour les quatre états les plus bas du plomb, puis utilise l’interpolation de Wannier pour tracer sa surface de Fermi. Les quatre bandes de valence les plus basses du plomb sont séparées en énergie des états de conduction supérieurs, mais les MLWF de ces états sont partiellement occupées : des MLWF ne décrivant que les états occupés seraient mal localisées. Le fichier d’entrée principal, `lead.win`, définit les paramètres du système et de la tâche, notamment :
- **Fonctions de Wannier** : `num_wann = 4` fonctions de Wannier, optimisées pour un maximum de `num_iter = 20` itérations,
- **Cellule unitaire et atomes** : la cellule primitive cubique à faces centrées (exprimée en unités de Bohr) avec un atome de Pb à l’origine,
- **Hypothèse de départ** : projections `Pb:sp3`, c'est-à-dire des orbitales hybrides sp³ centrées sur l'atome.
- **Points K** : une grille de Monkhorst-Pack 4×4×4 (`mp_grid`) et la liste des 64 points K,
- **Surface de Fermi** : `fermi_surface_plot = true` demande à Wannier90 de calculer la surface de Fermi, et `fermi_energy = 5,2676` définit l’énergie de Fermi (en eV), obtenue à partir du calcul ab initio initial.

Dans le tutoriel officiel, l'étalement des MLWF est d'abord minimisé lors d'une exécution sans les mots-clés relatifs à la surface de Fermi. Les transformations unitaires obtenues sont ensuite réutilisées, en ajoutant `restart = plot` au fichier d'entrée, afin d'interpoler les énergies de bande sur un maillage dense de points k sans répéter l'intégralité du calcul. Le fichier `lead.win` de ce tutoriel a déjà été modifié de manière que ces deux opérations soient effectuées en une seule exécution, sans aucun redémarrage.

#### Exécution de la simulation

Les commandes suivantes permettent d'exécuter Wannier90 sur les fichiers d'entrée `lead` :

```shell
cd tuto2
apptainer exec ../wannier90.sif wannier90.x lead
```

#### Lecture des résultats

Une fois le traitement terminé, les fichiers de sortie suivants sont générés :
- `lead.wout` : fichier de sortie principal, contenant l'analyse, la minimisation de la dispersion et le résumé des graphiques,
- `lead.chk` : fichier checkpoint,
- `lead.bxsf` : la surface de Fermi interpolée, au format XCrySDen.

Le fichier `lead.bxsf` contient les énergies des quatres bandes pour une énergie de Fermi de $5.2676~eV$ sur une grille de 51 × 51 × 51 correspondant à la cellule unitaire réciproque. La densité de la grille est contrôlée par le mot-clé `fermi_surface_num_points`, dont la valeur par défaut est 50 (soit 50³ points).

La surface de Fermi peut être visualisée avec XCrySDen. Par exemple, on peut utiliser l'[image de conteneur XCrySDen]({{% ref "/codes/visualisation/xcrysden/" %}}) fournie par la plateforme :

```shell
apptainer exec ../xcrysden.sif xcrysden --bxsf lead.bxsf
```

Les captures d'écran suivantes montrent la surface de Fermi du plomb, interpolée selon la méthode de Wannier, pour la bande 1 et la bande 3 respectivement, telles qu'affichées par XCrySDen.

<img alt="Surface de Fermi du plomb, interpolée selon la méthode de Wannier, pour la bande 1" src="/images/tutorials/wannier90-tutorial/band2_lead.png" />
<img alt="Surface de Fermi du plomb, interpolée selon la méthode de Wannier, pour la bande 3" src="/images/tutorials/wannier90-tutorial/band3_lead.png" />

</div>
