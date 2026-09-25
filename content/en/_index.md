---
title: Welcome to DIAMOND
lead: The digital platform of <a href="https://pepr-diadem.fr" target="_blank" rel="noopener noreferrer">PEPR DIADEM</a>
seo:
  title: DIAMOND
  description: "DIAMOND is the digital platform of PEPR DIADEM for materials simulation, offering Apptainer containers, scientific workflows, and materials databases."

# Home page content. Every text of the home page lives here, section by
# section, in the order they appear. Texts accept Markdown. Links point to
# site pages by their content path ("page"), so they follow the language.

hero:
  eyebrow: The digital platform of PEPR DIADEM
  title: You focus on the research. *We take care of the technical side.*
  text: >-
    DIAMOND containerises scientific codes, builds reproducible workflows,
    writes documentation and gives direct help to the members of
    [PEPR DIADEM](https://pepr-diadem.fr), so you can spend your time on
    materials science instead of software installation.
  actions:
    - label: Browse the codes
      page: /codes/home
    - label: Ask for help
      page: /contact
  image:
    alt: >-
      Word cloud of the codes cited by the DIADEM community, arranged by
      physical scale from electronic to macroscopic. 68.2% of them are
      containerised and/or packaged.
    caption: Codes used by the DIADEM community, by physical scale.
  services:
    - icon: tabler-icons/outline/box
      title: Containerised codes
      text: Ready-to-run images of the codes you use.
      page: /codes/home
    - icon: tabler-icons/outline/route
      title: Workflows
      text: Automated, traceable simulation pipelines.
      page: /workflows
    - icon: tabler-icons/outline/book
      title: Documentation
      text: Guides from installation to HPC runs.
      page: /documentation/home
    - icon: tabler-icons/outline/lifebuoy
      title: Direct help
      text: Engineers ready to answer your questions.
      page: /contact

codes:
  eyebrow: Containerised codes
  title: Reproducible software, ready to run anywhere
  text: >-
    We package the codes the DIADEM community relies on as **Apptainer and
    Docker container images** and **Guix packages**. Each build is pinned and
    traceable, so a simulation runs the same way on a laptop, a lab server or
    a national HPC cluster, and anyone can reproduce it years later.
  principlesTitle: Built on the FAIR principles
  principles:
    - letter: F
      title: Findable
      text: Every code has its own page, indexed and searchable.
    - letter: A
      title: Accessible
      text: Public images, pulled with a single command.
    - letter: I
      title: Interoperable
      text: Standard SIF and OCI formats that run on any Linux system.
    - letter: R
      title: Reusable
      text: Pinned versions and Guix recipes rebuild the same environment.
  featured:
    - /codes/scientific-computing/lammps
    - /codes/scientific-computing/quantum-espresso
    - /codes/scientific-computing/abinit
    - /codes/scientific-computing/cp2k
    - /codes/scientific-computing/plumed
    - /codes/scientific-computing/freefem
    - /codes/visualisation/ovito
    - /codes/visualisation/paraview
  link:
    label: See all the codes
    page: /codes/home

workflows:
  eyebrow: Workflows
  title: From single runs to automated, traceable pipelines
  text: >-
    Materials simulations chain many steps, produce large amounts of data and
    often need restarting. We develop workflows, many of them with the
    [AiiDA](https://www.aiida.net) workflow manager, that automate these
    steps, run them on remote machines and record the full provenance of
    every result.
  points:
    - Fewer repetitive tasks and human errors
    - Complete traceability of data and parameters
    - Results that are easy to reproduce and share
  featured:
    - /workflows/saw
    - /workflows/aiida-diffusion-wf
    - /workflows/raman-denoising
  link:
    label: Explore the workflows
    page: /workflows

news:
  eyebrow: News
  title: Latest from DIAMOND
  count: 4
  link:
    label: All the news
    page: /news

faq:
  eyebrow: FAQ
  title: Frequently asked questions
  text: The questions we hear most often. Can't find yours? Read the full FAQ or write to us.
  link:
    label: Read the full FAQ
    page: /faqs

contact:
  title: Let us handle the technical side of your research
  text: >-
    Need a code containerised, a workflow automated or a hand getting started?
    Our engineers answer every request from DIADEM members.
  actions:
    - label: Contact the team
      page: /contact
    - label: Read the documentation
      page: /documentation/home
---
