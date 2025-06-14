---
title:  Comment utiliser l'image Apptainer de LAMMPS ?
linkTitle: Tutoriel LAMMPS
weight: 1
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install/install_apptainer/) pour plus de détails.

Ce tutoriel détaille l'utilisation de l'image de conteneur du code LAMMPS téléchargeable à [cette adresse](/codes/scientific-computing/lammps/). En suivant ce lien, vous récupérez une image Apptainer (format de fichier `.sif`) qui vous permettra de créer des conteneurs à même de faire tourner LAMMPS.

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/).

Pour rapidement s'approprier les principales commandes d'Apptainer, vous pouvez vous référer à [ce tutoriel](/documentation/use/apptainer-image/).

{{< /callout >}}

<!-- <div class="youtube-video" data-video-id="MheJO_FndWw?si=ASHe6wYhiFqR1te9" language="fr">
    <div class="youtube-placeholder fr">
        <button class="popup-button">Consentement aux cookies</button>
    </div>
</div> -->

{{< video-with-consent id="MheJO_FndWw?si=ASHe6wYhiFqR1te9" >}}

L'image que vous avez téléchargée est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv lammps.sif $HOME/apptainer-images/lammps.sif
```

Pour illustrer les différentes commandes, un jeu de fichiers d'entrée LAMMPS est disponible sous forme d'archive via [ce lien](/downloads/lammps-tutorial-inputs.tar.gz). L'archive contient les fichiers nécessaires pour effectuer un calcul de dynamique moléculaire pour un système hybride Silicium/Carbone dont les interactions entre atomes sont modélisées par un potentiel de type *Modified embedded atom method* (MEAM). Les fichiers sont les suivants :

* `data.meam` est un fichier contenant les positions des atomes de Silicium et de Carbone ainsi que la définition de la boîte de simulation.
* `in.file` est le script d'entrée principal de LAMMPS. Il définit les variables requises par LAMMPS et donne les instructions nécessaires pour effectuer un calcul de dynamique moléculaire.
* `library.meam` est un fichier de paramètres génériques utilisé par le potentiel MEAM pour représenter les interactions *par défaut* entre une large variété d'éléments chimiques.
* `SiC.meam` est également un fichier définissant les paramètres des interactions MEAM ; contrairement au fichier précédent, il définit spécifiquement les interactions entre atomes de Silicium et de Carbone.

Dans ce tutoriel, on supposera que les fichiers d'entrée contenus dans cette archive sont dans le répertoire courant :

```bash
tar -xzf DIAMOND-tutorial.tar.gz # Extrait le contenu de l'archive, créée ./tutorial
cd ./tutorial
```

## Commande en une ligne
Pour les personnes pressées, voici comment lancer un calcul LAMMPS parallèle en utilisant l'image de conteneur (téléchargée au préalable et située à `$HOME/apptainer-images/lammps.sif`). Dans le cas où le répertoire courant contient les fichiers d'entrée nécessaires pour LAMMPS :

```bash
apptainer exec $HOME/apptainer-images/lammps.sif mpirun -np <N> lmp_mpi -in <input.lammps>
```

## Détail d'utilisation du conteneur LAMMPS
Cette section présente les différentes manières d'utiliser l'image LAMMPS. Pour plus de détails sur les commandes Apptainer, veuillez vous référer à [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Utiliser le conteneur LAMMPS en séquentiel
Pour exécuter LAMMPS en séquentiel (c'est-à-dire sans parallélisation) sans conteneur, on utiliserait la commande :

```bash
lmp_mpi -in in.file
```
où tous les fichiers d'entrée LAMMPS (dont `in.file` le fichier d'entrée principal) sont stockés dans le répertoire courant.

Pour effectuer la même chose dans un conteneur, on peut exécuter trois commandes équivalentes. Dans chacun des exemples suivants, on suppose que l'image Apptainer `lammps.sif` est stockée sous `$HOME/apptainer-images/lammps.sif`.

* On peut utiliser `apptainer exec` qui permet d'exécuter une commande spécifique dans le conteneur.

```bash
apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -in in.file
```

* On peut utiliser `apptainer run` qui appelle la commande par défaut du conteneur, à savoir l'exécutable `lmp_mpi`, en lui spécifiant à la suite les instructions permettant à LAMMPS de localiser le fichier d'entrée.

```bash
apptainer run $HOME/apptainer-images/lammps.sif -in in.file # "lmp_mpi" est implicitement appelé par "run"
```

* On peut enfin appeler directement l'image comme un exécutable, ce qui est strictement identique à l'utilisation de `apptainer run`.

```bash
$HOME/apptainer-images/lammps.sif -in in.file
```

### Utiliser le conteneur LAMMPS en parallèle
L'image `lammps.sif` embarque une version de LAMMPS supportant la parallélisation via **OpenMP** et **MPI**.

Dans le cas où aucune conteneurisation ne serait utilisée, la commande typique ressemblerait à :

```bash
OMP_NUM_THREADS=2 mpirun -np 4 lmp_mpi -in in.file
```

En utilisant ce conteneur, la même commande devient :

```bash
apptainer exec --env OMP_NUM_THREADS=2 $HOME/apptainer-images/lammps.sif mpirun -np 4 lmp_mpi -in in.file
```

**Remarque**
> Si rien n'est précisé, LAMMPS utilise par défaut un seul thread **OpenMP** (`$OMP_NUM_THREADS=1`) et répartit les processus **MPI** sur l'intégralité des cœurs disponibles.

Dans la commande précédente, on utilise la commande `mpirun` fournie par la version d'**OpenMPI** embarquée dans le conteneur pour communiquer directement avec le matériel de la machine hôte. Cette utilisation *embarquée* présente un avantage majeur, puisque l'on utilise uniquement les outils installés dans le conteneur : elle fonctionne sur toutes les machines hôtes sans requérir d'installation. Néanmoins, la version d'**OpenMPI** présente au sein du conteneur n'est pas construite pour tourner de manière optimale sour toutes les machines hôtes, mais pour fourninr des performances satisfaisantes sur une gamme de machine aussi large que possible. Typiquement, dans le cas de Quantum Espresso, on observe que l'utilisation du processeur plafonne entre 85 et 90% en parallélisation embarquée. Par ailleurs, ce mode de parallélisation ne permet pas non plus d'effectuer du calcul distribué sur plusieurs nœuds de calcul. Si une facilité de portage au prix de performances légèrement dégradées peuvent convenir pour effectuer de simples essais sur une machine locale, ce n'est pas le cas sur une infrastructure de calcul haute performance.

Dans le cas où les performances numériques sont centrales, il est recommandé d'utiliser un mode de parallélisation hybride, où l'on utilise la version d'**OpenMPI** de la machine hôte comme intermédiaire entre celle du conteneur et la matériel de la machine hôte. Pour plus de détails, veuillez consulter la [page dédiée](/documentation/use/apptainer_parallel/).

### Afficher l'aide
Pour afficher le message d'aide du conteneur (on suppose l'image stockée sous `$HOME/apptainer-images/lammps.sif`) :

```bash
apptainer run-help $HOME/apptainer-images/lammps.sif
```

Pour afficher les méta-données du conteneur (propriétaire du code, version, auteur de l'image, ...) :

```bash
apptainer inspect $HOME/apptainer-images/lammps.sif
```

Pour lancer la commande d'aide spécifique à l'exécutable LAMMPS du conteneur (`lmp_mpi`) :

```bash
apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -h
```
ou

```bash
apptainer run $HOME/apptainer-images/lammps.sif -h
```
ou

```bash
$HOME/apptainer-images/lammps.sif -h
```

### Isolation partielle ou isolation totale
Par défaut, Apptainer n'isole pas totalement le conteneur du système de la machine hôte ; pour une isolation partielle ou totale, il faut utiliser respectivement les flags `--no-mount` ou `--no-home` et `--contain-all` (voir [ce lien](/documentation/use/apptainer-isolation-flags) pour plus d'informations).

Dans le cas où l'option `--containall` est activée, le répertoire contenant les fichiers d'entrée de LAMMPS n'est pas accessible dans le conteneur !

```bash
apptainer run --containall $HOME/apptainer-images/lammps.sif -in in.file # in.file non trouvé !
```
Il faut alors monter manuellement le répertoire courant (`$PWD`) avec le flag `--bind` au répertoire où l'on se trouve par défaut dans le conteneur (`$HOME`). Par exemple :

```bash
apptainer run --containall --bind $PWD:$HOME \ # On monte le répertoire courant au $HOME du conteneur.
  $HOME/apptainer-images/lammps.sif -in in.file
