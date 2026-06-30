---
title: NDM
title_visible: false
linkTitle: NDM
icon: icon-ndm
toc: false
weight: 22
description: "NDM (Notre Dynamique Moléculaire) is a molecular dynamics code developed at CEA Saclay, available as an Apptainer container on the DIAMOND platform."
---

<a href="https://github.com/jpcroc/NDM" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-ndm" aria-hidden="true"></span>
</a>

### Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull ndm.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ndm.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ndm
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">

**NDM** (originally *Notre Dynamique Moléculaire*) is a Molecular Dynamics (MD) code developed at CEA Saclay/SRMP hosted on [GitHub](https://github.com/jpcroc/NDM/).

The code is designed for 3D periodic boundary conditions (though it can work with lower periodic boundary conditions). Native potentials include EAM and pair potentials with or without Coulombic charge interactions. The latter can be dealt with by Ewald or Wolf summations. Tersoff, Stillinger-Weber and Ju Li ZrC potentials are also included but are no longer maintained. A connection is built in to use **LAMMPS** as a force and energy engine, giving access to all the potentials available in this code. A similar connection is under construction for the ML code **Milady**.

**NDM** includes the standard molecular dynamics algorithms : Verlet, Velocity Verlet, Parrinello-Rahman, various constant temperature schemes (Nosé, Nosé-Hoover, Berendsen, Langevin). It also allows to perform "Adaptively Restrained Particle Simulations" with pair or EAM potentials. NEB and climbing NEB are included as well as force matrix for phonons (at the Gamma point), Path Monte-Carlo for chemical potentials and point defect accumulation calculations.

The code is parallelized in MPI. The code parallelization is a domain decomposition. Higher levels of parallelization are coded, e.g. over images for NEB calculations.

**NDM** is coded in Fortran, mostly at the 2003 standard level (classes, etc..). **NDM** is not conceived to replace well-known more stable codes such as **LAMMPS**. However, it offers a framework to test and develop new algorithms within a modern Fortran code.

</div>

### Main content of the image

**NDM** main executable: `/bin/rundm90_ndm_mpi`

This image of **NDM** is built using **MKL** Intel libraries and **GNU** compilers.

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/ndm" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">NDM documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://github.com/jpcroc/NDM" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://github.com/jpcroc/NDM/blob/ndm2025/README.md" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/ndm-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}

