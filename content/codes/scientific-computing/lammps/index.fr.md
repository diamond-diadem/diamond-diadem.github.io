---
title: LAMMPS
linkTitle: LAMMPS
icon: icon-lammps
toc: false
weight: 1
description: "LAMMPS est un simulateur de dynamique moléculaire massivement parallèle pour les simulations atomistiques, disponible en conteneur sur DIAMOND."
website: "https://www.lammps.org/"
---

### Récupérez l'image de conteneur

**Image générique pour CPU**

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull lammps.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps
```
{{< /tab >}}
{{< /tabs >}}

**Image pour Kraken-GPU (Gricad)**

```bash
apptainer pull lammps-gpu.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps-gpu.sif:latest
```

LAMMPS, qui signifie "Large-scale Atomic/Molecular Massively Parallel Simulator" (simulateur atomique/moléculaire à grande échelle massivement parallèle), est un logiciel open source puissant et polyvalent conçu pour réaliser des simulations de dynamique moléculaire. Développé au laboratoire national Sandia, LAMMPS a acquis une grande popularité dans la communauté scientifique en raison de sa capacité à modéliser divers matériaux et systèmes au niveau atomique et moléculaire.

LAMMPS est particulièrement adapté pour simuler des phénomènes physiques complexes tels que les matériaux à l'état solide, les liquides, les polymères, les systèmes biologiques, et bien plus encore. Sa force réside dans sa scalabilité, permettant de paralléliser efficacement les simulations sur un grand nombre de processeurs, rendant possible l'étude de systèmes contenant des millions à des milliards de particules.

Le logiciel prend en charge une large gamme de potentiels interatomiques et de champs de force, permettant aux chercheurs de capturer avec précision les interactions entre les particules dans différents matériaux. De plus, LAMMPS offre un cadre flexible et extensible, permettant aux utilisateurs d'implémenter des modèles et des algorithmes personnalisés adaptés à leurs besoins de recherche spécifiques.

Le [site web de LAMMPS](https://www.lammps.org/) offre une variété d'informations à propos du code. Cela inclut des liens vers une version en ligne de [son manuel](https://docs.lammps.org/Manual.html), un [forum en ligne](https://www.lammps.org/forum.html), où les utilisateurs peuvent poster des questions et échanger au sujet de LAMMPS, et un [dépôt GitHub](https://github.com/lammps/lammps) où l'ensemble du développement de LAMMPS est coordonné.

## Tutoriel

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/lammps" icon="tabler-icons/outline/package" class="mb-0" >}}

## Documentation LAMMPS

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://lammps.org" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://docs.lammps.org" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Exemples

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/lammps-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
