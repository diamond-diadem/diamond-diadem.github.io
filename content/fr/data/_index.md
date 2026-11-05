---
title: "Base de données"
description: "Architecture, injection de données, consultation et création d'une base de données DIAMOND"
weight: 10
toc: true
---

<div align="justify">

La recherche en science des matériaux produit des ensembles de données 
volumineux et variés : descriptions d'échantillons, de machines et de 
procédés, mesures, images, résultats de simulation... Pour être réutilisables, 
ces données doivent être stockées de manière organisée, reliées à leur 
contexte, et faciles à retrouver et à télécharger.

Le projet DIAMOND met à disposition une **plateforme de données** qui sert de 
socle à l'ingénierie des données pour la recherche : elle permet aux projets 
de déposer, structurer, retrouver et analyser des données hétérogènes 
(expériences et simulations, fichiers bruts et données saisies manuellement) 
sans nécessiter d'expertise en bases de données. 
Cette page explique comment utiliser cette plateforme pour déposer vos données 
et concevoir une base de données adaptée à votre projet DIADEM.
 

## Ce que vous trouverez sur cette page
 
1. [Architecture de la plateforme de données](#1-architecture-de-la-plateforme-de-données)
2. [Injection de données dans la plateforme de données](#2-injection-de-données-dans-la-plateforme-de-données)
3. [Consultation de la base de données](#3-consultation-de-la-base-de-données)
4. [Création de votre base de données](#4-création-de-votre-base-de-données)
5. [Contacts](#5-contacts)
---
 

## 1. Architecture de la plateforme de données
 
Pour répondre aux besoins du **projet DIAMOND** et du **PEPR DIADEM**, 
une architecture logicielle commune a été proposée à l'ensemble des 
partenaires. Cette architecture se divise en trois parties distinctes :

- **Injection :** cette partie représente les moyens mis à disposition pour 
ingérer des données issues de sources variées dans l'infrastructure de données.
- **Gestion & Traitement :** cette partie regroupe tous les modules 
conçus pour stocker les données brutes et en extraire des HRD (*Human-Readable 
Data*, données lisibles par l'humain). Les données brutes sont stockées dans 
le Data Lake, un espace de stockage dédié à ce type de données, tandis que 
les HRD extraites des données brutes sont stockées dans la base de données. 
La base de données contient également des liens vers les fichiers stockés 
dans le Data Lake.
- **Consultation :** cette partie représente les différents moyens mis à 
disposition pour accéder aux données de la base de données, les filtrer et, le 
cas échéant, les visualiser.

<p align="center">
<img alt="Architecture de la base de données" src="/images/data/DIAMOND_DM_Architecture.png" />
</p>
<p align="center"><i>Architecture de la base de données</i></p>

---

## 2. Injection de données dans la plateforme de données

*(En construction)*

---

## 3. Consultation de la base de données

*(En construction)*

---

## 4. Création de votre base de données

Cette section explique ce que vous devez préparer, et comment nous travaillons 
ensemble, pour obtenir **votre propre base de données** hébergée sur la 
plateforme DIAMOND-DM.

### 4.1 Les bases

Nos bases de données reposent sur **[MongoDB](https://www.mongodb.com/)**, une base de données **[NoSQL](https://fr.wikipedia.org/wiki/NoSQL)**. 
Concrètement, cela signifie que :

- Les données ne sont **pas stockées dans des tables rigides** (lignes et 
colonnes) comme dans les bases de données SQL.
- Les données sont stockées sous forme de **documents** flexibles (semblables 
à des objets JSON), regroupés en **collections**.
- Un document peut contenir des informations de natures très différentes : 
texte, nombres, listes, liens vers d'autres documents, liens vers des 
fichiers, etc.

Cette flexibilité nous permet d'adapter la base de données à vos propres 
données (échantillons, machines, expériences, caractérisations, ...). Deux 
notions clés sont utilisées tout au long du processus :

| Terme          | Signification                                                                                                          | En savoir plus                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Collection** | Un groupe de documents apparentés. À peu près équivalent à une « table » en SQL (p. ex. `MACHINE`, `SPECIMEN`).        | [Manuel MongoDB : Collections](https://www.mongodb.com/docs/manual/core/databases-and-collections/)           |
| **Attribut**   | Une propriété d'un document (un *champ* dans la terminologie MongoDB), p. ex. `Manufacturer` ou `Porosity Rate`.       | [Manuel MongoDB : Documents et champs](https://www.mongodb.com/docs/manual/core/document/)                    |

> L'architecture générale est décrite dans la 
> [Section 1](#1-architecture-de-la-plateforme-de-données). 

### 4.2 Comment nous travaillons ensemble


1. **Premier contact : une réunion en visioconférence.** Nous nous rencontrons 
en ligne pour comprendre votre projet, vos données et les besoins de votre 
base de données (qui l'utilisera, ce qui sera recherché, quels fichiers sont 
concernés, etc.).
2. **Vous préparez les éléments** décrits ci-dessous : un *modèle de données*, 
*quelques exemples de données* et, si nécessaire, un *algorithme d'extraction*.
3. **Nous construisons et déployons la base de données** à partir de vos 
éléments, puis nous la validons avec vous.

<p align="center">
<img alt="Itération avec l'utilisateur" src="/images/data/User_DB_iteration.jpeg" />
</p>
<p align="center"><i>Itération avec l'utilisateur</i></p>


### 4.3 Ce que vous devez fournir


| # | Élément                                                              | Obligatoire ?                                        | Description                                                                                                                                  |
|---|----------------------------------------------------------------------|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | [**Modèle de données**](#44-le-modèle-de-données)                    | Oui                                                  | Un fichier Excel suivant un <a href="/downloads/DB_Model_by_Project.xlsx">modèle spécifique</a> décrivant la « forme » de votre base de données. |
| 2 | [**Fichiers d'exemple**](#45-fichiers-déposés-exemples-de-données)   | Oui                                                  | Un ensemble de fichiers typiques que les utilisateurs déposeront.                                                                            |
| 3 | [**Algorithme d'extraction**](#46-algorithme-dextraction-etl)        | Uniquement si certains attributs sont extraits de fichiers | Un script montrant comment lire les fichiers déposés et calculer/extraire les données pertinentes.                                     |

---

### 4.4 Le modèle de données

Le modèle de données définit **ce qui sera stocké** dans la base de données et 
la façon dont les éléments sont reliés entre eux. Il doit être rédigé dans un 
**fichier modèle Excel** spécifique dans lequel vous définissez :

- les **collections**,
- les **attributs** de chaque collection, avec leur **type** et d'autres 
propriétés,
- les **relations** entre les collections,
- les attributs qui sont **extraits automatiquement** des fichiers déposés.

Vous pouvez télécharger ce modèle ici : <a href="/downloads/DB_Model_by_Project.xlsx">Modèle de données (Excel)</a>.
 
Ce fichier inclut également l'**exemple commenté** décrit ci-dessous, afin que 
vous puissiez voir comment chaque colonne est utilisée.
 
Jetez-y un œil avant notre première réunion, et remplissez-le après notre 
discussion. Renvoyez-le-nous ensuite pour relecture. 

#### Exemple

Le modèle contient un exemple complet et commenté (ici pour une base de 
données de fabrication additive). **Ouvrez le fichier `.xlsx` et suivez les 
explications qu'il contient** : chaque **ligne** décrit **un attribut** d'**une 
collection**, et l'exemple montre comment remplir chaque colonne.
 
Les collections de cet exemple (`BUILD`, `MACHINE`, `MATERIAL BATCH`, 
`SPECIFICATION`, `COMPUTER AIDED MANUFACTURING`, `COMPUTER AIDED DESIGN`, 
`PLATE`, `SPECIMEN`, `CHARACTERIZATION`) sont reliées entre elles comme suit :
 
<p align="center">
<img alt="Relations entre les collections de l'exemple" src="/images/data/datamodel_diagram_example.png" />
</p>
<p align="center"><i>Relations entre les collections de l'exemple</i></p>

 

#### Colonnes du fichier Excel

| Colonne              | Que renseigner                                                                                                                                                                                          |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Collection**       | Nom de la collection à laquelle appartient l'attribut.                                                                                                                                                  |
| **Attribute**        | Nom de l'attribut (propriété) au sein de la collection. À utiliser comme information sur laquelle les utilisateurs pourront ensuite filtrer lors de la recherche dans la base de données.                |
| **Capacity**         | Nombre maximal estimé d'éléments associés à l'attribut (`1` pour une valeur unique, un nombre plus grand (ou `n` si ce nombre est inconnu) si l'attribut contient une liste).                           |
| **Type**             | Type de données de l'attribut (voir [types disponibles](#valeurs-disponibles)).                                                                                                                         |
| **Required**         | `true` si l'attribut doit être renseigné lors du dépôt, `false` sinon.                                                                                                                                  |
| **Unit**             | Unité facultative de l'attribut (p. ex. `mm`, `W`, `%`).                                                                                                                                                |
| **Extension**        | Pour les attributs de type `file` : liste des extensions de fichier acceptées (p. ex. `pdf; docx; txt`).                                                                                                |
| **Related to**       | Nom de la **collection** à laquelle l'attribut fait référence (voir [Relations](#relations-related-to)).                                                                                                |
| **Extracted from**   | Nom de l'attribut `file`/`image` à partir duquel la valeur est extraite automatiquement (voir [Attributs extraits](#attributs-extraits-extracted-from)).                                                |
| **ConstraintType**   | Type de contrainte appliquée aux valeurs (voir [contraintes](#contraintes)).                                                                                                                            |
| **ConstraintValues** | Bornes ou ensemble de valeurs autorisées pour la contrainte.                                                                                                                                            |
| **Description**      | Description libre de l'attribut.                                                                                                                                                                        |

#### Valeurs disponibles

| Types disponibles | Booléens   | Types de contrainte | Cardinalité   |
|-------------------|------------|---------------------|---------------|
| `boolean`         | `true`     | `<=`                | `one`         |
| `datetime`        | `false`    | `>=`                | `list`        |
| `dict`            |            | `<`                 |               |
| `email`           |            | `>`                 |               |
| `enum`            |            | `[ ]`               |               |
| `file`            |            | `[ [`               |               |
| `float`           |            | `] ]`               |               |
| `image`           |            | `] [`               |               |
| `int`             |            | `in`                |               |
| `long`            |            |                     |               |
| `reference`       |            |                     |               |
| `str`             |            |                     |               |
| `url`             |            |                     |               |

#### Relations (*Related to*)

La colonne **Related to** définit les **liens entre collections** 
(similaires à des clés étrangères / pointeurs).

- Elle pointe toujours vers une **collection**, jamais vers un attribut 
individuel.
- Si l'attribut est de type `reference`, **Related to doit être renseigné** et 
doit contenir le nom de la collection cible.
- Si l'attribut est une `str` servant d'identifiant d'un document d'une autre 
collection (ou de la même collection, p. ex. un lien hiérarchique comme 
`Parent Specimen` dans `SPECIMEN`), renseignez également la collection visée.

*Exemple : l'attribut `Machine` de `BUILD` est de type `reference` et est 
relié à `MACHINE`.*

#### Attributs extraits (*Extracted from*)

Certaines valeurs ne doivent **pas** être saisies par les utilisateurs, car 
elles peuvent être lues ou calculées à partir d'un fichier déposé. Elles sont 
décrites par la colonne **Extracted from**.

- Elle relie un attribut à un attribut source de type `file` ou `image` 
(p. ex. un fichier `.csv`, `.xy`, `.jpg`, `.raw`).
- Lorsque **Extracted from** est renseigné, l'utilisateur ne fournit **pas** la 
valeur : elle est extraite ou calculée automatiquement par le **pipeline ETL** 
(Extract, Transform, Load) à partir de la source indiquée 
(voir [4.6](#46-algorithme-dextraction-etl)).
- Cela évite que les utilisateurs saisissent des valeurs qui peuvent être 
recalculées, et garantit l'intégrité et la traçabilité des données.

*Exemple : `Porosity Rate` dans `CHARACTERIZATION` est extrait de 
`CHARACTERIZATION/X-ray CT-scan` ; `Laser Power` dans `MACHINE` est extrait 
de `MACHINE/Machine Specifications`.*

#### Contraintes

Les contraintes (**ConstraintType** + **ConstraintValues**) restreignent les 
valeurs acceptées pour un attribut.

- Elles s'appliquent **uniquement aux attributs à valeurs numériques réelles 
(`int`, `float`, ...) ou aux énumérations (`enum`)**.
- **Ne mettez pas** de contraintes sur les attributs `file` ou `reference`.
- Les bornes numériques doivent être écrites comme des 
**nombres réels, sans guillemets** (p. ex. `(0; 100)`, et non 
`("0"; "100")`).
- Notation des intervalles : `[ ]` intervalle fermé, `] [` intervalle ouvert, 
`[ [` et `] ]` intervalles semi-ouverts.
- `in` sert à indiquer une liste de valeurs autorisées (p. ex. 
`("Wire"; "Powder")`).

| Exemple                            | Type de contrainte | Valeurs            | Signification                                     |
|------------------------------------|--------------------|--------------------|---------------------------------------------------|
| `MACHINE / Process`                | `in`               | `("WAAM"; "LPBF")` | Seules ces deux valeurs sont acceptées.           |
| `MACHINE / Laser Power`            | `[ ]`              | `(100; 10000)`     | Valeur comprise entre 100 et 10000 (incluses).    |
| `BUILD / Number of specimens`      | `>`                | `0`                | Nombre strictement positif.                       |
| `CHARACTERIZATION / Porosity Rate` | `[ ]`              | `(0; 100)`         | Pourcentage compris entre 0 et 100.               |

> **Astuce :** pour une propriété vrai/faux, utilisez le type `boolean` sans 
> contrainte. N'utilisez pas les valeurs `0`/`1` avec un booléen.

---

### 4.5 Fichiers déposés (exemples de données)

Les utilisateurs qui injectent des données dans la base de données **déposeront 
des fichiers** (cahiers des charges, données machine, modèles 3D, images de 
tomographie, ...). Ces fichiers sont stockés dans le **data lake** et peuvent 
être **téléchargés par les utilisateurs qui consultent la base de données**. 
Les attributs de type `file` ou `image` de votre modèle de données sont ceux 
qui reçoivent ces dépôts.

Vous pouvez nous envoyer autant de fichiers que vous le souhaitez pour 
alimenter la base de données lors de sa création, mais **nous avons besoin d'au 
moins quelques fichiers d'exemple typiques** pour chaque type de fichier qui 
sera déposé. Ils nous permettent de tester et de valider la base de données et 
l'algorithme d'extraction.

Exemples typiques (issus de l'exemple de fabrication additive) :

| Attribut associé           | Nom de fichier d'exemple |
|----------------------------|--------------------------|
| Machine Specifications     | `wlam_machine.pdf`       |
| Certificate                | `certificat_316L.pdf`    |
| Bill of specifications     | `cahier_des_charges.pdf` |
| Manufacturing Instructions | `plateau.gcode`          |
| Model                      | `cube.stp`               |
| X-ray CT-scan              | `tomography.raw`         |

---

### 4.6 Algorithme d'extraction (ETL)

Si certains attributs sont **extraits de fichiers déposés** (colonne 
*Extracted from*), nous avons besoin d'un **algorithme** montrant comment :

1. **lire** le fichier déposé, et
2. **extraire ou calculer** les propriétés qui doivent être stockées dans la 
base de données.

Il s'agit généralement d'un court script (p. ex. en **Python**) qui prend un 
fichier en entrée et renvoie les valeurs des attributs. Les fichiers bruts 
restent disponibles au téléchargement, tandis que les valeurs extraites sont 
stockées dans la base de données et peuvent servir à **rechercher et filtrer** 
les données.

*Exemple : un script qui ouvre le fichier déposé dans `Machine Specifications` 
(p. ex. `wlam_machine.pdf`), trouve le fabricant, le modèle et la puissance 
laser maximale, et les renvoie comme valeurs des attributs `Manufacturer`, 
`Model` et `Laser Power` de la collection `MACHINE`. L'utilisateur dépose 
uniquement le fichier ; les trois valeurs sont renseignées automatiquement.*
 
La même logique s'applique aux valeurs stockées dans les métadonnées des 
fichiers (p. ex. dates, réglages d'instruments, dimensions d'images) ou 
calculées à partir du contenu du fichier.

Si votre modèle de données ne comporte aucun attribut `Extracted from`, vous 
n'avez pas besoin de cette étape.

---

### 4.7 Liste de contrôle

Avant notre première réunion, il est utile d'avoir réfléchi à :

- Quel type de données sera stocké, et qui utilisera la base de données ?
- Quelles collections et quels attributs sont nécessaires ?
- Quels attributs sont des fichiers, et quelles valeurs pourraient en être extraites ?
- Quelques fichiers d'exemple typiques.
- Le cas échéant, un script qui lit ces fichiers et en extrait des propriétés.

---

## 5. Contacts

Vous pouvez nous contacter via le formulaire général : **[Formulaire de contact](https://diamond-diadem.github.io/fr/contact/)**.
 
Vous pouvez également joindre directement les personnes en charge de la gestion 
des données, de l'accès à la base de données, du modèle de données et des 
ontologies :
 
| Sujet                                          | Contact                         |
|------------------------------------------------|---------------------------------|
| **Coordination**                               | thierry.deutsch@cea.fr          |
| **Développement de la plateforme de base de données** | imanol.setoain@cea.fr    |
| **Ontologies**                                 | cinthya.herreracontreras@cea.fr |


</div>
