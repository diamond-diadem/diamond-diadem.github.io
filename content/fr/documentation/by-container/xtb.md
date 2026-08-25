---

title: Comment utiliser l'image Apptainer de xTB ?
linkTitle: Tutoriel xTB
weight: 9
description: "Tutoriel sur l'utilisation de l'image Apptainer xTB de DIAMOND : récupération du conteneur, exécution et cas d'usage pour la chimie quantique."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

 - Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
 - Avoir téléchargé l'image **xtb.sif** [disponible ici](/codes/scientific-computing/xtb/)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

Cette image est un fichier relocalisable et renommable, qu’il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l’avez placée dans un répertoire nommé `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images

apptainer pull $HOME/apptainer-images/xtb.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb.sif:latest
```

Pour illustrer les différentes commandes, on va utiliser une simple molécule d'eau au format XYZ. Créez le fichier `h2o.xyz` dans le répertoire courant.

```bash
cat > h2o.xyz << EOF
3
This is a very strange water molecule...
O       0.0    0.0   0.0
H       1.0    0.0   0.0
H       0.0    1.0   0.0
EOF
```

À partir de maintenant, nous allons assumer que le fichier d'entrée `h2o.xyz` est dans le répertoire courant.

**Attention**

> Les commandes présentées ici utilisent l'executable `xtb` via `apptainer exec`. C'est la manière la plus explicite d'utiliser l'image, qui appelle le programme depuis l'environnement du conteneur.
>
> Comme pour d'autres images disponibles sur le site de DIAMOND, `apptainer run` est configuré pour appeler `xtb` par défaut.
> L'utilisation de `run` ou `exec` est au choix de l'utilisateur.

## Execution en une ligne

Pour les plus impatients, voici comment lancer une optimisation de géometrie avec l'image de xTB préalablement téléchargée et enregistrée dans `$HOME/apptainer-images/xtb.sif`:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

La structure optimisée sera écrite par xTB dans le répertoire courant, généralement sous le nom de `xtbopt.xyz` quand le fichier d'entrée est une structure au format XYZ.

## Mode d'emploi du conteneur xTB

Cette section présente différentes façons d'utiliser l'image GPUMD. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer-crash-course).

### Utilisation du conteneur xTB

Dans le cas d’une installation classique, l’utilisation se ferait de la manière suivante :

```bash
xtb h2o.xyz --opt
```

Où `h2o.xyz` est la structure d'entrée, située dans le répertoire courant.

Pour faire de même avec un conteneur, on peut utiliser la commande suivante :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

Cette commande signifie :

* `apptainer exec` execute une commande dans un environnement conteneurisé ;
* `$HOME/apptainer-images/xtb.sif` l'environnement est celui de l'image xTB ;
* `xtb` est la commande que l'on execute ;
* `h2o.xyz` est le fichier d'entrée ;
* `--opt` est l'argument de xTB pour faire une optimisation géometrique.

### Faire un calcul single-point

Si vous souhaitez simplement calculer l'énergie et les propriétées de la structure sans l'optimiser, omettez l'option `--opt` :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz
```

### Choisir la méthode de calcul de xTB

Par défaut, xTB utilise la méthode GFN2-xTB. Vous pouvez explicitement choisir la parametrization GFN via l'option `--gfn`.

Par exemple, on peut utiliser la commande suivante pour faire une optimisation avec GFN2-xTB :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --gfn 2 --opt
```

Pour utiliser GFN1-xTB :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --gfn 1 --opt
```

### Charge et spin

Pour les systèmes chargés ou à couche ouverte, vous devrez peut-être indiquer la charge moléculaire et le nombre d'électrons non appariés.

Par exemple, pour optimiser un système dont la charge totale est de `+1`:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --chrg 1 --opt
```

