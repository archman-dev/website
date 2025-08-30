---
title: Claim Check
description: Split large payloads into a small message and an externalized blob referenced by a claim.
---

Brief: Place large payloads in external storage and pass only a reference over the message bus to avoid size limits and reduce coupling.

Include: when to use, blob lifecycle, security of the reference, retries, poison messages, and cost/perf trade-offs.
