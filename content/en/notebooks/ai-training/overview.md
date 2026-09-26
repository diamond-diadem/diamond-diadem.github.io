---
title: "Getting started with the AI notebooks for materials science"
linkTitle: Overview
weight: 1
toc: true
aliases:
  - /documentation/by-session/diamond-ga-2026/
description: "Educational notebooks to discover, step by step, how to apply AI methods to materials data, from data quality to Bayesian optimisation."
---

<div align="justify">

These notebooks are training material (version 1.0). They illustrate a practical workflow, from understanding experimental data to building predictive models and exploring more advanced approaches. They are designed as a starting point that can be adapted to your own materials data. Results depend on the quality and size of the dataset, and the choices presented are guidelines rather than universal rules.

Most notebooks include the explanations and instructions needed to understand and run the proposed workflow. You can follow them as a complete learning path, or open a specific notebook directly when you are interested in a particular step or method.

</div>

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

To complete this tutorial, you will need one of the following:

- **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- **OR** have **Docker** installed
- **OR** have **Python 3.10+** installed with **uv** and **Graphviz** (more information on how to install them is provided in the tutorial).

{{< /callout >}}

## The overall workflow

<div align="justify">

The overall workflow is illustrated below. The first steps focus on data quality and understanding; the later branches introduce prediction, model reuse, causal discovery and Bayesian optimisation. Blue boxes are the steps of the workflow and yellow boxes are the applications. The diagram also shows an optional data augmentation step, which is not covered in this guide.

</div>

<img alt="Overall workflow of the materials AI notebooks, from the dataset to profiling, preprocessing, and then analysis, prediction, causal discovery and Bayesian optimisation" src="/images/notebooks/ai-training/workflow-overview.png" />

## A possible learning path

1. **Profile** the data to understand its characteristics and identify possible quality issues.
2. **Preprocess** the data by identifying missing values, duplicates and outliers, then export a processed dataset.
3. **Analyse** the structure of the data, or **predict** a material property with a model.
4. **Go further** with the CdSe nanocrystal case: model exploration, causal discovery and optimisation of experiments.

<div align="justify">

The notebooks can be followed in this order, but they are also designed to be useful independently. You can jump directly to the notebook that matches the question you want to investigate. The index notebook (`notebooks/index.ipynb`) links to the main notebooks.

</div>

- [Data quality](/en/notebooks/ai-training/data-quality/): missing data and outliers
- [Exploring and understanding](/en/notebooks/ai-training/exploration/): correlations, dimensionality reduction and clustering
- [Predicting a property](/en/notebooks/ai-training/prediction/): regression models, XGBoost and pre-trained models
- [Applications: CdSe nanocrystals](/en/notebooks/ai-training/cdse-nanocrystals/): model exploration, causal discovery and Bayesian optimisation

## About this training session

<div align="justify">

This training session was organized ahead of the DIAMOND 2026 general meeting in Lyon.

The training program was developed by Ahmed AMRANI and co-supervised by Ahmed AMRANI, Jean-Philippe POLI and Léo ORVEILLON.

The full content, along with instructions on how to run it, is available in the tutorial's repository: link below.

</div>

{{< link-card title="GitLab: AI Training" description="Access the notebooks and instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
