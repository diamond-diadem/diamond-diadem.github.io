---

title: How to use xTB Apptainer image?
linkTitle: xTB tutorial
weight: 3
---------

<div align="justify">

{{< callout context="note" title="" icon="tabler-icons/outline/info-circle" >}}

In preamble, you need to have Apptainer installed on your machine; see [this link](/en/documentation/install/install-apptainer/) for more details.

This tutorial focuses on using the xTB container image. The image can be downloaded read to use from the GRICAD registry with Apptainer and allows directly running the `xtb` executable.

For more information on Apptainer containers, please look at [this page](/en/about/apptainer/).

To have a quick look at Apptainer's main commands, you may refer to [this tutorial](/en/documentation/use/apptainer-image/).

{{< /callout >}}

This image is a relocatable and renamable file we recommend putting in a dedicated directory to easily find it. While it can be any directory, in this tutorial we will assume you put it in `$HOME/apptainer-images`:

```bash
mkdir -p $HOME/apptainer-images

apptainer pull $HOME/apptainer-images/xtb.sif \
  oras://gricad-registry.univ-grenoble-alpes.fr/diamond/apptainer/apptainer-singularity-projects/xtb.sif:latest
```

To illustrate the different commands, we will use a minimal water molecule in XYZ format. Create the file `h2o.xyz` in the current directory:

```bash
cat > h2o.xyz << EOF
3
This is a very strange water molecule...
O       0.0    0.0   0.0
H       1.0    0.0   0.0
H       0.0    1.0   0.0
EOF
```

In this tutorial, we will assume that the input file `h2o.xyz` is located in the current directory.

**Disclaimer**

> The commands presented here use the `xtb` executable through `apptainer exec`. This is the most explicit way to use the image, as it directly calls the program inside the container.
>
> Like some other container images available in the DIAMOND, `apptainer run` is configured to call `xtb` directly by default, with no need to include it in the comand line.
> The use of `run` or `exec` is up to user discretion.

## One liner command

For impatient folks, here is how to launch a geometry optimization with xTB using the container image previously downloaded and stored in `$HOME/apptainer-images/xtb.sif`:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

The optimized geometry will be written by xTB in the current working directory, usually as `xtbopt.xyz` when the input file is in XYZ format.

## Detailed usage for the xTB container

