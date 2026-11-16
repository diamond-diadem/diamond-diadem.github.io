---
title: GROMACS
linkTitle: GROMACS
icon: icon-gromacs
toc: false
weight: 24
description: "GROMACS est un logiciel polyvalent permettant de réaliser des simulations de dynamique moléculaire, disponible en conteneur sur DIAMOND."
website: "https://gromacs.org/"
---

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull gromacs.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs.sif:latest
# ou si vous voulez accélération CUDA
#apptainer pull gromacs-cuda.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs-cuda.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs
# ou si vous voulez accélération CUDA
#docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs-cuda
```
{{< /tab >}}
{{< /tabs >}}

**GROMACS** est un **logiciel polyvalent permettant de réaliser des simulations de dynamique moléculaire**, c'est-à-dire de simuler les équations newtoniennes du mouvement pour des systèmes comportant des centaines à des millions de particules ; il s'agit d'un projet porté par la communauté. Il est principalement conçu pour les molécules biochimiques telles que les protéines, les lipides et les acides nucléiques, qui présentent de nombreuses interactions de liaison complexes ; toutefois, comme GROMACS est extrêmement rapide pour le calcul des interactions non liées (qui dominent généralement les simulations), de nombreux groupes l'utilisent également pour la recherche sur des systèmes non biologiques, par exemple les polymères et la dynamique des fluides.

## Tutoriel

{{< link-card title="Contenu à venir" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

## Documentation GROMACS

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://www.gromacs.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://manual.gromacs.org/current/index.html" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Exemples

{{< link-card title="Contenu à venir" description="<i>Téléchargez des fichiers d'entrée</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
