---
title: PLUMED
title_visible: true
linkTitle: PLUMED
icon: icon-plumed
toc: false
weight: 8
---

<div class="codes-pages-top-logo">

<a href="https://www.plumed.org/" target="_blank" class="codes-pages-top-logo mb-0">
    <img alt="PLUMED" class="logo-plumed">
</a>

<h3 style="font-weight: 500;" align="center">The community-developed PLUgin for MolEcular Dynamics</h3>

</div>

<hr>

### Récupérez l'image Apptainer

```bash
apptainer pull plumed.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/plumed.sif:latest
```

<div align="justify">

Plumed est une bibliothèque open-source, hautement flexible, spécialement conçue pour améliorer les simulations de dynamique moléculaire (MD) et Monte Carlo (MC). Il constitue un outil puissant pour les chercheurs en chimie computationnelle, biophysique et science des matériaux, leur permettant d'intégrer une variété de techniques d'échantillonnage avancées dans leurs simulations. Plumed s'intègre parfaitement avec de nombreux moteurs de MD, tels que GROMACS, NAMD, LAMMPS et AMBER, entre autres, ce qui en fait un choix polyvalent pour des applications de recherche variées.

La fonctionnalité principale de Plumed repose sur le calcul et la manipulation de variables collectives, essentielles pour caractériser l'état d'un système moléculaire. Ces variables peuvent être utilisées pour appliquer diverses techniques de biais, telles que la métadynamique, l'échantillonnage par parapluie et la dynamique moléculaire dirigée, permettant ainsi l'exploration des paysages d'énergie libre et l'étude d'événements rares.

Plumed est également équipé d'un ensemble complet d'outils d'analyse permettant le post-traitement des données de simulation. Cela inclut le calcul de surfaces d'énergie libre, de coordonnées de réaction, ainsi que de diverses propriétés thermodynamiques. L'architecture modulaire du logiciel permet aux utilisateurs de personnaliser et d'étendre ses capacités en ajoutant de nouvelles variables collectives, des méthodes de biais ou en l'intégrant à d'autres logiciels.

En outre, Plumed prend en charge une interface de script qui permet aux utilisateurs de configurer et de contrôler des protocoles de simulation complexes, automatisant ainsi le flux de travail et réduisant le risque d'erreur humaine. Le développement communautaire de Plumed assure des mises à jour et des améliorations continues, soutenu par une documentation exhaustive et une communauté d'utilisateurs robuste qui facilite le dépannage et le partage de connaissances.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Contenu à venir" description="<i>Apprenez à utiliser cette image de conteneur</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true">}}

<h3 class="mb-1 mt-3">Documentation PLUMED</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://www.plumed.org/" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://www.plumed.org/doc" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Contenu à venir" description="<i>Téléchargez des fichiers d'entrée</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}
