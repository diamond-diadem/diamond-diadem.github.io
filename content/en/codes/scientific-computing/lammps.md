---
title: LAMMPS
title_visible: false
linkTitle: LAMMPS
icon: icon-lammps
toc: false
weight: 1
---

<a href="https://www.lammps.org/" target="_blank" class="codes-pages-top-logo">
    <img class="logo-lammps" alt="LAMMPS">
</a>

### Retrieve the Apptainer image

```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps-from-guix.sif:latest
```

<div align="justify">

LAMMPS, which stands for "Large-scale Atomic/Molecular Massively Parallel Simulator," is a powerful and versatile open-source software designed for conducting molecular dynamics simulations. Developed at the Sandia National Laboratory, LAMMPS has gained significant popularity in the scientific community due to its ability to model various materials and systems at the atomic and molecular levels.

LAMMPS is particularly well-suited for simulating complex physical phenomena such as solid-state materials, liquids, polymers, biological systems, and more. Its strength lies in its scalability, allowing for efficient parallelization of simulations across a large number of processors, enabling the study of systems containing millions to billions of particles.

The software supports a wide range of interatomic potentials and force fields, enabling researchers to accurately capture particle interactions in different materials. Moreover, LAMMPS provides a flexible and extensible framework, allowing users to implement custom models and algorithms tailored to their specific research needs.

The [LAMMPS website](https://www.lammps.org/) provides a variety of information about the code. This includes links to an online version of [its manual](https://docs.lammps.org/Manual.html), an [online forum](https://www.lammps.org/forum.html) where users can post questions and engage in discussions about LAMMPS, and a [GitHub repository](https://github.com/lammps/lammps) where the entire development of LAMMPS is coordinated.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/lammps" icon="tabler-icons/outline/package" >}}

<h3 class="mb-1">LAMMPS documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://lammps.org" target="_blank" icon="tabler-icons/outline/world-www" >}}
{{< link-card title="Official documentation" href="https://docs.lammps.org" target="_blank" icon="tabler-icons/outline/book" >}}
{{< /card-grid >}}

<h3 class="mb-1">Examples</h3>

{{< link-card title="Download input files" href="/downloads/lammps-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}
