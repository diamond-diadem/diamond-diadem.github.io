---
title: How to use PtyRAD Apptainer image?
linkTitle: PtyRAD tutorial
weight: 4
description: "Tutorial on using the DIAMOND PtyRAD Apptainer container: pulling the image, running calculations, and usage examples for ptychographic reconstruction."
---

<div align="justify">

{{< callout context="note" title="Prerequisites" icon="tabler-icons/outline/info-circle" >}}

- Have **Apptainer** installed [(installation guide)](/en/documentation/install/install-apptainer/)
- Have downloaded the **ptyrad.sif** image [available here](/en/codes/scientific-computing/ptyrad/)

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/) or refer to [this tutorial](/en/documentation/use/apptainer-image/) to have a quick look at Apptainer's main commands.

{{< /callout >}}

## Quick Start

PtyRAD comes with a start kit which contains examples and templates. The template project can be created use:

```bash
apptainer run ptyrad.sif init
```

or simply

```bash
ptyrad.sif init
```

This well create a subfolder called `ptyrad` in the current working directory. Then, you can switch to the project folder usingn cd and use following command to download the demo data to run the ptychographic reconstruction:

```bash
cd ptyrad
python ./scripts/download_demo_data.py
```

After the data is downloaded and unzipped, there are two method to launch the reconstruction:

* Interactive Jupyter interface
  Run the `ptyrad/notebooks/run_ptyrad.ipynb` in a editor that support Jupyter notebook (e.g., Visual Studio Code), or using the following command:

  ```bash
  apptainter exec ptyrad.sif jupyter notebook ./notebooks/run_ptyrad.ipynb # Or direcly open it in VS code
  ```

* Command-line interface (non-interactive reconstruction)

  ```bash
  apptainer run ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  # equivalent to
  # ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  ```



## Detailed usage for the PtyRAD container

This section includes other ways to use the PtyRAD container. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Run with GPU

PtyRAD supports running with GPU. To let the container aware of the GPU on the host machine, you need to run the container with some special flags. For Nvidia GPU, you need to run the container with `--nv` flag:

```bash
apptainer run --nv ptyrad.sif <other-arguments>
# or
# apptainer exec --nv ptyrad.sif <command-and-argments>
```

To run it with AMD GPUs that support ROCm, you need to add `--rocm`,

```bash
apptainer run --rocm ptyrad.sif <other-arguments>
# or
# apptainer exec --rocm ptyrad.sif <command-and-argments>
```

### Multi-GPU acceleration

You can also use enable multi-GPU acceleration if more than one GPU are avalable. To do this, you need to launch the container with `accelerate` command using `apptainer --exec`:

```bash
apptainer exec ptyrad.sif accelerate launch --multi_gpu --num_processes=2 -m ptyrad run "${PARAMS_PATH}" --gpuid acc 2>&1
```

You may need to add `--nv` and/or `--rocm` depending on what types of GPUs that you have.

## To go futher

The official PtyRAD website includes several tutorials on how to use PtyRAD for ptychographic reconstruction. You may find it [here](https://ptyrad.readthedocs.io/en/latest/resources.html#tutorials-educational-materials). To go deep to under stand how PtyRAD works, go to [its documentation](https://ptyrad.readthedocs.io/en/latest/index.html).
