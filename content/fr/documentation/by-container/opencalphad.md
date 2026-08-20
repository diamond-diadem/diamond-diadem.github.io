---
title: Comment utiliser l'image Apptainer OpenCalphad ?
linkTitle: Tutoriel OpenCalphad
weight: 6
description: "Tutoriel sur l'utilisation de l'image Apptainer OpenCalphad de DIAMOND : récupération du conteneur, exécution et cas d'usage pour le calcul de diagrammes de phases."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **opencalphad.sif** [disponible ici](/codes/scientific-computing/opencalphad/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/opencalphad-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour OpenCalphad est disponible sous forme d'archive via [ce lien](/downloads/opencalphad-tutorial-inputs.tar.gz).

Ces fichiers sont adaptés d'un exemple de tutoriel du [dépôt officiel](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros) d'OpenCalphad. L'archive contient les fichiers suivants :

- `input.OCM` : un fichier d'entrée OpenCalphad pour calculer et tracer le diagramme de phases du système C-Fe,
- `steel1.TDB` : un fichier de base de données.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf opencalphad-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul OpenCalphad dans le cas où le répertoire courant contient l'image `opencalphad.sif` ainsi que tous les fichiers d'entrée OpenCalphad nécessaires :

```bash
apptainer exec opencalphad.sif oc6P input.OCM
```

## Utilisation détaillée du conteneur OpenCalphad

Cette section explique comment utiliser l'image OpenCalphad pour calculer et tracer le diagramme de phases classique du système C-Fe. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

OpenCalphad est une suite logicielle open-source parallélisée avec OpenMP, conçue pour les calculs thermodynamiques de systèmes multicomposants.

L'exécutable principal de l'image est `oc6P`. Les diagrammes produits par OpenCalphad sont tracés avec l'exécutable `gnuplot`, également embarqué par le conteneur.

### Utilisation de l'exemple du tutoriel avec OpenCalphad

Le fichier d'entrée `input.OCM` permet de tracer le diagramme de phases du système C-Fe. Il a été obtenu par adaptation de l'exemple `map3.OCM` du répertoire *macros* du [dépôt officiel](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros) correspondant à la version du logiciel intégrée dans le conteneur (`v.6.0`). Une description de cet exemple se trouve dans la [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf) officielle à la page 14, section 4.3.3 : *Phase diagram for C-Fe*.

Pour lancer le calcul :

```bash
apptainer exec opencalphad.sif oc6P input.OCM
```

Cette commande affiche différents diagrammes `gnuplot`, tels qu'un diagramme de phases pour le système incluant toute la gamme de teneurs en carbone jusqu'au graphite, ainsi que le diagramme de phases métastable du système C-Fe avec la cémentite. Après chaque tracé, l'utilisateur est invité à appuyer sur la touche `Entrée` dans son terminal pour déclencher le tracé suivant. Certains des diagrammes attendus sont présentés dans la [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf) de l'exemple.

À la fin du calcul, un shell interactif est ouvert par OpenCalphad. Ce shell peut être fermé en toute sécurité avec la combinaison de touches `Ctrl/Command + C`.

### Exécution d'autres exemples avec l'image du conteneur OpenCalphad

La [documentation](https://github.com/sundmanbo/opencalphad/blob/v.6.0/documentation/OC-macros.pdf) officielle décrit de nombreux autres exemples simples pour présenter les capacités du logiciel OpenCalphad. Les fichiers d'entrée associés se trouvent dans le répertoire [macros](https://github.com/sundmanbo/opencalphad/tree/v.6.0/macros) du dépôt de cette version. Une légère adaptation est nécessaire pour exécuter ces exemples avec la version conteneurisée du logiciel. Pour permettre l'exécution d'un script `.OCM` avec l'image du conteneur OpenCalphad, ajouter simplement les lignes suivantes au tout début du script :

```txt
enter gnuplot_term
SCREEN
x11 size 600,500 font "Arial,16"
```

Ces lignes garantissent que `gnuplot` utilise le système de fenêtres `X11` au lieu de la bibliothèque `Qt` qui n'est pas intégrée au conteneur.

Dans la plupart des scripts d'exemple, le mot-clé `@&` est utilisé à plusieurs endroits pour mettre l'exécution en pause jusqu'à ce qu'une touche soit pressée. Ces commandes peuvent être supprimées sans risque lorsqu'elles ne sont pas placées entre deux tracés. Lorsqu'elles séparent des tracés, ces pauses ne doivent pas être supprimées car cela amènerait `gnuplot` à afficher deux fois de suite la même figure.

Par ailleurs, la commande `set inter` à la fin d'un script OpenCalphad est responsable du déclenchement du shell interactif à la fin de l'exécution du script. La suppression de cette commande déclenche une erreur à la fin de l'exécution d'un script.

</div>
