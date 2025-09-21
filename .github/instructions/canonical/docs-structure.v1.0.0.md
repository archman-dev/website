# Comprehensive Software Architecture, Design & Programming Principles Wiki

## 0. Welcome

### 0.1 Audience & Scope

Newbies → professionals; architects, full stack, backend, security, data

### 0.2 Learning Order

Start simple → advanced; foundations → patterns → architecture → operations → governance

### 0.3 Notation & Depth

Headers-only; minimal clarifying notes only when essential

### 0.4 Cross-References

Links between sections for later population

### 0.5 Prerequisites

Basic programming, OS/networking, version control

## 1. Foundational Concepts

### 1.1 What Is Software Architecture

#### 1.1.1 Architecture vs. Design vs. Implementation

#### 1.1.2 Architectural Decision Impact & Cost of Change

#### 1.1.3 Stakeholders & Concerns

Business, product, ops, security, compliance

### 1.2 System Thinking Basics

#### 1.2.1 Components, Connectors, Configurations

#### 1.2.2 Interfaces & Contracts

#### 1.2.3 Abstractions & Encapsulation

### 1.3 Programming Paradigms

Influence on architecture

#### 1.3.1 Procedural / Structured

#### 1.3.2 Object-Oriented

#### 1.3.3 Functional

#### 1.3.4 Event-Driven & Reactive

#### 1.3.5 Declarative & Logic

#### 1.3.6 Aspect-Oriented

#### 1.3.7 Dataflow / Stream Processing

#### 1.3.8 Actor Model

### 1.4 Basic Distributed Systems Concepts

#### 1.4.1 Latency, Throughput, Bandwidth

#### 1.4.2 Concurrency, Parallelism, Synchronization

#### 1.4.3 Reliability, Faults, Partial Failure

#### 1.4.4 Time, Clocks, Clock Skew, Timeouts

#### 1.4.5 Idempotency, Retries, Backoff

#### 1.4.6 CAP, PACELC (trade-offs)

### 1.5 Data Fundamentals

#### 1.5.1 Data Modeling

- Conceptual
- Logical
- Physical

#### 1.5.2 Transactions & Isolation Levels

#### 1.5.3 Indexing & Query Optimization

#### 1.5.4 Consistency Models

- Strong
- Eventual
- Causal

#### 1.5.5 Data Lifecycle

Ingest → process → store → serve → archive

## 2. Core Design & Programming Principles

### 2.1 SOLID

#### 2.1.1 Single Responsibility

#### 2.1.2 Open/Closed

#### 2.1.3 Liskov Substitution

#### 2.1.4 Interface Segregation

#### 2.1.5 Dependency Inversion

### 2.2 General Principles

#### 2.2.1 DRY

Don’t repeat yourself

#### 2.2.2 KISS

Simplicity first

#### 2.2.3 YAGNI

Avoid speculative generality

#### 2.2.4 SoC

Separation of concerns

#### 2.2.5 High Cohesion, Low Coupling

#### 2.2.6 Composition Over Inheritance

#### 2.2.7 Law of Demeter

Least knowledge

#### 2.2.8 Encapsulate What Varies

#### 2.2.9 Fail Fast

#### 2.2.10 Principle of Least Astonishment

#### 2.2.11 Immutability Where Possible

### 2.3 GRASP

Responsibility Assignment

#### 2.3.1 Information Expert

#### 2.3.2 Creator

#### 2.3.3 Controller

#### 2.3.4 Low Coupling

#### 2.3.5 High Cohesion

#### 2.3.6 Polymorphism

#### 2.3.7 Pure Fabrication

#### 2.3.8 Indirection

#### 2.3.9 Protected Variations

### 2.4 Coding Discipline

#### 2.4.1 Naming, Readability, Intent

#### 2.4.2 Error Handling & Exceptions

#### 2.4.3 Input Validation & Defensive Programming

#### 2.4.4 Configuration vs. Code

#### 2.4.5 Feature Flags & Toggles

#### 2.4.6 Backward Compatibility & Versioning

#### 2.4.7 Internationalization (i18n) & Localization (l10n)

#### 2.4.8 Accessibility (a11y)

## 3. Design Patterns (Language-Agnostic)

### 3.1 Creational

#### 3.1.1 Factory Method

#### 3.1.2 Abstract Factory

#### 3.1.3 Builder

#### 3.1.4 Prototype

#### 3.1.5 Singleton

Use sparingly

#### 3.1.6 Object Pool

#### 3.1.7 Dependency Injection / Inversion of Control

### 3.2 Structural

