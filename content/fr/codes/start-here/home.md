---
title: CODES CONTENEURISÉS
linkTitle: Accueil
googleIcon: home
toc: false
---

{{< callout context="note" title="" icon="info-circle" >}}

Dans cette section, vous pourrez télécharger les images Apptainer des codes disponibles sur le site. De calcul scientifique comme de visualisation de données.

{{< /callout >}}

{{< callout context="tip" title="" icon="question-mark" >}}

Mais pour commencer, si vous n'êtes pas encore passé par cette étape et si vous n'êtes pas familiers avec l'utilisation d'Apptainer, suivez les liens ci-dessous pour apprendre comment installer Apptainer et interagir avec des images.

{{< /callout >}}

<h3><u>LIENS UTILES :</u></h3>

- <h4><a href="/documentation/install-apptainer/howto/">Installez Apptainer</a></h4>
- <h4><a href="/documentation/use-apptainer-image/howto/">Apprenez comment utiliser un conteneur</a></h4>

<h3><u>CODES DISPONIBLES :</u></h3>

<!-- | Calcul scientifique                              | Visualisation                           |
| ------------------------------------------------ | --------------------------------------- |
| [<i class="icon-lammps"></i>LAMMPS](/codes/scientific-computing/lammps/) | [<i class="icon-ovito"></i>Ovito](/codes/visualisation/ovito/) |
| [<i class="icon-quantum-espresso"></i>Quantum ESPRESSO](/codes/scientific-computing/quantum-espresso/) | [<i class="icon-paraview"></i>ParaView](/codes/visualisation/paraview/) | -->

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
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/opencalphad/"><i class="icon-opencalphad"></i>OpenCalphad</a></td>
            <td></td>
        </tr>
        <tr>
            <td><a href="/codes/scientific-computing/neper/"><i class="icon-neper"></i>Neper</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

<h3> Raccourci : choississez votre code et obtenez la commande Apptainer pour le récupérer</h3>

{{< tabs "retrieve-apptainer-image" >}}
{{< tab "LAMMPS" >}}

```bash
# PULL
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```

{{< /tab >}}
{{< tab "Quantum ESPRESSO" >}}

```bash
# PULL
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

{{< /tab >}}
{{< tab "Abinit" >}}

```bash
# PULL
apptainer pull abinit.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/abinit.sif:latest
```

{{< /tab >}}
{{< tab "Z-set" >}}

```bash
# PULL
apptainer pull z-set.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/z-set.sif:latest
```

{{< /tab >}}
{{< tab "FreeFEM" >}}

```bash
# PULL
apptainer pull freefemplusplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/freefemplusplus.sif:latest
```

{{< /tab >}}
{{< tab "OpenCalphad" >}}

```bash
# PULL
apptainer pull opencalphad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/opencalphad.sif:latest
```

{{< /tab >}}
{{< tab "Neper" >}}

```bash
# PULL
apptainer pull neper.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/neper.sif:latest
```

{{< /tab >}}
{{< tab "Ovito" >}}

```bash
# PULL
apptainer pull ovito.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ovito.sif:latest
```

{{< /tab >}}
{{< tab "ParaView" >}}

```bash
# PULL
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

{{< /tab >}}
{{< tab "VESTA" >}}

```bash
# PULL
apptainer pull vesta.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vesta.sif:latest
```

{{< /tab >}}
{{< tab "VMD" >}}

```bash
# PULL
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vmd.sif:latest
```

{{< /tab >}}
{{< /tabs >}}
