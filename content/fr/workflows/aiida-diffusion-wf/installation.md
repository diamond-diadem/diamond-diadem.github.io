---
title: Installation de aiida-diffusion-wf
linkTitle: Installation
toc: false
---

### Mode développement
À ce stade, le package n’est pas encore prêt en tant que plugin AiiDA, ni en tant que package pip, et ne peut être installé qu’à partir du dossier source :

```bash
git clone https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/aiida-diffusion-wf.git
cd aiida-diffusion-wf
```

Créez un environnement Python avec `python=3.11` (recommandé), activez-le puis installez les dépendances en mode éditable :
```bash
pip install -r requirements.txt
pip install -e .
```

#### Télécharger l’exécutable de LAMMPS
En principe, il est possible d'utiliser n’importe quel exécutable officiel de LAMMPS fourni par le canal officiel. Cependant, pour des raisons de reproductibilité, il est recommanédé de télécharger une version conteneurisée de LAMMPS avec la commande suivante :
```bash
apptainer pull lammps-2Apr2025_serial.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps_serial.sif:test
```

#### Configuration d’AiiDA

Ce workflow utilise le moteur AiiDA, qui permet de soumettre des calculs sur des clusters HPC distants. Pour simplifier l’installation, nous recommandons d’utiliser la version conteneurisée de `aiida-core`. Cela peut être fait en suivant [ce tutoriel](https://diamond-diadem.github.io/documentation/by-container/aiida/) sur le site DIAMOND.

Vous devez suivre toutes ces étapes pour pouvoir lancer les workflows fournis ici :

1. Configurer un profil AiiDA  
2. Configurer un « computer » et le paramétrer  
3. Configurer un code et le paramétrer  

Heureusement, cette étape n’est à faire qu’une seule fois !

Des exemples de fichiers de configuration sont fournis [dans ce dépôt](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/aiida-diffusion-wf/-/tree/main/config_yml?ref_type=heads) pour les **computers** (gestion du scheduler sur la machine distante et des protocoles de transfert) et les **codes** (gestion de l’exécution d’une version conteneurisée de LAMMPS sur la machine distante).

Par exemple, on peut travailler avec l’image `aiida_raspa.sif` disponible sur le site DIAMOND.

#### Exemple : Lancer un calcul RAW unique avec des paramètres prédéfinis
Dans cet exemple, le **matériau est prédéfini** en fournissant l’emplacement du fichier CIF contenant les coordonnées 3D : `examples/structures/0000[Ag][sra]3[ASR]1`. Le gaz adsorbé est un gaz monoatomique, le **krypton** , défini par le paramètre `atom_symbol`. Le workflow recherche automatiquement les paramètres de Lennard-Jones dans le champ de force UFF dans `src/uff_non_bonded.py`.

##### Tutoriel

1. Créer un répertoire de travail dans lequel le script du workflow sera sauvegardé : 

```bash
mkdir workdir_examples && cd workdir_examples
cp $PACKAGE_DIR/examples/workflows/run_raw_diffusion_Kr.py ./
```

Notez que la variable d’environnement `$PACKAGE_DIR` doit être définie comme le chemin racine du package cloné.

2. Créer une instance de l’image aiida-core

```bash
apptainer instance start \
        --containall \
        --bind $PWD:$PWD \
        -B ~/.aiida:/.aiida \
        -B ~/.aiida/.ssh:$HOME/.ssh \
        -B ~/.aiida/postgres_run:/var/run/postgresql \
        -B ~/.aiida/rabbitmq/var/lib/rabbitmq:/var/lib/rabbitmq \
        -B ~/.aiida/rabbitmq/var/log:/var/log/rabbitmq \
        ~/apptainer-images/aiida_raspa.sif aiida
```

> Remarque : vous devrez peut-être adapter les chemins de votre configuration AiiDA (pour relier la base de données AiiDA). Le programme `aiida-core` est déjà inclus dans l’image `aiida_raspa.sif`.

3. Lancer une instance pour avoir accès aux commandes AiiDA ainsi qu’aux codes et computers prédéfinis

```bash
apptainer shell instance://aiida
```

4. Activer l’environnement conda ou python

```bash
source $PACKAGE_DIR/aiida-diffusion-wf/bin/activate
```

Il faut adapter le chemin en fonction de l’endroit où l’environnement Python

> Remarque : dans une implémentation future, nous empaqueterons l’ensemble du workflow dans une seule image Apptainer (au lieu d’utiliser `aiida_raspa`), de sorte que les bibliothèques puissent être directement importées à l’intérieur du conteneur.

5. Définir le nom du code et le nom du computer dans le workflow  
Vous devrez modifier manuellement les variables `profile_name`, `code_name`, `project_name` dans le script Python :

```bash
nano-tiny run_raw_diffusion_Kr.py
```

6. Lancer le workflow

```bash
python run_raw_diffusion_Kr.py
```

Selon que l’on souhaite lancer directement le workflow (pour des tests sur la machine locale) ou soumettre le calcul à un cluster HPC distant, il faudra modifier ces lignes à la fin du script Python  :

```python
# For local scheduler, the following line should be uncommented
#results, node = engine.run_get_node(builder)

# For remote scheduler, the following line should be uncommented
node = engine.submit(builder)
```

Pour voir l’état actuel du calcul, on peut utiliser les commandes suivantes :

```bash
verdi process list # tous les processus en cours
verdi process list -a # tous les processus
```

##### Visualiser la trajectoire MD
Le réseau hôte étant choisi rigide (pas de considération sur la flexibilité), le fichier de sortie de LAMMPS utilise ne fournit que les coordonnées des atomes de l'adsorbat, on peut souhaiter récupérer la trajectoire complète avec tous les atomes (hôte + adsorbat). 

1. D’abord, extraire le dépôt de données

```bash
verdi node show <pk_process> # identifier le pk du nœud retrieved
verdi node repo dump <pk_retrieved_node> repo_dump
cd repo_dump
```

2. Puis, concaténer la trajectoire de l’adsorbat avec le framework rigide

```bash
python  $PACKAGE_DIR/src/aiida_diffusion_wf/merge_data_traj.py
```

Un fichier XYZ étendu contenant la trajectoire de tous les atomes ainsi que les informations de la maille est généré et peut être ouvert avec Ovito.

3. Visualisation avec Ovito

<p align="center">
<img alt="diffusion ovito gif" class="diffusion-kr-ovito" style="width:100%">
</p>
<p align="center"><i>Quelques étapes de la diffusion du krypton dans le MOF 0000[Ag][sra]3[ASR]1</i></p>

