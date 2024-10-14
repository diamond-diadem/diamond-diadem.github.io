---
title: Advanced isolation options for Apptainer
linkTitle: Advanced isolation options for Apptainer
weight: 3
---

<div align="justify">

This page is dedicated to discussions about the isolation of Apptainer containers. This topic is briefly mentioned in most tutorials on the platform; this page delves deeper into the details of isolation with the goal of providing finer control over the sharing between the host and the container.

## Default behavior of Apptainer

As a containerization solution oriented towards high-performance computing, Apptainer is configured by default to facilitate reading and writing input/output data or logs.

According to the official [Apptainer documentation](https://apptainer.org/docs/user/latest/bind_paths_and_mounts.html), the directories shared between the container and the host machine are as follows:
* The user's `$HOME`, as it usually contains most of the data that the containerized code might need during execution.
* The current directory where Apptainer is called (`$PWD`), since it often contains the input files needed by the containerized code. Note that if symbolic links reside in the path leading to the current directory on the host machine, their interpretation within the container may cause execution issues.
* `/dev`, which contains the entries for the physical devices used by the host system. This directory is useful, for example, for visualization software to access the host's graphical resources.
* `/proc` and `/sys`, which contain information about the processes currently running on the host's kernel. Sharing these resources is essential to allow the container to access the host machine's kernel, on which it relies to operate.
* `/tmp` and `/var/tmp`, the directories for temporary data storage (for short-term and medium-term data, respectively).

Certain specific files are also shared between the host and the container:

* `/etc/hosts`, which contains information related to hostname resolution for various network protocols, sometimes required during the execution of containerized code.
* `/etc/localtime`, which configures the timezone to be used system-wide and may be needed within the containerized code.

Additionally, Apptainer can be configured to include other useful system files: `/etc/resolve.conf` (similar in use to `/etc/hosts` mentioned earlier), `/etc/group` (listing data related to user groups), and `/etc/passwd` (containing information about user accounts, but *not their passwords*, contrary to what the file's name suggests). However, it is important to note that sharing these files is not standard in Apptainer and depends on individual installation configurations.

It should be noted that, as suggested in the previous paragraph, it is possible for the system administrator of your computing infrastructure to alter the default behavior of Apptainer. In this way, prior configuration can deny the container this *transparent* access to some or all of the directories mentioned above, usually for security reasons.

Similarly, Apptainer allows the container to access all environment variables defined on the host system by default (except for the `$PATH` variable, which is redefined to point to the paths containing the container's executables). The intention is to facilitate ease of use by allowing containerized code to access the necessary environment variables by borrowing values from the host machine. Visualization tools are a relevant example to justify this choice: they require the `$DISPLAY` environment variable to render their interface on the host's graphical resources, and borrowing its value from the host system allows the container to function effectively.

## Additional isolation

While the previous section summarized Apptainer's default isolation behavior and presented the configuration options available to the system administrator, there are also options that allow the user to have relatively fine control over this behavior.

These options address a variety of needs, which can be grouped into two (non-exclusive) categories. On one hand, you might want to deny the container access to directories that are shared by default with the host machine (for example, to add an extra layer of security and prevent important data from being overwritten). On the other hand, you may want to prevent the transfer of environment variables from the host to the container (for example, because one of the variables defined on the host conflicts with the proper execution of the containerized code).

### The `--cleanenv` flag

If you want to clean the container's software environment as much as possible, you can add the `--cleanenv` (or `-e`) flag to `apptainer run` or `apptainer exec`.

```bash
apptainer exec --cleanenv <image-name> <command>
```

In practice, this means the container is deprived of the values of all the host's environment variables (except for `$HOME` and `$PWD`). This is useful to ensure that no hidden environment variables interfere with the proper functioning of the container. In addition to solving occasional specific execution problems, it is also a good practice in terms of scientific reproducibility, as it reduces the influence of the host machine on the container's execution, making it easier to replicate the software environment across different machines.

However, the downside of this option is practical: if Apptainer shares the host's environment variables by default, it's to make life easier for the user by simplifying commands. Returning to the example of visualization software mentioned earlier, using `--cleanenv` prevents the container from accessing the host's `$DISPLAY` variable:

```bash
apptainer run --cleanenv <visualization-software-image> 
  [...]
  could not connect to display
  [...]
```
You then need to manually specify it using the `--env <VARIABLE>=<value>` flag:
```bash
apptainer run --cleanenv --env DISPLAY=$DISPLAY <visualization-software-image> 
  [...]
  # IT WORKS!
  [...]
```
Determining which variables to set manually (and the value to assign to them) is not always straightforward, but official documentation can be consulted if you wish to adopt this best practice.

### The `--contain` flag and its alternatives

Another aspect of container isolation is limiting their access to the host machine's directories. For this, there are two dedicated options: `--no-mount` and `--contain`.

The `--no-mount <keyword>` flag allows you to manually select the default host directories that you want to restrict access to for the container. Here are some usage examples:
```bash
# To remove /dev from the directories shared with the container
apptainer exec --no-mount dev <image> <command>

# To remove /sys and /proc from the directories shared with the container
apptainer exec --no-mount sys,proc <image> <command>
```
If you want to deny the container access to your `$HOME`, there are two equivalent solutions:
```bash
apptainer exec --no-mount home <image> <command>
# equivalent to
apptainer exec --no-home <image> <command>
```

> Note that if the current directory is part of your `$HOME`, it is not excluded by `--no-mount home` and must be explicitly specified with `--no-mount cwd` if you wish to restrict the container from it.

It's important to mention that using `--no-mount` is quite aggressive: if you choose to exclude a directory with this flag, the directory within the container will be completely empty.
```bash
apptainer exec --no-mount dev <image> ls /dev
  # Shows nothing
```
As a result, this flag should be used sparingly, especially when the directory in question contains important resources (notably `/proc`).

The `--contain` flag (or `-c`) is intended for more general use: it cleans the default shared directories without completely removing their contents. This option can be seen as an alternative version of `--no-mount tmp,home,cwd,dev`, with the following differences:

* `--no-mount home,cwd` completely removes the user's `$HOME` and the current directory path, while `--contain` creates an empty copy.
* `--no-mount dev` removes all content from `/dev`, whereas `--contain` cleans a large part of it compared to the default behavior but still keeps some important files and directories.

To summarize, `--contain` can be seen as a general isolation option for safely reducing interactions between the container and the host machine, while `--no-mount` is both more aggressive and allows for more targeted exclusion of specific parts of the system's directory structure.

Regardless of which option is used, it is generally common to combine them with the `--bind <host-directory>:<container-directory>` flag to manually mount directories between the host and the container. For example, if you want to use `--contain` while still allowing the container to use data from the current directory for calculations:
```bash
# Input file contained in the current directory on the host machine.
ls ./
  input.file

apptainer exec --contain <image> <executable> input.file
  [...]
  # "input.file" not found

# Using --bind to mount the current directory ($PWD) to the location in the container
# where you are by default with --contain ($HOME).
apptainer exec --contain --bind $PWD:$HOME <image> <executable> input.file
  [...]
  # IT WORKS!
```

### The `--containall` flag

This is the final option available for isolating a container from the host machine. The `--containall` (or `-C`) flag can be considered a combination of `--cleanenv` and `--contain`.

This option cleans the software environment in the same way as `--cleanenv`, filtering out almost all of the host's environment variables from the container (see the [dedicated section](#the---cleanenv-flag) above).

If you use `--containall` and wish to set a value for one or more environment variables within a container, you must use the `--env <variable>=<value>` flag, as you would with `--cleanenv`.

The `--containall` option also replicates the behavior of `--contain`, with additional isolation: as previously mentioned in the section, `--contain` partially isolates directories like `/tmp`, `/var/tmp`, `/dev`, `$HOME`, and `$PWD`. In addition to these, `--containall` also partially isolates `/proc` by hiding the host's process identifiers (`pid`) and inter-process communications (`ipc`).

Therefore, if you want to use `--containall` while still allowing the container to access host machine data, for example, to access input data, you must use the `--bind <host-directory>:<container-directory>` flag.

Using the previously mentioned example of a containerized visualization code, the combined use of `--containall`, `--env`, and `--bind` is as follows:

```bash
# For visualization software, the container needs the $DISPLAY variable
# to use the host machine's graphical resources. To access input files assumed 
# to be in the current directory $PWD, they must be mounted at the location
# in the container where you are by default with the --containall flag.
apptainer run --containall           \
              --env DISPLAY=$DISPLAY \
              --bind $PWD:$HOME      \
              <visualization-software-image> $HOME/<input-file>
```