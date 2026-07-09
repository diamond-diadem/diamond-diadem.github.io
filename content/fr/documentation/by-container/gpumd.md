---
title: Comment utiliser l'image Apptainer de GPUMD ? 
linkTitle: Tutoriel GPUMD
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}


En préalable de ces explications, il est nécessaire d’avoir installé Apptainer sur votre machine ; voir [ce lien](/fr/documentation/install/install-apptainer/) pour plus de détails.

Ce tutoriel détaille l'utilisation del'image de conteneur du code GPUMD. GPUMD signifie **Graphics Processing Units Molecular Dynamics** et est un code de dynamique moléculaire implémenté pour tirer profits des GPUs. Pour plus d'informations sur GPUMD, ses fichiers d'entrées et les mots-clés disponibles, veuillez consulter [la documentation officielle de GPUMD](https://gpumd.org/).

L'image contient les outils suivants :

- `gpumd`, l'exécutable de dynamique moléculaire ;
- `nep`, l'exécutable Neuroevolution Potential ;

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter [cette page](/en/about/apptainer/).

Pour avoir un aperçu rapide des principales commandes d'Apptainer, vous pouvez vous référer à [ce tutoriel](/en/documentation/use/apptainer-image/).

{{< /callout >}}

## Récuperer l'image

L'image de GPUMD est distribué sous le format d'image Apptainer/Singularity (extension `.sif`). Cette image est un fichier relocalisable et renommable, qu’il est recommandé de placer dans un répertoire dédié pour facilement la retrouver. Ce dernier peut-être quelconque mais dans le cadre de ce tutoriel nous assumerons que vous l’avez placée dans un répertoire nommé `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images
apptainer pull $HOME/apptainer-images/gpumd.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

In the rest of this tutorial, we suppose that the image is available at:

```bash
$HOME/apptainer-images/gpumd.sif
```

## Exemple de fichiers d'entrée pour l'Indium liquide.

Afin d'illustrer les différentes commandes, un ensemble de fichiers d'entrée pour GPUMD est fourni, permettant d'effectuer une simulation de dynamique moléculaire sur de l'Indium liquide. Ces fichiers peuvent être téléchargés via [ce lien](/downloads/gpumd-tutorial-inputs.tar.gz) et sont les suivants :

- `run.in` est le fichier d'entrée principale. Il définit le protocol de simulation ainsi que la liste de commandes GPUMD à executer. 
- `model.xyz` contient la structure atomique initiale. 
- `nep.txt` contient les potentiels NEP, utilisés pour décrire les intéractions du système.

Dans ce tutoriel, nous partirons du principe que ces fichiers se trouvent dans le répertoire courant :
```bash
ls
# expected files: nep.txt  model.xyz  run.in
```

**Avertissement**

> Les commandes présentées sont celles pour l'executable `gpumd`. Pour utiliser un autre executable de l'iamge comme `nep`, il faut executer une commande de la forme `apptainer exec <options> <image> <executable-name>`.

## Execution en une ligne

Pour les plus impatients, voici comment lancer l'exemple « GPUMD - Indium liquide » à l'aide de l'image de conteneur préalablement téléchargée et enregistrée dans`$HOME/apptainer-images/gpumd.sif`:

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd
```

L'argument `--nv` partage avec le conteneur les bibliothèques et pilotes des GPUs NVIDIA installés sur la machine hôte.

## Mode d'emploi du conteneur GPUMD

Cette section présente différentes façons d'utiliser l'image GPUMD. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer-crash-course).
    
### Utilisation du conteneur GPUMD 

Dans le cas d'une installation classique, l'utilisation se ferait de la manière suivante :

```bash
gpumd
```

Où tous les fichiers d'entrée de GPUMD, notamment `run.in`, `model.xyz` et `nep.txt`, sont stockés dans le répertoire courant.

Pour faire de même avec un conteneur, on peut utiliser deux manières différentes. Dans chaque cas, on suppose que l'image nommée `gpumd.sif` est situé dans le dossier `$HOME/apptainer-images/`

