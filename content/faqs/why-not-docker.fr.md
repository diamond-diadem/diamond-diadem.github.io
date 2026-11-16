---
title: Docker est également une solution de conteneurisation, pourquoi ne pas simplement utiliser Docker ?
weight: 80
---

Docker est principalement conçu pour l’exécution de services web et d’autres
applications à longue durée de vie. Les conteneurs sont lancés par un démon
Docker à l’échelle du système, qui n’est pas intégré aux planificateurs de
tâches HPC tels que SLURM ou OAR. Par conséquent, un conteneur Docker peut ne
pas respecter les limites de CPU, de mémoire, de GPU ou de temps attribuées à
la tâche d’un utilisateur, et il peut s’avérer difficile de l’utiliser de
manière optimale dans un environnement informatique partagé.

Apptainer est conçu pour une utilisation scientifique et dans le domaine du
calcul haute performance (HPC). Les conteneurs sont lancés directement dans le
cadre du processus de l’utilisateur ; ils peuvent donc être exécutés au sein
d’une tâche SLURM ou OAR et respectent naturellement les ressources allouées
par le planificateur. Apptainer est ainsi mieux adapté aux calculs
scientifiques reproductibles sur des clusters.
