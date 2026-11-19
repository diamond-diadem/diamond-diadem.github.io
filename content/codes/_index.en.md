---
title: Codes and software
sidebar_expanded: true
aliases:
  - /codes/home/
  - /codes/start-here/home/
seo:
  description: Hub for DIAMOND’s containerised scientific codes, Apptainer images, HPC
    workflow library, and materials simulation software catalog.
---

You will find in this section a set of codes to support your research.

## Which codes?

Diamond provides about thirty modelling and visualisation codes, ranging from the electronic to the macroscopic scale. These codes were chosen with input from a community of researchers interested in materials and AI (GDR IAMAT), and will be extended to best meet your needs. Missing the one you need? [Tell us]({{% ref "/contact" %}}) and we will look into adding it.

## In what form are the codes provided?

The codes are provided in containerised form. Why? So that they run identically and reliably on each of your machines (Windows or Linux, desktop computer or supercomputer). A container works like a flash drive with a program already installed on it.

- A containerised code **runs on any computer**.
- **It bundles the code and everything it needs to run** (so no installation, compilation, dependencies or admin rights are required). In particular, it runs where you cannot install anything: many HPC clusters will not let you install software, but they do let you run containers.
- **The code gives the same results, every time**: it runs in exactly the same environment on your laptop, your cluster and your colleague's machine. **Reproducibility** comes built in.

## How to use it?

Every container below is ready to download and use right away. There is only one prerequisite: having access, on the machine, to the containerisation software you will use. We provide Apptainer containers (designed for HPC) and Docker containers (more widely used).

Never used a container before?

There is a small learning curve, and we have you covered: step-by-step tutorials on [installing Apptainer]({{% ref "documentation/install/install-apptainer" %}}) and [using containerised codes]({{% ref "documentation/use/apptainer-image" %}}), plus a real-world example for each container.

Still stuck? We are always [here to help]({{% ref "/contact" %}}).

## List of containerised codes

{{< codes-catalog >}}