Pour un système en couche ouverte, utilisez `--uhf` pour specifier `Nalpha - Nbeta`. Par exemple, pour deux électrons non appariés :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --uhf 2 --opt
```

### Solvant implicite

xTB peut également être utilisé avec des modèles de solvant implicite. Par exemple, pour optimiser la géométrie du fichier `h2o.xyz` avec le modèle de solvant ALPB pour l'eau :
    
```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt --alpb water
```

## Utiliser le conteneur xTB en parallèle

xTB utilise la parallélisation par mémoire partagée. En pratique, cela signifie que l'on contrôle le nombre de threads CPU via les variables d'environnement de OpenMP.

Par exemple, on peut utiliser xTB avec 4 threads OpenMP de la manière suivante :

```bash
apptainer exec \
  --env OMP_NUM_THREADS=4,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```

Sinon, on peut utiliser l'argument `-P` / `--parallel` de xTB pour définir le nombre de threads que l'on souhaite :

```bash
apptainer exec \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt -P 4
```

Pour les calcul de production, surtout sur les grands systèmes, il est recommandé de définir explicitement les variables d'environnement OpenMP afin que le nombre de threads utilisés par xTB soit contrôlé et reproductible.
Pour accélérer les calculs, vous pouvez augmenter le nombre de threads à l'aide de `OMP_NUM_THREADS=X,1`, avec X le nombre de threads désirés. À noter que cette valeur ne doit pas dépasser le nombre de cœurs de processeur disponibles. (Vous pouvez afficher ce nombre via la commande `nproc`)

De plus, la mémoire par thread (valeur de `OMP_STACKSIZE`) multipliée par le nombre de threads ne doit pas dépasser la mémoire totale disponible.
Ainsi, si vous devez effectuer des calculs sur un système atomique plus grand, vous devez augmenter `OMP_STACKSIZE` tout en diminuant `OMP_NUM_THREADS` afin de conserver des performances optimales.

**Remarque**

> xTB ne peut pas être lancé avec `mpirun` et ne peut donc pas tourner sur plusieurs nœuds.

## Afficher de l'aide

Pour afficher le message d'aide de xTB listant toutes les options du programme :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb --help
```

Pour afficher le message d'aide spécifique au conteneur :

```bash
apptainer run-help $HOME/apptainer-images/xtb.sif
```

Pour afficher les métadonnées du conteneur :

```bash
apptainer inspect $HOME/apptainer-images/xtb.sif
```

## Isolation partielle ou totale

Par défaut, Apptainer n’isole pas complètement le conteneur du système hôte. Il est possible d’opter pour un isolement partiel ou total en utilisant respectivement les options `--no-mount` ou `--no-home` et `--containall` (voir [ce lien](/en/documentation/use/apptainer-isolation-flags/) pour plus d’informations).

Lorsque l'option `--containall` est activée, le répertoire de la machine hôte contenant les fichiers d'entrée xTB n'est pas automatiquement accessible depuis le conteneur.

Par exemple, la commande suivante échoue car `h2o.xyz` n'est pas visible à l'intérieur du conteneur isolé :

```bash
apptainer exec --containall \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```
Il faut alors monter manuellement le répertoire contenant les fichiers d'entrée à l'aide de l'option `--bind`.

Par exemple, si le fichier d'entrée xTB se trouve dans le répertoire courant :

```bash
apptainer exec \
  --containall \
  --bind $PWD:$HOME \
  $HOME/apptainer-images/xtb.sif \
  xtb $HOME/h2o.xyz --opt
```

Dans cet exemple, le répertoire courant de l'hôte `$PWD` est monté dans le dossier `$HOME` du conteneur, et le fichier d'entrée est accessible à l'emplacement `$HOME/h2o.xyz`.

## Exercices

### Premier exercice

Comment utiliser l'image de conteneur pour faire une optimisation de géométrie avec xTB ? 

**Données**

> * L'image est située à l'emplacement suivant : `$HOME/apptainer-images/xtb.sif`
> * Le fichier d'entrée est dans le répertoire courant : `$PWD/h2o.xyz`

Exemple de réponse :

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

### Deuxième exercice

Comment utiliser l'image de conteneur pour faire une optimisation de géométrie avec xTB en utilisant 8 threads OpenMP ?

**Données**

> * L'image est située à l'emplacement suivant : `$HOME/apptainer-images/xtb.sif`
> * Le fichier d'entrée est dans le répertoire courant : `$PWD/h2o.xyz`

Exemple de réponse :

```bash
apptainer exec \
  --env OMP_NUM_THREADS=8,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```

### Troisième exercice

Comment utiliser l'image de conteneur pour faire une optimisation de géométrie avec xTB en utilisant 4 threads OpenMP et en isolant complètement le conteneur de l'hôte ?

**Données**

> * L'image est située à l'emplacement suivant : `$HOME/apptainer-images/xtb.sif`
> * Le fichier d'entrée est dans le répertoire courant : `$PWD/h2o.xyz`

Exemple de réponse :

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=4,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  --bind $HOME/xtb-examples/exercise:$HOME \
  $HOME/apptainer-images/xtb.sif \
  xtb $HOME/h2o.xyz --opt
```

<!-- ## Frequently encountered issues with the xTB image

### Issue Lorem ipsum

**Issue description**

Lorem ipsum.

**Solution**

This issue is caused by lorem ipsum.

```bash
lorem-ipsum
```

-->

</div>
