---
title: MOOSE
title_visible: false
linkTitle: MOOSE
icon: icon-moose
toc: false
weight: 1
description: "MOOSE (Multiphysics Object Oriented Simulation Environment) is an object-oriented C++ finite element framework for the development of tightly coupled multiphysics solvers from Idaho National Laboratory. MOOSE is developed to running on multiples CPU and to be to be massively parallel"
---

<a href="https://www.lammps.org/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-moose" aria-hidden="true"></span>
</a>

### MOOSE DOCUMENTATION

- [Moose official website](https://mooseframework.inl.gov/)
- [Moose Tutorials](https://mooseframework.inl.gov/getting_started/examples_and_tutorials/index.html)
- [Moose official GitHub repository](https://github.com/idaholab/moose)
- [Moose official images repository](https://github.com/idaholab/moose-containers)

### Container Download

You can get two containers :
- MOOSE-DEV : A container which contains the whole C++ code, meant to be used in interactive mode.

- MOSSE : A container only containing compiled binaries

All Dockerfiles and built Docker images are available in [this repository](https://github.com/idaholab/moose-containers)

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}

For building the moose-dev image (change the version number accordingly):

```bash
apptainer build moose.sif docker://idaholab/moose:latest
```

For building the moose image (latest available version) :
```bash
apptainer build moose.sif docker://idaholab/moose:latest
```

{{< /tab >}}
{{< tab "Docker" >}}

Moose-Dev Docker image:
```bash
docker pull idaholab/moose-dev:latest
```

Moose docker image:
```bash
docker pull idaholab/moose:latest
```

{{< /tab >}}
{{< /tabs >}}
