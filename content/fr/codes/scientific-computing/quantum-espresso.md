---
title: Quantum ESPRESSO
title_visible: false
linkTitle: Quantum ESPRESSO
icon: icon-quantum-espresso
toc: false
weight: 2
---

<a href="https://www.quantum-espresso.org/" target="_blank" class="codes-pages-top-logo">
    <img alt="Quantum ESPRESSO" class="logo-quantum-espresso">
</a>

### Récupérez l'image Apptainer

```bash
apptainer pull quantum-espresso.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/quantum-espresso.sif:latest
```

<div align="justify">

Quantum ESPRESSO est un logiciel de calcul de structure électronique basé sur la théorie de la fonctionnelle de la densité (DFT) et la théorie de la perturbation électronique. Il est conçu pour effectuer des simulations de propriétés électroniques et structurales de systèmes atomiques et moléculaires. Quantum ESPRESSO offre une suite complète d'outils pour étudier les matériaux à l'échelle atomique, notamment les cristaux, les surfaces et les nanostructures.

Le logiciel prend en charge une variété de méthodes de calcul, telles que la méthode des ondes planes, la méthode de Monte Carlo quantique, et les méthodes basées sur la DFT. Il permet aux chercheurs de modéliser et d'analyser les propriétés électroniques, les forces et les énergies associées aux systèmes étudiés. Quantum ESPRESSO est fréquemment utilisé dans la recherche en physique de la matière condensée, en chimie théorique et en science des matériaux pour comprendre et prédire le comportement des matériaux à l'échelle quantique. Il s'adresse principalement aux scientifiques et aux chercheurs travaillant dans le domaine de la simulation et de la modélisation quantique.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Apprenez à utiliser cette image de conteneur" href="/documentation/by-container/quantum-espresso" icon="outline/package" class="mb-0" >}}

<h3 class="mb-1 mt-3">Documentation Quantum ESPRESSO</h3>

{{< card-grid >}}
{{< link-card title="Site officiel" href="https://www.quantum-espresso.org/" target="_blank" icon="outline/world-www" class="mb-0" >}}
{{< link-card title="Documentation officielle" href="https://www.quantum-espresso.org/documentation/" target="_blank" icon="outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/qe-tutorial-inputs.tar.gz" icon="outline/file-export" class="mb-0" >}}
