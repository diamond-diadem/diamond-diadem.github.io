---
title: Comment utiliser l'image Apptainer Zeo++ ?
linkTitle: Tutoriel Zeo++
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer Zeo++ de DIAMOND : récupération du conteneur et cas d'usage pour le calcul de diamètres de pores."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **zeoplusplus.sif** [disponible ici](/codes/scientific-computing/zeo++/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/zeo++-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un fichier d'entrée Zeo++ est disponible sous forme d'archive via [ce lien](/downloads/zeo++-tutorial-inputs.tar.gz). Ce fichier, nommé `EDI.cssr`, correspond à une fichier d'exemple CSSR pour la zéolite EDI.

Dans ce tutoriel, nous supposerons que le fichier d'entrée contenu dans cette archive se trouve dans le répertoire courant. Pour l'extraire :

```bash
tar -xzf zeo++-tutorial-inputs.tar.gz
```

## Utilisation détaillée du conteneur Zeo++

Cette section explique comment utiliser l'image Zeo++. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

Zeo++ est un logiciel open-source conçu pour l'analyse et la caractérisation des matériaux poreux. L'exécutable principal de l'image se nomme `network`. Cet exemple est adapté de la [documentation officielle](https://www.zeoplusplus.org/examples.html) de Zeo++.

La commande suivante calcule les diamètres des plus grandes sphères incluse, libre et incluse le long de la trajectoire de la sphère libre à l'aide de l'image de conteneur Zeo++ :

```shell
apptainer exec network -ha -res EDI.cssr
```

Les résultats sont automatiquement écrits dans un fichier de sortie nommé `EDI.res`. Ce fichier contient trois valeurs, une par diamètre, ainsi que le nom du fichier de sortie `EDI.res`.

La [documentation](https://www.zeoplusplus.org/examples.html) dont est issu ce tutoriel contient plusieurs exemples détaillant les fonctionnalités du programme. La commande présentée ci-dessus peut être facilement adaptée pour lancer ces exemples.

</div>
