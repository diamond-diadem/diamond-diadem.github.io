---
title: n2p2 Workflow Installation
linkTitle: Installation
toc: false
---

## Installation

```shell
pip install aiida-n2p2
verdi quicksetup  # better to set up a new profile
verdi plugin list aiida.calculations  # should now show your calclulation plugins
```

## Utilisation

Voici un exemple complet montrant comment soumettre un calcul de test en utilisant ce plugin.

Une démonstration rapide de la soumission d’un calcul :

```shell
verdi daemon start     # make sure the daemon is running
cd examples
```

Vous pouvez accéder à deux exemples, à la fois en local et sur un supercalculateur.

### Arborescence du plugin n2p2 adida

```
├── aiida_n2p2
│   ├── calculations
│   │   ├── predict.py
│   │   ├── scaling.py
│   │   └── train.py
│   ├── cli.py
│   ├── data
│   │   └── __init__.py
│   ├── helpers.py
│   ├── __init__.py
│   ├── parsers
│   │   ├── predict.py
│   │   ├── scaling.py
│   │   └── train.py
│   └── workflows
│       └── make_potential.py
├── CHANGELOG.md
├── examples
│   ├── 1.Al
│   │   ├── 222_IN.data
│   │   ├── AiidA-n2p2_demo.ipynb
│   │   ├── in.lmp
│   │   ├── input.data
│   │   └── input.nn
│   ├── 1.Boron
│   │   ├── 222_IN.data
│   │   ├── aiida-n2p2_demo.py
│   │   ├── input.data
│   │   ├── input.nn
│   └── 2.HPC
│       ├── 222_IN.data
│       ├── in.lmp
│       ├── input.data
│       ├── input.nn
│       └── wkchain_Al.py
├── LICENSE
├── pyproject.toml
└── README.md

```

### Exécution en local

Allez dans le dossier 1.Al et lancez le notebook Jupyter `AiidA-n2p2_demo.ipynb`

### Exécution sur le HPC

