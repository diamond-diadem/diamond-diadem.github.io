---
title: n2p2 Workflow Installation
linkTitle: Installation
toc: false
---

## Installation

```shell
pip install aiida-n2p2
verdi quicksetup  # better to set up a new profile
verdi plugin list aiida.calculations  # should now show your calclulation plugins
```


## Usage

Here goes a complete example of how to submit a test calculation using this plugin.

A quick demo of how to submit a calculation:

```shell
verdi daemon start     # make sure the daemon is running
cd examples
```
You can have acces two example both in local and super computer.

### Tree of n2p2 adida plugin
```
├── aiida_n2p2
│   ├── calculations
│   │   ├── predict.py
│   │   ├── scaling.py
│   │   └── train.py
│   ├── cli.py
│   ├── data
│   │   └── __init__.py
│   ├── helpers.py
│   ├── __init__.py
│   ├── parsers
│   │   ├── predict.py
│   │   ├── scaling.py
│   │   └── train.py
│   └── workflows
│       └── make_potential.py
├── CHANGELOG.md
├── examples
│   ├── 1.Al
│   │   ├── 222_IN.data
│   │   ├── AiidA-n2p2_demo.ipynb
│   │   ├── in.lmp
│   │   ├── input.data
│   │   └── input.nn
│   ├── 1.Boron
│   │   ├── 222_IN.data
│   │   ├── aiida-n2p2_demo.py
│   │   ├── input.data
│   │   ├── input.nn
│   └── 2.HPC
│       ├── 222_IN.data
│       ├── in.lmp
│       ├── input.data
│       ├── input.nn
│       └── wkchain_Al.py
├── LICENSE
├── pyproject.toml
└── README.md

```

### Run in local
Go to 1.Al folder and run the jupter notebook ```AiidA-n2p2_demo.ipynb```

### Run on the HPC
Before to submit your calculation on the supercomputer be sure that your have made a set up for your local computer with a scheduler to menage your calculation on the super computer.
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
label: lamps
description: 'Guix-based LAMMPS as set in DAHU.'
default_calc_job_plugin: 'lammps.raw'
filepath_executable: "/home/username/.guix-profile/bin/lmp_mpi"
computer: dahu
prepend_text: |
   source /applis/site/guix-start.sh
   set -x
   cat $OAR_FILE_NODES | wc -l
append_text: ' '
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

```shell
git clone https://github.com/aksam432/aiida-n2p2 .
cd aiida-n2p2
pip install --upgrade pip
pip install -e .[pre-commit,testing]  # install extra dependencies
pre-commit install  # install pre-commit hooks
pytest -v  # discover and run all tests
```

See the [developer guide](http://aiida-n2p2.readthedocs.io/en/latest/developer_guide/index.html) for more information.