This section presents different ways to use the xTB image. For more details about Apptainer commands, please look at [this tutorial](/en/documentation/use/apptainer-image/#apptainer-crash-course).

### Using the xTB container

To run xTB without any container, one would use the following command:

```bash
xtb h2o.xyz --opt
```

where `h2o.xyz` is the input geometry file stored in the current directory.

To do the same inside the container, use:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

This command means:

* `apptainer exec` starts a command inside the container;
* `$HOME/apptainer-images/xtb.sif` is the xTB Apptainer image;
* `xtb` is the executable called inside the container;
* `h2o.xyz` is the molecular geometry input file;
* `--opt` asks xTB to perform a geometry optimization.

### Running a single point calculation

If you only want to compute the energy and properties of the input geometry without optimizing it, omit the `--opt` option:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz
```

### Choosing the xTB method

By default, xTB generally uses the GFN2-xTB method. You can explicitly select the GFN parametrization with the `--gfn` option.

For example, to run a geometry optimization with GFN2-xTB:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --gfn 2 --opt
```

To use GFN1-xTB:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --gfn 1 --opt
```

### Charge and spin

For charged or open-shell systems, you may need to provide the molecular charge and the number of unpaired electrons.

For example, to optimize a system with total charge `+1`:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --chrg 1 --opt
```

For an open-shell system, use `--uhf` to specify `Nalpha - Nbeta`. For example, for two unpaired electrons:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --uhf 2 --opt
```

### Implicit solvation

xTB can also be used with implicit solvent models. For example, to optimize the geometry of `h2o.xyz` with the ALPB water solvent model:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt --alpb water
```

## Using the xTB container for parallel runs

xTB uses shared-memory parallelization. In practice, this means that one usually controls the number of CPU threads with OpenMP-related environment variables.

For example, to run xTB using 4 OpenMP threads:

```bash
apptainer exec \
  --env OMP_NUM_THREADS=4,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```

Alternatively, xTB also provides the `-P` / `--parallel` option to specify the number of parallel processes:

```bash
apptainer exec \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt -P 4
```

For production calculations, especially on larger systems, it is recommended to set the OpenMP environment variables explicitly so that the number of threads used by xTB is controlled and reproducible.
For faster calculation, you can increase the number of threads with `OMP_NUM_THREADS=X,1` up to the number of CPU cores available. (You can display it by using `nproc`)

Still, the memory per thread (i. e. `OMP_STACKSIZE`) time the number of threads, should not exceed the available memory on the system.
So if you need to compute on bigger atomic system, you should increase `OMP_STACKSIZE` while decreasing `OMP_NUM_THREADS` to keep optimal performances.

**Remark**

> xTB can't be launched with `mpirun` wich mean it can only run on a single-node. 

## Display help

To display xTB's help message, with all flags available in the version inside the container:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb --help
```

To display the container's minimal help message:

```bash
apptainer run-help $HOME/apptainer-images/xtb.sif
```

To display the container's metadata, such as labels, version information, image author, or build information:

```bash
apptainer inspect $HOME/apptainer-images/xtb.sif
```

## Partial or total isolation

By default, Apptainer does not fully isolate the container from the host system. One can either have partial or total isolation using respectively the flags `--no-mount` or `--no-home` and `--containall` (see [this link](/en/documentation/use/apptainer-isolation-flags/) for more information).

Whenever `--containall` is activated, the directory on the host machine containing the xTB input files cannot be accessed from the container automatically.

For example, the following command fail because `h2o.xyz` is not visible inside the isolated container:

```bash
apptainer exec --containall \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```

It is then required to manually mount the directory containing the input files using the `--bind` flag.

For instance, if the xTB input file is in the current directory:

```bash
apptainer exec \
  --containall \
  --bind $PWD:$HOME \
  $HOME/apptainer-images/xtb.sif \
  xtb $HOME/h2o.xyz --opt
```

In this example, the current host directory `$PWD` is mounted to `$HOME` inside the container, and the input file is then accessed as `$HOME/h2o.xyz`.

## Exercises

### First exercise

How to use the container image to run a geometry optimization with xTB?

**Data**

> * The image is located at: `$HOME/apptainer-images/xtb.sif`
> * The input file is located in the current directory: `$PWD/h2o.xyz`

Possible answer:

```bash
apptainer exec $HOME/apptainer-images/xtb.sif xtb h2o.xyz --opt
```

### Second exercise

How to use the container image to run an xTB geometry optimization using 8 OpenMP threads?

**Data**

> * The image is located at: `$HOME/apptainer-images/xtb.sif`
> * The input file is located in the current directory: `$PWD/h2o.xyz`

Example of a possible answer:

```bash
apptainer exec \
  --env OMP_NUM_THREADS=8,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  $HOME/apptainer-images/xtb.sif \
  xtb h2o.xyz --opt
```

### Third exercise

How to use the container image to run an xTB geometry optimization using 4 OpenMP threads, fully isolated from the host system?

**Data**

> * The image is located at: `$HOME/apptainer-images/xtb.sif`
> * The input file is located at: `$HOME/xtb-examples/exercise/h2o.xyz`

Example of a possible answer:

```bash
apptainer exec \
  --containall \
  --env OMP_NUM_THREADS=4,1 \
  --env OMP_STACKSIZE=4G \
  --env OMP_MAX_ACTIVE_LEVELS=1 \
  --bind $HOME/xtb-examples/exercise:$HOME \
  $HOME/apptainer-images/xtb.sif \
  xtb $HOME/h2o.xyz --opt
```

<!-- ## Frequently encountered issues with the xTB image

### Issue Lorem ipsum

**Issue description**

Lorem ipsum.

**Solution**

This issue is caused by lorem ipsum.

```bash
lorem-ipsum
```

-->

</div>
