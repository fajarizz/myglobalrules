# AGENTS.md

Rules for any AI agent working in my codebases. Follow them on every request without exception.

## 1. Before Starting

- Read `AGENTS.md` and `CLAUDE.md` in the repo root and parent folders first. Earlier instructions in them still apply.
- If the repo has a `.codegraph/` directory, use CodeGraph to locate code before grep, find, or reading files. If it returns nothing, fall back to normal search.
- Read the code you will touch, plus its callers and its tests. Do not edit what you have not read.
- Restate the task in one sentence if it is not obvious, so I can catch a misunderstanding early.

## 2. Communication

- Reply in English.
- Be short and direct. No filler, no flattery, no long recaps of what you just did.
- Report what changed, where, and anything I must decide. Link files when you mention them.
- Do not over-verify. Run only the checks that matter for the change, and do not delay the actual request with excessive scratch work.

## 3. Unclear Requests

- If you are not sure what I want, ask. Do not guess.
- If your confidence in my intent is low on any point, stop and ask about that point before coding.
- Ask focused questions with concrete options and mark your recommended option.
- For large or ambiguous work, interview me first (grill-me style) until the plan is clear.

## 4. Pushing Back

- If my request has a design flaw, tell me plainly, explain why, and recommend a better option.
- If my request is factually wrong, say so and do not carry it out.
- If I repeat the same request a second time after your objection, do it as I asked.
- Disagree once, clearly, with reasons. Then respect my final decision.

## 5. Code Quality Principles

### Readability first
- Write code a teammate understands on first read. Choose clear over clever.
- Prefer simple, explicit constructs to compact or "elegant" tricks.
- Use descriptive names for variables, functions, and classes. A name should say what the thing is or does.
- Keep functions small and focused on one job. Keep nesting shallow with early returns and guard clauses.
- Avoid magic numbers and strings. Give them named constants.

### No comments
- Do not write comments in code. Make the code self-explanatory through naming and structure.
- Do not remove existing comments or docstrings that are unrelated to your change.

### DRY
- Before writing anything new, search for an existing component, helper, or pattern that does the same thing and reuse it.
- If nothing similar exists, create one reusable unit instead of duplicating logic in several places.
- Do not abstract too early. Extract only when the duplication is real, not imagined.

### SOLID and structure
- Single responsibility: one reason to change per class or module.
- Depend on abstractions at boundaries (interfaces, contracts), not on concrete details.
- Keep business logic out of controllers, views, and route handlers. Put it in services, actions, or domain classes.
- Follow the existing architecture and folder conventions of the repo. Do not invent a new structure.

### Consistency
- Match the surrounding style: naming, formatting, error handling, and file layout.
- Use the project's existing libraries. Do not add a new dependency when the current stack can do the job. If you must add one, tell me why.

## 6. Scope and Change Discipline

- Do exactly what was asked. No unrelated refactors, renames, or formatting sweeps.
- Make the smallest change that solves the problem correctly. Fix root causes, not symptoms.
- If you notice a separate problem, mention it. Do not fix it unasked.
- Never delete or rewrite working code, data, migrations, or config without being told to.
- Keep diffs easy to review.

## 7. Correctness and Safety

- Handle errors explicitly. Never swallow exceptions silently.
- Validate input at system boundaries. Never trust user input.
- Never hardcode secrets, keys, tokens, or credentials. Use environment configuration.
- Avoid SQL injection, XSS, mass assignment, and insecure defaults. Use parameterized queries and the framework's protections.
- Watch for edge cases: null or empty values, zero, boundaries, duplicates, time zones, and concurrency.
- For date ranges, use explicit start and end times (`00:00:00` to `23:59:59`). Do not rely on implicit midnight parsing.
- Be careful with destructive operations. Ask before irreversible actions such as dropping tables, force pushing, or bulk deletes.

## 8. Database and Backend (Laravel/PHP)

- Prevent N+1 queries with eager loading. Select only the columns you need.
- Be aware that `groupBy()->sum()` on the Laravel query builder returns only the first group. Fetch rows and sum them, or use a proper aggregate subquery.
- When grouping, do not select non-aggregated columns that can be non-deterministic. Join and filter explicitly, including soft deletes.
- Respect soft deletes (`whereNull('deleted_at')`) in joined tables.
- Wrap multi-step writes in transactions.
- Use migrations for every schema change. Never edit the database by hand.
- Keep reports and dashboards numerically consistent. When two screens show the same figure, use the same rules for both.

## 9. Frontend and Design

- Use the `impeccable` skill for design decisions and UI work.
- Never use drop shadows unless I ask for them on a specific component. Use borders, spacing, and color contrast for depth instead.
- Build accessible UI: semantic HTML, keyboard support, visible focus, sufficient contrast, and labels for inputs.
- Make layouts responsive. Reuse existing components and design tokens before creating new ones.
- Handle loading, empty, and error states for every data-driven view.

## 10. Testing and Verification

- Add or update tests for changed behavior when the repo has a test setup. Prefer testing behavior over implementation.
- For bug fixes, reproduce the bug first, then fix it, then confirm it is gone.
- Run the relevant tests, linter, and type checks before saying you are done. Say clearly what you ran and what you could not run.
- Never claim something works if you did not verify it.

## 11. Git and Workflow

- Do not commit, push, or open pull requests unless I ask.
- Write commit messages in imperative mood: a short subject line, with a body only when the reason is not obvious.
- Do not modify unrelated files, generated files, or lock files without reason.
- Do not run long-lived or heavy commands without need. Do not touch processes I have running, such as dev servers.

## 12. Memory

- When I correct you or settle a design decision, record it in the project's memory file (`AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`) so you do not repeat the mistake.
- Keep memory entries short, factual, and specific.

## 13. Definition of Done

A task is done only when all of these are true:

1. The request is fully implemented, with no unrelated changes.
2. The code is readable, has no comments, and has no duplicated logic.
3. Edge cases and errors are handled.
4. Relevant tests, lint, and type checks pass, or I was told what could not be run.
5. My summary states what changed, what was verified, and any open decision for me.
