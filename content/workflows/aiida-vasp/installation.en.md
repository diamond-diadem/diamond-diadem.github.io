---
title: "Installing the DIAMOND AiiDA-VASP workflows"
linkTitle: "Installation"
toc: true
description: "Install, configure, and test the WF1 and WF2 workflows with AiiDA, VASP, and OVITO, then run the first examples."
---

## Before you begin

The current version of `diamond-aiida-vasp` is a **research prototype that can be installed from source**. It is not presented here as a standalone plugin published on PyPI. The repository hosting the workflow is currently private, but access can be requested through our [support form]({{% ref "contact" %}}).

The commands below assume a Linux system and should be run **from the repository root**, unless otherwise stated.

**Reference environment:**

| Component | Version |
| --- | --- |
| Python | 3.11 recommended (declared compatibility: 3.10 to 3.12) |
| `aiida-core` | **2.6.3** |
| `aiida-vasp` | **3.1.1** |
| `ovito` | **3.11.3** (free OVITO Basic API) |

To **prepare** structures, VASP and AiiDA do not need to be operational. To **submit** simulations, however, you will need a working AiiDA profile, an AiiDA *computer*, a registered VASP code, and a PAW/POTCAR potential family covered by your VASP license.

> **VASP license:** neither the VASP executable nor the POTCAR/pseudopotential files are provided with the project. Obtaining, installing, and using them is the responsibility of authorized users. Do not add them to the GitLab repository.

## 1. Install the package (development mode)

Clone the project's GitLab repository. Its final URL will be added to this page when the project is published; for now, replace the variable below with the address of the repository you can access.

```bash
export DIAMOND_VASP_REPO_URL="https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/workflows/diamond-aiida-vasp"
git clone "$DIAMOND_VASP_REPO_URL" diamond-aiida-vasp
cd diamond-aiida-vasp
```

Create and activate a dedicated Python environment, then install the package in editable mode:

```bash
python3.11 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e .
```

The `pip install -e .` command installs the dependencies declared in `pyproject.toml`. If you use Conda or Mamba, the repository also provides an `environment.yml` file:

```bash
conda env create -f environment.yml
conda activate diamond-aiida-vasp
```

Use **only one** of these environment setup methods. Check that the project's command-line interface is available:

```bash
diamond-vasp --help
```

For contributors, or to run the automated tests, install the development tools and run:

```bash
python -m pip install -e '.[dev]'
pytest -q
```

These local tests do not require a VASP license or HPC submission; they do not replace validation with an actual calculation.

## 2. Configure AiiDA

AiiDA stores provenance information and manages calculation submission. For an initial local setup, you can create a profile using:

```bash
verdi presto
verdi status
verdi daemon start
verdi plugin list aiida.workflows
```

For sustained use on a cluster, adapt the storage, messaging system, and AiiDA services to your infrastructure. A [DIAMOND tutorial on containerized AiiDA]({{% ref "documentation/by-container/aiida" %}}) provides a starting point for container-based installations.

You need to register the following once:

1. an **AiiDA profile**;
2. a **computer** describing the machine and its scheduler;
3. an **AiiDA code** pointing to a VASP executable available on that machine.

### Example: local computer

The `examples/cluster/` directory contains YAML files that you must customize. In `local.computer.yml`, update `work_dir` in particular; in the `local.vasp-*.yml` files, replace the executable paths with those of **your own** VASP installation.

After editing the files:

```bash
verdi computer setup --config examples/cluster/local.computer.yml
verdi computer configure core.local localhost
verdi code create core.code.installed --config examples/cluster/local.vasp-std.yml
verdi code create core.code.installed --config examples/cluster/local.vasp-gam.yml
verdi computer test localhost
verdi code test vasp-std@localhost
```

