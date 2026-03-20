---
title: "Comment utiliser l'image Apptainer d'AMITEX_FFTP ?"
linkTitle: Tutoriel AMITEX_FFTP
weight: 7
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **amitex_fftp.sif** [disponible ici](/codes/scientific-computing/amitex-fftp/)
- Avoir téléchargé les **fichiers d’entrées** [disponibles ici](/downloads/amitex-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

Créez un dossier contenant l'image **amitex_fftp.sif** et l'archive des **fichiers d'entrées**. Placez-vous dans ce dossier et décompressez l'archive comme ceci:
```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extrait le contenu de l'archive.
```


## Commande en une ligne

Pour les personnes pressées, voici comment lancer un calcul Amitex_FFTP :

```bash
apptainer exec amitex_fftp.sif mpirun -np <N> amitex_fftp <args>
```



## Introduction

Amitex_FFTP est un code de calcul massivement parallèle, construit autour du standard MPI permettant de distribuer la charge de calcul sur différents processus. Il existe deux façons de lancer le code conteneurisé en parallèle:

- **MPI embarqué** dans le conteneur => fonctionnement garanti, mais limité à une seule machine (un seul noeud)
- **MPI hybride** avec celui de la machine hôte => fonctionne sur plusieurs noeuds mais il peut exister des incompatibilités.



## Simulation en local (MPI embarqué)

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

On remarque que la commande commence par lancer **apptainer**, qui exécute ensuite  `mpirun amitex_fftp <args>`  dans le conteneur.



## Simulation sur cluster (MPI hybride)

### Lancement avec le scheduler SLURM (recommandé)

Exemple de script minimal de lancement **job.sh** :

```bash {frame="none"}
#!/bin/bash

#SBATCH --job-name=test_amitex
#SBATCH --output=slurm-%j.out
#SBATCH --error=slurm-%j.err
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer run amitex_fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Il est ensuite possible de lancer le calcul avec la commande :

```bash
sbatch job.sh
```


### Lancement sans scheduler

```bash
mpirun -np <N> apptainer run amitex_fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***La commande mpirun doit provenir d'OpenMPI 4 pour que cela fonctionne.**

Pour information, `apptainer run amitex_fftp.sif` est un raccourci d' `apptainer exec amitex_fftp.sif amitex_fftp`





## Visualiser les résultats:

Générer les courbes de déformation avec **Gnuplot** :

```bash
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```

Cela crée `concrete_stress_strain.svg` qui peut ensuite être affichée avec une visionneuse d'images classique.

Pour visualiser les fichiers .vtk, il faut utiliser Paraview. Nous mettons un conteneur **Paraview** à disposition [ici](/codes/visualisation/paraview/). Une fois le conteneur Paraview téléchargé, il est possible de visualiser la microstructure `concrete.vtk` comme ceci :

```bash
apptainer run paraview.sif concrete.vtk
# Puis dans l'interface graphique cliquez sur apply, dans le panneau de gauche Properties
# Puis dans la barre menu du haut, sélectionner MaterialId dans le menu déroulant à la place de Solid Color.
# Puis dans la barre menu du haut, sélectionner Surface dans le menu déroulant à la place de Outline.
```





## (Avancé) Loi de comportement définie par l'utilisateur

### Comportements UMAT

Il est possible de définir ses propres lois de comportement matériau via une procédure compatible **UMAT**. Nous allons voir un exemple d'un comportement matériau défini par l'utilisateur, puis utilisé avec AMITEX_FFTP. On peut récupérer l'example fourni dans le conteneur grâce à :

```bash
apptainer exec amitex_fftp.sif cp -r /gnu/store/df6rv9zlllzrp8rrwxlc5ixf20kylmnf-amitex_fftp-8.17.14/cas_tests/comportements/polyxCC/comportement_umat .
chmod -R u+w comportement_umat
```

L'exemple fourni est déjà compilé, on peut donc commencer par nettoyer le répertoire `comportement_umat`:

```bash
cd comportement_umat
apptainer exec ../amitex_fftp.sif make clean
```

Il est maintenant possible d'implémenter le comportement voulu en modifiant les fichiers avec votre éditeur de texte préféré. Puis on peut recompiler la loi de comportement avec :

```bash
apptainer exec ../amitex_fftp.sif make
cd ..
```

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

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```



### Comportements MFRONT

Il est possible de définir ses propres lois de comportement matériau également grace à **mfront**. Nous allons voir un exemple d'un comportement matériau défini avec mfront, puis utilisé avec AMITEX_FFTP. La première étape consiste à générer la bibliothèque dynamique contenant la fonction umat :

```bash
apptainer exec amitex_fftp.sif mfront --obuild --interface=umat Mazars.mfront
```

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

```bash
apptainer exec amitex_fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Puis visualiser les résultats :

```bash	
apptainer exec amitex_fftp.sif gnuplot < plot.gp
```

</div>
