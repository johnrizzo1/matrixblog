---
title: The Beauty of Bezier Curves
date: January 20, 2026
summary: Exploring the math behind smooth animations.
image: https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/B%C3%A9zier_2_big.gif/480px-B%C3%A9zier_2_big.gif
---

# Bezier Curves

Quadratic Bezier curves are defined by three points: $P_0, P_1, P_2$.

$$
B(t) = (1-t)^2 P_0 + 2(1-t)t P_1 + t^2 P_2
$$

where $t \in [0, 1]$.

These curves are the foundation of:
1. CSS Animations (`cubic-bezier`)
2. Vector Graphics (SVG paths)
3. Font Rendering (TrueType / OpenType)

Stay tuned for more!
