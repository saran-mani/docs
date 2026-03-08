# Synapsis Documentation

This docs site explains how Synapsis works end to end, from system architecture to page-level behavior and operational flows.

## Audience

- Developers implementing or changing system behavior
- Product and operations teams validating expected behavior
- QA and support teams tracing flow, dependencies, and ownership

## Scope

- Architecture and major components
- Authentication flow and security boundaries
- Data flow between frontend, backend, and storage
- Page-by-page behavior and ownership

## Start here

1. Read `Spykhealth > System Overview` for high-level architecture.
2. Read `Flows > Auth Flow` and `Flows > Data Flow` for request and data movement.
3. Use `Pages > Page Map` and `Pages > Page Details` for route-level behavior.
4. Review `Operations > Change Log` for latest documentation updates.

## Contributing to docs

### Technical contributors

- Use the page-level "Edit this page" link or update files directly in a feature branch.
- Keep doc updates in the same PR as behavior/code changes.
- Add a line in `Operations > Change Log` for meaningful updates.

### Non-technical contributors

- Submit content updates through your agreed intake path (issue/template/doc request).
- Focus on business behavior changes, user impact, and acceptance details.
- A docs owner converts approved input into markdown and publishes via PR.

## Documentation standards

- Keep each section short and practical.
- Prefer numbered sequence steps over long paragraphs.
- Include related API endpoints, services, and data models where possible.
- Use tables for ownership, dependencies, and source-of-truth mapping.
- Update docs in the same PR when behavior changes.

## Documentation quality checklist

- No secrets, credentials, or PII in docs
- Flows include entry point, validation/auth checks, and outcomes
- Pages include audience, dependencies, and error/empty states
- Any behavior change is reflected in docs and change log
