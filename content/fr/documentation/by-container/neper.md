---
title: Comment utiliser l'image Apptainer Neper ?
linkTitle: Tutoriel Neper
weight: 4
description: "Tutoriel sur l'utilisation du conteneur Apptainer Neper de DIAMOND : récupération de l'image, exécution de calculs et exemple d'utilisation pour la génération d'un maillage de tessellation simple."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **neper.sif** [disponible ici](/codes/scientific-computing/neper/)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter [cette page](/about/apptainer/) ou vous référer à [ce tutoriel](/documentation/use/apptainer-image/) pour avoir un aperçu rapide des principales commandes d'Apptainer.

{{< /callout >}}

## Utilisation détaillée du conteneur Neper

Cette section explique comment utiliser l'image Neper. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

Neper est un logiciel de modélisation et de simulation de matériaux polycristallins, permettant de générer et d'analyser des microstructures de grains en 2D/3D via des tessellations de Voronoi et le maillage de données expérimentales. C'est un outil robuste et efficace largement utilisé par les spécialistes des matériaux pour l'analyse des joints de grains, de leur texture, ainsi que pour l'analyse par éléments finis des polycristaux.

L'exécutable principal de l'image est `neper`. La version du logiciel intégrée dans l'image du conteneur peut être affichée avec la commande suivante :

```bash
apptainer exec neper.sif neper --version
```

La licence du code peut être trouvée sous le chemin suivant : `/share/doc/neper-xx.xx.xx/COPYING` où `xx.xx.xx` est la version du logiciel. Elle peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
neper_version=$(apptainer exec neper.sif neper --version)
apptainer exec neper.sif cat /share/doc/neper-$neper_version/COPYING
```

L'image contient également d'autres exécutables utiles, tels que `gmsh` pour la génération de maillage, ou `povray` et `asy` pour la génération d'images.

### Utilisation du conteneur Neper pour générer et mailler une tessellation simple

L'exécutable Neper au sein de l'image du conteneur `neper.sif` peut être utilisé en ajoutant simplement la commande `apptainer exec neper.sif` avant une commande `neper`. Pour illustrer cela, considérons le [tutoriel](https://neper.info/doc/tutorials/simple_model.html) suivant issu de la documentation officielle. Une tessellation simple de 100 cellules peut être générée comme suit :

```bash
apptainer exec neper.sif neper -T -n 100
```

Cette tessellation peut être visualisée via la commande suivante qui génère un fichier PNG nommé `img1.png` qui devrait ressembler à l'image représentée dans le tutoriel :

```bash
apptainer exec neper.sif neper -V n100-id1.tess -print img1
```

Elle peut être maillée avec la commande suivante :

```bash
apptainer exec neper.sif neper -M n100-id1.tess
```

Le maillage peut être visualisé via la commande suivante qui génère un fichier PNG nommé `img2.png` qui, encore une fois, devrait ressembler à l'image maillée représentée dans le tutoriel :

```bash
apptainer exec neper.sif neper -V n100-id1.tess,n100-id1.msh -print img2
```

Le reste des commandes exposées dans le tutoriel peut être extrapolé de la même manière à partir de ces exemples.

</div>
