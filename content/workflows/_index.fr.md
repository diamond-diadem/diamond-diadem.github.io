---
title: Workflows
linkTitle: Accueil
aliases:
  - /workflows/home/
  - /workflows/start-here/home/
toc: false
sidebar_sort: title
description: "Introduction aux gestionnaires de workflows pour la science des matériaux : automatisation, traçabilité des données et gestion des exécutions sur DIAMOND."
---

Votre calcul a planté vendredi à 20 h. Vous l'avez découvert lundi à 9 h. Soixante heures de calcul, perdues.

Imaginez maintenant le même scénario avec un workflow : le plantage est détecté, le calcul redémarre là où il s'était arrêté, les résultats sont rangés, et soit il est terminé, soit l'étape suivante tourne déjà quand vous arrivez au bureau.

C'est toute la différence entre surveiller vos simulations et les laisser travailler pour vous.

## Mais qu'est-ce qu'un workflow ?

Un **workflow** est la liste des étapes que suit votre calcul, écrite de façon à ce qu'un ordinateur puisse les exécuter à votre place : lancer un programme, attendre qu'il se termine, ranger les résultats, le redémarrer s'il s'est arrêté trop tôt, puis transmettre le résultat à l'étape suivante. De nombreux workflow managers sont activement développés, et celui proposé par notre projet est [AiiDA]({{% ref "documentation/by-container/aiida" %}}).

Fini les copies de fichiers à la main. Fini les carnets remplis de « c'était quel calcul, déjà ? ». Fini les relances de tâches une par une.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
Les outils qui exécutent les workflows, appelés **workflow managers**, vont encore plus loin : ils répartissent le travail sur plusieurs machines distantes et conservent un historique complet de la manière dont chaque résultat a été obtenu - exactement ce qu'il vous faut quand un relecteur vous demande de le prouver.
{{< /callout >}}

## Ce que vous y gagnez

- **Du temps retrouvé** : transferts de fichiers, redémarrages et autres corvées répétitives se font tout seuls. Vous vous concentrez sur la science.
- **Moins d'erreurs** : les erreurs se cachent dans les tâches manuelles répétitives. Automatisez ces tâches, et les erreurs disparaissent avec elles.
- **Des résultats traçables** : chaque entrée, sortie et étape intermédiaire est enregistrée, pour que chacun puisse retracer l'origine d'un résultat, même des années plus tard.
- **Dix calculs ou mille, le même effort** : passez à l'échelle sans ajouter la moindre étape manuelle.

## Commencez en quelques minutes

Les workflows ci-dessous sont déjà en place et prêts à être utilisés sur la plateforme. Choisissez celui qui correspond le mieux à vos recherches. Celui dont vous avez besoin n'y est pas ? [Dites-le-nous]({{% ref "contact" %}}) et nous étudierons son ajout.
