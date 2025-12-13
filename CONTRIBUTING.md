# Contributing to the DIAMOND website

> **Branch protection**  
> The `main` branch is protected: direct pushes are blocked and will be rejected. Always create a feature branch for your changes, then open a pull request so the website administrator can review and merge it. This keeps production stable and ensures every update is traceable.

## Local Installation (Development Server), for contributors

### Occasional Edits

You can edit the site directly on [the Github.com repository](https://github.com/diamond-diadem/diamond-diadem.github.io).

For more in-depth contributions, with the ability to test them before pushing, install the site locally.

### Prerequisites

- **Node.js** - `v25.2.1` or higher — run `node -v` to check.
- **Hugo extended** - `v0.152.2` — run `hugo version` to check.

### Installing Prerequisites for Linux

- #### Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart terminal, then:

```bash
nvm install node
nvm use node
npm install -g npm
```

Verify the installation:

```bash
node -v
npm -v
```

- #### Hugo extended

Download and install version 0.152.2 for Linux amd64

```bash
wget https://github.com/gohugoio/hugo/releases/download/v0.152.2/hugo_extended_0.152.2_linux-amd64.tar.gz
tar -xzf hugo_extended_0.152.2_linux-amd64.tar.gz
sudo mv hugo /usr/local/bin/hugo
sudo chmod +x /usr/local/bin/hugo
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

And you will have access to a local version of the site at `localhost:1313`.

This local version of the site will update with each modification of the source files, allowing you to test your contributions.

## Markdown

### Syntax References

- [**Basics**](https://getdoks.org/docs/reference/markdown-basic-syntax/)
- [**Advanced**](https://getdoks.org/docs/reference/markdown-extended-syntax/)

## Links

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
