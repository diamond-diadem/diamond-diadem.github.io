---
title: VMD
title_visible: false
linkTitle: VMD
icon: icon-vmd
toc: false
weight: 4
---

<a href="https://www.ks.uiuc.edu/Research/vmd/" target="blank" class="codes-pages-top-logo">
    <img alt="VMD" class="logo-vmd"/>
</a>

### Retrieve the Apptainer image

```bash
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

<div align="justify">

VMD (Visual Molecular Dynamics) is a comprehensive molecular visualization program that facilitates the display, animation, and analysis of large biomolecular systems through advanced 3D graphics and integrated scripting capabilities. It was developed by the Theoretical and Computational Biophysics Group at the University of Illinois at Urbana-Champaign to support the needs of researchers working in the fields of molecular dynamics and computational biology.

VMD is designed to handle a wide range of molecular dynamics simulation software and file formats, making it a versatile tool for visualizing molecular structures, simulation trajectories, and other types of molecular data. The program supports a variety of input formats including PDB, DCD, AMBER, and many more, ensuring compatibility with most common molecular dynamics packages.

One of VMD’s standout features is its extensive visualization capabilities. It offers high-quality rendering techniques such as ray tracing and ambient occlusion, which enable the creation of publication-quality images and animations. Stereoscopic viewing options are also available for an immersive 3D visualization experience. Users can customize the representation of molecular structures through a range of styles, such as space-filling models, ribbons, and surface representations, and apply different coloring schemes to highlight specific features of the molecules.

Beyond visualization, VMD provides robust tools for trajectory analysis, allowing users to examine the movement and interactions of molecules over time. These tools include the ability to calculate root mean square deviation (RMSD), radial distribution functions, and hydrogen bond analysis, among others. VMD also supports molecular modeling functionalities, such as building and modifying molecular structures, energy minimization, and sequence alignment, which are crucial for preparing simulations and interpreting results.

VMD's functionality can be extended through its support for Tcl, Python, and Perl scripting languages. This extensibility allows users to develop custom analysis tools, automate repetitive tasks, and integrate VMD with other software packages to create complex workflows tailored to specific research needs. The program’s scripting capabilities are complemented by a comprehensive plugin architecture, which enables the addition of new features and tools developed by the community.

Overall, VMD is a powerful and flexible tool for molecular visualization and analysis, widely used by researchers in computational biology, chemistry, and related fields. Its combination of high-quality visualization, extensive analysis tools, and scripting extensibility makes it an essential resource for the study and understanding of biomolecular systems.

</div>

### Tutorial

#### <a href="/en/documentation/by-container/vmd">Learn how to use this specific container image</a>

### VMD documentation

- #### <a href="https://www.ks.uiuc.edu/Research/vmd/" target="_blank">Official website</a>

- #### <a href="https://www.ks.uiuc.edu/Research/vmd/current/docs.html" target="_blank">Official documentation</a>

- #### <a href="/downloads/vmd-tutorial-inputs.tar.gz">Examples: input files</a>
