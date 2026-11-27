---
title: CalculiX
title_visible: false
linkTitle: CalculiX
toc: false
weight: 24
description: "CalculiX is a package designed to solve field problems, available as a container on the DIAMOND platform."
---

## Retrieve the container image

CalculiX has two independent parts: CrunchiX and GraphiX.

### CrunchiX

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull calculix-crunchix.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/calculix-crunchix.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/calculix-crunchix
```
{{< /tab >}}
{{< /tabs >}}

### GraphiX

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull calculix-graphix.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/calculix-graphix.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/calculix-graphix
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">

**CalculiX** is a **package designed to solve field problems**. It can be used to build, calculate and post-process Finite Element Models (FEM). The pre- and post-processor is an interactive 3D-tool (GraphiX) using the openGL API. The solver (CrunchiX) is able to do linear and non-linear calculations. Static, dynamic and thermal solutions are available. Both programs can be used independently. Because the solver makes use of the abaqus input format it is possible to use commercial pre-processors as well. In turn the pre-processor is able to write mesh related data for nastran, abaqus, ansys, code-aster and for the free-cfd codes dolfyn, duns, ISAAC and OpenFOAM. A simple step reader is included. In addition external CAD interfaces are available.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Content to be added" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0">}}

<h3 class="mb-1 mt-3">CalculiX Documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.calculix.de/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://www.calculix.de/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Content to be added" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
