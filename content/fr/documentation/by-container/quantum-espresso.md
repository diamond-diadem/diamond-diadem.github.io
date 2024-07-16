---
title:  Comment utiliser l'image Apptainer de Quantum ESPRESSO ?
linkTitle: Tutoriel Quantum ESPRESSO
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install-apptainer/howto/) pour plus de détails.

Ce tutoriel détaille l'utilisation de l'image de conteneur du code Quantum Espresso téléchargeable à [cette adresse](/codes/visualisation/ovito/). En suivant ce lien, vous récupérez une image Apptainer (format de fichier `.sif`) qui vous permettra de créer des conteneurs à même de faire tourner Quantum Espresso.

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/).

Pour rapidement s'approprier les principales commandes d'Apptainer, vous pouvez vous référer à [ce tutoriel](/documentation/use-apptainer-image/howto/).

{{< /callout >}}

Cette image est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv quantum-espresso.sif $HOME/apptainer-images/quantum-espresso.sif
```

Pour illustrer les différentes commandes, un jeu de fichiers d'entrée Quantum Espresso est disponible sous forme d'archive via [ce lien](/downloads/qe-tutorial-inputs.tar.gz). L'archive contient les fichiers nécessaires pour effectuer un calcul d'énergie pour un système organique contenant du carbone, du magnésium, du souffre, de l'azote et de l'hydrogène. Les fichiers sont les suivants :
* `qe-tutorial.in` est le fichier d'entrée principal de Quantum Espresso, contenant les paramètres nécessaires pour effectuer le calcul. Les positions des atomes ainsi que la définition de la boîte de simulation sont également dans ce fichier. Enfin on on spécifie où trouver les pseudo-potentiels pour décrire les interactions d'échange-corrélation au sein du système (voir ci-après).
* le répertoire `pseudo` qui contient les fichiers de pseudo-potentiels propres à chaque espèce chimique du système (`C.upf`, `H.upf`, `Mn.upf`, `N.upf` et `S.upf`).

Dans ce tutoriel, on supposera que les fichiers d'entrée contenus dans cette archive sont dans le répertoire courant :

```bash
tar -xzf qe-tutorial-inputs.tar.gz # Extrait le contenu de l'archive, créée ./tutorial
cd ./tutorial
```

**Remarque**
> Les commandes présentées ici sont pour l'utilisation de l'exécutable `pw.x` de Quantum Espresso. Il s'agit aussi de l'exécutable appelé par défaut par la commande `apptainer run`. Dans le cas où l'on veut appeler un autre exécutable, il est nécessaire d'utiliser `apptainer exec <options> <image> <nom-de-l-executable>`.

##  Commande en une ligne
Pour les personnes pressées, voici comment lancer un calcul Quantum Espresso parallèle en utilisant l'image de conteneur (téléchargée au préalable et située à `$HOME/apptainer-images/quantum-espresso.sif`). Dans le cas où le répertoire courant contient les fichiers d'entrée nécessaires pour Quantum Espresso :

```bash
apptainer exec $HOME/apptainer-images/quantum-espresso.sif mpirun -np <N> pw.x -in <input.quantum-espresso>
```

## Détail d'utilisation du conteneur Quantum Espresso
Cette section présente les différentes manières d'utiliser l'image Quantum Espresso. Pour plus de détails sur les commandes Apptainer, veuillez vous référer à [ce tutoriel](/documentation/use-apptainer-image/howto/#apptainer--cours-accéléré).

### Utiliser le conteneur Quantum Espresso en séquentiel
Pour exécuter Quantum Espresso en séquentiel (c'est-à-dire sans parallélisation) sans conteneur, on utiliserait la commande :

```bash
pw.x -in qe-tutorial.in
```
où tous les fichiers d'entrée Quantum Espresso (dont `qe-tutorial.in` le fichier d'entrée principal) sont stockés dans le répertoire courant.

Pour effectuer la même chose dans un conteneur, on peut exécuter trois commandes équivalentes. Dans chacun des exemples suivants, on suppose que l'image Apptainer `quantum-espresso.sif` est stockée sous `$HOME/apptainer-images/quantum-espresso.sif`.

* On peut utiliser `apptainer exec` qui permet d'exécuter une commande spécifique dans le conteneur.

```bash
apptainer exec $HOME/apptainer-images/quantum-espresso.sif pw.x -in qe-tutorial.in
```

* On peut utiliser `apptainer run` qui appelle la commande par défaut du conteneur, à savoir l'exécutable `pw.x`, en lui spécifiant à la suite les instructions permettant à Quantum Espresso de localiser le fichier d'entrée.

```bash
apptainer run $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in # "pw.x" est implicitement appelé par "run"
```

* On peut enfin appeler directement l'image comme un exécutable, ce qui est strictement identique à l'utilisation de `apptainer run`.

```bash
$HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in
```

### Utiliser le conteneur Quantum Espresso en parallèle
L'image `quantum-espresso.sif` embarque une version de Quantum Espresso supportant la parallélisation via **OpenMP** et **MPI**.

Dans le cas où aucune conteneurisation ne serait utilisée, la commande typique ressemblerait à :

```bash
OMP_NUM_THREADS=2 mpirun -np 4 pw.x -in qe-tutorial.in
```

En utilisant ce conteneur, la même commande devient :

```bash
apptainer exec --env OMP_NUM_THREADS=2 $HOME/apptainer-images/quantum-espresso.sif mpirun -np 4 pw.x -in qe-tutorial.in
```

**Remarque**
> Si rien n'est précisé, Quantum Espresso utilise par défaut un seul thread **OpenMP** (`$OMP_NUM_THREADS=1`) et répartit les processus **MPI** sur l'intégralité des cœurs disponibles.

Dans la commande précédente, on utilise la commande `mpirun` fournie par la version d'**OpenMPI** embarquée dans le conteneur pour communiquer directement avec le matériel de la machine hôte. Cette utilisation *embarquée* présente un avantage majeur, puisque l'on utilise uniquement les outils installés dans le conteneur : elle fonctionne sur toutes les machines hôtes sans requérir d'installation. Néanmoins, la version d'**OpenMPI** présente au sein du conteneur n'est pas construite pour tourner de manière optimale sour toutes les machines hôtes, mais pour fourninr des performances satisfaisantes sur une gamme de machine aussi large que possible. Typiquement, dans le cas de Quantum Espresso, on observe que l'utilisation du processeur plafonne entre 85 et 90% en parallélisation embarquée. Par ailleurs, ce mode de parallélisation ne permet pas non plus d'effectuer du calcul distribué sur plusieurs nœuds de calcul. Si une facilité de portage au prix de performances légèrement dégradées peuvent convenir pour effectuer de simples essais sur une machine locale, ce n'est pas le cas sur une infrastructure de calcul haute performance.

Dans le cas où les performances numériques sont centrales, il est recommandé d'utiliser un mode de parallélisation hybride, où l'on utilise la version d'**OpenMPI** de la machine hôte comme intermédiaire entre celle du conteneur et la matériel de la machine hôte. Pour plus de détails, veuillez consulter la [page dédiée](/documentation/apptainer-parallel/howto/).

### Afficher l'aide
Pour afficher le message d'aide du conteneur (on suppose l'image stockée sous `$HOME/apptainer-images/quantum-espresso.sif`) :

```bash
apptainer run-help $HOME/apptainer-images/quantum-espresso.sif
```

Pour afficher les méta-données du conteneur (propriétaire du code, version, auteur de l'image, ...) :

```bash
apptainer inspect $HOME/apptainer-images/quantum-espresso.sif
```

### Isolation partielle ou isolation totale
Par défaut, Apptainer n'isole pas totalement le conteneur du système de la machine hôte ; pour une isolation partielle ou totale, il faut utiliser respectivement les flags `--no-mount` ou `--no-home` et `--containall` (voir [ce lien](/documentation/use-apptainer-image/howto/#isolation-partielle-ou-isolation-totale) pour plus d'informations).

Dans le cas où l'option `--containall` est activée, le répertoire contenant les fichiers d'entrée de Quantum Espresso n'est pas accessible dans le conteneur !

```bash
apptainer run --containall $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in # qe-tutorial.in non trouvé !
```
Il faut alors monter manuellement le répertoire courant (`$PWD`) avec le flag `--bind` au répertoire où l'on se trouve par défaut dans le conteneur (`$HOME`). Par exemple :

```bash
apptainer run --containall --bind $PWD:$HOME \ # On monte le répertoire courant au $HOME du conteneur.
  $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in
