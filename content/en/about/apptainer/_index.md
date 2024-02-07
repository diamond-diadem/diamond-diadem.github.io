---
title: About Apptainer
linkTitle: Apptainer
---

<h2 class="about-lead text-center">Apptainer (formerly Singularity) is a container creation and management solution geared towards high-performance computing. By offering containers that package both a software tool and all necessary external dependencies for its application, it ensures their portability and reproducibility.</h2>

<br/>

<style>
* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<div class="row">
<div class="column left">
<img class="logo-apptainer" width=100%/>
</div>
<div class="column right">
<div align="justify">

Apptainer is a free and open-source software that facilitates the deployment of digital tools through containerization. The general idea is to include code or an application along with all dependencies (software environment, external libraries, etc.) necessary for its execution within an object called a container, autonomous and independent of the machine on which it is run. The main advantage of containers lies in their relative lightweight nature: they do not virtualize an entire operating system (which can be heavy), but only the essential elements for execution, delegating to the host machine's kernel (whatever it may be) the responsibility of communicating with its operating system and hardware.

In a sense, Apptainer is an alternative to Docker software. Whereas Docker is increasingly popular in the development and maintenance of containerized web-oriented and service-oriented applications, Apptainer offers a very interesting counterpoint for high-performance computing, with a strong emphasis on portability and result reproducibility.

This mode of operation presents a major advantage for both users of the codes and those who develop them. By packaging everything required to run an application within a single immutable and easily transferable file, it is very easy to distribute any tool, bypassing tedious installations and library incompatibilities. This latter point is particularly interesting from the perspective of reproducibility: since a container is immutable, one can be assured that the same application will function identically over time and on other machines. In other words, there is no longer a need to fear that any modification (such as changing machines or computing clusters, updating libraries, etc.) will affect the proper functioning of your codes.

</div>
</div>
</div>
