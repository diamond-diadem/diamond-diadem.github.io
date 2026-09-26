---
title: How to run a visualisation container on HPC frontends?
weight: 70
---

You can start a visualisation container (Ovito, for example) on the HPC
frontends. To do this, first connect to the frontends with `X11 forwarding`:

```bash
ssh -X dahu.ciment # to connect to the Dahu cluster, for example
```

Next, mount the `$HOME` folder to get access to the `.Xauthority` file, which
stores the session authentication cookies. This lets you set the `$DISPLAY`
environment variable without getting an error when using the container.

You then get graphical feedback from the Ovito Apptainer image with:

```bash
apptainer run --contain --bind $HOME --cleanenv --env DISPLAY=$DISPLAY ovito.sif
```

{{< callout context="caution" title="" icon="tabler-icons/outline/alert-triangle" >}}
Avoid running heavy processes on cluster frontends. Some clusters have
services that kill every process running for more than a few minutes, as on
the `dahu` and `bigfoot` frontends.
{{< /callout >}}
