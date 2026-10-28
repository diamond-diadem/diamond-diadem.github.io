---
title: n2p2 Workflow Installation
linkTitle: Installation
toc: false
description: "Installation guide for the AiiDA-n2p2 workflow for training machine learning interatomic potentials on the DIAMOND platform with AiiDA and Apptainer."
---

## aiida-n2p2

AiiDA plugin for the [n2p2](https://github.com/CompPhysVienna/n2p2) neural-network potential package.

**Current version:** 0.4.0

The current version is a **research prototype that can be installed from source**. It is not presented here as a standalone plugin published on PyPI. The repository hosting the workflow is currently private, but access can be requested through our [support form]({{% ref "contact" %}}).


## Features

- **CalcJobs:** `nnp-scaling`, `nnp-train`, `nnp-predict`
- **WorkChains:** scaling, training (manual + automatic restart), LAMMPS validation, full pipeline (`MakeNNPWorkchain`)
- **Data types:** `N2p2Dataset`, `N2p2Parameters` (structured `input.data` / `input.nn`)
- **Training restart (v0.4.0):** automatic relaunch when walltime stops training before target `epochs`; merged learning curves across segments
- **HPC / OAR:** parsers recover outputs from the remote folder when retrieve is premature (Dahu)

## Prerequisites

`pip install -e .` installs the plugin and its Python dependencies (`aiida-core`, `aiida-lammps`, `numpy`) into the environment that is already active. It does not create that environment, an AiiDA profile, or the external executables.

Before the install commands:

- Python 3.10 or newer. With `pip`, activate a virtual environment first (conda or venv). `poetry install` creates its own virtualenv.
- PostgreSQL and RabbitMQ running.
- An AiiDA profile, created with `verdi quicksetup` or `verdi setup`, so that `verdi` already works.
- The n2p2 executables `nnp-scaling`, `nnp-train`, and `nnp-predict` installed on the computer where the calculations run.
- LAMMPS, when the optional validation step is used.

## Installation

```
git clone <repo-url> aiida-n2p2
cd aiida-n2p2
pip install -e .          # or: poetry install
verdi daemon restart
```

If entry points are missing after install, remove stale metadata in the repo:

```
rm -rf aiida_n2p2.egg-info
pip install -e .
```

Register AiiDA codes (examples for localhost are in `oar-scheduler-main/*_localhost.yml` sibling repo).Installation

```shell
pip install aiida-n2p2
verdi quicksetup  # better to set up a new profile
verdi plugin list aiida.calculations  # should now show your calculation plugins
```

## Usage

Here goes a complete example of how to submit a test calculation using this plugin.

A quick demo of how to submit a calculation:

```shell
verdi daemon start     # make sure the daemon is running
cd examples
```

You can have access to two examples both in local and super computer.

### Tree of n2p2 aiida plugin

```
aiida-n2p2/
├── pyproject.toml
├── poetry.lock
├── README.md
├── CHANGELOG.md
├── LICENSE
├── docs/
│   └── n2p2_workflow_section.tex
├── aiida_n2p2/
│   ├── __init__.py
│   ├── calculations/
│   │   ├── scaling.py          # nnpScaling
│   │   ├── train.py            # nnpTraining
│   │   └── predict.py          # nnpPredict
│   ├── parsers/
│   │   ├── scaling.py          # nnpScaleParser
│   │   ├── train.py            # nnpTrainParser
│   │   └── predict.py          # nnpPredictParser
│   ├── data/
│   │   ├── dataset.py          # N2p2Dataset
│   │   └── parameters.py       # N2p2Parameters
│   ├── workflows/
│   │   ├── common.py           # CalcJobMetadataWorkChainMixin
│   │   ├── prepare_inputs.py   # N2p2PrepareInputsWorkChain
│   │   ├── scale.py            # N2p2ScaleWorkChain
│   │   ├── train.py            # N2p2TrainWorkChain
│   │   ├── validate_lammps.py  # N2p2LammpsValidationWorkChain
│   │   └── make_potential.py   # MakeNNPWorkchain
│   └── utils/
│       ├── input_nn.py
│       ├── learning_curve.py
│       ├── plot_learning_curve.py
│       ├── remote_outputs.py
│       └── training_state.py
├── tests/
│   ├── conftest.py
│   ├── fixtures/al/
│   ├── test_inputs.py
│   ├── test_input_nn.py
│   ├── test_parsers.py
│   ├── test_train_parser_logic.py
│   ├── test_learning_curve_utils.py
│   ├── test_training_state.py
│   ├── test_restart.py
│   ├── test_workflow.py
│   └── test_reference_manifest.py
└── examples/
    ├── README.md
    ├── basic.ipynb
    ├── 1.Al/
    ├── 1.Boron/
    ├── 2.HPC/          # wkchain_Al.py
    └── 3.Restart/      # automatic and manual restart 

```



### Run in local

Go to 1.Al folder and run the jupter notebook `AiidA-n2p2_demo.ipynb`

### Run on the HPC

Before submitting your calculation on the supercomputer be sure that your have made a set up for your local computer with a scheduler to menage your calculation on the super computer.
This set up is very dependent from which supercomputer you will submit your calculation. Below a typical setup on [GRICAD](https://gricad-doc.univ-grenoble-alpes.fr/hpc/connexion/) that using OAR scheduler.

## 1. Install the OAR Scheduler Plugin, specific case for gricad hpc.

Navigate to [https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler), download the folder, and unzip it. Then, from within the main `oar-scheduler` directory, run the following commands:

```bash
cd oar-scheduler
pip install .
verdi plugin list aiida.schedulers
```

The output should confirm that the new scheduler plugin has been successfully registered:

```console
$ verdi plugin list aiida.schedulers
Registered entry points for aiida.schedulers:
* core.direct
* core.lsf
* core.pbspro
* core.sge
* core.slurm
* core.torque
* oarscheduler
```



## 2. Set up the Computer

Now, set up the AiiDA computer using a YAML configuration file. Create a file named `gricad_dahu.yml` with the following content:

```yaml
---
label: dahu
description: "YAML file to set up the dahu cluster on AiiDA"
hostname: "dahu.ciment"
transport: "core.ssh"
scheduler: "oarscheduler"
work_dir: path_user_name
mpirun_command: ""
mpiprocs_per_machine: 32
prepend_text: ""
```

Make sure the `work_dir` path is correct for your account (you will get this location once your perseus account will be opened [PERSEUS](https://gricad-doc.univ-grenoble-alpes.fr/services/perseus-ng/account/)), and then run the setup command:

```bash
verdi computer setup --config path/to/gricad_dahu.yml
```

You will be prompted to provide some configuration details. You can accept the defaults by pressing Enter.

```console
$ verdi computer setup --config yml_files/computers/setup/gricad_dahu.yml
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
Shebang line (first line of each script, starting with #!) [#!/bin/bash]:
Default amount of memory per machine (kB).: 192000000
Escape CLI arguments in double quotes [y/N]:
Success: Computer<2> dahu created
Report: Note: before the computer can be used, it has to be configured with the command:
Report:   verdi -p presto computer configure core.ssh dahu
```



## 3. Configure the SSH Connection

Next, configure the SSH transport for the computer you just created. You can provide the configuration non-interactively via another YAML file (`ssh.yml`).

```bash
verdi -p presto computer configure core.ssh --config path/to/ssh.yml dahu
```

The command will prompt you to confirm the settings. You can accept the defaults if they are correct for your environment.

```console
$ verdi -p presto computer configure core.ssh --config yml_files/computers/config/ssh.yml dahu
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
User name [piazzai]:
Port number [22]:
Connection timeout in s [60]:
Allow ssh agent [Y/n]:
SSH proxy jump []:
SSH proxy command [ssh -q piazzai@access-gricad.univ-grenoble-alpes.fr "nc -w 60 `basename dahu.ciment .ciment` 22"]:
Compress file transfers [Y/n]:
GSS auth [False]:
GSS kex [False]:
GSS deleg_creds [False]:
GSS host [dahu.ciment]:
Load system host keys [Y/n]:
Key policy (RejectPolicy, WarningPolicy, AutoAddPolicy) [RejectPolicy]:
Use login shell when executing command [Y/n]:
Report: Configuring computer dahu for user aiida@localhost.
Success: dahu successfully configured for aiida@localhost
```



## 4. Set up the Codes

Finally, set up the codes (executables) that will run on the remote computer. This is also done with YAML files.

Here is an example for a `lammps_dahu.yml` file:

```yaml
---
label: lammps
description: "Guix-based LAMMPS as set in DAHU."
default_calc_job_plugin: "lammps.raw"
filepath_executable: "/home/username/.guix-profile/bin/lmp_mpi"
computer: dahu
prepend_text: |
  source /applis/site/guix-start.sh
  set -x
  cat $OAR_FILE_NODES | wc -l
append_text: " "
```

For the other codes, such as `n2p2_train` and `n2p2_scale`, create similar YAML files. The main difference will be the `default_calc_job_plugin` line, which should be set to `n2p2.train` and `n2p2.scale` respectively.

Once you have created the three YAML files, run these commands to set up the codes in AiiDA:

```bash
verdi code create core.code.installed --config lammps_dahu.yml
verdi code create core.code.installed --config n2p2_train_dahu.yml
verdi code create core.code.installed --config n2p2_scale_dahu.yml
```

The output for each command will be similar to this:

```console
$ verdi code create core.code.installed --config yml_files/codes/lammps_dahu.yml
Report: enter ? for help.
Report: enter ! to ignore the default and set no value.
Escape using double quotes [y/N]:
Success: Created InstalledCode<1>
```



## 5. Run and Monitor a Calculation

You can now submit a calculation from your local machine, and AiiDA will send it to run on `dahu`:

```bash
verdi run your_calculation.py
```

To check the status of your calculations in AiiDA, use:

```bash
verdi process list -a
```

To check the job status directly on the remote `dahu` machine, log in and use the scheduler's command:

```bash
oarstat -u
```

Finally you can go to 1.HPC folder and submit your calculation.

```verdi run wkchain_Al.py        # run test calculation
verdi process list -a  # check record of calculation
```

The plugin also includes verdi commands to inspect its data types:

```shell
verdi data n2p2 list
verdi data n2p2 export <PK>
```



## Development

To contribute a change:

1. Fork [aiida-n2p2](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/aiida-n2p2) on GitLab.
2. Clone your fork, create a branch, and add your changes.
3. Commit the changes and push the branch to your fork.
4. Open a pull request on the original repository so the changes can be reviewed. On GitLab this request is called a merge request.

