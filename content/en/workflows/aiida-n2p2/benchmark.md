---
title: Benchmark investigation
linkTitle: Benchmark
toc: false
draft: true
---

### Optimal condition to run n2p2 WF.
Some investigations have been carried out to determine whether n2p2 performs simple parallelization using MPI or also supports OpenMP (multi-threaded setup). It appears that the best setup for n2p2 is with `NODES=2` and `THREADS=1`. This means that n2p2 does not seem to perform multi-threaded parallelization efficiently, but rather only multi-node parallelization.

Moreover, even when the number of threads is fixed to 1, the total number of training epochs (i.e., the amount of data trained) as a function of the number of nodes does not increase linearly. The linear approximation still holds up to two nodes.

Another benchmarking investigation concerns the variation of the input dataset size. The entire dataset consists of a collection of 51,702 structures of boron atoms. Subsets of the dataset were investigated in increments of 5,000 structures using `NODES=1`, `CORES=32`, `THREADS=1`, and the command `mpirun -n 32`. In this specific dataset, 5,000 structures correspond to 69.4 MB, while 51,702 structures correspond to 984.1 MB.

The throughput as a function of the number of structures is plotted in Figure 1, and it is defined as the ratio between the total training time and the number of structures.

$$ throughput=\frac{total\_time(s)}{number\_structures} $$

 <p align="center">
  <img alt="n2p2" class="n2p2_throughput_vs_structures">
</p>
<p align="center"><i>Figure 1: Efficiency R as function of number of processed asked. x-axes in log2 scale  </i></p> 

The fact that n2p2 is not implemented with multi-threading suggests conducting a more detailed investigation by fixing our test calculations with `NODES=1`, `CORES=32`, and `THREADS=1`. In order to evaluate the efficiency trend as a function of the number of processes, the number of epochs was fixed to 100, and the training calculation was executed using the following command:

```shell
mpirun -n num_proccess --bind-to core
```
where `num_process` is the number of processes requested, and `num_process ∈ [1, 2, 4, 8, 16, 32, 64]`. In the specific case of `num_process = 64`, the number of nodes is set to 2. The `-bind-to core` option is important to ensure correct parallelization of the processes without overloading a single socket. More information can be found in the official mpirun documentation [mpirun documentation](https://www.open-mpi.org/doc/v4.0/man1/mpirun.1.php).


The plot in Figure 2 shows the efficiency (R) as a function of the number of processes, and it can be observed that the maximum efficiency occurs for `mpirun -n 1`, then decreases as the number of processes increases. 

 <p align="center">
  <img alt="n2p2" class="n2p2_benchmark_R_vs_process_log2_total_time3">
</p>
<p align="center"><i>Figure 2: Efficiency R as a function of number of processed asked. x-axes in log2 scale  </i></p>

From the present investigation, we can conclude that, for n2p2 calculations, the optimal configuration is `NODES=2`, `CORES=32`, `THREADS=1`, and mpirun processes equal to 64. In fact, as shown in Figure 2, at 64 ranks there is a loss of approximately 0.36 in efficiency compared to the initial value, which still represents a good compromise to speed up the calculation.
