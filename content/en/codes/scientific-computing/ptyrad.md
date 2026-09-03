---
title: PtyRAD
title_visible: true
linkTitle: PtyRAD
toc: false
weight: 23
---

### Retrieve the container image

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull ptyrad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ptyrad-cuda.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ptyrad-cuda
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">

PtyRAD performs ptychographic reconstruction using an automatic differention (AD) framework powered by PyTorch, enabling flexible and efficient implementation of gradient descent optimization.

PtyRAD integrates various features into the reconstruction, including mixed-state probe and object, position correction, position-dependent object tilt correction. It also allow interoperating with PtychoShelves (fold_slice) and py4DSTEM. It also provides a set of utility functions to streamlined the preprocessing of dataset to facilitate the data treatment

PtyRAD also supports hyperparameter tuning and running on multi-GPU. Additional features including JIT compilation with `torch.compile`.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Learn to use this container image" href="/en/documentation/by-container/ptyrad" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">PtyRAD documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://github.com/chiahao3/ptyrad" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://ptyrad.readthedocs.io/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Content to be added" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
