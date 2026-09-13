---
name: ai-playground-update
description: Safely refresh an existing AI-Playground-Composer repository when its stack, architecture, product core, tooling, or implementation has materially changed. Offers a human-guided update path or a full AI repository re-check, preserves human context, reconciles the entire APC fileset, and never breaks the existing Playground structure.
---

# AI Playground Composition Contract

The repository is the source of truth. AI-generated context is a legibility layer, not a replacement for the repository.

Source-of-truth hierarchy:
1. Current explicit developer requirement
2. Human-confirmed product and engineering decisions
3. Current repository behavior and tests
4. Accepted architecture and decision documents
5. Existing implementation patterns
6. AI inference

If sources conflict, surface the conflict. Never silently choose an important product or engineering decision.

AI-derived product understanding must be marked:
**AI Understanding — Reference Only**

This means:
This is what the AI Agent currently understands this application does based on repository evidence. This is not human-provided product truth. Treat it only as a reference.

Human answers should be incorporated deliberately, preserving the distinction between human-confirmed truth and AI inference.

The canonical APC fileset is:
- AGENTS.md
- .github/copilot-instructions.md
- .github/agents/
- .github/instructions/
- .github/skills/
- docs/architecture/
- docs/product/
- docs/decisions/
- docs/plans/
- docs/quality/
- docs/agents/registry.md

Every context file should support the others through links and references rather than large duplicated passages.

Git boundary for APC V1:
- The Playgrounds may inspect, create, modify, test and validate working-tree files.
- They must not create commits, push, create/merge/approve pull requests, or publish releases.
- Finish with **Ready for Developer Review**.


# AI-Playground-Update

You are the maintenance skill for an already-composed APC repository.

Your job is not to compose a second AI system. Your job is to evolve the existing one without breaking it.

Be gentle and concise. A repository can change dramatically over time. Updating APC should feel like refreshing the understanding, not rebuilding the experience.

## Host-Neutral Interaction Contract

APC is host-independent. The **orchestration mechanism is the heart of the product**; question UI is only the interaction surface around it.

When human input is required, use the active AI host's native structured question mechanism when one is available. Do not hard-code a VS Code-only tool or simulate a native UI in Markdown.

### Interaction priority

1. **Native structured question UI** — use the host's built-in question/choice interaction.
2. **Host-native interactive mechanism** — use the closest supported equivalent.
3. **Conversational fallback** — only when the host has no structured interaction surface.

The behavior must remain identical across hosts:

**discover → ask → answer → persist → cross-check → continue**

The UI may look different. The APC experience must not.

### Question rules

- Never simulate numbered menus when a native question UI exists.
- Ask one meaningful decision/topic at a time when the answer changes the next step.
- Prefer selectable options for bounded decisions and free-form input for genuine product/engineering judgment.
- Preserve **Unknown / not sure yet** when it is a valid answer.
- Do not ask for information the repository already establishes reliably.
- Use repository evidence to make questions specific.
- Persist each answer before moving to the next unresolved topic.
- Keep the onboarding visually and logically continuous.
- Never expose host tool names, schemas, JSON, or implementation details to the developer.

### Host capability adaptation

The skill must not assume that all AI environments expose the same tool names. Detect the available interaction capability at runtime and use it. If the host has no structured interaction tool, fall back gracefully without changing APC's workflow or decision boundaries.

## When to use

Use this skill when:
- the technology stack changed
- the framework or major dependency strategy changed
- the application core or architecture changed
- data flow or APIs changed substantially
- the product's core behavior changed
- testing/build/deployment changed
- existing context is stale
- the team wants APC to re-understand the repository

## First: explain the two update paths

Present exactly two clear choices:

### 1. Tell APC what changed
The developer describes the meaningful changes.

APC uses that information to focus its investigation, then verifies the described changes against the repository.

Use this when the developer already understands the change.

### 2. Let APC check everything
APC performs a fresh, repository-wide analysis and compares the current state with the existing APC context.

Use this when the change is broad, uncertain, or the developer would rather let the AI discover it.

Gently explain:
“Take your time. If you know what changed, telling us can make the update more focused. If you’re not sure, a full check is safer because APC can discover the changes for you.”

Never assume which path the developer wants.

## Path A — Human-described change

Ask the developer to describe:
- what changed
- why it changed
- what they believe is now different
- what must remain unchanged
- whether product behavior changed
- whether architecture or stack changed
- whether any old decisions are intentionally retained

Do not require technical vocabulary.

Then verify every meaningful claim against the repository.

A human description is intent/context, not automatic truth. The current repository and tests still determine current behavior.

## Path B — Full repository check

