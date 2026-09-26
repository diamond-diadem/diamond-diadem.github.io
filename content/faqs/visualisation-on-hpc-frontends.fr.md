---
title: Comment lancer un conteneur de visualisation sur les frontales HPC ?
weight: 70
---

Il est possible de lancer un conteneur de visualisation (type Ovito) sur les
frontales HPC. Pour ce faire, connectez-vous d'abord aux frontales avec le
`X11 forwarding` :

```bash
ssh -X dahu.ciment # pour se connecter au cluster Dahu par exemple
```

Ensuite, montez le dossier `$HOME` pour avoir accès au fichier `.Xauthority`,
qui stocke les cookies d'authentification de la session. Cela vous permet de
renseigner la variable d'environnement `$DISPLAY` sans obtenir d'erreur au
moment d'utiliser le conteneur.

Vous obtenez ensuite un retour graphique pour l'image Apptainer d'Ovito avec :

```bash
apptainer run --contain --bind $HOME --cleanenv --env DISPLAY=$DISPLAY ovito.sif
```

{{< callout context="caution" title="" icon="tabler-icons/outline/alert-triangle" >}}
Évitez de lancer des processus lourds sur les frontales des clusters. Sur
certains clusters, des services tuent tous les processus qui s'exécutent
plus de quelques minutes : c'est le cas des frontales `dahu` et `bigfoot`.
{{< /callout >}}
