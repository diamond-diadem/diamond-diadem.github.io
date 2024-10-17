---
title: Lancer un conteneur de visualisation sans droits super-utilisateur
linkTitle: Lancer un conteneur de visualisation sans droits super-utilisateur
toc: false
weight: 3
---

<div align="justify">

Si vous n'avez pas les droits super-utilisateurs sur votre machine, il se peut que vous rencontriez des problèmes pour autoriser le retour graphique à partir des conteneurs de visualisation. Pour résoudre ce problème, vous pouvez utiliser la commande `xhost` (pour ajouter un nom d'hôte à la liste des machines pour lesquelles une connexion X est autorisée) via la commande :

```bash
ssh +SI:localhost:<username> # pour se connecter au cluster Dahu par exemple
```

Une fois que vous avez fini d'utiliser le conteneur, nous vous recommandons de rétablir le comportement initial de votre session via la commande `xhost -SI:localhost:<username>`

**Note**
>
> Ce problème nous a uniquement été signalé, pour le moment, sur les sessions basées sur `wayland`. En conséquence, la solution proposée n'a pu être éprouvée que dans ce cas particulier. Si vous rencontrez ce problème dans d'autres conditions et/ou que la solution ci-dessus ne fonctionne pas pour vous, merci de nous le [signaler](/documentation/use/ask-help/).

</div>
