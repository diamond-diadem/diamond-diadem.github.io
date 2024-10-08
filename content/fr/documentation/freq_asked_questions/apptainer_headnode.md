---
title: Lancer un conteneur de visualisation sur les frontales HPC
linkTitle: Lancer un conteneur de visualisation sur les frontales HPC
toc: false
weight: 4
---

Il est possible de lancer un conteneur de visualisation (type Ovito) sur les frontales HPC. Pour ce faire, vous devez au préalable vous connecter aux frontales avec le `X11 forwarding` via la commande :

```bash
ssh -X dahu.ciment # pour se connecter au cluster Dahu par exemple
```

Ensuite, il faut veiller à monter le dossier `$HOME` pour avoir accès au fichier `.Xauthority` (qui est stocke les cookies d'authentification de la session). Cela vous permettra de renseigner la variable d'environnement `$DISPLAY` sans obtenir d'erreur au moment d'utiliser le conteneur.

Vous aurez ensuite un retour graphique pour l'image Apptainer d'Ovito grâce à la commande :

```bash
apptainer run --contain --bind $HOME --cleanenv --env DISPLAY=$DISPLAY ovito.sif
``` 

> **Attention** Il est déconseillé de lancer des processus lourds sur les frontales des clusters. Sur certains clusters, il existe des services tuant tous les processus qui s'exécutent plus de **X** minutes. C'est le cas notamment des frontales `dahu` et `bigfoot`.