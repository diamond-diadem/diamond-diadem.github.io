---
title: CONTAINERIZED CODES
linkTitle: Home
googleIcon: home
toc: false
---

{{< callout context="note" title="" icon="outline/info-circle" >}}

In this section, you will be able to download Apptainer images for codes available on this website. For scientific computing as well as data visualisation

{{< /callout >}}

{{< callout context="tip" title="" icon="outline/question-mark" >}}

But to begin with, if you haven't gone through this step yet and if you're not familiar with using Apptainer, follow the links below to learn how to install Apptainer and interact with images.

{{< /callout >}}

<div align="justify">

In the summer of 2023, the materials community was surveyed via LimeSurvey to identify working habits. Among other things, this highlighted a number of codes used for both computation and visualisation (see below). Currently, almost $40\%$ of the codes cited by the community are containerised and/or packaged, covering all physical scales.

</div>

<img alt="containerised codes" class="containerised-codes" style="width:100%">

<h3><u>USEFUL LINKS :</u></h3>

- <h4><a href="/en/documentation/install-apptainer/howto/">Install Apptainer</a></h4>
- <h4><a href="/en/documentation/use/apptainer-image/">Learn how to use a container</a></h4>

<h3><u>AVAILABLE CODES:</u></h3>

<table>
    <caption>
        And more to be added
    </caption>
    <thead>
        <tr>
            <th scope="col">Scientific Computing</th>
            <th scope="col">Visualisation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="/en/codes/scientific-computing/lammps/"><i class="icon-lammps"></i>LAMMPS</a></td>
            <td><a href="/en/codes/visualisation/ovito/"><i class="icon-ovito"></i>Ovito</a></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/quantum-espresso/"><i class="icon-quantum-espresso"></i>Quantum ESPRESSO</a></td>
            <td><a href="/en/codes/visualisation/paraview/"><i class="icon-paraview"></i>ParaView</a></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/abinit/"><i class="icon-abinit"></i>Abinit</td>
            <td><a href="/en/codes/visualisation/vesta/"><i class="icon-vesta"></i>VESTA</a></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/z-set/"><i class="icon-z-set"></i>Z-set</a></td>
            <td><a href="/en/codes/visualisation/vmd/"><i class="icon-vmd"></i>VMD</a></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/freefem/"><i class="icon-freefem"></i>FreeFEM</a></td>
            <td></td>
        </tr><tr>
            <td><a href="/en/codes/scientific-computing/opencalphad/"><i class="icon-opencalphad"></i>OpenCalphad</a></td>
            <td></td>
        </tr>
        </tr><tr>
            <td><a href="/en/codes/scientific-computing/neper/"><i class="icon-neper"></i>Neper</a></td>
            <td></td>
        </tr>
        </tr><tr>
            <td><a href="/en/codes/scientific-computing/plumed/"><i class="icon-plumed"></i>PLUMED</a></td>
            <td></td>
        </tr>
        </tr><tr>
            <td><a href="/en/codes/scientific-computing/gmsh/"><i class="icon-gmsh"></i>Gmsh</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

<h3> Shortcut : choose your code and get the Apptainer command to retrieve it</h3>

{{< tabs "retrieve-apptainer-image" >}}
{{< tab "LAMMPS" >}}

```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```

{{< /tab >}}
{{< tab "Quantum ESPRESSO" >}}

```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

{{< /tab >}}
{{< tab "Abinit" >}}

```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

{{< /tab >}}
{{< tab "Z-set" >}}

```bash
apptainer pull z-set.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/z-set.sif:latest
```

{{< /tab >}}
{{< tab "FreeFEM" >}}

```bash
apptainer pull freefemplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/freefemplusplus.sif:latest
```

{{< /tab >}}
{{< tab "OpenCalphad" >}}

```bash
apptainer pull opencalphad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opencalphad.sif:latest
```

{{< /tab >}}
{{< tab "Neper" >}}

```bash
apptainer pull neper.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/neper.sif:latest
```

{{< /tab >}}
{{< tab "PLUMED" >}}

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

{{< /tab >}}
{{< tab "Gmsh" >}}

```bash
apptainer pull gmsh.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gmsh.sif:latest
```

{{< /tab >}}
{{< tab "Ovito" >}}

```bash
apptainer pull ovito.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ovito.sif:latest
```

{{< /tab >}}
{{< tab "ParaView" >}}

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

{{< /tab >}}
{{< tab "VESTA" >}}

```bash
apptainer pull vesta.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vesta.sif:latest
```

{{< /tab >}}
{{< tab "VMD" >}}

```bash
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

{{< /tab >}}
{{< /tabs >}}
