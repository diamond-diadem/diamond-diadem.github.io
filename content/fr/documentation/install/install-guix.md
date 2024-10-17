---
title: "Comment installer Guix ?"
weight: 3
---

<div align="justify">

{{< callout context="note" title="" icon="outline/info-circle" >}}

Ce tutoriel présente succinctement le processus d'installation l'outil de gestion de paquets [Guix](https://guix.gnu.org/). Il est d'ailleurs largement basé sur les [instructions d'installations officielles](https://guix.gnu.org/manual/fr/html_node/Installation-binaire.html), et nous vous invitons à consulter ces ressources pour plus de détails.

Le gestionnaire de paquet fonctionne sur toute distribution Linux moderne ; il ne tourne pas de façon native sur Windows et MacOS, n'étant pas compatible avec les noyaux de ces systèmes d'exploitation. Pour ces plateformes, une solution de machine virtuelle comme pour Apptainer ou un conteneur Docker est préconisée.

{{< /callout >}}

### Instructions d'installation

Il est recommandé d'utiliser un script bash fourni par Guix qui automatise toutes les étapes d'installation (téléchargement, installation et configuration). Pour ce faire, vous devez avoir installé les paquets `wget` et `tar` au préalable sur votre poste. Nous précisons également que des droits super-utilisateurs sont obligatoires pour exécuter le script bash.

Les commandes à lancer pour l'installation des paquets Ubuntu sont les suivantes :

```bash
cd /tmp # pour se placer dans un dossier temporaire
wget https://git.savannah.gnu.org/cgit/guix.git/plain/etc/guix-install.sh # pour télécharger le script bash d'installation
chmod +x guix-install.sh # pour pouvoir exécuter le script bash
sudo ./guix-install.sh # pour exécuter le script bash
```

Une fois l'installation terminée, il est recommandé d'exécuter la commande `guix pull` pour mettre à jour la liste des paquets Guix à partir du canal principal [GNU Guix](https://hpc.guix.info/browse). Attention, cette commande est un peu longue à s'exécuter. Pour utiliser le démon Guix mis à jour, il faudra ensuite exécuter les lignes suivantes :

```bash
GUIX_PROFILE="$HOME/.config/guix/current"
. "$GUIX_PROFILE/etc/profile"
```

## Installation sans droits super-utilisateur

Bien que l'utilisation de Guix ne requière pas de droits particuliers, son installation nécessite des droits super-utilisateurs notamment pour :
* créer le `/gnu/store` qui va stocker tous les paquets,
* créer des environnements logiciels isolés pour la construction de paquet via le démon Guix.

Si le sujet vous intéresse, nous vous conseillons de jeter un œil à cet [article](https://hpc.guix.info/blog/2017/09/reproducibility-and-root-privileges/) ou [celui-là](https://hpc.guix.info/blog/2017/10/using-guix-without-being-root/). Si vous ne possédez pas de droits super-utilisateur sur votre machine, nous vous conseillons de prendre contact avec votre administrateur système pour l'installation.

## Installation sur Windows / MacOS

Pour les utilisateurs et utilisatrices Windows, vous pouvez utiliser une [solution similaire](/documentation/install/apptainer-windows) à celle d'Apptainer et utiliser Windows Subsystem for Linux (WSL2). Attention, l'installation de Guix dans WSL est toutefois loin d'être triviale. Nous vous conseillons de suivre ce [guide](https://gist.github.com/giuliano108/49ec5bd0a9339db98535bc793ceb5ab4).

Pour les utilisateurs et utilisatrices MacOS, il est recommandé d'utiliser une machine virtuelle ou Docker. Vous pouvez consulter ce [lien](https://pagure.io/projects/MSG/%2A).

</div>
