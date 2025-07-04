---
title: GaTewAY
title_visible: true
linkTitle: GaTewAY
icon:
weight: 19
---

### Retrieve the Apptainer image

```bash
apptainer pull gateway.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gateway.sif:latest
```

<div align="justify">

**GaTewAY** is a post-processing tool written in C designed for the structural analysis of molecular dynamics (MD) trajectories through graph-theoretical approaches.
It transforms 3D molecular structures (xyz coordinates) into 2D molecular graphs (2D-MolGraphs), where vertices represent atoms and edges encode specific interactions, including covalent bonds, hydrogen bonds, ionic, and organometallic interactions.

Using an isomorphism algorithm, GaTewAY identify all unique conformations explored along an MD trajectory, computes their residence times, and generates the graph of transitions, which captures all observed transitions between these conformations. This graph-based approach enables fast and accurate recognition of molecular conformers and provides a comprehensive picture of the conformational landscape and interconversion pathways.

GaTewAY is modular, extensible, and highly transferable. It is fully parameterizable, users can customize geometric thresholds and interaction parameters (ex. bond thresholds, angle constraints, etc.). It is applicable to a wide range of systems, from isolated molecular states in the gas phase to complex condensed matter systems. Moreover, it enables topological dissection of 2D-MolGraphs to extract subgraph motifs and recurrent patterns, particularly useful for characterizing interface structures, hydrogen-bonded networks, and solvation shells

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Content to be added" description="<i>Learn to use this container image</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

<h3 class="mb-1 mt-3">GaTewAY documentation</h3>

{{< card-grid >}}
{{< link-card title="Content to be added" description="<i>Official website</i>" href="#bottom" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Content to be added" description="<i>Official documentation</i>" href="#bottom" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/gateway-examples.tar.gz" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
