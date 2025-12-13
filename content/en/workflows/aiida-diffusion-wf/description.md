---
title: MOFLearning AIIDA+LAMMPS Description
linkTitle: Description
toc: false
---

This package is a library of workflows based on Aiida (through the [`aiida-lammps`](https://github.com/aiidaplugins/aiida-lammps) plugin) that performs Molecular Dynamics (MD) simulations with classical Force Fields in order to study the diffusion of a gas in crystalline porous materials like Metal Organic frameworks (MOFs).

It includes the following workflows with different degree of reproducibility :

- use a **RAW calculation** : all stages are contained in a template file for LAMMPS. It will result into one single calculation node.
- use a **WorkChain** : at each stage of the workflow, a different LAMMPS template file is used. It will result into one calculation node per stage (e.g. Monte Carlo steps, equilibration MD steps, production MD steps).

The possible example cases are :

1. MD of a simple gas in a rigid MOF at infinite dilution : **Xenon** and **Krypton** monoatomic gases and Lennard-Jones parameters from UFF.

2. MD of a **carbon dioxide** gas in a rigid MOF at infinite dilution. Only short-range interaction with Lennard-Jones potentials can be used in the current templates.

<p align="center">
<img alt="diffusion gif" class="diffusion-kr-in-cubtc" style="width:100%">
</p>
<p align="center"><i>Diffusion of a Krypton gas in CuBTC.</i></p>
