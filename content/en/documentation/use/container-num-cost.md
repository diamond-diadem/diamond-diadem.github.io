---
title: "Numerical cost of container use"
toc: false
weight: 3
---

<div align="justify">

A user may wonder whether switching to the use of containers via Apptainer or packages via Guix will change the computational performance.

To quantify a possible performance drop, we need to be able to replicate a simulation using different software environments in order to compare their execution times. The tests performed will cover three software environments:

- a managed environment using [Nix](https://nixos.org/), hereafter referred to as **local environment**,
- a containerized environment using Apptainer
- a packaged environment with Guix.

By performing this type of test (details below), we can see that all three environments provide the same performance.

#### Test Conditions and Detailed Results

LAMMPS simulations were repeated with each software environment. The computations were performed at the GRICAD mesocenter in Grenoble, on the Dahu cluster. Each calculation was performed on a node with the following characteristics:

- **CPU**: 2 Intel Xeon Gold 5218,
- 32 **cores**,
- 192 GB of **RAM**.

The version of the Nix channel used was `23.11`, that of Apptainer `1.2.2`. For each environment, we used the same version of LAMMPS (`stable_2Aug2023_update2`) and the same simulation, which computes the potential of the silicon-carbon (SiC) system using the Modified Embedded-Atom Method (MEAM) over 1 million iterations. To collect as much performance information as possible, the test series are replicated on `1` compute nodes (i.e., `8`, `16`, and `32` processors) and on `2` nodes (i.e., `64` processors).

In addition, to account for possible performance variations due to CPU load, we replicate the computations 20 times in each case. Finally, the average times and standard deviations obtained for each environment are plotted in the graph below. In short, using Apptainer or Guix does not add any computational cost regardless of the number of processors used, demonstrating the equivalence of these software environments.

<div class="text-center mt-4 mb-4">
   <img alt="bench lammps dahu" class="bench-lammps-dahu">
</div>

</div>
