---
title: GPUMD
title_visible: false
linkTitle: GPUMD
icon: icon-gpumd
weight: 23
description: "GPUMD est un code de dynamique moléculaire générique, entierement implémenté pour fonctionner sur des processeurs graphiques (GPU)."
---

<a href="https://gpumd.org/dev/" target="_blank" rel="noopener noreferrer" class="codes-pages-top-logo">
  <span class="logo-gpumd" aria-hidden="true"></span>
</a>

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer - H100/H200" >}}
```bash
apptainer pull gpumd.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">


* **GPUMD** est l'abréviation de *Graphics Processing Units Molecular Dynamics*.
* **GPUMD** est un logiciel de dynamique moléculaire polyvalent et hautement performant, entièrement implémenté pour les processeurs graphiques (GPU).
* **GPUMD** permet d'entraîner et d'utiliser une classe de potentiels issus de l'apprentissage automatique (MLP) appelés « potentiels de neuroévolution » (NEP). Consultez ce [dépôt GitLab nep-data](https://gitlab.com/brucefan1983/nep-data) pour découvrir certains des potentiels NEP publiés ainsi que les données d'entraînement et de test associées.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/gpumd" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation GPUMD</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://github.com/brucefan1983/GPUMD" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://gpumd.org/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/gpumd-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
