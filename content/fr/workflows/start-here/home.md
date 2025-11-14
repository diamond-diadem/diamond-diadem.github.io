---
title: WORKFLOWS
linkTitle: Workflows
weight: 1
toc: false
---

<div align="justify" class="mt-4">

En science des matériaux, les calculs manipulent fréquemment une quantité significative de données, qui doit être stockée de manière ordonnée et organisée pour en assurer l'accessibilité et la praticité d'utilisation. En parallèle, le coût numérique de ces mêmes calculs entraîne des temps d'exécution relativement longs pour atteindre des critères (de convergence, d'équilibre, ...) qui garantissent la fiablilité des résultats. Comme il n'est pas toujours possible d'exécuter un calcul très long en une seule fois, il est parfois nécessaire de les redémarrer à partir d'un état sauvegardé.

Ces deux processus - la manipulation des données d'entrée sortie et la gestion des exécutions individuelles des différents codes - sont souvent fastidieux. Usuellement, ces manipulations requièrent une intervention humaine, avec une gestion manuelle des états d'exécution et des données. En assurer la traçabilité complète, indispensable à l'heure de la science reproductible, est à la fois exigeant et chronophage. De plus, la part exploratoire de toute activité de recherche s'accompagne par essence d'itérations successives, avec chacune un risque d'erreur et la répétition peu stimulante de tâches similaires.

Afin de répondre à ces problématiques, l'automatisation constitue une solution intéressante : automatiser et régulariser le processus de génération et d'analyse des données le rend à la fois plus facile à gérer et plus reproductible. Cette automatisation des _flux de travail_ (**workflows**) peut prendre plusieurs formes : la plus simple repose sur l'utilisation d'outils de programmation système (scripts _Python_ ou _bash_) pour gérer le transfert de données, l'exécution successive de programmes, l'édition de fichiers d'entrée ou l'analyse des fichiers de sortie. Plus récemment, nous avons assisté à l'émergence d'outils spécifiquement dédiés à cette tâche. Ces **workflow managers** offrent des fonctionnalités avancées, comme la gestion automatique du redémarrage de calculs, l'orchestration d'unités d'exécutions sur des machines distantes, la construction de graphes de provenance assurant une traçabilité exhaustive de toutes les données ou encore un haut niveau d'abstraction permettant d'automatiser l'écriture de fichiers d'entrée complexes et facilitant le basculement d'un code à un autre.

Pour résumer, des workflows bien conçus permettent non seulement de gagner du temps, mais aussi de réduire le risque d'erreur humaine, augmentant ainsi la fiabilité des données produites. Voici quelques développements réalisés sur la plateforme dans cette direction.

</div>

<div align="center"><h2>Workflows disponibles</h2></div>

- ### simple-adsorption-workflow

  Programme conteneurisé pour l'étude de l'adsorption dans les matériaux poreux

  - [Description](/workflows/saw/description)
  - [Tutoriel](/workflows/saw/tutorial)
- ### aiida-n2p2-workflow
  In mlip we have n2p2-workflow
  - [Description](/workflows/aiida-n2p2/description_fr)
  - [Installation](/workflows/aiida-n2p2/installation_fr)
  - [Benchmark](/workflows/aiida-n2p2/benchmark_fr)
- ### NUMODIS+LAMMPS-workflow
  
  - [Description](/workflows/numodis-lammps/description)
  - [Installation](/workflows/numodis-lammps/installation)
  - [Benchmark](/workflows/numodis-lammps/benchmark)

  - ### MOFlearning-workflow
  
  - [Description](/workflows/moflearning/description)
  - [Installation](/workflows/moflearning/installation)
  - [Benchmark](/workflows/moflearning/benchmark)

  - ### Quantum espresso -workflow
  
  - [Description](/workflows/quantum-espresso/description)
  - [Installation](/workflows/quantum-espresso/installation)
  - [Benchmark](/workflows/quantum-espresso/benchmark)

  - ### VASP-workflow
  
  - [Description](/workflows/vasp/description)
  - [Installation](/workflows/vasp/installation)
  - [Benchmark](/workflows/vasp/benchmark)