---
title: GaTewAY
title_visible: false
linkTitle: GaTewAY
icon: icon-gateway
weight: 19
---

<div class="codes-pages-top-logo container-logo-gateway">
  <span align="center" class="logo-gateway"><b>GaTewAY</b></span>
</div>

### Récupérez l'image Apptainer

```bash
apptainer pull gateway.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/gateway.sif:latest
```

<div align="justify">

**GaTewAY** est un outil de post-traitement, écrit en langage C, destiné à l’analyse de trajectoires de dynamique moléculaire (MD) par la théorie des graphes.
Il permet de convertir les structures 3D (coordonnées xyz) en graphes moléculaires 2D (2D-MolGraphs), dans lesquels les sommets représentent les atomes et les arêtes représentent les interactions (liaisons covalentes, liaisons hydrogène, interactions ioniques ou organométalliques).

Grâce à l’algorithme d’isomorphisme, GaTewAY identifie automatiquement les différentes conformations explorées au cours de la trajectoire, calcule leur temps de résidence et construit le graphe des transitions (réseau des conformations), représentant les transitions observées entre ces conformations. Cette approche graph-théorique permet une reconnaissance rapide et fiable des conformations et le suivi de leurs chemins de conversion.

Modulaire et extensible, GaTewAY est un outil général, flexible et transférable, capable de traiter des systèmes variés, allant de la phase gazeuse aux systèmes condensés complexes. L’utilisateur peut modifier les critères d’analyse utilisés (distances de liaisons, angles, types d’interactions). Son architecture modulaire permet à l’utilisateur également l’ajout de nouveaux types d’interactions ou d’analyses spécifiques. GaTewAY offre une analyse fine et efficace en identifiant et caractérisant les topologies structurales, il permet une dissémination topologique des 2D-MolGraph afin d'extraire des motifs et des modèles récurrents, particulièrement utiles pour caractériser les structures d'interface, les réseaux de liaisons hydrogène, et les sphères de solvatation.

</div>

<h3 class="mb-1">Tutoriel</h3>

{{< link-card title="Contenu à venir" description="<i>Apprenez à utiliser cette image de conteneur</i>" href="#bottom" icon="tabler-icons/outline/package" disabled="true">}}

<h3 class="mb-1 mt-3">Documentation GaTewAY</h3>

{{< card-grid >}}
{{< link-card title="Contenu à venir" description="<i>Site officiel</i>" href="#bottom" target="_blank" icon="tabler-icons/outline/world-www" class="mb-0" >}}
{{< link-card title="Contenu à venir" description="<i>Documentation officielle</i>" href="#bottom" target="_blank" icon="tabler-icons/outline/book" class="mb-0" >}}
{{< /card-grid >}}

<h3 class="mb-1 mt-3">Exemples</h3>

{{< link-card title="Téléchargez des fichiers d'entrée" href="/downloads/gateway-examples.tar.gz" icon="tabler-icons/outline/file-export" class="mb-0" >}}
