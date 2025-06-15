---
title: Tutoriel AiiDA
weight: 6
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir installé Apptainer sur votre machine ; voir [ce lien](/documentation/install/install_apptainer/) pour plus de détails.

Ce tutoriel explicite la démarche à suivre pour interagir avec l'image Apptainer d'AiiDA.

{{< /callout >}}

## Étape 0 : Avant d'utiliser l'image

Pour pouvoir utiliser l'image Apptainer d'AiiDA, et pour une question de persistence de données, vous avez besoin d'une architecture de dossier spécifique. Pour être bref, nous recommandons que vous utilisiez cette architecture de dossiers :

```bash
$ ls /chemin/vers/le/dossier/de/votre/choix
└── .aiida (environment final du conteneur)
    ├── database
    ├── .ssh
    ├── postgres_run
    └── rabbitmq
         └── var
             ├── lib/rabbitmq
             └── log
```

Voici la longue explication :

- Le dossier `database` est nécessaire pour sauvegarder les données liées à AiiDA.
- Le dossier `.ssh` est nécessaire pour sauvegarder les données liées aux connexions ssh.
- Le dossier `postgres_run` est nécessaire pour l'exécution du service PostgreSQL.
- Les dossiers `rabbitmq/var/lib/rabbitmq` et `rabbitmq/var/log` sont nécessaires pour l'exécution du service RabbitMQ.

Une fois cette architecture de dossier créée et Apptainer installé, vous êtes prêt à utiliser une image Apptainer d'AiiDA.

## Étape 1 : Télécharger l'image dont vous avez besoin

La première chose à faire est de se rendre dans la section `Deploy` de ce [dépôt Gitlab](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer). Sélectionnez ensuite l'image qui vous intéresse (`aiida_vasp.sif` par exemple) et téléchargez la via la commande :

```bash
apptainer pull aiida_vasp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer/aiida_vasp.sif:latest
```

## Étape 2 : Démarrer une instance et accéder au conteneur

Une fois l'image souhaitée téléchargée, vous pouvez l'utiliser. Nous recommandons de démarrer une instance Apptainer, puis d'accéder au conteneur avec la commande `shell`.

### Méthode pas à pas

Pour démarrer une instance, vous devez utiliser la commande suivante :

```bash
apptainer instance start \
        --containall \
        -B $my_path/.aiida:/.aiida \
        -B $my_path/.aiida/.ssh:$HOME/.ssh \
        -B $my_path/.aiida/postgres_run:/var/run/postgresql \
        -B $my_path/.aiida/rabbitmq/var/lib/rabbitmq:/var/lib/rabbitmq \
        -B $my_path/.aiida/rabbitmq/var/log:/var/log/rabbitmq \
        {apptainer_image_name}.sif {instance_name}
```

avec, `$my_path` qui est une variable d'environnement qui réfère à `/chemin/vers/le/dossier/de/votre/choix` et les flags `-B` qui permettent de monter des dossiers spécifiques du système hôte dans l'image Apptainer. Une fois l'instance demarrée, vous pouvez soit entrer dans le conteneur ou y exécuter des commandes :

```bash
# pour accéder au conteneur
apptainer shell instance://{instance_name}

# pour exécuter des commandes dans le conteneur
apptainer exec instance://{instance_name} {commands}
```

### Méthode rapide

Pour automatiser toutes ces étapes et s'assurer que tous les services de l'image fonctionnent (PostgreSQL et RabbitMQ), un script bash est disponible via ce [lien](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer/-/blob/main/bash_script/quick_start.sh?ref_type=heads). Une fois celui-ci téléchargé, vous pouvez exécuter la commande :

```bash
bash ./quick_start.sh --help # pour voir les différentes options disponibles
```

## Étape 3 : Configurer votre environnement AiiDA (via le GUI)

Si vous n'êtes pas familier avec l'invite de commande et les commandes AiiDA, nous vous recommandons d'utiliser l'interface graphique développée pour le conteneur. Une fois que vous êtes entré dans celui-ci, exécutez la commande suivante :

