---
title: "Explorer et comprendre les données"
linkTitle: Explorer et comprendre
weight: 3
toc: true
description: "Exploration non supervisée d'un jeu de données matériaux : corrélations, analyse en composantes principales et clustering (K-Means, DBSCAN)."
---

<div align="justify">

Se faire une première idée de la structure des données, sans chercher à prédire une cible.

</div>

## Explorer et regrouper les données

Notebook : `analysis.ipynb`

<div align="justify">

Une introduction à quelques méthodes non supervisées : corrélations, réduction de dimension et clustering.

</div>

Étapes :

1. Profiler le jeu de données.
2. Calculer les corrélations et les lire sur la carte de chaleur.
3. Réduire la dimension avec une analyse en composantes principales (ACP) : suivre la variance expliquée cumulée et choisir le nombre de composantes selon un seuil, par exemple 90 ou 95 %.
4. Essayer une méthode de clustering (K-Means, agglomératif ou DBSCAN) et ajuster ses hyperparamètres.
5. Projeter les groupes, comparer leurs centres, puis exporter les données avec une colonne d'identifiant de cluster.

<img alt="Carte de chaleur des corrélations de Pearson entre les variables du jeu de données" src="/images/notebooks/ai-training/correlation-heatmap.png" />

<img alt="Clusters obtenus avec K-Means, projetés sur les deux premières composantes principales" src="/images/notebooks/ai-training/clustering-pca.png" />

**Exemple.** Remarquer que deux variables fortement corrélées portent presque la même information, puis vérifier avec l'ACP si quelques composantes suffisent à représenter le jeu de données.

{{< callout context="note" title="Les clusters dépendent de la méthode" icon="tabler-icons/outline/info-circle" >}}

Les clusters dépendent de la méthode et de ses réglages : comparez plusieurs méthodes plutôt que de considérer un résultat comme définitif.

{{< /callout >}}

{{< link-card title="GitLab : Formation IA" description="Accéder aux notebooks et aux instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
