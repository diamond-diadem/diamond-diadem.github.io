---
title: Wannier90
linkTitle: Wannier90
icon: icon-wannier90
toc: false
weight: 13
description: "Wannier90 calcule les fonctions de Wannier à localisation maximale pour les propriétés électroniques des matériaux, disponible sur DIAMOND."
website: "https://wannier.org/"
---

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull wannier90.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/wannier90.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/wannier90
```
{{< /tab >}}
{{< /tabs >}}

**Wannier90** est un logiciel de calcul conçu pour la génération et la manipulation efficace des fonctions de Wannier maximales localisées (MLWF) en physique de la matière condensée. Il offre un cadre polyvalent pour interpoler des structures de bande, calculer des propriétés électroniques et étudier les comportements électroniques des matériaux avec une grande précision. Ce logiciel est souvent utilisé comme un outil de post-traitement en combinaison avec des codes de structure électronique ab initio tels que Quantum ESPRESSO, VASP ou Abinit. Wannier90 est adapté à des systèmes complexes, qu'il s'agisse de métaux, d'isolants ou de matériaux topologiques, et prend en charge des calculs à petite comme à grande échelle. Son architecture modulaire et open-source garantit une grande adaptabilité et encourage les contributions actives de la communauté de recherche.

## Tutoriel

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/wannier90" icon="tabler-icons/outline/package" class="mb-0" >}}

## Documentation Wannier90

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://wannier.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://wannier.org/support/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Exemples

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/wannier90-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" >}}