```bash
python3 /GUI/main.py
```

Une fois l'interface graphique ouverte, nous vous recommandons de cliquer sur le bouton "Mode pas à pas" et de suivre les étapes. Les mêmes étapes que celles décrites dans la section suivante sont effectuées, mais de manière plus douce pour un utilisateur novice.

## Étape 3 bis : Configurer votre environnement AiiDA (via l'invite de commande)

Si c'est la **première fois** que vous utilisez cette image Apptainer d'AiiDA, vous devez configurer votre profil AiiDA et suivre toute cette étape ! Sinon, vous pouvez passer directement à l'[étape suivante](#run-workflow) pour utiliser l'image et lancer des workflows.

### Configurer un profil utilisateur

Un utilisateur par défaut est disponible dans le conteneur : `aiida_user`. Nénamoins, vous pouvez créer votre propre profil utilisateur en utilisant les commandes suivantes :

```bash
verdi quicksetup --profile {your_profile} --email {your@mail} --first-name {your_firstname} --last-name {your_lastname} --institution {your_institution}
verdi profile setdefault {your_profile}
verdi config set warnings.rabbitmq_version false
```

> La dernière commande permet de désactiver les warnings de RabbitMQ pour l'utilisateur `your_profile`.

### Configurer l'environnement de l'image

Avant d'installer une machine de calcul ou un code sur votre profil, nous recommandons de configurer l'environnement de l'image. Pour cela, vous pouvez modifier des variables d'environnement à votre guise dans le fichier `config.json` via la commande :

```bash
nano-tiny /tmp/config.json
```

Il y a déjà des valeurs par défaut pour vous aider à choisir vos propres variables d'environnement. Une fois ce fichier modifié, vous pouvez exécuter la commande :

```bash
bash /tmp/config_env.sh
```

Cela permet de configurer entièrement votre environnement AiiDA en personnalisant les fichiers de configurations par défaut fournis avec l'image. Vous pouvez donc installer des codes, machines de calcul ou configurer une connexion ssh plus facilement.

### Configurer une connexion SSH transparente aux clusters Gricad

