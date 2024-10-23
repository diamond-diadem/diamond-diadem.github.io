# Tutoriel : simple-adsorption-workflow

## Pré-requis

- [Installer Apptainer](/documentation/install/install-apptainer)
-  Télécharger l'image Apptainer :

```bash
apptainer pull simple-adsorption-workflow.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/simple-adsorption-workflow.sif:latest
```

## 1 -  Choisir les paramètres de la simulation
```bash
apptainer run simple-adsorption-workflow input
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

Les **structures** proviennent de la base de donnée MOFX-DB qui est fourni un serveur d'accès vers la base de donnée originale, la **CoRE MOF 2019**. Ces structures sont nettoyées (sans solvant, sans désordre, etc ...) à partir de structures résolues par diffraction de rayons X provenant de la CSD (Crystallographic Structural Database) dont l'identifiant est une clé à 6 lettres.

Les charges partielles peuvent être déterminées par deux méthodes dans l'état actuel :
- sans charges partielles : `None`
- par une équilibration de charges `EQeq` (voir [cet article](https://doi.org/10.1021/acs.jctc.8b00669))

Les champs de force utilisables sont :
- `ExampleMOFsForceField` : un champ de force générique pour les MOFs, utilisant un jeu de paramètres combinant des paramètres des champs de force Dreiding et UFF.

## 2 - Lancer les simulations

```bash
apptainer run simple-adsorption-workflow run -i input.json
```

TODO : vérifier comment récupérer le fichier `input.json` généré dans la première étape et l'intégrer dans le prochain conteneur.

Le script de base lance autant de simulations GCMC utilisant chacune un coeur CPU que de combinaisons de paramètres d'entrées. Exemple : 3 structures x 2 Températures x 5 points de Pression x 2 méthodes de charges  = 60 simulations.

> Note : Le workflow ne permet pas encore d'être utilisé avec un *scheduler*, l'utilisateur doit donc veiller à lancer au maximum autant de simulations que de coeurs CPU accessibles pour garantir une performance acceptable.

L'architecture des fichiers générés se présentent ainsi :
```
data_<ID>.
├── cif
├── gcmc
├── isotherms
├── job_gcmc.sh
├── sim.log
├── zeopp_asa
└── zeopp.log
```

La base de donnée complète de propriétés d'adsorption se situe dans le fichier `gcmc/run<index>.json` où index est l'identifiant de l'expérience.


## 3 - Mettre-à-jour la base de donnée

Lorsque l'on veut mettre à jour une base de donnée déjà générée par une expérience passée (ex : `run<index1>.json`), on peut générer une nouvelle base de donnée par la commande :

```bash
apptainer run simple-adsorption-workflow -i run<index1>.json run<index>.json -o ./
```

On obtient alors deux nouveaux fichiers :
- `run_merged.json` : la base de donnée complète
- `isotherms.json` : le fichier avec les isothermes

TODO :
- vérifier comment on récupère le fichier `isotherms.json` en dehors du containeur

## 4 - Visualiser les résultats
```bash
apptainer run simple-adsorption-workflow plot
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
