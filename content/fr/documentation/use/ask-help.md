---
title: Comment demander de l'aide ou donner un feedback  ?
weight: 6
---

{{< callout context="note" title="" icon="outline/info-circle" >}}

En préalable de ces explications, il est nécessaire d'avoir créé un compte sur la plateforme [Gricad gitlab](https://gricad-gitlab.univ-grenoble-alpes.fr/). Cela vous permettra de créer des tickets et de pouvoir y répondre.

Ce tutoriel explicite les différentes démarches à effectuer pour rapporter un bug, demander une nouvelle fonctionnalité dans les conteneurs/paquets existants, demander un nouveau code/workflow ou donner un feedback sur la documentation.

{{< /callout >}}

## Préambule

<style>
 /* Three image containers (use 25% for four, and 50% for two, etc) */
.column {
  float: left;
  width: 50%;
  padding: 5px;
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>

 <div class="row">
  <div class="column">
    <img alt="use gitlab" class="use-gitlab" style="width:90%">
  </div>
  <div class="column" align="justify">

Si vous rencontrez un problème relatif à l'utilisation des outils de la plateforme ou si vous avez une requête particulière, alors vous avez la possibilité de communiquer avec les ingénieurs de la plateforme à travers ce [lien](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond).

Nous avons choisi ce moyen de communication car les retours utilisateurs, ainsi que les échanges qui en découlent sont gardés dans le temps et donc consultables à n'importe quel moment.

En pratique, vous pouvez accéder aux onglets "Issues" et "Merge requests" sur n'importe quel dépôt du projet. Nous ne détaillerons que le premier onglet ici.

  </div>
</div>

<div align="justify">

## Consulter les tickets existants

Avant n'importe quelle demande, nous vous recommandons de jeter un œil aux tickets *ouverts* et *résolus*. Votre problème ou requête a peut être déjà été traité ou rapporté par un autre utilisateur.

Pour ce faire, vous n'avez qu'à consulter l'onglet "All" et à utiliser la barre de recherche en renseignant les mots clés relatifs à votre requête.

<img alt="issue tab" class="issue-tab" style="width:100%">

## Créer un ticket

Si vous ne trouvez rien qui vous intéresse dans les tickets ouverts et résolus, alors vous pouvez en créer un. Dans un premier temps, il faut que vous sélectionniez le projet auquel votre requête fait référence. En cliquant sur "Créer un ticket", vous serez à une page similaire à celle ci-dessous.

<img alt="create issue" class="create-issue" style="width:100%">

Nous vous demandons :
- de **n'assigner aucune** personne au ticket,
- de **ne sélectionner aucune** date d'échéance,
- de **ne sélectionner aucun** jalon.

En revanche, nous vous demandons de sélectionner un **modèle** et un **label** correspondant au type de requête que vous avez.

### Rapporter un bug

Pour rapporter un bug ou demander de l'aide quant à l'utilisation des outils de la plateforme, vous devez sélectionner le template `bug_report` dans la rubrique "Description".

Ensuite, nous vous demandons de donner le maximum de détails concernant votre problème :
- Quel code/workflow cela concerne-t-il ?
- Quel est le comportement attendu ?
- Quel est le comportement réel ? (n'hésitez pas à donner des logs ou captures d'écran)
- Quelles sont les étapes à effectuer pour reproduire ce problème ?
- Sur quel environnement travaillez-vous ? (OS, version d'Apptainer, conteneur utilisé, commit de Guix, ...)

### Demander une nouvelle fonctionnalité dans les conteneurs/workflows existants

Vous pouvez demander une nouvelle fonctionnalité dans un conteneur/workflow existant. Vous devez alors sélectionner le template `feature_request` dans la rubrique "Description".

Ensuite, nous vous demandons de donner le maximum de détails concernant votre requête :
- Quel code/workflow cela concerne-t-il ?
- Quelle est la fonctionnalité que vous souhaitez ?
- Qu'allez-vous pouvoir faire avec cette fonctionnalité ?

### Demander un nouveau code/workflow

Vous pouvez également faire une demande de conteneurisation ou empaquetage de code/workflow. Vous devez alors sélectionner le template `code_container_request` dans la rubrique "Description".

Ensuite, nous vous demandons de donner le maximum de détails concernant votre requête :
- Quel code/workflow voulez-vous ?
- Quelles sont les dépendances ?
- Quelles fonctionnalités voulez-vous ?
- Le code/workflow est-il libre de droit ?

### Donner un feedback sur la documentation

Enfin, vous avez la possibilité de donner un feedback sur la documentation du projet DIAMOND. Ce feedback peut aussi bien être positif que négatif. Vous devez alors sélectionner le template `doc_feedback` dans la rubrique "Description".

Ensuite, nous vous demandons d'être le plus exhaustif ou exhaustive possible concernant le feedback en donnant des exemples et en précisant la section de la documentation à laquelle votre feedback fait référence.

</div>
