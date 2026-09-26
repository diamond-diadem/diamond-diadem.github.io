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
  title: Concentrez-vous sur la recherche. *Nous nous occupons de la technique.*
  text: >-
    DIAMOND conteneurise des codes scientifiques, construit des workflows
    reproductibles, rédige de la documentation et accompagne directement les
    membres du [PEPR DIADEM](https://pepr-diadem.fr), pour que vous consacriez
    votre temps à la science des matériaux plutôt qu'à l'installation de
    logiciels.
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
    Nous empaquetons les codes dont la communauté DIADEM a besoin sous forme
    d'**images de conteneurs Apptainer et Docker** et de **paquets Guix**.
    Chaque construction est figée et traçable : une simulation se déroule de
    la même façon sur un portable, un serveur de laboratoire ou un
    supercalculateur national, et chacun peut la reproduire des années plus
    tard.
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
    Les simulations de matériaux enchaînent de nombreuses étapes, produisent
    beaucoup de données et doivent souvent être relancées. Nous développons
    des workflows, souvent avec le gestionnaire [AiiDA](https://www.aiida.net),
    qui automatisent ces étapes, les exécutent sur des machines distantes et
    enregistrent la provenance complète de chaque résultat.
  points:
    - Moins de tâches répétitives et d'erreurs humaines
    - Une traçabilité complète des données et des paramètres
    - Des résultats faciles à reproduire et à partager
  featured:
    - /workflows/saw
    - /workflows/aiida-diffusion-wf
    - /workflows/raman-denoising
  link:
    label: Explorer les workflows
    page: /workflows

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
