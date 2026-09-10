---
title: Comment utiliser l'image Apptainer PtyRAD ?
linkTitle: Tutoriel PtyRAD
weight: 4
description: "Tutoriel sur l'utilisation de l'image Apptainer PtyRAD de DIAMOND : récupération du conteneur, exécution et cas d'usage pour les reconstructions ptychographiques."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/)
- Avoir téléchargé l'image **ptyrad.sif** [disponible ici](/codes/scientific-computing/ptyrad/)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

## Quick Start

PtyRAD est fourni avec un kit de démarrage contenant des exemples et des modèles. Pour créer le projet modèle, utilisez la commande suivante :

```bash
apptainer run ptyrad.sif init
```

ou simplement

```bash
ptyrad.sif init
```

Cela créera un sous-dossier nommé `ptyrad` dans le répertoire de travail actuel. Vous pourrez ensuite accéder au dossier du projet à l'aide de la commande `cd` et utiliser la commande suivante pour télécharger les données de démonstration afin d'exécuter la reconstruction ptychographique :

```bash
cd ptyrad
python ./scripts/download_demo_data.py
```

Une fois les données téléchargées et décompressées, il existe deux méthodes pour lancer la reconstruction :

* Interface interactive de Jupyter
  Run the `ptyrad/notebooks/run_ptyrad.ipynb` in a editor that support Jupyter notebook (e.g., Visual Studio Code), or using the following command:
  Lancer `ptyrad/notebooks/run_ptyrad.ipynb` dans un editeur qui prenant en charge les notebooks Jupyter (e.g., Visual Studio Code), ou à l'aide de la commande suivante :

  ```bash
  apptainter exec ptyrad.sif jupyter notebook ./notebooks/run_ptyrad.ipynb # Or direcly open it in VS code
  ```

* Interface ligne de commande (reconstruction non-interactive)

  ```bash
  apptainer run ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  # ou également
  # ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  ```



## Utilisation détaillée du conteneur PtyRAD

Cette section présente d'autres façons d'utiliser l'image PtyRAD. Pour plus de détails sur les commandes Apptainer, vueillez consulter [ce tutoriel](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Lancer avec GPU

PtyRAD peut être lancer avec GPU. Pour que le conteneur détecte le GPU de la machine hôte, vous devez le lancer avec certains indicateurs specifiques. Pour les GPU Nvidia, vous devez lancer le conteneur avec l'indicateur `--nv`:

```bash
apptainer run --nv ptyrad.sif <other-arguments>
# or
# apptainer exec --nv ptyrad.sif <command-and-argments>
```

Pour les GPU AMD prenant en charge ROCm, vous devez ajouter `--rocm`,

```bash
apptainer run --rocm ptyrad.sif <other-arguments>
# or
# apptainer exec --rocm ptyrad.sif <command-and-argments>
```

### Accélération multi-GPU

Vous pouvez également activer l'accélération multi-GPU si plusieurs GPU sont disponibles. Pour ce faire, vous devez lancer le conteneur avec la commande `accelerate` à l'aide de `apptainer --exec` :

```bash
apptainer exec ptyrad.sif accelerate launch --multi_gpu --num_processes=2 -m ptyrad run "${PARAMS_PATH}" --gpuid acc 2>&1
```

Selon les types de cartes graphiques dont vous disposez, vous devrez peut-être ajouter les options `--nv` et/ou `--rocm`.

## Aller plus loin

Le site officiel de PtyRAD propose plusieurs tutoriels expliquant comment utiliser PtyRAD pour la reconstruction ptychographique. Vous pouvez le trouver [ici](https://ptyrad.readthedocs.io/en/latest/resources.html#tutorials-educational-materials). Pour mieux comprendre le fonctionnement de PtyRAD, consultez [sa documentation](https://ptyrad.readthedocs.io/en/latest/index.html).
