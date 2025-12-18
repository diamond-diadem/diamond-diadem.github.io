# Contributing to the DIAMOND website

> **Branch protection**  
> The `main` branch is protected: direct pushes are blocked and will be rejected. Always create a feature branch for your changes, then open a pull request so the website administrator can review and merge it. This keeps production stable and ensures every update is traceable.
> 
> **Dependency files**  
> The files `package.json` and `package-lock.json` contain the locked dependencies for the Node.js environment. They should not be edited or modified.

It is possible to edit the site directly on [the Github.com repository](https://github.com/diamond-diadem/diamond-diadem.github.io). However, this is discouraged. The best practice is to make modifications on a local branch, then push them to the GitHub repository and create a pull request. Then the website administrator can review and merge it. This approach also allows you to preview the modifications locally before pushing them to the repository, thanks to a local Hugo server;

## Local development

To run the site locally in development mode, you need to install the following dependencies:

- **Node.js** - `v25.2.1` — run `node -v` to check.
- **Hugo extended** - `v0.152.2` — run `hugo version` to check.

### Installing Prerequisites for Linux

Install *Node Version Manager* (`nvm`)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart the terminal, then verify the installation

```bash
nvm -v
```
List available Node.js versions

```bash
nvm ls-remote
```

Install the `25.2.1` LTS version

```bash
nvm install v25.2.1
```

Finally, verify the installation

```bash
node -v
npm -v
```

- #### Hugo extended

Download and install Hugo Extended version 0.152.2 for Linux amd64. If you are using a different operating system or architecture, adjust the download link accordingly.

```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.152.2/hugo_extended_0.152.2_linux-amd64.tar.gz
tar -xzf hugo_extended_0.152.2_linux-amd64.tar.gz
```

If you have superuser rights on your machine, run

```bash
sudo mv hugo /usr/local/bin/hugo
sudo chmod +x /usr/local/bin/hugo
```

If not, run

```bash
mv hugo ~/.local/bin/hugo
chmod +x ~/.local/bin/hugo
```

Make sure `~/.local/bin` is in your `PATH`. You can add this to your `~/.bashrc` or `~/.zshrc`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Finally, verify the installation

```bash
hugo version
```

### Clone and set up the website locally

#### Clone the Github Repository

```bash
git clone https://github.com/diamond-diadem/diamond-diadem.github.io.git diamond-website
```

Install the `Node.js` dependencies

```bash
cd diamond-website
npm install
```

### Access the Development Server

Run the command:

```bash
npm run dev
```

This command starts a local development server that builds the website from your current source files and branch. The site will automatically refresh with each edit. By default, you can view it at `http://localhost:1313`. Run this command whenever you want to work on or preview the website locally.

> Note: After some edits, you may need to stop the server (Ctrl+C) and restart it to see the changes reflected.
> In case of issues, try clearing the Hugo cache with `hugo --gc`.

## Markdown

### Syntax References

- Doks [Basic](https://getdoks.org/docs/reference/markdown-basic-syntax/) guide.
- Doks [Advanced](https://getdoks.org/docs/reference/markdown-extended-syntax/) guide.

Additional custom features are described below.

### Links

To include links in Markdown, use the following syntax:

```markdown
[Link text](URL)
```

### Opening Links in a New Tab

To open a link in a new tab, use the following HTML syntax:

```html
<a href="https://example.com" target="_blank">Example</a>
```

The `target="_blank"` attribute ensures the link opens in a new tab.

### Internal Links

For internal links within the website, include only the part of the URL after the website's main address.

Example: To link to `https://diamond-diadem.github.io/en/codes/visualisation/paraview/`, use:

```markdown
[ParaView](/en/codes/visualisation/paraview/)
```

## Images

Place the image you want to add (e.g., `image.png`) in the `static/images/` folder in the site's source directory.

The basic Markdown syntax to embed an image is:

```markdown
![Alternative text for the image](/images/image.png)
```

In HTML, use:

```html
<img alt="Alternative text for the image" src="/images/image.png" />
```

### Adapting Images for Light/Dark Themes

If an image needs to adapt to light and dark themes, create two files: `image-light.png` and `image-dark.png` in `static/images`.

Then use:

```html
<img alt="Alternative text for the image" class="custom-image" />
```

Add this code in `assets/scss/_custom.scss`:

```scss
.custom-image {
  content: url(/images/image-light.png);
}
@include color-mode(dark) {
  .custom-image {
    content: url(/images/image-dark.png);
  }
}
```

This ensures the image automatically adapts to the user's chosen theme.

## Codes section

### Generate a new code page

Use the interactive generator to scaffold code pages that follow the standard layout used under `content/<lang>/codes/*`.

1. Run `npm run new:code`.
2. Answer the prompts: category (`scientific-computing` or `visualisation`) via `s`/`v`, official website and documentation URLs, apptainer filename on the container registry, and a description of the code in both English and French. Multiline answers end with a single `.` line.
3. The tool refreshes the Codes section landing page table/selects automatically.

Undo the most recent run with `npm run new:code -- --undo`.

Custom logos/icons are to be added manually; in practice this task is generally handled by the website administrator after your Markdown changes are done.

### Math Support

The website supports `$...$` delimiters for LaTeX syntax in inline math. For block equations, use the following format:

```markdown
$$
(...)
$$
```

## YouTube Video Integration (Tutorials)

To integrate a YouTube video, use the custom Diamond shortcode:

```markdown
{{< video-with-consent id="{video-id}" >}}
```

Replace `{video-id}` with the YouTube video ID. To obtain this ID, go to the YouTube video page, click the "Share" button, and copy the link of the form `https://youtu.be/{video-id}`.

### Features of the Shortcode

- Maintains a fixed aspect ratio (48:27) with 100% width for optimal adaptability.
- Enables privacy-enhanced mode via `youtube-no-cookie.com`.
- Integrates cookie consent management (if configured in `config/`).
- Automatically adapts subtitles to match the page language.

<!-- ## Adding FAQs to the Home page

FAQs live inside `content/<lang-code>/faqs/`, and they are simple `.md` files with the following form:

```md
---
title: "Frequent question?"
---

Answer to this question.

Can even take multiple lines, and probably use links, math equations, etc.
```

To add FAQs, create a new file with this structure inside the mentioned folder, and it should be it. Remember to terminate the live server (if any), and re-start it for the modification to take effect. -->
