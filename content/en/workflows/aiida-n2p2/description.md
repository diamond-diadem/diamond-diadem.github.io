---
title: n2p2 Workflow Description
linkTitle: Description
toc: false
---

This workflow is a workchain to train machine learning interatomical potential and validate it using lammps molecular dynamic software. It based on The n2p2 repository which provides a software for high-dimensional neural network potentials in computational physics and chemistry. The methodology behind the Behler-Parinello neural network potentials was first described here:

- [J. Behler and M. Parrinello, Phys. Rev. Lett. 98, 146401 (2007)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.98.146401)

This package contains software that will allow you to use existing neural network potential parameterizations to predict energies and forces (with standalone tools but also in conjunction with the MD software LAMMPS). In addition it is possible to train new neural network potentials with the provided training tools.

This realese for n2p2-workflow uses nnp-scale and nnp-train from:

- [N2P2](https://compphysvienna.github.io/n2p2/) for train mlip.
- [lammps](https://www.lammps.org/#gsc.tab=0) for validation model.

The workflow contains example for learn how use the workflow.
Follow that [link](/en/workflows/aiida-n2p2/installation) to install it.
