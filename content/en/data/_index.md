---
title: "Database"
description: "Architecture, data injection, consultation and creation of a DIAMOND database"
weight: 10
toc: true
---

<div align="justify">

Research in materials science produces large and varied sets of data: 
descriptions of samples, machines and processes, measurements, images, 
simulation outputs... To be reusable, this data has to be stored in an 
organized way, linked to its context, and easy to find and download.

The DIAMOND Project provides a **data platform** that serves as a foundation 
for data engineering in research: it enables projects to upload, structure, 
retrieve, and analyze heterogeneous data (experiments and simulations, 
raw files, and manually entered data) without requiring database expertise. 
This page explains how to use this data platform to upload your data and 
design a database tailored to your DIADEM project.
 

## What you will find on this page
 
1. [Architecture of the data platform](#1-architecture-of-the-data-platform)
2. [Injecting data in the data platform](#2-injecting-data-in-the-data-platform)
3. [Consulting the database](#3-consulting-the-database)
4. [Creating your database](#4-creating-your-database)
5. [Contacts](#5-contacts)
---
 

## 1. Architecture of the data platform
 
To meet the requirements of the **DIAMOND Project** and the **PEPR DIADEM**, 
a common software architecture has been proposed for all partners. This 
architecture is divided into three distinct sections:

- **Injection:** this section represents the means provided to ingest data 
from various sources into the data infrastructure.
- **Management & Processing:** this section encompasses all modules 
designed to store raw data and extract HRD (Human-Readable Data) from it. 
Raw data is stored in the Data Lake, a dedicated storage area for this type 
of data, while any HRD extracted from the raw data is stored in the database. 
The database also contains links to files stored in the Data Lake.
- **Consultation:** this section represents the various means provided to 
access, filter, and, where applicable, visualize the data available in the 
database.

<p align="center">
<img alt="Database architecture" src="/images/data/DIAMOND_DM_Architecture.png" />
</p>
<p align="center"><i>Database architecture</i></p>

---

## 2. Injecting data in the data platform

*(In construction)*

---

## 3. Consulting the database

*(In construction)*

---

## 4. Creating your database

This section explains what you need to prepare, and how we work together, 
to get **your own database** hosted on the DIAMOND-DM platform.

### 4.1 The basics

Our data is stored in a [NoSQL](https://fr.wikipedia.org/wiki/NoSQL) database.

In practice, this means:

- Data is **not stored in rigid tables** (rows and columns) as in SQL 
databases.
- Data is stored as flexible **documents** (similar to JSON objects), 
grouped in **collections**.
- A document can contain very different kinds of information: text, numbers, 
lists, links to other documents, links to files, etc.

This flexibility is what lets us adapt the database to your own data (samples, 
machines, experiments, characterizations, ...). Two key notions are used 
throughout the process:

| Term       | Meaning                                                                                            | Learn more                                                                         |
|------------|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Collection | A group of related documents. Roughly equivalent to a "table" in SQL (e.g. `MACHINE`, `SPECIMEN`). | [Collections](https://www.mongodb.com/docs/manual/core/databases-and-collections/) |
| Attribute  | A property of a document (a field), e.g. `Manufacturer` or `Porosity Rate`.                        | [Documents and fields](https://www.mongodb.com/docs/manual/core/document/)         |

> The overall architecture is described in 
> [Section 1](#1-architecture-of-the-database). 

### 4.2 How we work together


1. **First contact: a virtual meeting.** We meet online to understand your 
project, your data and the needs of your database (who will use it, what 
will be searched, which files are involved, etc.).
2. **You prepare the inputs** described below: a *data model*, 
*some example data* and, if needed, an *extraction algorithm*.
3. **We build and deploy the database** from your inputs, then validate it 
with you.

<p align="center">
<img alt="User iteration" src="/images/data/User_DB_iteration.jpeg" />
</p>
<p align="center"><i>User iteration</i></p>


### 4.3 What you need to provide


| # | Input                                                     | Mandatory?                                       | Description                                                                                                                            |
|---|-----------------------------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| 1 | [**Data model**](#44-the-data-model)                      | Yes                                              | An Excel file following a <a href="/downloads/DB_Model_by_Project.xlsx">specific template</a> describing the "shape" of your database. |
| 2 | [**Example data files**](#45-uploaded-files-example-data) | Yes                                              | A set of typical files that users will upload.                                                                                         |
| 3 | [**Extraction algorithm**](#46-extraction-algorithm-elt)  | Only if some attributes are extracted from files | A script showing how to read uploaded files and compute/extract relevant data.                                                         |

---

### 4.4 The data model

The data model defines **what will be stored** in the database and how the 
pieces relate to each other. It has to be written in a specific 
**Excel template file** in which you define:

- the **collections**,
- the **attributes** of each collection, with their **type** and other 
properties,
- the **relationships** between collections,
- which attributes are **extracted automatically** from uploaded files.

You can download this template just here: <a href="/downloads/DB_Model_by_Project.xlsx">Data Model Template (Excel)</a>.

 
This file also includes the **explained example** described below, so 
you can see how each column is used.
 
Have a look before our first meeting, and fill it after our discussion. 
Then, send it back to us for review. 

#### Example

The template contains a complete, explained example (here for an 
additive-manufacturing database). **Open the `.xlsx` file and follow the 
explanations it contains**: each **row** describes **one attribute** of 
**one collection**, and the example shows how to fill in every column.
 
The collections of this example (`BUILD`, `MACHINE`, `MATERIAL BATCH`, 
`SPECIFICATION`, `COMPUTER AIDED MANUFACTURING`, `COMPUTER AIDED DESIGN`, 
`PLATE`, `SPECIMEN`, `CHARACTERIZATION`) are linked together as follows:
 
<p align="center">
<img alt="Relationships between the collections of the example" src="/images/data/datamodel_diagram_example.png" />
</p>
<p align="center"><i>Relationships between the collections of the example</i></p>

 

#### Columns of the Excel file

| Column               | What to write                                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Collection**       | Name of the collection the attribute belongs to.                                                                                                                                 |
| **Attribute**        | Name of the attribute (property) within the collection. Use it as information that users can later filter on when searching the database.                                        |
| **Capacity**         | Estimated maximum number of elements associated with the attribute (`1` for a single value, a larger number (or `n` when this number is unknown) if the attribute holds a list). |
| **Type**             | Data type of the attribute (see [available types](#available-values)).                                                                                                           |
| **Required**         | `true` if the attribute must be filled in at upload, `false` otherwise.                                                                                                          |
| **Unit**             | Optional unit of the attribute (e.g. `mm`, `W`, `%`).                                                                                                                            |
| **Extension**        | For attributes of type `file`: list of accepted file extensions (e.g. `pdf; docx; txt`).                                                                                         |
| **Related to**       | Name of the **collection** the attribute refers to (see [Relationships](#relationships-related-to)).                                                                             |
| **Extracted from**   | Name of the `file`/`image` attribute from which the value is automatically extracted (see [Extracted attributes](#extracted-attributes-extracted-from)).                         |
| **ConstraintType**   | Type of constraint applied to the values (see [constraints](#constraints)).                                                                                                      |
| **ConstraintValues** | Bounds or set of allowed values for the constraint.                                                                                                                              |
| **Description**      | Free-text description of the attribute.                                                                                                                                          |

#### Available values

| Available types   | Booleans   | Constraint types   | Cardinality   |
|-------------------|------------|--------------------|---------------|
| `boolean`         | `true`     | `<=`               | `one`         |
| `datetime`        | `false`    | `>=`               | `list`        |
| `dict`            |            | `<`                |               |
| `email`           |            | `>`                |               |
| `enum`            |            | `[ ]`              |               |
| `file`            |            | `[ [`              |               |
| `float`           |            | `] ]`              |               |
| `image`           |            | `] [`              |               |
| `int`             |            | `in`               |               |
| `long`            |            |                    |               |
| `reference`       |            |                    |               |
| `str`             |            |                    |               |
| `url`             |            |                    |               |

#### Relationships (*Related to*)

The **Related to** column defines the **links between collections** 
(similar to foreign keys / pointers).

- It always points to a **collection**, never to an individual attribute.
- If the attribute has type `reference`, **Related to must be filled** and 
it must contain the target collection name.
- If the attribute is a `str` acting as an identifier of a document in 
another collection (or in the same collection, e.g. a hierarchical link 
like `Parent Specimen` in `SPECIMEN`), also fill in the targeted collection.

*Example: the attribute `Machine` of `BUILD` has type `reference` and is 
related to `MACHINE`.*

#### Extracted attributes (*Extracted from*)

Some values should **not** be typed in by users, because they can be read or 
computed from an uploaded file. These are described with the 
**Extracted from** column.

- It links an attribute to a source attribute of type `file` or `image` 
(e.g. a `.csv`, `.xy`, `.jpg`, `.raw` file).
- When **Extracted from** is filled in, the user does **not** provide the 
value: it is extracted or calculated automatically by the **ETL pipeline** 
(Extract, Transform, Load) from the specified source 
(see [4.6](#46-extraction-algorithm-etl)).
- This avoids users entering values that can be recomputed, and guarantees 
data integrity and traceability.

*Example: `Porosity Rate` in `CHARACTERIZATION` is extracted from 
`CHARACTERIZATION/X-ray CT-scan`; `Laser Power` in `MACHINE` is extracted 
from `MACHINE/Machine Specifications`.*

#### Constraints

Constraints (**ConstraintType** + **ConstraintValues**) restrict the values 
accepted for an attribute.

- They apply **only to attributes with real numerical values 
(`int`, `float`, ...) or enumerations (`enum`)**.
- **Do not** put constraints on `file` attributes or on `reference` attributes.
- Numerical bounds must be written as 
**real numbers, without quotation marks** (e.g. `(0; 100)`, not 
`("0"; "100")`).
- Interval notation: `[ ]` closed interval, `] [` open interval, `[ [` and 
`] ]` half-open intervals.
- `in` is used for a list of allowed values (e.g. `("Wire"; "Powder")`).

| Example                            | Constraint type   | Values             | Meaning                                 |
|------------------------------------|-------------------|--------------------|-----------------------------------------|
| `MACHINE / Process`                | `in`              | `("WAAM"; "LPBF")` | Only these two values are accepted.     |
| `MACHINE / Laser Power`            | `[ ]`             | `(100; 10000)`     | Value between 100 and 10000 (included). |
| `BUILD / Number of specimens`      | `>`               | `0`                | Strictly positive number.               |
| `CHARACTERIZATION / Porosity Rate` | `[ ]`             | `(0; 100)`         | Percentage between 0 and 100.           |

> **Tip:** for a true/false property, use the `boolean` type without constraint. Do not use `0`/`1` values with a boolean.

---

### 4.5 Uploaded files (example data)

Users who inject data into the database will **upload files** (specifications, 
machine data, 3D models, tomography images, ...). These files are stored in 
the **data lake** and can be 
**downloaded by the users who consult the database**. 
Attributes of type `file` or `image` in your data model are the ones that 
receive these uploads.

You can send us as many files as you want to populate the database at 
creation time, but **we need at least a couple of typical example files** 
for each kind of file that will be uploaded. They allow us to test and 
validate the database and the extraction algorithm.

Typical examples (from the additive-manufacturing example):

| Associated attribute       | Example file name        |
|----------------------------|--------------------------|
| Machine Specifications     | `wlam_machine.pdf`       |
| Certificate                | `certificat_316L.pdf`    |
| Bill of specifications     | `cahier_des_charges.pdf` |
| Manufacturing Instructions | `plateau.gcode`          |
| Model                      | `cube.stp`               |
| X-ray CT-scan              | `tomography.raw`         |

---

### 4.6 Extraction algorithm (ETL)

If some attributes are **extracted from uploaded files** (column 
*Extracted from*), we need an **algorithm** showing how to:

1. **read** the uploaded file, and
2. **extract or compute** the properties that must be stored in the database.

This is typically a short script (e.g. in **Python**) that takes a file as 
input and returns the values of the attributes. The raw files remain available 
for download, while the extracted values are stored in the database and can 
be used to **search and filter** the data.

*Example: a script that opens the file uploaded in `Machine Specifications` 
(e.g. `wlam_machine.pdf`), finds the manufacturer, the model and the maximum 
laser power, and returns them as the values of the attributes `Manufacturer`, 
`Model` and `Laser Power` of the `MACHINE` collection. The user only uploads 
the file; the three values are filled in automatically.*
 
The same logic applies to values stored in file metadata (e.g. dates, 
instrument settings, image dimensions) or computed from the file content.

If your data model has no `Extracted from` attributes, you do not need this 
step.

---

### 4.7 Checklist

Before our first meeting, it helps to have thought about:

- What kind of data will be stored, and who will use the database?
- Which collections and attributes are needed?
- Which attributes are files, and which values could be extracted from them?
- A few typical example files.
- If relevant, a script that reads those files and extracts properties.

---

## 5. Contacts

You can contact us through the general form: **[Contact form](https://diamond-diadem.github.io/en/contact/)**.
 
You can also reach directly the person in charge of data management, 
access to the database, the data model and the ontologies:
 
| Topic                                    | Contact                         |
|------------------------------------------|---------------------------------|
| **Coordination**                         | thierry.deutsch@cea.fr          |
| **Development of the database platform** | imanol.setoain@cea.fr           |
| **Ontologies**                           | cinthya.herreracontreras@cea.fr |


</div>
