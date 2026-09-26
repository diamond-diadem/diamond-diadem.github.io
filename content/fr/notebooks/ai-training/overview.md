---
title: "Découvrir les notebooks IA pour la science des matériaux"
linkTitle: Vue d'ensemble
weight: 1
toc: true
aliases:
  - /documentation/by-session/diamond-ga-2026/
description: "Notebooks pédagogiques pour appliquer pas à pas des méthodes d'IA aux données matériaux, de la qualité des données à l'optimisation bayésienne."
---

<div align="justify">

Ces notebooks constituent un support de formation (version 1.0). Ils illustrent un enchaînement pratique, de la compréhension des données expérimentales à la construction de modèles prédictifs, jusqu'à l'exploration d'approches plus avancées. Ils sont conçus comme un point de départ, à adapter à vos propres données matériaux. Les résultats dépendent de la qualité et de la taille du jeu de données, et les choix présentés sont des repères plutôt que des règles universelles.

La plupart des notebooks contiennent les explications et les consignes nécessaires pour comprendre et exécuter l'enchaînement proposé. Vous pouvez les suivre comme un parcours complet, ou ouvrir directement un notebook particulier si une étape ou une méthode vous intéresse.

</div>

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

Pour effectuer ce tutoriel, il vous faudra au choix :

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- **OU** avoir installé **Docker**
- **OU** avoir installé **Python 3.10+** avec **uv** ainsi que **Graphviz** (plus d'informations sur comment les installer dans le tutoriel).

{{< /callout >}}

## L'enchaînement global

<div align="justify">

L'enchaînement global est illustré ci-dessous. Les premières étapes portent sur la qualité et la compréhension des données ; les branches suivantes introduisent la prédiction, la réutilisation de modèles, la découverte causale et l'optimisation bayésienne. Les cases bleues sont les étapes de l'enchaînement et les cases jaunes les applications. Le schéma fait aussi apparaître une étape optionnelle d'augmentation de données, qui n'est pas traitée dans ce guide.

</div>

<img alt="Enchaînement global des notebooks IA pour les matériaux, du jeu de données au profilage et au prétraitement, puis vers l'analyse, la prédiction, la découverte causale et l'optimisation bayésienne" src="/images/notebooks/ai-training/workflow-overview.png" />

## Un parcours possible

1. **Profiler** les données pour comprendre leurs caractéristiques et repérer d'éventuels problèmes de qualité.
2. **Prétraiter** les données en identifiant les valeurs manquantes, les doublons et les valeurs aberrantes, puis exporter un jeu de données traité.
3. **Analyser** la structure des données, ou **prédire** une propriété d'un matériau à l'aide d'un modèle.
4. **Aller plus loin** avec le cas des nanocristaux de CdSe : exploration de modèles, découverte causale et optimisation des expériences.

<div align="justify">

Les notebooks peuvent être suivis dans cet ordre, mais ils sont aussi conçus pour être utiles indépendamment. Vous pouvez aller directement au notebook qui correspond à la question que vous souhaitez explorer. Le notebook d'index (`notebooks/index.ipynb`) renvoie vers les principaux notebooks.

</div>

- [Qualité des données](/notebooks/ai-training/data-quality/) : données manquantes et valeurs aberrantes
- [Explorer et comprendre](/notebooks/ai-training/exploration/) : corrélations, réduction de dimension et clustering
- [Prédire une propriété](/notebooks/ai-training/prediction/) : modèles de régression, XGBoost et modèles pré-entraînés
- [Applications : nanocristaux de CdSe](/notebooks/ai-training/cdse-nanocrystals/) : exploration de modèles, découverte causale et optimisation bayésienne

## À propos de cette formation

<div align="justify">

Cette session de formation a été organisée en amont de l'assemblée générale de DIAMOND 2026 à Lyon.

La formation a été construite par Ahmed AMRANI et co-supervisée par Ahmed AMRANI, Jean-Philippe POLI et Léo ORVEILLON.

L'intégralité de son contenu ainsi que les explications pour l'effectuer sont disponibles dans le dépôt du tutoriel : lien ci-dessous.

</div>

{{< link-card title="GitLab : Formation IA" description="Accéder aux notebooks et aux instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
