---
title: How to use RASPA2 Apptainer image?
linkTitle: RASPA2 tutorial
weight: 1
description: "Tutorial on using the DIAMOND RASPA2 Apptainer container: pulling the image and usage examples for MD computation with MC."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **raspa2.sif** image [available here](/en/codes/scientific-computing/raspa2/)
- Have downloaded the **input files** [available here](/downloads/raspa2-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a RASPA2 input file is available in the form of an archive via [this link](/downloads/raspa2-tutorial-inputs.tar.gz). This file is named `MC_methane.input` and corresponds to a tutorial example from the RASPA2 [manual](https://iraspa.org/raspa/).

In this tutorial, we will assume that the input file contained in this archive is in the current directory. To extract it:

```bash
tar -xzf raspa2-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a RASPA2 computation in the case where the current directory contains the `raspa2.sif` container image and the `MC_methane.input` input file:

```bash
apptainer exec raspa2.sif simulate -i MC_methane.input -d /
```

## Detailed usage for the RASPA2 container

This section explains how to use the RASPA2 image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

RASPA2 is an advanced software package designed for the simulation of adsorption and diffusion in porous materials. It employs Monte Carlo and molecular dynamics methods to explore thermodynamic and transport properties under various conditions.

The main executable in the image is the `simulate` executable. The software version can be displayed with the following command:

```shell
apptainer exec raspa2.sif simulate -v
```

The code license can be accessed from outside the container as follows:

```bash
raspa_path=$(apptainer exec raspa2.sif ls /gnu/store | grep raspa)
apptainer exec raspa2.sif cat /gnu/store/$raspa_path/share/doc/raspa2-2.0.48/LICENSE
```

The input file `MC_methane.input` corresponds to the first basic example of the RASPA2 [manual](https://iraspa.org/raspa/) titled *Example 1: Monte Carlo of methane in a box*, presented as:

> A Monte Carlo run of 100 methane molecules in a 30 × 30 × 30 Å box. 

The input file has been extracted from the software [repository](https://github.com/iRASPA/RASPA2/tree/master/examples/Basic/1_MC_Methane_in_Box), under *examples/Basic/1_MC_Methane_in_Box/simulation.input*. 

### Running the simulation

The following command runs the simulation using the RASPA2 container image and may take a few seconds to complete:

```shell
apptainer exec raspa2.sif simulate -i MC_methane.input -d /
```

In order to run the previous simulation, the software needs to have access to some additional files, namely:

- `pseudo_atoms.def`: contains pseudo-potentials for various atomic and molecular species,
- `force_field_mixing_rules.def` : defines interaction parameters and mixing rules for the force field,
- `methane.def` : defines the molecular properties of methane.

Those files are stored in the container image, under the `/share/raspa/forcefield/ExampleMoleculeForceField` path for the first two files and under the `/share/raspa/molecules/ExampleDefinitions` for the last one. As a generalizable example, the following command copies `methane.def` in the current directory:

```shell
apptainer exec raspa2.sif cp /share/raspa/forcefield/ExampleMoleculeForceField/methane.def ./
```

The `-d` option in the `simulate` command is used to set the path to RASPA2 directory containing the previous files. The software then automatically looks for the needed files in `/share/raspa`. When this option is not provided, the software looks for the needed file in the current directory. This can be useful when working with custom pseudo-potentials, force fields or molecule properties.

The simulation produces four different folder: *Movies*, *Output*, *Restart* and *VTK*.

### Visualizing the simulation movies with VMD software

VMD software can be used to visualize the movies produced by the simulation. The VMD [container image of the Diamond project](/en/codes/visualisation/vmd/) can be used for this purpose. 

The following command opens the visualization software graphical user interface (GUI):

```shell
apptainer exec vmd.sif vmd
```

The `.pdb` movies in the *Movies/System_0* can be opened from the GUI with the *File/New molecule/Browse* button, then loaded with the *Load* button. The names of the files embed the external temperature (here $300~K$) as well as the pressure ($0~Pa$ here) set by the simulation.

Once the chosen file is loaded in VMD GUI, a simple representation can be created from the *Graphics/Representations* menu by selecting *VDW* for the *Drawing Method* and *Name* for the *Coloring Method*, as shown below.

<img alt="Screenshot of the representation settings on VMD GUI" src="/images/tutorials/raspa2-tutorial/vmd_representation_settings.png" />

Once applied, the movie can be run with the black arrow button in the lower-right corner of VMD main interface. As an example, the following screenshot shows a frame from the `Movie_Box_1.1.1_300.000000_0.000000_allcomponents.pdb` movie.

<img alt="Screenshot of a movie frame" src="/images/tutorials/raspa2-tutorial/vmd_movie_frame.png" />

### Analyzing simulation results

The output of the simulation is written in the *Output/System_0/output_Box_1.1.1_300.000000_0.data* text file. One key information contained in this file is the energy-drift status:

```text
Total energy-drift: -7.21955e-11
```

According to the [manual](https://iraspa.org/raspa/):

> In Monte Carlo, only differences in energies are computed. These differences are continuously added to
> keep track of the current energies (from which average energies etc. are computed). Obviously, the current
> energy that is kept track off during the simulation should be equal to a full recalculation of the energies.
> The difference between the two signals an error. If the drift is higher than say 1e − 3 or 1e − 4 the results of
> the simulation are in error. This could be due to an error in one of the Monte Carlo moves or because the
> force field is “wrong” (a typical error is when one forgets to define required potentials).

The current simulation shows an energy-drift of magnitude $1\cdot 10^{-11}$ which is largely within acceptable bounds.

The performance of Monte Carlo moves is also monitored:

```text
Performance of the translation move:
======================================
Component 0 [methane]
	total        333328.000000 333042.000000 333630.000000
	succesfull   284917.000000 284740.000000 285619.000000
	accepted   0.854765 0.854967 0.856095
	displacement 1.000000 1.000000 1.000000
```

Again, according to the [manual](https://iraspa.org/raspa/):

> The performance of Monte Carlo moves is monitored. Translation moves are usually scaled to achieve
> an acceptance rate of 50%. Here, the move reached its upper limit of 1 Å because of the low density of the
> system.

The output file also contains the average total energy of the system:

```text
Total energy:
=============
	Block[ 0]       -18214.36638 [K]
	Block[ 1]       -18158.55951 [K]
	Block[ 2]       -18079.05128 [K]
	Block[ 3]       -18004.12672 [K]
	Block[ 4]       -18487.21330 [K]
	------------------------------------------------------------------------------
	Average         -18188.66344 [K] +/-          229.55987 [K]
```

The [manual](https://iraspa.org/raspa/) once again details how this computation is made:

> Averages are computed along with an error bar. The error is computed by dividing the simulation in 5
> blocks and calculating the standard deviation. The errors in RASPA are computed as the 95% confidence
> interval.

### To go further

The official [manual](https://iraspa.org/raspa/) presents many more examples detailing the features of the software, categorized into basic, non-basic, advanced and auxiliary examples. Interested readers can easily adapt and extrapolate the presented commands to run those examples if needed.

</div>
