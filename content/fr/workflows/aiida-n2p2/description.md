---
title: Description du workflow n2p2
linkTitle: Description
toc: false
---

Ce workflow est une WorkChain destinée à entraîner un potentiel interatomique par apprentissage automatique et à le valider à l’aide du logiciel de dynamique moléculaire LAMMPS. Il s’appuie sur le dépôt `n2p2`, qui fournit un logiciel de potentiels de réseaux de neurones de haute dimension pour la physique et la chimie computationnelles. La méthodologie des potentiels de réseaux de neurones de Behler-Parrinello a été décrite pour la première fois ici :

- [J. Behler and M. Parrinello, Phys. Rev. Lett. 98, 146401 (2007)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.98.146401)

Ce package contient les outils permettant d’utiliser des paramétrisations existantes de potentiels de réseaux de neurones afin de prédire les énergies et les forces, soit avec des outils autonomes, soit en combinaison avec le logiciel de dynamique moléculaire LAMMPS. Il est également possible d’entraîner de nouveaux potentiels de réseaux de neurones grâce aux outils d’apprentissage fournis.

Cette version du workflow `n2p2` utilise `nnp-scale` et `nnp-train` de :

- [N2P2](https://compphysvienna.github.io/n2p2/) pour l’entraînement du MLIP.
- [LAMMPS](https://www.lammps.org/#gsc.tab=0) pour la validation du modèle.

Le workflow contient des exemples pour apprendre à l’utiliser.
Suivez [ce lien](/fr/workflows/aiida-n2p2/installation) pour l’installer.
