---
title:  "Comment utiliser l'image Apptainer de ParaView ?"
linkTitle: Tutoriel ParaView
weight: 4
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install/install_apptainer/) pour plus de détails.

Ce tutoriel détaille l'utilisation de l'image de conteneur du code ParaView téléchargeable à [cette adresse](/codes/visualisation/paraview/). En suivant ce lien, vous récupérez une image Apptainer (format de fichier `.sif`) qui vous permettra de créer des conteneurs à même de faire tourner ParaView.

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/).

Pour rapidement s'approprier les principales commandes d'Apptainer, vous pouvez vous référer à [ce tutoriel](/documentation/use/apptainer-image/).


{{< /callout >}}

<iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/_pphW6i0qSI?si=CuCRPPPjFi-uAkfI&cc_lang_pref=fr&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Cette image est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv paraview.sif $HOME/apptainer-images/paraview.sif
```

Pour illustrer le fonctionnement du programme de visualisation, un jeu de fichiers lisibles avec ParaView est disponible sous forme d'archive via [ce lien](/downloads/paraview-tutorial-inputs.tar.gz). Cette archive contient les fichiers suivants :
* `tutorial-disk.ex2`, l'un des fichiers d'exemples fournis par défaut avec ParaView contenant la structure d'un cylindre creux au format *ex2*, typiquement utilisé avec le code d'élément finis *ExodusII*.
* `tutorial-can.ex2`, également fourni par défaut avec ParaView et qui permet de reproduire l'évoultion d'un objet cylindrique (comme une canette) écrasé par un objet contondant.

Dans ce tutoriel, on supposera que les fichiers d'entrée contenus dans cette archive sont dans le répertoire courant :

```bash
tar -xzf paraview-tutorial-inputs.tar.gz # Extrait le contenu de l'archive, créée ./tutorial
cd ./tutorial
```

##  Commande en une ligne
Pour les personnes pressées, voici comment lancer l'outil de visualisation ParaView en utilisant l'image de conteneur (téléchargée au préalable et située à `$HOME/apptainer-images/paraview.sif`). Dans le cas où le répertoire courant contient un fichier d'entrée lisible par ParaView :

```bash
apptainer run $HOME/apptainer-images/paraview.sif <input.file>
```

## Détail d'utilisation du conteneur ParaView
Cette section présente les différentes manières d'utiliser l'image ParaView. Pour plus de détails sur les commandes Apptainer, veuillez vous référer à [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

Pour exécuter ParaView sans aucune conteneurisation, on utiliserait la commande :

```bash
paraview <input.file.1> <input.file.2> ...
```
où les fichiers d'entrée `input.file.*` sont optionnels et permettent de charger la ou les structures que l'on veut afficher directement au lancement de l'application.

**Note**
> Pour afficher les données chargées, il faut appliquer un rendu visuel en cliquant sur le bouton `Apply` du panneau `Properties` apparaissant sur la gauche.

Avec Apptainer, le fonctionnement est similaire, à quelques détails près :
* il faut appeler Apptainer pour lancer le conteneur (une ligne de commande).
* si on souhaite isoler le conteneur de notre machine, alors il faut s'assurer de pouvoir accéder aux fichiers que l'on souhaite charger dans ParaView (deux options dans la ligne de commande précedente).
* il faut s'assurer, le cas échéant, que le conteneur a bien accès aux ressources graphiques de la machine hôte (une autre option).

Chacun de ces points est détaillé dans les sections suivantes.

### Lancer le conteneur ParaView avec Apptainer
Pour lancer une commande dans un conteneur Apptainer, on peut utiliser `apptainer exec <nom de l'image> <commande>`, à laquelle on peut adjoindre des options que l'on détaillera dans les parties suivantes. Dans notre cas, où l'image est située au chemin `$HOME/apptainer-images/paraview.sif`, et où la commande est de la forme `paraview tutorial-disk.ex2` avec le fichier de configuration `tutorial-disk.ex2` dans le répertoire courant, on peut donc faire :

```bash
apptainer exec $HOME/apptainer-images/paraview.sif paraview tutorial-disk.ex2
```

Cette commande fonctionne comme suit :
* création d'un conteneur à partir de l'image Apptainer `$HOME/apptainer-images/paraview.sif`.
* exécution, au sein de ce conteneur, de la commande `paraview tutorial-disk.ex2`. Une fenêtre ParaView apparaît alors, avec laquelle on peut interagir comme on le ferait normalement si ParaView était installé sur notre machine.
* une fois que l'utilisation de l'application est terminée (c'est-à-dire quand on ferme la fenêtre ParaView), destruction du conteneur et libération des ressources.

On peut répliquer le même comportement avec `apptainer run` qui appelle directement la commande par défaut de l'image, `paraview`, à laquelle on peut adjoindre des arguments.

```bash
apptainer run $HOME/apptainer-images/paraview.sif tutorial-disk.ex2 # la commande "paraview" est implicitement appellée.
```

On peut enfin appeler directement l'image comme un exécutable, ce qui est strictement identique à l'utilisation de `apptainer run` (pour la forme, changeons de fichier de configuration).

```bash
$HOME/apptainer-images/paraview tutorial-can.ex2
```

### Isolation entre le conteneur et la machine hôte
Par défaut, Apptainer n'isole pas totalement le conteneur du système de la machine hôte ; pour une isolation partielle ou totale, il faut utiliser respectivement les flags `--no-mount` ou `--no-home` et `--containall` (voir [ce lien](/documentation/use/apptainer-isolation-flags) pour plus d'informations). Dans le cas où l'option `--containall` est activée, nous rencontrons deux difficultés.

