---
title: About Guix
linkTitle: Guix
---

<div align="justify">

## About Packages

A type of archive containing a computer program (in source or executable form) along with metadata. They are essential for easily installing applications on a machine through a package manager.

### What are the benefits?

* Using packages facilitates the installation of computer programs, libraries, or utilities.
* For users, this choice automates the management of the software environment on a machine, allowing them to focus on using the installed tool.
* For developers, this choice simplifies the distribution of the tools they produce.

### The chosen solution for DIAMOND

Many package managers exist: some, like `apt` or `rpm`, are specific to certain operating systems, while others, like `pip`, are specific to programming languages. It is also common to use several simultaneously, choosing which tool to use based on the context because it offers a wide range of solutions, another for security reasons as it is better maintained, etc.

In the context of the DIAMOND project, which imposes stringent requirements related to scientific reproducibility and high-performance computing, we have chosen the [GNU Guix](https://guix.gnu.org) package manager for the following reasons:

</div>
<style>
* {
  box-sizing: border-box;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<div class="row">
<div class="column left-about-guix-fr">

<a href="https://guix.gnu.org" target="_blank"><img alt="Guix" class="logo-guix guix-logo-about"/></a>

</div>
<div class="column right-about-guix-fr" align="justify">

* It can be used on any Linux distribution (essential in the academic field and on scientific computing centers), without competing with other installed managers.
* It is built to meet the requirements of scientific reproducibility, ensuring bit-by-bit executable integrity.
* It simplifies the management of different library versions, which is often encountered when two tools each require a specific version of a given library.
* It is an open-source tool, primarily developed within the French academic community.

</div>
</div>

In summary, using packages via the GNU Guix manager facilitates the distribution of replicable codes and tools suitable for high-performance computing.