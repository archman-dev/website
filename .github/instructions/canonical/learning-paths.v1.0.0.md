# Learning Paths (v1.0.0)

## Purpose

- Companion to `docs-structure.v1.0.0.md`. Defines persona-based learning sequences referencing canonical sections. Canonical remains the source of topic taxonomy; this file only maps orders per persona and difficulty.

## Personas

- engineer (IC developer)
- architect (system/solution)
- lead (tech lead/principal)
- manager (eng/PM with architecture literacy goals)

## Conventions

- Paths reference canonical IDs and labels; do not rename topics here.
- Use short, progressive sequences (5–12 items). Prefer internal cross-links that already exist in `./docs/**`.
- Each step can include a brief rationale and optional prerequisites.

## Path: engineer-intro (Introductory)

1. 1.1 What Is Software Architecture
2. 1.2 System Thinking Basics → 1.2.1 Components, Connectors, Configurations → 1.2.2 Interfaces & Contracts
3. 1.3 Programming Paradigms (overview) → 1.3.1 Procedural → 1.3.2 OO → 1.3.3 Functional
4. 1.4 Basic Distributed Systems Concepts → 1.4.1 Latency/Throughput/Bandwidth → 1.4.2 Concurrency/Parallelism/Synchronization
5. 10.2 Performance & Scalability → 10.2.1 Latency Budgets
6. 12.1 Logging (structured, correlation IDs)
7. 11.1 Testing Pyramid (unit → integration basics)

## Path: engineer-distributed (Intermediate)

1. 6.1 Fundamentals → Fallacies, CAP/PACELC, Consistency Trade-offs
2. 6.2 Communication → API styles; Sync vs Async; Messaging
3. 6.3 Resilience & Reliability → Timeouts, Retries, Backoff, Circuit Breaker
4. 6.4 Data in Microservices → Sagas, Outbox/Inbox, CDC
5. 6.5 Observability → Logs/Metrics/Traces; SLO/SLI
6. 18.1 Reliability Patterns → Hedging, Bulkheads, Degradation
7. 14.4 Topologies → Multi-Region Active/Active vs Active/Passive

## Path: architect-core (Intermediate → Advanced)

1. 5.1 Strategic DDD → Domains/Subdomains → Bounded Contexts → Context Maps
2. 4. Architectural Styles → Monolith → Modular Monolith → Microservices → Hexagonal/Clean
3. 8. API & Interface Design → REST → Versioning → API Governance
4. 6.4 Data in Microservices → Transactions & Sagas; Event Sourcing (concepts)
5. 10.3 Availability & Reliability → DR, RTO/RPO
6. 12.4 Alerting → SLO-based alerts; Incident Response & Postmortems
7. 17.2 Processes → Design Reviews & Standards

## Path: lead-outcomes (Concise, outcomes-first)

1. 10.1 ISO/IEC 25010 (qualities map)
2. 13.1 CI/CD → Promotion, Blue/Green, Rolling, Canary
3. 12.5 Capacity & Performance Ops → Forecasting & Right-Sizing
4. 18.3 Capacity & Scalability → Vertical vs Horizontal; Queue Load Leveling
5. 17.3 Alignment → Conway’s Law & Team Structures

## Notes

- Paths are additive; readers can jump between adjacent difficulty levels.
- Keep sequences stable; revise quarterly alongside `lastReviewed` sweeps.
