---
title: CONTAINERIZED CODES
linkTitle: Home
toc: false
---

{{< callout context="note" title="" icon="info-circle" >}}

In this section, you will be able to download Apptainer images for codes available on this website. For scientific computing as well as data visualisation

{{< /callout >}}

{{< callout context="tip" title="" icon="question-mark" >}}

But to begin with, if you haven't gone through this step yet and if you're not familiar with using Apptainer, follow the links below to learn how to install Apptainer and interact with images.

{{< /callout >}}

<h3><u>USEFUL LINKS :</u></h3>

- <h5><a href="/en/documentation/install-apptainer/howto/">Install Apptainer</a></h5>
- <h5><a href="/en/documentation/use-apptainer-image/howto/">Learn how to use a container</a></h5>

<h3><u>AVAILABLE CODES:</u></h3>  

<!-- | Scientific computing                              | Visualisation                           |
| ------------------------------------------------ | --------------------------------------- |
| [<i class="icon-lammps"></i>LAMMPS](/en/codes/scientific-computing/lammps/) | [<i class="icon-ovito"></i>Ovito](/en/codes/visualisation/ovito/) |
| [<i class="icon-quantum-espresso"></i>Quantum ESPRESSO](/en/codes/scientific-computing/quantum-espresso/) | [<i class="icon-paraview"></i>ParaView](/en/codes/visualisation/paraview/) | -->

<table>
    <!-- <caption>
        Pages des codes disponibles sous forme d'images de conteneurs
    </caption> -->
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
            <td></td>
            <td><a href="/en/codes/visualisation/vmd/"><i class="icon-vmd"></i>VMD</a></td>
        </tr>
    </tbody>
</table>

<h3> Shortcut : choose your code and get the Apptainer command to retrieve it</h3>

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
apptainer pull vmd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/vvmd.sif:latest
```

{{< /tab >}}
{{< /tabs >}}