#### 3.2.1 Adapter

#### 3.2.2 Bridge

#### 3.2.3 Composite

#### 3.2.4 Decorator

#### 3.2.5 Facade

#### 3.2.6 Flyweight

#### 3.2.7 Proxy

#### 3.2.8 Module / Package

### 3.3 Behavioral

#### 3.3.1 Chain of Responsibility

#### 3.3.2 Command

#### 3.3.3 Interpreter

#### 3.3.4 Iterator

#### 3.3.5 Mediator

#### 3.3.6 Memento

#### 3.3.7 Observer / Pub-Sub

#### 3.3.8 State

#### 3.3.9 Strategy

#### 3.3.10 Template Method

#### 3.3.11 Visitor

#### 3.3.12 Null Object

#### 3.3.13 Specification

### 3.4 Concurrency Patterns

#### 3.4.1 Producer–Consumer

#### 3.4.2 Thread Pool

#### 3.4.3 Reactor

#### 3.4.4 Proactor

#### 3.4.5 Active Object

#### 3.4.6 Guarded Suspension

#### 3.4.7 Balking

#### 3.4.8 Double-Checked Locking

Cautions

#### 3.4.9 Futures/Promises, Async/Await

### 3.5 Enterprise Integration Patterns

High-level headings

#### 3.5.1 Message Channel, Queue, Topic

#### 3.5.2 Pipes and Filters

#### 3.5.3 Content-Based Router, Message Filter

#### 3.5.4 Splitter, Aggregator, Resequencer

#### 3.5.5 Request–Reply, Correlation Id

#### 3.5.6 Competing Consumers, Pub-Sub

#### 3.5.7 Dead Letter Channel, Poison Message Handling

## 4. Architectural Styles

System-Level

### 4.1 Layered (N-Tier)

### 4.2 Client–Server / 3-Tier

### 4.3 Monolith

Modular Monolith

### 4.4 Microkernel (Plug-in)

### 4.5 Event-Driven Architecture (EDA)

### 4.6 Pipes & Filters / Pipeline

### 4.7 Service-Oriented Architecture (SOA)

### 4.8 Microservices

### 4.9 Hexagonal / Ports & Adapters

### 4.10 Clean / Onion Architecture

### 4.11 CQRS

As style-level organization

### 4.12 Serverless

FaaS-centric systems

### 4.13 Space-Based Architecture

In-memory grid

### 4.14 Peer-to-Peer (P2P), Mesh, Gossip

### 4.15 Micro-Frontends

UI composition

### 4.16 Event Sourcing

Paired with CQRS frequently

## 5. Domain-Driven Design (DDD)

### 5.1 Strategic Design

#### 5.1.1 Domains & Subdomains

- Core
- Supporting
- Generic

#### 5.1.2 Bounded Contexts

#### 5.1.3 Context Maps

- Partnership
- Shared Kernel
- Customer–Supplier
- Conformist
- ACL
- OHS

#### 5.1.4 Ubiquitous Language

#### 5.1.5 Domain Vision & Capability Mapping

#### 5.1.6 Team Topologies & Conway’s Law Alignment

### 5.2 Tactical Design

#### 5.2.1 Entities

#### 5.2.2 Value Objects

#### 5.2.3 Aggregates & Aggregate Roots

#### 5.2.4 Domain Services

#### 5.2.5 Repositories

#### 5.2.6 Factories

#### 5.2.7 Domain Events

#### 5.2.8 Modules / Packages

### 5.3 DDD in Practice

#### 5.3.1 Event Storming Workshops

#### 5.3.2 Strategic Decomposition to Services

#### 5.3.3 ACL for Legacy Integration

#### 5.3.4 Aligning Bounded Contexts to Microservices

#### 5.3.5 Evolving Models

Refactoring toward deeper insight

## 6. Distributed Systems & Microservices

Deep Dive

### 6.1 Fundamentals

#### 6.1.1 Fallacies of Distributed Computing

#### 6.1.2 CAP & PACELC

#### 6.1.3 Consistency Models & Trade-offs

#### 6.1.4 Partition Tolerance & Failure Modes

#### 6.1.5 Idempotency

Exactly-Once (pragmatics), At-Least-Once

### 6.2 Communication

#### 6.2.1 API Styles

- REST
- gRPC
- GraphQL
- WebSockets
- SSE

#### 6.2.2 Sync vs. Async

#### 6.2.3 Messaging

- Queues
- Topics
- Streams
- Log-based

#### 6.2.4 API Gateway

Routing, aggregation, offloading