```
dans le cas où les fichiers d'entrée de Quantum Espresso se situent dans le répertoire courant (`$PWD`).

## Exercices

### Exercice 1
Comment utiliser l'image de conteneur pour effectuer un calcul Quantum Espresso en séquentiel ?

> **Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/quantum-espresso.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `qe-tutorial.in`) sont situés dans le répertoire courant : `$PWD`

Réponses possibles :
* `apptainer run $HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in`
* ou `apptainer exec $HOME/apptainer-images/quantum-espresso.sif pw.x -in qe-tutorial.in`
* ou `$HOME/apptainer-images/quantum-espresso.sif -in qe-tutorial.in`
* ou

```bash
apptainer exec \
  --env OMP_NUM_THREADS=1 \
  $HOME/apptainer-images/quantum-espresso.sif \
  mpirun -np 1 pw.x -in qe-tutorial.in
```

### Exercice 2
Comment utiliser l'image de conteneur pour effectuer un calcul Quantum Espresso (1 thread **OpenMP** et 16 cœurs **MPI**) ?

**Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/quantum-espresso.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `qe-tutorial.in`) sont situés dans le répertoire courant : `$PWD`

Exemple de réponse possible :

```bash
apptainer exec \
  $HOME/apptainer-images/quantum-espresso.sif \
  mpirun -np 16 pw.x -in qe-tutorial.in
```
où l'option `--env OMP_NUM_THREADS=1` est implicite et que le conteneur utilise par défaut. 

### Exercice 3
Comment utiliser l'image de conteneur pour effectuer un calcul Quantum Espresso (2 threads **OpenMP** et 8 cœurs **MPI**) complètement isolé du système hôte ?

**Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/quantum-espresso.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `qe-tutorial.in`) sont situés au chemin suivant : `$HOME/quantum-espresso-examples/exercice/`

Exemple de réponse possible

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=2 \
  --bind $HOME/quantum-espresso-examples/exercice/=$HOME \
  $HOME/apptainer-images/quantum-espresso.sif \
  mpirun -np 8 pw.x -in qe-tutorial.in
```

</div>
