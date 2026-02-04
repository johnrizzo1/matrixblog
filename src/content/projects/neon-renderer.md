---
title: Neon Renderer
description: A WebGL-based rendering engine for real-time neon physics.
tags: [WebGL, Rust, WASM]
color: '#FF0055'
---

## Technical Deep Dive

This project explores the intersection of native performance and web accessibility. By writing the core physics engine in **Rust** and compiling to **WebAssembly (WASM)**, it achieves near-native frame rates in the browser.

### Key Features
- **Real-time Raymarching**: Uses SDFs (Signed Distance Functions) for infinite resolution shapes.
- **Bloom Effects**: Custom shader pipeline for that authentic "neon" glow.
- **Physics**: Particle collision simulation running at 60fps.

\`\`\`rust
// Example Rust Wasm snippet
#[wasm_bindgen]
pub fn update_physics(dt: f32) {
    // ... complex calculations
}
\`\`\`
