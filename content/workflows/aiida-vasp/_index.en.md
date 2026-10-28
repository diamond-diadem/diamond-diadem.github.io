---
title: "AiiDA-VASP"
weight: 5
summary: "Automated ab initio molecular dynamics with VASP, AiiDA and OVITO"
description: "Overview of the WF1 and WF2 ab initio molecular dynamics workflows using VASP, AiiDA and OVITO, with their inputs and outputs."
tablerIcon: tabler-icons/outline/atom
toc: false
draft: false
cascade:
  draft: false
aliases:
  - /workflows/aiida-vasp/description/
---

## Overview

This project brings together Python tools to automate selected steps of **ab initio molecular dynamics (AIMD) with VASP**, using [AiiDA](https://www.aiida.net/) and the [`aiida-vasp`](https://github.com/aiida-vasp/aiida-vasp) plugin. It was developed within **DIAMOND** to simplify calculation preparation, submission to computing facilities, and reproducible analysis of the results.

The current version provides two complementary modules: **WF1**, which extracts inherent structures from a liquid, and **WF2**, which estimates the equilibrium volume from fixed-volume simulations. A third module, **WF3**, is planned to combine these steps into a data-generation pipeline for machine-learning interatomic potentials (MLIPs).

VASP calculations are tracked by **AiiDA**, while some structural analyses use the free Python API of **OVITO Basic**. Parameters are organized in YAML files so that they can be adapted to a local computer or an HPC cluster.

<p align="center">
<img alt="Schematic of the available AiiDA-VASP workflows" src="/images/workflows/aiida-vasp/wf-aiida-vasp.png" />
</p>
<p align="center"><i>Overview of the available AiiDA-VASP workflows.</i></p>


## Available modules

### WF1 — Inherent-structure extraction

**Input:** a VASP trajectory in `XDATCAR` format.

WF1 selects configurations at regular intervals, optionally excluding the initial frames corresponding to thermalization. Each selected configuration is then submitted for **fixed-cell atomic relaxation** through AiiDA's `vasp.relax` WorkChain. The relaxed structures represent local minima of the potential energy associated with the sampled configurations.

A post-processing step also makes it possible to:

- calculate radial distribution functions (RDFs) from the input trajectory;
- estimate species-pair cutoff radii from the RDFs;
- perform **common-neighbor analysis** (CNA) on the relaxed structures using OVITO.

**Main outputs:** relaxed structures in `POSCAR` format, an RDF table (`rdf.csv`), cutoff radii (`pair_cutoffs.json`), and CNA statistics (`cna.csv`). Automatically determined cutoffs should be checked before any scientific interpretation.

### WF2 — Equilibrium-volume estimation

**Input:** one or more structures named `POSCAR_<temperature>` (with the temperature in kelvin, for example `POSCAR_650`).

For each temperature, WF2 generates several structures with **different volumes**, then submits **NVT** AIMD simulations using `vasp.vasp`. It calculates the average pressure over the final part of each trajectory by reading the `OUTCAR` files, then fits the pressure–volume relationship using the **third-order Birch–Murnaghan equation of state**.

The estimated equilibrium volume is the volume at which the fitted pressure becomes zero. This approach avoids systematically running a long NPT simulation when an initial estimate of the equilibrium volume is needed.

**Main outputs:** average pressures for each volume (`pressures.csv`), fitting parameters (`eos_fits.json`), and, if Matplotlib is installed, a pressure–volume plot (`pressure_volume.png`). The fit requires several appropriately chosen volumes and sufficiently equilibrated pressure data.

### WF3 — Future integration

WF3 is **under development and is not included** in this version. The aim is to combine AIMD sampling, relaxation, equilibrium-volume determination, and calculations across different phases or thermodynamic conditions to produce datasets for materials characterization and, in particular, MLIP training.

## Project structure and examples

Reusable code is located in `src/diamond_aiida_vasp/`, separately from the sample data and configuration files provided in `examples/`.

| Item | Contents |
| --- | --- |
| `examples/config/wf1.yml` | Configuration selection, relaxation, and analysis parameters for WF1 |
| `examples/config/wf2.yml` | Temperatures, volumes, and AIMD parameters for WF2 |
| `examples/cluster/` | Example YAML configurations for AiiDA computers and codes |
| `examples/data/wf1/` | Short example `XDATCAR` trajectory |
| `examples/data/wf2/` | Example `POSCAR` structures at different temperatures |

These examples are intended to introduce the interface and check the preparation steps: **they do not, on their own, constitute a scientifically validated dataset**. Calculation outputs are stored separately, generally in `runs/` and `results/`.

## Requirements and limitations

- **VASP and its PAW/POTCAR pseudopotential files are not distributed** with this project. Users must have the appropriate access rights and install these components in accordance with their licenses.
- Cluster YAML files are **templates that must be adapted**: scheduler, paths, software modules, VASP executable, and computing resources vary between systems. **The DIAMOND platform can assist users** in adapting these files to their environment.
- WF1 and WF2 can be used independently. Automatic chaining of the two modules and autonomous recovery from failed calculations are not yet part of this version.
- Running actual calculations requires a working AiiDA profile, a configured VASP code, and registered POTCAR data. Results must be checked for convergence, trajectory representativeness, volume selection, and fit quality.

To set up your environment and run a first example, see the **Installation** page.

## Scientific reference

The methodology is presented in Bissuel *et al.*, [*Reproducible Container Solutions for Codes and Workflows in Materials Science*](https://arxiv.org/abs/2512.13826v1) (arXiv preprint: 2512.13826v1; [published article, DOI:10.1002/adem.202503185](https://doi.org/10.1002/adem.202503185)).
