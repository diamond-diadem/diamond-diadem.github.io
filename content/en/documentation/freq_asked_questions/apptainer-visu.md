---
title: Launching a visualisation container without superuser rights
linkTitle: Launching a visualisation container without superuser rights
toc: false
weight: 1
---

<div align="justify">

If you do not have superuser rights on your machine, you may have problems authorising graphical feedback from view containers. To solve this problem, you can use the `xhost` command (to add a hostname to the list of machines that are allowed to connect to X) via the :

```bash
ssh +SI:localhost:<username> # to connect to the Dahu cluster, for example
```

> Once you have finished using the container, we recommend that you restore your session to its original behaviour using the command `xhost -SI:localhost:<username>`.

</div>