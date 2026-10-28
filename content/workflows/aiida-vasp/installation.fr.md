---
title: "Installation des workflows Diamond AIIDA-VASP"
linkTitle: "Installation"
toc: true
description: "Installer, configurer et tester les workflows WF1 et WF2 avec AiiDA, VASP et OVITO, puis lancer les premiers exemples."
---

## Avant de commencer

La version actuelle de `diamond-aiida-vasp` est un **prototype de recherche installable depuis ses sources**. Elle n'est pas présentée ici comme un plugin autonome publié sur PyPI. Le repositoire dans lequel nous avons placé le workflow est actuellement fermé, mais une autorisation d'accès peut être demandée via notre [formulaire d'assistance]({{% ref "contact" %}}).

Les commandes ci-dessous supposent un système Linux et sont à exécuter **depuis la racine du dépôt**, sauf indication contraire.

**Environnement de référence :**

| Composant | Version |
| --- | --- |
| Python | 3.11 recommandé (compatibilité déclarée : 3.10 à 3.12) |
| `aiida-core` | **2.6.3** |
| `aiida-vasp` | **3.1.1** |
| `ovito` | **3.11.3** (API gratuite OVITO Basic) |

Pour **préparer** des structures, VASP et AiiDA n'ont pas besoin d'être opérationnels. En revanche, pour **soumettre** des simulations, il vous faudra : un profil AiiDA fonctionnel, un ordinateur AiiDA (*computer*), un code VASP enregistré, et une famille de potentiels PAW/POTCAR autorisée par votre licence VASP.

> **Licence VASP :** ni l'exécutable VASP, ni les fichiers POTCAR/pseudopotentiels ne sont fournis avec le projet. Leur obtention, leur installation et leur usage sont à la charge des utilisateurs habilités. Ne les ajoutez pas au dépôt GitLab.

## 1. Installer le package (mode développement)

Récupérez le dépôt GitLab du projet. Son URL définitive sera ajoutée à cette page au moment de la publication ; en attendant, remplacez la variable ci-dessous par l'adresse du dépôt auquel vous avez accès.

```bash
export DIAMOND_VASP_REPO_URL="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/diamond-aiida-vasp"
git clone "$DIAMOND_VASP_REPO_URL" diamond-aiida-vasp
cd diamond-aiida-vasp
```

Créez et activez un environnement Python dédié, puis installez le package en mode éditable :

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e .
```

La commande `pip install -e .` installe les dépendances déclarées dans `pyproject.toml`. Si vous utilisez Conda ou Mamba, le dépôt propose également un fichier `environment.yml` :

```bash
conda env create -f environment.yml
conda activate diamond-aiida-vasp
```

Utilisez **une seule** des deux méthodes d'environnement. Vérifiez que la commande du projet est disponible :

```bash
diamond-vasp --help
```

Pour les contributeurs ou pour lancer les tests automatisés, installez les outils de développement et exécutez :

```bash
python -m pip install -e '.[dev]'
pytest -q
```

Ces tests locaux ne nécessitent pas de licence VASP ni de soumission HPC ; ils ne remplacent pas un test de calcul réel.

## 2. Configurer AiiDA

AiiDA conserve les informations de provenance et gère la soumission des calculs. Pour une première installation locale, vous pouvez créer un profil avec :

```bash
verdi presto
verdi status
verdi daemon start
verdi plugin list aiida.workflows
```

Pour un usage durable sur un cluster, adaptez le stockage, le système de messages et les services AiiDA à votre infrastructure. Un [tutoriel DIAMOND sur AiiDA en conteneur]({{% ref "documentation/by-container/aiida" %}}) fournit un point de départ pour les installations conteneurisées.

Vous devez enregistrer une fois :

1. un **profil AiiDA** ;
2. un **computer** décrivant la machine et son ordonnanceur ;
3. un **code AiiDA** pointant vers un exécutable VASP accessible sur cette machine.

### Exemple : machine locale

Le répertoire `examples/cluster/` contient des fichiers YAML à personnaliser. Dans `local.computer.yml`, modifiez notamment `work_dir` ; dans les fichiers `local.vasp-*.yml`, remplacez les chemins d'exécutables par ceux de **votre** installation VASP.

Après modification des fichiers :

```bash
verdi computer setup --config examples/cluster/local.computer.yml
verdi computer configure core.local localhost
verdi code create core.code.installed --config examples/cluster/local.vasp-std.yml
verdi code create core.code.installed --config examples/cluster/local.vasp-gam.yml
verdi computer test localhost
verdi code test vasp-std@localhost
```

Les exemples `gricad-dahu.*.yml` et `jean-zay.computer.yml` servent de points de départ pour des environnements HPC, **pas de configurations immédiatement opérationnelles**. Il peut être nécessaire d'installer un plugin d'ordonnanceur supplémentaire (par exemple, le [plugin OAR de DIAMOND](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler)) et d'ajuster les accès SSH, modules, partitions, chemins et paramètres MPI. **La plateforme DIAMOND peut vous aider à adapter les fichiers YAML à votre distribution et à votre cluster.**

### Enregistrer les pseudopotentiels VASP

Avec une copie des données POTCAR obtenue légalement, enregistrez **dans votre profil AiiDA privé** la famille requise par les fichiers de configuration :

```bash
verdi data vasp-potcar uploadfamily \
  --path=/chemin/prive/vers/votre/archive_POTCAR.tar.gz \
  --name=PBE.54 \
  --description="Famille PAW sous licence VASP"
verdi data vasp-potcar listfamilies
```

`PBE.54` est un **exemple de nom de famille**, pas une donnée livrée avec le projet. Dans `examples/config/wf1.yml` et `examples/config/wf2.yml`, vérifiez les champs `code`, `potential_family` et `potential_mapping` : les correspondances doivent refléter les noms des espèces atomiques et les variantes POTCAR **réellement disponibles** pour vous.

### Vérifier l'environnement

```bash
diamond-vasp doctor --config examples/config/wf1.yml --check-ovito
verdi status
```

`doctor` vérifie notamment les versions Python, la disponibilité d'AiiDA, les WorkChains VASP, le code et la famille POTCAR indiqués dans le YAML, ainsi que l'import d'OVITO. Ce diagnostic **ne confirme ni le droit d'utiliser VASP ni la validité d'une soumission sur votre cluster**. Effectuez ensuite un petit calcul de validation sur votre installation.

## 3. Exemple WF1 : extraire des structures inhérentes

WF1 part d'une trajectoire `XDATCAR`. Le dépôt fournit un court fichier d'exemple dans `examples/data/wf1/XDATCAR_sample` ; il sert à vérifier la procédure, **pas à produire des statistiques physiques fiables**.

Commencez par adapter `examples/config/wf1.yml` :

- `trajectory` : chemin vers votre `XDATCAR` ;
- `skip_frames`, `stride`, `max_frames` : sélection des configurations après thermalisation ;
- `code`, `potential_family`, `potential_mapping` et `options` : VASP et ressources HPC ;
- `rdf_radius`, `rdf_bins` et, si nécessaire, `pair_cutoffs` : analyse RDF/CNA.

### Préparer les entrées (sans VASP)

```bash
diamond-vasp wf1 prepare \
  --config examples/config/wf1.yml \
  --out runs/wf1
```

Cette commande crée les POSCAR sélectionnés et `runs/wf1/wf1_manifest.json`, qui recense les configurations et leurs identifiants de calcul AiiDA lorsqu'ils sont soumis.

### Soumettre, suivre et récupérer les calculs

Les étapes suivantes nécessitent l'environnement AiiDA/VASP configuré :

```bash
# Lancer un premier calcul pour vérifier le paramétrage.
diamond-vasp wf1 submit \
  --config examples/config/wf1.yml \
  --manifest runs/wf1/wf1_manifest.json \
  --limit 1

diamond-vasp wf1 status --manifest runs/wf1/wf1_manifest.json
verdi process list -a
```

Après la fin **réussie** des relaxations :

```bash
diamond-vasp wf1 collect \
  --manifest runs/wf1/wf1_manifest.json \
  --out results/wf1/relaxed

diamond-vasp wf1 analyze \
  --config examples/config/wf1.yml \
  --manifest runs/wf1/wf1_manifest.json \
  --structures results/wf1/relaxed \
  --out results/wf1/analysis
```

Les résultats se trouvent notamment dans `results/wf1/relaxed/` (structures relaxées) et `results/wf1/analysis/` (`rdf.csv`, `pair_cutoffs.json`, `cna.csv`). Seules les relaxations terminées correctement sont exportées et analysées.

> **À vérifier avant une étude scientifique :** les premiers pics/minima des RDF, les rayons de coupure CNA et la représentativité des configurations. Le calcul RDF parcourt ici le `XDATCAR` d'entrée ; pour éviter une contribution des images de thermalisation à cette moyenne, fournissez une trajectoire préalablement équilibrée.

## 4. Exemple WF2 : déterminer un volume d'équilibre

WF2 s'appuie sur les structures du répertoire `examples/data/wf2/`, dont les noms sont du type `POSCAR_300` ou `POSCAR_650` pour une température de **300 K** ou **650 K**.

Adaptez le fichier `examples/config/wf2.yml`. Le champ `volume_factors` décrit des rapports **`V / V_ref`**, et non des facteurs multiplicatifs appliqués directement à chaque vecteur de maille. Vérifiez également les paramètres AIMD (`incar`), les ressources, le code VASP et les potentiels.

### Préparer les entrées (sans VASP)

```bash
diamond-vasp wf2 prepare \
  --config examples/config/wf2.yml \
  --out runs/wf2
```

Le programme crée les POSCAR à volume fixé et `runs/wf2/wf2_manifest.json`.

### Soumettre, récupérer et ajuster l'équation d'état

```bash
# Limiter le nombre de nouveaux calculs soumis pour le premier essai.
diamond-vasp wf2 submit \
  --config examples/config/wf2.yml \
  --manifest runs/wf2/wf2_manifest.json \
  --limit 2

diamond-vasp wf2 status --manifest runs/wf2/wf2_manifest.json
```

Lorsque les simulations **se sont terminées correctement**, récupérez leurs sorties et ajustez les points pression–volume :

```bash
diamond-vasp wf2 collect \
  --manifest runs/wf2/wf2_manifest.json \
  --out results/wf2/retrieved

diamond-vasp wf2 fit \
  --manifest runs/wf2/wf2_manifest.json \
  --retrieved results/wf2/retrieved \
  --out results/wf2/analysis \
  --tail 1000
```

`--tail 1000` signifie que **les 1 000 dernières valeurs de pression disponibles** sont utilisées pour la moyenne ; ce paramètre doit être choisi en fonction de l'équilibrage réel des trajectoires. L'analyse produit `pressures.csv` et `eos_fits.json`, ainsi qu'un graphique `pressure_volume.png` lorsque Matplotlib est installé (`pip install -e '.[plot]'`). Les pressions sont exprimées en **kbar**, les volumes en **Å³ par cellule simulée**.

L'ajustement Birch–Murnaghan nécessite **au moins quatre volumes distincts par température**. Pour interpréter le volume d'équilibre, inspectez les résidus de l'ajustement, la stabilité des pressions et la présence d'un minimum dans la plage des volumes simulés. Certains calculs VASP peuvent nécessiter une configuration de récupération supplémentaire pour que `OUTCAR` et `CONTCAR` soient accessibles à WF2.

## 5. Suivre les calculs et éviter les erreurs courantes

- **Relancer les soumissions :** les commandes `submit` utilisent le fichier `*_manifest.json` et ignorent les cas ayant déjà un identifiant AiiDA. Vous pouvez les relancer avec une autre limite pour soumettre les cas restants ; évitez deux commandes `submit` simultanées sur le même manifeste.
- **Ne pas réexécuter `prepare` dans le même dossier :** si un manifeste existe, la préparation s'arrête afin de ne pas écraser le suivi des calculs. Réutilisez le manifeste ou choisissez un nouveau dossier de sortie.
- **Comprendre un échec :** consultez `diamond-vasp wf1 status` / `diamond-vasp wf2 status`, puis `verdi process show NUMERO_DU_PK`. Le programme ne relance pas automatiquement les calculs en échec.
- **Ne pas mélanger les configurations :** les fichiers `wf1.yml` et `wf2.yml` de démonstration doivent être adaptés à la physique du système, à votre licence VASP et aux caractéristiques de votre HPC avant une production scientifique.

Pour le détail de la méthodologie, les limites scientifiques et la configuration des clusters, consultez également les fichiers `docs/methodology.md`, `docs/limitations.md` et `docs/cluster-setup.md` du dépôt source.
