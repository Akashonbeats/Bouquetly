# Bouquetly APC Instructions

Bouquetly uses AI-Playground-Composer as its repository AI engineering system. Read [AGENTS.md](../AGENTS.md) and the linked APC context before meaningful work.

The repository is the source of truth. Resolve conflicts in this order: current explicit developer requirement, human-confirmed product and engineering decisions, current repository behavior and tests, accepted architecture and decision documents, existing implementation patterns, then AI inference. Surface unresolved conflicts.

The Playground Orchestrator is the central coordinator for meaningful work. It selects the smallest complete team, delegates implementation to Builder, sequences dependent work, validates the result, and routes failures. Specialists do not become competing general-purpose entry points.

Plan Playground is read-only. Run Playground is the normal implementation entry point. Run Playground (Low Credit) uses the APC Throughput Agent and must not claim full multi-agent coverage when it was not used.

Preserve human-confirmed context and label AI-derived product understanding **AI Understanding — Reference Only**. Do not create commits, push, create or merge pull requests, approve pull requests, or publish releases. Finish with **Ready for Developer Review**.