The `gricad-dahu.*.yml` and `jean-zay.computer.yml` examples are starting points for HPC environments, **not ready-to-use configurations**. You may need to install an additional scheduler plugin (for example, the [DIAMOND OAR plugin](https://gricad-gitlab.univ-grenoble-alpes.fr/diamond/aiida/plugins/oar-scheduler)) and adjust SSH access, software modules, partitions, paths, and MPI settings. **The DIAMOND platform can help you adapt the YAML files to your distribution and cluster.**

### Register VASP pseudopotentials

Using a legally obtained copy of the POTCAR data, register the family required by the configuration files **in your private AiiDA profile**:

```bash
verdi data vasp-potcar uploadfamily \
  --path=/private/path/to/your/POTCAR_archive.tar.gz \
  --name=PBE.54 \
  --description="PAW family licensed for VASP"
verdi data vasp-potcar listfamilies
```

`PBE.54` is **an example family name**, not data supplied with the project. In `examples/config/wf1.yml` and `examples/config/wf2.yml`, check the `code`, `potential_family`, and `potential_mapping` fields: the mappings must reflect the atomic species names and POTCAR variants **actually available** to you.

### Check your environment

```bash
diamond-vasp doctor --config examples/config/wf1.yml --check-ovito
verdi status
```

The `doctor` command checks, among other things, Python versions, AiiDA availability, VASP WorkChains, the code and POTCAR family specified in the YAML file, and whether OVITO can be imported. This diagnostic **does not confirm your right to use VASP or that a calculation can be successfully submitted to your cluster**. Follow it with a small validation calculation on your installation.

## 3. WF1 example: extract inherent structures

WF1 starts from an `XDATCAR` trajectory. The repository includes a short example file at `examples/data/wf1/XDATCAR_sample`; it is intended to check the procedure, **not to produce reliable physical statistics**.

Start by adapting `examples/config/wf1.yml`:

- `trajectory`: path to your `XDATCAR`;
- `skip_frames`, `stride`, `max_frames`: configuration selection after thermalization;
- `code`, `potential_family`, `potential_mapping`, and `options`: VASP settings and HPC resources;
- `rdf_radius`, `rdf_bins`, and, if needed, `pair_cutoffs`: RDF/CNA analysis settings.

### Prepare the inputs (without VASP)

```bash
diamond-vasp wf1 prepare \
  --config examples/config/wf1.yml \
  --out runs/wf1
```

This command creates the selected POSCAR files and `runs/wf1/wf1_manifest.json`, which records the configurations and their AiiDA process identifiers once they have been submitted.

### Submit, monitor, and retrieve calculations

The following steps require a configured AiiDA/VASP environment:

```bash
# Run one calculation first to check the configuration.
diamond-vasp wf1 submit \
  --config examples/config/wf1.yml \
  --manifest runs/wf1/wf1_manifest.json \
  --limit 1

diamond-vasp wf1 status --manifest runs/wf1/wf1_manifest.json
verdi process list -a
```

After the relaxations have **completed successfully**:

```bash
diamond-vasp wf1 collect \
  --manifest runs/wf1/wf1_manifest.json \
  --out results/wf1/relaxed

diamond-vasp wf1 analyze \
  --config examples/config/wf1.yml \
  --manifest runs/wf1/wf1_manifest.json \
  --structures results/wf1/relaxed \
  --out results/wf1/analysis
```

The outputs can be found in `results/wf1/relaxed/` (relaxed structures) and `results/wf1/analysis/` (`rdf.csv`, `pair_cutoffs.json`, `cna.csv`). Only successfully completed relaxations are exported and analyzed.

> **Check before conducting a scientific study:** the first RDF peaks/minima, the CNA cutoff radii, and the representativeness of the configurations. Here, the RDF calculation processes the input `XDATCAR`; to avoid including thermalization frames in this average, provide a previously equilibrated trajectory.

## 4. WF2 example: determine an equilibrium volume

WF2 uses structures from `examples/data/wf2/`, with names such as `POSCAR_300` or `POSCAR_650` for temperatures of **300 K** or **650 K**, respectively.

Adapt `examples/config/wf2.yml`. The `volume_factors` field represents **`V / V_ref`** ratios, not scale factors applied directly to each lattice vector. Also check the AIMD parameters (`incar`), computing resources, VASP code, and potentials.

### Prepare the inputs (without VASP)

```bash
diamond-vasp wf2 prepare \
  --config examples/config/wf2.yml \
  --out runs/wf2
```

The program creates the fixed-volume POSCAR files and `runs/wf2/wf2_manifest.json`.

### Submit, retrieve, and fit the equation of state

```bash
# Limit the number of new submissions for the first test.
diamond-vasp wf2 submit \
  --config examples/config/wf2.yml \
  --manifest runs/wf2/wf2_manifest.json \
  --limit 2

diamond-vasp wf2 status --manifest runs/wf2/wf2_manifest.json
```

Once the simulations have **completed successfully**, retrieve their output files and fit the pressure–volume data:

```bash
diamond-vasp wf2 collect \
  --manifest runs/wf2/wf2_manifest.json \
  --out results/wf2/retrieved

diamond-vasp wf2 fit \
  --manifest runs/wf2/wf2_manifest.json \
  --retrieved results/wf2/retrieved \
  --out results/wf2/analysis \
  --tail 1000
```

`--tail 1000` means that **the last 1,000 available pressure values** are used for the average; this setting should be chosen according to the actual equilibration of the trajectories. The analysis produces `pressures.csv` and `eos_fits.json`, along with a `pressure_volume.png` plot when Matplotlib is installed (`pip install -e '.[plot]'`). Pressures are expressed in **kbar**, and volumes in **Å³ per simulation cell**.

The Birch–Murnaghan fit requires **at least four distinct volumes per temperature**. To interpret the equilibrium volume, inspect the fit residuals, pressure stability, and whether a minimum lies within the simulated volume range. Some VASP calculations may require additional retrieval settings to make `OUTCAR` and `CONTCAR` accessible to WF2.

## 5. Monitor calculations and avoid common errors

- **Resuming submissions:** the `submit` commands use the `*_manifest.json` file and skip cases that already have an AiiDA identifier. You can run them again with a different limit to submit the remaining cases; avoid running two `submit` commands simultaneously on the same manifest.
- **Do not rerun `prepare` in the same directory:** if a manifest already exists, preparation stops to avoid overwriting the calculation tracking information. Reuse the manifest or choose a new output directory.
- **Investigating a failure:** use `diamond-vasp wf1 status` / `diamond-vasp wf2 status`, then `verdi process show PROCESS_PK`. The program does not automatically retry failed calculations.
- **Do not mix configurations:** the example `wf1.yml` and `wf2.yml` files must be adapted to the physics of your system, your VASP license, and the characteristics of your HPC environment before scientific production runs.

For further details on the methodology, scientific limitations, and cluster configuration, see `docs/methodology.md`, `docs/limitations.md`, and `docs/cluster-setup.md` in the source repository.
