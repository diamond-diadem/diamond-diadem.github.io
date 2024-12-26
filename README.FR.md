# Site web DIAMOND

## Plateforme numérique du [PEPR DIADEM](https://pepr-diadem.fr)

## Construit avec [Hugo](https://gohugo.io), avec le theme [Doks](https://getdoks.org), du framework [Thulite](https://thulite.io)

## Installation en local (serveur de développement), pour les contributeurs

### Modifications ponctuelles

Vous pouvez éditer le site directement sur [le dépôt Github.com](https://github.com/diamond-diadem/diamond-diadem.github.io)

Pour des contributions plus poussées, avec la possibilité de les tester avant le push, installez le site en local.

### Prérequis

- **Node.js** - `v20.11.0` ou supérieur — exécutez `node -v` pour vérifier.
- **Hugo extended** - `v0.125.0` ou supérieur — exécutez `hugo version` pour vérifier.

### Installation des prérequis : pour les systèmes basés sur Debian (Ubuntu, ...)

- #### Node.js

```bash
sudo apt update && sudo apt upgrade
sudo apt install -y curl software-properties-common
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Puis vérifiez l'installation :

```bash
node -v
npm -v
```

- #### Hugo extended

Vérifiez que votre système est à jour :

```bash
sudo apt update && sudo apt upgrade
```

- Rendez-vous sur la [page des releases](https://github.com/gohugoio/hugo/releases) de Hugo pour vérifier la dernière version disponible.
- Téléchargez directement le paquet `.deb` correspondant à votre système avec `wget`. Par exemple :

```bash
wget https://github.com/gohugoio/hugo/releases/download/vX.X.X/hugo_extended_X.X.X_linux-amd64.deb
```

- Remplacez `X.X.X` par le numéro de la dernière version stable

Installez le paquet téléchargé :

```bash
sudo apt install hugo_extended_X.X.X_linux-amd64.deb
```

Vérifiez l'installation :

```bash
hugo version
```

### Récupérez et installez le site web en local

#### Clonez le dépôt Github

```bash
git clone https://github.com/diamond-diadem/diamond-diadem.github.io.git diamond-website
```

#### Installez les dépendances du Site

```bash
cd diamond-website
npm install
```

### Accédez au serveur de développement

Lancez la commande :

```bash
npm run dev
```

Et vous aurez accès à une version locale du site sur `localhost:1313`

Cette version locale du site se mettra à jour à chaque modification des fichiers source, et vous permettra de tester vos contributions.

### Pour un guide de contribution au site, consultez `CONTRIBUTING.md` à la racine du répertoire source

## Structure du projet

```markdown
diamond-website/
├── .github/
│  └── workflows/
│     ├── deploy.yml
│     └── protect-files.yml
├── config/
│  └── ...
├── content/
│  ├── en/
|  |  └── ...
│  └── fr/
│     ├── about/
│     │  └── ...
│     ├── codes/
|     |  └── ...
│     ├── contact/
│     ├── data/
│     ├── documentation/
│     │  └── ...
│     ├── news/
│     └── workflows/
├── assets/
│  ├── images/
│  ├── js/
│  │  └── ...
│  ├── scss/
│  │  └── ...
│  ├── svgs/
│  │  └── ...
│  ├── cover.png
│  ├── favicon.png
│  └── ...
├── layouts/
│  └── ...
├── static/
│  ├── downloads/
|  |  └── ...
│  └── images/
|     └── ...
├── i18n/
├── archetypes/
├── public/
|  └── ...
├── node_modules/
|  └── ...
├── .gitignore
├── .gitpod.yml
├── .hugo_build.lock
├── .npmignore
├── .npmrc
├── .prettierignore
├── .prettierrc.yaml
├── CONTRIBUTING.md
├── LICENSE
├── README.EN.md
├── README.FR.md
├── hugo_stats.json
├── netlify.toml
├── package-lock.json
└── package.json
```

### Dossier `.github/workflows/`

Le dossier .github/workflows/ répertoire utilisé pour configurer GitHub Actions, un outil d'intégration et de déploiement continus (CI/CD) intégré à GitHub. Ce dossier contient des fichiers de configuration au format YAML (.yml), qui décrivent les workflows que GitHub doit exécuter automatiquement pour ce projet.

#### `deploy.yml`

Déploie en ligne le site mis à jour, pour chaque push sur la branche `main` effectué par un contributeur

#### `protect-files.yml`

Protège les fichiers `package.json` et `package-lock.json`, en refusant tout push qui les modifie.

Le fichier `package.json` est un fichier principal qui contient des métadonnées sur le projet ainsi qu'une liste des dépendances nécessaires pour que le projet fonctionne.

Le fichier `package-lock.json` est automatiquement généré par `npm` lorsque vous installez des dépendances ou modifiez le fichier `package.json`. Il enregistre la version exacte de chaque dépendance et de leurs dépendances transitives (dépendances des dépendances).

### Dossier `config/`

```markdown
config/
├── _default/
│  ├── menus/
│  │  ├── menus.en.yaml
│  │  └── menus.fr.yaml
│  ├── hugo.yaml
│  ├── languages.yaml
│  ├── markup.yaml
│  ├── module.yaml
│  └── params.yaml
├── next/
│  └── hugo.yaml
├── production/
│  └── hugo.yaml
├── babel.config.js
└── postcss.config.js
```

#### Fichiers `.yaml`

Divisés en trois sous-dossiers, par environnement de travail :

- `_default/` est l'environnement par défaut, qui est utilisé lors du développement en local.
- `next/` contient des variables modifiées par rapport à `_default` pour effectuer du "staging", c'est-à-dire déployer le site sur une adresse alternative pour partager et tester le développement en cours. Le staging n'est pas paramétré pour ce site pour le moment.
- `production/` contient les variables propres à la production finale, c'est-à-dire au déploiement du site sur l'adresse [`https://diamond-diadem.github.io`](https://diamond-diadem.github.io). Pour l'instant, les seules lignes qui changent de `_default/` sont, dans `hugo.yaml` :
  
```yaml
baseURL: https://diamond-diadem.github.io
canonifyURLs: true
```

contre

```yaml
baseurl: http://localhost/
canonifyURLs: false
```

pour `_default/`

Le reste des lignes de configuration est réparti entre les différents fichiers  `.yaml` dans `_default/`.

Certaines lignes sont propres au projet du site web DIAMOND :

```yaml
diamond:
  enableNews: true
  sectionsIcons: false
  cookiesConsent: false
```

`enableNews` active ou désactive le système de news qui a été ajouté au site

`sectionsIcons` active ou désactive la présence d'icones représentant les différentes sections, sur la page d'accueil. C'est un projet abandonné pour le moment mais vous pouvez activer cet élément et me dire ce que vous en pensez !

`cookiesConsent` active ou désactive le système de consentement aux cookies. Il n'est pas encore déployé à ce jour, mais est terminé.

##### `module.yaml`

Ce fichier configure comment certains dossiers issus de `nodes_modules` sont chargés à l'intérieur de certains dossiers du projet. Cela permet de récupérer les fichiers des modules **Doks** et **Thulite**, en particulier.

#### `babel.config.js`

C'est un fichier de configuration pour Babel, un outil JavaScript utilisé principalement pour transformer du code moderne (ou autre) en une version compatible avec un plus large éventail de navigateurs.

Ce fichier a été créé automatiquement et n'a pas été édité depuis la création du site.

#### `postcss.config.js`

C'est un fichier de configuration pour PostCSS, un outil de traitement CSS. PostCSS permet de transformer le code CSS avec des plugins, pour ajouter des fonctionnalités, optimiser le code ou garantir sa compatibilité avec différents navigateurs.

Ce fichier a été créé automatiquement et n'a pas non plus été édité depuis la création du site.

### Dossier `content/`

Le dossier  `content/` contient les fichiers Markdown (`.md`), qui sont les fichiers source pour chaque page du site (excepté la page d'accueil qui est générée par `layouts/index.html`).

Pour ajouter du contenu, c'est par ce dossier qu'il faut passer. Il est ensuite possible d'enrichir le contenu avec des feuilles de style `.scss`, la modification des `layouts` en `html`, et des scripts en `.js`.

A noter que la ligne de configuration suivante, dans `markup.yaml`

```yaml
goldmark:
  renderer:
    unsafe: true
```

permet d'intégrer du code `html` au sein des fichiers Markdown. Ce qui est largement usité dans le cas de ce site web. Il est toutefois tout à fait possible de se cantonner à la syntaxe Markdown.

#### Arborescence

```markdown
content
├── en
│  ├── about
│  │  ├── apptainer
│  │  │  └── _index.md
│  │  ├── containers
│  │  │  └── _index.md
│  │  ├── diadem
│  │  │  └── _index.md
│  │  ├── diamond
│  │  │  └── _index.md
│  │  ├── guix
│  │  │  └── _index.md
│  │  └── _index.md
│  ├── codes
│  │  ├── scientific-computing
│  │  │  ├── _index.md
│  │  │  ├── abinit.md
│  │  │  ├── cp2k.md
│  │  │  ├── dftbplus.md
│  │  │  ├── fenics.md
│  │  │  ├── freefem.md
│  │  │  ├── gmsh.md
│  │  │  ├── lammps.md
│  │  │  ├── n2p2.md
│  │  │  ├── neper.md
│  │  │  ├── nwchem.md
│  │  │  ├── opencalphad.md
│  │  │  ├── opendis.md
│  │  │  ├── plumed.md
│  │  │  ├── quantum-espresso.md
│  │  │  ├── raspa2.md
│  │  │  ├── wannier90.md
│  │  │  ├── z-set.md
│  │  │  └── zeo++.md
│  │  ├── start-here
│  │  │  ├── home
│  │  │  │  ├── index.md
│  │  │  │  ├── part-1.md
│  │  │  │  ├── part-2.md
│  │  │  │  └── part-3.md
│  │  │  └── _index.md
│  │  ├── visualisation
│  │  │  ├── _index.md
│  │  │  ├── ovito.md
│  │  │  ├── paraview.md
│  │  │  ├── vesta.md
│  │  │  ├── vmd.md
│  │  │  └── xcrysden.md
│  │  └── _index.md
│  ├── contact
│  │  └── _index.md
│  ├── data
│  │  └── _index.md
│  ├── documentation
│  │  ├── by-container
│  │  │  ├── _index.md
│  │  │  ├── aiida.md
│  │  │  ├── lammps.md
│  │  │  ├── ovito.md
│  │  │  ├── paraview.md
│  │  │  ├── quantum-espresso.md
│  │  │  └── vmd.md
│  │  ├── freq_asked_questions
│  │  │  ├── _index.md
│  │  │  ├── apptainer-headnode.md
│  │  │  └── apptainer-visu.md
│  │  ├── install
│  │  │  ├── _index.md
│  │  │  ├── apptainer-windows.md
│  │  │  ├── install-apptainer.md
│  │  │  └── install-guix.md
│  │  ├── start-here
│  │  │  ├── _index.md
│  │  │  └── home.md
│  │  ├── use
│  │  │  ├── _index.md
│  │  │  ├── apptainer-image.md
│  │  │  ├── apptainer-isolation-flags.md
│  │  │  ├── apptainer-parallel.md
│  │  │  ├── ask-help.md
│  │  │  ├── container-num-cost.md
│  │  │  └── guix-package.md
│  │  └── _index.md
│  ├── news
│  │  ├── ag-diadem-2024
│  │  │  ├── feature.jpg
│  │  │  └── index.md
│  │  ├── diadem-ia-numpex
│  │  │  ├── feature.png
│  │  │  └── index.md
│  │  ├── _index.md
│  │  └── cecam-workshop.md
│  ├── workflows
│  │  ├── saw
│  │  │  ├── _index.md
│  │  │  ├── description.md
│  │  │  └── tutorial.md
│  │  ├── start-here
│  │  │  ├── _index.md
│  │  │  └── home.md
│  │  └── _index.md
│  └── _index.md
└── fr
   ├── about
   │  ├── apptainer
   │  │  └── _index.md
   │  ├── containers
   │  │  └── _index.md
   │  ├── diadem
   │  │  └── _index.md
   │  ├── diamond
   │  │  └── _index.md
   │  ├── guix
   │  │  └── _index.md
   │  └── _index.md
   ├── codes
   │  ├── scientific-computing
   │  │  ├── _index.md
   │  │  ├── abinit.md
   │  │  ├── cp2k.md
   │  │  ├── dftbplus.md
   │  │  ├── fenics.md
   │  │  ├── freefem.md
   │  │  ├── gmsh.md
   │  │  ├── lammps.md
   │  │  ├── n2p2.md
   │  │  ├── neper.md
   │  │  ├── nwchem.md
   │  │  ├── opencalphad.md
   │  │  ├── opendis.md
   │  │  ├── plumed.md
   │  │  ├── quantum-espresso.md
   │  │  ├── raspa2.md
   │  │  ├── wannier90.md
   │  │  ├── z-set.md
   │  │  └── zeo++.md
   │  ├── start-here
   │  │  ├── home
   │  │  │  ├── index.md
   │  │  │  ├── part-1.md
   │  │  │  ├── part-2.md
   │  │  │  └── part-3.md
   │  │  └── _index.md
   │  ├── visualisation
   │  │  ├── _index.md
   │  │  ├── ovito.md
   │  │  ├── paraview.md
   │  │  ├── vesta.md
   │  │  ├── vmd.md
   │  │  └── xcrysden.md
   │  └── _index.md
   ├── contact
   │  └── _index.md
   ├── data
   │  └── _index.md
   ├── documentation
   │  ├── by-container
   │  │  ├── _index.md
   │  │  ├── aiida.md
   │  │  ├── lammps.md
   │  │  ├── ovito.md
   │  │  ├── paraview.md
   │  │  ├── quantum-espresso.md
   │  │  └── vmd.md
   │  ├── freq_asked_questions
   │  │  ├── _index.md
   │  │  ├── apptainer-headnode.md
   │  │  └── apptainer-visu.md
   │  ├── install
   │  │  ├── _index.md
   │  │  ├── apptainer-windows.md
   │  │  ├── install-apptainer.md
   │  │  └── install-guix.md
   │  ├── start-here
   │  │  ├── _index.md
   │  │  └── home.md
   │  ├── use
   │  │  ├── _index.md
   │  │  ├── apptainer-image.md
   │  │  ├── apptainer-isolation-flags.md
   │  │  ├── apptainer-parallel.md
   │  │  ├── ask-help.md
   │  │  ├── container-num-cost.md
   │  │  └── guix-package.md
   │  └── _index.md
   ├── news
   │  ├── ag-diadem-2024
   │  │  └── index.md
   │  ├── diadem-ia-numpex
   │  │  ├── feature.png
   │  │  └── index.md
   │  ├── _index.md
   │  └── cecam-workshop.md
   ├── workflows
   │  ├── saw
   │  │  ├── _index.md
   │  │  ├── description.md
   │  │  └── tutorial.md
   │  ├── start-here
   │  │  ├── _index.md
   │  │  └── home.md
   │  └── _index.md
   └── _index.md
```

Cette arborescence montre comment s'organise le contenu du site, par sections, et divisé en deux versions miroirs l'une de l'autre, l'une pour le contenu en français (`content/fr`), et l'autre pour le même contenu en anglais.

En visitant le site, on dispose d'un sélecteur de langue qui permet de passer entre les deux versions (française et anglaise) d'une page.

La traduction d'une langue à l'autre n'est pas gérée par Hugo, il faut traduire à la main ou utiliser des outils tiers

#### Par section

##### A propos 

### Dossier `assets/`

...

### Dossier `layouts/`

...
