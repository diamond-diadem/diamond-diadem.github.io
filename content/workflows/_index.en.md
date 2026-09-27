---
title: Workflows
linkTitle: Home
aliases:
  - /workflows/home/
  - /workflows/start-here/home/
toc: false
sidebar_sort: title
description: "Introduction to workflow managers for materials science: automating calculations, ensuring data traceability and managing code execution on DIAMOND."
---

Your calculation crashed at 8 p.m. on Friday. You found out at 9 a.m. on Monday. Sixty hours of computing time, gone.

Now picture the same scenario with a workflow: the crash is detected, the calculation restarts from where it stopped, the results are filed away, and either it has finished or the next step is already running when you get to your desk.

That is the difference between babysitting your simulations and letting them work for you.

## So what is a workflow?

A **workflow** is the list of steps your calculation goes through, written down so a computer can carry them out for you: launch a program, wait for it to finish, save the results, restart it if it stopped early, and pass the output on to the next step. There are many workflow managers under active development, and the one proposed by our project is [AiiDA]({{% ref "documentation/by-container/aiida" %}}).

No more copying files by hand. No more notebooks full of "which run was this again?". No more restarting jobs one by one.

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}
The tools that run workflows, called **workflow managers**, go even further: they spread the work across several remote machines and keep a complete record of how every result was produced — exactly what you need when a reviewer asks you to prove it.
{{< /callout >}}

## What you get out of it

- **Your time back**: file transfers, restarts and every other repetitive chore happen on their own. You focus on the science.
- **Fewer mistakes**: errors hide in repetitive manual steps. Automate those steps and the errors go with them.
- **Results you can trace**: every input, output and intermediate step is recorded, so anyone can retrace how a result was obtained, even years later.
- **Ten runs or a thousand, same effort**: scale up without adding a single manual step.

## Start in minutes

The workflows below are already set up and ready to use on the platform. Pick the one closest to your research. Missing the one you need? [Tell us]({{% ref "contact" %}}) and we will look into adding it.
