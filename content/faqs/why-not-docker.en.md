---
title: Docker is also a containerization solution, why don't we just use Docker?
weight: 80
---

Docker is mainly designed for running web services and other long-lived
applications. Containers are started by a system-wide Docker daemon, which is
not integrated with HPC job schedulers such as SLURM or OAR. As a result, a
Docker container may not follow the CPU, memory, GPU, or time limits assigned
to a user’s job, and it can be difficult to use it cleanly in a shared
computing environment.

Apptainer is designed for scientific and HPC use. Containers are launched
directly as part of the user’s process, so they can be run inside a SLURM or
OAR job and naturally respect the resources allocated by the scheduler. This
makes Apptainer better suited for reproducible scientific calculations on
clusters.
