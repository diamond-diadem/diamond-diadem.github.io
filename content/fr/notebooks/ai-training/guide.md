---
title: "Découvrir les notebooks IA pour la science des matériaux"
linkTitle: Guide
weight: 2
toc: true
description: "Notebooks pédagogiques pour découvrir, étape par étape, comment appliquer des méthodes d'IA aux données matériaux."
---

<div align="justify">

Des notebooks pédagogiques pour découvrir, étape par étape, comment appliquer des méthodes d'IA aux données matériaux.

Ces notebooks constituent un support de formation (version 1.0). Ils illustrent un enchaînement pratique, de la compréhension des données expérimentales à la construction de modèles prédictifs, jusqu'à l'exploration d'approches plus avancées. Ils sont conçus comme un point de départ, à adapter à vos propres données matériaux. Les résultats dépendent de la qualité et de la taille du jeu de données, et les choix présentés sont des repères plutôt que des règles universelles.

La plupart des notebooks contiennent les explications et les consignes nécessaires pour comprendre et exécuter l'enchaînement proposé. Vous pouvez les suivre comme un parcours complet, ou ouvrir directement un notebook particulier si une étape ou une méthode vous intéresse.

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

## Avant de commencer

<div align="justify">

Il vous faut l'un des éléments suivants : Apptainer, Docker, ou Python 3.10+ avec uv et Graphviz. Les instructions détaillées sont disponibles dans le [dépôt du tutoriel](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026).

</div>

## Qualité des données

<div align="justify">

Première étape : vérifier la qualité du jeu de données de départ.

</div>

### Données manquantes et valeurs aberrantes

Notebook : `preprocessing.ipynb`

<div align="justify">

Ce notebook aide à repérer les problèmes de qualité des données avant toute analyse ou modélisation.

</div>

<img alt="Boîtes à moustaches des variables initiales, montrant les quantiles et les points signalés comme aberrants pour chaque variable" src="/images/notebooks/ai-training/outliers-boxplots.png" />

Étapes :

