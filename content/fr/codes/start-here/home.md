---
title: CODES CONTENEURISÉS
linkTitle: Accueil
tablerIcon: "tabler-icons/outline/home"
toc: false
---

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Dans cette section, vous pourrez télécharger les images Apptainer des codes disponibles sur le site. De calcul scientifique comme de visualisation de données.

{{< /callout >}}

{{< callout context="tip" title="" icon="tabler-icons/outline/question-mark" >}}

Mais pour commencer, si vous n'êtes pas encore passé par cette étape et si vous n'êtes pas familier avec l'utilisation d'Apptainer, suivez les liens ci-dessous pour apprendre comment installer Apptainer et interagir avec des images.

{{< /callout >}}

<div align="justify">

Pendant l'été 2023, la communauté des matériaux a été sondée via LimeSurvey pour identifier des habitudes de travail. Cela a notamment permis de mettre en lumière un certains nombres de codes utilisés, aussi bien pour le calcul que pour la visualisation (cf ci-dessous). À l'heure actuelle, quasiment $40\%$ des codes cités par la communauté ont été conteneurisés et/ou packagés, couvrant l'ensemble des échelles physiques.

</div>

<img alt="containerised codes" class="containerised-codes fr mt-4" style="width:100%">

<h3><u>LIENS UTILES</u></h3>

{{< link-card
  title="Installez Apptainer"
  description="Profitez de notre tutoriel"
  href="/documentation/install/install-apptainer/"
  icon="custom/apptainer"
>}}

{{< link-card
  title="Images de conteneurs"
  description="Apprenez à les utiliser"
  href="/documentation/use/apptainer-image/"
  icon="tabler-icons/outline/settings-question"
>}}

<h3><u>CODES DISPONIBLES</u></h3>

<table>
    <caption>
        Et plus à venir !
    </caption>
    <thead>
        <tr>
            <th class="table-cell-left" scope="col">Calcul Scientifique</th>
            <th scope="col">Visualisation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="table-cell-left"><a href="/codes/scientific-computing/lammps/"><i class="icon-lammps"></i>LAMMPS</a></td>
            <td><a href="/codes/visualisation/ovito/"><i class="icon-ovito"></i>Ovito</a></td>
        </tr>
        <tr>
            <td class="table-cell-left"><a href="/codes/scientific-computing/quantum-espresso/"><i class="icon-quantum-espresso"></i>Quantum ESPRESSO</a></td>
            <td><a href="/codes/visualisation/paraview/"><i class="icon-paraview"></i>ParaView</a></td>
        </tr>
        <tr>
            <td class="table-cell-left"><a href="/codes/scientific-computing/abinit/"><i class="icon-abinit"></i>Abinit</td>
            <td><a href="/codes/visualisation/vesta/"><i class="icon-vesta"></i>VESTA</a></td>
        </tr>
        <tr>
            <td class="table-cell-left"><a href="/codes/scientific-computing/z-set/"><i class="icon-z-set"></i>Z-set</td>
            <td><a href="/codes/visualisation/vmd/"><i class="icon-vmd"></i>VMD</a></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/freefem/"><i class="icon-freefem"></i>FreeFEM</a></td>
            <td><a href="/codes/visualisation/xcrysden/"><i class="icon-xcrysden"></i>XCrySDen</a></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/opencalphad/"><i class="icon-opencalphad"></i>OpenCalphad</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/neper/"><i class="icon-neper"></i>Neper</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/plumed/"><i class="icon-plumed"></i>PLUMED</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/gmsh/"><i class="icon-gmsh"></i>Gmsh</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/zeo++/"><i class="icon-zeoplusplus"></i>Zeo++</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/raspa2/"><i class="icon-raspa2"></i>RASPA2</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/opendis/"><i class="icon-opendis"></i>Open-DIS</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

<h3>{{< inline-svg src="tabler-icons/outline/table-shortcut" class="svg-inline-shortcut">}}Raccourci : choississez votre code et récupérez-le avec Apptainer</h3>
<select class="form-select" id="options">
    <optgroup>
        <option value="option0">-- Sélectionnez --</option>
    </optgroup>
    <optgroup label="Calcul Scientifique">
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
        <option value="option12">Open-DIS</option>
    </optgroup>
    <optgroup label="Visualisation">
        <option value="optiona">Ovito</option>
        <option value="optionb">ParaView</option>
        <option value="optionc">Vesta</option>
        <option value="optiond">VMD</option>
        <option value="optione">XCrySDen</option>
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
<div id="content-option12" class="hidden">

```bash
apptainer pull opendis.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opendis-from-guix.sif:latest
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
<div id="content-optione" class="hidden">

```bash
apptainer pull xcrysden.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xcrysden.sif:latest
```

</div>
