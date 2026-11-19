---
# Create with: hugo new content news/<slug>/index.en.md
# (then copy it to index.fr.md and translate). Put the card's picture in this
# folder as card.<ext> (or name a shared asset in cardImage).
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
description: "" # 110-160 characters; also the SEO text, so no seo: block
summary: "" # plain text for the card; " · " becomes a line break
eventDate: "" # free text, such as "November 24 to 26, 2025"
cardImage: "card.jpg" # bundle file, or a shared images/... asset
weight: 10 # order of the cards, lowest first
draft: true
toc: false # news pages have no contents sidebar
---