```
dans le cas où les fichiers d'entrée de LAMMPS se situent dans le répertoire courant (`$PWD`).

### Potentiels interatomiques
Dans LAMMPS, les interactions entre atomes sont modéilisées par des champs de force (ou potentiels interatomiques) dont les paramètres sont spécifiés au sein de fichiers formattés. Le type d'interaction à appliquer (*càd.* le type de fichier à rechercher) dans chaque cas est explicité au sein du fichier d'entrée principal de LAMMPS.

Par exemple dans notre cas, le fichier d'entrée `in.file` précise à LAMMPS qu'il doit modéliser les interactions Silicium/Carbone grâce aux paramètres contenus dans `SiC.meam`.

À l'exécution le code cherche les fichiers décrivant les interactions dans l'ordre suivant :

* Tout d'abord, il cherche un fichier de potentiel correspondant (localisation, type de potentiel, nom, ...) à celui spécifié dans le fichier d'entrée principal (`in.file`).
* Si rien n'est trouvé au chemin indiqué dans le fichier d'entrée principal (`in.file`), par exemple si on a malencontreusement renomé le fichier

```bash
mv SiC.meam old.meam # renommage malencontreux
```
alors le code cherche dans le répertoire désigné par la variable d'environnement `$LAMMPS_POTENTIALS`.

Dans le cas de cette image de conteneur, cette variable `$LAMMPS_POTENTIALS` pointe au sein du conteneur vers le chemin `/usr/share/lammps/potentials`. Ce répertoire contient les fichiers de potentiel fournis par défaut avec la version du code présente dans le conteneur.

Dans le cas (peu fréquent) où l'on dispose d'un autre jeu de potentiels que l'on veut utiliser par défaut (dans `$HOME/Documents/softs/lammps/potentials/` par exemple), il est toutefois possible d'altérer ce comportement de deux manières :

* On peut d'une part écraser le contenu de `/usr/share/lammps/potentials` en montant un autre répertoire de la machine hôte sur ce chemin (via `--bind`). Dans ce cas, `$LAMMPS_POTENTIALS` pointe toujours sur `/usr/share/lammps/potentials` mais le contenu de ce répertoire est écrasé.

```bash
# On écrase le contenu de /usr/share/lammps/potentials dans le conteneur.
apptainer run --bind $HOME/Documents/softs/lammps/potentials/:/usr/share/lammps/potentials \
  $HOME/apptainer-images/lammps.sif -in in.file
