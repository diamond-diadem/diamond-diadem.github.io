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

Cette version locale du site se mettra à jour à chaque modification des fichiers source, et vous permettra de tester vos contributions

### Pour un guide de contribution au site, consultez `CONTRIBUTING.md` à la racine du répertoire source

## Structure du projet

```markdown
diamond-website
├── .github
│  └── workflows
│     ├── deploy.yml
│     └── protect-files.yml
├── archetypeS
├── assets
│  ├── images
│  ├── js
│  │  └── ...
│  ├── scss
│  │  └── ...
│  ├── svgs
│  │  └── ...
│  ├── cover.png
│  ├── favicon.png
│  └── ...
├── config
│  └── ...
├── content
│  ├── en
|  |  └── ...
│  └── fr
│     ├── about
│     │  └── ...
│     ├── codes
|     |  └── ...
│     ├── contact
│     ├── data
│     ├── documentation
│     │  └── ...
│     ├── news
│     └── workflows
├── i18n
├── layouts
│  └── ...
├── node_modules
|  └── ...
├── public
|  └── ...
├── static
│  ├── downloads
|  |  └── ...
│  └── images
|     └── ...
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
