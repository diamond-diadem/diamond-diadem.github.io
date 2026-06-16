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

### Récupérez le conteneur

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

**NDM** est un code de calcul **distribué** en Fortran pour la dynamique moléculaire en potentiels empiriques.

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
