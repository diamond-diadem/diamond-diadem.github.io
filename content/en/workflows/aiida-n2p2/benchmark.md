---
title: Benchmark investigation
linkTitle: Benchmark
toc: false
---

### Optimal condition to run n2p2 WF.
Some investigation has been done to investigate if n2p2 is working simple paralizzation on MPI or also on Open MPI (multi-trheads set up). It emerges that n2p2 best set up is with node=2 and THREADS=1. It means that n2p2 seems not perfomed to do multithreads paralizzation, but only multinode. Moreover, even when number of theads is fixed to 1 the total number of training epochs, (i,e. the aumont of data trained) as a function of the nodes number does not increas linearly with it. The linear approximantion can be still valid until the number of node equal to 2. Below a plot where the total number of epochs trained in 30 minutes are plotted as function of number of threads. Each bullet color represent a different node set up: red bullet points - 1 node, green bullet points - 2 nodes, blue bullet points - 3 nodes, pink bullet points - 4 nodes. Each point represent a statistic average of 10 repetitions and the error bars represent the standard deviation associated.
 <p align="center">
  <img alt="n2p2" class="n2p2_optimization_32core_30min_epocs_VS_threads" style="width:50%">
</p>
<p align="center"><i>Total number of epochs trained in 30 minutes are plotted as function of number of threads. Each bullet color represent a different node set up: red bullet points - 1 node, green bullet points - 2 nodes, blue bullet points - 3 nodes, pink bullet points - 4 nodes. Each point represent a statistic average of 10 repetitions and the error bars represent the standard deviation associated.</i></p>





