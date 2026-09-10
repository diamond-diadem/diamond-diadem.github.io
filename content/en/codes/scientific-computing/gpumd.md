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

### Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer - H100/H200" >}}
```bash
apptainer pull gpumd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">


* **GPUMD** stands for *Graphics Processing Units Molecular Dynamics*.
* **GPUMD** is a versatile, high-performance molecular dynamics software package, fully implemented for graphics processing units (GPUs).
* **GPUMD** allows you to train and use a class of machine learning-based potentials (MLP) called “neuroevolutionary potentials” (NEPs). Check out this [GitLab repository nep-data](https://gitlab.com/brucefan1983/nep-data) to explore some of the published NEP potentials along with their associated training and test data.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/gpumd" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">GPUMD documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://github.com/brucefan1983/GPUMD" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://gpumd.org/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Download input files" href="/downloads/gpumd-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
