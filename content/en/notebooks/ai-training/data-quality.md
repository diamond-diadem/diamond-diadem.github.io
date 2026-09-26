---
title: "Data quality: missing data and outliers"
linkTitle: Data quality
weight: 2
toc: true
description: "Profile a materials dataset, assign a treatment to each variable, detect outliers with box plots and Z-scores, and export a processed CSV."
---

<div align="justify">

First step: check the quality of the starting dataset.

</div>

## Missing data and outliers

Notebook: `preprocessing.ipynb`

<div align="justify">

This notebook helps you spot data quality problems before analysis or modelling.

</div>

<img alt="Box plots of the initial variables, showing the quantile ranges and the points flagged as outliers for each variable" src="/images/notebooks/ai-training/outliers-boxplots.png" />

Steps:

1. Profile the dataset: dimensions, empty columns, columns with missing values and their percentage, duplicates, type and number of distinct values of each column.
2. Assign a treatment to each variable (numeric, categorical, identifier, target, or dropped from the dataset, for example if it is too incomplete), and choose whether or not to drop duplicated rows.
3. Detect outliers with box plots (bounds at 1.5 times the interquartile range) and with the Z-score: an adjustable threshold shows, on two variables of your choice, the flagged points and the list of rows concerned.
4. Export a processed CSV, deciding at that point whether or not to drop the outlier rows. Nothing is dropped before then.

{{< callout context="caution" title="Outliers are not necessarily errors" icon="tabler-icons/outline/alert-triangle" >}}

An outlier is not necessarily an error: it may be a genuine measurement. Look at the flagged rows before deciding to remove them.

{{< /callout >}}

{{< link-card title="GitLab: AI Training" description="Access the notebooks and instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
