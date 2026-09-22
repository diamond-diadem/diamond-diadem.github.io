---
title: GPUMD
title_visible: false
linkTitle: GPUMD
icon: icon-gpumd
weight: 23
description: "GPUMD is a generic molecular dynamics code, fully implemented to run on graphics processing units (GPUs)."
---

<a href="https://gpumd.org/dev/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
  <span class="logo-gpumd" aria-hidden="true"></span>
</a>

## Retrieve the container image

```bash
apptainer pull gpumd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

**GPUMD** (Graphics Processing Units Molecular Dynamics) is a versatile, high-performance molecular dynamics software package, fully implemented for graphics processing units (GPUs). It allows the train and use of "neuroevolutionary potentials" (NEPs), a class of machine learning-based potentials (MLP).

There are several [NEP potentials already published](https://gitlab.com/brucefan1983/nep-data) with their associated training and test data.

## Tutorial

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/gpumd" icon="tabler-icons/outline/package" class="mb-0" >}}

## GPUMD documentation

{{< card-grid >}}
{{< link-card title="Official website" href="https://github.com/brucefan1983/GPUMD" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://gpumd.org/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Examples

{{< link-card title="Download input files" href="/downloads/gpumd-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