#### 6.2.5 Service Discovery

Client/server-side, DNS-based

#### 6.2.6 Service Mesh

Sidecars, traffic policy, mTLS, retries

#### 6.2.7 Webhooks & Callbacks

Signing, retries

### 6.3 Resilience & Reliability Patterns

#### 6.3.1 Timeouts, Retries, Exponential Backoff, Jitter

#### 6.3.2 Circuit Breaker

#### 6.3.3 Bulkhead Isolation

#### 6.3.4 Rate Limiting & Throttling

#### 6.3.5 Load Shedding, Backpressure

#### 6.3.6 Health Probes

- Liveness/readiness
- Self-Healing

#### 6.3.7 Leader Election, Consensus

Raft/Paxos – conceptual

### 6.4 Data in Microservices

#### 6.4.1 Database per Service

#### 6.4.2 Transaction Boundaries & Sagas

Orchestration/choreography

#### 6.4.3 Outbox/Inbox, Change Data Capture (CDC)

#### 6.4.4 CQRS & Read Models

#### 6.4.5 Event Sourcing

- Streams
- Snapshots
- Projections

#### 6.4.6 Data Replication, Sharding, Partitioning

#### 6.4.7 Schema Evolution & Versioning

### 6.5 Observability

Cross-ref Section 10

#### 6.5.1 Logs

Structured, correlation IDs

#### 6.5.2 Metrics

- RED/USE
- Golden signals

#### 6.5.3 Traces

Distributed tracing

#### 6.5.4 SLO/SLI/SLA & Error Budgets

### 6.6 Anti-Patterns

Distributed

#### 6.6.1 Distributed Monolith

#### 6.6.2 Chatty Services

#### 6.6.3 Shared Database between Services

#### 6.6.4 Nano-Services

Too fine-grained

#### 6.6.5 Overuse of Synchronous Calls

## 7. Data Architecture & Persistence

### 7.1 Storage Models

#### 7.1.1 Relational (RDBMS)

#### 7.1.2 Key-Value Stores

#### 7.1.3 Document Stores

#### 7.1.4 Wide-Column Stores

#### 7.1.5 Graph Databases

#### 7.1.6 Time-Series Databases

#### 7.1.7 Search Engines / Inverted Index

#### 7.1.8 In-Memory Caches & Data Grids

#### 7.1.9 Object Storage (blobs)

### 7.2 Data Modeling & Access

#### 7.2.1 Normalization vs. Denormalization

#### 7.2.2 ORMs, Data Mapper, Active Record

#### 7.2.3 Query Patterns (pagination, filtering, sorting)

#### 7.2.4 Indexing Strategies & Hotspots

#### 7.2.5 Multi-Tenancy (pooled vs. siloed)

### 7.3 Performance & Scale

#### 7.3.1 Caching Patterns (cache-aside, write-through, write-behind)

#### 7.3.2 Read Replicas & Fan-Out

#### 7.3.3 Sharding Strategies & Rebalancing

#### 7.3.4 Materialized Views & Precomputation

#### 7.3.5 Search Offloading & Aggregations

### 7.4 Data Pipelines & Analytics

#### 7.4.1 Batch vs. Streaming

#### 7.4.2 ETL/ELT, Data Lakes, Warehouses

#### 7.4.3 Event Streams, Log-based Integration

#### 7.4.4 Data Quality, Lineage, Catalogs, Governance

#### 7.4.5 ML Feature Stores & Model Serving (architecture-level)

### 7.5 Data Lifecycle & Compliance

#### 7.5.1 Retention & Archival

#### 7.5.2 PII Classification, Masking, Tokenization

#### 7.5.3 Right to Erasure / Data Portability (privacy)

#### 7.5.4 Auditing & Tamper-Evident Logs

## 8. API & Interface Design

### 8.1 RESTful API Design

#### 8.1.1 Resources, Representations, HATEOAS (optional)

#### 8.1.2 URI Design, Methods, Status Codes

#### 8.1.3 Filtering, Sorting, Pagination

#### 8.1.4 Error Formats & Problem Details

#### 8.1.5 Concurrency Control (ETags)

### 8.2 GraphQL (schema, resolvers, batching)

### 8.3 gRPC / RPC (contracts, streaming, deadlines)

### 8.4 Async APIs (AsyncAPI, event contracts)

### 8.5 Versioning Strategies (URI, header, schema evolution)

### 8.6 Security (authn/z, scopes, claims, consent)

### 8.7 Webhooks (delivery, retries, signatures)

### 8.8 API Governance & API First (design-first, style guides, linting)

