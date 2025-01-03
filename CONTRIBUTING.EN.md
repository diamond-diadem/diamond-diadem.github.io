
# Contributing to the DIAMOND Website

## Markdown

### Syntax Reference

- [**Basics**](https://getdoks.org/docs/reference/markdown-basic-syntax/)
- [**Extended**](https://getdoks.org/docs/reference/markdown-extended-syntax/)

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

Replace `{video-id}` with the YouTube identifier of the video. The video's URL should follow the format: `https://www.youtube.com/watch?v={video-id}`.

### Features of the Shortcode

- Maintains a fixed aspect ratio (48:27) with 100% width for responsiveness.
- Enables privacy-enhanced mode using `youtube-no-cookie.com`.
- Integrates Cookies Consent Management (if configured in `config/`).
- Automatically adjusts subtitles language to match the page's language.

## Links

To include links in Markdown, use the following syntax:

```markdown
[Text of the link](URL)
```

### Opening Links in a New Tab

To open a link in a new tab, use the following HTML syntax instead:

```html
<a href="https://example.com" target="_blank">Example</a>
```

The `target="_blank"` attribute ensures the link opens in a new tab.

### Internal Links

For internal links within the website, include only the portion of the URL after the base website address.

Example: To link to `https://diamond-diadem.github.io/en/codes/visualisation/paraview/`, use:

```markdown
[ParaView](/en/codes/visualisation/paraview/)
```
