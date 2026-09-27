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

You have spent two days trying to install a code. The compiler complains about a missing library, the cluster will not let you install it, and your deadline is not moving.

Now picture the same code up and running in a few minutes: one download, one command, and it works.

That is what a **container** gives you.

## So what is a container?

Think of a container as a flash drive with a program already installed on it: plug it into any computer, and the program simply works. No compiling, no hunting down dependencies, no admin rights.

- **Hard-to-install codes, ready to go**: someone has already done the painful part for you.
- **Runs where you cannot install anything**: many HPC clusters will not let you install software, but they do let you run containers.
- **Same results, every time**: the code runs in exactly the same environment on your laptop, your cluster and your colleague's machine. Reproducibility comes built in.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
Every container below is ready to download and use right away. All you need is Apptainer (designed for HPC) or Docker (more widely used) on your computer.
{{< /callout >}}

## Never used a container before?

There is a small learning curve, and we have you covered: step-by-step tutorials on [installing Apptainer]({{% ref "documentation/install/install-apptainer" %}}) and [using container images]({{% ref "documentation/use/apptainer-image" %}}), plus a real-world example for each container. Still stuck? We are always [here to help]({{% ref "contact" %}}).

## Chosen by the community

In the summer of 2023, we asked the materials community which codes they actually use, for both computation and visualisation (see below). Today, over $68\%$ of them are containerised and/or packaged, covering all physical scales. Missing the one you need? [Tell us]({{% ref "contact" %}}) and we will look into adding it.

<img alt="Word cloud of the codes cited by the community, arranged by physical scale from electronic to macroscopic, with the most cited ones (LAMMPS, VASP, Quantum ESPRESSO, ParaView, OVITO, VESTA) in larger type. 68.2% of these codes are containerised and/or packaged." class="containerised-codes en mt-4" style="width:100%">

## Available codes

{{< codes-catalog >}}
