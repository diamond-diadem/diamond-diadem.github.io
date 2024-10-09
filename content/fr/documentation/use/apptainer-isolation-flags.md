---
title: Options d'isolation avancées pour Apptainer
linkTitle: Options d'isolation avancées pour Apptainer
weight: 3
---

Cette page est dédiée aux discussions autour de l'isolation des conteneurs Apptainer. Ce point est évoqué rapidement dans la plupart des tutoriels de la plateforme ; cette page couvre les tenants et les aboutissants de l'isolation plus en profondeur, avec l'objectif de permettre un contrôle plus fin du partage entre hôte et conteneur.

## Comportement par défaut d'Apptainer

En tant que solution de conteneurisation orientée vers le calcul haute performance, Apptainer est configuré par défaut pour faciliter la lecture et l'écriture de données d'entrée/de sortie ou de logs. 

D'après la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/bind_paths_and_mounts.html), les répertoires partagés entre le conteneur et la machine hôte sont les suivants :
* le `$HOME` de l'utilisateur ou l'utilisatrice, car il contient en général le gros des données dont le code conteneurisé pourrait avoir besoin à l'exécution.
* le répertoire courant au sein duquel Apptainer est appelé (`$PWD`), puisqu'il contient souvent les fichiers d'entrée dont le code conteneurisé a besoin. Notez que dans le cas où des liens symboliques résident dans le chemin menant au répertoire courant sur la machine hôte, leur interprétation au sein du conteneur peut mener à des problèmes d'exécution.
* `/dev` qui contient les entrées pour les périphériques physiques utilisés par le système hôte. Ce répertoire est, par exemple, utile dans le cas de logiciels de visualisation pour accéder aux ressources graphiques de l'hôte.
* `/proc` et `/sys` qui contiennent les informations sur les processus en cours d'exécutions sur le noyau de l'hôte. Le partage de cette ressource est essentiel afin de permettre au conteneur d'accéder au noyau de la machine hôte, sur lequel il se base pour s'exécuter.
* `/tmp` et `/var/tmp`, les répertoires pour le stockage temporaire de données (à courte et moyenne durée de vie, respectivement).

Certains fichiers spécifiques sont également partagés entre l'hôte et le conteneur :
* `/etc/hosts` contenant des informations relatives à la résolution du nom d'hôtes pour divers protocoles réseau, parfois requis lors de l'exécution de codes conteneurisés.
* `/etc/localtime` configurant le fuseau horaire à utiliser à l'échelle du système, et dont on peut avoir besoin au sein des codes conteneurisés.

