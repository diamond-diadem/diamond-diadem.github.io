---
title: "Coût numérique de l'utilisation de conteneurs"
toc: false
weight: 3
---

<div align="justify">

Un utilisateur peut se demander si le passage à l'utilisation des conteneurs via Apptainer ou des paquets via Guix ne vient pas altérer les performances de calcul.

Pour quantifier une éventuelle baisse de performances, il faut être capable de répliquer une simulation via des environnements logiciels différents afin de comparer leurs temps d'exécution. Les tests effectués vont couvrir trois environnements logiciels :

- un environnement géré avec [Nix](https://nixos.org/), que l'on appellera **environnement local** par la suite,
- un environnement conteneurisé grâce à Apptainer,
- en environnement packagé grâce à Guix.

En effectuant ce type de tests (détails ci-après), on observe que les trois environnements offrent les mêmes performances.

#### Conditions de test et détail des résultats obtenus

Des simulations LAMMPS ont été répétées en utilisant chaque environnement logiciel. Les calculs ont été effectués dans le mésocentre grenoblois GRICAD, sur le cluster Dahu. Chaque calcul a été effectué sur un noeud dont les caractéristiques sont :

- **CPU** : 2 Intel Xeon Gold 5218,
- 32 **coeurs**,
- 192 Go de **RAM**.

La version du canal Nix utilisé était la `23.11`, celle d'Apptainer la `1.2.2`. Pour chaque environnement, on utilise la même version de LAMMPS (`stable_2Aug2023_update2`) et la même simulation qui calcule le potentiel du système Silicon-Carbone (SiC) via la méthode MEAM (Modified Embedded-Atom Method) sur 1 million d'itérations. Afin de collecter le maximum d'informations sur les performances, les séries de tests sont répliquer sur `1` noeud de calcul (donc `8`, `16` et `32` processeurs) et sur `2` noeuds (donc sur `64` processeurs).

Aussi, pour tenir compte des potentielles fluctuations de performance dues à la charge du CPU, on réplique 20 fois les calculs dans chacun des cas. Au final, les temps moyen et écarts-types obtenus pour chaque environnement sont tracés dans le graphique ci-dessous. Pour être bref, l'utilisation d'Apptainer ou Guix n'entraîne aucun surcoût calculatoire quel que soit le nombre de processeurs utilisé, montrant ainsi une équivalence entre ces environnements logiciels.

<div class="text-center mt-4 mb-4">
   <img alt="bench lammps dahu" class="bench-lammps-dahu">
</div>

</div>
