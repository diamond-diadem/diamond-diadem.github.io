---
title: "Using Apptainer on Windows"
weight: 2
---

<div align="justify">
    
Designed primarily for high-performance computing, Apptainer — the containerization solution chosen for the DIAMOND project — natively works only on Linux. If it cannot be used on a Linux distribution, it is necessary to use a virtual machine that emulates a Linux system as an intermediary between Apptainer and the kernel of any other operating system (like Windows).

## How to Install WSL2 on Windows

The official Apptainer documentation recommends **Windows Subsystem for Linux (WSL2)** as the solution to virtualize a Linux kernel on all versions of Windows 10 and later.

For more information on installing WSL2 on a Windows system, you can refer to the [official Windows documentation](https://learn.microsoft.com/fr-fr/windows/wsl/install) or [Apptainer's documentation](https://apptainer.org/docs/admin/1.3/installation.html#windows).

In summary, for all recent versions of Windows (build `19041` and later), installation is done with a single line in PowerShell (with administrator rights):

```bash
wsl --install
```
Then, you only need to restart the machine and configure the Linux subsystem you want to use (for example, Ubuntu 24.04):

```bash
# Installing Ubuntu 24.04
wsl.exe --install Ubuntu-24.04
# Setting Ubuntu as the default Linux subsystem
wsl --set-default Ubuntu-24-04
```

Note that for the installation of Ubuntu 24.04, you will need to provide a username and a password.

Once this is done, you can launch WSL2 from any PowerShell or Windows terminal with the command:
```bash
wsl.exe
```

Once WSL2 is available with the ability to emulate any Linux distribution, you can install Apptainer just like on any other Linux operating system by following the [official documentation](https://apptainer.org/docs/admin/1.3/installation.html#installation-on-linux).

## Performance Overhead

While WSL2 allows the use of Apptainer images produced for DIAMOND transparently on Windows, the underlying virtualization inevitably comes with a numerical overhead.

Estimating this overhead requires replicating and comparing the execution time of the same computation using Apptainer in different conditions: on a Linux distribution as a reference, and using Apptainer on Windows with WSL2. Performing such tests (details below) shows that the Windows + WSL2 solution is approximately ($\approx 4.5%$) slower than the Linux reference.

This overhead is minor when running many utility tools like visualization or data processing software. However, it can be significant in the case of intensive computations, such as those encountered with the many high-performance simulation codes available on the DIAMOND platform.

<!-- > **Test Conditions and Detailed Results**
>
> Calculations were performed on a dual-boot machine with Ubuntu 24.04.1 LTS/Windows 11 to have the same underlying hardware (Intel i7-11800H 2.30GHz CPU and 16GB of RAM). To maximize software similarities, WSL2 was used with the same distribution as our reference (Ubuntu 24.04.1 LTS), and in each case, we ensured the same Apptainer version (1.3.4) was used.
>
> For each of these Apptainer installations, a test image provided for the [DIAMOND tutorials](/en/documentation/apptainer-parallel/howto/) was used. This image performs $M$ multiplications of square $N \times N$ random matrices. In this test, a sequential computation (on a single CPU core) was performed with $M=500$ and $N=1000$: `apptainer run tutorial-openmpi.sif 500 1000`.
>
> To account for potential performance fluctuations due to CPU load, the calculations were replicated 10 times in each case. The final average times were $<t^{Ubuntu}> = 118.78$ s ($\sigma = 1.41$ s) and $<t^{WSL2}> = 124.15$ s ($\sigma = 0.79$ s).
>
<div class="text-center mt-4 mb-4">
      <img alt="WSL2 overhead" class="windows-overhead">
</div>
>
> Considering these average times and standard deviations, it seems that the overhead associated with WSL2 is significant. This conclusion is supported by verifying the compatibility of these samples with the hypothesis of identical average times. A very small p-value ($2.5 \times 10^{-6}$) was obtained (using the `ttest_rel` function from the Python `scipy.stats` module), strongly suggesting that the measured times follow different distributions and that virtualization with WSL2 results in a noticeable increase in execution time compared to a Linux reference distribution. -->

</div>
