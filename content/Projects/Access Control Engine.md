---
title: Access Control Engine
draft: false
tags:
  - computer-science
  - python
  - project
  - CLI
---
# Access Control Engine

## Overview

The Access Control Engine is a deterministic, declarative authorization engine. It answers a single question: given a user, a resource, and some context, should this request be allowed or denied?

It does not handle authentication, identity resolution, or enforcement. Its only job is to return a clear decision, ALLOW, DENY, or NOT_APPLICABLE, along with a detailed evaluation trace so every outcome is easy to understand and audit.

The engine is built in Python and uses a Pydantic-based policy schema. It supports semantic validation, single and multi-policy evaluation with conflict resolution, a CLI, and CI via GitHub Actions. The design mirrors production systems: policies are validated before use, decisions are structured and explainable, and the package and CLI are ready to plug into larger applications.

---

## How It Works in a Real-World Example

Imagine a SaaS app that serves documents and images across multiple environments like prod and staging. The rules you want are:

- In prod, only users with the admin or owner role can access documents.
    
- In staging, both admin and editor users can access documents.
    
- A separate policy explicitly denies access to high-risk users such as contractors, even if another policy would allow it.
    

### Flow

1. Request  
    A user tries to open a document. The app builds a request context with things like user role, resource type, and environment, then asks the engine for a decision.
    
2. Policy set  
    Policies live in YAML or JSON files, for example:
    
    - admin_document_prod.yaml: applies to documents in prod, allows admin and owner roles.
        
    - editor_staging.yaml: applies to documents in staging, allows admin and editor roles.
        
    - deny_contractors.yaml: applies to documents in prod, denies contractor users.
        
3. Validation  
    Policies are validated before they are ever evaluated. Required fields, allowed operators, and safe field paths are all checked up front. Invalid policies are rejected early so bad configuration never reaches runtime.
    
4. Evaluation  
    The engine:
    
    - Filters policies by target, such as resource type and environment. Non-matching policies return NOT_APPLICABLE.
        
    - Evaluates conditions against the request context.
        
    - Applies conflict resolution using deny-overrides. If any applicable policy returns DENY, the final result is DENY. Otherwise, ALLOW wins if present. If nothing applies, the result is NOT_APPLICABLE.
        
5. Decision and trace  
    The result is a structured Decision object that includes the outcome, the policy that drove it, a human-readable reason, and a step-by-step trace. This makes debugging, auditing, and compliance straightforward.
    
6. Enforcement  
    The application uses the decision to allow or block the request, for example by returning a 403. The engine decides, the app enforces.
    

---

## Features

### Policy model

- Identity  
    Versioned policy IDs support auditing and rollback.
    
- Target  
    Resource type and environment.
    
- Conditions  
    Dotted field paths with operators like equals, in, gt, and lt. Conditions can be combined with all or any.
    
- Effect  
    ALLOW or DENY when the policy applies and conditions pass.
    

### Validation

- Structural  
    Enforced with Pydantic: required fields, exactly one of conditions.all or conditions.any, and valid effects.
    
- Semantic  
    Only allowed operators and field prefixes such as user._, resource._, and request.* are permitted. Operator and value types are also validated. Invalid policies fail fast before evaluation.
    

### Evaluation

- Single policy  
    evaluate_policy_decision(policy, context) returns a Decision with outcome, policy_id, reason, and trace.
    
- Multiple policies  
    evaluate_policies_decision(policies, context) applies deny-overrides across policies and aggregates traces.
    
- Strict context  
    Missing required context fields raise ContextValidationError instead of silently denying. This encourages correct integrations and fail-fast behavior.
    

### Explainability

- Every decision includes the outcome, policy ID, reason, and trace.
    
- Trace entries show target matching and each condition evaluation, including expected and actual values and pass or fail results.
    

### CLI

- ace validate <policy>  
    Validates a policy file.
    
- ace evaluate <policy> <context>  
    Evaluates a single policy, with optional tracing.
    
- ace evaluate-policies <policy> ... <context>  
    Evaluates multiple policies with deny-overrides. Policies can be JSON or YAML, and context is JSON.
    

### Quality and production readiness

- Packaging  
    Managed with pyproject.toml, optional dev dependencies, and a CLI entry point named ace.
    
- CI  
    GitHub Actions runs linting, formatting, type checks, and tests with coverage on every push and pull request.
    
- Pre-commit  
    Ruff and Black hooks keep the codebase consistent.
    
- Documentation  
    Includes a README, policy contract, architecture and decision flow docs, and policy lifecycle documentation with Mermaid diagrams.
    

---

## How It Emulates Real-World Production

### Separation of concerns

Policy validation is separate from evaluation. Policies are validated once at load or publish time, while evaluation is a pure function over policy and context.

### Safe-by-construction policies

Invalid or ambiguous policies never make it to runtime. Unsupported operators and illegal field paths are caught early, reducing surprises in production.

### Deterministic and auditable decisions

The same policy and context always produce the same result. Structured decisions and traces make it easy to log outcomes and answer why a request was allowed or denied.

### Explicit failure for bad context

Missing or invalid context raises an error instead of defaulting to DENY. Callers must supply complete and correct context, avoiding silent misconfiguration.

### Conflict resolution

Deny-overrides matches common production patterns where explicit denies take precedence. The design can be extended to support other strategies like priority or first-match if needed.

### Packaging and CLI

The engine is installable via pip and runnable as ace. Policies and context are file-based, which mirrors real production usage where policies live in version control or a policy store.

### CI and code quality

Automated checks enforce formatting, linting, typing, and test coverage before merge. This reflects standard production expectations.

### Documentation and contract

Clear documentation and a written policy contract support onboarding, maintenance, and compliance, similar to how real-world policy systems are specified.

---

## Tech Stack

- Python 3.10+, Pydantic 2, PyYAML
    
- Testing: pytest, pytest-cov
    
- Quality: ruff, black, mypy, pre-commit, GitHub Actions