## 9. Security Architecture (Secure by Design)

### 9.1 Principles & Models

#### 9.1.1 CIA Triad, Zero Trust

#### 9.1.2 Least Privilege, Separation of Duties

#### 9.1.3 Defense in Depth, Secure Defaults

#### 9.1.4 Complete Mediation, Fail Securely

### 9.2 Threat Modeling

#### 9.2.1 STRIDE, LINDDUN, PASTA (frameworks)

#### 9.2.2 Assets, Attack Surfaces, Trust Boundaries

#### 9.2.3 Abuse/Misuse Cases

### 9.3 Identity & Access

#### 9.3.1 Authentication (MFA, federation, SSO)

#### 9.3.2 Authorization (RBAC, ABAC, ReBAC, PBAC)

#### 9.3.3 Session & Token (JWT/Opaque, refresh, rotation)

#### 9.3.4 Secrets Management (vaults, KMS, rotation)

### 9.4 Data Protection

#### 9.4.1 Encryption in Transit (TLS, mTLS)

#### 9.4.2 Encryption at Rest (envelope encryption)

#### 9.4.3 Key Management (HSM/KMS, rotation, separation)

#### 9.4.4 Hashing & Password Storage

#### 9.4.5 Tokenization & Pseudonymization

### 9.5 Application Security

#### 9.5.1 Input Validation & Output Encoding

#### 9.5.2 CSRF, Clickjacking, CORS

#### 9.5.3 Injection, XSS, SSRF, RCE (classes)

#### 9.5.4 Dependency & Supply Chain (SBOM, signing)

#### 9.5.5 SAST, DAST, IAST, RASP

### 9.6 Network & Platform Security

#### 9.6.1 Segmentation, Micro-Perimeters

#### 9.6.2 Firewalls, WAF, API Gateways

#### 9.6.3 Endpoint Hardening & Baselines

#### 9.6.4 Container/K8s Security (admission, PSP/PSA)

### 9.7 Security Operations

#### 9.7.1 Logging for Security, SIEM, SOAR

#### 9.7.2 Vulnerability Management & Patch

#### 9.7.3 Incident Response & Forensics

#### 9.7.4 Compliance Frameworks (PCI-DSS, HIPAA, GDPR – conceptually)

## 10. Quality Attributes (Non-Functional Requirements)

### 10.1 ISO/IEC 25010 (conceptual mapping)

### 10.2 Performance & Scalability

#### 10.2.1 Latency Budgets, SLAs, SLOs

#### 10.2.2 Load/Stress/Soak/Spike Testing

#### 10.2.3 Profiling & Bottleneck Analysis

#### 10.2.4 Caching, Batching, Queueing

### 10.3 Availability & Reliability

#### 10.3.1 Redundancy, Replication, Failover

#### 10.3.2 Graceful Degradation, Feature Kill-Switches

#### 10.3.3 DR, RTO/RPO, Backups & Restores

### 10.4 Maintainability & Modifiability

#### 10.4.1 Modularity, Encapsulation

#### 10.4.2 Contracts & Compatibility

#### 10.4.3 Code Health Metrics & Refactoring

### 10.5 Testability

#### 10.5.1 Test Isolation, Determinism

#### 10.5.2 Test Data Management

#### 10.5.3 Contract & Consumer-Driven Tests

### 10.6 Observability (cross-ref Section 12)

### 10.7 Usability & Accessibility (a11y)

### 10.8 Interoperability & Portability

### 10.9 Cost Efficiency (FinOps)

## 11. Testing Strategy (Architecture-Level)

### 11.1 Testing Pyramid

#### 11.1.1 Unit

#### 11.1.2 Component/Integration

#### 11.1.3 Contract (CDC)

#### 11.1.4 End-to-End / System

#### 11.1.5 Acceptance (UAT)

### 11.2 Non-Functional Testing

#### 11.2.1 Performance (load, stress, spike, soak)

#### 11.2.2 Security (pen tests, scans, fuzzing)

#### 11.2.3 Resilience (chaos engineering)

#### 11.2.4 Accessibility

### 11.3 Test Automation

#### 11.3.1 CI Integration

#### 11.3.2 Flake Management & Quarantine

#### 11.3.3 Test Data, Fixtures, Synthetic Data

### 11.4 Test Environments

#### 11.4.1 Ephemeral Environments & Preview Apps

#### 11.4.2 Data Seeding & Masking

#### 11.4.3 Parity with Production

## 12. Observability & Operations

### 12.1 Logging