- Une des façon consiste à utiliser `apptainer exec` pour executer une commande dans l'environnement du conteneur.

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd
```

- L'autre consiste à lancer un shell interactif dans l'environnement du conteneur.

```bash
apptainer shell --nv $HOME/apptainer-images/gpumd.sif
(env) gpumd
...
(env) exit
```

La commande `exit` permet de revenir à notre shell de départ une fois que l'on a finit d'utiliser notre conteneur.

### Utiliser les autres executables de l'image

Cette image contient aussi le code `nep`. Il peut être utilisé de la manière suivante :

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif nep
```

Pour connaître les fichiers d'entrée attendus et les options de `gpumd` et `nep`, veuillez consulter la [documentation de GPUMD](https://gpumd.org/).


### Afficher l'aide et les métadonnées

Pour afficher le message d'aide du conteneur :

```bash
apptainer run-help $HOME/apptainer-images/gpumd.sif
```

Pour afficher les métadonnées du conteneur tel que le propriétaire du code, la version ou l'auteur de l'image :

```bash
apptainer inspect $HOME/apptainer-images/gpumd.sif
```

### Isolation total ou partielle

Par défaut, Apptainer n'isole pas complètement le conteneur du système hôte. Il est possible d'opter pour un isolement partiel ou total en utilisant respectivement les options `--no-mount` ou `--no-home` et `--containall` (voir [ce lien](/documentation/use/apptainer-isolation-flags/) pour plus d'informations).

Lorsque l'option `--containall` est activée, le répertoire de la machine hôte contenant les fichiers d'entrée de GPUMD n'est pas accessible depuis le conteneur, à moins qu'il ne soit explicitement monté.

```bash
apptainer exec --nv --containall $HOME/apptainer-images/gpumd.sif gpumd # run.in not found!
```

Il faut ensuite monter manuellement le répertoire contenant les fichiers `run.in`, `model.xyz` et `nep.txt` à l'aide de l'option `--bind`. Par exemple, si les fichiers d'entrée se trouvent dans le répertoire courant :
```bash
apptainer exec \
  --nv \
  --containall \
  --bind $PWD:/work \
  --pwd /work \
  $HOME/apptainer-images/gpumd.sif \
  gpumd
```

## Exercices 

### Exercice 1

Comment récupérer l'image du conteneur GPUMD depuis le registre et l'enregistrer dans `$HOME/apptainer-images/gpumd.sif`?

> - L'image doit être placée à l'endroit suivant : `$HOME/apptainer-images/gpumd.sif`
> - L'image est disponible depuis le registre ORAS à l'adresse montrée dans ce tutoriel.

Exemple de réponse :

```bash
mkdir -p $HOME/apptainer-images
apptainer pull $HOME/apptainer-images/gpumd.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gpumd.sif:latest
```

### Exercice 2

Comment utiliser l'image de conteneur pour exécuter l'exemple sur l'Indium liquide avec GPUMD ?

**Données**

> - L'image est située à l'endroit suivant : `$HOME/apptainer-images/gpumd.sif`
> - Les fichiers d'entrée `nep.txt`, `model.xyz` et `run.in` sont dans le répertoire courant : `$PWD`

Exemple de réponse :

- `apptainer exec --nv $HOME/apptainer-images/gpumd.sif gpumd`

### Exercice 3

Comment utiliser l'image pour exécuter l'exemple sur l'Indium liquide avec GPUMD, en isolant enti
How to use the container image to run the GPUMD liquid Indium example while fully isolating the container from the host system?

**Données**

> - L'image est située à l'endroit suivant : `$HOME/apptainer-images/gpumd.sif`
> - Les fichiers d'entrée `nep.txt`, `model.xyz` et `run.in` sont dans le répertoire courant : `$PWD`

Exmple de réponse :

```bash
apptainer exec \
  --nv \
  --containall \
  --bind $HOME/gpumd-examples/liquid-indium:/work \
  --pwd /work \
  $HOME/apptainer-images/gpumd.sif gpumd
```

### Exercice 4

Comment appeler l'executable `nep` aussi inclus dans l'image ?

**Données**

> - L'image est située à l'endroit suivant : `$HOME/apptainer-images/gpumd.sif`

Exemple de réponse :

```bash
apptainer exec --nv $HOME/apptainer-images/gpumd.sif nep
```

</div>
