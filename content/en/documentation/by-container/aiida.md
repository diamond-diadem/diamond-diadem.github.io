---
title: AiiDA tutorial
weight: 6
---

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

Before following these instructions, you must have Apptainer installed on your machine; see [this link](/documentation/install/install_apptainer/) for more details.

This tutorial explains how to interact with AiiDA's Apptainer image.

{{< /callout >}}

## Step 0: Before using the image

To be able to use the AiiDA Apptainer image, and for the sake of data persistence, you need a specific folder architecture. In short, we recommend that you use this folder architecture:

```bash
$ ls /path/to/folder/of/your/choice
└── .aiida (environment final du conteneur)
    ├── database
    ├── .ssh
    ├── postgres_run
    └── rabbitmq
         └── var
             ├── lib/rabbitmq
             └── log
```

Here's the long explanation:

- The `database` folder is needed to store data related to AiiDA.
- The `.ssh` folder is needed to store data related to ssh connections.
- The `postgres_run` folder is needed to run the PostgreSQL service.
- The `rabbitmq/var/lib/rabbitmq` and `rabbitmq/var/log` folders are needed to run the RabbitMQ service.

Once this folder architecture has been created and Apptainer installed, you are ready to use an Apptainer image of AiiDA.

## Step 1: Download the image you need

The first thing to do is go to the `Deploy` section of this [Gitlab repository](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer). Then select the image you are interested in (`aiida_vasp.sif` for example) and download it using the command :

```bash
apptainer pull aiida_vasp.sif oras://gricad-registry.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer/aiida_vasp.sif:latest
```

## Step 2: Start an instance and access the container

Once you have downloaded the image you want, you are ready to use it. We recommend that you start an Apptainer instance and then access the container using the `shell` command.

### Step by step method

To start an instance, use the following command

```bash
apptainer instance start \
        --containall \
        -B $my_path/.aiida:/.aiida \
        -B $my_path/.aiida/.ssh:$HOME/.ssh \
        -B $my_path/.aiida/postgres_run:/var/run/postgresql \
        -B $my_path/.aiida/rabbitmq/var/lib/rabbitmq:/var/lib/rabbitmq \
        -B $my_path/.aiida/rabbitmq/var/log:/var/log/rabbitmq \
        {apptainer_image_name}.sif {instance_name}
```

with `$my_path`, which is an environment variable pointing to `/path/to/folder/of/your/choice`, and the `-B` flags which allow specific folders on the host system to be mounted in the apptainer image. Once the instance is started, you can either enter the container or run :

```bash
# to access the container
apptainer shell instance://{instance_name}

# to execute commands in the
apptainer exec instance://{instance_name} {commands}
```

### Quick method

To automate all these steps and ensure that all image services are running (PostgreSQL and RabbitMQ), a bash script is available via this [link](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/aiida2apptainer/-/blob/main/bash_script/quick_start.sh?ref_type=heads). Once downloaded, you can run the command:

```bash
bash ./quick_start.sh --help # to display the various options available
```

## Step 3: Configure your AiiDA environment (via GUI)

If you're not familiar with the command prompt and AiiDA commands, we recommend you use the GUI developed for the container. Once you've entered the container, run the following command:

```bash
python3 /GUI/main.py
```

Once the GUI is open, we recommend you click on the “Step-by-step mode” button and follow the steps. The same steps as described in the next section are carried out, but in a gentler way for a novice user.

## Step 3 bis: Configure your AiiDA environment (via command prompt)

