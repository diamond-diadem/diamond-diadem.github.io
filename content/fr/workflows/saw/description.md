---
title: Description
toc: false
---

Ce workflow mesure des propriétés d'adsorption dans les milieux poreux.

<p align="center">
<img alt="saw diagram" class="saw-diagram-description" style="width:100%">
</p>
<p align="center"><i>Diagramme du workflow. </i></p>

Il permet de lancer rapidement des calculs GCMC (Monte Carlo dans l'ensemble Grand Canonique) et obtenir la quantité adsorbé d'un gaz en fonction de paramètres comme la température ou la pression du gaz. Une étape de post-traitement permet de remonter aux isothermes d'adsorption. Il calcule également les propriétés de porosité, comme la surface spécifique d'un matériau poreux.

Ce workflow utilise deux codes principaux très utilisés dans le domaine:

- [RASPA](https://iraspa.org/raspa/) pour les calculs d'adsorption
- [Zeo++](https://www.zeoplusplus.org/) pour les propriétés de porosité

L'idée du workflow est de rendre ces calculs accessibles à une personne non-experte en simulation moléculaire. D'une part, le code est totalement conteneurisé, il est donc facile à installer, il suffit d'installer d'`Apptainer` et d'installer l'image `.sif`. D'autre part, il permet de constituer une base de donnée reproductible et pouvant être mis à jour facilement.

4 actions sont possibles :

- **input** : créer un fichier d'entrée à l'aide de l'interface utilisateur intégrée
- **run** : lancer les simulations
- **merge** : regrouper dans une seule base de données le résultat de plusieurs expériences indépendantes
- **plot** : tracer les isothermes d'adsorption en utilisant l'interface utilisateur intégrée

Les matériaux disponibles proviennent de la base de donnée [CoRE MOF 2019](https://doi.org/10.1021/acs.jced.9b00835), une base de donnée structurelle de MOFs (réseaux organo-métalliques). Cependant l'utilisateur avancé peut utiliser des structures au format CIF, sous réserve d'une étape de curation.