Avant de soumettre votre calcul sur le supercalculateur, assurez-vous d’avoir configuré votre ordinateur local avec un ordonnanceur (scheduler) pour gérer vos calculs sur le supercalculateur.
Cette configuration dépend fortement du supercalculateur sur lequel vous soumettez vos calculs.
Ci-dessous un exemple typique de configuration sur [GRICAD](https://gricad-doc.univ-grenoble-alpes.fr/hpc/connexion/) utilisant l’ordonnanceur OAR.

## 1. Installer le plugin OAR Scheduler, cas spécifique pour le HPC Gricad.

Consultez le [https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler), téléchargez le dossier, puis décompressez-le. Ensuite, depuis le répertoire principal oar-scheduler, lancez les commandes suivantes :

```bash
cd oar-scheduler
pip install .
verdi plugin list aiida.schedulers
```

La sortie devrait confirmer que le nouveau plugin d’ordonnanceur a été enregistré avec succès :

```console
$ verdi plugin list aiida.schedulers
Registered entry points for aiida.schedulers:
* core.direct
* core.lsf
* core.pbspro
* core.sge
* core.slurm
* core.torque
* oarscheduler
```

## 2. Maintenant, configurez l’ordinateur AiiDA en utilisant un fichier de configuration YAML.

Créez un fichier nommé `gricad_dahu.yml` avec le contenu suivant :

```yaml
---
label: dahu
description: "YAML file to set up the dahu cluster on AiiDA"
hostname: "dahu.ciment"
transport: "core.ssh"
scheduler: "oarscheduler"
work_dir: path_user_name
mpirun_command: ""
mpiprocs_per_machine: 32
prepend_text: ""
```

Assurez-vous que le chemin `work_dir` est correct pour votre compte (vous obtiendrez cet emplacement une fois votre compte Perseus activé [PERSEUS](https://gricad-doc.univ-grenoble-alpes.fr/services/perseus-ng/account/)), puis exécutez la commande de configuration :

```bash
verdi computer setup --config path/to/gricad_dahu.yml
```

Il vous sera demandé de fournir quelques détails de configuration. Vous pouvez accepter les valeurs par défaut en appuyant sur Entrée.

```console
$ verdi computer setup --config yml_files/computers/setup/gricad_dahu.yml
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
Shebang line (first line of each script, starting with #!) [#!/bin/bash]:
Default amount of memory per machine (kB).: 192000000
Escape CLI arguments in double quotes [y/N]:
Success: Computer<2> dahu created
Report: Note: before the computer can be used, it has to be configured with the command:
Report:   verdi -p presto computer configure core.ssh dahu
```

## 3.Configurer la connexion SSH

Ensuite, configurez le transport SSH pour l’ordinateur que vous venez de créer.
Vous pouvez fournir la configuration de manière non interactive via un autre fichier YAML (`ssh.yml`).

```bash
verdi -p presto computer configure core.ssh --config path/to/ssh.yml dahu
```

La commande vous invitera à confirmer les paramètres. Vous pouvez accepter les valeurs par défaut si elles conviennent à votre environnement.

```console
$ verdi -p presto computer configure core.ssh --config yml_files/computers/config/ssh.yml dahu
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
User name [piazzai]:
Port number [22]:
Connection timeout in s [60]:
Allow ssh agent [Y/n]:
SSH proxy jump []:
SSH proxy command [ssh -q piazzai@access-gricad.univ-grenoble-alpes.fr "nc -w 60 `basename dahu.ciment .ciment` 22"]:
Compress file transfers [Y/n]:
GSS auth [False]:
GSS kex [False]:
GSS deleg_creds [False]:
GSS host [dahu.ciment]:
Load system host keys [Y/n]:
Key policy (RejectPolicy, WarningPolicy, AutoAddPolicy) [RejectPolicy]:
Use login shell when executing command [Y/n]:
Report: Configuring computer dahu for user aiida@localhost.
Success: dahu successfully configured for aiida@localhost
```

## 4. Configurer les codes

Enfin, configurez les codes (exécutables) qui seront lancés sur l’ordinateur distant.
Cela se fait également à l’aide de fichiers YAML.

Voici un exemple pour un fichier `lammps_dahu.yml` :

```yaml
---
label: lamps
description: "Guix-based LAMMPS as set in DAHU."
default_calc_job_plugin: "lammps.raw"
filepath_executable: "/home/username/.guix-profile/bin/lmp_mpi"
computer: dahu
prepend_text: |
  source /applis/site/guix-start.sh
  set -x
  cat $OAR_FILE_NODES | wc -l
append_text: " "
```

Pour les autres codes, tels que `n2p2_train` et `n2p2_scale`, créez des fichiers YAML similaires.
La principale différence sera la ligne `default_calc_job_plugin`, qui doit être respectivement définie sur `n2p2.train` et `n2p2.scale`.

Une fois les trois fichiers YAML créés, exécutez ces commandes pour configurer les codes dans AiiDA :

```bash
verdi code create core.code.installed --config lammps_dahu.yml
verdi code create core.code.installed --config n2p2_train_dahu.yml
verdi code create core.code.installed --config n2p2_scale_dahu.yml
```

La sortie de chaque commande sera similaire à ceci :

```console
$ verdi code create core.code.installed --config yml_files/codes/lammps_dahu.yml
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
Escape using double quotes [y/N]:
Success: Created InstalledCode<1>
```

## 5. Lancer et suivre un calcul

Vous pouvez maintenant soumettre un calcul depuis votre machine locale, et AiiDA l’enverra pour exécution sur `dahu` :

```bash
verdi run your_calculation.py
```

Pour vérifier le statut de vos calculs dans AiiDA, utilisez la commande suivante :

```bash
verdi process list -a
```

Consultez le
Pour vérifier le statut des tâches directement sur la machine distante `dahu`, connectez-vous et utilisez la commande de l’ordonnanceur :

```bash
oarstat -u
```

Enfin, vous pouvez vous rendre dans le dossier 1.HPC et soumettre votre calcul.

```verdi run wkchain_Al.py        # run test calculation
verdi process list -a  # check record of calculation
```

Le plugin inclut également des commandes `verdi` pour inspecter ses types de données

```shell
verdi data n2p2 list
verdi data n2p2 export <PK>
```

## Développement

```shell
git clone https://github.com/aksam432/aiida-n2p2 .
cd aiida-n2p2
pip install --upgrade pip
pip install -e .[pre-commit,testing]  # install extra dependencies
pre-commit install  # install pre-commit hooks
pytest -v  # discover and run all tests
```

<!-- Consultez le [developer guide](http://aiida-n2p2.readthedocs.io/en/latest/developer_guide/index.html) pour plus d’informations. -->
