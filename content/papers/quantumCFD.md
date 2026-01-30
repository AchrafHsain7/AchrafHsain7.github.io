---
slug: "quantumCFD"
title: "Quantum Generative Models for Computational Fluid Dynamics: A First Exploration of Latent Space Learning in Lattice Boltzmann Simulations"
authors:
  - Achraf Hsain
  - Fouad Mohammed Abbou

venue: "arXiv"
year: 2025
date: "2025-27-12"
image: "assets/images/QMLCFD.png"
arxiv: "https://arxiv.org/abs/2512.22672"
tags:
  - "Quantum ML"
  - "Computational Fluid Dynamics"
  - "Latent Spaces"
  - "AutoEncoders"
featured: false
bibtex: |
  @misc{hsain2025quantumgenerativemodelscomputational,
      title={Quantum Generative Models for Computational Fluid Dynamics: A First Exploration of Latent Space Learning in Lattice Boltzmann Simulations}, 
      author={Achraf Hsain and Fouad Mohammed Abbou},
      year={2025},
      eprint={2512.22672},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2512.22672}, 
    }
---
This paper presents the first application of quantum generative models to learned latent space representations of computational fluid dynamics (CFD) data. While recent work has explored quantum models for learning statistical properties of fluid systems, the combination of discrete latent space compression with quantum generative sampling for CFD remains unexplored. We develop a GPU-accelerated Lattice Boltzmann Method (LBM) simulator to generate fluid vorticity fields, which are compressed into a discrete 7-dimensional latent space using a Vector Quantized Variational Autoencoder (VQ-VAE). The central contribution is a comparative analysis of quantum and classical generative approaches for modeling this physics-derived latent distribution: we evaluate a Quantum Circuit Born Machine (QCBM) and Quantum Generative Adversarial Network (QGAN) against a classical Long Short-Term Memory (LSTM) baseline. Under our experimental conditions, both quantum models produced samples with lower average minimum distances to the true distribution compared to the LSTM, with the QCBM achieving the most favorable metrics. This work provides: (1)~a complete open-source pipeline bridging CFD simulation and quantum machine learning, (2)~the first empirical study of quantum generative modeling on compressed latent representations of physics simulations, and (3)~a foundation for future rigorous investigation at this intersection.

