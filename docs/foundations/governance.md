---
title: Governance
sidebar_label: Governance
---

Governance makes architecture decisions visible, consistent, and safe-to-change without slowing teams. Keep it lightweight, automation-first, and risk-based.

## Goals

- Align delivery with principles and [quality attributes](./quality-attributes)
- Enable fast, safe change with clear guardrails (not gates)
- Provide traceability via [ADRs](./adrs) and predictable review paths

## Operating model (lightweight)

- Principles → documented in [Design Principles](./principles)
- Standards → concise, versioned rules (naming, APIs, security, data)
- Guardrails → policy-as-code in CI/CD to auto-enforce standards
- Reviews → small, risk-based checks using a shared checklist
- Records → ADRs for significant decisions; link to tickets and docs

## Scope and responsibilities

- Product teams own day-to-day decisions and ADRs
- Architecture group curates standards, reference designs, and performs risk-based reviews
- Security/Compliance define mandatory controls; automation enforces them

## Process (risk-based)

1) Pre-review: team creates ADR(s), diagrams, risks, and test/rollout plan
2) Self-check: run automated guardrails; address failures
3) Review: lightweight async review for low/medium risk; live review only for high-risk changes
4) Decision: approve, approve-with-conditions, or request changes; record in ADR
5) Follow-up: verify conditions post-release; capture learnings

Use the [Architecture Review Checklist](../playbooks/architecture-review-checklist) to guide preparation and reviews.

## Automation (guardrails)

- Policy-as-code: OPA/Conftest, Checkov, kube-score, YAML/JSON schema
- Supply chain: SBOM, signature/attestation (SLSA provenance), dependency scanning
- Security: SAST/DAST/IAST, secrets scanning, container/IaC scanning
- Platform: quota/limit policies, network policies, namespace tenancy
- Cost: budget alerts, cost policies on size/instance/storage classes

## Artifacts

- Standards catalog (APIs, events, data, security, observability)
- Reference architectures and accelerators (templates, repos)
- Decision log (ADRs) and review outcomes

## Metrics (fitness functions)

- Lead time for high-risk changes reviewed
- Percentage of controls auto-enforced vs. manual
- Policy pass rate and time-to-fix violations
- Post-incident action completion for architectural issues

## Anti-patterns to avoid

- Ivory-tower approvals or rubber-stamping
- Process theater with long checklists and no automation
- One-size-fits-all rules that block experiments and learning

## Minimal checklist

- Is there an ADR for the significant decision with alternatives/trade-offs?
- Do tests and guardrails cover security, data, and reliability risks?
- Are rollback and blast-radius limits defined?
- Are observability signals (metrics, logs, traces, SLOs) in place?
- Are cost implications understood and budgeted?

