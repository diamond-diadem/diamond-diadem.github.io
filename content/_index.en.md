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
  # title: Digital tools to accelerate research in *materials science*
  text: >-
    We provide digital tools and technical support to assist with your research
    in materials science: the codes you need, ready-to-use; reproducible workflows;
    an infrastructure to help you collect, store, and organize your data;
    and related documentation.
  actions:
    - label: Ask for help
      page: /contact
    - label: Read the docs
      page: /documentation
  image:
    alt: >-
      DIAMOND logo: a diamond linking accelerated design, databases and AI,
      and codes and workflows
  services:
    - icon: tabler-icons/outline/box
      title: Containerised codes
      text: Ready-to-run images of the codes you use.
      page: /codes
    - icon: tabler-icons/outline/book
      title: Databases
      text: Store, link and share your material data.
      page: /data
    - icon: tabler-icons/outline/route
      title: Workflows
      text: Automated, traceable simulation pipelines.
      page: /workflows
    - icon: tabler-icons/outline/lifebuoy
      title: Notebooks
      text: Machine learning applied to materials data.
      page: /notebooks

codes:
  eyebrow: Containerised codes
  title: Containerized, ready-to-use, and reproducible software
  text: >-
    Software covering numerical simulations from the atomic to the macroscopic scale,
    associated visualization, experimental data analysis, and much more. They are provided
    as ready-to-use containers, thus operating identically and reliably across
    different environments (Windows or Linux, desktop or supercomputer)
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
      text: Provided as containers which run on any system.
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
    page: /codes

workflows:
  eyebrow: Workflows
  title: From single runs to automated, traceable pipelines
  text: >-
    Examples of workflows that automate and orchestrate calculation chains by combining different
    code and simulation tools. This saves time and improves the reproducibility and traceability of
    results.
  points:
    - Fewer repetitive tasks and human errors
    - Complete traceability of data and parameters
    - Results that are easy to reproduce and share
  featured:
    - /workflows/saw
    - /workflows/aiida-diffusion-wf
  link:
    label: Explore the workflows
    page: /workflows

notebooks:
  eyebrow: ML notebooks
  title: Machine learning on materials data, ready to run
  text: >-
    We put machine learning into practice on materials data: educational
    Jupyter notebooks you can follow, modify and transpose to your own
    datasets, and pipelines developed within PEPR DIADEM, published with
    their article and their data.
  points:
    - A complete path, from data quality to Bayesian optimisation
    - Notebooks that run as they are and adapt to your data
    - Pipelines reusable on your own measurements
  featured:
    - /notebooks/ml-training
    - /notebooks/raman-denoising
  link:
    label: Explore the ML notebooks
    page: /notebooks

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
    Our engineers answer every request from PEPR DIADEM members.
  actions:
    - label: Contact the team
      page: /contact
    - label: Read the documentation
      page: /documentation
---
