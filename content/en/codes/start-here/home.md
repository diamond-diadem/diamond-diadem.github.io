---
title: CONTAINERISED CODES
linkTitle: Home
tablerIcon: "outline/home"
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

<img alt="containerised codes" class="containerised-codes en mt-4" style="width:100%">

<h3><u>USEFUL LINKS</u></h3>

{{< link-card
    title="Install Apptainer"
    description="Take advantage of our tutorial"
    href="/en/documentation/install/install-apptainer/"
    class="card-custom"
>}}

{{< link-card
    title="Containers images"
    description="Learn to use them"
    href="/en/documentation/use/apptainer-image/"
    class="card-custom"
>}}

<!-- - <h4><a href="/en/documentation/install/install-apptainer/">Install Apptainer</a></h4>
- <h4><a href="/en/documentation/use/apptainer-image/">Learn how to use a container image</a></h4> -->

<h3><u>AVAILABLE CODES</u></h3>

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
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/opencalphad/"><i class="icon-opencalphad"></i>OpenCalphad</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/neper/"><i class="icon-neper"></i>Neper</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/plumed/"><i class="icon-plumed"></i>PLUMED</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/gmsh/"><i class="icon-gmsh"></i>Gmsh</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/zeo++/"><i class="icon-zeoplusplus"></i>Zeo++</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/raspa2/"><i class="icon-raspa2"></i>RASPA2</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

<h3>{{< inline-svg src="outline/table-shortcut" class="svg-inline-shortcut">}}Shortcut: choose your code and retrieve it with Apptainer</h3>

<select class="form-select" id="options">
    <optgroup>
        <option value="option0">--- Select ---</option>
    </optgroup>
    <optgroup label="Scientific Computing">
        <option value="option1">LAMMPS</option>
        <option value="option2">Quantum ESPRESSO</option>
        <option value="option3">Abinit</option>
        <option value="option4">Z-set</option>
        <option value="option5">FreeFEM</option>
        <option value="option6">OpenCalphad</option>
        <option value="option7">Neper</option>
        <option value="option8">PLUMED</option>
        <option value="option9">Gmsh</option>
        <option value="option10">Zeo++</option>
        <option value="option11">RASPA2</option>
    </optgroup>
    <optgroup label="Visualisation">
        <option value="optiona">Ovito</option>
        <option value="optionb">ParaView</option>
        <option value="optionc">Vesta</option>
        <option value="optiond">VMD</option>
    </optgroup>
</select>

<div id="content-option1" class="hidden">

```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```

</div>
<div id="content-option2" class="hidden">

```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

</div>
<div id="content-option3" class="hidden">

```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

</div>
<div id="content-option4" class="hidden">

```bash
apptainer pull z-set.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/z-set.sif:latest
```

</div>
<div id="content-option5" class="hidden">

```bash
apptainer pull freefemplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/freefemplusplus.sif:latest
```

</div>
<div id="content-option6" class="hidden">

```bash
apptainer pull opencalphad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opencalphad.sif:latest
```

</div>
<div id="content-option7" class="hidden">

```bash
apptainer pull neper.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/neper.sif:latest
```

</div>
<div id="content-option8" class="hidden">

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

</div>
<div id="content-option9" class="hidden">

```bash
apptainer pull gmsh.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gmsh.sif:latest
```

</div>
<div id="content-option10" class="hidden">

```bash
apptainer pull zeoplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/zeoplusplus.sif:latest
```

</div>
<div id="content-option11" class="hidden">

```bash
apptainer pull raspa2.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/raspa2.sif:latest
```

</div>
<div id="content-optiona" class="hidden">

```bash
apptainer pull ovito.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ovito.sif:latest
```

</div>
<div id="content-optionb" class="hidden">

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

</div>
<div id="content-optionc" class="hidden">

```bash
apptainer pull vesta.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vesta.sif:latest
```

</div>
<div id="content-optiond" class="hidden">

```bash
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

</div>