```

* On peut aussi redéfinir la variable `$LAMMPS_POTENTIALS` (avec `--env`) pour qu'elle pointe vers un autre répertoire de la machine hôte. Dans ce cas `$LAMMPS_POTENTIALS` est modifiée et le code cherche les potentiels dans le nouveau chemin qu'on a indiqué.

```bash
# Si aucune option d'isolation n'est précisée, $HOME/Documents/softs/lammps/potentials/
# est accessible dans le conteneur.
apptainer run --env LAMMPS_POTENTIALS=$HOME/Documents/softs/lammps/potentials/ \
  $HOME/apptainer-images/lammps.sif -in in.file
```

* Attention cependant à bien s'assurer que ce nouveau répertoire est également accessible dans le conteneur. Par exemple :

```bash
# Par défaut, /opt/lammps-potentials n'est pas partagée entre l'hôte et le conteneur.
# Il faut donc monter ce répertoire avec --bind.
apptainer run --env LAMMPS_POTENTIALS=/opt/lammps-potentials \ # redéfinition de $LAMMPS_POTENTIALS
  --bind /opt/lammps-potentials:/opt/lammps-potentials       \ # montage du répertoire dans le conteneur
  $HOME/apptainer-images/lammps.sif -in in.file
```

## Exercices

### Exercice 1
Comment utiliser l'image de conteneur pour effectuer un calcul LAMMPS en séquentiel ?

> **Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/lammps.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `in.file`) sont situés dans le répertoire courant : `$PWD`

Réponses possibles :
* `apptainer run $HOME/apptainer-images/lammps.sif -in in.file`
* ou `apptainer exec $HOME/apptainer-images/lammps.sif lmp_mpi -in in.file`
* ou `$HOME/apptainer-images/lammps.sif -in in.file`
* ou

```bash
apptainer exec \
  --env OMP_NUM_THREADS=1 \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 1 lmp_mpi -in in.file
```


### Exercice 2
Comment utiliser l'image de conteneur pour effectuer un calcul LAMMPS (1 thread **OpenMP** et 16 cœurs **MPI**) ?

**Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/lammps.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `in.file`) sont situés dans le répertoire courant : `$PWD`

Exemple de réponse possible :

```bash
apptainer exec \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 16 lmp_mpi -in in.file
```
où l'option `--env OMP_NUM_THREADS=1` est implicite et que le conteneur utilise par défaut.

### Exercice 3
Comment utiliser l'image de conteneur pour effectuer un calcul LAMMPS (2 threads **OpenMP** et 8 cœurs **MPI**) complètement isolé du système hôte ?

**Données**
> * L'image est située au chemin suivant : `$HOME/apptainer-images/lammps.sif`
> * Les fichiers d'entrée (dont le fichier d'entrée principal nommé `in.file`) sont situés au chemin suivant : `$HOME/lammps-examples/exercice/`

Exemple de réponse possible

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=2 \
  --bind $HOME/lammps-examples/exercice/=$HOME \
  $HOME/apptainer-images/lammps.sif \
  mpirun -np 8 lmp_mpi -in in.file
```

<!-- ## Problèmes fréquemment rencontrés avec l'image de LAMMPS

### Problème Lorem ipsum
**Description du problème** Lorem ipsum
**Solution au problème**
Ce problème est du à lorem ipsum
```bash
lorem-ipsum
``` -->


</div>
