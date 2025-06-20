---
title: PLUMED
title_visible: true
linkTitle: PLUMED
icon: icon-plumed
toc: false
weight: 8
---

<div class="codes-pages-top-logo">

<a href="https://www.plumed.org/" target="_blank" class="codes-pages-top-logo mb-0">
    <img alt="PLUMED" class="logo-plumed">
</a>

<h3 style="font-weight: 500;" align="center">The community-developed PLUgin for MolEcular Dynamics</h3>

</div>

<hr>

### Retrieve the Apptainer image

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

<div align="justify">

Plumed is an open-source, highly flexible library specifically designed for enhancing molecular dynamics (MD) and Monte Carlo (MC) simulations. It serves as a powerful tool for researchers working on computational chemistry, biophysics, and materials science, allowing them to incorporate a variety of advanced sampling techniques into their simulations. Plumed integrates seamlessly with numerous MD engines, such as GROMACS, NAMD, LAMMPS, and AMBER, among others, making it a versatile choice for diverse research applications.

The core functionality of Plumed revolves around the calculation and manipulation of collective variables, which are essential for characterizing the state of a molecular system. These variables can be used to apply a variety of biasing techniques, such as metadynamics, umbrella sampling, and steered molecular dynamics, enabling the exploration of free energy landscapes and the study of rare events.

Plumed is also equipped with a comprehensive set of analysis tools that allow for the post-processing of simulation data. This includes the calculation of free energy surfaces, reaction coordinates, and various thermodynamic properties. The software's modular architecture allows users to customize and extend its capabilities by adding new collective variables, biasing methods, or integrating it with other software packages.

Additionally, Plumed supports a scripting interface that enables users to set up and control complex simulation protocols, automating the workflow and reducing the potential for human error. The community-driven development of Plumed ensures continuous updates and improvements, supported by extensive documentation and a robust user community that facilitates troubleshooting and knowledge sharing.

</div>

<h3 class="mb-1">Tutorial</h3>

{{< link-card title="Content coming soon" description="<i>Learn to use this container image</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

<h3 class="mb-1 mt-3">PLUMED documentation</h3>

{{< card-grid >}}
{{< link-card title="Official website" href="https://www.plumed.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Official documentation" href="https://www.plumed.org/doc" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Examples</h3>

{{< link-card title="Content coming soon" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
