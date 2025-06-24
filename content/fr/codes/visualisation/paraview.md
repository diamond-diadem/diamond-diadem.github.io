---
title: ParaView
title_visible: false
linkTitle: ParaView
icon: icon-paraview
toc: false
weight: 2
---

<a href="https://www.paraview.org/" target="_blank" class="codes-pages-top-logo">
    <img alt="ParaView" class="logo-paraview"/>
</a>

### Récupérez l'image Apptainer

```bash
apptainer pull paraview.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview.sif:latest
```

<div align="justify">

ParaView est un logiciel open-source dédié à la visualisation et à l'analyse de données scientifiques. Il offre une plateforme puissante pour la visualisation 3D, la manipulation de jeux de données volumineux et la création d'images interactives. Développé principalement pour les applications en ingénierie, physique et sciences de la terre, ParaView prend en charge divers formats de données, notamment les maillages, les nuages de points et les ensembles de données structurées.

Ce logiciel repose sur une architecture modulaire, ce qui permet aux utilisateurs de personnaliser leurs flux de travail en intégrant des modules et des extensions spécifiques à leurs besoins. ParaView offre des outils avancés de filtrage, de rendu et d'analyse, facilitant l'exploration approfondie des données complexes. Il est compatible avec plusieurs systèmes d'exploitation et peut être utilisé aussi bien pour des applications de recherche académique que pour des projets industriels nécessitant une visualisation scientifique sophistiquée.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/paraview" icon="tabler-icons/outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation ParaView</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://www.paraview.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://www.paraview.org/resources/" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/paraview-tutorial-inputs.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
