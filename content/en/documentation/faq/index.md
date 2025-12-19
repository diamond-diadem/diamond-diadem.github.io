---
title: Frequently Asked Questions
linkTitle: Frequently Asked Questions
toc: true
weight: 10
---

<div align="justify">

### Does DIAMOND provide computational resources?

In short, no. The DIAMOND project focuses on supporting the partners of the PEPR DIADEM by providing containerized codes, scientific workflows (AiiDA), and AI expertise. However, it does not offer access to computational resources.

### How to run a visualization container without superuser rights?

If you do not have superuser rights on your machine, you may have problems authorising graphical feedback from view containers. To solve this problem, you can use the `xhost` command (to add a hostname to the list of machines that are allowed to connect to X) via the :

```bash
xhost +SI:localhost:<username> # to connect to the Dahu cluster, for example
```

Once you have finished using the container, we recommend that you restore your session to its original behaviour using the command `xhost -SI:localhost:<username>`.

**Note**

> At the moment, this problem has only been reported for sessions based on `wayland`. Consequently, the proposed solution could only be tested in this particular case. If you encounter this problem under other conditions and/or the above solution does not work for you, please [report it](/en/documentation/use/ask-help/).

### How to run a visualization container on HPC frontends?

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

> It is not advisable to run heavy processes on the front-ends of clusters. On some clusters there are services that kill all processes that run for more than **X** minutes. This is particularly the case for the `dahu` and `bigfoot` front-ends.

</div>
