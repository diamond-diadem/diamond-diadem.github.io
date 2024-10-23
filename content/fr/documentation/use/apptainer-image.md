---
title: Comment interagir avec une image Apptainer ?
weight: 1
---

<div align="justify">

{{< callout context="note" title="" icon="outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install/install_apptainer/) pour plus de détails.

Ce tutoriel explicite les principales commandes permettant d'interagir avec une image Apptainer pour générer et manipuler des conteneurs. Les instructions présentées ici sont en principe valables pour tout conteneur Apptainer.

{{< /callout >}}

<iframe class="tuto-video" src="https://www.youtube.com/embed/CPEsOTpOcic?si=59P2En0ztmJ0ykwu&cc_lang_pref=fr&cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen ></iframe>

Une image sur mesure dédiée à la mise en pratique de ce tutoriel est disponible en tapant la commande suivante :

```bash
 apptainer pull tutorial.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/tutorial.sif:latest
 ```

Ainsi, vous récupérez une image Apptainer (format de fichier `.sif`). Cette image est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv ./tutorial.sif $HOME/apptainer-images/tutorial.sif
```

## Apptainer : cours accéléré
Cette section s'adresse aux personnes n'ayant pas encore utilisé Apptainer.

La principale manière d'interagir avec l'image se fait en invoquant la commande `apptainer` suivie de différents arguments :

* L'argument `run` permet de faire naître un conteneur à partir de l'image, d'invoquer la *commande par défaut de l'image*  dans le conteneur puis de détruire le conteneur.

```bash
$ apptainer run $HOME/apptainer-images/tutorial.sif
```

**Note**
> Si la commande lancée par `apptainer run` acceptait des arguments supplémentaires (ce qui n'est pas le cas ici), il serait possible de les fournir en les ajoutant à la suite.

* L'argument `exec` est similaire à l'argument `run` mais permet d'invoquer **n'importe quelle commande** dans le conteneur. Par exemple :

```bash
$ apptainer exec $HOME/apptainer-images/tutorial.sif echo "Hi from the container !"
```

crée un conteneur à partir de l'image `$HOME/apptainer-images/tutorial.sif`, invoque la commande `echo "Hi from the container !"` du shell dans le conteneur puis détruit le conteneur.

* l'argument `shell` permet d'ouvrir un shell interactif au sein du conteneur (le *prompt* `Apptainer>` apparaît alors à gauche de la ligne de commande) et d'y effectuer plusieurs commandes successives, puis d'en sortir en détruisant le conteneur avec `exit` ou `Crtl+D`. Par exemple :

```bash
$ apptainer shell $HOME/apptainer-images/tutorial.sif
Apptainer> pwd
Apptainer> cd ..
Apptainer> pwd
Apptainer> date
Apptainer> exit
$
```

**Remarque**
> En jouant avec les arguments `exec` et `shell` à partir de différentes images, vous remarquerez parfois que le nombre de commandes accessibles depuis le conteneur est très restreint. Dans l'idéal, un conteneur se limite en effet le plus possible aux outils nécessaires à l'exécution du code qu'il contient en s'affrachissant des outils superflus, pour des raisons de portabilité (taille de l'image) et de sécurité.

* l'argument `run-help` permet d'afficher le message d'aide inclus dans l'image.

```bash
apptainer run-help $HOME/apptainer-images/tutorial.sif
```

* l'argument `inspect` permet d'afficher les métadonnées relatives à l'image (auteur de l'image, version, date de création, ...)

```bash
apptainer inspect $HOME/apptainer-images/tutorial.sif
```

Il est également possible d'exécuter l'image directement, comme un binaire :

```bash
$ $HOME/apptainer-images/tutorial.sif
```

ce qui est strictement équivalent à `apptainer run $HOME/apptainer-images/tutorial.sif`

## Variables d'environnement
Pour leur bon fonctionnement, de nombreux outils requièrent que certaines variables d'environnement soient définies. En principe, un conteneur correctement construit leur définit au préalable des valeurs par défaut pertinentes, mais il est courant qu'un utilisateur souhaite en modifier une (ou plusieurs). Avec Apptainer, il est possible de spécifier la valeur que l'on souhaite donner à une variable d'environnement via le flag `--env`.

Par exemple, la commande par défaut lancée par `apptainer run $HOME/apptainer-images/tutorial.sif` est la suivante :

```bash
echo $GREET $USER "who just ran the default command of the container."
```

où la variable `$GREET` est définie pour renvoyer "Welcome" par défaut au sein du conteneur.

La variable `$USER` est récupérée pour que sa valeur dans le conteneur soit identique à celle de la machine hôte. Ce fonctionnement n'est pas spécifique à l'image étudiée lors de ce tutoriel, il s'agit d'un des nombreux comportements standards d'Apptainer pour faciliter l'utilisation de conteneurs au sein d'environnements de calcul haute performance.

Ces deux variables d'environmmement peuvent être redéfinies :

```bash
apptainer run --env GREET=Hello $HOME/apptainer-images/tutorial.sif
```

ou

```bash
apptainer run --env USER=newusername $HOME/apptainer-images/tutorial.sif
```

**Remarque**
> Dans le cas où l'on modifie `$USER`, il est possible qu'Apptainer affiche un message prévenant que la modification de la variable est acceptée mais dévie du fonctionnement par défaut.

```bash
WARNING: Environment variable USER already has value [newusername], will not forward new value [oldusername] from parent process environment
```

## Isolation entre l'hôte et le conteneur
Par défaut, Apptainer n'isole pas totalement le conteneur du système de la machine hôte, mais il existe des optionsœ permettant d'altérer plus ou moins finement ce comportement. Ces options, ainsi que les répertoires partagés par défaut, sont discutés extensivement dans une [section dédiée de la documentation](/documentation/use/apptainer-isolation-flags/).

Ici, on se contente de présenter l'option la plus générale (`--containall`) permettant d'isoler à la fois l'environnement logiciel et le système de fichiers du conteneur vis-à-vis de ceux de l'hôte.

```bash
apptainer run --containall $HOME/apptainer-images/tutorial.sif
```

Il est prévisible, en jouant avec cette option, que le répertoire contenant les éventuels fichiers d'entrée et de sortie requis ne soit pas accessible dans le conteneur ! Il faut alors monter ce dossier manuellement avec le flag `--bind` dans le conteneur. Par exemple, on peut imaginer le petit exercice suivant consistant à créer un fichier sur la machine hôte, le rendre accessible au sein du conteneur, en créer une copie dans le conteneur, puis récupérer cette copie sur la machine hôte :

```bash
# Création d'un fichier sur la machine hôte
date > $PWD/test-host.txt

apptainer exec                          \
    --containall                        \
    --bind $PWD:/opt                    \ # Montage du répertoire courant au /opt du conteneur
    $HOME/apptainer-images/tutorial.sif \
    cp /opt/test-host.txt /opt/test-container.txt # Création d'une copie dans le conteneur

# Vérification sur la machine hôte
cat $PWD/test-host.txt $PWD/test-container.txt
```

## Voir aussi
Si ce tutoriel vous a été utile pour découvrir les bases d'Apptainer, vous pouvez également consulter les pages suivantes afin de mieux vous approprier les outils de la plateforme :
* [Comment utiliser un code conteneurisé en parallèle ?](/documentation/use/apptainer_parallel/)
* [Quelles sont les options d'isolation entre un conteneur et sa machine hôte ?](/documentation/use/apptainer-isolation-flags/)
* [Et pour les paquets Guix ?](/documentation/use/guix_package)
* [Comment demander de l'aide ?](/documentation/use/ask_help)

</div>
