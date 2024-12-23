---
title:  Comment utiliser l'image Apptainer d'Ovito ?
linkTitle: Tutoriel Ovito
weight: 2
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install/install_apptainer/) pour plus de détails.

Ce tutoriel détaille l'utilisation de l'image de conteneur du code Ovito téléchargeable à [cette adresse](/codes/visualisation/ovito/). En suivant ce lien, vous récupérez une image Apptainer (format de fichier `.sif`) qui vous permettra de créer des conteneurs à même de faire tourner Ovito.

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/).

Pour rapidement s'approprier les principales commandes d'Apptainer, vous pouvez vous référer à [ce tutoriel](/documentation/use/apptainer-image/).

{{< /callout >}}

<!-- <div class="youtube-video" data-video-id="YE_r67OEEFg?si=t1ZbARrAwnFjFdYj" language="fr">
    <div class="youtube-placeholder fr">
        <button class="popup-button">Consentement aux cookies</button>
    </div>
</div> -->

{{< video-with-consent id="YE_r67OEEFg?si=t1ZbARrAwnFjFdYj" >}}

<!-- <iframe class="tuto-video" src="https://www.youtube-nocookie.com/embed/YE_r67OEEFg?si=t1ZbARrAwnFjFdYj&cc_lang_pref=fr&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

Cette image est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv ovito.sif $HOME/apptainer-images/ovito.sif
```

Pour illustrer le fonctionnement du programme de visualisation, un jeu de fichiers de positions atomiques lisibles avec Ovito est disponible sous forme d'archive via [ce lien](/downloads/ovito-tutorial-inputs.tar.gz). Cette archive contient les fichiers suivants :
* `C-diamond.cif` qui contient des positions d'atomes de Carbone formant une structure diamant au format *Crystallographic Information File*, l'un des formats de fichiers textes standards pour stocker les informations relatives à la structure de cristaux.
* `POSCAR_Si-diamond` qui est un fichier de positions d'une autre structure diamant, cette fois-ci pour des atomes de Silicium. Le format de ce fichier est celui utilisé par le code de simulation `VASP`, très populaire pour pour étudier la structure électronique des matériaux à l'échelle quantique.
* tout un jeu de fichiers `SiC.*.lmp` contenus dans un sous-dossier `MD`. Ces fichiers, au format utilisé par le code de simulation atomistique classique `LAMMPS`, retracent l'évolution d'un système hybride Silicium/Carbone au cours d'un calcul de dynamique moléculaire.

Dans ce tutoriel, on supposera que les fichiers d'entrée contenus dans cette archive sont dans le répertoire courant :

```bash
tar -xzf ovito-tutorial-inputs.tar.gz # Extrait le contenu de l'archive, créée ./tutorial
cd ./tutorial
```

##  Commande en une ligne
Pour les personnes pressées, voici comment lancer l'outil de visualisation Ovito en utilisant l'image de conteneur (téléchargée au préalable et située à `$HOME/apptainer-images/ovito.sif`). Dans le cas où le répertoire courant contient un fichier d'entrée lisible par Ovito :

```bash
apptainer run $HOME/apptainer-images/ovito.sif <input.file>
```

## Détail d'utilisation du conteneur Ovito
Cette section présente les différentes manières d'utiliser l'image Ovito. Pour plus de détails sur les commandes Apptainer, veuillez vous référer à [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

Pour exécuter Ovito sans aucune conteneurisation, on utiliserait la commande :

```bash
ovito <input.file.1> <input.file.2> ...
```
où les fichiers d'entrée `input.file.*` sont optionnels et permettent de charger la ou les configurations que l'on veut afficher directement au lancement de l'application.

Avec Apptainer, le fonctionnement est similaire, à quelques détails près :
* il faut appeler Apptainer pour lancer le conteneur (une ligne de commande).
* si on souhaite isoler le conteneur de notre machine, alors il faut s'assurer de pouvoir accéder aux fichiers que l'on souhaite charger dans Ovito (deux options dans la ligne de commande précedente).
* il faut s'assurer, le cas échéant, que le conteneur a bien accès aux ressources graphiques de la machine hôte (une autre option).

Chacun de ces points est détaillé dans les sections suivantes.

### Lancer le conteneur Ovito avec Apptainer
Pour lancer une commande au sein d'un conteneur Apptainer, on peut utiliser `apptainer exec <nom de l'image> <commande>`, à laquelle on peut adjoindre des options que l'on détaillera dans les parties suivantes. Dans notre cas, où l'image est située au chemin `$HOME/apptainer-images/ovito.sif`, et où la commande est de la forme `ovito C-diamond.cif` avec le fichier de configuration atomique `C-diamond.cif` dans le répertoire courant, on peut donc faire :

```bash
apptainer exec $HOME/apptainer-images/ovito.sif ovito C-diamond.cif
```

L'exécution de cette commande fonctionne de la manière suivante :
* création d'un conteneur à partir de l'image Apptainer `$HOME/apptainer-images/ovito.sif`.
* exécution, au sein de ce conteneur, de la commande `ovito C-diamond.cif`. Une fenêtre Ovito apparaît alors, avec laquelle on peut interagir comme on le ferait normalement si Ovito était installé sur notre machine.
* une fois que l'utilisation de l'application est terminée (c'est-à-dire quand on ferme la fenêtre Ovito), destruction du conteneur et libération des ressources.

On peut répliquer ce même comportement avec `apptainer run` qui appelle directement la commande par défaut de l'image, `ovito`, à laquelle on peut adjoindre des arguments.

```bash
apptainer run $HOME/apptainer-images/ovito.sif C-diamond.cif # la commande "ovito" est implicitement appellée.
```

On peut enfin appeler directement l'image comme un exécutable, ce qui est strictement identique à l'utilisation de `apptainer run` (pour la forme, changeons de fichier de configuration).

```bash
$HOME/apptainer-images/ovito.sif POSCAR_Si-diamond
```

### Isolation entre le conteneur et la machine hôte
Par défaut, Apptainer n'isole pas totalement le conteneur du système de la machine hôte ; pour une isolation partielle ou totale, il faut utiliser respectivement les flags `--no-mount` ou `--no-home` et `--containall` (voir [ce lien](/documentation/use/apptainer-isolation-flags) pour plus d'informations). Dans le cas où l'option `--containall` est activée, nous rencontrons deux difficultés.