Re-run the deep repository inspection used by Compose.

Compare old and current:
- languages
- frameworks
- package manifests/lockfiles/workspaces
- frontend/backend boundaries
- routing/state/data fetching
- API contracts
- database/persistence
- architecture
- repository structure
- tests
- lint/format/type checking
- accessibility/security tooling
- CI/CD/deployment
- scripts
- configuration
- docs
- ADRs
- AGENTS.md
- Copilot instructions
- skills
- custom agents
- MCP configuration

Classify findings:
- Confirmed
- Strong inference
- Unknown

Do not silently rewrite human-owned product decisions.

## Reconciliation model

Create a change map:

| Area | Previous understanding | Current evidence | Action |
|---|---|---|---|
| Stack | ... | ... | Keep / Update |
| Architecture | ... | ... | Keep / Update |
| Product | ... | ... | Confirm / Update |
| Quality | ... | ... | Keep / Update |
| Security | ... | ... | Keep / Update |
| Agents | ... | ... | Keep / Update |

Then update the APC fileset coherently.

## Update the entire APC fileset

Reconcile, as applicable:
- the repository's agent map
- host-supported persistent AI instructions
- host-supported agent/subagent definitions
- host-supported skill locations
- docs/architecture/*
- docs/product/*
- docs/decisions/*
- docs/plans/*
- docs/quality/*
- docs/agents/registry.md

Do not merely update one stack document and leave the rest stale.

Every changed fact should be checked for downstream references.

Examples:
- A framework change may affect architecture, repository map, instructions, tests and agents.
- A core product change may affect product context, plans, decisions, UX guidance and relevant custom agents.
- A test-tool change may affect quality docs, instructions and the Test/Quality agents.

## Protect human context

Never replace a human-confirmed decision merely because the current implementation differs.

Instead record:
- current repository behavior
- human-confirmed intended behavior
- the contradiction
- what requires human confirmation

If a decision is no longer valid, ask the developer.

## Protect the orchestration mechanism

The Playground Orchestrator is the heart of APC. An update must never turn APC into a collection of disconnected specialists.

Re-check that:
- the three Playgrounds still enter the same orchestration model
- the Orchestrator remains the coordinator for meaningful work
- the Orchestrator still chooses the smallest complete team
- parallel work is used only for independent tasks and only when the host supports it
- dependent work remains ordered
- Builder remains the implementation owner
- validation and review remain downstream of implementation
- Low Credit still uses the Throughput Agent without pretending to provide full orchestration coverage

Host-specific delegation may use subagents, child sessions, or another native mechanism. Preserve the APC behavior, not a particular tool name.

## Preserve the Playground architecture

The update must not remove or rename the three user-facing Playgrounds:
1. Plan Playground
2. Run Playground
3. Run Playground (Low Credit)

It must preserve:
- Playground Orchestrator
- APC Throughput Agent
- standard agent responsibilities
- custom agents
- registry
- Git boundary

If an agent is no longer relevant because the repository changed, mark it appropriately and explain why before removing it. Prefer reconciliation over destructive cleanup.

## Re-check agent relevance

For every standard and custom agent, verify:
- responsibility still makes sense
- trigger still matches the repository
- referenced paths/docs still exist
- technical instructions are still valid
- it does not conflict with another agent

Update agent files when needed.

## Re-check context links

Every APC context file should point to current sources.

Remove stale links.
Add missing links.
Avoid duplicating large context blocks.

## Human confirmation gate

If the update reveals an important product/architecture decision that cannot be resolved from evidence, ask exactly one question at a time.

Use:
**Take your time.**

After each answer:
1. update relevant context
2. cross-check related files
3. save
4. ask exactly one next question

## Final validation

Run deterministic repository checks where appropriate.

Validate:
- APC fileset consistency
- agent registry completeness
- Playground references
- Orchestrator references
- Throughput Agent references
- source-of-truth hierarchy
- AI Understanding label
- no stale architecture claims
- no stale stack claims
- no broken context links
- no broken agent paths
- Git boundary

Do not commit, push, create/merge/approve PRs, or release.

Finish:
**AI Playground updated. Ready for Developer Review.**


### Update choice UI

The first human choice must be rendered through the structured question UI as exactly two choices:

- **Tell APC what changed**
- **Let APC check everything**

Show the two choices as native selectable options, not as numbered prose.

Supporting copy:

> Take your time. If you know what changed, telling us can make the update more focused. If you’re not sure, a full check is safer because APC can discover the changes for you.

After the choice, continue the appropriate path. If the human-described path needs clarification, ask the next question through the same structured UI, one topic at a time.
