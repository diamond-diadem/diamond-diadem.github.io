---
title: Containerised codes
linkTitle: Home
toc: false
aliases:
  - /codes/home/
  - /codes/start-here/home/
cascade:
  toc: false
seo:
  description: Hub for DIAMOND’s containerised scientific codes, Apptainer images, HPC
    workflow library, and materials simulation software catalog.
---

A container can be thought of as a flash drive with a program already installed on it: plug it into any computer, and you get direct access to that program.

This is especially useful when a program is complicated to install, when you cannot install it directly but do have access to containers, or simply because running it inside a container guarantees the same results every time (reproducibility).

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
Here, we provide these containers so you can download and use them right away, as long as you have access to Apptainer (designed for HPC) and/or Docker (more widely used) on your computer.
{{< /callout >}}

Using them does involve a bit of a learning curve, so we also provide tutorials on [installing Apptainer]({{% ref "documentation/install/install-apptainer" %}}) and [using container images]({{% ref "documentation/use/apptainer-image" %}}), along with real-world examples for each container. And if you ever get stuck, we're always [here to help you]({{% ref "contact" %}}).

## Selection criteria for our containerised codes

In the summer of 2023, the materials community was surveyed via LimeSurvey to identify working habits. Among other things, this highlighted a number of codes used for both computation and visualisation (see below). Currently, above $68\%$ of the codes cited by the community are containerised and/or packaged, covering all physical scales. If you want us to add any other code, please [get in touch]({{% ref "contact" %}}).

<img alt="containerised codes" class="containerised-codes en mt-4" style="width:100%">

## Available code

{{< codes-catalog >}}