#### 12.1.1 Structured Logs, Context, Correlation IDs

#### 12.1.2 Log Levels & Governance

#### 12.1.3 Retention & Privacy

### 12.2 Metrics

#### 12.2.1 Golden Signals (latency, traffic, errors, saturation)

#### 12.2.2 RED/USE Methodologies

#### 12.2.3 Dashboards & KPIs

### 12.3 Tracing

#### 12.3.1 Trace Context Propagation

#### 12.3.2 Service Maps

### 12.4 Alerting

#### 12.4.1 SLO-Based Alerts vs Static Thresholds

#### 12.4.2 Runbooks & On-Call

#### 12.4.3 Incident Response Lifecycle & Postmortems

### 12.5 Capacity & Performance Ops

#### 12.5.1 Forecasting & Right-Sizing

#### 12.5.2 Load Testing in Pipelines

#### 12.5.3 Cost Monitoring & FinOps Integration

## 13. Delivery Engineering (DevOps/SRE)

### 13.1 CI/CD Pipelines

#### 13.1.1 Build, Test, Scan

#### 13.1.2 Promotion, Approvals, Gates

#### 13.1.3 Blue-Green, Rolling, Canary

### 13.2 Infrastructure as Code

#### 13.2.1 Declarative vs Imperative

#### 13.2.2 Policy as Code & Guardrails

#### 13.2.3 Drift Detection

### 13.3 Environments & Releases

#### 13.3.1 Environment Strategy (dev/test/stage/prod)

#### 13.3.2 Secrets & Config Management

#### 13.3.3 Release Versioning & Notes

### 13.4 Reliability Engineering

#### 13.4.1 Error Budgets & Toil

#### 13.4.2 GameDays & Chaos

#### 13.4.3 Auto-Remediation & Runbooks

## 14. Cloud-Native & Runtime Topology

### 14.1 Compute Models

#### 14.1.1 VMs

#### 14.1.2 Containers

#### 14.1.3 Serverless (FaaS/managed services)

### 14.2 Orchestration

#### 14.2.1 Scheduling, Autoscaling

#### 14.2.2 Service Discovery, Ingress, Egress

#### 14.2.3 Stateful Workloads (concepts)

### 14.3 Networking

#### 14.3.1 Load Balancing (L4/L7)

#### 14.3.2 Network Policies, mTLS

#### 14.3.3 CDN & Edge

### 14.4 Topologies

#### 14.4.1 Single Region, Multi-Zone

#### 14.4.2 Multi-Region Active/Active vs Active/Passive

#### 14.4.3 Disaster Recovery Patterns

### 14.5 Platform Concerns

#### 14.5.1 Image/Artifact Management

#### 14.5.2 SBOM, Supply Chain, Signing

#### 14.5.3 Cost Controls & Quotas

## 15. Frontend & Mobile Architecture (Technology-Agnostic)

### 15.1 Frontend Architecture

#### 15.1.1 MVC/MV* (MVVM, MVI) Concepts

#### 15.1.2 Component-Based Design & Design Systems

#### 15.1.3 State Management (conceptual)

#### 15.1.4 SSR/SSG/ISR (high-level)

#### 15.1.5 Performance (TTFB, TTI, Core Web Vitals – conceptual)

#### 15.1.6 Micro-Frontends

#### 15.1.7 Offline-First & Caching (PWA concepts)

### 15.2 Mobile Architecture

#### 15.2.1 MVVM/Clean for Mobile

#### 15.2.2 Offline Sync & Conflict Resolution

#### 15.2.3 Background Tasks & Notifications

#### 15.2.4 Battery/Network Constraints

#### 15.2.5 Store Distribution & Release Strategy

## 16. Documentation & Modeling

### 16.1 Views & Viewpoints

#### 16.1.1 4+1 Model

#### 16.1.2 C4 Model (Context, Container, Component, Code)

#### 16.1.3 Runtime, Deployment, Data Views

### 16.2 Diagramming & Notation

#### 16.2.1 UML (component, sequence, deployment)

#### 16.2.2 Diagrams as Code (PlantUML, Mermaid)

#### 16.2.3 Diagram Governance (legends, updates)

### 16.3 Architecture Decision Records (ADR)

#### 16.3.1 Template & Rationale

#### 16.3.2 Catalog & Traceability

#### 16.3.3 Linking to Code & Docs

### 16.4 Reference Architectures & Playbooks

#### 16.4.1 Common Stacks (web, data, event-driven)

#### 16.4.2 Architecture Checklists

#### 16.4.3 Risk Registers & Mitigation Plans

