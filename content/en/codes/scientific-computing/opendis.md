---
title: OpenDiS
title_visible: false
linkTitle: OpenDiS
icon: icon-opendis
toc: false
weight: 12
description: "OpenDiS is an open-source discrete dislocation simulation code for studying plasticity in materials, available as a container on DIAMOND."
---

<a href="https://opendis.github.io/OpenDiS/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
  <span class="logo-opendis" aria-hidden="true"></span>
</a>

## Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull opendis.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opendis.sif:latest
```
{{< /tab >}}

{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opendis
```
{{< /tab >}}
{{< /tabs >}}

**OpenDiS (Open Dislocation Simulator)** is an open-source software designed to simulate and analyze dislocations in crystalline materials at the mesoscale. This program is primarily used in materials science and physics to model the complex interactions between dislocations, crystalline defects, and externally applied stresses. Based on advanced numerical methods, OpenDiS enables the visualization of dislocation movements and the study of their impacts on the mechanical and thermal properties of materials. The software is compatible with multiple platforms and features a flexible interface for integration with other simulation and analysis tools.

## Tutorial

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/opendis" icon="tabler-icons/outline/package" class="mb-0" >}}

{{< card-grid >}}
{{< link-card title="Official website" href="https://opendis.github.io/OpenDiS/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://opendis.github.io/OpenDiS/tutorials/index.html" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Examples

{{< link-card title="Download input files" href="/downloads/opendis-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}
