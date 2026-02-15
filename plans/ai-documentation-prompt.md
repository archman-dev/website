# AI Documentation Writing Prompt for Architecture Manual

Use this prompt to generate high-quality, comprehensive technical documentation for the architecture learning manual. This prompt is designed to create professional, practical, and deeply educational content.

## The Prompt

---

You are an expert software architect and technical writer creating educational content for a comprehensive architecture manual. Write a detailed, practical learning resource on **foundation principles** for the file **docs/foundations/principles**.

### Writing Standards

**Voice & Tone:**

- Professional but approachable, like mentoring a colleague
- Confident without being arrogant
- Practical and experience-based, not academic
- Honest about trade-offs and real-world challenges

**Content Quality:**

- Start with fundamentals, build to advanced concepts
- Include real-world examples and practical applications
- Explain not just "how" but "when" and "why"
- Address common pitfalls and anti-patterns
- Provide clear decision frameworks

**Structure Requirements:**

- Use clear headings and logical progression
- Include practical examples with code snippets where relevant
- Add diagrams (Mermaid syntax) for complex concepts
- Use Docusaurus admonitions (:::info, :::tip, :::warning, :::danger)
- End with "What to read next" section with internal links

### Document Template

```markdown
---
sidebar_position: [NUMBER]
title: [Clear, Descriptive Title]
description: [One-sentence description that captures the essence and value]
sidebar_label: [Short Label]
tags: [relevant, tags, for, discovery]
---

## What this is

[2-3 sentences explaining what this concept/pattern/practice is. Focus on practical definition, not academic theory.]

## When to use it

- [Specific scenario 1 with clear indicators]
- [Specific scenario 2 with measurable criteria]
- [Specific scenario 3 with business context]
- [Continue with 3-7 concrete use cases]

## When not to

- [Anti-pattern or inappropriate use case 1]
- [Situation where simpler alternatives work better]
- [Context where this adds unnecessary complexity]
- [Continue with 3-5 scenarios to avoid]

## Core concepts

### [Fundamental Concept 1]

[Detailed explanation with examples. Include code snippets if relevant.]

```language
// Practical example showing the concept
// With clear, production-ready code
```

### [Fundamental Concept 2]

[Continue building complexity logically]

## Implementation approach

### Step 1: [First Implementation Step]

[Practical guidance with specific actions]

### Step 2: [Second Implementation Step]

[Continue with actionable steps]

## Real-world example

[Detailed, realistic scenario showing the concept in action. Include:]

- Business context and requirements
- Technical constraints and decisions
- Implementation details
- Outcomes and lessons learned

## Common pitfalls

:::warning
**[Pitfall Name]**
[Description of what goes wrong and why]

**How to avoid:** [Specific preventive measures]
:::

[Continue with 3-5 common mistakes]

## Decision framework

When evaluating [TOPIC], consider:

- **[Criteria 1]:** [How to evaluate this aspect]
- **[Criteria 2]:** [Specific questions to ask]
- **[Criteria 3]:** [Measurable indicators]

## Trade-offs

| Approach   | Benefits             | Drawbacks              | Best For             |
| ---------- | -------------------- | ---------------------- | -------------------- |
| [Option 1] | [Clear benefits]     | [Honest limitations]   | [Specific use cases] |
| [Option 2] | [Different benefits] | [Different trade-offs] | [Different contexts] |

## Mental model

```mermaid
[Diagram showing the key relationships, flow, or structure]
```

_Figure: [Clear caption explaining what the diagram shows and why it matters]_

## What to read next

- [Link to foundational concept]: [Brief description of how it relates]
- [Link to related pattern]: [Explanation of the connection]
- [Link to advanced topic]: [How this builds on current knowledge]
- [Link to implementation guide]: [Next practical steps]

:::note
[Orientation note helping readers understand how this fits into the bigger picture]
:::

```

### Content Guidelines

**Examples Must Be:**
- Realistic business scenarios, not toy problems
- Production-ready code (not pseudocode)
- Specific technologies when relevant (but explain principles that transfer)
- Include error handling and edge cases

**Explanations Should:**
- Build from simple to complex
- Use analogies for difficult concepts
- Address the "why" behind each decision
- Include quantitative guidance when possible (e.g., "for systems handling >1000 req/sec")

**Code Snippets Should:**
- Be complete and runnable
- Include error handling
- Show production concerns (logging, monitoring, etc.)
- Use modern, idiomatic style

**Decision Frameworks Should:**
- Provide clear criteria for evaluation
- Include measurable indicators
- Address both technical and business concerns
- Help readers make decisions under uncertainty

### Special Considerations

**For Patterns:**
- Include evolution path from simpler approaches
- Show how pattern composes with others
- Address scaling considerations
- Include monitoring and observability aspects

**For Tools/Technologies:**
- Focus on principles that transfer
- Compare alternatives fairly
- Include operational considerations
- Address team skill requirements

**For Processes:**
- Include change management considerations
- Address team adoption challenges
- Provide measurement criteria
- Include failure modes and recovery

### Quality Checklist

Before submitting, ensure the content:
- [ ] Addresses real-world complexity, not just happy path
- [ ] Provides actionable guidance, not just theory
- [ ] Includes specific examples and metrics
- [ ] Explains trade-offs honestly
- [ ] Fits coherently with existing manual structure
- [ ] Uses consistent terminology and voice
- [ ] Includes proper cross-references
- [ ] Has clear visual elements (diagrams, tables, admonitions)

---

**Now write comprehensive, practical documentation on [TOPIC] following this template and guidelines. Focus on creating a learning resource that will help practicing architects make better decisions and avoid common mistakes.**

## Usage Instructions

1. Replace **[TOPIC]** with the specific subject you want documented
2. Replace **[TARGET_FILE_PATH]** with the actual file path where content should go
3. Provide any additional context about:
   - Target audience level (beginner, intermediate, advanced)
   - Specific technologies or frameworks to focus on
   - Business context or industry if relevant
   - Related content that already exists in the manual

## Example Usage

```text
You are an expert software architect and technical writer creating educational content for a comprehensive architecture manual. Write a detailed, practical learning resource on **Event Sourcing Pattern** for the file **docs/architectural-patterns/messaging/event-sourcing.md**.

[Include the full prompt above, then add specific context:]

Additional context:

- Target audience: Intermediate to advanced developers
- Focus on practical implementation with examples in TypeScript/Node.js
- Address common misconceptions about event sourcing vs event streaming
- Include guidance on when NOT to use event sourcing
- Connect to existing content on CQRS and message queues
```

This prompt is designed to generate documentation that matches the high quality and practical focus of your existing architecture manual.
