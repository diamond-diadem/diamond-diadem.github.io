---
title: "Workflows DIAMOND AiiDA-VASP"
weight: 5
summary: "Dynamique moléculaire ab initio automatisée avec VASP, AiiDA et OVITO"
description: "Présentation des workflows WF1 et WF2 de dynamique moléculaire ab initio avec VASP, AiiDA et OVITO."
tablerIcon: tabler-icons/outline/atom
toc: false
draft: true
cascade:
  draft: true
aliases:
  - /workflows/aiida-vasp/description/
---

## Présentation

Ce projet rassemble des outils Python pour automatiser certaines étapes de la **dynamique moléculaire *ab initio* (AIMD) avec VASP**, en s'appuyant sur [AiiDA](https://www.aiida.net/) et le plugin [`aiida-vasp`](https://github.com/aiida-vasp/aiida-vasp). Il a été développé dans le cadre de **DIAMOND** pour faciliter la préparation de calculs, leur soumission sur des infrastructures de calcul et l'analyse reproductible de leurs résultats.

La version actuelle propose deux modules complémentaires : **WF1**, consacré à l'extraction des structures inhérentes d'un liquide, et **WF2**, dédié à l'estimation du volume d'équilibre à partir de simulations à volume fixé. Un troisième module, **WF3**, est envisagé pour intégrer ces étapes dans une chaîne de production de données pour les potentiels interatomiques appris par machine (*machine-learning interatomic potentials*, MLIP).

Les calculs VASP sont suivis par **AiiDA**, tandis que certaines analyses structurales utilisent l'API Python gratuite d'**OVITO Basic**. Les paramètres sont regroupés dans des fichiers YAML afin de faciliter leur adaptation à un ordinateur local ou à un cluster HPC.

<p align="center">
<img alt="Alternative text for the image" src="/images/workflows/aiida-vasp/wf-aiida-vasp.png" />
</p>
<p align="center"><i>Schéma des workflows AIIDA-VASP disponibles.</i></p>


## Modules disponibles

### WF1 — Extraction de structures inhérentes

**Entrée :** une trajectoire VASP au format `XDATCAR`.

WF1 sélectionne des configurations à intervalles réguliers, après exclusion éventuelle des premières images correspondant à la thermalisation. Chaque configuration est ensuite soumise à une **relaxation atomique à cellule fixe** via un WorkChain `vasp.relax` d'AiiDA. Les structures relaxées représentent les minima locaux de l'énergie potentielle associés aux configurations échantillonnées.

Une étape de post-traitement permet également :

- de calculer des fonctions de distribution radiale (RDF) sur la trajectoire d'entrée;
- d'estimer, à partir des RDF, des rayons de coupure par paire d'espèces chimiques;
- de réaliser une **analyse des voisins communs** (*common-neighbor analysis*, CNA) sur les structures relaxées, avec OVITO.

**Résultats principaux :** structures relaxées au format `POSCAR`, tableau RDF (`rdf.csv`), rayons de coupure (`pair_cutoffs.json`) et statistiques CNA (`cna.csv`). Les seuils déterminés automatiquement doivent être contrôlés avant toute interprétation scientifique.

### WF2 — Estimation du volume d'équilibre

**Entrée :** une ou plusieurs structures `POSCAR_<température>` (la température est indiquée en kelvins, par exemple `POSCAR_650`).

Pour chaque température, WF2 génère plusieurs structures de **volumes différents**, puis soumet des simulations AIMD en ensemble **NVT** avec `vasp.vasp`. Il calcule la pression moyenne sur la partie finale de chaque trajectoire en lisant les fichiers `OUTCAR`, puis ajuste la relation pression–volume à l'aide de l'**équation d'état de Birch–Murnaghan du troisième ordre**.

Le volume d'équilibre estimé correspond au volume pour lequel la pression ajustée s'annule. Cette approche évite de recourir systématiquement à une longue simulation NPT pour une première estimation du volume d'équilibre.

**Résultats principaux :** pressions moyennes par volume (`pressures.csv`), paramètres des ajustements (`eos_fits.json`) et, si Matplotlib est installé, graphique pression–volume (`pressure_volume.png`). L'ajustement nécessite plusieurs volumes pertinents et des pressions suffisamment équilibrées.

### WF3 — Intégration future

WF3 est **en cours de conception et n'est pas inclus** dans cette version. L'objectif est d'associer échantillonnage AIMD, relaxation, détermination du volume d'équilibre et calculs sur différentes phases ou conditions thermodynamiques, pour produire des jeux de données destinés notamment à la caractérisation des matériaux et à l'entraînement de potentiels MLIP.

## Organisation et exemples

Le code réutilisable se trouve dans `src/diamond_aiida_vasp/`, séparé des données et fichiers de configuration fournis dans `examples/`.

| Élément | Contenu |
| --- | --- |
| `examples/config/wf1.yml` | Paramètres de sélection, relaxation et analyse pour WF1 |
| `examples/config/wf2.yml` | Températures, volumes et paramètres AIMD pour WF2 |
| `examples/cluster/` | Modèles YAML pour les ordinateurs et codes AiiDA |
| `examples/data/wf1/` | Court exemple de trajectoire `XDATCAR` |
| `examples/data/wf2/` | Structures `POSCAR` d'exemple à plusieurs températures |

Les exemples servent à découvrir l'interface et à vérifier le fonctionnement des étapes de préparation : **ils ne constituent pas, à eux seuls, un jeu de données validé pour une étude scientifique**. Les sorties des calculs sont conservées séparément, généralement dans `runs/` et `results/`.

## Conditions d'utilisation et limites

- **VASP et ses fichiers de pseudopotentiels PAW/POTCAR ne sont pas distribués** avec ce projet. Chaque utilisateur doit disposer des droits d'accès correspondants et installer ces éléments conformément à sa licence.
- Les fichiers YAML des clusters sont des **modèles à adapter** : système de files d'attente, chemins, modules logiciels, exécutable VASP et ressources ne sont pas universels. **La plateforme DIAMOND peut accompagner cette adaptation** à l'environnement de l'utilisateur.
- Les modules WF1 et WF2 sont utilisables séparément. Leur enchaînement automatique et la gestion autonome des échecs ne font pas encore partie de cette version.
- Un calcul réel nécessite un profil AiiDA fonctionnel, un code VASP configuré et des données POTCAR enregistrées. Les résultats doivent être contrôlés (convergence, représentativité des trajectoires, choix des volumes et qualité des ajustements).

Pour préparer votre environnement et lancer un premier exemple, consultez la page **Installation**.

## Référence scientifique

La méthodologie est présentée dans Bissuel *et al.*, [*Reproducible Container Solutions for Codes and Workflows in Materials Science*](https://arxiv.org/abs/2512.13826v1) (prépublication arXiv:2512.13826v1 ; [article publié, DOI:10.1002/adem.202503185](https://doi.org/10.1002/adem.202503185)).
