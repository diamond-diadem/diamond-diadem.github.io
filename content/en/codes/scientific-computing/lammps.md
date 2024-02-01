---
linkTitle: LAMMPS
toc: false
---

<br/>

<a href="https://www.lammps.org/" target="_blank"><img src="/website-doks/images/lammps-logo.png" width="500px"></a>

<br/>

<div align="justify">

LAMMPS, which stands for "Large-scale Atomic/Molecular Massively Parallel Simulator," is a powerful and versatile open-source software designed for conducting molecular dynamics simulations. Developed at the Sandia National Laboratory, LAMMPS has gained significant popularity in the scientific community due to its ability to model various materials and systems at the atomic and molecular levels.

LAMMPS is particularly well-suited for simulating complex physical phenomena such as solid-state materials, liquids, polymers, biological systems, and more. Its strength lies in its scalability, allowing for efficient parallelization of simulations across a large number of processors, enabling the study of systems containing millions to billions of particles.

The software supports a wide range of interatomic potentials and force fields, enabling researchers to accurately capture particle interactions in different materials. Moreover, LAMMPS provides a flexible and extensible framework, allowing users to implement custom models and algorithms tailored to their specific research needs.

The [LAMMPS website](https://www.lammps.org/) provides a variety of information about the code. This includes links to an online version of [its manual](https://docs.lammps.org/Manual.html), an [online forum](https://www.lammps.org/forum.html) where users can post questions and engage in discussions about LAMMPS, and a [GitHub repository](https://github.com/lammps/lammps) where the entire development of LAMMPS is coordinated.

</div>

### Direct download link : {{< inline-svg src="paperclip" height="32px" width="32px" class="svg-inline-custom" >}} LAMMPS

### Retrieve this container using Apptainer:

```sh
# LOGIN
apptainer remote login -u <your-login> oras://gricad-registry.univ-grenoble-alpes.fr

# PULL
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/hugo-files/lammps.sif:latest
```

### <a href="/en/documentation/by-container/lammps">Learn how to use this specific container</a>

### LAMMPS documentation:

- ##### <a href="https://www.lammps.org/" target="_blank">Official website</a>

- ##### <a href="https://docs.lammps.org/" target="_blank">Official documentation</a>

- ##### Examples: input files