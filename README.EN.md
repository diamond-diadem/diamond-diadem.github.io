
# DIAMOND Website

## Digital platform of [PEPR DIADEM](https://pepr-diadem.fr)

## Built with [Hugo](https://gohugo.io), using the [Doks](https://getdoks.org) theme, from the [Thulite](https://thulite.io) framework

## Local Installation (development server) for contributors

### Occasional Modifications

You can edit the site directly on [the Github.com repository](https://github.com/diamond-diadem/diamond-diadem.github.io).

For more in-depth contributions, with the ability to test them before pushing, install the site locally.

### Prerequisites

- **Node.js** - `v20.11.0` or higher — run `node -v` to check.
- **Hugo extended** - `v0.125.0` or higher — run `hugo version` to check.

### Installing Prerequisites: For Debian-based Systems (Ubuntu, ...)

- #### Node.js

```bash
sudo apt update && sudo apt upgrade
sudo apt install -y curl software-properties-common
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Then verify the installation:

```bash
node -v
npm -v
```

- #### Hugo extended

Ensure your system is up-to-date:

```bash
sudo apt update && sudo apt upgrade
```

- Visit the [releases page](https://github.com/gohugoio/hugo/releases) of Hugo to check the latest available version.
- Download the `.deb` package corresponding to your system directly with `wget`. For example:

```bash
wget https://github.com/gohugoio/hugo/releases/download/vX.X.X/hugo_extended_X.X.X_linux-amd64.deb
```

- Replace `X.X.X` with the number of the latest stable version.

Install the downloaded package:

```bash
sudo apt install hugo_extended_X.X.X_linux-amd64.deb
```

Verify the installation:

```bash
hugo version
```

### Retrieve and Install the Website Locally

#### Clone the Github Repository

```bash
git clone https://github.com/diamond-diadem/diamond-diadem.github.io.git diamond-website
```

#### Install Site Dependencies

```bash
cd diamond-website
npm install
```

### Access the Development Server

Run the command:

```bash
npm run dev
```

And you will have access to a local version of the site on `localhost:1313`.

This local version of the site will update with every modification to the source files, allowing you to test your contributions.

For a guide on contributing to the site, see `CONTRIBUTING.md` at the root of the source directory.
