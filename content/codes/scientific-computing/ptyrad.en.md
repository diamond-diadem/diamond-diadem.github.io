---
title: PtyRAD
title_visible: true
linkTitle: PtyRAD
description: "PtyRAD performs ptychographic reconstruction with a PyTorch automatic differentiation framework, available as an Apptainer container on DIAMOND."
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

PtyRAD performs ptychographic reconstruction using an automatic differentiation (AD) framework powered by PyTorch, enabling flexible and efficient implementation of gradient descent optimization.

PtyRAD integrates various features into the reconstruction, including:

- Mixed-state probe and object, position correction, and position-dependent object tilt correction.
- Allows interoperating with PtychoShelves (fold_slice) and py4DSTEM.
- Provides a set of utility functions to streamline the preprocessing of datasets to facilitate data treatment.

PtyRAD also supports hyperparameter tuning and running on multi-GPU. Additional features include JIT compilation with `torch.compile`.

### Tutorial

{{< link-card title="Learn to use this container image"
    href="/en/documentation/by-container/ptyrad"
    icon="tabler-icons/outline/package" >}}

### PtyRAD documentation

{{< card-grid >}}

    {{< link-card
        title="Official website"
        href="https://github.com/chiahao3/ptyrad"
        target="_blank"
        icon="tabler-icons/outline/world-www" >}}

    {{< link-card
        title="Official documentation"
        href="https://ptyrad.readthedocs.io/"
        target="_blank" icon="tabler-icons/outline/book" >}}

{{< /card-grid >}}