Enfin, il peut arriver qu'Apptainer soit configuré pour inclure d'autres fichiers systèmes utiles : `/etc/resolve.conf` (d'une utilité analogue à `/etc/hosts` présenté précédemment), `/etc/group` (recensant les données relatives aux groupes utilisateurs) ou encore `/etc/passwd` (contenant des informations relatives au compte même des utilisateurs et utilisatrices *mais pas leur mot-de-passe* contrairement à ce que le nom du fichier suggère). Insistons cependant : le partage de ces fichiers n'est pas standard pour Apptainer mais dépend de la configuration des installations individuelles.

Notez toutefois que, comme le paragraphe précédent le suggère, il est possible pour l'administrateur ou l'administratrice système de votre infrastructure de calcul d'altérer le comportement par défaut d'Apptainer. Ainsi, une configuration préalable permet de priver le conteneur de cet accès *transparent* à certains ou tous les répertoires présentés plus haut, en général pour des raisons de sécurité.

De manière connexe, Apptainer permet au conteneur d'accéder par défaut à la valeur de toutes les variables d'environnement définies sur le système hôte (à l'exception de la variable `$PATH` redéfinie pour pointer vers les chemins embarquant les exécutables du conteneur). L'idée est de faciliter la prise en main des utilisateurs et utilisatrices en autorisant les codes conteneurisés à accéder aux variables d'environnement dont ils ont besoin en empruntant les valeurs de la machine hôte. Les outils de visualisation font office d'exemple pertinent pour justifier ce choix : ceux-ci ont besoin de la variable d'environnement `$DISPLAY` pour afficher leur interface sur les ressources graphiques de votre machine, et emprunter sa valeur sur système hôte permet au conteneur de fonctionner efficacement. 

## Isolation additionnelle

Si la section précédente résume le fonctionnement par défaut d'Apptainer en terme d'isolation et présente les options de configuration côté administrateur ou administratrice système, il existe également des options permettant à l'utilisateur ou l'utilisatrice d'avoir un contrôle relativement fin sur ce comportement.

Ces options répondent à des besoins variés, que l'on peut séparer en deux groupes (*non-exclusifs*). D'une part, on peut vouloir priver le conteneur de l'accès à des répertoires partagés par défaut avec notre machine hôte (par exemple, pour ajouter une couche de sécurité supplémentaire et éviter d'écraser des données importantes). D'autre part, on peut souhaiter empêcher le transfert de variables d'environnement depuis l'hôte vers le conteneur (par exemple, car l'une des variables définies sur l'hôte entre en conflit avec la bonne exécution du code conteneurisé).

### Le flag `--cleanenv`

Dans le cas où l'on veut nettoyer au maximum l'environnement logiciel du conteneur, il est possible d'adjoindre le flag `--cleanenv` (ou `-e`) à `apptainer run` ou `apptainer exec`. 

```bash
apptainer exec --cleanenv <nom-de-l-image> <commande>
```

En pratique, cela revient à priver le conteneur des valeurs de toutes les variables d'environnement de l'hôte (à l'exception de `$HOME` et `$PWD`). C'est pratique pour s'assurer qu'aucune variable d'environnement *cachée* n'entrave le bon fonctionnement du conteneur. Autrement dit, et en plus de pouvoir solutionner d'occasionnels problèmes d'exécution spécifiques, c'est aussi une très bonne solution en terme de reproductibilité scientifique puisqu'elle permet de réduire les ingérences de la machine hôte dans l'exécution des conteneurs (et donc de mieux répliquer l'environnement logiciel entre les différentes machines).

Cependant, le contrecoup de cette option est d'ordre pratique : si Apptainer partage par défaut les variables d'environnement de l'hôte, c'est pour faciliter la vie de l'utilisateur ou de l'utilisatrice en allégeant les commandes. En reprenant l'exemple des logiciels de visualisation cité plus haut, l'utilisation de `--cleanenv` empêche le conteneur d'accéder à la variable `$DISPLAY` de l'hôte :

```bash
apptainer run --cleanenv <image-logiciel-visualisation> 
  [...]
  could not connect to display
  [...]
```
Il faut alors la spécifier manuellement grâce au flag `--env <VARIABLE>=<valeur>` :
```bash
apptainer run --cleanenv --env DISPLAY=$DISPLAY <image-logiciel-visualisation> 
  [...]
  # ÇA FONCTIONNE !
  [...]
```
La détermination des variables à fixer manuellement (et la valeur à leur attribuer) n'est évidemment pas toujours triviale, mais l'on peut se référer aux documentations officielles si l'on souhaite adopter cette *bonne pratique*.

### Le flag `--contain` et ses alternatives

L'autre versant de l'isolation de conteneurs, c'est de limiter l'accès de ces derniers aux répertoires de la machine hôte. Pour cela, il existe deux options dédiées : `--no-mount` et `--contain`.

Le flag `--no-mount <mot(s)-clé(s)>` permet de sélectionner manuellement le ou les répertoires de l'hôte partagés par défaut dont on veut retirer l'accès au conteneur. Voici quelques exemples d'utilisation :
```bash
# Pour retirer /dev des répertoires partagés avec le conteneur
apptainer exec --no-mount dev <image> <commande>

# Pour retirer /sys et /proc des répertoires partagés avec le conteneur
apptainer exec --no-mount sys,proc <image> <commande>
```
Dans le cas où c'est de notre `$HOME` dont on veut priver le conteneur, il y a deux solutions équivalentes
```bash
apptainer exec --no-mount home <image> <commande>
# équivalent à
apptainer exec --no-home <image> <commande>
```
> Notez que si le répertoire courant fait partie de notre `$HOME`, il n'est pas exclu par `--no-mount home` et doit être explicitement spécifié avec `--no-mount cwd` si l'on veut en priver le conteneur.

Il est toutefois important de préciser que l'utilisation de `--no-mount` est assez agressive : si l'on choisit d'exclure un répertoire avec ce flag, alors le répertoire au sein du conteneur sera complètement vide.
```bash
apptainer exec --no-mount dev <image> ls /dev
  # N'affiche rien
```
En conséquence, il convient d'utiliser ce flag avec parcimonie, *a fortiori* lorsque le répertoire en question contient des ressources importantes (notamment `/proc`).

Le flag `--contain` (ou `-c`) est quand à lui voué à une utilisation plus générale : il nettoie les répertoires partagés par défaut sans pour autant en supprimer l'intégralité du contenu. On peut voir cette option comme une version alternative de `--no-mount tmp,home,cwd,dev`, avec les différentes suivantes :
* `--no-mount home,cwd` supprime complètement le `$HOME` de l'utilisateur ou de l'utilisatrice ainsi que le chemin menant au répertoire courant, là où `--contain` en crée une copie vide.
* `--no-mount dev` supprime l'intégralité du contenu de `/dev`, alors que `--contain` en nettoie une large partie par rapport au comportement par défaut mais conserve tout de même quelques fichiers et répertoires importants.

Pour résumer, on peut donc voir `--contain` comme une option générale d'isolation pour réduire à moindre risque les échanges entre le conteneur et la machine hôte, et `--no-mount` comme une option à la fois plus agressive et permettant de cibler plus directement des parties spécifiques de l'arborescence du système.

Peu importe laquelle de ces options on utilise, il est en général courant de les coupler au flag `--bind <répertoire-hôte>:<répertoire-conteneur>` pour monter manuellement des répertoires entre l'hôte et le conteneur. Par exemple, si l'on souhaite utiliser `--contain` et permettre malgré tout au conteneur d'utiliser les données du répertoire courant pour faire un calcul :
```bash
# Fichier d'entrée contenu dans le répertoire courant sur la machine hôte.
ls ./
  input.file

apptainer exec --contain <image> <exécutable> input.file
  [...]
  # Fichier d'entrée "input.file" non trouvé

# On utilise --bind pour monter le répertoire courant ($PWD) à l'emplacement du conteneur
# où l'on se trouve par défaut avec --contain ($HOME).
apptainer exec --contain --bind $PWD:$HOME <image> <exécutable> input.file
  [...]
  # ÇA FONCTIONNE !
```

### Le flag `--containall`

Il s'agit de la dernière option disponibe pour isoler un conteneur de la machine hôte. On peut considérer que le flag `--containall` (ou `-C`) comme une conjonction de `--cleanenv` et `--contain`.

Ainsi, cette option nettoie d'une part l'environnement logiciel de manière identique à `--cleanenv` et filtre la quasi-intégralité des variables d'environnement de l'hôte au conteneur (voir la [section dédiée](#le-flag---cleanenv) plus haut).

Si on emploie `--containall` et que l'on souhaite attribuer une valeur à une ou plusieurs variables d'environnement au sein d'un conteneur, il faut donc utiliser le flag `--env <variable>=<valeur>`, comme on le ferait avec `--cleanenv`.

L'option `--containall` réplique également le comportement de `--contain`, avec une isolation supplémentaire : on a vu [précédemment](#le-flag---contain-et-ses-alternatives) que `--contain` isole partiellement les répertoires `/tmp`, `/var/tmp`, `/dev`, `$HOME` et `$PWD`. En plus de ceux-ci, `--containall` isole également une partie de `/proc` en dissimulant l'identifiant des processus (`pid`) de l'hôte ainsi que les communications inter-processus (`ipc`).

En conséquence, si l'on souhaite utiliser `--containall` et laisser le conteneur accéder à des données de la machine hôte, par exemple pour accéder à des données d'entrée, il faut recourir au flag `--bind <répertoire-hôte>:<répertoire-conteneur>`.

Pour reprendre l'exemple, employé plus haut, d'un code de visualisation conteneurisé, l'utilisation conjointe de `--containall`, `--env` et `--bind` se fait ainsi

```bash
# Pour un code de visualisation, le conteneur a besoin de la variable $DISPLAY
# pour utiliser les ressources graphiques de la machine hôte. Pour accéder aux 
# fichiers d'entrée qu'on suppose dans le répertoire courant $PWD, il faut les
# monter à l'emplacement auquel on se trouve dans le conteneur par défaut avec
# le flag --containall.
apptainer run --containall           \
              --env DISPLAY=$DISPLAY \
              --bind $PWD:$HOME      \
              <image-logiciel-visualisation> $HOME/<fichier-d-entrée>
```