If this is the **first time** you're using this AiiDA Apptainer image, you'll need to set up your AiiDA profile and follow this entire step! Otherwise you can go straight to the [next step](#run-workflow) to use the image and start workflows.

### Set-up a user profile

A default user is available in the container: `aiida_user`. However, you can create your own user profile using the following commands:

```bash
verdi quicksetup --profile {your_profile} --email {your@mail} --first-name {your_firstname} --last-name {your_lastname} --institution {your_institution}
verdi profile setdefault {your_profile}
verdi config set warnings.rabbitmq_version false
```

> The last command disables RabbitMQ warnings for the user `your_profile`.

### Configure image environment

Before installing a computer or code on your profile, we recommend that you configure the image environment. To do this, you can set environment variables as you wish in the `config.json` file using the command:

```bash
nano-tiny /tmp/config.json
```

There are already default values to help you choose your own environment variables. Once this file has been modified, you can use the following command:

```bash
bash /tmp/config_env.sh
```

This allows you to fully configure your AiiDA environment by customising the default configuration files supplied with the image. This makes it easier to install code, compute machines or set up an ssh connection.

### Set-up a transparent SSH connection to Gricad clusters

This part is intended for people who have a PERSEUS account and are assigned to a valid project. If this is not the case and you need to use Gricad clusters, please consult this [link](https://gricad-doc.univ-grenoble-alpes.fr/services/).

The first thing you need to do is generate an RSA key. To do this, run the command:

```bash
ssh-keygen
```

> It's important to leave the password blank so that AiiDA can access Gricad's clusters with confidence.

Next, copy the file `/tmp/workspace/ssh/config` to the folder `~/.ssh/`. Then, to complete the configuration of the transparent SSH connection, you need to copy the RSA key to the front-ends and clusters using the following commands:

```bash
ssh-copy-id {perseus-login}@rotule.univ-grenoble-alpes.fr
ssh-copy-id {perseus-login}@trinity.univ-grenoble-alpes.fr
ssh-copy-id dahu.ciment
```

> Note that you'll have to enter your PERSEUS account password at each step.

To check that everything is working correctly, you can try to connect to the `dahu` cluster (with the command `ssh dahu.cement`).

### Installing a computer

You have the choice of using the default configurations in the `/tmp/workspace/yml_files/computers/setup` folder, or writing your own `yml` file. To install a new computer, you must run the following commands:

```bash
verdi computer setup -n --config /tmp/workspace/yml_files/computers/setup/{computer}.yml
verdi computer configure {transport} -n --config /tmp/workspace/yml_files/computers/config/{computer}.yml {computer_name}
```

> Here you need to change `{computer}`, `{transport}` and `{computer_name}` according to what you want to select. The `{transport}` parameter must be chosen between `core.local` or `core.ssh` and is specified in the `/tmp/workspace/yml_files/computers/setup/{computer}.yml` file.

To check that the installation has been done correctly, you can run the `verdi computer list` command.

### Installing the code

You have the choice of using the default configurations in the `/tmp/workspace/yml_files/codes` folder or writing your own `yml` file. To install new code you need to run the following commands:

```bash
verdi code create core.code.installed -n --config /tmp/workspace/yml_files/codes/{code}.yml
```

To check that the installation has been done correctly, you can run the `verdi code list` command.

## Step 4: Start a workflow

Once the AiiDA environment is set up correctly, you're ready to use the image and configure workflows. As mentioned above, you can use the `shell` or `exec` commands to interact with the container. We recommend that you use the `shell` command to access the container. You should also copy your workflow to the `/tmp' folder.

To start a workflow, simply run the command :

```bash
verdi run path/to/your/workflow/run.py
```

> Before starting a workflow, you must carefully check the Python script and configure the values for `{code_name}` and `{username}` correctly.

## Step 5: Stop an instance

Once you're done with the Apptainer image, you need to stop the Apptainer instance. To do this, run the following command

```bash
apptainer instance stop instance_name
```

## Additional steps

### Include data for a code

Codes and workflows need data to work properly. For example, VASP needs interatomic potentials. In practice, you can install data (in the same way that you installed the computer and the code). AiiDA allows you to install data by unpacking a `.tar` or `.tar.gz` file. This means that you need to mount the `/tmp` folder on the container when setting up your environment. In practice, all you need to do is add the line `-B /tmp:/tmp \` when starting an instance. You can then use the following command:

```bash
verdi data vasp-potcar uploadfamily --path=/tmp/{archive} --name=PBE.54 --description="PBE potentials version 54"
```

To check that the installation has been done correctly, you can run the command `verdi data vasp-potcar listfamilies`. The output of this command **must not be empty**.

> Once you've installed the data, we recommend that you stop the instance and start a new one, without mounting the `/tmp` folder on the container.

### Starting a workflow on Gricad clusters

If you want to start workflows on Gricad clusters, you need to specify a PERSEUS project; you can do this by entering it as your username in the Python workflow.

## Known problems

Here is a list of all the known issues so far:

- No backward compatibility of Apptainer images from version **1.3.X** to version **1.2.X**. Building an image with apptainer **v1.3.X** will prevent it from being downloaded from the `gitlab-gricad` registry with apptainer **v1.2.X**.
- The postgresql service won't start is the 5432 port is already in use on that machine. In this case, it is impossible to create a profile for AiiDA.

</div>
