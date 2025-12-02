---
title: Étude comparative des performances
linkTitle: Benchmark
toc: false
draft: true
---

### Condition optimale pour exécuter le workflow 

Plusieurs investigations ont été menées afin de déterminer si n2p2 effectue une simple parallélisation via MPI ou s’il prend également en charge OpenMP (configuration multi-threads). Il semble que la configuration optimale pour n2p2 soit `NODES=2` et `THREADS=1`. Cela signifie que n2p2 ne semble pas tirer efficacement parti d’une parallélisation multi-threads, mais uniquement d’une parallélisation multi-nœuds.

De plus, même lorsque le nombre de threads est fixé à 1, le nombre total d’époques d’apprentissage (c’est-à-dire la quantité de données entraînées) en fonction du nombre de nœuds n’augmente pas linéairement. L’approximation linéaire reste valable jusqu’à deux nœuds.

Une autre investigation de performance concerne la variation de la taille du jeu de données d’entrée. Le jeu de données complet consiste en une collection de 51 702 structures d’atomes de bore. Des sous-ensembles du jeu de données ont été étudiés par incréments de 5 000 structures en utilisant `NODES=1`, `CORES=32`, `THREADS=1` et la commande `mpirun -n 32`. Dans ce jeu de données spécifique, 5 000 structures correspondent à 69,4 MB, tandis que 51 702 structures correspondent à 984,1 MB.

Le throughput en fonction du nombre de structures est représenté dans la Figure 1 et est défini comme le rapport entre le temps total d’entraînement et le nombre de structures :

$$ throughput=\frac{total\_time(s)}{number\_structures} $$

 <p align="center">
  <img alt="n2p2" class="n2p2_throughput_vs_structures">
</p>
<p align="center"><i>Figure 1: Efficacité R en fonction du nombre de structures traitées. Axe des x en échelle log2  </i></p> 

Le fait que n2p2 ne soit pas implémenté avec du multi-threading suggère de mener une investigation plus détaillée en fixant nos calculs de test avec `NODES=1`, `CORES=32` et `THREADS=1`. Afin d’évaluer la tendance de l’efficacité en fonction du nombre de processus, le nombre d’époques a été fixé à 100 et le calcul d’entraînement a été exécuté avec la commande suivante :
```shell
mpirun -n num_proccess --bind-to core
```
où `num_process` est le nombre de processus demandés, et `num_process ∈ [1, 2, 4, 8, 16, 32, 64]`. Dans le cas spécifique de `num_process = 64`, le nombre de nœuds est fixé à 2. L’option `--bind-to core` est importante pour garantir une parallélisation correcte des processus sans surcharger un seul socket. Plus d’informations sont disponibles dans la documentation officielle mpirun [documentation officielle mpirun](https://www.open-mpi.org/doc/v4.0/man1/mpirun.1.php).


La Figure 2 montre l’efficacité (R) en fonction du nombre de processus. On peut observer que l’efficacité maximale est obtenue pour `mpirun -n 1`, puis diminue lorsque le nombre de processus augmente.

 <p align="center">
  <img alt="n2p2" class="n2p2_benchmark_R_vs_process_log2_total_time3">
</p>
<p align="center"><i>Figure 2: Efficacité R en fonction du nombre de processus demandés. Axe des x en échelle log2. </i></p>

À partir de cette étude, nous pouvons conclure que, pour les calculs n2p2, la configuration optimale est `NODES=2`, `CORES=32`, `THREADS=1`, et un nombre de processus mpirun égal à 64. En effet, comme montré dans la Figure 2, à 64 rangs il y a une perte d’environ 0,36 en efficacité par rapport à la valeur initiale, ce qui représente néanmoins un bon compromis pour accélérer le calcul.



