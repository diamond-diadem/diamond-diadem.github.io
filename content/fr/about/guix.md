---
title: À propos de Guix
linkTitle: Guix
seo:
  keywords:
    - GNU Guix paquets
    - gestionnaire de paquets HPC
    - distributions reproductibles
    - logiciels scientifiques
    - plateforme DIAMOND
---

<div align="justify">

## À propos des paquets

Type d'archive contenant un programme informatique (sous-forme de source ou d'exécutable) ainsi que des méta-données. Ils sont incontournables pour installer aisément des applications sur une machine par le biais d'un gestionnaire de paquets.

### Quels avantages ?

- L'utilisation de paquets permet de faciliter l'installation de programmes informatiques, librairies ou utilitaires.
- Pour les utilisateurs, ce choix permet d'automatiser la gestion de l'environnement logiciel sur une machine afin de pouvoir se concentrer sur l'utilisation de l'outil installé.
- Pour les développeurs, ce choix permet de faciliter la distribution des outils produits.

### La solution choisie pour DIAMOND

De nombreux gestionnaires de paquets existent : certains comme `apt` ou `rpm` sont spécifiques à des systèmes d'exploitations spécifiques, d'autres comme `pip` sont spécifiques à des lanagages de programmation. Il est d'ailleurs fréquent d'en employer plusieurs simultanément, et l'on choisit en fonction du contexte d'utiliser tel outil parce qu'il propose une large gamme de solutions, tel autre pour des raisons de sécurité car il est mieux maintenu , etc.

Dans le cadre du projet DIAMOND, imposant des exigences fortes relatives à la reproductibilité scientifique et au calcul haute performance, nous avons opté pour le gestionnaire de paquets [GNU Guix](https://guix.gnu.org) pour les raisons suivantes :

<a href="https://guix.gnu.org" target="_blank">
  <img alt="Guix" class="logo-guix about"/>
</a>

- il est utilisable sur n'importe quelle distribution Linux (incontournables dans le milieu académique et sur les centres de calcul scientifique), sans pour autant entrer en concurrence avec les autres gestionnaires installés.
- il est construit pour correspondre aux exigences de la reproductibilté scientifique, permettant d'assurer l'intégrité des exécutables bit-à-bit.
- il facilite la gestion de l'environnement de l'utilisation de versions différentes de librairies, que l'on rencontre souvent lorsque deux outils requièrent chacun une version spécifique d'une librairie donnée.
- il s'agit d'un outil open-source, prinicpalement développé au sein du milieu académique français.

En résumé, l'utilisation de paquets via le gestionnaire GNU Guix permet de faciliter la distribution de codes et d'outils réplicables et adaptés pour le calcul haute performance.

</div>
