# Bouquetly AI Engineering Map

This repository uses AI-Playground-Composer (APC) as its AI engineering system.

## Source of truth

Use this order when sources conflict:

1. Current explicit developer requirement
2. Human-confirmed product and engineering decisions
3. Current repository behavior and tests
4. Accepted architecture and decision documents
5. Existing implementation patterns
6. AI inference

Surface conflicts instead of silently choosing an important product or engineering decision.

## Context map

- [Architecture overview](docs/architecture/overview.md)
- [Stack](docs/architecture/stack.md)
- [Repository map](docs/architecture/repository-map.md)
- [Runtime and data flow](docs/architecture/runtime-and-data-flow.md)
- [Testing and quality](docs/architecture/testing-and-quality.md)
- [AI-understood application](docs/product/ai-understood-application.md)
- [Decisions](docs/decisions/README.md)
- [Plans](docs/plans/README.md)
- [Quality](docs/quality/README.md)
- [Agent registry](docs/agents/registry.md) (created after APC composition)

The custom Component Structure Guardian is AUTO-only. It protects human-navigable component and folder organization and joins UI, structure, and broad-refactor work through the Orchestrator without becoming a second coordinator.

## APC operation

The three APC skills live in `.github/skills/`. The eventual Playground Orchestrator is the only general-purpose coordinator; specialists are delegated workers. Plan Playground is read-only, Run Playground is the normal implementation path, and Run Playground (Low Credit) uses the APC Throughput Agent.

The Playgrounds may inspect, create, modify, test, and validate working-tree files. They must not create commits, push, create or merge pull requests, approve pull requests, or publish releases. Finish with **Ready for Developer Review**.

Human-confirmed context must remain distinguishable from AI inference. Keep context links current and update only the relevant files after meaningful work.