## 17. Architecture Governance & Organization

### 17.1 Roles

#### 17.1.1 Enterprise Architect

#### 17.1.2 Solution/System Architect

#### 17.1.3 Security/Data/Platform Architects

#### 17.1.4 Tech Leads & Principal Engineers

### 17.2 Processes

#### 17.2.1 Architecture Principles & Standards

#### 17.2.2 Review Boards & Design Reviews

#### 17.2.3 Exception Handling & Waivers

#### 17.2.4 Technology Roadmaps & Sunset Plans

### 17.3 Alignment

#### 17.3.1 Conway’s Law & Team Structures

#### 17.3.2 Product & Architecture Alignment

#### 17.3.3 Change Management & Communication

### 17.4 Compliance & Risk

#### 17.4.1 Regulatory Considerations (conceptual)

#### 17.4.2 Data Residency & Sovereignty

#### 17.4.3 Auditability & Evidence

## 18. Reliability, Resilience & Performance Engineering

### 18.1 Reliability Patterns

#### 18.1.1 Hedging Requests, Timeouts, Retries

#### 18.1.2 Bulkheads, Circuit Breakers

#### 18.1.3 Graceful Degradation, Load Shedding

### 18.2 Performance Engineering

#### 18.2.1 Performance Budgets

#### 18.2.2 Hot Paths, Caching, Memoization

#### 18.2.3 Batching & Nagle-like Strategies (conceptual)

### 18.3 Capacity & Scalability

#### 18.3.1 Vertical vs Horizontal Scaling

#### 18.3.2 Elasticity & Autoscaling Triggers

#### 18.3.3 Queue-Based Load Leveling

## 19. Modernization & Migration

### 19.1 Strangler Fig Pattern

### 19.2 Branch by Abstraction

### 19.3 Incremental Schema Migrations (zero-downtime)

### 19.4 Legacy Encapsulation (facades, ACL)

### 19.5 Data Migration (dual-writes, backfill, CDC)

### 19.6 Decomposition of Monoliths (domain-aligned)

## 20. Anti-Patterns & Pitfalls

### 20.1 Big Ball of Mud

### 20.2 Spaghetti Code

### 20.3 God Object / God Class

### 20.4 Golden Hammer

### 20.5 Boat Anchor / Lava Flow

### 20.6 Copy–Paste Programming (violates DRY)

### 20.7 Premature Optimization

### 20.8 Distributed Monolith

### 20.9 Chatty Interfaces & Tight Coupling

### 20.10 Over-Abstracting / Too Many Layers

### 20.11 Anemic Domain Model

### 20.12 Shared Database Across Services

### 20.13 Overuse of Patterns (patternitis)

### 20.14 Flaky Tests & Non-Determinism

## 21. Specialized Domains (Architecture Considerations)

### 21.1 Real-Time Systems (latency, determinism)

### 21.2 Streaming & Event Processing (exactly/at-least-once)

### 21.3 IoT & Edge (connectivity, OTA updates, constraints)

### 21.4 ML Systems (feature stores, model serving, drift)

### 21.5 High-Compliance Systems (audit, segregation of duties)

### 21.6 Gaming/Graphics (loops, ECS patterns – conceptual)

### 21.7 Embedded & Firmware (resource constraints)

### 21.8 FinTech/Payments (idempotency, reconciliation)

### 21.9 E-Commerce (catalog, order, checkout, promotions)

### 21.10 Social/Communication (feeds, fanout, moderation)

## 22. Checklists & Templates (for later content)

### 22.1 Architecture Review Checklist (qualities, risks, ops)

### 22.2 Threat Model Template

### 22.3 ADR Template

### 22.4 API Review Checklist

### 22.5 Readiness/Liveness & SLO Checklist

### 22.6 Cost Review & FinOps Checklist

### 22.7 Incident Postmortem Template

## 23. Algorithms & Data Structures (LeetCode Preparation)

### 23.1 Problem-Solving Strategies

#### 23.1.1 Problem Analysis

- Understanding requirements
- Identifying patterns
- Choosing data structures
- Time/space tradeoffs
- Edge case handling

#### 23.1.2 Implementation Techniques

- Code organization
- Variable naming
- Error handling
- Testing strategies
- Optimization techniques

#### 23.1.3 Interview Preparation

- Common question patterns
- Time management
- Communication skills
- Code review
- Follow-up questions

### 23.2 Fundamentals & Prerequisites

#### 23.3.1 Time & Space Complexity Analysis

