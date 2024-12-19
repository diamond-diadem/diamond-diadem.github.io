# Website DIAMOND

## Digital platform of the [PEPR DIADEM](https://pepr-diadem.fr)

## Built with [Hugo](https://gohugo.io), using the [Doks](https://getdoks.org) theme from the [Thulite](https://thulite.io) framework

## Local Installation (Development Server) for Contributors

### Prerequisites

- **Node.js** - `v20.11.0` or higher — run `node -v` to check.
- **Hugo extended** - `v0.125.0` or higher — run `hugo version` to check.

### Installing Prerequisites: For Debian-based Systems (Ubuntu ...)

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

- Visit the Hugo releases page to check the latest available version.
- Directly download the archive corresponding to your system (Linux 64-bit Extended) with `wget`. For example:

```bash
wget https://github.com/gohugoio/hugo/releases/download/vX.X.X/hugo_extended_X.X.X_Linux-64bit.tar.gz
```

- Replace `X.X.X` with the number of the latest stable version.

Extract the downloaded file:

```bash
tar -zxvf hugo_extended_X.X.X_Linux-64bit.tar.gz
```

Move the extracted binary to a directory included in your PATH, such as `/usr/local/bin`:

```bash
sudo mv hugo /usr/local/bin
```

Verify the installation:

```bash
hugo version
```
