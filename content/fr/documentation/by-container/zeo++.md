---
title: Comment utiliser l'image Apptainer Zeo++ ?
linkTitle: Tutoriel Zeo++
weight: 10
description: "Tutoriel sur l'utilisation de l'image Apptainer Zeo++ de DIAMOND : récupération du conteneur et cas d'usage pour le calcul de diamètres de pores."
---

{{< callout context="note" title="Prérequis" >}}

- Apptainer (voir soit [notre guide d'installation]({{% ref "/documentation/install/install-apptainer" %}}), soit [la documentation officiel](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- L'image [`zeoplusplus.sif`]({{% ref "/codes/scientific-computing/zeo++/" %}})
- Les [fichiers d'entrée](/downloads/zeo++-tutorial-inputs.tar.gz)

{{< /callout >}}

Pour plus d'informations sur les conteneurs Apptainer et leur utilisation, nous mettons à votre disposition [une description d'Apptainer]({{% ref "/documentation/use/apptainer" %}}), un guide rapide sur [comment utiliser Apptainer]( {{% ref "/documentation/use/apptainer-image" %}}), sans oublier bien sûr la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/).

## Fichiers d'entrée

Pour illustrer les différentes commandes, un fichier d'entrée Zeo++ est disponible sous forme d'archive via [ce lien](/downloads/zeo++-tutorial-inputs.tar.gz). Ce fichier, nommé `EDI.cssr`, correspond à un fichier d'exemple CSSR pour la zéolite EDI.

Dans ce tutoriel, nous supposerons que le fichier d'entrée contenu dans cette archive se trouve dans le répertoire courant. Pour l'extraire :

```bash
tar -xzf zeo++-tutorial-inputs.tar.gz
```

## Utilisation détaillée du conteneur Zeo++

Cette section explique comment utiliser l'image Zeo++. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

Zeo++ est un logiciel open-source conçu pour l'analyse et la caractérisation des matériaux poreux. L'exécutable principal de l'image se nomme `network`. Cet exemple est adapté de la [documentation officielle](https://www.zeoplusplus.org/examples.html) de Zeo++.

La commande suivante calcule les diamètres des plus grandes sphères incluse, libre et incluse le long de la trajectoire de la sphère libre à l'aide de l'image de conteneur Zeo++ :

```shell
apptainer exec zeoplusplus.sif network -ha -res EDI.cssr
```

Les résultats sont automatiquement écrits dans un fichier de sortie nommé `EDI.res`. Ce fichier contient trois valeurs, une par diamètre, ainsi que le nom du fichier de sortie `EDI.res`.

La [documentation](https://www.zeoplusplus.org/examples.html) dont est issu ce tutoriel contient plusieurs exemples détaillant les fonctionnalités du programme. La commande présentée ci-dessus peut être facilement adaptée pour lancer ces exemples.

