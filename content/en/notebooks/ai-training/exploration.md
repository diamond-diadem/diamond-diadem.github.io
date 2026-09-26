---
title: "Exploring and understanding the data"
linkTitle: Exploring and understanding
weight: 3
toc: true
description: "Unsupervised exploration of a materials dataset: correlations, principal component analysis and clustering with K-Means, agglomerative clustering or DBSCAN."
---

<div align="justify">

Getting a first idea of the structure of the data, without trying to predict a target.

</div>

## Explore and group the data

Notebook: `analysis.ipynb`

<div align="justify">

An introduction to a few unsupervised methods: correlations, dimensionality reduction and clustering.

</div>

Steps:

1. Profile the dataset.
2. Compute the correlations and read them on the heatmap.
3. Reduce the dimension with a principal component analysis (PCA): follow the cumulative explained variance and choose the number of components according to a threshold, for example 90 or 95%.
4. Try a clustering method (K-Means, agglomerative or DBSCAN) and adjust its hyperparameters.
5. Project the groups, compare their centres, then export the data with a cluster identifier column.

<img alt="Pearson correlation heatmap between the features of the dataset" src="/images/notebooks/ai-training/correlation-heatmap.png" />

<img alt="Clusters obtained with K-Means, projected on the first two principal components" src="/images/notebooks/ai-training/clustering-pca.png" />

**Example.** Notice that two strongly correlated variables carry almost the same information, then check with PCA whether a few components are enough to represent the dataset.

{{< callout context="note" title="Clusters depend on the method" icon="tabler-icons/outline/info-circle" >}}

Clusters depend on the method and its settings: compare several methods rather than treating one result as final.

{{< /callout >}}

{{< link-card title="GitLab: AI Training" description="Access the notebooks and instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
