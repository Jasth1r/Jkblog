# Neural Networks

## History

Neural networks have gone through three major waves:

- **Cybernetics (1940s–1960s)**: earliest mathematical models of biological neurons
- **Connectionism (1980s–1990s)**: backpropagation, multi-layer networks
- **Deep learning (2006–present)**: increasing dataset sizes + increasing model complexity

The core idea comes from brain science: neurons process and transmit electrical information, forming networks through synaptic connections. Artificial neural networks are a statistical formalization of this process.

---

## 1. Neural Networks

### Biological Neurons

A neuron:
- Processes and transmits electric information
  - Connected to other neurons via synapses
  - In this way forms networks
- Contains cell body, axon, dendrites
  - Signal flows from axon of one neuron to dendrites of another
- If electrically excited enough, outputs a pulse to axon
  - Activates the synaptic connection of another neuron

The artificial neuron mimics this: take a weighted sum of inputs, pass through an activation function, produce an output.

---

## 2. Perceptron (Feed-Forward Network)

### Simple Perceptron

The simplest neural network has **two layers**:

- **Input layer**: only provides inputs $x_1, x_2$
- **Output layer** $y$

The output layer computes:

$$y = f(w_1 \cdot x_1 + w_2 \cdot x_2)$$

In the simplest case, $f$ is a **step function**:

$$y = \mathbb{1}(w_1 \cdot x_1 + w_2 \cdot x_2 > \bar{z})$$

where $\bar{z}$ is the **bias (threshold)** and $\mathbf{w}$ are the **weights**.

---

### Example: AND Perceptron

Logical AND operation: $y = x_1\ \text{AND}\ x_2$

| $x_1$ | $x_2$ | y |
|:---:|:---:|:---:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

This is **complete data without any errors**.  
We can set $w_1 = 1$, $w_2 = 2$, $\bar{z} = 1.5$ and the perceptron perfectly separates the classes.

---

### Vector Form

Rewrite inputs and weights as vectors:

$$\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}, \qquad \mathbf{w} = \begin{pmatrix} w_1 \\ w_2 \end{pmatrix}$$

The perceptron computation becomes:

$$y = \mathbb{1}(\mathbf{x}^\top \cdot \mathbf{w}) = \mathbb{1}\left((x_1 \quad x_2) \cdot \begin{pmatrix} w_1 \\ w_2 \end{pmatrix}\right) = \mathbb{1}(x_1 w_1 + w_2 x_2)$$

This is just a **dot product** followed by a threshold — a linear transformation plus activation.

---

### DIY: OR Perceptron

Logical OR operation: $y = x_1\ \text{OR}\ x_2$

| $x_1$ | $x_2$ | y |
|:---:|:---:|:---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

> **Exercise**: Find $w_1$, $w_2$, $b$ such that $y = \mathbb{1}(w_1 x_1 + w_2 x_2 > b)$ reproduces this table.

---

## 3. Hidden Layers

### Can You Do XOR?

Logical XOR (exclusive OR): $y = x_1\ \text{XOR}\ x_2$

| $x_1$ | $x_2$ | y |
|:---:|:---:|:---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**A single perceptron cannot solve XOR.** XOR is not linearly separable — no single straight line can divide the positive and negative examples. This is the fundamental limitation of a two-layer network.

**Solution**: Add a **hidden layer** between the input and output layers.

---

### Hidden-Layer Perceptron

A network with one hidden layer consists of three layers:

```
Input layer  →  Hidden layer  →  Output layer
```

With 2 hidden nodes, the computation proceeds as:

$$\chi_1 = \mathbf{x}^\top \cdot \mathbf{w}_{h1}, \qquad h_1 = \mathbb{1}(\chi_1 > b_{h1})$$
$$\chi_2 = \mathbf{x}^\top \cdot \mathbf{w}_{h2}, \qquad h_2 = \mathbb{1}(\chi_2 > b_{h2})$$
$$z = \mathbf{h}^\top \cdot \mathbf{w}_y, \qquad y = \mathbb{1}(z > b_y)$$

The hidden layer transforms the input into a new feature space where the problem may become linearly separable.

---

### Activation Functions

We do not have to use $\mathbb{1}(\cdot)$ as the activation function. Common alternatives:

**ReLU (Rectified Linear Unit)**:

$$\text{ReLU}(x) = \max(x, 0) = \begin{cases} 0 & x < 0 \\ x & x \geq 0 \end{cases}$$

- Simple to compute, does not suffer from vanishing gradients
- The default choice in modern deep learning

**Sigmoid (logistic)**:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

- Outputs values in $(0, 1)$, interpretable as probability
- Common in the output layer for binary classification

**Softmax (multi-category sigmoid)**:

$$S(\mathbf{x})_i = \frac{e^{x_i}}{\sum_j e^{x_j}}, \qquad i \in \{1, 2, \ldots, K\}$$

- Generalizes sigmoid to $K$ classes
- Outputs a probability distribution summing to 1
- Used in the output layer for multi-class classification

> **Key insight**: Without an activation function, stacking multiple linear layers collapses into a single linear transformation. Activation functions introduce **non-linearity**, which is what gives neural networks their expressive power.

---

### Full Neural Network

A **fully connected network** with 2 hidden layers:

```
Input layer  →  Hidden layer 1  →  Hidden layer 2  →  Output layer
x (K^I=4)       χ^1 (K^1=5)        χ^2 (K^2=4)        y (K^y=2)
```

**Components:**

① **Input layer** $\mathbf{x}$ — here $K^I = 4$ features

② **1st hidden layer** $\chi^1$ — here $K^1 = 5$ nodes.  
Node $i$ processes a weighted sum of $\mathbf{x}$:

