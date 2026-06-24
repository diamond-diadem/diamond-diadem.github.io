---
title: NDM
title_visible: false
linkTitle: NDM
icon: icon-ndm
toc: false
weight: 21
---

<a href="https://github.com/jpcroc/NDM" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-ndm" aria-hidden="true"></span>
</a>

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull ndm.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ndm.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ndm
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">

**NDM** (Notre Dynamique Moléculaire) est un code de dynamique moléculaire (MD) développé au CEA Saclay/SRMP et hébergé sur [Github](https://github.com/jpcroc/NDM/).

Le code est adapté aux conditions aux limites périodiques en 3D (bien qu’il puisse fonctionner avec des conditions aux limites périodiques de niveau inférieur). Les potentiels natifs incluent les potentiels EAM et les potentiels de paire, avec ou sans interactions de charge coulombiennes. Ces dernières peuvent être traitées par des sommations d’Ewald ou de Wolf. Les potentiels de Tersoff, Stillinger-Weber et Ju Li ZrC sont également inclus, mais ne sont plus maintenus. Une interface est intégrée pour utiliser **LAMMPS** comme moteur de force et d’énergie, donnant accès à tous les potentiels disponibles dans ce code. Une interface similaire est en cours de développement pour le code ML **Milady**.

**NDM** inclut les algorithmes de dynamique moléculaire standard : Verlet, Velocity Verlet, Parinnello-Rahman, ainsi que divers schémas à température constante (Nose, Nose-Hoover, Berendsen, Langevin). Il permet également d’effectuer des « simulations de particules à contrainte adaptative » avec des potentiels de paire ou EAM. Les méthodes NEB et NEB ascendant sont incluses, ainsi qu’une matrice de force pour les phonons (au point gamma), la méthode Monte-Carlo par chemin pour les potentiels chimiques et les calculs d’accumulation de défauts ponctuels.

Le code est parallélisé en MPI. La parallélisation du code repose sur une décomposition de domaine. Des niveaux de parallélisation plus élevés sont implémentés, par exemple par images pour les calculs NEB.

**NDM** est écrit en Fortran, principalement au niveau de la norme 2003 (classes, etc.). **NDM** n’est pas conçu pour remplacer des codes bien connus et plus stables tels que **LAMMPS**. Il offre toutefois un cadre permettant de tester et de développer de nouveaux algorithmes au sein d'un code Fortran moderne.


</div>

### Contenu principal de l'image

Exécutable **NDM** : `/bin/rundm90_ndm_mpi`

L'image **NDM** est compilée avec la librairie **MKL** distribuée par Intel et le compilateur **GNU**.

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/ndm" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation NDM</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://github.com/jpcroc/NDM" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://github.com/jpcroc/NDM" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/ndm-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}
