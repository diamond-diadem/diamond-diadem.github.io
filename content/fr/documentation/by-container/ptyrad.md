---
title: Comment utiliser l'image Apptainer PtyRAD
linkTitle: Tutoriel PtyRAD
weight: 4
description: "Tutoriel du conteneur PtyRAD de DIAMOND : récupération de l'image, exécution et exemples de reconstructions ptychographiques."
---

{{< callout title="Prérequis" >}}

- Apptainer (voir soit [notre guide d'installation]({{% ref "/documentation/install/install-apptainer" %}}), soit [la documentation officiel](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- L'image [`ptyrad.sif`](/codes/scientific-computing/ptyrad/)

{{< /callout >}}

Pour plus d'informations sur les conteneurs Apptainer et leur utilisation, nous mettons à votre disposition [une description d'Apptainer]({{% ref "/about/apptainer" %}}), un guide rapide sur [comment utiliser Apptainer]( {{% ref "/documentation/use/apptainer-image" %}}), sans oublier bien sûr la [documentation officielle d'Apptainer](https://apptainer.org/docs/user/latest/).

## Démarrage rapide

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

Le premier est utiliser l'interface interactive de Jupyter. Exécutez `ptyrad/notebooks/run_ptyrad.ipynb` dans un éditeur prenant en charge les notebooks Jupyter (par exemple, Visual Studio Code), ou à l'aide de la commande suivante :

  ```bash
  apptainer exec ptyrad.sif jupyter notebook ./notebooks/run_ptyrad.ipynb # Ou ouvrez-le directement dans VS Code
  ```

Le seconde consiste à utiliser l'interface en ligne de commande (reconstruction non-interactive)

  ```bash
  apptainer run ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  # ou également
  # ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  ```



## Utilisation détaillée du conteneur PtyRAD

Cette section présente d'autres façons d'utiliser l'image PtyRAD. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--crash-course).

### Lancer avec GPU

PtyRAD peut être lancé avec GPU. Pour que le conteneur détecte le GPU de la machine hôte, vous devez le lancer avec certains indicateurs spécifiques. Pour les GPU Nvidia, vous devez lancer le conteneur avec l'indicateur `--nv`:

```bash
apptainer run --nv ptyrad.sif <other-arguments>
# ou
# apptainer exec --nv ptyrad.sif <command-and-arguments>
```

Pour les GPU AMD prenant en charge ROCm, vous devez ajouter `--rocm` :

```bash
apptainer run --rocm ptyrad.sif <other-arguments>
# ou
# apptainer exec --rocm ptyrad.sif <command-and-arguments>
```

### Accélération multi-GPU

Vous pouvez également activer l'accélération multi-GPU si plusieurs GPU sont disponibles. Pour ce faire, vous devez lancer le conteneur avec la commande `accelerate` à l'aide de `apptainer exec` :

```bash
apptainer exec ptyrad.sif accelerate launch --multi_gpu --num_processes=2 -m ptyrad run "${PARAMS_PATH}" --gpuid acc 2>&1
```

Selon les types de cartes graphiques dont vous disposez, vous devrez peut-être ajouter les options `--nv` et/ou `--rocm`.

## Aller plus loin

Le site officiel de PtyRAD propose plusieurs tutoriels expliquant comment utiliser PtyRAD pour la reconstruction ptychographique. Vous pouvez les trouver [ici](https://ptyrad.readthedocs.io/en/latest/resources.html#tutorials-educational-materials). Pour mieux comprendre le fonctionnement de PtyRAD, consultez [sa documentation](https://ptyrad.readthedocs.io/en/latest/index.html).