$$\chi_i^1 = f(b_i^1 + \mathbf{w}_i^{1,T}\mathbf{x})$$

where $f(\cdot)$ is the activation function, $b_i^1$ the intercept (bias), $\mathbf{w}_i^1$ the weights.

③ **2nd hidden layer** $\chi^2$ — here $K^2 = 4$ nodes.  
Node $i$ processes a weighted sum of $\chi^1$:

$$\chi_i^2 = f(b_i^2 + \mathbf{w}_i^{1,T}\chi^1)$$

④ **Output layer** — here $K^y = 2$ components.  
Node $i$ processes 2nd hidden layer information:

$$y_i = g(b_i^y + \mathbf{w}_i^{y,T}\chi^2) \equiv f_k(\mathbf{X})$$

where $g(\cdot)$ is the output layer activation. Typically each node predicts the probability for one category.

---

### Parameters

For the network above ($K^I=4,\ K^1=5,\ K^2=4,\ K^y=2$):

- **Biases** $b$: $K^1 + K^2 + K^y = 5 + 4 + 2 = 11$
- **Weights** $w$: $K^1 \cdot K^I + K^2 \cdot K^1 + K^y \cdot K^2 = 20 + 20 + 8 = 48$

> **Warning**: Neural networks have a very large number of parameters.  
> **Easy to overfit!**

---

### Example: Handwritten Digit Recognition

Five different network architectures were compared on a handwritten digit task. All networks have sigmoidal output.

1. No hidden layer (multinomial logit)
2. 12-unit fully connected hidden layer
3. Two hidden layers, locally connected
4. Two hidden layers, locally connected, **shared weights**
   - Same operation on different parts of the image
5. Two hidden layers, locally connected, **two-level shared weights**

| Network | Architecture | Links | Weights | % Correct |
|---------|-------------|-------|---------|-----------|
| Net-1 | Single layer network | 2570 | 2570 | 80.0% |
| Net-2 | Two layer network | 3214 | 3214 | 87.0% |
| Net-3 | Locally connected | 1226 | 1226 | 88.5% |
| Net-4 | Constrained network 1 | 2266 | 1132 | 94.0% |
| Net-5 | Constrained network 2 | 5194 | 1060 | **98.4%** |

Key observations:
- More layers generally improves accuracy (Net-1 → Net-2)
- Local connectivity reduces the number of weights while improving accuracy (Net-3)
- **Weight sharing is the core idea behind CNNs**: Net-5 achieves 98.4% with only 1060 weights — far fewer than Net-2's 3214, yet far more accurate
- Structural inductive bias beats blindly adding parameters

---

## 4. Do It in sklearn

### sklearn Methods

```python
from sklearn.neural_network import MLPRegressor, MLPClassifier

m = MLPClassifier(hidden_layer_sizes=(10, 5))
m.fit(X, y)
m.predict(X)
m.score(X, y)    # R² for regressor, accuracy for classifier
```

`hidden_layer_sizes=(10, 5)` means: first hidden layer with 10 nodes, second with 5 nodes.

---

### Example: Yin-Yang Data

The yin-yang dataset is a classic non-linear classification benchmark — two classes interleaved in a spiral pattern, impossible to separate with a linear model.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.neural_network import MLPClassifier

# Load data
yy = pd.read_csv("../../data/toy/yin-yang-1000.csv.bz2", sep="\t")

# Extract features and labels
X = yy[["x", "y"]].values
y = yy.c.values

# Scatter plot
_ = plt.scatter(X[:,0], X[:,1], c=y, edgecolors="k")
```

---

### Training the Network

```python
m = MLPClassifier(hidden_layer_sizes=(20, 10), max_iter=500)
res = m.fit(X, y)

yhat = m.predict(X)    # on training data
print("Training accuracy:", np.mean(yhat == y))

## Training accuracy: 0.931
```

---

### Visualizing the Decision Boundary

```python
def DBPlot(m, X, y, grid=100):
    ex = np.linspace(X[:,0].min(), X[:,0].max(), grid)
    ey = np.linspace(X[:,1].min(), X[:,1].max(), grid)
    xx, yy = np.meshgrid(ex, ey)
    g = np.column_stack((xx.ravel(), yy.ravel()))
    hatY = m.predict(g).reshape(grid, grid)
    _ = plt.imshow(hatY,
                   extent=(ex.min(), ex.max(), ey.min(), ey.max()),
                   aspect="equal",
                   interpolation='none', origin='lower',
                   alpha=0.3)
    _ = plt.scatter(X[:,0], X[:,1], c=y, alpha=0.6, s=8)

DBPlot(m, X, y)
```

The decision boundary is a complex, non-linear surface — the network successfully captures the spiral structure in the data that no linear model could separate.

---

## Summary

| Concept | Description |
|---------|-------------|
| **Perceptron** | Two-layer network: input + output. Computes $y = f(\mathbf{x}^\top \mathbf{w})$. Only handles linearly separable problems. |
| **Hidden Layer** | Adds intermediate layers. Enables non-linear decision boundaries. |
| **Activation Function** | ReLU, Sigmoid, Softmax. Introduces non-linearity — essential for expressiveness. |
| **Parameters** | Weights + biases. Large networks have many parameters — prone to overfitting. |
| **Weight Sharing** | Same weights applied to different parts of input. Core idea of CNNs. Reduces parameters, improves generalization. |
| **MLPClassifier** | sklearn implementation. Control architecture with `hidden_layer_sizes`. |

> **Bottom line**: A neural network is a **function approximator**. By composing multiple non-linear transformations, it can approximate any continuous function (Universal Approximation Theorem). The challenge is always balancing **expressiveness** against **generalization**.
