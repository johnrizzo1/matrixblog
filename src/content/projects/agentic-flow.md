---
title: Agentic Flow
description: An AI agent orchestration framework for complex workflows.
tags: [Python, LLMs, Graph Theory]
color: '#00CCFF'
---

## Architecture

The system uses a **DAG-based execution model** to handle dependencies between agents. This allows for complex workflows where agents can work in parallel or strictly sequentially.

### Core Concepts
1. **Nodes**: Individual AI agents with specific system prompts.
2. **Edges**: Data flow paths between agents.
3. **State Manager**: A Redis-backed store for shared context.

It integrates with providers like OpenAI and Anthropic to enable multi-model cooperation.
