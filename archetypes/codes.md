---
# Create with: hugo new content codes/<category>/<code>/index.en.md
# (then copy it to index.fr.md and translate).
#
# Logo: drop the code's logo into this folder as logo.svg (or .png, .jpg,
# .webp). Add logo-dark.<ext> too if the logo needs a dark-mode version.
# Without a logo file, the title is shown in its place.
#
# Icon: the small, square version shown in menus and the codes catalog, as
# icon.svg (or .png, .jpg, .webp) in this folder, plus icon-dark.<ext> if it
# needs a dark-mode version. Tutorials of this code show it too, through
# their `code: <this folder's name>` front matter.
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: ""
tagline: "" # a few words for the codes catalog card, such as "Plane-wave DFT suite"
scale: "" # catalog group: electronic, atomic, mesoscopic, microstructure or macroscopic
website: "" # official website, linked from the page header
weight: 1
draft: true
toc: true # false hides the contents sidebar (it is also hidden on pages without headings)
---

### Retrieve the container image

{{ printf "{{< tabs %q >}}" "apptainer_docker" }}
{{ printf "{{< tab %q >}}" "Apptainer" }}
```bash
apptainer pull {{ .File.ContentBaseName }}.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/{{ .File.ContentBaseName }}.sif:latest
```
{{ printf "{{< /tab >}}" }}
{{ printf "{{< tab %q >}}" "Docker" }}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/{{ .File.ContentBaseName }}
```
{{ printf "{{< /tab >}}" }}
{{ printf "{{< /tabs >}}" }}

Describe what {{ replace .File.ContentBaseName "-" " " | title }} does, and what it is used for.

## Tutorial

{{ printf `{{< link-card title="Content to be added" description="<i>Learn to use this container image</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true" class="mb-0" >}}` }}

## {{ replace .File.ContentBaseName "-" " " | title }} documentation

{{ printf "{{< card-grid >}}" }}
{{ printf `{{< link-card title="Official website" href="" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}` }}
{{ printf `{{< link-card title="Official documentation" href="" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}` }}
{{ printf "{{< /card-grid >}}" }}

## Examples

{{ printf `{{< link-card title="Content to be added" description="<i>Download input files</i>" href="#bottom" icon="tabler-icons/outline/file-export" disabled="true" class="mb-0" >}}` }}