#### Partage des ressources graphiques
D'une part, il est possible qu'un message d'erreur apparaisse, vous informant que l'un des plugins de la librairie (`qt.qpa.xcb`), ne parvient pas à se connecter à vos ressources d'affichage.

```bash
apptainer run --containall $HOME/apptainer-images/paraview.sif
[...]
qt.qpa.xcb: could not connect to display
[...]
Aborted
```

Il ne s'agit pas d'une incompatibilité entre votre machine et le conteneur : ce dernier tente en fait de se connecter aux mauvaises ressources graphiques. Cette tentative de connexion est guidée par la variable d'environnement `$DISPLAY`, et l'erreur vient du fait que la valeur que prend cette variable au sein du conteneur ne correspond pas à celle qu'elle prend sur votre machine.

Ce problème est directement dû à l'isolation totale entre le conteneur et la machine hôte, puisque dans ce cas précis aucune variable d'environnement de votre machine n'est transmise au conteneur par Apptainer.

Pour contourner ce problème, il suffit de préciser à la commande `apptainer run` (ou `apptainer exec`) quelle valeur attribuer à cette variable d'environnement au sein du conteneur. Pour cela, on peut recourir au flag `--env <variable>=<valeur>`, comme suit :

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/paraview.sif
```

#### Accès aux fichiers
D'autre part, le répertoire contenant les fichiers d'entrée n'est pas accessible dans le conteneur !

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/paraview.sif tutorial-disk.ex2
[...]
critical: Cannot open data file " "tutorial-disk.ex2" "
```

Il faut alors monter manuellement le répertoire courant (`$PWD`) avec le flag `--bind` au répertoire où l'on se trouve par défaut dans le conteneur (`$HOME`). Par exemple :

```bash
apptainer run --containall --bind $PWD:$HOME \ # On monte le répertoire courant au $HOME du conteneur.
  $HOME/apptainer-images/paraview.sif tutorial-disk.ex2
```

dans le cas où les fichiers d'entrée de Paraview se situent dans le répertoire courant (`$PWD`).

**Note**
> Notons bien que dans le cas où les flags `--containall` et `--bind` sont utilisés ensemble, seul le contenu des répertoires explicitement montés au sein du conteneur peut être chargé dans ParaView. De même, dans les cas où l'on souhaite exporter notre travail dans un fichier de sortie, ces options nous contraignent à exporter uniquement dans les répertoires explicitement montés, sous peine de ne pas récupérer les fichiers à la destruction du conteneur si l'on écrit dans des répertoires non partagés.

### Afficher l'aide
Pour afficher le message d'aide du conteneur (on suppose l'image stockée sous `$HOME/apptainer-images/paraview.sif`) :

```bash
apptainer run-help $HOME/apptainer-images/paraview.sif
```

Pour afficher les méta-données du conteneur (propriétaire du code, version, auteur de l'image, ...) :

```bash
apptainer inspect $HOME/apptainer-images/paraview.sif
```

## Exercices

### Exercice 1
Comment utiliser l'image de conteneur pour ouvrir ParaView ?

> **Données**
>
> * L'image est située au chemin suivant : `$HOME/apptainer-images/paraview.sif`.
> * On ne souhaite pas dans un premier temps spécifier quel fichier de configuration charger, mais l'on souhaite pouvoir les ouvrir plus tard à travers l'interface graphique de ParaView, sans savoir *a priori* où elles sont localisées sur notre machine.

Réponses possibles :

* `apptainer exec $HOME/apptainer-images/paraview.sif paraview`
* ou `apptainer run $HOME/apptainer-images/paraview.sif`
* ou `./$HOME/apptainer-images/paraview.sif`

On note qu'on ne spécifie pas de fichier d'entrée, et qu'on ne recourt à aucune isolation (pas de flag `--containall`) pour pouvoir accéder à notre arborescence de fichiers au sein du conteneur.

### Exercice 2
Comment visualiser une animation contenue dans un fichier avec un conteneur ParaView et enregistrer cette animation au format `avi` ?

> **Données**
>
> * L'image est située au chemin suivant : `$HOME/apptainer-images/paraview.sif`
> * Le fichier contenant l'animation nous intéressant est situé dans `$PWD/tutorial-can.ex2` sur la machine hôte.
> * Pour afficher les données chargées, il faut appliquer un rendu visuel en cliquant sur le bouton `Apply` du panneau `Properties` aparaissant sur la gauche.
> * Il est possible de jouer avec le panneau `Properties` et de modifier le point de vue afin de mettre en valeur l'animation.
> * Au sein de ParaView, l'export au format `avi` peut se faire via `File > Save Animation`.
> * On tentera de donner une solution non isolée de la machine hôte, et une solution isolant au maximum le conteneur de la machine hôte.

Exemples de réponses possibles :

* `apptainer exec $HOME/apptainer-images/paraview.sif paraview tutorial-can.ex2`
* ou `apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME $HOME/apptainer-images/paraview.sif tutorial-can.ex2`

<!-- ## Problèmes fréquemment rencontrés avec l'image de Paraiew

### Problème Lorem ipsum
**Description du problème** Lorem ipsum
**Solution au problème**
Ce problème est du à lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
