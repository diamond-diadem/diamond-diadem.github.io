---
title: Comment utiliser l'image Apptainer RASPA2 ?
linkTitle: Tutoriel RASPA2
weight: 1
description: "Tutoriel sur l'utilisation de l'image Apptainer RASPA2 de DIAMOND : récupération du conteneur et exemple d'utilisation pour un calcul de dynamique moléculaire avec Monte Carlo"
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **raspa2.sif** [disponible ici](/codes/scientific-computing/raspa2/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/raspa2-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.
{{< /callout >}}


## Fichiers d'entrée

Pour illustrer les différentes commandes, un fichier d'entrée pour RASPA2 est disponible sous forme d'archive via [ce lien](/downloads/raspa2-tutorial-inputs.tar.gz). Ce fichier nommé `MC_methane.input` correspond à un exemple issu du [manuel](https://iraspa.org/raspa/) de RASPA2. 

Dans ce tutoriel, nous supposerons que le fichier d'entrée contenu dans cette archive se trouve dans le répertoire courant. Pour l'extraire :

```bash
tar -xzf raspa2-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul RASPA2 dans le cas où le répertoire courant contient l'image `raspa2.sif` ainsi que le fichier d'entrée `MC_methane.input` :

```bash
apptainer exec raspa2.sif simulate -i MC_methane.input -d /
```

## Utilisation détaillée du conteneur RASPA2

Cette section explique comment utiliser le conteneur RASPA2. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

RASPA2 est un logiciel avancé conçu pour la simulation de l’adsorption et de la diffusion dans des matériaux poreux. Il utilise des méthodes de Monte Carlo et de dynamique moléculaire pour explorer les propriétés thermodynamiques et de transport sous diverses conditions.

L'exécutable principal de l'image se nomme `simulate`. La commande suivante affiche la version du code présent dans l'image :

```shell
apptainer exec raspa2.sif simulate -v
```

La licence du code peut être consultée depuis l'extérieur du conteneur comme suit :

```bash
raspa_path=$(apptainer exec raspa2.sif ls /gnu/store | grep raspa)
apptainer exec raspa2.sif cat /gnu/store/$raspa_path/share/doc/raspa2-2.0.48/LICENSE
```

Le fichier d'entrée `MC_methane.input` correspond au premier des exemples de base du [manuel](https://iraspa.org/raspa/) de RASPA2. Il est intitulé *Example 1: Monte Carlo of methane in a box*, et présenté comme suit (en anglais dans le manuel) :

> Une simulation Monte Carlo portant sur 100 molécules de méthane dans une boîte de 30 × 30 × 30 Å.

Le fichier d'entrée peut être trouvé dans le [dépôt GitHub](https://github.com/iRASPA/RASPA2/tree/master/examples/Basic/1_MC_Methane_in_Box) du code sous le chemin suivant : *examples/Basic/1_MC_Methane_in_Box/simulation.input*.

### Lancement d'une simulation

La commande suivante permet de lancer la simulation avec le conteneur RASPA2, elle peut prendre quelques secondes à s'exécuter :

```shell
apptainer exec raspa2.sif simulate -i MC_methane.input -d /
```

Pour exécuter cette simulation, le code a besoin d'accéder à certains fichiers supplémentaires, à savoir :

- `pseudo_atoms.def` : contient les valeurs des pseudo-potentiels pour plusieurs espèces atomiques et moléculaires,
- ` force_field_mixing_rules.def` : définit les paramètres d'interaction et les règles de mélange pour le champ de force,
- `methane.def` : définit les propriétés moléculaires du méthane.

Ces fichiers sont stockés dans le conteneur, dans le répertoire `/share/raspa/forcefield/ExampleMoleculeForceField` pour les deux premiers, et dans `/share/raspa/molecules/ExampleDefinitions` pour le dernier. À titre d'exemple, la commande suivante permet de copier le fichier `methane.def` dans le répertoire courant :

```shell
apptainer exec raspa2.sif cp /share/raspa/forcefield/ExampleMoleculeForceField/methane.def ./
```

L'option `-d` de la commande `simulate` permet de définir le chemin vers le répertoire RASPA2 contenant ces fichiers. Le programme recherche alors automatiquement les fichiers nécessaires à la simulation dans `/share/raspa`. Lorsque cette option n'est pas fournie par l'utilisateur, ces fichiers sont recherchés dans le répertoire courant par défaut. Cela peut être utile pour définir des pseudo-potentiels, champs de force ou propriétés moléculaires personnalisés.

La simulation produit quatre répertoires différents : *Movies*, *Output*, *Restart* et *VTK*.

### Visualisation du film de la simulation avec VMD

Le programme de visualisation VMD peut être utilisé pour visualiser les films produits par la simulation. Pour ce faire, on pourra à titre d'exemple utiliser le [conteneur VMD fourni par le projet Diamond](/codes/visualisation/vmd/).

La commande suivante permet d'ouvrir l'interface graphique utilisateur (GUI) du programme :

```shell
apptainer exec vmd.sif vmd
```

Les fichiers `.pdb` du répertoire *Movies/System_0* peuvent être ouverts depuis le menu *File/New molecule/Browse* de l'interface, puis chargés avec le bouton *Load*. Les noms des fichiers résultats comportent systématiquement la température extérieure (ici $300~K$) ainsi que la pression ($0~Pa$ ici) déterminées par la simulation. 

Une fois le fichier choisi chargé dans l'interface VMD, une représentation graphique simple peut être paramétrée depuis le menu *Graphics/Representations*, en sélectionnant *VDW* dans le champ *Drawing Method*, et *Name* dans le champ *Coloring Method*, comme indiqué ci-dessous.

<img alt="Capture d'écran des paramètres de représentation graphique sur le GUi de VMD" src="/images/tutorials/raspa2-tutorial/vmd_representation_settings.png" />

Une fois ces paramètres appliqués, le bouton en forme de flèche noire dans le coin inférieur droit de l'interface principale de VMD permet de lancer l'animation. La capture d'écran ci-dessous montre un exemple d'image issue du film `Movie_Box_1.1.1_300.000000_0.000000_allcomponents.pdb`.

<img alt="Capture d'écran d'une image de film" src="/images/tutorials/raspa2-tutorial/vmd_movie_frame.png" />

### Analyse des résultats de la simulation

Les résultats de la simulation sont écrits dans le fichier texte *Output/System_0/output_Box_1.1.1_300.000000_0.data*. L'une des informations clé contenue dans ce fichier concerne l'état de dérive énergetique :

```text
Total energy-drift: -7.21955e-11
```

D'après le [manuel](https://iraspa.org/raspa/) (en anglais dans le texte) :

> Dans une simulation Monte-Carlo, seules les incréments d’énergie entre deux états sont calculés. Ces incréments sont cumulés en continu afin de
> suivre l’évolution des énergies instantanées (à partir desquelles sont calculées les énergies moyennes, etc.). Il va de soi que l’énergie
> instantanée calculée ainsi tout au long de la simulation doit correspondre au résultat d’un recalcul intégral des énergies.
> La différence entre les deux signale une erreur. Si la dérive est supérieure à, disons, 1e − 3 ou 1e − 4, les résultats de
> la simulation sont erronés. Cela peut être dû à une erreur dans l’un des pas de la simulation Monte Carlo ou au fait que le
> champ de force est « incorrect » (une erreur typique consiste à oublier de définir les potentiels requis).

La simulation présente une dérive énergétique de l'ordre de $1\cdot 10^{-11}$ largement en dessous du seuil d'erreur.

Les performances des itérations de Monte Carlo sont également monitorées :

```text
Performance of the translation move:
======================================
Component 0 [methane]
	total        333328.000000 333042.000000 333630.000000
	succesfull   284917.000000 284740.000000 285619.000000
	accepted   0.854765 0.854967 0.856095
	displacement 1.000000 1.000000 1.000000
```

De nouveau, d'après le [manuel](https://iraspa.org/raspa/) :

> Les performances des itérations Monte Carlo sont monitorées. Les itérations de translation sont généralement dimensionnées de manière à atteindre
> un taux d'acceptation de l'ordre de 50%. Ici, les itérations atteignent la limite supérieure de 1 Å du fait de la faible densité du
> système.

Le fichier de sortie contient aussi l'énergie totale moyenne du système :

```text
Total energy:
=============
	Block[ 0]       -18214.36638 [K]
	Block[ 1]       -18158.55951 [K]
	Block[ 2]       -18079.05128 [K]
	Block[ 3]       -18004.12672 [K]
	Block[ 4]       -18487.21330 [K]
	------------------------------------------------------------------------------
	Average         -18188.66344 [K] +/-          229.55987 [K]
```

Le [manuel](https://iraspa.org/raspa/) détaille là aussi ce calcul :

> Les moyennes sont calculées avec une barre d'erreur. L'erreur est calculée en partitionnant la simulation en 5
> blocs, puis en calculant l'écart-type. Les erreurs sont calculées par RASPA en considérant un intervalle de confiance
> à 95%.

### Pour aller plus loin

Le [manuel](https://iraspa.org/raspa/) officiel présente un grand nombre d'exemples qui détaillent les fonctionnalités du programme, rangés en exemples basiques, intermédiaires, avancés et annexes selon leur complexité. Ces exemples peuvent être facilement exécutés en adaptant et extrapolant les commandes présentées dans le présent tutoriel si besoin.

</div>
