---
title: xTB
linkTitle: xTB
icon: icon-xtb
weight: 19
description: "xTB est un logiciel de chimie quantique semi-empirique basé sur la méthode GFN-xTB de liaisons serrées, disponible en conteneur Apptainer sur DIAMOND."
website: "https://github.com/grimme-lab/xtb"
---

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull xtb.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb
```
{{< /tab >}}
{{< /tabs >}}

**xTB** est un logiciel open source de calcul scientifique conçu pour effectuer des simulations atomistiques dans le domaine de la chimie quantique. Il peut notamment être utilisé pour l'optimisation de géométrie ou de la dynamique moléculaire. xTB est paramétré pour une grande partie du tableau périodique, jusqu'au Radon (Rn, Z=86).

## Tutoriel

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/xtb" icon="tabler-icons/outline/package" class="mb-0" >}}

## Documentation xTB

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://github.com/grimme-lab/xtb" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://xtb-docs.readthedocs.io/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Exemples

{{< link-card title="Contenu à venir" description="<i>Téléchargez des fichiers d'entrée</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
