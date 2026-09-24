---
title: "Comment utiliser l'image Apptainer NDM ?"
linkTitle: Tutoriel NDM
weight: 13
description: "Tutoriel sur l'utilisation de l'image Apptainer NDM de DIAMOND : récupération du conteneur, exécution et cas d'usage pour la dynamique moléculaire."
---

{{< callout context="note" title="Prérequis" >}}

- Apptainer (voir soit [notre guide d'installation]({{% ref "/documentation/install/install-apptainer" %}}), soit [la documentation officiel](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- L'image [`ndm.sif`]({{% ref "/codes/scientific-computing/ndm/" %}})
- Les [fichiers d'entrée](/downloads/ndm-tutorial-inputs.tar.gz)

{{< /callout >}}

Pour plus d'informations sur les conteneurs Apptainer et leur utilisation, nous mettons à votre disposition [une description d'Apptainer]({{% ref "/documentation/use/apptainer" %}}), un guide rapide sur [comment utiliser Apptainer]( {{% ref "/documentation/use/apptainer-image" %}}), sans oublier bien sûr la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/).

Créez un dossier contenant l'image **ndm.sif** et l'archive des **fichiers d'entrée**. Placez-vous dans ce dossier et décompressez l'archive comme ceci :

```bash
tar -xzf ndm-tutorial-inputs.tar.gz # Extrait le contenu de l'archive.
```

## Commande en une ligne

Pour lancer un calcul avec **NDM** sur N processeurs, lancer la commande suivante dans un dossier contenant les fichiers d'entrée :

```bash
apptainer exec ndm.sif mpirun -np <N> rundm90_ndm_mpi
```

## Introduction

**NDM** est un code de calcul distribué en Fortran pour la dynamique moléculaire en potentiels empiriques construit autour du standard MPI permettant de distribuer la charge de calcul sur différents processus. Il existe deux façons de lancer le code conteneurisé en parallèle :

- **MPI embarqué** dans le conteneur => fonctionnement garanti, mais limité à une seule machine (un seul nœud)
- **MPI hybride** avec celui de la machine hôte => fonctionne sur plusieurs nœuds, mais il peut exister des incompatibilités.

## Simulation en local (MPI embarqué)

```bash
apptainer exec ndm.sif mpirun rundm90_ndm_mpi
```

Notons que la commande commence par lancer **apptainer**, qui exécute ensuite `mpirun rundm90_ndm_mpi` dans le conteneur.

## Simulation sur cluster (MPI hybride)

### Lancement avec le scheduler SLURM (recommandé)

Exemple de script minimal de lancement **job.sh** :

```bash {frame="none"}
#!/bin/bash

#SBATCH --job-name=test_ndm
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer run ndm.sif
```

Pour information, `apptainer run ndm.sif` est un raccourci pour `apptainer exec ndm.sif rundm90_ndm_mpi`.

Il est ensuite possible de lancer le calcul avec la commande :

```bash
sbatch job.sh
```

### Lancement sans scheduler

```bash
mpirun -np <N> apptainer run ndm.sif
```

**La commande mpirun doit provenir d'OpenMPI 4 pour que cela fonctionne.**
