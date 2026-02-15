[TARGET PAGE URL]: http://localhost:3000/docs/foundations/overview

Build a single, production-ready Docusaurus documentation page for the topic below. Follow the structure, depth, style, and constraints precisely.

Topic

- Name: <Topic name, e.g., "Circuit Breaker Pattern">
- One-sentence purpose: <What this page enables for practitioners>
- Audience: <Beginner/Intermediate/Advanced; roles like Backend/Platform/SRE/Architect>
- Prerequisites: <Key concepts readers should know>
- Related docs to cross-link: <List of /docs/... paths>
- Success criteria (what readers can do after): <3–5 bullets>
- Out of scope: <clarify exclusions to keep the page focused>

Content constraints (must-do)

- Write for practitioners: concise, actionable, trade-off aware.
- Length: ~900–1,400 words; avoid fluff; favor diagrams and examples where helpful.
- Headings: use H2/H3; no H1 (Docusaurus sets the title).
- Examples: include exactly 2–3 balanced examples
  - 1 real-world scenario (narrative + small diagram).
  - 1 short implementation sketch (Python or Go or Node.js; choose 1–2 max).
  - 1 operational example (observability, rollout, or failure handling).
- Diagrams: include 2–3 Mermaid diagrams (flows, components, sequence)
  - Each with a short caption and callouts for key decisions/failures.
  - Prefer: one flowchart, one sequence or component; optionally a data/interaction map.
  - Node budget: 12–18 max; verbs on edges; highlight failure paths where relevant.
- Use Docusaurus features:
  - Admonitions: note/tip/warning/danger only when meaningful.
  - Internal links: relative /docs/... paths with descriptive link text.
- Accessibility/SEO: short alt text for images, scannable lists, descriptive headings.
- Avoid: oversimplified examples, unreadable mega-diagrams, code walls >40 lines.

Page frontmatter

```md
---
id: <kebab-id>
title: <Clear, action-oriented title>
description: <Concise summary with core benefit + context>
sidebar_label: <Short label>
# Optional:
# sidebar_position: <number>
# slug: </docs/...>
tags: [<tag1>, <tag2>]
# keywords: [<keyword1>, <keyword2>]
---
