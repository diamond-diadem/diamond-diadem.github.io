---
title: "Predicting a material property"
linkTitle: Predicting a property
weight: 4
toc: true
description: "Build and compare regression models (XGBoost, decision tree, SVR, Ridge, Lasso), take a closer look at XGBoost, and reuse a pre-trained model on new data."
---

<div align="justify">

Relating a target variable to explanatory variables, or reusing an already saved model.

</div>

## Build and compare regression models

Notebook: `modeling_all.ipynb`

<div align="justify">

A guide to predicting a continuous variable with several algorithms and comparing their results. Each algorithm comes with hints on when to consider it.

</div>

<img alt="Comparison of regression models: predicted versus actual scatter plot and distribution of the absolute errors for XGBoost, decision tree, SVR, Ridge and Lasso" src="/images/notebooks/ai-training/regression-models-comparison.png" />

Steps:

1. Load the data, assign the roles and choose the target.
2. Split a training set and a test set.
3. Choose algorithms according to the nature of the data: XGBoost, decision tree, SVR, Ridge, Lasso. Adjust their hyperparameters.
4. Evaluate with MAE, MSE, RMSE, R² and MAPE, and read the predicted-versus-actual scatter plot and the error distribution.
5. Export the selected models.

**Example.** On a dataset where the relationship looks linear and the variables are correlated, compare Ridge or Lasso with XGBoost. The export can be named by version and dataset, such as `models_V01_metallic_glass`.

{{< callout context="note" title="Model choice stays empirical" icon="tabler-icons/outline/info-circle" >}}

Choosing a model remains an empirical comparison: the hints given are guidelines.

{{< /callout >}}

## Take a closer look at XGBoost

Notebook: `modeling_xgboost.ipynb`

<div align="justify">

A closer look at XGBoost, which builds trees in sequence, each one correcting the errors of the previous ones, to understand the effect of its settings.

</div>

<img alt="XGBoost permutation feature importance, ranked from the most to the least important feature with its standard deviation" src="/images/notebooks/ai-training/xgboost-feature-importance.png" />

Steps:

1. Configure the dataset and the training/test split.
2. Set the hyperparameters: number of trees (typically 100 to 500), learning rate (0.1 to 0.3), maximum depth (3 to 10).
3. Train and evaluate on the training and test data.
4. Look at feature importance (weight, gain, cover, permutation) and at a few individual trees.
5. Run a grid search and compare with the default model.
6. Export the model.

**Example.** Compare the metrics of the default model and the optimised model to judge whether the grid search brings a noticeable gain on your dataset.

{{< callout context="caution" title="Platform limitation" icon="tabler-icons/outline/alert-triangle" >}}

XGBoost grid search is not supported on Windows in local mode.

{{< /callout >}}

## Use a pre-trained model

Notebook: `modeling_prediction.ipynb`

<div align="justify">

Shows how to reuse a model saved in `.pkl` format on new data, without retraining.

</div>

Steps:

1. Load the model (`.pkl`).
2. Load a dataset that provides the same input variables as the model.
3. Run the prediction and examine the plot of predicted values.
4. If the dataset contains the target, compare predictions and actual values with the regression metrics.
5. Save the dataset with the predictions column.

**Example.** Apply a model exported from a modelling notebook to a new batch of samples, checking that its input variables match.

{{< link-card title="GitLab: AI Training" description="Access the notebooks and instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
