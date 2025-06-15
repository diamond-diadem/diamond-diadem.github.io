---
title: Tutoriel simple-adsorption-workflow
linkTitle: Tutoriel
---

## Pré-requis

- [Installer Apptainer](/documentation/install/install-apptainer)
- Télécharger l'image Apptainer :

```bash
apptainer pull simple-adsorption-workflow.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/simple-adsorption-workflow.sif:latest
```

## 1 - Choisir les paramètres de la simulation

```bash
apptainer run simple-adsorption-workflow.sif input
```

Une fenêtre avec deux onglets s'ouvrent:

<p align="center">
  <img alt="saw input gui 1" class="saw-input-gui-1" style="width:50%">
</p>
<p align="center"><i>Cliquer sur les paramètres désirés ou les remplir manuellement</i></p>

<p align="center">
  <img alt="saw input gui 3" class="saw-input-gui-3" style="width:50%">
</p>
<p align="center"><i>Modifier les paramètres avancés</i></p>

<p align="center">
  <img alt="saw input gui 2" class="saw-input-gui-2" style="width:70%">
</p>
<p align="center"><i>Sauvegarder le fichier de paramètres</i></p>

Les **structures** proviennent de la base de donnée **MOFX-DB** basé sur un serveur d'accès pointant vers la base de donnée structurelle originale (**CoRE MOF 2019**). Ces structures sont nettoyées (sans solvant, sans désordre, etc ...) à partir de structures résolues par diffraction de rayons X provenant de la base de données CSD (Crystallographic Structural Database) dont l'identifiant est une clé à 6 lettres.

Dans l'état actuel, les charges partielles peuvent être déterminées par deux méthodes :

- sans charges partielles : `None`
- par une équilibration de charges `EQeq` (voir [cet article](https://doi.org/10.1021/acs.jctc.8b00669))

Les champs de force utilisables sont :

- `ExampleMOFsForceField` : un champ de force générique pour les MOFs, utilisant un jeu de paramètres combinant des paramètres des champs de force Dreiding et UFF.

## 2 - Lancer les simulations

```bash
apptainer run simple-adsorption-workflow.sif run -i input.json
```

Le script de base lance autant de simulations GCMC utilisant chacune un coeur CPU que de combinaisons de paramètres d'entrées. Exemple : 3 structures x 2 Températures x 5 points de Pression x 2 méthodes de charges = 60 simulations.

> Note : Dans sa version conteunerisée, le workflow ne permet pas d'être utilisé avec un _scheduler_, l'utilisateur doit donc veiller à lancer au maximum autant de simulations que de coeurs CPU accessibles pour garantir une performance acceptable.

L'architecture des fichiers générés se présentent ainsi :

```
.
├── cif
├── gcmc
├── isotherms
├── job_gcmc.sh
├── sim.log
├── zeopp_asa
└── zeopp.log
```

La **base de donnée** de propriétés d'adsorption se situe dans le fichier `gcmc/run<index>.json` où `<index>` est l'identifiant de l'expérience.

## 3 - Mettre-à-jour la base de donnée

Lorsque l'on veut mettre à jour une base de donnée déjà générée par une expérience passée (ex : `run<index1>.json`), on peut générer une nouvelle base de donnée par la commande :

```bash
apptainer run simple-adsorption-workflow.sif merge -i run<index1>.json run<index>.json -o ./
```

On obtient alors deux nouveaux fichiers :

- `run_merged.json` : la base de donnée entière
- `isotherms.json` : le fichier contenant les isothermes

> Le fichier `isotherms.json` ne contient pas toutes les métadonnées de chaque simulation mono-CPU, contrairement au fichier `run_merged.json` mais est il est trsè utile pour regrouper les données et les représenter simplement (voir section suivante).

## 4 - Visualiser les résultats

```bash
apptainer run simple-adsorption-workflow.sif plot
```

<p align="center">
  <img alt="saw output gui 1" class="saw-output-gui-1" style="width:70%">
</p>
<p align="center"><i>Choisir le fichier avec les données des isothermes</i></p>

<p align="center">
 <img alt="saw output gui 2" class="saw-output-gui-2" style="width:70%">
</p>
<p align="center"><i></i></p>

<p align="center">
 <img alt="saw output gui 3" class="saw-output-gui-3" style="width:70%">
</p>
<p align="center"><i> Visualiser les isothermes en sélectionnant les paramètres désirés</i></p>
