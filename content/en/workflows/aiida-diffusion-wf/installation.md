---
title: Installation of aiida-diffusion-wf
linkTitle: Installation
toc: false
---

### Development mode

In the current stage, the package is not ready as a aiida plugin, otr pip package, and can only be installed by source :

```bash
git clone https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/aiida-diffusion-wf.git
cd aiida-diffusion-wf
```

Create a python environment with `python=3.11` (recommended), activate and install the dependencies in editable mode :

```bash
pip install -r requirements.txt
pip install -e .
```

#### Download the executable for LAMMPS

In principle, we could use any official executables for LAMMPS provided in the official channel. However, for the sake of reproductivity, we recommend the user to download a a containerized version of LAMMPS through the following command :

```bash
apptainer pull lammps-2Apr2025_serial.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/lammps_serial.sif:test
```

#### Setup Aiida

This workflow use the Aiida engine, which allows to submit calculations in remote HPC clusters. For simplicity of installation, we recommend to use the containerized version of `aiida-core`. This can be done following [this tutorial](https://diamond-diadem.github.io/documentation/by-container/aiida/) in the DIAMOND website.

You have to follow all these steps in order to be able to run the workflows provided here :

1. Setup a Aiida profile
2. Setup a computer and configure it.
3. Setup a code and configure it.

Hopefully, this is only done once.

Some examples of configuration files are given [in this repository](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/aiida-diffusion-wf/-/tree/main/config_yml?ref_type=heads) for **computers** (to manage scheduler in remote machine and transfer protocols) and **codes** (to manage the execution of a containerized version of LAMMPS in the remote machine).

For example, one can work with the `aiida_raspa.sif` image found in DIAMOND website.

#### Example : Run a single RAW calculation with pre-defined parameters

In this example, the **material is pre-defined** by providing the location of the CIF file containing 3D coordinates : `examples/structures/0000[Ag][sra]3[ASR]1`. The gas adsorbate is a monoatomic gas, the **krypton** (set by `atom_symbol`). The workflow automatically searchs for Lennard-Jones parameters in UFF forcefield in `src/uff_non_bonded.py`.

##### Tutorial

1. Create a working directory in which the workflow script will be saved:

```bash
mkdir workdir_examples && cd workdir_examples
cp $PACKAGE_DIR/examples/workflows/run_raw_diffusion_Kr.py ./
```

Note that the environment variable `$PACKAGE_DIR` should be defined as the root path to the cloned package.

2. Create an instance of the aiida-core image

```bash
apptainer instance start \
        --containall \
        --bind $PWD:$PWD \
        -B ~/.aiida:/.aiida \
        -B ~/.aiida/.ssh:$HOME/.ssh \
        -B ~/.aiida/postgres_run:/var/run/postgresql \
        -B ~/.aiida/rabbitmq/var/lib/rabbitmq:/var/lib/rabbitmq \
        -B ~/.aiida/rabbitmq/var/log:/var/log/rabbitmq \
        ~/apptainer-images/aiida_raspa.sif aiida
```

> Note : You may need to adapt the paths of your aiida configuration (to link the aiida database). The `aiida-core` program is already contained in `aiida_raspa.sif` image.

3. Run an instance to have access to aiida commands and predefined codes and computers

```bash
apptainer shell instance://aiida
```

4. Activate the conda or python environment

```bash
source $PACKAGE_DIR/aiida-diffusion-wf/bin/activate
```

One need to adapt the path depending on where the python environment have been created. Note that this path must be accessible inside the aiida container, it can be useful to properly create the instance in the previous step in a appropriate location and using `--bind $PWD:$PWD` to acces to the python environment.

> Note : in a future implementation, we will package the whole workflow in a single apptainer image (instead of using `aiida_raspa`, so that the libraries can be directly imported inside the container.

5. Set the code name and the computer name in the workflow
   You will need to change manually these variables `profile_name`, `code_name`, `project_name`in the python script file :

```bash
nano-tiny run_raw_diffusion_Kr.py
```

6. Run the workflow

```bash
python run_raw_diffusion_Kr.py
```

One need to change these lines at the end of the pthon script if we want to directly run the workflow (for testing in local computer) or if we want to submit the calculation ot a remote HPC compute :

```python
# For local scheduler, the following line should be uncommented
#results, node = engine.run_get_node(builder)

# For remote scheduler, the following line should be uncommented
node = engine.submit(builder)
```

To see the current state of the calculation, one can use the following commands :

```bash
verdi process list # all running processes
verdi process list -a # all processes
```

##### Visualize the MD trajectory

As the simulations use a rigid framework, one may want to recover the total trajectory with all atoms (host + adsorbate).

1. First dump the data repository

```bash
verdi node show <pk_process> # identify the pk of the retrieved node
verdi node  repo dump <pk_retrieved_node> repo_dump
cd repo_dump
```

2. Concatenate the adsorbate trajectory with the rigid framework

```bash
python  $PACKAGE_DIR/src/aiida_diffusion_wf/merge_data_traj.py
```

A extended XYZ file containing the trajectory of all atoms and the cell information is generated and can be further opened by Ovito.

3. Visualization with Ovito

<p align="center">
<img alt="diffusion ovito gif" class="diffusion-kr-ovito" style="width:100%">
</p>
<p align="center"><i>A few steps of Krypton diffusion in 0000[Ag][sra]3[ASR]1 MOF</i></p>