1. Profiler le jeu de données : dimensions, colonnes vides, colonnes comportant des valeurs manquantes et leur pourcentage, doublons, type et nombre de valeurs distinctes de chaque colonne.
2. Attribuer un traitement à chaque variable (numérique, catégorielle, identifiant, cible, ou retirée du jeu de données, par exemple si elle est trop incomplète), et choisir de supprimer ou non les lignes dupliquées.
3. Détecter les valeurs aberrantes avec des boîtes à moustaches (bornes à 1,5 fois l'écart interquartile) et avec le Z-score : un seuil ajustable affiche, sur deux variables de votre choix, les points signalés et la liste des lignes concernées.
4. Exporter un CSV traité, en décidant à ce moment-là de supprimer ou non les lignes aberrantes. Rien n'est supprimé avant cette étape.

{{< callout context="caution" title="Une valeur aberrante n'est pas forcément une erreur" icon="tabler-icons/outline/alert-triangle" >}}

Une valeur aberrante n'est pas nécessairement une erreur : il peut s'agir d'une mesure réelle. Examinez les lignes signalées avant de décider de les retirer.

{{< /callout >}}

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

## Explorer et comprendre

<div align="justify">

Se faire une première idée de la structure des données, sans chercher à prédire une cible.

</div>

### Explorer et regrouper les données

Notebook : `analysis.ipynb`

<div align="justify">

Une introduction à quelques méthodes non supervisées : corrélations, réduction de dimension et clustering.

</div>

<img alt="Clusters obtenus avec K-Means, projetés sur les deux premières composantes principales" src="/images/notebooks/ai-training/clustering-pca.png" />

Étapes :

1. Profiler le jeu de données.
2. Calculer les corrélations et les lire sur la carte de chaleur.

   <img alt="Carte de chaleur des corrélations de Pearson entre les variables du jeu de données" src="/images/notebooks/ai-training/correlation-heatmap.png" />

3. Réduire la dimension avec une analyse en composantes principales (ACP) : suivre la variance expliquée cumulée et choisir le nombre de composantes selon un seuil, par exemple 90 ou 95 %.
4. Essayer une méthode de clustering (K-Means, agglomératif ou DBSCAN) et ajuster ses hyperparamètres.
5. Projeter les groupes, comparer leurs centres, puis exporter les données avec une colonne d'identifiant de cluster.

**Exemple.** Remarquer que deux variables fortement corrélées portent presque la même information, puis vérifier avec l'ACP si quelques composantes suffisent à représenter le jeu de données.

{{< callout context="note" title="Les clusters dépendent de la méthode" icon="tabler-icons/outline/info-circle" >}}

Les clusters dépendent de la méthode et de ses réglages : comparez plusieurs méthodes plutôt que de considérer un résultat comme définitif.

{{< /callout >}}

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

## Prédire une propriété

<div align="justify">

Relier une variable cible à des variables explicatives, ou réutiliser un modèle déjà sauvegardé.

</div>

### Construire et comparer des modèles de régression

Notebook : `modeling_all.ipynb`

<div align="justify">

Un guide pour prédire une variable continue avec plusieurs algorithmes et comparer leurs résultats. Chaque algorithme est accompagné d'indications sur les cas où l'envisager.

</div>

<img alt="Comparaison des modèles de régression : nuage de points prédictions contre valeurs réelles et distribution des erreurs absolues pour XGBoost, arbre de décision, SVR, Ridge et Lasso" src="/images/notebooks/ai-training/regression-models-comparison.png" />

Étapes :

1. Charger les données, attribuer les rôles et choisir la cible.
2. Séparer un jeu d'entraînement et un jeu de test.
3. Choisir les algorithmes selon la nature des données : XGBoost, arbre de décision, SVR, Ridge, Lasso. Ajuster leurs hyperparamètres.
4. Évaluer avec MAE, MSE, RMSE, R² et MAPE, et lire le nuage de points prédictions contre valeurs réelles ainsi que la distribution des erreurs.
5. Exporter les modèles retenus.

**Exemple.** Sur un jeu de données où la relation semble linéaire et les variables corrélées, comparer Ridge ou Lasso avec XGBoost. L'export peut être nommé par version et par jeu de données, par exemple `models_V01_metallic_glass`.

{{< callout context="note" title="Le choix du modèle reste empirique" icon="tabler-icons/outline/info-circle" >}}

Le choix d'un modèle reste une comparaison empirique : les indications données sont des repères.

{{< /callout >}}

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

### Examiner XGBoost de plus près

Notebook : `modeling_xgboost.ipynb`

<div align="justify">

Un examen plus détaillé de XGBoost, qui construit des arbres en séquence, chacun corrigeant les erreurs des précédents, afin de comprendre l'effet de ses réglages.

</div>

<img alt="Importance des variables par permutation dans XGBoost, classées de la plus à la moins importante avec leur écart-type" src="/images/notebooks/ai-training/xgboost-feature-importance.png" />

Étapes :

1. Configurer le jeu de données et la séparation entraînement/test.
2. Régler les hyperparamètres : nombre d'arbres (typiquement 100 à 500), taux d'apprentissage (0,1 à 0,3), profondeur maximale (3 à 10).
3. Entraîner et évaluer sur les données d'entraînement et de test.
4. Examiner l'importance des variables (weight, gain, cover, permutation) ainsi que quelques arbres individuels.
5. Lancer une recherche par grille et comparer avec le modèle par défaut.
6. Exporter le modèle.

**Exemple.** Comparer les métriques du modèle par défaut et du modèle optimisé pour juger si la recherche par grille apporte un gain notable sur votre jeu de données.

{{< callout context="caution" title="Limitation de plateforme" icon="tabler-icons/outline/alert-triangle" >}}

La recherche par grille de XGBoost n'est pas prise en charge sous Windows en mode local.

{{< /callout >}}

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

### Utiliser un modèle pré-entraîné

Notebook : `modeling_prediction.ipynb`

<div align="justify">

Montre comment réutiliser un modèle sauvegardé au format `.pkl` sur de nouvelles données, sans réentraînement.

</div>

Étapes :

1. Charger le modèle (`.pkl`).
2. Charger un jeu de données qui fournit les mêmes variables d'entrée que le modèle.
3. Lancer la prédiction et examiner le graphique des valeurs prédites.
4. Si le jeu de données contient la cible, comparer prédictions et valeurs réelles avec les métriques de régression.
5. Sauvegarder le jeu de données avec la colonne des prédictions.

**Exemple.** Appliquer un modèle exporté depuis un notebook de modélisation à un nouveau lot d'échantillons, en vérifiant que ses variables d'entrée correspondent.

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

## Applications : nanocristaux de CdSe

<div align="justify">

Des notebooks qui illustrent des approches plus avancées sur un cas concret. Ce sont des exemples de démarche, à transposer à vos propres systèmes. Le réentraînement des modèles est possible mais optionnel, et il est décrit à la fin de cette section.

**Les données.** Chaque échantillon relie des paramètres de synthèse à une réponse optique.

</div>

- **Entrées :** `T_external` (température extérieure), `Cd_mM` et `Se_mM` (concentrations des précurseurs), `OA_Cd_ratio` (rapport ligand/métal), `T_reactor` (température de croissance), `t_s` (temps de réaction).
- **Sorties :** `Peak_nm` (pic d'émission, lié à la taille moyenne), `FWHM_nm` (largeur spectrale, liée à l'uniformité) et `height` (intensité).

### Explorer le modèle appris

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

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

### Découvrir des relations causales

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

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

### Optimiser les expériences par optimisation bayésienne

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

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)

### Optionnel : réentraîner les modèles

Notebook : `Learn_Models_RF_GP.ipynb`

<div align="justify">

_Explorer le modèle appris_ utilise des modèles déjà entraînés. Si vous souhaitez comprendre comment ils sont construits, ou les reconstruire, ce notebook entraîne une forêt aléatoire multi-sorties et un processus gaussien à noyau de Matérn sur les données CdSe, puis sauvegarde les modèles avec leurs normalisations. Il n'est pas nécessaire pour suivre le reste.

</div>

[Voir dans le dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026)
