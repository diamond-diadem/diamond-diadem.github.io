---
title: Comment utiliser l'image de conteneur DFTB+
linkTitle: Tutoriel DFTB+
weight: 1
description: "Tutoriel sur l'utilisation de l'image de conteneur DFTB+ de DIAMOND avec Apptainer ou Docker : exemple d'optimisation de géométrie"
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/) ou **Docker** [(guide d'installation)](https://docs.docker.com/engine/install/)
- Avoir téléchargé les [fichiers d'entrée](/downloads/dftbplus-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

{{< callout context="tip" title="Apptainer ou Docker ?" icon="tabler-icons/outline/help-circle" >}}

Chaque commande de cette page est donnée pour Apptainer et pour Docker : choisissez votre outil dans n'importe quel onglet ci-dessous et toute la page suit votre choix. Docker convient pour essayer l'image sur votre propre ordinateur, mais sur les clusters il faut utiliser Apptainer ([pourquoi ?](/documentation/faq/#docker-est-également-une-solution-de-conteneurisation-pourquoi-ne-pas-simplement-utiliser-docker-)).

{{< /callout >}}

## Image de conteneur

Récupérez l'image DFTB+ :

{{< tabs "dftbplus-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull dftbplus.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/dftbplus dftbplus
```

La seconde commande donne à l'image le nom court `dftbplus`, utilisé dans la suite de ce tutoriel.
{{< /tab >}}
{{< /tabs >}}

## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour DFTB+ est disponible sous forme d'archive via [ce lien](/downloads/dftbplus-tutorial-inputs.tar.gz).

Ces fichiers correspondent à un exemple de tutoriel tiré de la [documentation officielle](https://dftbplus-recipes.readthedocs.io/en/stable/moleculardynamics/startinggeometry.html) de DFTB+, qui explique comment préparer une géométrie de départ pour une simulation de dynamique moléculaire. Dans ce tutoriel, nous partirons du principe que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf dftbplus-tutorial-inputs.tar.gz
```

L'archive contient les fichiers et répertoires suivants :

- `initialstructre/dftb_in.hsd` : fichier d'entrée pour l'optimisation géométrique,
- `slakos/` : fichiers de paramètres Slater-Koster (`*.skf`) et leur fichier `LICENSE`, décrivant les interactions électroniques entre les paires d'atomes du système,
- `vibrations/dftb_in.hsd` : fichier d'entrée permettant de calculer la hessienne (dérivées secondes) à la géométrie optimisée,
- `vibrations/modes_in.hsd` : fichier d'entrée pour l'outil de post-traitement `modes`, utilisé pour extraire et animer les modes normaux vibrationnels à partir de la hessienne.

## Guide de démarrage rapide

Pour les plus impatients, voici comment exécuter l'ensemble du workflow sur `<N>` processus MPI et `<nt>` threads par tâche, en partant du principe que le répertoire courant contient les répertoires `initialstructre`, `slakos` et `vibrations` issus de l'archive d'entrée :

{{< tabs "dftbplus-quickstart" >}}
{{< tab "Apptainer" >}}
L'image `dftbplus.sif` est supposée se trouver dans le répertoire courant.

```bash
cd initialstructre
apptainer exec --env "OMP_NUM_THREADS=<nt>" ../dftbplus.sif mpirun -np <N> dftb+ | tee output
cd ../vibrations
apptainer exec --env "OMP_NUM_THREADS=<nt>" ../dftbplus.sif mpirun -np <N> dftb+ | tee output
apptainer exec ../dftbplus.sif modes | tee output_modes
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/initialstructre dftbplus mpirun -np 2 dftb+ | tee output
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations dftbplus mpirun -np 2 dftb+ | tee output
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations dftbplus modes | tee output_modes
```

Ici, `-v "$PWD":/work -w /work` rend le répertoire courant accessible dans le conteneur et y lance le calcul, `-u $(id -u):$(id -g)` garantit que les fichiers de sortie vous appartiennent (et non à `root`), et `--rm` supprime le conteneur une fois le calcul terminé. Sur les systèmes utilisant SELinux (Fedora, RHEL…), ajoutez `:z` au volume (`-v "$PWD":/work:z`) si vous obtenez des erreurs « Permission denied ».
{{< /tab >}}
{{< /tabs >}}

## Utilisation détaillée du conteneur DFTB+

Cette section explique comment utiliser l'image DFTB+. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

DFTB+ est un logiciel open-source conçu pour effectuer des calculs dans le domaine de la chimie computationnelle et de la physique des matériaux. Il permet de calculer des énergies, des forces, des propriétés vibrationnelles et des transitions électroniques, et offre une grande flexibilité de configuration grâce à son format d’entrée modulaire. Le logiciel prend en charge à la fois la parallélisation MPI et le multithreading OpenMP.

L’exécutable principal contenu dans l’image est `dftb+`. Sa version et les informations de citation s’affichent automatiquement au début de chaque exécution, dans l’en-tête du résultat.

La licence du code est accessible depuis l'extérieur du conteneur comme suit :

{{< tabs "dftbplus-introduction" >}}
{{< tab "Apptainer" >}}
```bash
dftb_path=$(apptainer exec dftbplus.sif ls /gnu/store | grep dftb)
license_path=$(apptainer exec dftbplus.sif find /gnu/store/$dftb_path -name "LICENSE")
apptainer exec dftbplus.sif cat $license_path
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
dftb_path=$(docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus ls /gnu/store | grep dftb)
license_path=$(docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus find /gnu/store/$dftb_path -name "LICENSE")
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work dftbplus cat $license_path
```
{{< /tab >}}
{{< /tabs >}}

### Description de l'exemple

Les fichiers d'entrée fournis dans ce tutoriel sont extraits d'un [exemple officiel](https://dftbplus-recipes.readthedocs.io/en/stable/moleculardynamics/startinggeometry.html) de la documentation de DFTB+ concernant la préparation d'une géométrie de départ pour une simulation de dynamique moléculaire. Le système présenté en exemple est une molécule composée d'atomes de carbone, d'oxygène et d'hydrogène (38 atomes au total), décrite en coordonnées cartésiennes.

Le workflow comprend trois simulations DFTB+ :

- **Optimisation géométrique** (`initialstructre/dftb_in.hsd`) : part de la géométrie d'entrée et la relaxe à l'aide d'un `Driver` à gradient conjugué jusqu'à ce que la composante maximale de la force passe en dessous de `1e-5`. La structure électronique est calculée de manière auto-cohérente (`SCC = Yes`, `SCCTolerance = 1E-7`) avec un remplissage de Fermi à 400 K, en utilisant les fichiers Slater-Koster du répertoire `slakos` (référencés avec un préfixe relatif `Type2FileNames`) et une base de moment cinétique `s`/`p` pour H et C/O respectivement. Ce calcul produit la géométrie optimisée, `geo_end.gen`.
- **Dérivées secondes** (`vibrations/dftb_in.hsd`) : lit la géométrie optimisée produite ci-dessus et bascule le `Driver` sur `SecondDerivatives`, calculant la matrice hessienne complète par différences finies (`Delta = 1e-4`). Le résultat est écrit dans `hessian.out`.
- **Modes normaux** (`vibrations/modes_in.hsd`) : transmis à l’outil de post-traitement `modes` avec la géométrie optimisée et les fichiers Slater-Koster (nécessaires pour les masses atomiques), ce fichier d’entrée lit la matrice hessienne et la diagonalise pour obtenir les fréquences de vibration. `PlotModes = -20:-1` sélectionne les 20 modes aux fréquences les plus élevées, et `Animate = Yes` génère une trajectoire animée au format `.xyz` pour chacun d’entre eux (`mode_95.xyz` à `mode_114.xyz`).

### Exécution de la simulation

L'optimisation géométrique est exécutée sur quatre cœurs à l'aide de MPI, avec deux threads OpenMP par rang. Elle doit être lancée depuis le répertoire `initialstructure`, car les fichiers Slater-Koster sont référencés via un chemin relatif :

{{< tabs "dftbplus-simulation" >}}
{{< tab "Apptainer" >}}
```bash
cd initialstructre
apptainer exec --env "OMP_NUM_THREADS=2" ../dftbplus.sif mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/initialstructre --env "OMP_NUM_THREADS=2" dftbplus mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< /tabs >}}

Le calcul vibrationnel (dérivées secondes) s'effectue de la même manière, à partir du répertoire `vibrations`, qui fait également référence à la géométrie optimisée via un chemin relatif :

{{< tabs "dftbplus-vibration" >}}
{{< tab "Apptainer" >}}
```bash
cd vibrations
apptainer exec --env "OMP_NUM_THREADS=2" ../dftbplus.sif mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations --env "OMP_NUM_THREADS=2" dftbplus mpirun -np 4 dftb+ | tee output
```
{{< /tab >}}
{{< /tabs >}}

Une fois la matrice hessienne calculée, les modes normaux sont extraits à l'aide de l'outil `modes`, toujours à partir du répertoire `vibrations` :

{{< tabs "dftbplus-modes" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec ../dftbplus.sif modes | tee output_modes
```

Les commandes ci-dessus utilisent le mode parallèle « embarqué » d'Apptainer. Plus d'informations sur l'utilisation des conteneurs Apptainer en parallèle, y compris sur les clusters, sont disponibles sur [cette page]({{% ref "/documentation/use/apptainer-hpc" %}}).


{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work/vibrations --env "OMP_NUM_THREADS=2" dftbplus modes | tee output_modes
```

{{< callout context="caution" icon="tabler-icons/outline/alert-triangle" >}}
Avec Docker, les calculs parallèles sont limités aux cœurs d'une seule machine. Docker n'est pas intégré aux gestionnaires de tâches tels que SLURM ou OAR et ne peut donc pas être utilisé pour des calculs sur clusters : utilisez plutôt Apptainer ([pourquoi ?](/documentation/faq/#docker-est-également-une-solution-de-conteneurisation-pourquoi-ne-pas-simplement-utiliser-docker-)).
{{< /callout >}}
{{< /tab >}}
{{< /tabs >}}

### Lecture des résultats

Une fois l'optimisation géométrique terminée, `initialstructre` contient, entre autres :
- `output` : la sortie du programme, avec la convergence SCF et l'énergie totale à chaque étape de l'optimisation,
- `dftb_pin.hsd` : le fichier d'entrée entièrement résolu et analysé, utilisé par DFTB+,
- `geo_end.gen` / `geo_end.xyz` : la géométrie optimisée, utilisée comme point de départ pour l'analyse vibrationnelle.

Une fois le calcul des dérivées secondes terminé, `vibrations` contient, entre autres :
- `output` : la sortie du programme,
- `hessian.out` : la matrice hessienne calculée,
- `born.out` : les charges effectives de Born,
- `vibrations.tag` : un résumé lisible par machine de l'exécution, également généré par l'outil `modes`.

Après avoir exécuté la commande `modes`, `output_modes` répertorie la fréquence (en cm⁻¹) de chaque mode demandé. Dans cet exemple, les six modes les plus bas sont proches de zéro (translations et rotations de la molécule entière), tandis que les 20 modes demandés vont d'environ 1 710 cm⁻¹ à environ 3 067 cm⁻¹. Pour chacun d'entre eux, un fichier de trajectoire animée (`mode_95.xyz` à `mode_114.xyz`) est généré.

### Visualisation d'un mode

La trajectoire animée au format `.xyz` d'un mode peut être visualisée à l'aide du logiciel VMD, par exemple. Le [conteneur VMD]({{% ref "/codes/visualisation/vmd" %}}) peut être utilisé à cette fin, par exemple pour le mode de fréquence la plus élevée :

```bash
apptainer exec ../vmd.sif vmd mode_114.xyz
```

<div>
