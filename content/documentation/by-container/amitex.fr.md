---
title: "Comment utiliser l'image Apptainer d'AMITEX_FFTP ?"
linkTitle: Tutoriel AMITEX_FFTP
weight: 12
category: scientific-computing
code: amitex-fftp
description: "Tutoriel sur l'utilisation de l'image Apptainer AMITEX_FFTP de DIAMOND : récupération du conteneur et exécution de simulations mécaniques par FFT."
---

{{< callout context="note" title="Prérequis" >}}

- Apptainer ou Docker (voir soit [notre guide d'installation]({{% ref "/documentation/install/install-apptainer" %}}), soit la documentation officielle correspondante)
- L'image [`amitex_fftp.sif`]({{% ref "/codes/scientific-computing/amitex-fftp/" %}})
- Les [fichiers d'entrée](/downloads/amitex-tutorial-inputs.tar.gz)

{{< /callout >}}

Pour plus d'informations sur les conteneurs Apptainer et leur utilisation, nous mettons à votre disposition [une description d'Apptainer]({{% ref "/documentation/use/apptainer" %}}), un guide rapide sur [comment utiliser Apptainer]( {{% ref "/documentation/use/apptainer-image" %}}), sans oublier bien sûr la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/).

{{< callout context="tip" title="Apptainer ou Docker ?" icon="tabler-icons/outline/help-circle" >}}

Chaque commande de cette page est donnée pour Apptainer et pour Docker : choisissez votre outil dans l'un des onglets ci-dessous et toute la page suit votre choix. Docker convient pour essayer l'image sur votre propre ordinateur, mais sur les clusters il faut utiliser Apptainer ([pourquoi ?]({{% ref "/faqs" %}}#why-not-docker)).

{{< /callout >}}

## Image du conteneur

Récupérez l'image AMITEX_FFTP :

{{< tabs "amitex-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull amitex_fftp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/amitex_fftp amitex_fftp
```

La seconde commande donne à l'image le nom court `amitex_fftp`, utilisé dans la suite de ce tutoriel.
{{< /tab >}}
{{< /tabs >}}

## Fichiers d'entrée

Créez un dossier contenant l'archive des **fichiers d'entrée** (et, avec Apptainer, l'image **amitex_fftp.sif**). Placez-vous dans ce dossier et décompressez l'archive :

```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extrait le contenu de l'archive.
```

## Commande en une ligne

Pour les personnes pressées, voici comment lancer un calcul **Amitex_FFTP** sur `N` processus, lorsque le répertoire courant contient tous les fichiers d'entrée nécessaires :

{{< tabs "amitex-quickstart" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun -np <N> amitex_fftp <args>
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun -np <N> amitex_fftp <args>
```

Ici, `-v "$PWD":/work -w /work` rend le répertoire courant disponible dans le conteneur et y lance le calcul, `-u $(id -u):$(id -g)` garantit que les fichiers produits vous appartiennent plutôt qu'à `root` (et permet à `mpirun` de démarrer, car il refuse de tourner en root), et `--rm` supprime le conteneur à la fin du calcul. Sur les systèmes utilisant SELinux (Fedora, RHEL…), ajoutez `:z` au volume (`-v "$PWD":/work:z`) en cas d'erreur « Permission denied ». Le même préfixe est utilisé pour toutes les commandes Docker ci-dessous.
{{< /tab >}}
{{< /tabs >}}

## Introduction

Amitex_FFTP est un code de calcul massivement parallèle, construit autour du standard MPI permettant de distribuer la charge de calcul sur différents processus. Il existe deux façons de lancer le code conteneurisé en parallèle :

- **MPI embarqué** dans le conteneur => fonctionnement garanti, mais limité à une seule machine (un seul noeud). Disponible avec Apptainer et Docker.
- **MPI hybride** avec celui de la machine hôte => fonctionne sur plusieurs noeuds mais il peut exister des incompatibilités. Disponible avec Apptainer uniquement.

## Simulation en local (MPI embarqué)

{{< tabs "amitex-local" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

On remarque que la commande commence par lancer **apptainer**, qui exécute ensuite `mpirun amitex_fftp <args>` dans le conteneur.
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

Aucun paramètre n'est passé à `mpirun`, tous les coeurs disponibles sont donc utilisés pour le calcul.

## Simulation sur cluster (MPI hybride)

Le MPI hybride s'appuie sur le MPI de la machine hôte, que ne peut pas utiliser un conteneur Docker.

### Lancement avec le scheduler SLURM (recommandé)

Exemple de script minimal de lancement **job.sh** :

{{< tabs "amitex-slurm" >}}
{{< tab "Apptainer" >}}
```bash {frame="none"}
#!/bin/bash

#SBATCH --job-name=test_amitex
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer exec amitex_fftp.sif amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Il est ensuite possible de lancer le calcul avec la commande :

```bash
sbatch job.sh
```
{{< /tab >}}
{{< tab "Docker" >}}
Non disponible avec Docker : il ne peut pas utiliser le MPI de l'hôte, ni tourner dans un job SLURM. Utilisez le MPI embarqué décrit dans [Simulation en local](#simulation-en-local-mpi-embarqué) sur une seule machine, ou passez à Apptainer ([pourquoi ?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /tab >}}
{{< /tabs >}}

### Lancement sans scheduler

{{< tabs "amitex-mpirun" >}}
{{< tab "Apptainer" >}}
```bash
mpirun -np <N> apptainer exec amitex_fftp.sif amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***La commande mpirun doit provenir d'OpenMPI 4 pour que cela fonctionne.**
{{< /tab >}}
{{< tab "Docker" >}}
Non disponible avec Docker : il ne peut pas utiliser le MPI de l'hôte, ni tourner dans un job SLURM. Utilisez le MPI embarqué décrit dans [Simulation en local](#simulation-en-local-mpi-embarqué) sur une seule machine, ou passez à Apptainer ([pourquoi ?]({{% ref "/faqs" %}}#why-not-docker)).
{{< /tab >}}
{{< /tabs >}}

## Visualiser les résultats

Générer les courbes de déformation avec **Gnuplot** :

{{< tabs "amitex-gnuplot" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp gnuplot plot.gp
```
{{< /tab >}}
{{< /tabs >}}

Cela crée `concrete_stress_strain.svg` qui peut ensuite être affichée avec une visionneuse d'images classique.

Pour visualiser les fichiers .vtk, il faut utiliser Paraview. Nous mettons un conteneur **Paraview** à disposition [ici]({{% ref "/codes/visualisation/paraview/" %}}). Une fois le conteneur Paraview téléchargé, il est possible de visualiser la microstructure `concrete.vtk` comme ceci :

{{< tabs "amitex-paraview" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif concrete.vtk
# Puis dans l'interface graphique cliquez sur apply, dans le panneau de gauche Properties
# Puis dans la barre menu du haut, sélectionner MaterialId dans le menu déroulant à la place de Solid Color.
# Puis dans la barre menu du haut, sélectionner Surface dans le menu déroulant à la place de Outline.
```
{{< /tab >}}
{{< tab "Docker" >}}
Afficher une fenêtre graphique depuis un conteneur Docker demande des options d'affichage supplémentaires : voir la page Paraview pour l'usage avec Docker.
{{< /tab >}}
{{< /tabs >}}

## (Avancé) Loi de comportement définie par l'utilisateur

### Comportements UMAT

Il est possible de définir ses propres lois de comportement matériau via une procédure compatible **UMAT**. Nous allons voir un exemple d'un comportement matériau défini par l'utilisateur, puis utilisé avec AMITEX_FFTP. On peut récupérer l'exemple fourni dans le conteneur grâce à :

{{< tabs "amitex-umat-copy" >}}
{{< tab "Apptainer" >}}
```bash
cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat .
chmod -R u+w comportement_umat
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp sh -c 'cp -r /gnu/store/$(ls /gnu/store | grep amitex_fftp)/cas_tests/comportements/polyxCC/comportement_umat . && chmod -R u+w comportement_umat'
```
{{< /tab >}}
{{< /tabs >}}

L'exemple fourni est déjà compilé, on peut donc commencer par nettoyer le répertoire `comportement_umat`:

{{< tabs "amitex-umat-clean" >}}
{{< tab "Apptainer" >}}
```bash
cd comportement_umat
apptainer exec ../amitex_fftp.sif make clean
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
cd comportement_umat
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp make clean
```
{{< /tab >}}
{{< /tabs >}}

Il est maintenant possible d'implémenter le comportement voulu en modifiant les fichiers avec votre éditeur de texte préféré. Puis on peut recompiler la loi de comportement avec :

{{< tabs "amitex-umat-make" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec ../amitex_fftp.sif make
cd ..
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp make
cd ..
```
{{< /tab >}}
{{< /tabs >}}

Ce qui crée `comportement_umat/libUmatAmitex.so`. Il faut ensuite modifier **material.xml**, pour appeler cette nouvelle loi de comportement en remplaçant par exemple `<Material numM="2" Lib="" Law="elasiso"> [...] </Material>` par :

```xml
    <Material numM="2" Lib="comportement_umat/libUmatAmitex.so" Law="umatBCCHPP" >
                <Coeff Index="1" Type="Constant" Value="236.412E3"/>
                <Coeff Index="2" Type="Constant" Value="0.35"/>
                <Coeff Index="3" Type="Constant" Value="275.2E3"/>
                <Coeff Index="4" Type="Constant" Value="112.4E3"/>
                <Coeff Index="5" Type="Constant" Value="87.56E3"/>
                <Coeff Index="6" Type="Constant" Value="363."/>
                <Coeff Index="7" Type="Constant" Value="0."/>
                <Coeff Index="8" Type="Constant" Value="1000."/>
                <Coeff Index="9" Type="Constant" Value="10e-6"/>
                <Coeff Index="10" Type="Constant" Value="1e11"/>
                <Coeff Index="11" Type="Constant" Value="2.481e-7"/>
                <Coeff Index="12" Type="Constant" Value="100"/>
                <Coeff Index="13" Type="Constant" Value="3."/>
                <Coeff Index="14" Type="Constant" Value="2.e-6"/>
                <Coeff Index="15" Type="Constant" Value="0.84"/>
                <Coeff Index="16" Type="Constant" Value="1e5"/>
                <Coeff Index="17" Type="Constant" Value="1e5"/>
                <Coeff Index="18" Type="Constant" Value="1e-6"/>
                <Coeff Index="19" Type="Constant" Value="50"/>
                <Coeff Index="20" Type="Constant" Value="0"/>
                <Coeff Index="21" Type="Constant" Value="0.3"/>
                <Coeff Index="22" Type="Constant" Value="1."/>
                <Coeff Index="23" Type="Constant" Value="5.e-4"/>
                <Coeff Index="24" Type="Constant" Value="50"/>
                <Coeff Index="25" Type="Constant" Value="0."/>
                <Coeff Index="26" Type="Constant" Value="0."/>
                <Coeff Index="27" Type="Constant" Value="0."/>
                <IntVar Index="1" Type="Constant" Value="0."/>
                <IntVar Index="2" Type="Constant" Value="0."/>
                <IntVar Index="3" Type="Constant" Value="0."/>
                <IntVar Index="4" Type="Constant" Value="0."/>
                <IntVar Index="5" Type="Constant" Value="0."/>
                <IntVar Index="6" Type="Constant" Value="0."/>
                <IntVar Index="7" Type="Constant" Value="0."/>
                <IntVar Index="8" Type="Constant" Value="0."/>
                <IntVar Index="9" Type="Constant" Value="0."/>
                <IntVar Index="10" Type="Constant" Value="0."/>
                <IntVar Index="11" Type="Constant" Value="0."/>
                <IntVar Index="12" Type="Constant" Value="0."/>
                <IntVar Index="13" Type="Constant" Value="0."/>
                <IntVar Index="14" Type="Constant" Value="0."/>
                <IntVar Index="15" Type="Constant" Value="0."/>
                <IntVar Index="16" Type="Constant" Value="0."/>
                <IntVar Index="17" Type="Constant" Value="0."/>
                <IntVar Index="18" Type="Constant" Value="0."/>
                <IntVar Index="19" Type="Constant" Value="0."/>
                <IntVar Index="20" Type="Constant" Value="0."/>
                <IntVar Index="21" Type="Constant" Value="0."/>
                <IntVar Index="22" Type="Constant" Value="0."/>
                <IntVar Index="23" Type="Constant" Value="0."/>
                <IntVar Index="24" Type="Constant" Value="0."/>
                <IntVar Index="25" Type="Constant" Value="0."/>
                <IntVar Index="26" Type="Constant" Value="0."/>
                <IntVar Index="27" Type="Constant" Value="0."/>
                <IntVar Index="28" Type="Constant" Value="0."/>
                <IntVar Index="29" Type="Constant" Value="0."/>
                <IntVar Index="30" Type="Constant" Value="0."/>
                <IntVar Index="31" Type="Constant" Value="0."/>
                <IntVar Index="32" Type="Constant" Value="0."/>
                <IntVar Index="33" Type="Constant" Value="0."/>
                <IntVar Index="34" Type="Constant" Value="0."/>
                <IntVar Index="35" Type="Constant" Value="0."/>
                <IntVar Index="36" Type="Constant" Value="0."/>
                <IntVar Index="37" Type="Constant" Value="0."/>
                <IntVar Index="38" Type="Constant" Value="0."/>
                <IntVar Index="39" Type="Constant" Value="0."/>
                <IntVar Index="40" Type="Constant" Value="0."/>
                <IntVar Index="41" Type="Constant" Value="0."/>
                <IntVar Index="42" Type="Constant" Value="0."/>
                <IntVar Index="43" Type="Constant" Value="0."/>
                <IntVar Index="44" Type="Constant" Value="0."/>
                <IntVar Index="45" Type="Constant" Value="0."/>
                <IntVar Index="46" Type="Constant" Value="0."/>
                <IntVar Index="47" Type="Constant" Value="0."/>
                <IntVar Index="48" Type="Constant" Value="0."/>
                <IntVar Index="49" Type="Constant" Value="0."/>
    </Material>
```

On peut maintenant relancer le calcul avec la nouvelle loi de comportement, après avoir supprimé `<Loading Tag="2"> [...] </Loading>` de **loading.xml** qui ne fonctionne pas dans cet exemple :

{{< tabs "amitex-run-umat" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

### Comportements MFRONT

Il est possible de définir ses propres lois de comportement matériau également grace à **mfront**. Nous allons voir un exemple d'un comportement matériau défini avec mfront, puis utilisé avec AMITEX_FFTP. La première étape consiste à générer la bibliothèque dynamique contenant la fonction umat :

{{< tabs "amitex-mfront" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mfront --obuild --interface=umat Mazars.mfront
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mfront --obuild --interface=umat Mazars.mfront
```
{{< /tab >}}
{{< /tabs >}}

Ce qui crée `src/libUmatBehaviour.so`. Il faut ensuite modifier **material.xml**, pour appeler cette nouvelle loi de comportement en remplaçant par exemple `<Material numM="2" Lib="" Law="elasiso"> [...] </Material>` par :

```xml
    <Material numM="2" Lib="src/libUmatBehaviour.so" Law="umatmazars" >
                    <Coeff Index="1" Type="Constant" Value="1.e+10"/>
                    <Coeff Index="2" Type="Constant" Value="0.2"/>
                    <Coeff Index="3" Type="Constant" Value="0."/>
                    <Coeff Index="4" Type="Constant" Value="0."/>
                    <Coeff Index="5" Type="Constant" Value="1.15"/>
                    <Coeff Index="6" Type="Constant" Value="0.8"/>
                    <Coeff Index="7" Type="Constant" Value="1391.3"/>
                    <Coeff Index="8" Type="Constant" Value="10000"/>
                    <Coeff Index="9" Type="Constant" Value="0.7"/>
                    <Coeff Index="10" Type="Constant" Value="9.375e-5"/>
                    <IntVar Index = "1" Type = "Constant" Value = "0." />
                    <IntVar Index = "2" Type = "Constant" Value = "0." />
                    <IntVar Index = "3" Type = "Constant" Value = "0." />
    </Material>
```

On peut maintenant relancer le calcul avec la nouvelle loi de comportement :

{{< tabs "amitex-run-mfront" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```
{{< /tab >}}
{{< /tabs >}}

Puis visualiser les résultats :

{{< tabs "amitex-gnuplot-end" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work amitex_fftp gnuplot plot.gp
```
{{< /tab >}}
{{< /tabs >}}
