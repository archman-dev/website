## Build Article Compliance & Rewrite Meta-Prompt

This meta-prompt instructs the assistant to: (1) load the canonical build-article instruction file, (2) ingest a source article (MD or MDX), (3) evaluate compliance, (4) produce an improved, fully compliant, reader-complete version, and (5) emit both a Final Article and an Audit Report. Use deterministic, criteria-driven rewriting. Do not skip any required sections from the underlying build prompt.

---

### 1. Required Inputs (Provided via Context / Attachments)

1. Instruction Spec: `./build-article.v1.0.0.md` (the authoritative build article prompt).
2. Source Content: One article file (Markdown or MDX) to be evaluated and transformed.
3. (Optional) Supplemental referenced assets (images, code samples, diagrams) if present.

If any required input is missing, halt and emit: `BLOCKED: Missing <item>`.

---

### 2. High-Level Objectives

Deliver an article that:

1. Fully implements every mandatory requirement in the instruction spec.
2. Is self-contained: no external lookups required for comprehension by an informed but non-expert reader.
3. Preserves valid frontmatter & metadata (augmenting only where value-added and allowed).
4. Retains legitimate MDX components and fixes broken or unused ones.
5. Enhances clarity, depth, coherence, pedagogy, and correctness without introducing speculation.

---

### 3. Processing Pipeline (Execute in Order)

1. Parse Inputs

- Extract frontmatter (YAML or TOML) & store original keys.
- Detect MDX usage (imports, JSX-like tags, custom components).

2. Build Requirements Model

- Load all explicit rules from `build-article.v1.0.0.md` (sections, ordering, tone, formatting, coverage, length, examples, disclaimers, link conventions, etc.).
- Derive implicit requirements: completeness, logical progression, consistent terminology, accessibility.

3. Gap & Quality Analysis

- Map each requirement to: Compliant | Partially Compliant | Missing | Conflicting.
- Identify structural gaps (missing sections), topical gaps (unexplained concepts), and quality issues (ambiguity, redundancy, unverifiable claims).

4. Information Architecture Draft

- Produce a target outline satisfying all structural requirements and resolving gaps.

5. Rewrite & Synthesis

- Rewrite or expand content section-by-section following target outline.
- Integrate prerequisite explanations before dependent concepts.
- Provide layered explanation depth (overview → details → examples → edge cases).

6. Verification Pass

- Re-scan final text versus checklist to ensure zero Missing or Partially Compliant items remain (unless explicitly non-applicable—must justify).

7. Output Generation

- Emit Final Article first.
- Emit Audit Report second.

---

### 4. Structural & Content Requirements (Generic Template)

Adjust template to match the canonical instruction spec exactly. Example generic scaffold (replace / merge as spec dictates):

- Title (concise, specific, value-oriented)
- Executive Summary / Why It Matters
- Problem Context & Motivation
- Core Concepts & Definitions
- Architecture / Conceptual Model (include diagram description if no image)
- Step-by-Step Implementation / Process
- Detailed Examples & Variations
- Edge Cases, Failure Modes, Pitfalls
- Performance / Scalability / Reliability Considerations
- Security / Compliance Considerations (if relevant)
- Tooling & Ecosystem Integration
- Testing & Validation Strategies
- Observability / Monitoring Guidance
- Comparison / Alternatives / Trade-offs
- Anti-Patterns & What Not To Do
- FAQ (derive from likely reader questions)
- Glossary (terms introduced)

---

### 5. Style and Tone Guidelines

Follow instruction spec exactly. If absent, default to: precise, neutral-explanatory, pragmatic, accessible. Avoid marketing language. Prefer active voice. Use parallel structure in lists. Define each acronym on first use. Keep paragraph length digestible (2–5 sentences). Avoid fluffy filler.

---

### 6. MDX Handling Rules

1. Preserve existing valid imports; remove unused ones.
2. Do not introduce new custom components unless necessary for clarity; if introduced, ensure minimal, standard semantics.
3. Keep code fences using correct language identifiers; prefer runnable minimal examples.
4. For diagrams not present, include an ASCII or textual description placeholder clearly marked.

---

### 7. Frontmatter and Metadata

1. Preserve original keys and ordering where reasonable; add only value-added keys (e.g., `lastReviewed`, `tags`) if aligned with repo conventions.
2. Ensure `title` matches final article title.
3. Do not fabricate authors; retain existing.
4. Avoid date changes unless explicitly required.

---

### 8. Code and Example Standards

1. Prefer minimal examples that isolate the concept.
2. Show both correct and incorrect (anti-pattern) snippets where useful.
3. Annotate code with concise comments for non-obvious logic.
4. Use consistent naming aligned with domain vocabulary.

---

### 9. Linking and Cross-References

1. Use relative links for internal docs.
2. Ensure all links resolve logically (report unresolved references in Audit Report).
3. Avoid bare URLs—use descriptive link text.

---

### 10. Accessibility and Inclusivity

1. Provide alt text recommendations for images (if missing) in Audit Report.
2. Avoid idioms, culture-specific metaphors, unexplained jargon.

---

### 11. Evaluation Checklist (Apply Before Output)

For each requirement category, assert: PASS | FAIL with note.

Categories (expand based on build prompt):

1. Structural completeness
2. Coverage depth
3. Accuracy / correctness
4. Logical ordering
5. Terminology consistency
6. Example sufficiency
7. Edge cases handled
8. Pitfalls and anti-patterns included
9. Style / tone compliance
10. MDX validity
11. Metadata integrity
12. Accessibility considerations
13. No unverifiable claims
14. Internal link integrity
15. Output format adherence

All must be PASS or justified with explicit rationale plus remediation suggestion.

---

### 12. Output Format (Strict)

Emit EXACTLY two top-level sections in order:

#### Final Article

Complete frontmatter (YAML/TOML)

Body content

#### Audit Report

1. Summary Table (Requirement → Status → Notes)
2. Detected Gaps and Resolutions
3. Removed / Consolidated Content (brief rationale)
4. Added Sections (with justification)
5. Unresolved / Non-Applicable Items (with reason)
6. Suggested Future Enhancements (optional)

No additional commentary outside these sections.

---

### 13. Failure Handling

If blocking issues (e.g., corrupted frontmatter, unreadable instruction spec) occur, output only: `BLOCKED` and enumerated reasons.

---

### 14. Prohibited

1. Fabricating sources or metrics.
2. Introducing speculative future features.
3. Overly promotional tone.
4. Omitting mandated sections due to perceived redundancy (must instead consolidate while preserving coverage).

---

### 15. Example Skeleton (Do Not Output Literally)

```text
#### Final Article
---
title: <Title>
...frontmatter...
---
# Article Title

## Executive Summary

## Section Name
### Subsection Name

[Continue with unnumbered headers as per canonical structure]

#### Audit Report
| Requirement | Status | Notes |
| ----------- | ------ | ----- |
...rows...
Gaps and Resolutions: ...
```

**NOTE**: The example above shows proper header formatting - use standard Markdown headers (# ## ###) without any numbering in the final article.

---

### 16. Execution Instruction (For the Assistant)

Proceed only after both the build instruction file and source article are present in context. Then follow sections 1–12 verbatim.

---

### 17. Success Definition

The rewritten article requires no further manual augmentation to be publication-ready per the canonical build article spec and passes all checklist items with PASS (or justified N/A) statuses.

---

### 18. End

End of Meta-Prompt.
