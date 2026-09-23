---
title: How to use PtyRAD Apptainer image
linkTitle: PtyRAD tutorial
weight: 4
description: "Tutorial on the DIAMOND PtyRAD Apptainer container: pulling the image, running calculations and examples for ptychographic reconstruction."
---

{{< callout title="Prerequisites" >}}

- Apptainer (see either [our installation guide]({{% ref "/documentation/install/install-apptainer" %}}) or [the official documentation](https://apptainer.org/docs/user/latest/quick_start.html#installation))
- The [`ptyrad.sif` image]({{% ref "/codes/scientific-computing/ptyrad" %}})

{{< /callout >}}

For more information on Apptainer containers and their use, we provide [a description of Apptainer]({{% ref "/about/apptainer" %}}), a crash course on [how to use Apptainer]({{% ref "/documentation/use/apptainer-image" %}}), and of course there's also the [official Apptainer's documentation](https://apptainer.org/docs/user/latest/).

## Quick Start

PtyRAD comes with a starter kit which contains examples and templates. The template project can be created using:

```bash
apptainer run ptyrad.sif init
```

or simply

```bash
ptyrad.sif init
```

This will create a subfolder called `ptyrad` in the current working directory. Then, you can switch to the project folder using `cd` and use the following command to download the demo data to run the ptychographic reconstruction:

```bash
cd ptyrad
python ./scripts/download_demo_data.py
```

After the data is downloaded and unzipped, there are two methods to launch the reconstruction:

First, using the interactive Jupyter interface. Run the `ptyrad/notebooks/run_ptyrad.ipynb` in an editor which supports Jupyter notebook (e.g., Visual Studio Code), or using the following command:

  ```bash
  apptainer exec ptyrad.sif jupyter notebook ./notebooks/run_ptyrad.ipynb # Or directly open it in VS Code
  ```

Second, using the command-line interface (non-interactive reconstruction)

  ```bash
  apptainer run ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  # equivalent to
  # ptyrad.sif run "params/examples/tBL_WSe2.yaml"
  ```

## Detailed usage for the PtyRAD container

This section includes other ways to use the PtyRAD container. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer--crash-course).

### Run with GPU

PtyRAD supports running with GPU. To make the container aware of the GPU on the host machine, you need to run the container with some special flags. For Nvidia GPU, you need to run the container with the `--nv` flag:

```bash
apptainer run --nv ptyrad.sif <other-arguments>
# or
# apptainer exec --nv ptyrad.sif <command-and-arguments>
```

To run it with AMD GPUs that support ROCm, you need to add `--rocm`:

```bash
apptainer run --rocm ptyrad.sif <other-arguments>
# or
# apptainer exec --rocm ptyrad.sif <command-and-arguments>
```

### Multi-GPU acceleration

You can also enable multi-GPU acceleration if more than one GPU is available. To do this, you need to launch the container with the `accelerate` command using `apptainer exec`:

```bash
apptainer exec ptyrad.sif accelerate launch --multi_gpu --num_processes=2 -m ptyrad run "${PARAMS_PATH}" --gpuid acc 2>&1
```

You may need to add `--nv` and/or `--rocm` depending on what types of GPUs you have.

## To go further

The official PtyRAD website includes several [tutorials on how to use PtyRAD for ptychographic reconstruction](https://ptyrad.readthedocs.io/en/latest/resources.html#tutorials-educational-materials). To understand how PtyRAD works in depth, check out [its documentation](https://ptyrad.readthedocs.io/en/latest/index.html).
