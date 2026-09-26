---
title: "Qualité des données : données manquantes et valeurs aberrantes"
linkTitle: Qualité des données
weight: 2
toc: true
description: "Profiler un jeu de données matériaux, détecter les valeurs aberrantes par boîtes à moustaches et Z-score, puis exporter un CSV traité."
---

<div align="justify">

Première étape : vérifier la qualité du jeu de données de départ.

</div>

## Données manquantes et valeurs aberrantes

Notebook : `preprocessing.ipynb`

<div align="justify">

Ce notebook aide à repérer les problèmes de qualité des données avant toute analyse ou modélisation.

</div>

<img alt="Boîtes à moustaches des variables initiales, montrant les quantiles et les points signalés comme aberrants pour chaque variable" src="/images/notebooks/ai-training/outliers-boxplots.png" />

Étapes :

1. Profiler le jeu de données : dimensions, colonnes vides, colonnes comportant des valeurs manquantes et leur pourcentage, doublons, type et nombre de valeurs distinctes de chaque colonne.
2. Attribuer un traitement à chaque variable (numérique, catégorielle, identifiant, cible, ou retirée du jeu de données, par exemple si elle est trop incomplète), et choisir de supprimer ou non les lignes dupliquées.
3. Détecter les valeurs aberrantes avec des boîtes à moustaches (bornes à 1,5 fois l'écart interquartile) et avec le Z-score : un seuil ajustable affiche, sur deux variables de votre choix, les points signalés et la liste des lignes concernées.
4. Exporter un CSV traité, en décidant à ce moment-là de supprimer ou non les lignes aberrantes. Rien n'est supprimé avant cette étape.

{{< callout context="caution" title="Une valeur aberrante n'est pas forcément une erreur" icon="tabler-icons/outline/alert-triangle" >}}

Une valeur aberrante n'est pas nécessairement une erreur : il peut s'agir d'une mesure réelle. Examinez les lignes signalées avant de décider de les retirer.

{{< /callout >}}

{{< link-card title="GitLab : Formation IA" description="Accéder aux notebooks et aux instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
