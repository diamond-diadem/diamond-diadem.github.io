---
title: Abinit
title_visible: false
linkTitle: Abinit
icon: icon-abinit
toc: false
weight: 3
---

<a href="https://www.abinit.org/" target="_blank" class="codes-pages-top-logo">
    <img alt="Abinit" class="logo-abinit">
</a>

### Retrieve the Apptainer image

```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

<div align="justify">

Abinit is a comprehensive software suite designed for the computational study of the physical properties of materials using advanced quantum mechanical methods. At its core, Abinit employs density functional theory (DFT), a widely used approach for investigating the electronic structure of atoms, molecules, and condensed phases. In addition to DFT, Abinit also integrates many-body perturbation theory (MBPT) and time-dependent DFT (TD-DFT), enabling it to address a wide range of physical phenomena.

One of the distinguishing features of Abinit is its ability to handle both ground-state and excited-state properties of materials. The software can compute total energies, electronic band structures, density of states, and charge densities. It also provides tools for the study of response functions, allowing the calculation of optical properties, phonon dispersions, and various spectroscopic characteristics. Abinit supports a variety of exchange-correlation functionals, including local density approximation (LDA), generalized gradient approximation (GGA), hybrid functionals, and meta-GGA functionals.

Abinit is highly versatile, accommodating calculations with periodic boundary conditions for crystalline materials as well as finite systems such as molecules and nanostructures. It utilizes pseudopotentials and Projector Augmented-Wave (PAW) datasets to efficiently describe the electron-ion interactions, facilitating accurate and scalable simulations of large systems comprising hundreds of atoms.

The software is designed to run efficiently on high-performance computing platforms, leveraging parallel computing techniques to handle large-scale simulations. Abinit is written in Fortran and C, with a modular architecture that allows for easy expansion and integration with other computational tools. It features a robust input/output framework and a suite of pre- and post-processing utilities to aid users in setting up simulations and analyzing results.

As an open-source project, Abinit benefits from an active community of developers and users. Contributions from this community have extended the software's capabilities and ensured its continual improvement. Abinit's comprehensive documentation, tutorials, and user forums provide ample support for both novice and experienced users, making it a valuable tool for researchers in the fields of materials science, chemistry, physics, and engineering.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Content coming soon" description="<i>Learn to use this container image</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

<h3 class="mb-1 mt-3">Abinit documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.abinit.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://docs.abinit.org/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Content coming soon" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
