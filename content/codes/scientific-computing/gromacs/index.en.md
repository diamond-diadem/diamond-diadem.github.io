---
title: GROMACS
linkTitle: GROMACS
icon: icon-gromacs
toc: false
weight: 24
description: "GROMACS is a versatile package to perform molecular dynamics, available as a container on the DIAMOND platform."
website: "https://gromacs.org/"
---

### Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull gromacs.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs.sif:latest
# or if you want CUDA acceleration
#apptainer pull gromacs-cuda.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs-cuda.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs
# or if you want CUDA acceleration
#docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs-cuda
```
{{< /tab >}}
{{< /tabs >}}

**GROMACS** is a **versatile package to perform molecular dynamics**, i.e. simulate the Newtonian equations of motion for systems with hundreds to millions of particles and is a community-driven project. It is primarily designed for biochemical molecules like proteins, lipids and nucleic acids that have a lot of complicated bonded interactions, but since GROMACS is extremely fast at calculating the nonbonded interactions (that usually dominate simulations) many groups are also using it for research on non-biological systems, e.g. polymers and fluid dynamics.

## Tutorial

{{< link-card title="Content to be added" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

## GROMACS documentation

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.gromacs.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://manual.gromacs.org/current/index.html" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Examples

{{< link-card title="Content to be added" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
