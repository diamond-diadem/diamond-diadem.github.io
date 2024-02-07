---
title: À propos des conteneurs
linkTitle: Conteneurs
---

<h2 class="about-lead text-center">Environnements légers et isolés incluant tous les outils nécessaires pour exécuter des applications. Ils sont devenus incontournables dans le domaine de l'informatique en raison de leur flexibilité et de leur efficacité.</h2> 

<br/>

**Qu'est-ce qu'un conteneur ?**
- Un conteneur est une unité d'exécution autonome qui encapsulent une application, mais aussi les librairies externes et autres dépendances nécessaires pour son exécution.
- Il fournit un environnement isolé, garantissant que les applications embarquées fonctionnent de manière identique quel que soit l'hôte sur lequel on les déploie.
- Il s'agit d'un objet léger, puisqu'il n'embarque pas plus que ce qui est nécessaire à son exécution. On ne s'encombre pas d'un système d'exploitation complet, et le conteneur échange directement avec le noyau de la machine hôte pour accéder aux ressources matériel.
  

**Quel intérêt ?**
- **Portabilité :** les conteneurs encapsulent tout ce dont une application a besoin pour fonctionner, ce qui assure que leur exécution soit identique quel que soit le système d'exploitation. Cette caractéristique facilite la portabilité entre environnements de développement, de test et de production.
- **Isolation :** chaque conteneur est isolé des autres et de l'hôte, évitant les conflits entre les dépendances et assurant la sécurité de l'application.
- **Reproductibilité :** par essence, un conteneur est un objet autosuffisant et immuable. Il s'exécute de manière identique sur l'environnement logiciel d'une machine de bureau ou d'une grille de calcul, et fonctionne toujours de la même manière dans le temps, indépendamment des mises à jour ou du changement de version des librairies de l'hôte.
- **Évolutivité et réversibilité :** la légerté et la facilité de déploiement des conteneurs simplifie l'implémentation de mises à jours et de patchs correctifs par la création de nouveaux conteneurs. Dans le même temps, il est tout aussi aisé de revenir à une version antérieure en cas de problème, ce qui assure une stabilité dans le processus de déploiement et d'intégration.
- **Gestion des ressources :** les conteneurs partagent le noyau du système d'exploitation de l'hôte, ce qui les rend plus légers que les machines virtuelles qui nécessitent plus de ressources système.

En résumé, les conteneurs offrent une solution puissante pour le déploiement d'applications, améliorant la flexibilité, la reproductibilité, la portabilité et l'efficacité des processus de développement et de déploiement.
