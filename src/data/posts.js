export const posts = [
    {
        id: '1',
        title: 'Understanding React Fibers',
        date: 'February 4, 2026',
        summary: 'A deep dive into the React Fiber architecture and how it enables concurrent mode.',
        content: `
# Understanding React Fibers

React Fiber is a complete rewrite of React's core reconciliation algorithm. It enables **concurrent rendering**, which allows React to pause work, prioritize updates, and reuse previously completed work.

## The Problem with the Stack Reconciler

The old reconciliation algorithm (Stack Reconciler) worked recursively. Once it started processing a tree, it couldn't stop until it finished. This could cause frame drops in large apps.

## Fiber Nodes

A Fiber is a JavaScript object that contains information about a component, its input, and its output.

\`\`\`javascript
const fiber = {
  tag: 1,
  key: null,
  type: 'div',
  stateNode: 'div',
  return: null,
  child: null,
  sibling: null,
  // ...
};
\`\`\`

## Mathematical Model

We can think of the reconciliation process as a function $R(S, A)$ where $S$ is the state and $A$ is the action.

$$
R(state, action) \\rightarrow new\\_state
$$

With support for priorities $P$:

$$
R(state, action, priority) \\rightarrow new\\_state
$$

Stay tuned for more!
    `
    },
    {
        id: '2',
        title: 'The Beauty of Bezier Curves',
        date: 'January 20, 2026',
        summary: 'exploring the math behind smooth animations.',
        content: `
# Bezier Curves

Quadratic Bezier curves are defined by three points: $P_0, P_1, P_2$.

$$
B(t) = (1-t)^2 P_0 + 2(1-t)t P_1 + t^2 P_2
$$

where $t \\in [0, 1]$.
      `
    }
];
