---
title: "Prédire une propriété d'un matériau"
linkTitle: Prédire une propriété
weight: 4
toc: true
description: "Construire et comparer des modèles de régression (XGBoost, arbre de décision, SVR, Ridge, Lasso) et réutiliser un modèle pré-entraîné."
---

<div align="justify">

Relier une variable cible à des variables explicatives, ou réutiliser un modèle déjà sauvegardé.

</div>

## Construire et comparer des modèles de régression

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

## Examiner XGBoost de plus près

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

## Utiliser un modèle pré-entraîné

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

{{< link-card title="GitLab : Formation IA" description="Accéder aux notebooks et aux instructions" href="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/jupyter/training-diamond-ag-2026" target="_blank" icon="tabler-icons/outline/brand-gitlab" class="mb-0" >}}
