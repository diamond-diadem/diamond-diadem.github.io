---
title: Codes et logiciels
linkTitle: Accueil
aliases:
  - /codes/home/
  - /codes/start-here/home/
seo:
  description: Portail des codes scientifiques conteneurisés DIAMOND regroupant les images
    Apptainer, workflows HPC et logiciels de simulation de matériaux.
---

Vous trouverez dans cette rubrique un ensemble de codes au service de vos recherches.

## Quels codes ?

Diamond vous met à disposition une trentaine de codes de modélisation et de visualisation, allant de l’échelle électronique à macroscopique. Ces codes ont été choisi en prenant avis d'une  communauté de chercheurs s'intéressant aux matériaux et à l'IA (GDR IAMAT), et a vocation à être complété pour répondre au mieux à vos besoins.  Celui dont vous avez besoin n'y est pas, [dites-le-nous]({{% ref "/contact" %}}) et nous étudierons son ajout.

## Sous quelle forme sont fournis les codes ?

Les codes sont mis à disposition sous forme conteneurisée. Pourquoi ? Pour pouvoir fonctionner de manière identique et fiable sur chacune de vos machines (Windows ou Linux, ordinateur de bureau ou supercalculateur). Le conteneur fonctionne comme une clé USB sur laquelle un programme est déjà installé.

- Le code conteneurisé **fonctionne sur n'importe quel ordinateur**.
- **Il embarque le code et tout ce dont il a besoin pour fonctionner** (sans donc nécessiter d'installation, de compilation, de dépendances, ni de droits administrateur). Il fonctionne notamment là où vous ne pouvez rien installer : beaucoup de clusters HPC interdisent l'installation de logiciels, mais autorisent l'exécution de conteneurs.
- **Le code fournit les mêmes résultats, à chaque fois** : le code s'exécute dans exactement le même environnement sur votre portable, votre cluster et la machine de votre collègue. La **reproductibilité** est intégrée d’office.

## Comment l'utiliser ?

Tous les conteneurs ci-dessous sont prêts à être téléchargés et utilisés immédiatement. Un seul prérequis : avoir accès sur la machine au logiciel de conteneurisation du quel vous allez vous en servir. Nous vous proposons des conteneurs Apptainer (conçu pour le HPC) et Docker (plus répandu).

Vous n'avez jamais utilisé de conteneur ?

Il y a un petit temps d’apprentissage, et nous avons tout prévu : des tutoriels pas à pas sur l'[installation d'Apptainer]({{% ref "documentation/install/install-apptainer" %}}) et l'[utilisation des codes conteneuriséss]({{% ref "documentation/use/apptainer-image" %}}), ainsi qu'un exemple concret pour chaque conteneur.

Toujours bloqué ? Nous sommes toujours là pour [vous aider]({{% ref "/contact" %}}).

## List of containerised codes

{{< codes-catalog >}}
