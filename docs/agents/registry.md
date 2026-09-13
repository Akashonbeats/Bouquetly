# APC Agent Registry

All agents read [AGENTS.md](../../AGENTS.md) and relevant context under `docs/`. The Playground Orchestrator is the central coordinator. No agent may commit, push, create or merge pull requests, approve pull requests, or release.

## User-facing Playgrounds

| Agent | Mode | Purpose | Delegation |
| --- | --- | --- | --- |
| [Plan Playground](../../.github/agents/plan-playground.agent.md) | Manual | Read-only planning | None; ends with a plan |
| [Run Playground](../../.github/agents/run-playground.agent.md) | Manual | Normal development entry point | Delegates to Playground Orchestrator |
| [Run Playground (Low Credit)](../../.github/agents/run-playground-low-credit.agent.md) | Manual | Reduced orchestration for smaller tasks | Delegates to APC Throughput Agent |

## Coordinators

| Agent | Mode | Purpose | Trigger |
| --- | --- | --- | --- |
| [Playground Orchestrator](../../.github/agents/playground-orchestrator.agent.md) | Automatic | Select the smallest complete team, sequence work, validate, and stop at acceptance | Meaningful work from Run Playground |
| [APC Throughput Agent](../../.github/agents/apc-throughput.agent.md) | Automatic | Execute smaller tasks with less fan-out while preserving all boundaries | Low-credit work |

## Standard specialists

| Agent | Mode | Purpose | Trigger |
| --- | --- | --- | --- |
| [Planner](../../.github/agents/planner.agent.md) | Delegated | Evidence-backed plans without implementation | Meaningful uncertainty or multi-step work |
| [Architect](../../.github/agents/architect.agent.md) | Delegated | Boundaries, dependencies, data flow, and tradeoffs | Architecture or contract changes |
| [Builder](../../.github/agents/builder.agent.md) | Delegated | Accepted implementation and validation | Approved implementation work |
| [Reviewer](../../.github/agents/reviewer.agent.md) | Delegated | Findings on correctness, regressions, product fit, and policy | After meaningful implementation |
| [Test](../../.github/agents/test.agent.md) | Delegated | Appropriate lint, build, browser, or focused validation | Behavior or code changes |
| [Quality](../../.github/agents/quality.agent.md) | Delegated | Repository standards, UX quality, and accessibility | User-facing or quality-sensitive changes |
| [Security](../../.github/agents/security.agent.md) | Delegated | API, URL, metadata, and privacy threat review | API, share-link, or user-data changes |
| [UX](../../.github/agents/ux.agent.md) | Delegated | Romantic, calm, affectionate experience and accessible interaction | UI, layout, typography, color, or motion changes |
| [Context Maintainer](../../.github/agents/context-maintainer.agent.md) | Delegated | Keep APC context and registry coherent | After meaningful work or agent changes |

## Custom specialists

| Agent | Mode | Purpose | Trigger |
| --- | --- | --- | --- |
| [Component Structure Guardian](../../.github/agents/component-structure-guardian.agent.md) | AUTO | Keep component and folder structure clean, legible, and functionally safe | All UI work, structure changes, and broad refactors |

## Human boundaries

- Preserve the romantic bouquet-maker identity.
- Protect the color system, aesthetic, visual core, and existing share-link backward compatibility.
- Do not alter the intentional four-versus-five threshold distinction without approval.
- Keyboard use is important; apply sound accessibility judgment to the rest.
- Shared bouquets are client-rendered and no personal information is stored server-side.