---
title: Bienvenue sur DIAMOND
lead: La plateforme numérique du <a href="https://pepr-diadem.fr" target="_blank" rel="noopener noreferrer">PEPR DIADEM</a>
seo:
  title: DIAMOND
  description: "DIAMOND est la plateforme numérique du PEPR DIADEM pour la simulation des matériaux, avec des conteneurs Apptainer, des workflows et des bases de données."

# Contenu de la page d'accueil. Tous les textes de la page d'accueil sont ici,
# section par section, dans leur ordre d'apparition. Les textes acceptent le
# Markdown. Les liens désignent les pages du site par leur chemin de contenu
# (« page »), ils suivent donc la langue.

hero:
  eyebrow: La plateforme numérique du PEPR DIADEM
  # title: Concentrez-vous sur la recherche. *Nous nous occupons de la technique.*
  title: Des outils numériques pour accélérer la recherche en *science des matériaux*
  text: >-
    La plateforme numérique DIAMOND met à votre disposition des outils numériques et un
    soutien technique au service de vos recherches en science des matériaux : des codes
    et logiciels prêts à l’emploi ; des workflows reproductibles pour automatiser et
    accélérer l’enchaînement des calculs ; une infrastructure pour vous permettre de
    collecter, stocker et structurer vos données ; de la documentation associée.
  actions:
    - label: Parcourir les codes
      page: /codes
    - label: Demander de l'aide
      page: /contact
  image:
    alt: >-
      Logo de DIAMOND : un diamant reliant design accéléré, bases de
      données et IA, et codes et workflows
  services:
    - icon: tabler-icons/outline/box
      title: Codes conteneurisés
      text: Des images prêtes à l'emploi des codes que vous utilisez.
      page: /codes
    - icon: tabler-icons/outline/route
      title: Workflows
      text: Des chaînes de simulation automatisées et traçables.
      page: /workflows
    - icon: tabler-icons/outline/book
      title: Documentation
      text: Des guides, de l'installation au calcul sur HPC.
      page: /documentation
    - icon: tabler-icons/outline/lifebuoy
      title: Aide directe
      text: Des ingénieurs pour répondre à vos questions.
      page: /contact

codes:
  eyebrow: Codes conteneurisés
  title: Des logiciels reproductibles, prêts à tourner partout
  text: >-
    Des codes et logiciels couvrant un large spectre d'applications : simulation
    numérique de l’échelle atomique à macroscopique, visualisation associée, analyse
    de données expérimentales et prochainement simulation des procédés.Des codes
    prêts à l’emploi fonctionnant de manière identique et fiable sur différents
    environnements (Windows ou Linux, ordinateur de bureau ou supercalculateur).
  principlesTitle: Fondés sur les principes FAIR
  principles:
    - letter: F
      title: Faciles à trouver
      text: Chaque code a sa propre page, indexée et consultable.
    - letter: A
      title: Accessibles
      text: Des images publiques, récupérées en une seule commande.
    - letter: I
      title: Interopérables
      text: Des formats standards SIF et OCI, exécutables sur tout système Linux.
    - letter: R
      title: Réutilisables
      text: Versions figées et recettes Guix reconstruisent le même environnement.
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
    label: Voir tous les codes
    page: /codes

workflows:
  eyebrow: Workflows
  title: Des calculs isolés aux chaînes automatisées et traçables
  text: >-
    Des exemples de workflows permettant d’automatiser et d'orchestrer des chaînes de calcul,
    en combinant différents codes et outils de simulation. Un gain de temps et de meilleures
    reproductibilité et traçabilité des résultats.
  points:
    - Moins de tâches répétitives et d'erreurs humaines
    - Une traçabilité complète des données et des paramètres
    - Des résultats faciles à reproduire et à partager
  featured:
    - /workflows/saw
    - /workflows/aiida-diffusion-wf
  link:
    label: Explorer les workflows
    page: /workflows

notebooks:
  eyebrow: Notebooks ML
  title: L'apprentissage automatique sur les données matériaux, prêt à l'emploi
  text: >-
    Nous mettons l'apprentissage automatique en pratique sur des données
    matériaux : des notebooks Jupyter pédagogiques à suivre, modifier et
    transposer à vos propres jeux de données, et des pipelines développés au
    sein du PEPR DIADEM, publiés avec leur article et leurs données.
  points:
    - Un parcours complet, de la qualité des données à l'optimisation bayésienne
    - Des notebooks qui s'exécutent tels quels et s'adaptent à vos données
    - Des pipelines réutilisables sur vos propres mesures
  featured:
    - /notebooks/ml-training
    - /notebooks/raman-denoising
  link:
    label: Explorer les notebooks ML
    page: /notebooks

news:
  eyebrow: Actualités
  title: Les dernières nouvelles de DIAMOND
  count: 4
  link:
    label: Toutes les actualités
    page: /news

faq:
  eyebrow: FAQ
  title: Foire aux questions
  text: Les questions que l'on nous pose le plus souvent. Vous ne trouvez pas la vôtre ? Lisez la FAQ complète ou écrivez-nous.
  link:
    label: Lire la FAQ complète
    page: /faqs

contact:
  title: Confiez-nous la partie technique de votre recherche
  text: >-
    Besoin de conteneuriser un code, d'automatiser un workflow ou d'un coup de
    main pour démarrer ? Nos ingénieurs répondent à chaque demande des membres
    de DIADEM.
  actions:
    - label: Contacter l'équipe
      page: /contact
    - label: Lire la documentation
      page: /documentation
---
