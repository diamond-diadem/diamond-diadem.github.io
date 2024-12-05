---
title: CONTAINERISED CODES
linkTitle: Home
tablerIcon: "tabler-icons/outline/home"
toc: false
---

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

In this section, you will be able to download Apptainer images for codes available on this website. For scientific computing as well as data visualisation

{{< /callout >}}

{{< callout context="tip" title="" icon="tabler-icons/outline/question-mark" >}}

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
    icon="custom/apptainer"
>}}

{{< link-card
    title="Containers images"
    description="Learn to use them"
    href="/en/documentation/use/apptainer-image/"
    icon="tabler-icons/outline/settings-question"
>}}

<h3><u>AVAILABLE CODES</u></h3>

<table>
    <caption>
        And more to be added!
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
            <td><a href="/en/codes/visualisation/xcrysden/"><i class="icon-xcrysden"></i>XCrySDen</a></td>
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
        <tr>
            <td><a href="/en/codes/scientific-computing/opendis/"><i class="icon-opendis"></i>Open-DIS</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/wannier90/"><i class="icon-wannier90"></i>Wannier90</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/en/codes/scientific-computing/nwchem/"><i class="icon-nwchem"></i>NWChem</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

<h3 align="center" class="mb-5">{{< inline-svg src="tabler-icons/outline/table-shortcut" class="svg-inline-shortcut">}}Shortcut: choose your code and retrieve it with Apptainer</h3>

<div class="container-pulls-large">

<div class="row">
    <div class="col-6 col-diamond container-select container-select-1" align="left">
        <label for="options1" style="font-size: larger;"><b>Scientific Computing</b></label>
        <select class="form-select select-options" align="left" id="options1A">
            <option value="option0" disabled="disabled" selected="selected" hidden="hidden">--- Select a code ---</option>
            <optgroup label="Scientific Computing">
                <option value="option1A">LAMMPS</option>
                <option value="option2A">Quantum ESPRESSO</option>
                <option value="option3A">Abinit</option>
                <option value="option4A">Z-set</option>
                <option value="option5A">FreeFEM</option>
                <option value="option6A">OpenCalphad</option>
                <option value="option7A">Neper</option>
                <option value="option8A">PLUMED</option>
                <option value="option9A">Gmsh</option>
                <option value="option10A">Zeo++</option>
                <option value="option11A">RASPA2</option>
                <option value="option12A">Open-DIS</option>
                <option value="option13A">Wannier90</option>
                <option value="option14A">NWChem</option>
            </optgroup>
        </select>
    </div>
    <div class="col-6 col-diamond container-select container-select-2 container-rtl" align="right">
        <label for="options2" style="font-size: larger;"><b>Visualisation</b></label>
        <select class="form-select select-options" align="right" id="options2A">
            <option value="option0" disabled="disabled" selected="selected" hidden="hidden">--- Select a code ---</option>
            <optgroup label="Visualisation">
                <option value="optionaA">Ovito</option>
                <option value="optionbA">ParaView</option>
                <option value="optioncA">Vesta</option>
                <option value="optiondA">VMD</option>
                <option value="optioneA">XCrySDen</option>
            </optgroup>
        </select>
    </div>
</div>

<div id="content-option1A" class="hidden">

```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```

</div>
<div id="content-option2A" class="hidden">

```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

</div>
<div id="content-option3A" class="hidden">

```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

</div>
<div id="content-option4A" class="hidden">

```bash
apptainer pull z-set.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/z-set.sif:latest
```

</div>
<div id="content-option5A" class="hidden">

```bash
apptainer pull freefemplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/freefemplusplus.sif:latest
```

</div>
<div id="content-option6A" class="hidden">

```bash
apptainer pull opencalphad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opencalphad.sif:latest
```

</div>
<div id="content-option7A" class="hidden">

```bash
apptainer pull neper.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/neper.sif:latest
```

</div>
<div id="content-option8A" class="hidden">

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

</div>
<div id="content-option9A" class="hidden">

```bash
apptainer pull gmsh.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gmsh.sif:latest
```

</div>
<div id="content-option10A" class="hidden">

```bash
apptainer pull zeoplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/zeoplusplus.sif:latest
```

</div>
<div id="content-option11A" class="hidden">

```bash
apptainer pull raspa2.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/raspa2.sif:latest
```