- Big O, Big Theta, Big Omega notation
- Best, Average, Worst case analysis
- Common complexity classes (O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ))
- Amortized analysis
- Space-time tradeoffs

#### 23.3.2 Basic Data Structures

- Arrays & Dynamic Arrays
- Linked Lists (Singly, Doubly, Circular)
- Stacks & Queues
- Hash Tables & Hash Maps
- Sets & Multisets

#### 23.3.3 Basic Programming Concepts

- Two Pointers technique
- Sliding Window
- Prefix Sums
- String manipulation basics
- Bit manipulation fundamentals

### 23.3 Arrays & Strings

#### 23.3.1 Array Fundamentals

- Array traversal & manipulation
- Finding elements & indices
- Array rotation & reversal
- Subarray problems
- Array sorting & searching

#### 23.3.2 Two Pointers

- Two sum variations
- Container with most water
- Remove duplicates
- Valid palindrome
- Merge sorted arrays

#### 23.3.3 Sliding Window

- Fixed size window problems
- Variable size window problems
- Maximum/minimum in window
- Substring problems
- Longest/shortest subarray

#### 23.3.4 String Manipulation

- String parsing & validation
- Anagram problems
- String matching & searching
- String transformation
- Regular expressions basics

### 23.4 Hash Tables & Sets

#### 23.3.1 Hash Table Applications

- Frequency counting
- Lookup optimization
- Caching & memoization
- Grouping & categorization
- Duplicate detection

#### 23.3.2 Set Operations

- Union, intersection, difference
- Subset & superset problems
- Unique element problems
- Set-based algorithms
- Mathematical set problems

### 23.5 Linked Lists

#### 23.3.1 Basic Operations

- Traversal & manipulation
- Node insertion & deletion
- List reversal
- Cycle detection
- List merging

#### 23.3.2 Advanced Techniques

- Fast & slow pointers
- List partitioning
- List sorting
- Intersection of lists
- Deep copy with random pointers

### 23.6 Stacks & Queues

#### 23.3.1 Stack Applications

- Expression evaluation
- Parentheses matching
- Monotonic stack
- Next greater/smaller element
- Histogram problems

#### 23.3.2 Queue Applications

- BFS implementation
- Sliding window maximum
- Task scheduling
- Level-order traversal
- Circular queue

#### 23.3.3 Deque & Priority Queue

- Double-ended queue operations
- Heap implementation
- Top K problems
- Median finding
- Task prioritization

### 23.7 Trees & Binary Trees

#### 23.3.1 Tree Fundamentals

- Tree terminology & properties
- Tree traversal (pre, in, post, level)
- Tree construction & validation
- Tree height & depth
- Tree serialization

#### 23.3.2 Binary Tree Problems

- Path sum problems
- Tree diameter & width
- Lowest common ancestor
- Tree views (left, right, top, bottom)
- Tree transformation

#### 23.3.3 Binary Search Trees

- BST properties & validation
- BST operations (insert, delete, search)
- BST to sorted array
- Range queries
- BST construction from array

### 23.8 Heaps & Priority Queues

#### 23.3.1 Heap Fundamentals

- Min-heap & max-heap
- Heap operations (insert, extract, heapify)
- Heap sort
- Heap implementation
- Heap properties

#### 23.3.2 Heap Applications

