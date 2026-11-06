---
title: GROMACS
title_visible: false
linkTitle: GROMACS
icon: icon-gromacs
toc: false
weight: 16
description: "GROMACS est un logiciel polyvalent permettant de réaliser des simulations de dynamique moléculaire, disponible en conteneur sur DIAMOND."
---

<a href="https://gromacs.org/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
    <span class="logo-gromacs" aria-hidden="true"></span>
</a>

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull gromacs.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs.sif:latest
# ou si vous voulez accélération CUDA
#apptainer pull gromacs.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gromacs-cuda.sif:latest
```
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

<div align="justify">

**GROMACS** est un **logiciel polyvalent permettant de réaliser des simulations de dynamique moléculaire**, c'est-à-dire de simuler les équations newtoniennes du mouvement pour des systèmes comportant de centaines à des millions de particules ; il s'agit d'un projet porté par la communauté. Il est principalement conçu pour les molécules biochimiques telles que les protéines, les lipides et les acides nucléiques, qui présentent de nombreuses interactions de liaison complexes ; toutefois, comme GROMACS est extrêmement rapide pour le calcul des interactions non liées (qui dominent généralement les simulations), de nombreux groupes l'utilisent également pour la recherche sur des systèmes non biologiques, par exemple les polymères et la dynamique des fluides.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Contenu à venir" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0">}}

<h3 class="mb-1 mt-3">Documentation GROMACS</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://gromacs.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://manual.gromacs.org/current/index.html" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Contenu à venir" description="<i>Téléchargez des fichiers d'entrée</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
