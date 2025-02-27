---
title: Launching a visualisation container on HPC head nodes
linkTitle: Launching a visualisation container on HPC head nodes
toc: false
weight: 2
---

<div align="justify">

It is possible to start a visualisation container (e.g. Ovito) on the HPC front-ends. To do this, you must first connect to the front-ends via `X11 forwarding` using the command :

```bash
ssh -X dahu.ciment # to connect to the Dahu cluster, for example
```

Next, you need to mount the `$HOME` folder to get access to the `.Xauthority` file (which stores the session authentication cookies). This will allow you to set the `$DISPLAY` environment variable without getting an error when using the container.

You can then get graphical feedback for the Ovito Apptainer image using the command :

```bash
apptainer run --contain --bind $HOME --cleanenv --env DISPLAY=$DISPLAY ovito.sif
``` 

**Caution** 
>
> It is not advisable to run heavy processes on the front-ends of clusters. On some clusters there are services that kill all processes that run for more than **X** minutes. This is particularly the case for the `dahu` and `bigfoot` front-ends.

</div>
