# Tutoriel : simple-adsorption-workflow

## Pré-requis

- Installer Apptainer
- Télécharger l'image apptainer

TODO : ajouter les liens vers les pages de DIAMOND correspondantes

## 1 -  Choisir les paramètres de la simulation
``
apptainer run simple-adsorption-workflow input
``
Une fenêtre avec deux onglets s'ouvrent. L'utilisateur peut alors choisir les différents paramètres de la simulation.
<p align="center">
  <img src="./figures/saw_input_gui_1.png" alt="" width="300" />
</p>
<p align="center"><i>Cliquer sur les paramètres désirés ou les remplir manuellement</i></p>

<p align="center">
  <img src="./figures/saw_input_gui_3.png" alt="" width="300" />
</p>
<p align="center"><i>Paramètres avancés</i></p>

<p align="center">
  <img src="./figures/saw_input_gui_2.png" alt="" width="300" />
</p>
<p align="center"><i>Sauvegarder le fichier de paramètres</i></p>

Les **structures** proviennent de la base de donnée MOFX-DB qui est un point d'accès vers la base de donnée originale, la CoRE MOF 2019. Les structures sont des structures nettoyées à partir de structures résolues par diffraction de rayons X provenant de la CSD (Crystallographic Structural Database) dont l'identifiant est une clé à 6 lettres.

Les charges partielles peuvent être déterminées par : 
- sans charges partielles : `None`
- par une équilibration de charges `EQeq` (voir [cet article](https://doi.org/10.1021/acs.jctc.8b00669))

## 2 - Lancer les simulations

``
apptainer run simple-adsorption-workflow run -i input.json
``
TODO : vérifier comment récupérer le fichier `input.json` généré dans la première étape et l'intégrer dans le prochain conteneur.

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

La base de donnée complète de propriétés d'asdorption se situe dans le fichier `gcmc/run<index>.json` où index est l'identifiant de l'expérience.


## 3 - Mettre-à-jour la base de donnée

Lorsque l'on veut mettre à jour une base de donnée déjà générée par une expérience passée (ex : `run<index1>.json`), on peut générer une nouvelle base de donnée par la commande :

``
apptainer run simple-adsorption-workflow -i run<index1>.json run<index>.json -o ./
``

On obtient alors deux nouveaux fichiers : 
- `run_merged.json` : la base de donnée complète
- `isotherms.json` : le fichier avec les isothermes

TODO : 
- vérifier comment on récupère le fichier `isotherms.json` en dehors du containeur

## 4 - Visualiser les résultats 
``
apptainer run simple-adsorption-workflow plot
``

<p align="center">
  <img src="./figures/saw_output_gui_1.png" alt="" width="300" />
</p>
<p align="center"><i>Choisir le fichier avec les données des isothermes</i></p>

<p align="center">
  <img src="./figures/saw_output_gui_2.png" alt="" width="300" />
</p>
<p align="center"><i></i></p>

<p align="center">
  <img src="./figures/saw_output_gui_3.png" alt="" width="300" />
</p>
<p align="center"><i> Visualiser les isothermes en sélectionnant les paramètres désirés</i></p>