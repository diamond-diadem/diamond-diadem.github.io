---
title: À propos d'Apptainer
linkTitle: Apptainer
---

<h2 class="about-lead text-center">Apptainer (anciennement Singularity) est une solution de création et de gestion de conteneurs orientée vers le calcul haute performance. En proposant des conteneurs empaquetant à la fois un outil logiciel et toutes les dépendances externes nécessaires à son application, il garantit leur portabilité et leur reproductibilité.</h2>

<div class="row about apptainer">

  <div class="left-about-apptainer">
    <img alt="Apptainer" class="logo-apptainer about"/>
  </div>

  <div class="right-about-apptainer">

Apptainer est un logiciel informatique gratuit et open-source qui facilite le déploiement d'outils numériques à travers la conteneurisation. L'idée générale est d'inclure un code ou une application avec toutes les dépendances (environnement logiciel, librairies externes, ...) nécessaires à son exécution au sein d'un objet nommé conteneur, autonome et indépendant de la machine sur laquelle on l'exécute. Le principal intérêt des conteneurs réside dans leur relative légèreté : on ne virtualise pas de système d'exploitation entier (lourd), mais uniquement les éléments indispensables à l'exécution, et on délègue au noyau de la machine hôte (quelle qu'elle soit) la responsabilité de communiquer avec son système d'exploitation et le hardware.

  </div>

</div>

<div class="bottom-about-apptainer">

En un sens, Apptainer est une alternative au logiciel Docker. Là où ce dernier est de plus en plus populaire dans le développement et le maintien d'applications conteneurisées orientées web et service, Apptainer propose un contrepoint très intéressant pour le calcul haute performance, avec une forte emphase sur la portabilité et la reproductibilité des résultats.

</div>

<div align="justify" style="font-size: 110%;">

Ce mode de fonctionnement présente un avantage majeur, pour les personnes utilisant les codes comme pour celles et ceux qui les développent. En empaquetant au sein d'un unique fichier immuable et facile à transmettre tout ce qui est requis pour exécuter une application, il est très aisé de distribuer tout outil en s'affranchissant des installations fastidieuses et des incompatibilités de librairies. Ce dernier point en particulier est intéressant du point de vue de la reproductibilité : comme un conteneur est immuable, on a l'assurance que la même application fonctionnera de manière rigoureusement identique dans le temps et sur d'autres machines. En d'autres termes, il n'est plus nécessaire de craindre que la moindre modification (changement de machine ou de cluster de calcul, mise à jour de librairies, ...) affecte le bon fonctionnement de vos codes.

</div>
