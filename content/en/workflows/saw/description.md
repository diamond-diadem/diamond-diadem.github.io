---
title: Simple Adsorption Workflow Description
linkTitle: Description
toc: false
---

This workflow measures adsorption properties in porous media.

<p align="center">
<img alt="saw diagram" class="saw-diagram-description" style="width:100%">
</p>
<p align="center"><i>Workflow diagram.</i></p>

It enables quick GCMC (Grand Canonical Monte Carlo) calculations to obtain the adsorbed quantity of a gas as a function of parameters like temperature or gas pressure. A post-processing step allows for the generation of adsorption isotherms. It also calculates porosity properties, such as the specific surface area of a porous material.

This workflow uses two main codes widely employed in the field:

- [RASPA](https://iraspa.org/raspa/) for adsorption calculations
- [Zeo++](https://www.zeoplusplus.org/) for porosity properties

The goal of the workflow is to make these calculations accessible to non-experts in molecular simulation. On one hand, the code is fully containerized, making it easy to install—just install `Apptainer` and load the `.sif` image. On the other hand, it enables the creation of a reproducible and easily updatable database.

Four actions are possible:

- **input**: create an input file using the integrated user interface
- **run**: launch the simulations
- **merge**: combine the results of multiple independent experiments into a single database
- **plot**: plot adsorption isotherms using the integrated user interface

The available materials are sourced from the [CoRE MOF 2019](https://doi.org/10.1021/acs.jced.9b00835) database, a structural database of MOFs (Metal-Organic Frameworks). However, advanced users can use structures in CIF format, provided they undergo a curation step.
