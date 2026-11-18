---
title: "{{ replace .Name "-" " " | title }}"
description: ""
summary: ""
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true
menu:
  docs:
    parent: ""
    identifier: "{{ .Name }}-{{ delimit (shuffle (split (md5 .Name) "" )) "" }}"
weight: 999
toc: true # false hides the contents sidebar (it is also hidden on pages without headings)
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
