# Site web DIAMOND

## Plateforme numérique du [PEPR DIADEM](https://pepr-diadem.fr)

## Construit avec [Hugo](https://gohugo.io), avec le theme [Doks](https://getdoks.org), du framework [Thulite](https://thulite.io)

## Installation en local (serveur de développement), pour les contributeurs

### Prérequis

- **Node.js** - `v20.11.0` ou supérieur — exécutez `node -v` pour vérifier.
- **Hugo extended** - `v0.125.0` ou supérieur — exécutez `hugo version` pour vérifier.

### Installation des prérequis : pour les systèmes basés sur Debian (Ubuntu ...)

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
- Téléchargez directement l’archive correspondant à votre système (Linux 64-bit Extended) avec `wget`. Par exemple :

```bash
wget https://github.com/gohugoio/hugo/releases/download/vX.X.X/hugo_extended_X.X.X_linux-amd64.deb
```

- Remplacez `X.X.X` par le numéro de la dernière version stable

Extrayez le fichier téléchargé :

```bash
sudo apt install hugo_extended_X.X.X_linux-amd64.deb
```

```bash
hugo version
```
