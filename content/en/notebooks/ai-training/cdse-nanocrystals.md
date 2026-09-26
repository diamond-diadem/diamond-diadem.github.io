---
title: "Applications: CdSe nanocrystals"
linkTitle: Applications - CdSe nanocrystals
weight: 5
toc: true
description: "Advanced approaches on CdSe nanocrystal synthesis data: predicting optical properties, causal discovery with the PC algorithm and Bayesian optimisation."
---

<div align="justify">

Notebooks that illustrate more advanced approaches on a concrete case. They are examples of an approach, to be transposed to your own systems. Retraining the models is possible but optional, and is described at the end of this page.

**The data.** Each sample links synthesis parameters to an optical response.

</div>

- **Inputs:** `T_external` (external temperature), `Cd_mM` and `Se_mM` (precursor concentrations), `OA_Cd_ratio` (ligand-to-metal ratio), `T_reactor` (growth temperature), `t_s` (reaction time).
- **Outputs:** `Peak_nm` (emission peak, related to the average size), `FWHM_nm` (spectral width, related to uniformity) and `height` (intensity).

## Explore the learned model

Notebook: `Use_Learned_Model.ipynb`

<div align="justify">

Loads pre-trained models and offers an interface to explore their predictions.

</div>

{{< video-file src="/videos/Tuto_IA_Use_Learned_Model_In_MS.mp4" >}}

Steps:

1. Load the data and the two models (random forest, Gaussian process with its normalisations).
2. Choose the model in the menu.
3. Set the six synthesis parameters with the sliders or the numeric boxes.
4. Read the predicted peak, width and intensity, as well as the spectrum reconstructed as a Gaussian curve.

**Example.** Fix a combination of parameters, predict with the random forest and then with the Gaussian process, and compare the two spectra.

<img alt="Prediction and simulation: synthesis parameter sliders and the resulting predicted CdSe photoluminescence spectrum, with its peak, width, height, estimated size class and uniformity" src="/images/notebooks/ai-training/cdse-spectrum-prediction.png" />

## Discover causal relationships

Notebook: `Causal_Discovery_Force.ipynb`

<div align="justify">

A demonstration of causal discovery with the PC (Peter–Clark) algorithm, from observational data.

</div>

{{< video-file src="/videos/Tuto_IA_Causal_Discovery_In_MS.mp4" >}}

<img alt="Causal graph discovered in the CdSe data: the six synthesis parameters and the edges linking them to the peak, width and height of the emission" src="/images/notebooks/ai-training/causal-discovery-graph.png" />

Steps:

1. Load the data (`CdSe_PL.csv` by default).
2. Label the variables: inputs, targets or ignored. If you do nothing, the default inputs are the six synthesis parameters and the outputs are the peak, the width and the intensity.
3. Subsample the dataset, with a fixed seed for reproducibility.
4. Set your prior knowledge: a property cannot influence a synthesis parameter, the parameters are assumed independent of each other, and the properties do not influence one another.
5. Choose the independence test, Fisher Z (linear) or KCI (nonlinear), and run the algorithm with a 0.05 threshold.
6. Read the graph: the thickness of an edge follows its strength, its colour follows its significance, with the p-value of each link.

**Example.** Compare the graphs obtained with Fisher Z and with KCI to see which links depend on the linearity assumption.

{{< callout context="caution" title="A graph is a hypothesis" icon="tabler-icons/outline/alert-triangle" >}}

A graph obtained from observational data is a hypothesis to be checked against domain knowledge, not proof of causality.

{{< /callout >}}

## Optimise experiments with Bayesian optimisation

Notebook: `Bayesian_Optimization_interactive_short.ipynb`

<div align="justify">

Illustrates the principle of Bayesian optimisation: a Gaussian process proposes the next conditions to test and updates itself with the measurements. It lends itself to teaching as well as to experimentation.

</div>

{{< video-file src="/videos/Tuto_IA_Bayesian_Optimization_in_MS_V2.mp4" >}}

<img alt="Gaussian process prediction over two synthesis parameters, with the predicted mean as a colour map, the uncertainty as dashed contour lines, the training points and the current slider point" src="/images/notebooks/ai-training/bayesian-optimization-uncertainty.png" />

Steps:

1. Choose a CSV file, then select the input variables and the target.
2. Set, with the sliders, the bounds of each variable: the proposals stay within them.
3. Train the Gaussian process and examine its predictions with the ±1σ uncertainty band.
4. Choose the objective (maximise, minimise or reach a value) and adjust the trade-off between exploration and exploitation.
5. Request a point, enter the measurement obtained, validate, then repeat.
6. Follow the history and the convergence curve.

## Optional: retrain the models

Notebook: `Learn_Models_RF_GP.ipynb`

<div align="justify">

_Explore the learned model_ uses models that have already been trained. If you want to understand how they are built, or rebuild them, this notebook trains a multi-output random forest and a Gaussian process with a Matérn kernel on the CdSe data, then saves the models with their normalisations. It is not required to follow the rest.

</div>

{{< link-card title="GitLab: AI Training" description="Access the notebooks and instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
