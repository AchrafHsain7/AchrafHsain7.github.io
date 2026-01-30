---
slug: "advML"
title: "Adversarial Vulnerability Transcends Computational Paradigms: Feature Engineering Provides No Defense Against Neural Adversarial Transfer"
authors:
  - Achraf Hsain
  - Ahmed Abdelkader
  - Emmanuel Baldwin Mbaya 
  - Hamoud Aljamaan

venue: "arXiv"
year: 2026
date: "2026-1-29"
image: "assets/images/advML.png"
arxiv: "https://arxiv.org/abs/2601.21323"
tags:
  - "Adversarial ML"
  - "HOG"
  - "Transfer Attacks"
  - "Computer Vision"
featured: true
bibtex: |
  @misc{hsain2026adversarialvulnerabilitytranscendscomputational,
      title={Adversarial Vulnerability Transcends Computational Paradigms: Feature Engineering Provides No Defense Against Neural Adversarial Transfer}, 
      author={Achraf Hsain and Ahmed Abdelkader and Emmanuel Baldwin Mbaya and Hamoud Aljamaan},
      year={2026},
      eprint={2601.21323},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2601.21323}, 
    }
---
Deep neural networks are vulnerable to adversarial examples--inputs with imperceptible perturbations causing misclassification. While adversarial transfer within neural networks is well-documented, whether classical ML pipelines using handcrafted features inherit this vulnerability when attacked via neural surrogates remains unexplored. Feature engineering creates information bottlenecks through gradient quantization and spatial binning, potentially filtering high-frequency adversarial signals. We evaluate this hypothesis through the first comprehensive study of adversarial transfer from DNNs to HOG-based classifiers. Using VGG16 as a surrogate, we generate FGSM and PGD adversarial examples and test transfer to four classical classifiers (KNN, Decision Tree, Linear SVM, Kernel SVM) and a shallow neural network across eight HOG configurations on CIFAR-10. Our results strongly refute the protective hypothesis: all classifiers suffer 16.6%-59.1% relative accuracy drops, comparable to neural-to-neural transfer. More surprisingly, we discover attack hierarchy reversal--contrary to patterns where iterative PGD dominates FGSM within neural networks, FGSM causes greater degradation than PGD in 100% of classical ML cases, suggesting iterative attacks overfit to surrogate-specific features that don't survive feature extraction. Block normalization provides partial but insufficient mitigation. These findings demonstrate that adversarial vulnerability is not an artifact of end-to-end differentiability but a fundamental property of image classification systems, with implications for security-critical deployments across computational paradigms.
