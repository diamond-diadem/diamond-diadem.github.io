---
title: About Apptainer
linkTitle: Apptainer
---

<h2 class="about-lead text-center">Apptainer (formerly Singularity) is a container creation and management solution geared towards high-performance computing. By offering containers that package both a software tool and all necessary external dependencies for its application, it ensures their portability and reproducibility.</h2>

<style>
* {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
}

/* .left {
  width: 25%;
}

.right {
  width: 75%;
} */

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<div class="row">
<div class="column left-about-apptainer-en">
  <img alt="Apptainer" class="logo-apptainer apptainer-logo-about"/>
</div>
<div class="column right-about-apptainer-en">
<div align="justify">

Apptainer is a free and open-source software that facilitates the deployment of digital tools through containerization. The general idea is to include code or an application along with all dependencies (software environment, external libraries, etc.) necessary for its execution within an object called a container, autonomous and independent of the machine on which it is run. The main advantage of containers lies in their relative lightweight nature: they do not virtualize an entire operating system (which can be heavy), but only the essential elements for execution, delegating to the host machine's kernel (whatever it may be) the responsibility of communicating with its operating system and hardware.

In a sense, Apptainer is an alternative to Docker software. Whereas Docker is increasingly popular in the development and maintenance of containerized web-oriented and service-oriented applications, Apptainer offers a very interesting counterpoint for high-performance computing, with a strong emphasis on portability and result reproducibility.

</div>
</div>

<div align="justify">
This way of working has great benefits for both those who use the code and those who develop it. By packaging everything needed to run an application in a single, immutable, easily portable file, it's very easy to distribute any tool without the need for cumbersome installations or library incompatibilities. The latter is particularly interesting from the point of view of reproducibility: because a container is immutable, we can be sure that the same application will run in exactly the same way over time and on different machines. In other words, you no longer have to worry that the slightest change (change of machine or cluster, updating of libraries, etc.) will affect the smooth running of your codes.
</div>
</div>
