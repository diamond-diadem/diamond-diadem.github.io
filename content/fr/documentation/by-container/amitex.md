---
title: "Comment utiliser l'image Apptainer d'AMITEX_FFTP ?"
linkTitle: Tutoriel AMITEX_FFTP
weight: 7
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

### Prérequis:

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **amitex-fftp.sif** [disponible ici](/codes/scientific-computing/amitex-fftp/)
- Avoir téléchargé les **fichiers d’entrées** [disponibles ici](/downloads/amitex-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

Créez un dossier contenant l'image **amitex-fftp.sif** et l'archive des **fichiers d'entrées**. Placez-vous dans ce dossier et décompressez l'archive comme ceci:
```bash
tar -xzf amitex-tutorial-inputs.tar.gz # Extrait le contenu de l'archive.
```


## Commande en une ligne

Pour les personnes pressées, voici comment lancer un calcul Amitex_FFTP :

```bash
apptainer exec amitex-fftp.sif mpirun -np <N> amitex_fftp <args>
```



## Introduction

Amitex_FFTP est un code de calcul massivement parallèle, construit autour du standard MPI permettant de distribuer la charge de calcul sur différents processus. Il existe deux façons de lancer le code conteneurisé en parallèle:

- **MPI embarqué** dans le conteneur => fonctionnement garanti, mais limité à une seule machine (un seul noeud)
- **MPI hybride** avec celui de la machine hôte => fonctionne sur plusieurs noeuds mais il peut exister des incompatibilités.



## Simulation en local (MPI embarqué)

```bash
apptainer exec amitex-fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

On remarque que la commande commence par lancer **apptainer**, qui exécute ensuite  `mpirun amitex_fftp <args>`  dans le conteneur.



## Simulation sur cluster (MPI hybride)

### Lancement sans scheduler

```bash
mpirun -np <N> apptainer run amitex-fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

***La commande mpirun doit provenir d'OpenMPI 4 pour que cela fonctionne.**

Pour information, `apptainer run amitex-fftp.sif` est un raccourci d' `apptainer exec amitex-fftp.sif amitex_fftp`



### Lancement avec le scheduler SLURM (recommandé)

Exemple de script minimal de lancement **job.sh** :

```
#!/bin/bash

#SBATCH --job-name=Test_Amitex
#SBATCH --ntasks=12
#SBATCH --time=00:05:00

srun apptainer run amitex-fftp.sif -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Il est ensuite possible de lancer le calcul avec la commande :

```bash
sbatch job.sh
```





## Visualiser les résultats:

Générer les courbes de déformation avec **Gnuplot** :

```bash
apptainer exec amitex-fftp.sif gnuplot < plot.gp
```

Cela crée `concrete_stress_strain.svg` qui peut ensuite être affichée avec une visionneuse d'images classique.

Pour visualiser les fichiers .vtk, il faut utiliser Paraview. Nous mettons un conteneur **Paraview** à disposition [ici](/codes/visualisation/paraview/). Une fois le conteneur Paraview téléchargé, il est possible de visualiser la microstructure `concrete.vtk` comme ceci :

```bash
apptainer run paraview.sif concrete.vtk
# Puis dans l'interface graphique cliquez sur apply, dans le panneau de gauche Properties
# Puis dans la barre menu du haut, sélectionner MaterialId dans le menu déroulant à la place de Solid Color.
```





## (Avancé) Loi de comportement définie par l'utilisateur

Il est possible de définir ses propres lois de comportement matériau, grace notamment à **mfront**. Nous allons voir un exemple d'un comportement matériau défini avec mfront, puis utilisé avec AMITEX_FFTP. La première étape consiste à générer la bibliothèque dynamique contenant la fonction umat :

```bash
apptainer exec amitex-fftp.sif mfront --obuild --interface=umat Mazars.mfront
```

Ce qui crée `src/libUmatBehaviour.so`. Il faut ensuite modifier **materials.xml**, pour appeler cette nouvelle loi de comportement en remplaçant par exemple `<Material numM="1" Lib="" Law="viscoelas_maxwell"> [...] </Material>` par :

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
apptainer exec amitex-fftp.sif mpirun amitex_fftp -nm concrete.vtk -m material.xml -c loading.xml -a algorithm.xml -s out
```

Puis visualiser les résultats :

```bash	
apptainer exec amitex-fftp.sif gnuplot < plot.gp
```

</div>
