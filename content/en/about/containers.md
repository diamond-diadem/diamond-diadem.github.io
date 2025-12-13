---
title: About Containers
linkTitle: Containers
seo:
  description: Scientific containers powering DIAMOND with portable HPC environments,
    reproducible simulations, and Apptainer-based workflows.
---

<h2 class="about-lead text-center">Lightweight, isolated environments that contain all the tools needed to run applications. They have become essential in the field of computing due to their flexibility and efficiency.</h2>

<div align="justify">

### What is a container?

- A container is a self-contained execution unit that encapsulates an application, as well as external libraries and other dependencies necessary for its execution.
- It provides an isolated environment, ensuring that embedded applications function identically regardless of the host on which they are deployed.
- It is a lightweight object, as it only includes what is necessary for its execution. It does not burden itself with a complete operating system, and the container communicates directly with the host machine's kernel to access hardware resources.

### What are the benefits?

- **Portability:** containers encapsulate everything an application needs to run, ensuring that its execution is identical regardless of the operating system. This characteristic facilitates portability between development, testing, and production environments.
- **Isolation:** each container is isolated from others and from the host, avoiding conflicts between dependencies and ensuring the security of the application.
- **Reproducibility:** by essence, a container is a self-sufficient and immutable object. It runs identically on the software environment of a desktop machine or a computing grid, and always operates the same over time, regardless of updates or changes in the host's library versions.
- **Scalability and reversibility:** the lightweight and easy deployment of containers simplifies the implementation of updates and patches by creating new containers. At the same time, it is just as easy to revert to a previous version in case of issues, ensuring stability in the deployment and integration process.
- **Resource management:** containers share the host's operating system kernel, making them lighter than virtual machines that require more system resources.

In summary, containers offer a powerful solution for application deployment, improving the flexibility, reproducibility, portability, and efficiency of development and deployment processes.

</div>

<style>
 /* Three image containers (use 25% for four, and 50% for two, etc) */
.column {
  float: left;
  /* width: 50%; */
  /* padding: 5px 5px; */
}

/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}
</style>

 <div class="row">
  <div class="column left-about-containers">
    <img alt="Cluster map" class="cluster-map en">
  </div>
  <div class="column right-about-containers" align="justify">

In practice, you can choose the technical solution you want to use locally on your machine. For the DIAMOND project, we recommend using both [Apptainer](/about/apptainer/) and [Guix](/about/guix/). On the other hand, for clusters or data centres, the solution depends on what's available. Almost half of the French mesocentres and national data centres have a container system available as a standard command (enabling the use of containers). It should be noted, however, that the other half offers the possibility of loading a container system via the `module load` command (and thus of using containers). On the other hand, the use of Guix is limited to less than 30% of all French computing centres. It's worth noting that the [MESONET](https://www.mesonet.fr/) project, which aims to pool HPC computing resources across the country, has deployed a solution for using containers on its prototyping cluster. Although not all of the project's clusters are available yet, it is highly likely that they will all feature a container system.

  </div>
</div>
