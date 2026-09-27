---
title: Codes conteneurisés
linkTitle: Accueil
toc: false
aliases:
  - /codes/home/
  - /codes/start-here/home/
cascade:
  toc: false
seo:
  description: Portail des codes scientifiques conteneurisés DIAMOND regroupant les images
    Apptainer, workflows HPC et logiciels de simulation de matériaux.
---

Vous avez passé deux jours à essayer d'installer un code. Le compilateur réclame une bibliothèque introuvable, le cluster vous interdit de l'installer, et votre échéance, elle, ne recule pas.

Imaginez maintenant ce même code opérationnel en quelques minutes : un téléchargement, une commande, et ça marche.

C'est exactement ce que vous apporte un **conteneur**.

## Mais qu'est-ce qu'un conteneur ?

Voyez un conteneur comme une clé USB sur laquelle un programme est déjà installé : branchez-la sur n'importe quel ordinateur, et le programme fonctionne, tout simplement. Pas de compilation, pas de dépendances à traquer, pas de droits administrateur.

- **Des codes difficiles à installer, prêts à l'emploi** : quelqu'un a déjà fait la partie pénible à votre place.
- **Fonctionne là où vous ne pouvez rien installer** : beaucoup de clusters HPC interdisent l'installation de logiciels, mais autorisent l'exécution de conteneurs.
- **Les mêmes résultats, à chaque fois** : le code s'exécute dans exactement le même environnement sur votre portable, votre cluster et la machine de votre collègue. La reproductibilité est intégrée d'office.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
Tous les conteneurs ci-dessous sont prêts à être téléchargés et utilisés immédiatement. Il vous suffit d'avoir Apptainer (conçu pour le HPC) ou Docker (plus répandu) sur votre ordinateur.
{{< /callout >}}

## Vous n'avez jamais utilisé de conteneur ?

Il y a un petit temps d'apprentissage, et nous avons tout prévu : des tutoriels pas à pas sur l'[installation d'Apptainer]({{% ref "documentation/install/install-apptainer" %}}) et l'[utilisation des images de conteneurs]({{% ref "documentation/use/apptainer-image" %}}), ainsi qu'un exemple concret pour chaque conteneur. Toujours bloqué ? Nous sommes toujours [là pour vous aider]({{% ref "contact" %}}).

## Choisis par la communauté

Pendant l'été 2023, nous avons demandé à la communauté des matériaux quels codes elle utilise réellement, aussi bien pour le calcul que pour la visualisation (cf. ci-dessous). Aujourd'hui, plus de $68\%$ d'entre eux sont conteneurisés et/ou packagés, couvrant l'ensemble des échelles physiques. Celui dont vous avez besoin n'y est pas ? [Dites-le-nous]({{% ref "contact" %}}) et nous étudierons son ajout.

<img alt="Nuage de mots des codes cités par la communauté, classés par échelle physique de l'électronique au macroscopique, les plus cités (LAMMPS, VASP, Quantum ESPRESSO, ParaView, OVITO, VESTA) en plus grands caractères. 68,2 % de ces codes sont conteneurisés et/ou packagés." class="containerised-codes fr mt-4" style="width:100%">

## Codes disponibles

{{< codes-catalog >}}
