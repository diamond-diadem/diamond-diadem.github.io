---
title: Part 3
weight: 3
---

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
                <option value="option12A">OpenDiS</option>
                <option value="option13A">Wannier90</option>
                <option value="option14A">NWChem</option>
                <option value="option15A">FEniCS</option>
                <option value="option16A">CP2K</option>
                <option value="option17A">n2p2</option>
                <option value="option18A">DFTB+</option>
                <option value="option19A">XTB</option>
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
<div id="content-option15A" class="hidden">

```bash
apptainer pull fenics.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics-from-guix.sif:latest
```

</div>
<div id="content-option16A" class="hidden">

```bash
apptainer pull cp2k.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/cp2k-from-guix.sif:latest
```

</div>
<div id="content-option17A" class="hidden">

```bash
apptainer pull n2p2.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/n2p2-from-guix.sif:latest
```

</div>
<div id="content-option18A" class="hidden">

```bash
apptainer pull dftbplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus.sif:latest
```

</div>

<div id="content-option19A" class="hidden">

```bash
apptainer pull xtb.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb-from-guix.sif:test
```

</div>

<!--  -->

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
            <option value="option12B">OpenDiS</option>
            <option value="option13B">Wannier90</option>
            <option value="option14B">NWChem</option>
            <option value="option15B">FEniCS</option>
            <option value="option16B">CP2K</option>
            <option value="option17B">n2p2</option>
            <option value="option18B">DFTB+</option>
            <option value="option19B">XTB</option>
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
<div id="content-option15B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull fenics.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics-from-guix.sif:latest
```

</div>
<div id="content-option16B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull cp2k.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/cp2k-from-guix.sif:latest
```

</div>
<div id="content-option17B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull n2p2.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/n2p2-from-guix.sif:latest
```

</div>
<div id="content-option18B" style="margin-top: -1rem;" class="hidden">

```bash
apptainer pull dftbplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus.sif:latest
```

</div>
<div id="content-option19B" class="hidden">

```bash
apptainer pull xtb.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb-from-guix.sif:test
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
