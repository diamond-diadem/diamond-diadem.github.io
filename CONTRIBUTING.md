> **Branch protection**
> The `main` branch is protected: direct pushes are blocked and will be rejected. Always create a feature branch for your changes, then open a pull request so the website administrator can review and merge it. This keeps production stable and ensures every update is traceable.
> 
> **Dependency files**
> The files `package.json` and `package-lock.json` contain the locked dependencies for the Node.js environment. They should not be edited or modified.

It's possible to edit the site directly on [the Github.com repository](https://github.com/diamond-diadem/diamond-diadem.github.io). However, it's encouraged not to do so. It's best practice to make modifications in local branches, and then create pull requests to contribute them. This way they can be tested on a local Hugo server before pushing.

## Local development

To run a local Hugo server, and access the server in "development mode", the following dependencies are needed:

- **Node.js** - `v25.2.1` or higher — run `node -v` to check.
- **Hugo extended** - `v0.152.2` — run `hugo version` to check.

### Installing `Node.js` and `npm`

The [recommended way](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install `npm` and `Node.js` is using a *Node Version Manager*, like `nvm` for example. See [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) the detailed description on how to do so. Basically, make sure the `$PROFILE` environment variable is pointing to your `.bashrc` (`.profile`, etc.) to make sure the configuration is written to the correct profile, then get the installation script and run it as follows (review it beforehand, don't execute code without looking at it before)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Then restart the terminal, and it should be available, check with `nvm -v`. At this point it can be displayed the `Node.js` versions available to install as follows.

```bash
nvm ls-remote
```

Note that most of the time it's best to go with the latest `LTS` version, to do so

```bash
nvm install --lts
```

Finally, verify the installation and it should be good to go

```bash
node -v
npm -v
```

### Installing Hugo extended

Download and install version 0.152.2 for Linux amd64 as follows, or adjust as needed for your architecture

```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.152.2/hugo_extended_0.152.2_linux-amd64.tar.gz
tar -xzf hugo_extended_0.152.2_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/hugo
sudo chmod +x /usr/local/bin/hugo
```

In case no `root` rights are available, just copy the executable to some sourced directory like `~/.local/bin`, or source the directory where it already is.

Verify the installation was successful

```bash
hugo version
```

### Retrieve and install the website locally

Clone the GitHub repository

```bash
git clone https://github.com/diamond-diadem/diamond-diadem.github.io.git diamond-website
```

Install the `js` site dependencies

```bash
cd diamond-website
npm install
```

And access the development server

```bash
npm run dev
```

It should have granted access to a local version of the site at, usually, `localhost:1313`.

This local version of the site will update with each modification of the source files, allowing for test on modifications before contributing. Note that some times, mostly when adding new files or changing configurations, the website won't get updated on-live. In these situations it's recommended to terminate the live server running (Ctrl-C), re-launch it, and refresh the page.

## Markdown

For syntax references, check out the following resources:

- Doks' [Basic](https://getdoks.org/docs/reference/markdown-basic-syntax/) guide.
- Doks' [Advanced](https://getdoks.org/docs/reference/markdown-extended-syntax/) guide.

Nonetheless, the following sections point out some important concepts

### Links

To include links in Markdown, use the following syntax:

```markdown
[Link text](URL)
```

### Opening links in a new tab

To open a link in a new tab, use the following HTML syntax:

```html
<a href="https://example.com" target="_blank">Example</a>
```

The `target="_blank"` attribute ensures the link opens in a new tab.

### Internal links

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

### Adapting images for light/dark themes

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

## YouTube video integration (Tutorials)

To integrate a YouTube video, use the custom Diamond shortcode:

```markdown
{{< video-with-consent id="{video-id}" >}}
```

Replace `{video-id}` with the YouTube video ID. To obtain this ID, go to the YouTube video page, click the "Share" button, and copy the link of the form `https://youtu.be/{video-id}`.

### Features of the shortcode

- Maintains a fixed aspect ratio (48:27) with 100% width for optimal adaptability.
- Enables privacy-enhanced mode via `youtube-no-cookie.com`.
- Integrates cookie consent management (if configured in `config/`).
- Automatically adapts subtitles to match the page language.

## Adding FAQs to the Home page

FAQs live inside `content/<lang-code>/faqs/`, and they are simple `.md` files with the following form:

```md
---
title: "Frequent question?"
---

Answer to this question.

Can even take multiple lines, and probably use links, math equations, etc.
```

To add FAQs, create a new file with this structure inside the mentioned folder, and it should be it. Remember to terminate the live server (if any), and re-start it for the modification to take effect.
