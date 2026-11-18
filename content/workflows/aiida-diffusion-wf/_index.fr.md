---
title: "MOFLearning AiiDA+LAMMPS"
weight: 4
summary: "Simulations de dynamique moléculaire de la diffusion de gaz dans les MOFs avec AiiDA et LAMMPS"
description: "Description du workflow AiiDA de simulation de diffusion atomique par dynamique moléculaire pour l'étude de la mobilité des défauts dans les matériaux."
tablerIcon: tabler-icons/outline/arrows-shuffle
aliases:
  - /workflows/aiida-diffusion-wf/description/
---

Ce package est une bibliothèque de workflows basés sur AiiDA (via le plugin [`aiida-lammps`](https://github.com/aiidaplugins/aiida-lammps)) qui réalise des simulations de Dynamique Moléculaire (MD) avec des champs de force classiques afin d’étudier la diffusion d’un gaz dans les matériaux poreux cristallins tels que les réseaux métallo-organiques (MOFs).

Il inclut les workflows suivants, avec différents degrés de reproductibilité :

- utilisation d’un **calcul RAW** : toutes les étapes sont contenues dans un fichier modèle (template) pour LAMMPS. Cela correspond à un seul nœud dans le graphe de provenance d'AiiDA.
- utilisation d’un **WorkChain** : à chaque étape du workflow, un fichier modèle LAMMPS différent est utilisé. Cela donnera lieu à un nœud de calcul par étape (par exemple : étape d'équilibration en Monte Carlo, étape d'équilibration en MD puis étape de production en MD).

Les cas d’exemple possibles sont :

1. MD d’un gaz simple dans un MOF rigide à dilution infinie : des templates spécifiques sont fournies pour les gaz monoatomiques **xénon** et **krypton** avec des paramètres de Lennard-Jones issus du champ de force UFF.

2. MD d’un gaz de **dioxyde de carbone** dans un MOF rigide à dilution infinie. La version actuelle du template inclut seulement les interactions à courte portée avec le potentiel de Lennard-Jones.

{{< figure src="images/movie_diffusion_krypton_DOTSOV_480p.gif" alt="Diffusion d’un gaz de krypton dans CuBTC" caption="Diffusion d’un gaz de krypton dans CuBTC." >}}
