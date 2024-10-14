---
title: "Apptainer sous Windows ?"
weight: 2
---
<div align="justify">

Étant orientée par construction vers le calcul haute performance, Apptainer - la solution de conteneurisation choisie dans le cadre de DIAMOND - ne fonctionne nativement que sur Linux. Dans le cas où l'on ne peut pas l'utiliser sur une distribution Linux, il est nécessaire de passer par une machine virtuelle émulant un système Linux comme intermédiaire entre Apptainer et le noyau de tout autre système d'exploitation (comme Windows).

## Comment installer WSL2 sous Windows

La documentation officielle d'Apptainer préconise **Windows Subsystem for Linux (WSL2)** comme solution pour virtualiser un noyau Linux sur toutes les versions de Windows 10 et ultérieures.

Pour plus d'informations sur l'installation de WSL2 sur un système Windows, on peut se référer à la [documentation officielle de Windows](https://learn.microsoft.com/fr-fr/windows/wsl/install) ou à [celle d'Apptainer](https://apptainer.org/docs/admin/1.3/installation.html#windows).

En résumé, pour toutes les versions récentes de Windows (build `19041` et ultérieurs), l'installation se fait en une ligne au sein d'un PowerShell (avec droits administrateur) :

```bash
wsl --install
```

Dès lors, il ne reste plus qu'à redémarrer la machine puis à configurer le sous-système Linux que l'on souhaite utiliser (par exemple, Ubuntu 24.04) :

```bash
# Installation d'Ubuntu 24.04
wsl.exe --install Ubuntu-24.04
# Définition d'Ubuntu comme sous-système Linux à utiliser par défaut
wsl --set-default Ubuntu-24-04
```

Notez que, pour l'installation d'Ubuntu 24.04, vous aurez à renseigner un identifiant ainsi qu'un mot de passe utilisateur.

Dès lors, on peut lancer WSL2 depuis n'importe quel PowerShell ou terminal Windows grâce à la commande 

```bash
wsl.exe
```

Une fois WSL2 disponible avec la possibilité d'émuler une distribution Linux quelconque, on peut y installer Apptainer comme on le ferait sur n'importe quelle autre système d'exploitation Linux [en suivant la documentation officielle](https://apptainer.org/docs/admin/1.3/installation.html#installation-on-linux).

## Coût numérique

Si WSL2 permet d'utiliser les images Apptainer produites dans le cadre de DIAMOND de manière transparente sous Windows, la virtualisation sous-jacente s'accompagne nécessairement d'un surcoût numérique.

Estimer celui-ci requiert de répliquer et comparer le temps d'exécution d'un même calcul en utilisant Apptainer dans différentes conditions: sur une distribution Linux comme référence, et en utilisant Apptainer sur Windows avec WSL2. En effectuant ce type de manipulation (détail des tests ci-après), on observe que la solution Windows + WSL2 est sensiblement ($\approx 4.5\%$) plus lente que la référence Linux.

Ce surcoût est mineur au regard de l'exécution de nombreux outils *utilitaires* comme des logiciels de visualisation ou de traitement de données. En revanche, il peut s'avérer significatif dans le cas de calculs coûteux, comme ceux rencontrés avec les nombreux codes de simulation haute performance mis à disposition sur la plateforme DIAMOND.

#### Conditions de test et détail des résultats obtenus

Les calculs ont été effectués sur une machine en *dual-boot* Ubuntu 24.04.1 LTS/Windows 11 pour avoir le même matériel sous-jacent (CPU Intel i7-11800H 2.30GHz et 16Go de RAM). Pour maximiser les similarités logicielles, on travaille sur WSL2 avec la même distribution que notre référence (Ubuntu 24.04.1 LTS) et, dans chacun des cas, on s'assure d'utiliser une version d'Apptainer identique (1.3.4).

Pour chacune de ces installations d'Apptainer, on utilise une image test mise à disposition pour les [tutoriels DIAMOND](/documentation/freq_asked_questions/apptainer_parallel/). Celle-ci effectue $M$ multiplications de matrices carrées $N \times N$ aléatoires. Dans le cas du présent test, on effectue un calcul séquentiel (sur un seul cœur CPU) avec $M=500$ et $N=1000$ : `apptainer run tutorial-openmpi.sif 500 1000`.

Pour tenir compte des potentielles fluctuations de performance dues à la charge du CPU,on réplique 10 fois les calculs dans chacun des cas. Au final, on obtient les temps moyen $t^{Ubuntu} = 118.78$ s ($\sigma = 1.41$ s) et $t^{WSL2} = 124.15$ s ($\sigma = 0.79$ s).
>
<div class="text-center mt-4 mb-4">
	<img alt="WSL2 overhead" class="windows-overhead">
</div>
>
Au regard de ces temps moyens et des écart-types, il semble que le surcoût associé à WSL2 soit significatif. On peut s'en assurer en vérifiant la compatibilité de ces échantillons avec l'hypothèse des temps moyens identiques. On obtient (via la fonction `ttest_rel` du module Python `scipy.stats`) une valeur-*p* très petite ($2.5 \times 10^{-6}$) suggérant fortement que les temps mesurés suivent des distributions différentes et donc que la virtualisation avec WSL2 entraîne une hausse sensible en terme de temps d'exécution par rapport à une distribution Linux de référence. 

</div>
