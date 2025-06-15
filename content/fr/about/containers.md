---
title: À propos des conteneurs
linkTitle: Conteneurs
---

<h2 class="about-lead text-center">Environnements légers et isolés incluant tous les outils nécessaires pour exécuter des applications. Ils sont devenus incontournables dans le domaine de l'informatique en raison de leur flexibilité et de leur efficacité.</h2>

<div align="justify">

### Qu'est-ce qu'un conteneur ?

- Un conteneur est une unité d'exécution autonome qui encapsule une application, mais aussi les librairies externes et autres dépendances nécessaires pour son exécution.
- Il fournit un environnement isolé, garantissant que les applications embarquées fonctionnent de manière identique quel que soit l'hôte sur lequel on les déploie.
- Il s'agit d'un objet léger, puisqu'il n'embarque que ce qui est nécessaire à son exécution. On ne s'encombre pas d'un système d'exploitation complet, et le conteneur échange directement avec le noyau de la machine hôte pour accéder aux ressources matérielles.

### Quels avantages ?

- **Portabilité :** les conteneurs encapsulent tout ce dont une application a besoin pour fonctionner, ce qui assure que leur exécution soit identique quel que soit le système d'exploitation. Cette caractéristique facilite la portabilité entre environnements de développement, de test et de production.
- **Isolation :** chaque conteneur est isolé des autres et de l'hôte, évitant les conflits entre les dépendances et assurant la sécurité de l'application.
- **Reproductibilité :** par essence, un conteneur est un objet autosuffisant et immuable. Il s'exécute de manière identique sur l'environnement logiciel d'une machine de bureau ou d'une grille de calcul, et fonctionne toujours de la même manière dans le temps, indépendamment des mises à jour ou du changement de version des librairies de l'hôte.
- **Évolutivité et réversibilité :** la légerté et la facilité de déploiement des conteneurs simplifie l'implémentation de mises à jours et de patchs correctifs par la création de nouveaux conteneurs. Dans le même temps, il est tout aussi aisé de revenir à une version antérieure en cas de problème, ce qui assure une stabilité dans le processus de déploiement et d'intégration.
- **Gestion des ressources :** les conteneurs partagent le noyau du système d'exploitation de l'hôte, ce qui les rend plus légers que les machines virtuelles qui nécessitent plus de ressources système.

En résumé, les conteneurs offrent une solution puissante pour le déploiement d'applications, améliorant la flexibilité, la reproductibilité, la portabilité et l'efficacité des processus de développement et de déploiement.

</div>

<style>
 /* Three image containers (use 25% for four, and 50% for two, etc) */
.column {
  float: left;
  /* width: 50%;
  padding: 5px; */
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>

<div class="row">
  <div class="column left-about-containers">
    <img alt="Cluster map" class="cluster-map fr">
  </div>
  <div class="column right-about-containers" align="justify">

En pratique, vous pouvez choisir la solution technique que vous souhaitez en local sur votre machine. Dans le cadre du projet DIAMOND, nous recommandons l'utilisation d'[Apptainer](/about/apptainer/) mais également de [Guix](/about/guix/). En revanche, sur les clusters ou les centres de calcul, la solution est dictée par ce qui est disponible. Quasiment la moitié des mésocentres et centres de calcul nationaux français possède un système de conteneurs disponible en commande par défaut (permettant donc l'utilisation des conteneurs). Il faut tout de même préciser que l'autre moitié des mésocentres offrent la possibilité de charger un système de conteneurs via la commande `module load` (et donc d'utiliser des conteneurs). En revanche, l'utilisation de Guix est limitée à moins de $30\%$ de l'ensemble des centres de calcul français. Il est à noter que le projet [MESONET](https://www.mesonet.fr/) qui vise à mutualiser les ressources de calcul HPC à l'échelle du pays a déployé une solution pour l'utilisation des conteneurs sur leur cluster de prototypage. Bien que tous les clusters du projet ne soient pas encore disponibles, il est fort probable que ceux-ci posséderont un système de conteneurs.

  </div>
</div>
