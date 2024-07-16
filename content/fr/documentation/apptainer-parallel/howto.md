---
title: Utiliser Apptainer en parallèle ?
linktitle: Utiliser Apptainer en parallèle ?
weight: 1
---

Si l'image Apptainer que vous voulez utiliser supporte le calcul parallèle, alors OpenMPI fait partie des librairies inclues au sein du conteneur. Dans ce cas, il est intéressant d'utiliser cette solution de parallélisation pour accélèrer votre calcul. Si on se réfère à la [documentation](https://apptainer.org/docs/user/latest/mpi.html) officielle d'Apptainer, il existe deux modes d'utilisation d'OpenMPI avec Apptainer : le mode hybride et le mode de liaison. Ces modes sont plébiscités lorsque lorsque le conteneur est utilisé sur des infrastructures de type HPC. Cependant, un troisième mode peut être employé si le conteneur est lancé sur une machine personnelle : le mode embarqué. Dans cette documentation, nous détaillerons :

- le mode [embarqué]({{< ref "#embedded_mode" >}}),
- le mode [hybride]({{< ref "#hybrid_mode" >}}).

**Remarque**
> Les commandes Apptainer ci-dessous ont été simplifiées au maximum dans un but de lisibilité. Il est possible de combiner l'utilisation des commandes `mpirun` avec le flag `--containall`, tout en montant des dossiers spécifiques au conteneur avec les flags `--bind` et en renseignant des variables d'environnement `--env`. Les possibilités sont multiples. Nous vous conseillons donc de jeter un oeil à la documentation relative à ces [sujets]({{< ref "/content/fr/documentation/use-apptainer-image/howto.md" >}}).

## Exemple pratique : image avec OpenMPI

 Une image sur mesure dédiée à la mise en pratique de ce tutoriel est disponible en tapant la commande suivante :

```bash
 # PULL
 apptainer pull tutorial-openmpi.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/tutorial-openmpi.sif:latest
 ```

Ainsi, vous récupérez une image Apptainer (format de fichier `.sif`). Cette image est un fichier relocalisable et renommable, qu'il est recommandé de placer dans un répertoire dédié pour facilement la retrouver ; celui-ci peut-être quelconque, et dans le cadre de ce tutoriel nous assumerons que vous l'avez placée dans un répertoire nommé `$HOME/apptainer-images` :

```bash
mkdir -p $HOME/apptainer-images
mv ./tutorial.sif $HOME/apptainer-images/tutorial-openmpi.sif
```

Cette image vous permettra de créer des conteneurs embarquant un code parallélisé avec **OpenMPI**. Ce code `omn3` effectue une série de multiplications de matrices $N \times N$ carrées aléatoires ; la taille des matrices $N$ et le nombre de multiplications $M$ peuvent être précisés en argument. Par exemple, pour paralléliser sur $8$ cœurs $M=1000$ multiplications de matrices $N \times N = 100 \times 100$   :

```bash
mpirun -np 8 omn3 100 1e3
```

Le coût total est d'ordre $O(MN^3)$, afin d'ajuster facilement la durée de calcul sur différentes machines aux performances variées.

Enfin, l'image inclut également un outil évaluant en arrière-plan l'utilisation par le programme des cœurs réservés. Après l'exécution, vous trouverez l'utilisation moyenne par cœur dans le fichier `CPU-usage`.

## Le mode embarqué {#embedded_mode}

Si vous voulez utilisez votre image Apptainer en parallèle sur votre machine locale, alors vous pouvez utiliser la librairie OpenMPI qui a été embarquée lors de la création de l'image de conteneur.  
Cette approche a l'énorme avantage de vous exempter de tout souci relatif à la version d'OpenMPI installée sur votre machine, et même de savoir si cette librairie est installée tout court.

Il est alors très simple, grâce à la commande `apptainer exec`, d'exécuter des commandes `mpirun` qui appellent les outils de parallélisation inclus dans votre image de conteneur :

```bash
apptainer exec \
  image_apptainer.sif \
  mpirun -np nb_procs commande ...
```

Toutefois, cette utilisation en mode embarqué d'OpenMPI est principalement utile lorsque l'on veut faire tourner des tests sur une machine locale, lorsque les performances numériques ne sont pas une priorité majeure. En effet, cette simplicité d'utilisation s'accompagne d'un contrecoup majeur, puisque l'on ne tire pas pleinement parti des ressources matérielles de la machine hôte : la version d'OpenMPI présente au sein du conteneur n'est pas optimisée pour votre machine précise, et dans la plupart des cas observés pour l'écriture de ce tutoriel on plafonne à une utilisation maximale du CPU de l'ordre de 85-90%.

Une autre contrainte du mode embarqué est que l'image Apptainer doit être exécutée sur une même machine physique. Sur une machine locale, cela se fait implicitement puisqu'il n'y a qu'une seule carte mère, qu'un seul CPU, etc ... Sur une infrastructure de type HPC, les processus sont exécutés sur des nœuds de calcul. Utilise l'image Apptainer sur un seul nœud est semblable à ce qu'il se passe sur une machine personnelle : le conteneur s'exécute et utilise autant de processeurs que demandé car tout est situé sur un même nœud. Les problèmes apparaissent lorsque vous voulez utiliser au moins deux nœuds de calcul. Par défaut, la commande `apptainer exec` ne fait apparaître qu'un seul conteneur, qui ne peut pas s'exécuter sur plusieurs machines physiques (nœuds de calcul). La solution serait de faire apparaître autant de conteneurs que de noeuds utilisés, et de faire dialoguer ces derniers. En pratique, on procède plutôt de la manière recommandée dans la documentation d'Apptainer en utilisant le mode hybride. Cela permet de faire apparaître autant de conteneurs que de processeurs utilisés, et de faciliter la communication grâce au protocole MPI.

## Le mode hybride {#hybrid_mode}

Nous venons de voir que l'utilisation d'OpenMPI en mode embarqué sur des infrastrucutres de type HPC, où l'efficacité numérique est centrale, ne serait pas souhaitable en raisons de performances numériques suboptimales. Comme expliqué dans la documentation d'Apptainer, il est préférable d'utiliser le mode hybride sur des infrastructures de type HPC. Dans ce cas, il y faut mettre en place un "dialogue" qui s'opère entre OpenMPI de la machine hôte (sur l'infrastucture de type HPC) et OpenMPI embarqué dans l'image Apptainer. Pour mieux comprendre la différence conceptuelle entre ce mode hybride et le mode embarqué discuté plus haut, on peut jeter un œil au schéma ci-dessous.
<!-- (NOTE : INCLURE SCHÉMA OPENMPI EMBARQUÉ/HYBRIDE ICI). -->

<div class="text-center mt-4 mb-4">
        <img alt="OpenMPI Hybride" class="hybrid-ompi">
</div>

Pour de la parallélisation hybride, l'appel à la commande OpenMPI (`mpirun`) ne se fait plus au sein du conteneur - c'est-à-dire après `apptainer exec` comme pour le mode embarqué - mais à l'extérieur de celui-ci. On utilise donc une commade de la forme :

```bash
mpirun -np nb_procs <options-OpenMPI> \
        apptainer exec image_apptainer.sif \
        commande ...

```

Par cette approche, c'est la version d'OpenMPI installée sur la machine hôte qui sera appelée, et qui échangera avec la version de la librairie et le code installés au sein du conteneur instancié par `apptainer exec`. Selon les spécificités de la machine hôte, quelques options OpenMPI (`<option-OpenMPI>`) peuvent être nécessaires, et sont discutées plus bas.

Dans les faits, afin d'optimiser réellement les performances, il faut passer par une complexité supplémentaire via l'utilisation des instances Apptainer. Cela permet en effet d'homogénéiser les namespaces des processus OpenMPI, favorisant ainsi la communication entre les processus. Pour cela, on procède de la manière suivante :

```bash
# on lance une instance apptainer sur chaque nœud de calcul
mpirun -npernode 1 \
        apptainer instance start \
        image_apptainer.sif nom_instance

# on lance le code/script avec la commande MPI
mpirun -np nb_procs \
        apptainer exec instance://nom_instance \
        /bin/bash -c "commande..."

# on stoppe les instances apptainer sur chaque nœud de calcul
mpirun -npernode 1 \
        apptainer instance stop nom_instance
```

Si vous voulez utiliser des flags spécifiques pour exécuter votre conteneur, il faut le faire à la création de l'instance. Par exemple, pour monter des dossiers spécifiques avec le paramètre `--bind`, cela donne :

```bash
mpirun -npernode 1 \
        apptainer instance start \
        --bind chemin_dossier_machine_hote:chemin_dossier_conteneur \
        image_apptainer.sif nom_instance
```

## Conseils et bonnes pratiques

### Paramètres OpenMPI

En pratique, l'exécution de commandes OpenMPI peut nécessiter des arguments ou options supplémentaires comme le `--prefix`, le `plm_rsh_agent` ou `OMP_NUM_THREADS`. Étant donné que ces paramètres peuvent évoluer d'une infrastructure à l'autre, il est recommandé de se référer aux documentations des infrastuctures en question. En voici quelques unes en lien avec le PEPR DIADEM :

- [Gricad](https://gricad-doc.univ-grenoble-alpes.fr/hpc/softenv/container/)
- [TGCC](https://www-hpc.cea.fr/tgcc-public/en/html/toc/fulldoc/Virtualization.html?highlight=singularity)
- et bien d'autres ...

### Inter-compatibilité de versions

Bien qu'il existe une compatibilité OpenMPI inter-version, l'utilisation de versions différentes d'OpenMPI peut résulter en des [baisses de performances](https://github.com/ckhroulev/apptainer-with-ompi/tree/main). Il est donc plus simple, quand c'est possible d'utiliser la même version d'OpenMPI sur la machine hôte que dans le conteneur. Pour cela, on peut fonctionner de deux manières : en sélectionnant, quand c'est possible, la version la plus adaptée d'OpenMPI disponible sur le cluster HPC que vous utilisez, ou alors à l'inverse en installant directement la même version d'OpenMPI que celle du cluster dans l'image Apptainer lors de sa construction.
Dans le cadre du PEPR DIADEM, les images de conteneurs mises à disponibilité sont construites sans connaissance préalable exhaustive des machines sur lesquelles elles seront utilisées ; il est donc ardu de choisir *a priori* la version qu'il **vous** faut pour l'inclure dans le conteneur.

Si vous voulez connaître la version d'OpenMPI inclue dans une image donnée, ainsi que d'autres informations utiles, vous pouvez appeler `ompi_info` comme ceci :

```bash
apptainer exec \
  image_apptainer.sif \
  ompi_info
```
