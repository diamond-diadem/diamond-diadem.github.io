---
title: PtyRAD
title_visible: true
linkTitle: PtyRAD
toc: false
weight: 23
---

### Récupérez l'image de conteneur

{{< tabs "apptainer_docker" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull ptyrad.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ptyrad-cuda.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/ptyrad-cuda
```
{{< /tab >}}
{{< /tabs >}}

<div align="justify">


PtyRAD effectue une reconstruction ptychographique à l'aide d'un cadre de différentiation automatique (AD) basé sur PyTorch, permettant une mise en œuvre flexible et efficace de l'optimisation par descente de gradient.


PtyRAD intègre diverses fonctionnalités dans la reconstruction, notamment la détection d'objets à états mixtes, la correction de position et la correction de l'inclinaison des objets en fonction de leur position. Il permet également l'interopérabilité avec PtychoShelves (fold_slice) et py4DSTEM. Il fournit en outre un ensemble de fonctions utilitaires destinées à rationaliser le prétraitement des ensembles de données afin de faciliter leur traitement.


PtyRAD prend également en charge le réglage des hyperparamètres et l'exécution sur plusieurs GPU. Parmi les fonctionnalités supplémentaires, on trouve notamment la compilation JIT avec `torch.compile`.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Contenu à venir" description="<i>Apprenez à utiliser cette image de conteneur</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation PtyRAD</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://github.com/chiahao3/ptyrad" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://ptyrad.readthedocs.io/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}


<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Contenu à venir" description="<i>Téléchargez des fichiers d'entrée</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
