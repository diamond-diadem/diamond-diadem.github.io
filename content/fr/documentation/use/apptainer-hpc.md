---
title: Utilisation des conteneurs sur les clusters HPC
linkTitle: Utilisation des conteneurs sur les clusters HPC
weight: 2
---

<div align="justify">

Une partie importante des codes fournis par la plateforme DIAMOND est conçue pour fonctionner sur les plateformes de calcul haute performance (**HPC — High Performance Computing**). Il existe plusieurs façons d’utiliser les clusters HPC, et nous distinguerons deux cas :

- l’exécution de codes mono-processus ou parallélisés en mémoire partagée ;
- l’exécution de codes parallélisés en mémoire distribuée (**MPI**).

La solution choisie pour la plateforme DIAMOND (**Apptainer** pour la conteneurisation et **Guix** pour la gestion des paquets) permet aux utilisateurs d’exécuter tout type de code, avec toutefois certaines précautions pour les codes parallélisés avec MPI.

## Codes mono-processus ou parallélisés en mémoire partagée

Il suffit de disposer d’un lanceur de conteneur pour pouvoir exécuter des codes mono-processus et des codes parallélisés en mémoire partagée. Nous recommandons l’utilisation d’**Apptainer** pour sa simplicité d’installation et d’utilisation. Dans cette catégorie, on inclut généralement les codes utilisant le parallélisme OpenMP, qui peut être géré à l’aide de la variable d’environnement `OMP_NUM_THREADS`.

## Codes parallélisés en mémoire distribuée (MPI)

Certains des codes que nous fournissons prennent en charge la parallélisation en mémoire distribuée avec **MPI**. Dans ces cas, **OpenMPI** est inclus dans les bibliothèques du conteneur.
*(Il est possible de vérifier si MPI est disponible dans le conteneur en exécutant `mpirun --version`. Si `mpirun` n’est pas trouvé, cela signifie que le code ne prend pas en charge MPI.)*

Il existe deux modes d’utilisation de MPI avec nos conteneurs :

- le [mode embarqué]({{< ref "#embedded_mode" >}}) (`mpirun` exécuté à l’intérieur du conteneur)

  => fonctionnement garanti

  => limité à une seule machine physique (un seul nœud)

- le [mode hybride]({{< ref "#hybrid_mode" >}}) (`mpirun` exécuté à l’extérieur du conteneur)

  => fonctionne sur plusieurs nœuds

  => peut présenter des problèmes de compatibilité


### Mode embarqué {#embedded_mode}

Ce mode repose entièrement sur l'installation OpenMPI embarquée pour l’exécution. Son avantage est qu’il évite les problèmes de compatibilité avec l’installation MPI de la machine hôte, mais il est généralement limité à **une seule machine physique**, c’est-à-dire votre machine locale ou un seul nœud d'un cluster. L’autre inconvénient est que nous avons constaté que l’utilisation CPU peut plafonner à environ 85 à 90 % dans certains cas.

Le mode embarqué consiste donc à utiliser la commande **`mpirun` à l’intérieur du conteneur**. Par exemple, on peut utiliser la commande `apptainer exec` pour exécuter `mpirun` dans le conteneur comme ceci :

```bash
apptainer exec <image>.sif mpirun -np <nb_procs> <command>
```


### Mode hybride {#hybrid_mode}

Ce mode consiste à utiliser **`mpirun`** (ou une commande de lancement similaire) **à l’extérieur du conteneur**, directement devant la commande `apptainer`. Cela fonctionne nativement avec Apptainer, qui a été conçu pour ça, contrairement à Docker qui nécessiterait la configuration de nombreuses options que nous ne détaillerons pas ici. En mode hybride, le lanceur MPI est fourni par le système hôte, tandis que l’application MPI s’exécute dans l’image Apptainer. Les bibliothèques MPI présentes dans le conteneur doivent rester compatibles avec l’implémentation MPI du système hôte afin de permettre la communication avec les interconnexions HPC. La différence entre ce mode hybride et le mode embarqué est illustrée dans le schéma ci-dessous :

<div class="text-center mt-4 mb-4">
        <img alt="OpenMPI Hybride" class="hybrid-ompi">
</div>

