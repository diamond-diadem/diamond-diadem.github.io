---
title: Comment utiliser l'image conteneur FEniCS
linkTitle: Tutoriel FEniCS
weight: 1
description: "Tutoriel sur l'utilisation de l'image FEniCS de DIAMOND avec Apptainer ou Docker : récupération du conteneur et cas d'usage pour les simulations EF."
---

<div align="justify">

{{< callout context="note" title="Prérequis" icon="tabler-icons/outline/info-circle" >}}

- Avoir installé **Apptainer** [(guide d'installation)](/documentation/install/install-apptainer/) ou **Docker** [(guide d'installation)](https://docs.docker.com/engine/install/)
- Avoir téléchargé les **fichiers d’entrée** [disponibles ici](/downloads/fenics-tutorial-inputs.tar.gz)

Pour plus d'informations sur les conteneurs Apptainer, veuillez consulter la [page dédiée](/about/apptainer/) ou suivre [ce tutoriel](/documentation/use/apptainer-image/) pour s'approprier les principales commandes d'Apptainer.

{{< /callout >}}

{{< callout context="tip" title="Apptainer ou Docker ?" icon="tabler-icons/outline/help-circle" >}}

Chaque commande de cette page est donnée pour Apptainer et pour Docker : choisissez votre outil dans n'importe quel onglet ci-dessous et toute la page suit votre choix. Docker convient pour essayer l'image sur votre propre ordinateur, mais sur les clusters il faut utiliser Apptainer ([pourquoi ?](/documentation/faq/#docker-est-également-une-solution-de-conteneurisation-pourquoi-ne-pas-simplement-utiliser-docker-)).

{{< /callout >}}

## Image de conteneur

Récupérez l'image FEniCS :

{{< tabs "abinit-pull" >}}
{{< tab "Apptainer" >}}
```bash
apptainer pull fenics.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics.sif:latest
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/fenics fenics
```

La seconde commande donne à l'image le nom court `fenics`, utilisé dans la suite de ce tutoriel.
{{< /tab >}}
{{< /tabs >}}

## Fichiers d'entrée

Pour illustrer les différentes commandes, un ensemble de fichiers d'entrée pour FEniCS est disponible sous forme d'archive via [ce lien](/downloads/fenics-tutorial-inputs.tar.gz). L'archive contient deux scripts Python (`demo_poisson_1.py` et `demo_poisson_2.py`) décrivant la même équation de Poisson avec deux ensembles différents de conditions aux limites. Ces deux scripts ont été adaptés à partir de l'exemple d'introduction *Poisson equation* de la [documentation officielle](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/demos/demo_poisson.html)

Dans ce tutoriel, nous supposerons que les fichiers d'entrée contenus dans cette archive se trouvent dans le répertoire courant. Pour les extraire :

```bash
tar -xzf fenics-tutorial-inputs.tar.gz
```

## Guide de démarrage rapide

Pour les plus impatients, voici comment lancer un calcul FEniCS dans le cas où le répertoire courant contient tous les fichiers d'entrée nécessaires :

{{< tabs "fenics-quickstart" >}}
{{< tab "Apptainer" >}}
L'image `fenics.sif` est supposée se trouver dans le répertoire courant.

```bash
apptainer exec fenics.sif python3 demo_poisson_2.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -v "$PWD":/work -w /work fenics python3 demo_poisson_2.py
```

Ici, `-v "$PWD":/work -w /work` rend le répertoire courant accessible dans le conteneur et y lance le calcul, `-u $(id -u):$(id -g)` garantit que les fichiers de sortie vous appartiennent (et non à `root`), et `--rm` supprime le conteneur une fois le calcul terminé. Sur les systèmes utilisant SELinux (Fedora, RHEL…), ajoutez `:z` au volume (`-v "$PWD":/work:z`) si vous obtenez des erreurs « Permission denied ».
{{< /tab >}}
{{< /tabs >}}

## Utilisation détaillée du conteneur FEniCS

Cette section présente différentes façons d'utiliser l'image FEniCS. Pour plus de détails sur les commandes Apptainer, veuillez consulter [ce tutoriel](/documentation/use/apptainer-image/#apptainer--cours-accéléré).

### Introduction

FEniCS est une plateforme logicielle open source conçue pour la résolution numérique des équations aux dérivées partielles (EDP) à l’aide de méthodes des éléments finis.

### Description du problème à résoudre

Voici le problème tel qu'il est décrit dans le tutoriel d'origine :

Pour un domaine $\Omega \subset \mathbb{R}^n$ dont la frontière est donnée par $\partial\Omega = \Gamma_D \cup \Gamma_N$, l'équation de Poisson avec des conditions aux limites particulières s'écrit :

$$
\begin{aligned}
-\nabla^2 u &= f \quad \text{dans } \Omega, \\
u &= 0 \quad \text{sur } \Gamma_D, \\
\nabla u \cdot n &= g \quad \text{sur } \Gamma_N.
\end{aligned}
$$
où $f$ et $g$ sont des données d'entrée et $n$ désigne la normale à la frontière dirigée vers l'extérieur.

Le problème variationnel s'énonce ainsi : trouver $u \in V$ tel que

$$
a(u, v) = L(v) \quad \forall v \in V,
$$

où $V$ est un espace de fonctions approprié et

$$
a(u, v) := \int_\Omega \nabla u \cdot \nabla v \, \mathrm{d}x,
$$

$$
L(v) := \int_\Omega f v \, \mathrm{d}x + \int_{\Gamma_N} g v \, \mathrm{d}s.
$$

L'expression $a(u, v)$ est la forme bilinéaire et $L(v)$ est la forme linéaire. On suppose que toutes les fonctions de $V$ satisfont les conditions aux limites de Dirichlet ($u = 0$ sur $\Gamma_D$).

Dans cette démonstration, nous considérons :

- $\Omega = [0, 2] \times [0, 1]$ (un rectangle)
- $\Gamma_D = \{(0, y) \cup (2, y) \subset \partial\Omega\}$
- $\Gamma_N = \{(x, 0) \cup (x, 1) \subset \partial\Omega\}$

### Version simplifiée

Dans cette première sous-section, nous considérons les expressions simples suivantes des fonctions $f$ et $g$ :

- $g(x,y) = 0$
- $f(x,y) = 10$

#### Solution analytique

Avec cet ensemble simple de conditions aux limites, il est possible de calculer une solution analytique qui dépend uniquement de la variable de la coordonnée d'espace $x$ :

$$u(x) = -5x^2 + 10x$$

Cette solution satisfait :

- $-\nabla^2 u = 10$ (l'équation de Poisson)
- $u(0) = u(2) = 0$ (conditions aux limites de Dirichlet)
- $\frac{\partial u}{\partial y} = 0$ en $y=0$ et $y=1$ (conditions aux limites de Neumann)

#### Description du fichier d'entrée

Le fichier d'entrée Python `demo_poisson_1.py` met en œuvre la résolution FEniCS pour l'ensemble simplifié de conditions aux limites présenté ci-dessus. Ce script suit la structure du tutoriel officiel de FEniCS :

1. **Création du maillage et définition de l’espace fonctionnel**
   Le script commence par importer les modules nécessaires et créer un maillage rectangulaire de 32×16 éléments à l’aide de la méthode `mesh.create_rectangle`,

2. **Prescription des conditions aux limites**
   Des conditions aux limites de Dirichlet sont appliquées aux limites gauche ($x=0$) et droite ($x=2$),
   ```python
      f = fem.Constant(msh, ScalarType(10))
      g = fem.Constant(msh, ScalarType(0))
   ```

3. **Définition du problème variationnel**
   Les formes bilinéaire et linéaire sont définies à l’aide de l’UFL (*Unified Form Language*),

4. **Résolution du problème**
   Le problème linéaire est résolu à l’aide du solveur LU de PETSc :
   ```python
   uh = problem.solve()
   ```

5. **Sortie et visualisation**
   Les résultats sont enregistrés au format XDMF pour être visualisés à l’aide d’outils tels que ParaView.

#### Lancer la simulation

La commande suivante lance la simulation avec l'ensemble simplifié de conditions aux limites :

{{< tabs "fenics-simulation-1" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec fenics.sif python3 demo_poisson_1.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work fenics python3 demo_poisson_1.py
```
{{< /tab >}}
{{< /tabs >}}


Cela crée un fichier de sortie `out_poisson/poisson.xdmf` qui peut être ouvert à l’aide de Paraview. Pour interagir avec ce fichier de sortie à l’aide de Paraview :

```shell
paraview out_poisson/poisson.xdmf
```

ou avec le [conteneur Paraview](/codes/visualisation/paraview/) hébergé par le projet Diamond :

{{< tabs "fenics-visualize-1" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
# pull the Docker image
docker pull gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview
docker tag gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/paraview paraview

docker run --rm -u $(id -u):$(id -g) -e DISPLAY -e XAUTHORITY -v /tmp/.X11-unix:/tmp/.X11-unix --mount type=bind,src=$XAUTHORITY,dst=$XAUTHORITY --device /dev/dri -v "$PWD":/work -w /work paraview out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< /tabs >}}

puis sélectionner *Xdmf3 Reader S*. Le bouton vert *Apply* situé dans le panneau de gauche déclenche l’affichage de la solution de l’équation calculée par le logiciel, comme illustré ci-dessous.

<img alt="Visualisation dans Paraview de la solution du problème simple" src="/images/tutorials/fenics-tutorial/simple_solution_paraview.png" />

Cette solution correspond visuellement à la solution analytique calculée plus haut ($u(x) = -5x^2 + 10x$).

### Version du tutoriel officiel

La présente sous-section examine un ensemble plus complexe de conditions aux limites, tel que défini dans le [tutoriel officiel](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/demos/demo_poisson.html) :

- $g = \sin(5x)$
- $f = 10 \exp(-((x - 0,5)^2 + (y - 0,5)^2)/0,02)$

Le fichier d'entrée `demo_poisson_2.py` définissant cette simulation est identique au précédent, à l'exception de la partie qui implémente les expressions des fonctions $g$ et $f$ :

```python
f = 10 * ufl.exp(-((x[0] - 0.5) ** 2 + (x[1] - 0.5) ** 2) / 0.02)
g = ufl.sin(5 * x[0])
```

La commande suivante lance la simulation avec ce deuxième ensemble de conditions aux limites :

{{< tabs "fenics-simulation-2" >}}
{{< tab "Apptainer" >}}
```bash
apptainer exec fenics.sif python3 demo_poisson_2.py
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm --entrypoint "" -u $(id -u):$(id -g) -v "$PWD":/work -w /work fenics python3 demo_poisson_2.py
```
{{< /tab >}}
{{< /tabs >}}

Comme décrit ci-dessus, le fichier de sortie peut être ouvert avec Paraview :

```shell
paraview out_poisson/poisson.xdmf
```

ou avec le [Paraview containeur](/codes/visualisation/paraview/) comme suit :

{{< tabs "fenics-visualize-2" >}}
{{< tab "Apptainer" >}}
```bash
apptainer run paraview.sif out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< tab "Docker" >}}
```bash
docker run --rm -u $(id -u):$(id -g) -e DISPLAY -e XAUTHORITY -v /tmp/.X11-unix:/tmp/.X11-unix --mount type=bind,src=$XAUTHORITY,dst=$XAUTHORITY --device /dev/dri -v "$PWD":/work -w /work paraview out_poisson/poisson.xdmf
```
{{< /tab >}}
{{< /tabs >}}

<img alt="Visualisation dans Paraview de la solution du problème d'origine" src="/images/tutorials/fenics-tutorial/complex_solution_paraview.png" />

### Pour aller plus loin

La [documentation officielle](https://docs.fenicsproject.org/dolfinx/v0.10.0.post5/python/index.html) propose de nombreux exemples illustrant les fonctionnalités du logiciel. Ces exemples peuvent être facilement exécutés avec l'image de conteneur FEniCS en adaptant les commandes présentées dans ce tutoriel.

</div>
