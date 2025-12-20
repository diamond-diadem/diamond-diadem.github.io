---
title: WORKFLOWS
linkTitle: Home
weight: 1
toc: false
---

<div align="justify" class="mt-4">
In materials science, calculations frequently involve handling a significant amount of data, which must be stored in an orderly and organized manner to ensure accessibility and ease of use. Additionally, the computational cost of these calculations often results in relatively long execution times to meet criteria (for convergence, equilibrium, etc.) that ensure the reliability of the results. Since it is not always possible to run a lengthy calculation in one go, it sometimes becomes necessary to restart calculations from a saved state.

These two processes - managing input/output data and handling individual runs of various codes - are often tedious. Typically, they require human intervention, with manual management of execution states and data. Ensuring full traceability, essential in today’s era of reproducible science, is both demanding and time-consuming. Moreover, the exploratory nature of research inherently involves successive iterations, each carrying a risk of error and often involving repetitive, unexciting tasks.

To address these challenges, automation is a promising solution: automating and standardizing the process of generating and analyzing data makes it both easier to manage and more reproducible. This automation of **workflows** can take several forms. The simplest involves using system programming tools (such as Python or bash scripts) to manage data transfer, sequential program execution, editing input files, or analyzing output files. More recently, we have seen the emergence of tools specifically dedicated to this task. These **workflow managers** offer advanced features, such as automatic management of calculation restarts, orchestration of execution units on remote machines, construction of provenance graphs to ensure exhaustive data traceability, and a high level of abstraction for automating complex input file generation and facilitating the switch from one code to another.

In summary, well-designed workflows not only save time but also reduce the risk of human error, thereby increasing the reliability of the data produced. Here are some developments on the platform in this direction.

</div>

<div align="center"><h2>Available Workflows</h2></div>

- ### simple-adsorption-workflow

  Containerized program for the study of adsorption in porous materials
  - [Description](/en/workflows/saw/description)
  - [Tutorial](/en/workflows/saw/tutorial)

- ### aiida-n2p2-workflow

  In mlip we have n2p2-workflow
  - [Description](/en/workflows/aiida-n2p2/description)
  - [Installation](/en/workflows/aiida-n2p2/installation)
  <!-- - [Benchmark](/en/workflows/aiida-n2p2/benchmark) -->

- ### MOFLearning-AIIDA-LAMMPS-workflow
  - [Description](/en/workflows/aiida-diffusion-wf/description)
  - [Installation](/en/workflows/aiida-diffusion-wf/installation)
