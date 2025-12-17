---
title: Foire Aux Questions
linkTitle: Accueil
toc: true
weight: 2
---

<div align="justify">

### Est-ce que DIAMOND fournit des ressources informatiques ou des heures de calcul ?

En bref, non. Le projet DIAMOND a pour objectif d’accompagner les partenaires du PEPR DIADEM en mettant à disposition des codes conteneurisés, des chaînes de calcul scientifiques (notamment via AiiDA) ainsi qu’une expertise en intelligence artificielle. En revanche, il ne fournit pas d’accès à des ressources de calcul.

### Comment lancer un conteneur de visualisation sans droits super-utilisateur ?

Si vous n'avez pas les droits super-utilisateurs sur votre machine, il se peut que vous rencontriez des problèmes pour autoriser le retour graphique à partir des conteneurs de visualisation. Pour résoudre ce problème, vous pouvez utiliser la commande `xhost` (pour ajouter un nom d'hôte à la liste des machines pour lesquelles une connexion X est autorisée) via la commande :

```bash
xhost +SI:localhost:<username> # pour se connecter au cluster Dahu par exemple
```

Une fois que vous avez fini d'utiliser le conteneur, nous vous recommandons de rétablir le comportement initial de votre session via la commande `xhost -SI:localhost:<username>`

**Note**

> Ce problème nous a uniquement été signalé, pour le moment, sur les sessions basées sur `wayland`. En conséquence, la solution proposée n'a pu être éprouvée que dans ce cas particulier. Si vous rencontrez ce problème dans d'autres conditions et/ou que la solution ci-dessus ne fonctionne pas pour vous, merci de nous le [signaler](/documentation/use/ask-help/).

### Comment lancer un conteneur de visualisation sur les frontales HPC ?

Il est possible de lancer un conteneur de visualisation (type Ovito) sur les frontales HPC. Pour ce faire, vous devez au préalable vous connecter aux frontales avec le `X11 forwarding` via la commande :

```bash
ssh -X dahu.ciment # pour se connecter au cluster Dahu par exemple
```

Ensuite, il faut veiller à monter le dossier `$HOME` pour avoir accès au fichier `.Xauthority` (qui stocke les cookies d'authentification de la session). Cela vous permettra de renseigner la variable d'environnement `$DISPLAY` sans obtenir d'erreur au moment d'utiliser le conteneur.

Vous aurez ensuite un retour graphique pour l'image Apptainer d'Ovito grâce à la commande :

```bash
apptainer run --contain --bind $HOME --cleanenv --env DISPLAY=$DISPLAY ovito.sif
```

**Attention**

> Il est déconseillé de lancer des processus lourds sur les frontales des clusters. Sur certains clusters, il existe des services tuant tous les processus qui s'exécutent plus de **X** minutes. C'est le cas notamment des frontales `dahu` et `bigfoot`.

</div>