Avec cette approche hybride, nous recommandons d’utiliser, lorsque cela est possible, la **même version d’OpenMPI** sur le cluster que dans le conteneur. Il existe également une compatibilité entre les différentes versions mineures d’OpenMPI, mais l’utilisation de versions différentes peut entraîner des [baisses de performance](https://github.com/ckhroulev/apptainer-with-ompi/tree/main). Dans le PEPR DIADEM, les images de conteneurs sont construites sans connaissance préalable des machines sur lesquelles elles seront exécutées. Nous utilisons donc une configuration OpenMPI portable fournie par Guix, conçue pour [fonctionner sur différents environnements matériels](https://hpc.guix.info/blog/2019/12/optimized-and-portable-open-mpi-packaging/).

Pour vérifier la version d’OpenMPI incluse dans une image donnée et obtenir d'autres informations utiles, vous pouvez utiliser `ompi_info` comme ceci :

```bash
apptainer exec <image>.sif ompi_info
```


#### Mode hybride avec l’ordonnanceur SLURM (recommandé)

Exemple d’un script minimal de lancement **job.sh** :

```bash
#!/bin/bash
#SBATCH --job-name=test_containers
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=2
#SBATCH --time=00:05:00

srun apptainer exec <image>.sif <command>
```

**Si vous rencontrez des problèmes avec `srun`, vous pouvez essayer : `srun --mpi=pmi2` ou `srun --mpi=pmix`**

Le calcul peut ensuite être soumis avec :

```bash
sbatch job.sh
```


#### Mode hybride sans ordonnanceur

```bash
# module load openmpi-x.x.x ou équivalent peut être nécessaire pour accéder à la bonne commande mpirun
mpirun -np <nb_procs> apptainer exec <image>.sif <command>
```


#### Optimisations possibles du mode hybride

Une optimisation possible consiste à partager l’espace de noms (**namespace**) Apptainer entre les rangs MPI exécutés sur un même nœud, ce qui peut améliorer les performances dans certains cas.

Il existe deux façons de procéder. La plus simple consiste à utiliser l’option dédiée `--sharens`. Par exemple :

```bash
mpirun -np <nb_procs> apptainer exec --sharens <image>.sif <command>
```

Il est également possible de le faire manuellement avec les commandes suivantes :

```bash
# lancer une instance Apptainer sur chaque nœud de calcul
mpirun -npernode 1 apptainer instance start <image>.sif instance_name

# exécuter le code/script avec la commande MPI
mpirun -np <nb_procs> apptainer exec instance://instance_name /bin/bash -c "<command>"

# arrêter les instances Apptainer sur chaque nœud de calcul
mpirun -npernode 1 apptainer instance stop instance_name
```


## Documentation spécifique aux clusters

Documentation officielle sur l'utilisation des conteneurs :

- [Gricad](https://gricad-doc.univ-grenoble-alpes.fr/hpc/softenv/container/)

- [TGCC](https://www-hpc.cea.fr/tgcc-public/en/html/toc/fulldoc/Virtualization.html?highlight=singularity)


**Spécificités TGCC-DIAMOND**

L’exécution des conteneurs DIAMOND au TGCC est légèrement différente, car le lanceur de conteneurs **`pcocc-rs`** remplace Apptainer. L’utilisateur doit d’abord télécharger le conteneur `<image>.sif` depuis le site web de DIAMOND, puis le copier sur le cluster avec `rsync`.

Ensuite, comme indiqué dans la documentation officielle, il faut d’abord importer le conteneur avec :

```bash
pcocc-rs image import sif:<image>.sif <image>
```

Il est ensuite possible d’exécuter les conteneurs avec :

- `pcocc-rs run --no-ep <image> <command>` équivalent à `apptainer exec <image>.sif <command>`

- `pcocc-rs run <image> <args>` équivalent à `apptainer run <image>.sif <args>`

Pour lancer les conteneurs MPI du projet DIAMOND, vous pouvez utiliser la commande dédiée `ccc_mprun -C` avec deux modules spécifiques : `openmpi-4.1.4` et `guix`.

Voici un exemple de script minimal pouvant être soumis avec `ccc_msub` :

```bash {frame="none"}
#!/usr/bin/env bash
#MSUB -r test_containers           # Job name
#MSUB -n 2                         # Number of tasks to use
#MSUB -T 3600                      # Elapsed time limit in seconds of the job
#MSUB -q milan                     # Partition name
#MSUB -m work,scratch              # To access storage

module load mpi/openmpi/4.1.4
module load pcocc-module/guix

ccc_mprun -C <image> -E '--ctr-module openmpi-4.1.4,guix' -- <command>
```

</div>
