---
title: Comment lancer un conteneur de visualisation sans droits super-utilisateur ?
weight: 60
---

Si vous n'avez pas les droits super-utilisateur sur votre machine, il se peut
que vous rencontriez des problèmes pour autoriser le retour graphique des
conteneurs de visualisation. Pour résoudre ce problème, utilisez la commande
`xhost`, qui ajoute un nom d'hôte à la liste des machines autorisées à se
connecter à X :

```bash
xhost +SI:localhost:<username>
```

Une fois que vous avez fini d'utiliser le conteneur, nous vous recommandons de
rétablir le comportement initial de votre session avec
`xhost -SI:localhost:<username>`.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
Pour le moment, ce problème ne nous a été signalé que sur les sessions basées
sur `wayland` : la solution proposée n'a donc pu être éprouvée que dans ce cas.
Si vous rencontrez ce problème dans d'autres conditions, ou que la solution
ci-dessus ne fonctionne pas pour vous, merci de nous le
[signaler]({{% ref "/contact" %}}).
{{< /callout >}}
