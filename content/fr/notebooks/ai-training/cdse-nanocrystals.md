---
title: "Applications : nanocristaux de CdSe"
linkTitle: Applications - nanocristaux de CdSe
weight: 5
toc: true
description: "Approches avancées sur les données de nanocristaux de CdSe : prédiction des propriétés optiques, découverte causale et optimisation bayésienne."
---

<div align="justify">

Des notebooks qui illustrent des approches plus avancées sur un cas concret. Ce sont des exemples de démarche, à transposer à vos propres systèmes. Le réentraînement des modèles est possible mais optionnel, et il est décrit à la fin de cette page.

**Les données.** Chaque échantillon relie des paramètres de synthèse à une réponse optique.

</div>

- **Entrées :** `T_external` (température extérieure), `Cd_mM` et `Se_mM` (concentrations des précurseurs), `OA_Cd_ratio` (rapport ligand/métal), `T_reactor` (température de croissance), `t_s` (temps de réaction).
- **Sorties :** `Peak_nm` (pic d'émission, lié à la taille moyenne), `FWHM_nm` (largeur spectrale, liée à l'uniformité) et `height` (intensité).

## Explorer le modèle appris

Notebook : `Use_Learned_Model.ipynb`

<div align="justify">

Charge des modèles pré-entraînés et propose une interface pour explorer leurs prédictions.

</div>

{{< video-file src="/videos/Tuto_IA_Use_Learned_Model_In_MS.mp4" >}}

Étapes :

1. Charger les données et les deux modèles (forêt aléatoire, processus gaussien avec ses normalisations).
2. Choisir le modèle dans le menu.
3. Régler les six paramètres de synthèse avec les curseurs ou les champs numériques.
4. Lire le pic, la largeur et l'intensité prédits, ainsi que le spectre reconstruit sous forme de gaussienne.

**Exemple.** Fixer une combinaison de paramètres, prédire avec la forêt aléatoire puis avec le processus gaussien, et comparer les deux spectres.

<img alt="Prédiction et simulation : curseurs des paramètres de synthèse et spectre de photoluminescence du CdSe prédit, avec son pic, sa largeur, sa hauteur, la classe de taille estimée et l'uniformité" src="/images/notebooks/ai-training/cdse-spectrum-prediction.png" />

## Découvrir des relations causales

Notebook : `Causal_Discovery_Force.ipynb`

<div align="justify">

Une démonstration de découverte causale avec l'algorithme PC (Peter–Clark), à partir de données observationnelles.

</div>

{{< video-file src="/videos/Tuto_IA_Causal_Discovery_In_MS.mp4" >}}

<img alt="Graphe causal découvert dans les données CdSe : les six paramètres de synthèse et les arêtes qui les relient au pic, à la largeur et à la hauteur de l'émission" src="/images/notebooks/ai-training/causal-discovery-graph.png" />

Étapes :

1. Charger les données (`CdSe_PL.csv` par défaut).
2. Étiqueter les variables : entrées, cibles ou ignorées. Sans action de votre part, les entrées par défaut sont les six paramètres de synthèse et les sorties sont le pic, la largeur et l'intensité.
3. Sous-échantillonner le jeu de données, avec une graine fixée pour la reproductibilité.
4. Définir vos connaissances a priori : une propriété ne peut pas influencer un paramètre de synthèse, les paramètres sont supposés indépendants entre eux, et les propriétés ne s'influencent pas mutuellement.
5. Choisir le test d'indépendance, Fisher Z (linéaire) ou KCI (non linéaire), et exécuter l'algorithme avec un seuil de 0,05.
6. Lire le graphe : l'épaisseur d'une arête suit sa force, sa couleur suit sa significativité, avec la p-valeur de chaque lien.

**Exemple.** Comparer les graphes obtenus avec Fisher Z et avec KCI pour voir quels liens dépendent de l'hypothèse de linéarité.

{{< callout context="caution" title="Un graphe est une hypothèse" icon="tabler-icons/outline/alert-triangle" >}}

Un graphe obtenu à partir de données observationnelles est une hypothèse à confronter aux connaissances du domaine, et non une preuve de causalité.

{{< /callout >}}

## Optimiser les expériences par optimisation bayésienne

Notebook : `Bayesian_Optimization_interactive_short.ipynb`

<div align="justify">

Illustre le principe de l'optimisation bayésienne : un processus gaussien propose les prochaines conditions à tester et se met à jour avec les mesures. Il se prête aussi bien à l'enseignement qu'à l'expérimentation.

</div>

{{< video-file src="/videos/Tuto_IA_Bayesian_Optimization_in_MS_V2.mp4" >}}

<img alt="Prédiction d'un processus gaussien sur deux paramètres de synthèse, avec la moyenne prédite en carte de couleurs, l'incertitude en courbes de niveau pointillées, les points d'entraînement et le point courant des curseurs" src="/images/notebooks/ai-training/bayesian-optimization-uncertainty.png" />

Étapes :

1. Choisir un fichier CSV, puis sélectionner les variables d'entrée et la cible.
2. Définir, à l'aide des curseurs, les bornes de chaque variable : les propositions restent à l'intérieur de ces bornes.
3. Entraîner le processus gaussien et examiner ses prédictions avec la bande d'incertitude à ±1σ.
4. Choisir l'objectif (maximiser, minimiser ou atteindre une valeur) et ajuster le compromis entre exploration et exploitation.
5. Demander un point, saisir la mesure obtenue, valider, puis recommencer.
6. Suivre l'historique et la courbe de convergence.

## Optionnel : réentraîner les modèles

Notebook : `Learn_Models_RF_GP.ipynb`

<div align="justify">

_Explorer le modèle appris_ utilise des modèles déjà entraînés. Si vous souhaitez comprendre comment ils sont construits, ou les reconstruire, ce notebook entraîne une forêt aléatoire multi-sorties et un processus gaussien à noyau de Matérn sur les données CdSe, puis sauvegarde les modèles avec leurs normalisations. Il n'est pas nécessaire pour suivre le reste.

</div>

{{< link-card title="GitLab : Formation IA" description="Accéder aux notebooks et aux instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
