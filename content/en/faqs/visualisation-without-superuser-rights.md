---
title: How to run a visualisation container without superuser rights?
weight: 60
---

If you do not have superuser rights on your machine, you may have problems
authorising graphical feedback from visualisation containers. To solve this
problem, use the `xhost` command, which adds a hostname to the list of
machines allowed to connect to X:

```bash
xhost +SI:localhost:<username>
```

Once you have finished using the container, we recommend that you restore your
session to its original behaviour with `xhost -SI:localhost:<username>`.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
So far, this problem has only been reported on sessions based on `wayland`,
so the proposed solution could only be tested in this case. If you meet this
problem under other conditions, or the solution above does not work for you,
please [report it]({{% ref "/contact" %}}).
{{< /callout >}}
