---
title: MOFLearning AIIDA+LAMMPS Description
linkTitle: Description
toc: false
---

Ce package est une bibliothèque de workflows basés sur AiiDA (via le plugin [`aiida-lammps`](https://github.com/aiidaplugins/aiida-lammps)) qui réalise des simulations de Dynamique Moléculaire (MD) avec des champs de force classiques afin d’étudier la diffusion d’un gaz dans les matériaux poreux cristallins tels que les réseaux métallo-organiques (MOFs).

Il inclut les workflows suivants, avec différents degrés de reproductibilité :
- utilisation d’un **calcul RAW** : toutes les étapes sont contenues dans un fichier modèle (template) pour LAMMPS. Cela correspond à une seul noeud dans le graphe de provenance de Aiida.
- utilisation d’un **WorkChain** : à chaque étape du workflow, un fichier modèle LAMMPS différent est utilisé. Cela donnera lieu à un nœud de calcul par étape (par exemple : étape d'équilibration en Monte Carlo, étape d'équilibration en MD puis étape de production en MD).

Les cas d’exemple possibles sont :

1) MD d’un gaz simple dans un MOF rigide à dilution infinie : des templates spéficiques sont fournies pour les gaz monoatomiques **xénon** et **krypton** avec des paramètres de Lennard-Jones issus du champ de force UFF.

2) MD d’un gaz de **dioxyde de carbone** dans un MOF rigide à dilution infinie. La version actuelle du template incut seulement les interactions à courte portée avec le potentiel de Lennard-Jones.

<p align="center">
<img alt="diffusion gif" class="diffusion-kr-in-cubtc" style="width:100%">
</p>
<p align="center"><i>Diffusion d’un gaz de krypton dans CuBTC.</i></p>
