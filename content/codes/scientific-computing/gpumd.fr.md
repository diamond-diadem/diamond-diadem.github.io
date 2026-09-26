---
title: GPUMD
title_visible: false
linkTitle: GPUMD
icon: icon-gpumd
weight: 23
description: "GPUMD est un code de dynamique moléculaire générique entièrement implémenté pour les processeurs graphiques (GPU), disponible sur DIAMOND."
---

<a href="https://gpumd.org/dev/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
  <span class="logo-gpumd" aria-hidden="true"></span>
</a>

## Récupérez l'image de conteneur

```bash
apptainer pull gpumd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

**GPUMD** (Graphics Processing Units Molecular Dynamics), est un logiciel de dynamique moléculaire polyvalent et hautement performant, entièrement implémenté pour les processeurs graphiques (GPU). Il permet d'entraîner et d'utiliser des « potentiels de neuroévolution » (NEP), une classe de potentiels issus de l'apprentissage automatique (MLP).

Nombreux [potentiels NEP sont déjà publiés](https://gitlab.com/brucefan1983/nep-data), ainsi que leurs données d'entraînement et de test associées.

## Tutoriel

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/gpumd" icon="tabler-icons/outline/package" class="mb-0" >}}

## Documentation GPUMD

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://github.com/brucefan1983/GPUMD" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://gpumd.org/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

## Exemples

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/gpumd-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