- Top K elements
- Median in data stream
- Merge K sorted lists
- Task scheduling
- Shortest path (Dijkstra's)

### 23.9 Graphs

#### 23.3.1 Graph Fundamentals

- Graph representation (adjacency list, matrix)
- Graph terminology
- Graph traversal (DFS, BFS)
- Connected components
- Graph properties

#### 23.3.2 Graph Algorithms

- Shortest path (BFS, Dijkstra, Floyd-Warshall)
- Minimum spanning tree (Kruskal, Prim)
- Topological sorting
- Cycle detection
- Strongly connected components

#### 23.3.3 Advanced Graph Problems

- Network flow
- Bipartite matching
- Graph coloring
- Hamiltonian & Eulerian paths
- Graph isomorphism

### 23.10 Dynamic Programming

#### 23.3.1 DP Fundamentals

- Overlapping subproblems
- Optimal substructure
- Memoization vs tabulation
- State definition
- Transition equations

#### 23.3.2 Classic DP Problems

- Fibonacci & variations
- Climbing stairs
- House robber
- Coin change
- Longest common subsequence

#### 23.3.3 Advanced DP Patterns

- Knapsack problems
- Edit distance
- Longest increasing subsequence
- Matrix chain multiplication
- Palindrome problems

#### 23.3.4 DP on Trees & Graphs

- Tree DP
- Graph DP
- Path counting
- Subtree problems
- Game theory DP

### 23.11 Greedy Algorithms

#### 23.3.1 Greedy Fundamentals

- Greedy choice property
- Optimal substructure
- Proof techniques
- When to use greedy
- Common greedy patterns

#### 23.3.2 Classic Greedy Problems

- Activity selection
- Fractional knapsack
- Huffman coding
- Minimum spanning tree
- Shortest path (Dijkstra)

#### 23.3.3 Advanced Greedy

- Interval scheduling
- Set cover
- Job scheduling
- Resource allocation
- Optimization problems

### 23.12 Backtracking

#### 23.3.1 Backtracking Fundamentals

- Recursive exploration
- Pruning techniques
- State space search
- Constraint satisfaction
- Solution space

#### 23.3.2 Classic Backtracking Problems

- N-Queens
- Sudoku solver
- Permutations & combinations
- Subset generation
- Word search

#### 23.3.3 Advanced Backtracking

- Graph coloring
- Hamiltonian cycle
- Knight's tour
- Partition problems
- Constraint optimization

### 23.13 Binary Search

#### 23.3.1 Binary Search Fundamentals

- Search in sorted array
- Search space reduction
- Boundary conditions
- Implementation variations
- Search in rotated array

#### 23.3.2 Advanced Binary Search

- Search in 2D matrix
- Search in infinite array
- Peak finding
- Square root & power
- Search with conditions

### 23.14 Sorting & Searching

#### 23.3.1 Sorting Algorithms

- Comparison-based sorts (merge, quick, heap)
- Non-comparison sorts (counting, radix, bucket)
- Stability & in-place properties
- Time & space complexity
- When to use which sort

#### 23.3.2 Searching Algorithms

- Linear search
- Binary search variations
- Ternary search
- Exponential search
- Interpolation search

### 23.15 Bit Manipulation

#### 23.3.1 Bit Operations

- Basic bit operations (AND, OR, XOR, NOT)
- Bit shifting
- Bit masking
- Bit counting
- Bit manipulation tricks

#### 23.3.2 Advanced Bit Manipulation

- Single number problems
- Missing number problems
- Power of 2 problems
- Bit manipulation in arrays
- Bit manipulation in strings

### 23.16 Math & Number Theory

#### 23.3.1 Basic Math

- Prime numbers
- GCD & LCM
- Modular arithmetic
- Factorial & permutations
- Combinatorics

#### 23.3.2 Advanced Math

- Fast exponentiation
- Matrix exponentiation
- Fibonacci & linear recurrence
- Number theory problems
- Probability & statistics

### 23.17 Advanced Data Structures

#### 23.3.1 Trie (Prefix Tree)

- Trie implementation
- String prefix problems
- Word search
- Autocomplete
- Dictionary problems

#### 23.3.2 Segment Tree

- Range queries
- Range updates
- Lazy propagation
- 2D segment trees
- Persistent segment trees

#### 23.3.3 Fenwick Tree (Binary Indexed Tree)

- Prefix sum queries
- Range sum updates
- Inversion count
- 2D Fenwick tree
- Advanced applications

#### 23.3.4 Disjoint Set Union (Union-Find)

- Union & find operations
- Path compression
- Union by rank
- Connected components
- Cycle detection

### 23.18 String Algorithms

#### 23.3.1 Pattern Matching

- Naive string matching
- KMP algorithm
- Rabin-Karp
- Z-algorithm
- Suffix arrays

#### 23.3.2 Advanced String Problems

- Longest common substring
- Longest palindromic substring
- String compression
- Edit distance
- String transformation

### 23.19 Geometry & Computational Geometry

#### 23.3.1 Basic Geometry

- Point & line operations
- Distance calculations
- Area & perimeter
- Intersection problems
- Convex hull

#### 23.3.2 Advanced Geometry

- Sweep line algorithm
- Closest pair of points
- Line segment intersection
- Polygon operations
- 3D geometry basics

### 23.20 System Design for Algorithms

#### 23.3.1 Scalable Algorithm Design

- Distributed algorithms
- Parallel processing
- MapReduce patterns
- Stream processing
- Caching strategies

#### 23.3.2 Real-world Applications

- Database indexing
- Search engines
- Recommendation systems
- Load balancing
- Rate limiting

## 24. Glossary (for future population)

### 24.1 Acronyms (SLA/SLO/SLI, RBAC/ABAC, ADR, etc.)

### 24.2 Common Terms (bounded context, saga, outbox, etc.)
