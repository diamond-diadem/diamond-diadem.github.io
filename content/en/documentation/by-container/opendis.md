---
title: How to use OpenDis Apptainer image?
linkTitle: OpenDis tutorial
weight: 1
description: "Tutorial on using the DIAMOND OpenDis Apptainer container: pulling the image, running calculations, and usage examples for dislocation dynamics computations."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **opendis.sif** image [available here](/en/codes/scientific-computing/opendis/)
- Have downloaded the **input files** [available here](/downloads/opendis-tutorial-inputs.tar.gz)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}


## Input files

To illustrate the various commands, a set of OpenDis input files is available in the form of an archive via [this link](/downloads/opendis-tutorial-inputs.tar.gz). Those files correspond to a tutorial example from the OpenDis [official documentation](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/index.html). The archive contains two Python scripts describing the same simulation for OpenDis using two different modules, a sequential one (PyDis) and a multi-threaded one (ExaDis):

- `test_frank_read_src_pydis.py`,
- `test_frank_read_src_exadis.py`.

In this tutorial, we will assume that the input files contained in this archive are in the current directory. To extract them:

```bash
tar -xzf opendis-tutorial-inputs.tar.gz
```

## Quickstart

For impatient folks, here is how to launch a multi-threaded OpenDis computation on in the case where the current directory contains the `opendis.sif` container image and all necessary OpenDis input files:

```bash
apptainer exec opendis.sif python3 test_frank_read_src_exadis.py
```

## Detailed usage for the OpenDis container

This section presents different ways to use the OpenDis image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Introduction

OpenDis is a parallelized open-source software designed to simulate and analyze dislocations in crystalline materials at the mesoscale. The code license can be accessed from outside the container as follows:

```bash
opendis_path=$(apptainer exec opendis.sif ls /gnu/store | grep opendis)
license_path=$(apptainer exec opendis.sif find /gnu/store/$opendis_path/share -name "LICENSE")
apptainer exec opendis.sif cat $license_path
```

The current tutorial corresponds to the *Frank-Read Source* tutorial from OpenDis [official documentation](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/index.html). The Python scripts contained in the input archive can also be found in the *examples/02_frank_read_src* directory of the software [GitHub repository](https://github.com/OpenDiS/OpenDiS/tree/main/examples/02_frank_read_src).

### Simulation description

As described in the tutorial, the initial configuration is a rectangular dislocation loop where all sides are of pure edge type and where all the four corner nodes are pinned. The top arm contains a node that is free to move, which allows it to bow out and act as a Frank-Read source. Periodic boundary conditions are prescribed in all three directions.

### Running the simulation with the PyDis module

This first section corresponds to the first part of the [tutorial](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) titled *Frank-Read Source by Pure Python*. The following command runs a simulation with the PyDis module in sequential:

```shell
apptainer exec opendis.sif python3 -i test_frank_read_src_pydis.py
```

If this command is successful, a matplotlib window should with an animation of the simulation should automatically open. The [official tutorial](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) shows what this animation should look like. 

The `-i` option in the command above stands for *interactive*. If this flag is provided, a Python shell will open at the end of the simulation to allow users to interact with the simulation variables. For example, the following command displays all nodes in the dislocation network:

```python
G.all_nodes_tags()
```

The following command examines the information of a node:

```python
G.nodes((0,0)).view()
```

The [tutorial](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) page presents a few other ways to interact with simulation data from the interactive Python shell.

To exit the shell, simply execute `exit()` in the shell or use `Ctrl+D` keys.

### Running the simulation with the ExaDis module

This second section corresponds to the second part of the [tutorial](https://opendis.github.io/OpenDiS/tutorials/frank_read_src/frank_read_src_by_python.html) titled *Frank-Read Source by Python calling ExaDiS*. It uses the ExaDis module to run the same simulation faster, using the multi-threading OpenMP library. The tutorial specifies that ExaDis should be compiled using OpenMP, which is the case in the current container image.

The following command executes the Frank-Read source simulation with ExaDis:

```shell
apptainer exec opendis.sif python3 -i test_frank_read_src_exadis.py
```

The displayed animation should be the same as previously, and the simulation should be faster. Again, the `-i` option triggers an interactive Python shell at the end of the simulation. The data stored in object `G` can be accessed after this manipulation in the interactive shell:

```python
from pydis import DisNet
G1 = net.get_disnet(DisNet)
```

The new `G1` object can then be interacted with exactly as previously.

### To go further

OpenDis [official documentation](https://opendis.github.io/OpenDiS/tutorials/index.html) contains multiple tutorials presenting the features of the software. The associated Python input scripts can be found in the [code repository](https://github.com/OpenDiS/OpenDiS/tree/main/examples) *examples/* directory. The commands presented in this tutorial can be easily extrapolated to run those examples with the OpenDis image container.

</div>