</div>
<div id="content-option12A" class="hidden">

```bash
apptainer pull opendis.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opendis-from-guix.sif:latest
```

</div>
<div id="content-option13A" class="hidden">

```bash
apptainer pull wannnier90.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/wannier90-from-guix.sif:latest
```

</div>
<div id="content-option14A" class="hidden">

```bash
apptainer pull nwchem.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/nwchem.sif:latest
```

</div>
<div id="content-optionaA" class="hidden">

```bash
apptainer pull ovito.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ovito.sif:latest
```

</div>
<div id="content-optionbA" class="hidden">

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

</div>
<div id="content-optioncA" class="hidden">

```bash
apptainer pull vesta.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vesta.sif:latest
```

</div>
<div id="content-optiondA" class="hidden">

```bash
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

</div>
<div id="content-optioneA" class="hidden">

```bash
apptainer pull xcrysden.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xcrysden.sif:latest
```

</div>

</div>

<div class="container-pulls-small">

<div class="col-6 col-diamond container-select container-select-1" align="left">
    <label for="options1" style="font-size: larger;"><b>Scientific Computing</b></label>
    <select class="form-select select-options" align="left" id="options1B">
        <option value="option0" disabled="disabled" selected="selected" hidden="hidden">--- Select a code ---</option>
        <optgroup label="Scientific Computing">
            <option value="option1B">LAMMPS</option>
            <option value="option2B">Quantum ESPRESSO</option>
            <option value="option3B">Abinit</option>
            <option value="option4B">Z-set</option>
            <option value="option5B">FreeFEM</option>
            <option value="option6B">OpenCalphad</option>
            <option value="option7B">Neper</option>
            <option value="option8B">PLUMED</option>
            <option value="option9B">Gmsh</option>
            <option value="option10B">Zeo++</option>
            <option value="option11B">RASPA2</option>
            <option value="option12B">Open-DIS</option>
            <option value="option13B">Wannier90</option>
            <option value="option14B">NWChem</option>
        </optgroup>
    </select>
</div>

<br>

<div id="content-option1B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```

</div>
<div id="content-option2B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

</div>
<div id="content-option3B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

</div>
<div id="content-option4B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull z-set.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/z-set.sif:latest
```

</div>
<div id="content-option5B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull freefemplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/freefemplusplus.sif:latest
```

</div>
<div id="content-option6B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull opencalphad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opencalphad.sif:latest
```

</div>
<div id="content-option7B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull neper.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/neper.sif:latest
```

</div>
<div id="content-option8B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

</div>
<div id="content-option9B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull gmsh.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gmsh.sif:latest
```

</div>
<div id="content-option10B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull zeoplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/zeoplusplus.sif:latest
```

</div>
<div id="content-option11B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull raspa2.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/raspa2.sif:latest
```

</div>
<div id="content-option12B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull opendis.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opendis-from-guix.sif:latest
```

</div>
<div id="content-option13B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull wannnier90.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/wannier90-from-guix.sif:latest
```

</div>
<div id="content-option14B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull nwchem.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/nwchem.sif:latest
```

</div>

<div class="col-6 col-diamond container-select container-select-2 container-rtl" align="right">
    <label for="options2" style="font-size: larger;"><b>Visualisation</b></label>
    <select class="form-select select-options" align="right" id="options2B">
        <option value="option0" disabled="disabled" selected="selected" hidden="hidden">--- Select a code ---</option>
        <optgroup label="Visualisation">
            <option value="optionaB">Ovito</option>
            <option value="optionbB">ParaView</option>
            <option value="optioncB">Vesta</option>
            <option value="optiondB">VMD</option>
            <option value="optioneB">XCrySDen</option>
        </optgroup>
    </select>
</div>

<div id="content-optionaB" class="hidden">

```bash
apptainer pull ovito.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ovito.sif:latest
```

</div>
<div id="content-optionbB" class="hidden">

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

</div>
<div id="content-optioncB" class="hidden">

```bash
apptainer pull vesta.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vesta.sif:latest
```

</div>
<div id="content-optiondB" class="hidden">

```bash
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

</div>
<div id="content-optioneB" class="hidden">

```bash
apptainer pull xcrysden.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xcrysden.sif:latest
```

</div>

</div>