Cette partie est prévue pour les personnes qui possèdent un compte PERSEUS et sont affectés à un projet valide. Si ce n'est pas le cas et que vous avez besoin d'utiliser les clusters de Gricad, veuillez consulter ce [lien](https://gricad-doc.univ-grenoble-alpes.fr/services/).

La première chose à faire est de générer une clé RSA. Pour ce faire, exécutez la commande :

```bash
ssh-keygen
```

> Il est primordial de laisser un mot de passe vide pour qu'AiiDA puisse accéder aux clusters de Gricad sans soucis.

Ensuite, il vous suffit de copier le fichier `/tmp/workspace/ssh/config` dans le dossier `~/.ssh/`. Puis, pour finaliser la configuration de la connexion SSH transparente, vous devez copier la clé RSA sur les frontales et les clusters avec les commandes suivantes :

```bash
ssh-copy-id {perseus-login}@rotule.univ-grenoble-alpes.fr
ssh-copy-id {perseus-login}@trinity.univ-grenoble-alpes.fr
ssh-copy-id dahu.ciment
```

> Attention, vous devrez renseigner le mot de passe de votre compte PERSEUS à chaque étape.

Pour vérifier que tout fonctionne correctement, vous pouvez essayer de vous connecter au cluster `dahu` (avec la commande `ssh dahu.ciment`).

### Installer une machine de calcul

Vous avez le choix d'utiliser des configurations par défaut dans le dossier `/tmp/workspace/yml_files/computers/setup` ou d'écrire votre propre fichier `yml`. Pour installer une nouvelle machine de calcul, vous devez exécuter les commandes suivantes :

```bash
verdi computer setup -n --config /tmp/workspace/yml_files/computers/setup/{computer}.yml
verdi computer configure {transport} -n --config /tmp/workspace/yml_files/computers/config/{computer}.yml {computer_name}
```

> Ici, vous devez changer `{computer}`, `{transport}` et `{computer_name}` par rapport à ce que vous voulez sélectionner. Le paramètre `{transport}` doit être choisi parmi `core.local` ou `core.ssh` et est renseigné dans le fichier `/tmp/workspace/yml_files/computers/setup/{computer}.yml`.

Pour vérifier que l'installation se soit correctement déroulée, vous pouvez exécuter la commande `verdi computer list`.

### Installer un code

Vous avez le choix d'utiliser des configurations par défaut dans le dossier `/tmp/workspace/yml_files/codes` ou d'écrire votre propre fichier `yml`. Pour installer un nouveau code, vous devez exécuter les commandes suivantes :

```bash
verdi code create core.code.installed -n --config /tmp/workspace/yml_files/codes/{code}.yml
```

Pour vérifier que l'installation se soit correctement déroulée, vous pouvez exécuter la commande `verdi code list`.

## Étape 4 : Lancer un workflow

Une fois l'environnement AiiDA configuré correctement, vous êtes prêt à utiliser l'image et configurer des workflows. Comme précisé plus haut, vous pouvez utiliser les commandes `shell` ou `exec` pour interagir avec le conteneur. Nous recommandons l'utilisation de la commande `shell`pour accéder au conteneur. Il faut également copier votre workflow dans le dossier `/tmp`.

Pour lancer un workflow, il vous suffit d'exécuter la commande :

```bash
verdi run path/to/your/workflow/run.py
```

> **Attention!** Avant de lancer un workflow, vous devez vérifier soigneusement le script python et configurer correctement les valeurs pour `{code_name}` et `{username}`.

## Étape 5 : Arrêter une instance

Une fois que vous en avez fini avec l'image Apptainer, il faut arrêter l'instance Apptainer. Pour ce faire, vous devez exécuter la commandes suivante :

```bash
apptainer instance stop instance_name
```

## Étapes supplémentaires

### Inclure des données pour un code

Des codes et des workflows requièrent des données pour fonctionner correctement. Par exemple, VASP a besoin de potentiels inter-atomiques. Dans les faits, vous pouvez installer des données (de la même manière que vous avez installé la machine de calcul et le code). AiiDA permet l'installation des données à travers le dézipage d'un fichier `.tar` ou `.tar.gz`. Cela signifie que vous devez monter le dossier `/tmp` au conteneur au moment où vous configurer votre environnement. En pratique, vous avez juste besoin d'ajouter la ligne `-B /tmp:/tmp \` au moment de démarrer une instance. Ensuite, vous pouvez utiliser la commande suivante :

```bash
verdi data vasp-potcar uploadfamily --path=/tmp/{archive} --name=PBE.54 --description="PBE potentials version 54"
```

Pour vérifier que l'installation se soit déroulée correctement, vous pouvez exécuter la commande `verdi data vasp-potcar listfamilies`. La sortie de cette commande **ne doit pas être vide**.

> Une fois que vous avez installé les données, nous vous recommandons d'arrêter l'instance et d'en démarrer une nouvelle sans monter le dossier `/tmp` au conteneur.

### Lancer un workflow sur les clusters de Gricad

Vous devez spécifier un projet PERSEUS si vous voulez lancer des workflows sur les clusters de Gricad ; pour ce faire, vous pouvez le renseigner en tant que votre que nom d'utilisateur dans le workflow python.

## Problèmes connus

Here is a list of all the known issues so far:

- No backward compatibility of Apptainer images from version **1.3.X** to version **1.2.X**. Building an image with apptainer **v1.3.X** will prevent it from being downloaded from the `gitlab-gricad` registry with apptainer **v1.2.X**.
- The postgresql service won't start is the 5432 port is already in use on that machine. In this case, it is impossible to create a profile for AiiDA.

</div>
