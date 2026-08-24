---
title: How to use Zeo++ Apptainer image?
linkTitle: Zeo++ tutorial
weight: 1
description: "Tutorial on using the DIAMOND Zeo++ Apptainer container: pulling the image and usage examples for pore diameters computation."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **zeoplusplus.sif** image [available here](/en/codes/scientific-computing/zeo++/)
- Have downloaded the **input files** [available here](/downloads/zeo++-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a Zeo++ input file is available in the form of an archive via [this link](/downloads/zeo++-tutorial-inputs.tar.gz). The file, named `EDI.cssr`, corresponds to a CSSR example file for EDI zeolite.

In this tutorial, we will assume that the input file contained in this archive is in the current directory. To extract it:

```bash
tar -xzf zeo++-tutorial-inputs.tar.gz
```

## Detailed usage for the Zeo++ container

This section explains how to use the Zeo++ image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

Zeo++ is an open-source software designed for the analysis and characterization of porous materials. The main executable in the image is the `network` executable. This example is adapted from Zeo++ [official documentation](https://www.zeoplusplus.org/examples.html).  

The following command computes diameters of the largest included sphere, free sphere and included sphere along free sphere path using the Zeo++ container image:

```shell
apptainer exec network -ha -res EDI.cssr
```

The results are automatically written in a `EDI.res` output file. It should contain three values, one for each diameter, as well as the name of the output file `EDI.res`. 

The [documentation](https://www.zeoplusplus.org/examples.html) this tutorial has been extracted from contains many more examples exhibiting the features of the software. The command presented above can be easily adapted to run these examples.

</div>