#### Partage des ressources graphiques
D'une part, il est possible qu'un message d'erreur apparaisse, vous informant que l'un des plugins de la librairie (`qt.qpa.xcb`), ne parvient pas à se connecter à vos ressources d'affichage.

```bash
apptainer run --containall $HOME/apptainer-images/ovito.sif
[...]
qt.qpa.xcb: could not connect to display
[...]
Aborted
```

Il ne s'agit pas d'une incompatibilité entre votre machine et le conteneur : ce dernier tente en fait de se connecter aux mauvaises ressources graphiques. Cette tentative de connexion est guidée par la variable d'environnement `$DISPLAY`, et l'erreur vient du fait que la valeur que prend cette variable au sein du conteneur ne correspond pas à celle qu'elle prend sur votre machine.

Ce problème est directement dû à l'isolation totale entre le conteneur et la machine hôte, puisque dans ce cas précis aucune variable d'environnement de votre machine n'est transmise au conteneur par Apptainer.

Pour contourner ce problème, il suffit de préciser à la commande `apptainer run` (ou `apptainer exec`) quelle valeur attribuer à cette variable d'environnement au sein du conteneur. Pour cela, on peut recourir au flag `--env <variable>=<valeur>`, comme suit :

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/ovito.sif
```

#### Accès aux fichiers
D'autre part, le répertoire contenant les fichiers d'entrée n'est pas accessible dans le conteneur !

```bash
apptainer run --containall --env DISPLAY=$DISPLAY $HOME/apptainer-images/ovito.sif MD/SiC.*.lmp
[...]
ERROR: File does not exist: MD/SiC.0000.lmp
```

Il faut alors monter manuellement le répertoire courant (`$PWD`) avec le flag `--bind` au répertoire où l'on se trouve par défaut dans le conteneur (`$HOME`). Par exemple :

```bash
apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME \ # On monte le répertoire courant au $HOME du conteneur.
  $HOME/apptainer-images/ovito.sif MD/SiC.*.lmp
```
dans le cas où les fichiers d'entrée d'Ovito (dans un sous-dossier `MD/`) se situent dans le répertoire courant (`$PWD`).

> **Note**
> Notons bien que dans le cas où les flags `--containall` et `--bind` sont utilisés ensemble, seul le contenu des répertoires explicitement montés au sein du conteneur peut être chargé dans Ovito. De même, dans les cas où l'on souhaite exporter notre travail dans un fichier de configuration, ces options nous contraignent à exporter uniquement dans les répertoires explicitement montés, sous peine de ne pas récupérer les fichiers à la destruction du conteneur si l'on écrit dans des répertoires non partagés.

### Afficher l'aide
Pour afficher le message d'aide du conteneur (on suppose l'image stockée sous `$HOME/apptainer-images/ovito.sif`) :

```bash
apptainer run-help $HOME/apptainer-images/ovito.sif
```

Pour afficher les méta-données du conteneur (propriétaire du code, version, auteur de l'image, ...) :

```bash
apptainer inspect $HOME/apptainer-images/ovito.sif
```

## Exercices

### Exercice 1
Comment utiliser l'image de conteneur pour ouvrir Ovito ?

> **Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/ovito.sif`
> * On ne souhaite pas dans un premier temps spécifier quel fichier de configuration charger, mais l'on souhaite pouvoir les ouvrir plus tard à travers l'interface graphique d'Ovito, sans savoir *a priori* où elles sont localisées sur notre machine.

Réponses possibles :
* `apptainer exec $HOME/apptainer-images/ovito.sif ovito`
* ou `apptainer run $HOME/apptainer-images/ovito.sif`
* ou `./$HOME/apptainer-images/ovito.sif`

On note qu'on ne spécifie pas de fichier d'entrée, et qu'on ne recourt à aucune isolation (pas de flag `--containall`) pour pouvoir accéder à notre arborescence de fichiers au sein du conteneur.

### Exercice 2
Comment visualiser uniquement les configurations antérieures au 100ème pas d'un calcul de dynamique moléculaire avec l'image de conteneur Ovito ?

> **Données**
>
> * L'image est située au chemin suivant : `$HOME/apptainer-images/ovito.sif`
> * Les fichiers de configuration du calcul de dynamique moléculaire nous intéressant sont situés dans `$PWD/MD` sur la machine hôte.
> * Les fichiers de configuration sont nommés `SiC.XXXX.lmp` (la première configuration est `SiC.0000.lmp` et la 426ème est `SiC.0425.lmp`, par exemple).
> * Choix libre pour l'isolation entre le conteneur et la machine hôte.

Exemples de réponses possibles :

* `apptainer exec $HOME/apptainer-images/ovito.sif ovito MD/SiC.00*.lmp`
* ou `apptainer run --containall --env DISPLAY=$DISPLAY --bind $PWD:$HOME $HOME/apptainer-images/ovito.sif MD/SiC.00*.lmp`

<!-- ## Problèmes fréquemment rencontrés avec l'image d'Ovito

### Problème Lorem ipsum
**Description du problème** Lorem ipsum
**Solution au problème**
Ce problème est du à lorem ipsum
```bash
lorem-ipsum
``` -->

</div>
