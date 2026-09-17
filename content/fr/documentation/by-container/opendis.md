---
title: Comment utiliser l'image Apptainer OpenDis ?
linkTitle: Tutoriel OpenDis
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer OpenDis de DIAMOND : récupération du conteneur, exécution et cas d'usage pour les calculs de dynamiques des dislocations."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **opendis.sif** [disponible ici](/codes/scientific-computing/opendis/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/opendis-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour OpenDis est disponible sous forme d'archive via [ce lien](/downloads/opendis-tutorial-inputs.tar.gz). Ces fichiers correspondent à un tutoriel issu de la [documentation officielle](ttps://opendis.github.io/OpenDiS/tutorials/frank_read_src/index.html) d'OpenDis. L'archive contient deux scripts Python qui décrivent la même simulation OpenDis en utilisant deux modules différents, l'un séquentiel (PyDis) et l'autre multi-threadé (ExaDis) :

- `test_frank_read_src_pydis.py`,
- `test_frank_read_src_exadis.py`.

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf opendis-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul OpenDis multi-threadé, dans le cas où le répertoire courant contient l'image `opendis.sif` ainsi que tous les fichiers d'entrée nécessaires :

```bash
apptainer exec opendis.sif python3 test_frank_read_src_exadis.py
```

## Utilisation détaillée du conteneur OpenDis

Cette section présente différentes façons d'utiliser l'image OpenDis. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

OpenDis est un code open-source parallélisé conçu pour simuler et analyser les dislocations dans les matériaux cristallins à l’échelle mésoscopique. La licence du code peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
opendis_path=$(apptainer exec opendis.sif ls /gnu/store | grep opendis)
license_path=$(apptainer exec opendis.sif find /gnu/store/$opendis_path/share -name "LICENSE")
apptainer exec opendis.sif cat $license_path
```

Le présent tutoriel correspond au tutoriel *Frank-Read Source* issu de la [documentation officielle](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/index.html). Le script Python contenu dans l'archive est extrait du répertoire *examples/02_frank_read_src* du [dépôt GitHub](https://github.com/OpenDiS/OpenDiS/tree/main/examples/02_frank_read_src) du code.

### Description de la simulation

Comme décrit dans le tutoriel, la configuration initiale correspond à une boucle rectangulaire de dislocations de type coin où les quatre nœuds formant le rectangle sont encastrés. Le bras supérieur contient un nœud libre, ce qui lui permet de se plier et de se comporter comme une source de Frank-Read. Des conditions aux limites périodiques sont appliquées dans les trois directions.

### Lancement de la simulation avec le module PyDis

Cette première section correspond à la première partie du [tutoriel](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) intitulée *Frank-Read Source by Pure Python*. La commande suivante permet de lancer la simulation avec le module PyDis en séquentiel :

```shell
apptainer exec opendis.sif python3 -i test_frank_read_src_pydis.py
```

Si cette commande est correctement exécutée, une fenêtre matplotlib contenant une animation de la simulation devrait s'ouvrir automatiquement. le [tutoriel officiel](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) montre ce à quoi l'animation obtenue devrait ressembler.

L'option `-i` dans la commande précédente permet d'activer le mode *interactif*. Une console Python s'ouvre alors automatiquement à la fin de la simulation et permet d'interagir avec les variables de la simulation. Par exemple, la commande suivante permet d'afficher tous les nœuds du réseau de dislocation :

```python
G.all_nodes_tags()
```

La commande suivante permet quant à elle d'examiner les informations d'un nœud en particulier :

```python
G.nodes((0,0)).view()
```

Le [tutoriel](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) présente plusieurs autres façons d'interagir avec les données de la simulation depuis la console Python interactive.

Pour quitter la console, il suffit d'exécuter la commande `exit()` ou d'utiliser la combinaison de touches `Ctrl+D`.

### Lancement d'une simulation avec le module ExaDis

Cette deuxième section correspond à la deuxième partie du [tutoriel](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) intitulée *Frank-Read Source by Python calling ExaDiS*. Elle utilise le module ExaDis pour lancer la même simulation de manière plus rapide, en utilisant la bibliothèque de multi-threading OpenMP. Le tutoriel précise que le module ExaDis doit pour cela être compilé avec OpenMP, ce qui est le cas dans le conteneur.

La commande suivante exécute la simulation de source Frank-Read avec ExaDis :

```shell
apptainer exec opendis.sif python3 -i test_frank_read_src_exadis.py
```

L'animation affichée devrait être identique à précédemment pour un temps d'exécution réduit. Là encore, l'option `-i` permet l'ouverture automatique d'une console Python à la fin de la simulation. Les données stockées dans l'objet `G` peuvent être accédées après la commande suivante exécutée dans la console interactive :

```python
from pydis import DisNet
G1 = net.get_disnet(DisNet)
```

Le nouvel objet `G1` peut alors être manipulé de la même manière qu'à la section précédente.

### Pour aller plus loin

La [documentation officielle](https://opendis.github.io/OpenDiS/tutorials/index.html) d'OpenDis contient plusieurs tutoriels présentant les différentes fonctionnalités du code. Les scripts Python associés sont présents dans le répertoire *examples/* du [dépôt](https://github.com/OpenDiS/OpenDiS/tree/main/examples). Les commandes présentées dans le présent tutoriel peuvent facilement être extrapolées pour lancer ces exemples avec le conteneur OpenDis.

</div>
