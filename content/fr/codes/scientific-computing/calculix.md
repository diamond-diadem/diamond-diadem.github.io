---
title: CalculiX
title_visible: false
linkTitle: CalculiX
toc: false
weight: 24
description: "CalculiX est un logiciel conçu pour résoudre des problèmes de terrain, disponible en conteneur Apptainer sur la plateforme DIAMOND"
---

## Retrieve the container image

CalculiX a deux composants indépendants: CrunchiX et GraphiX.

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

**CalculiX** est un **logiciel conçu pour résoudre des problèmes sur le terrain**. Il permet de créer, de calculer et de traiter des modèles par éléments finis (FEM). Le pré- et post-processeur est un outil 3D interactif (GraphiX) utilisant l'API OpenGL. Le solveur (CrunchiX) est capable d'effectuer des calculs linéaires et non linéaires. Des solutions statiques, dynamiques et thermiques sont disponibles. Les deux programmes peuvent être utilisés indépendamment l’un de l’autre. Le solveur utilisant le format d’entrée Abaqus, il est également possible d’utiliser des pré-processeurs commerciaux. De son côté, le pré-processeur est capable de générer des données de maillage pour NASTRAN, Abaqus, ANSYS, Code-Aster ainsi que pour les codes CFD libres Dolfyn, DUNS, ISAAC et OpenFOAM. Un lecteur de fichiers STEP simple est inclus. De plus, des interfaces CAO externes sont disponibles.


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
