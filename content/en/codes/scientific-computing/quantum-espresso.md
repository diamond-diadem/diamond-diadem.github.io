---
title: Quantum ESPRESSO
title_visible: false
linkTitle: Quantum ESPRESSO
icon: icon-quantum-espresso
toc: false
weight: 2
description: "Quantum ESPRESSO is an electronic structure calculation suite based on DFT and pseudopotentials, available as an Apptainer container on DIAMOND."
---

<a href="https://www.quantum-espresso.org/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-quantum-espresso" aria-hidden="true"></span>
</a>

### Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">

Quantum ESPRESSO is an electronic structure calculation software based on density functional theory (DFT) and electronic perturbation theory. It is designed to perform simulations of electronic and structural properties of atomic and molecular systems. Quantum ESPRESSO offers a comprehensive set of tools for studying materials at the atomic scale, including crystals, surfaces, and nanostructures.

The software supports various calculation methods, such as plane-wave DFT, density functional perturbation theory (DFPT), and time-dependent DFT (TDDFT). It enables researchers to model and analyze electronic properties, forces, and energies associated with the studied systems. Quantum ESPRESSO is commonly utilized in condensed matter physics research, theoretical chemistry, and materials science to understand and predict the quantum-scale behavior of materials. It is primarily intended for scientists and researchers working in the field of quantum simulation and modeling.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/quantum-espresso" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Quantum ESPRESSO documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.quantum-espresso.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://www.quantum-espresso.org/documentation/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/qe-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
