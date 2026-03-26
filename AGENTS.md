# CLAUDE.md — Mini Dify

## Project Overview

Mini Dify is a refactored fork of Dify.ai, stripped to its core: **Workflow + Agent + Tools/MCP**. The vision is no longer "AI App Factory" but **Agent consumption + capability management platform**.

---

## Design Principles (from Product Design Battle)

### 1. Core Diagnosis
- 2024-2025 iterations all revolved around Workflow; pipeline/plugin/data source/agent app were all serving Workflow.
- The main path never changed: Studio → Create App → Orchestrate → Publish. This is a "production-side" flow, not a "deliver end-value directly" flow.
- Dify is neither a good-enough prototyping tool nor a good-enough public infrastructure.
- The design core is not "carving" existing complexity but **"distilling"**: modules that are no longer maintained or central to the era should exit the main narrative.

### 2. First-Class Citizens
- **Environment**: Not just a sandbox detail, but a top-level product object. Can be cloud sandbox / Docker / local machine / company server. The runtime environment itself becomes a capability source.
- **CLI**: Instead of building a complete agent stack, integrate mainstream vendor CLIs (Claude Code, Codex, Gemini CLI, etc.) as capability providers. Dify benefits from upstream CLI capability upgrades.
- **Drive**: Upgraded from "file upload" to a formal abstraction. Personal folders, shared org folders, folders as runtime mount points. Environment + Drive + CLI form a new foundation layer.
- **Data Store**: Not yet fully defined, but expected to cover both structured and unstructured data.

### 3. Top-Level Interaction: Super Window First
- The default entry is **Super Window**, not Studio.
- Users should use Dify like they use Codex — not by first going to Studio to "build an app".
- No high-risk canvas innovation bets; the primary interaction remains conversational.
- Where "select model" used to be, the future is **"select sub-agent"**.

### 4. Two Agent Forms (Parallel)
- **Publish Agent**: Stateless, session-isolated, stable delivery, upgraded via publishing. Like a microservice — task in / result out. The future inheritor of Workflow.
- **Long-term Agent**: Like a digital employee / daemon / cloud computer. Has persistent environment, persistent memory, resource hosting. It gets "cultivated" over time, not re-initialized each time.
- Key design distinction:
  - Publish Agent = prompt + non-persistent environment
  - Long-term Agent = prompt + persistent environment

### 5. Session, Memory, Profile
- **Publish Agent**: Sessions isolated per user. Memory is session-level preference.
- **Long-term Agent**: User threads can be isolated, but underlying environment and long-term state are shared. Like "one person receiving DMs from different colleagues".
- **User Profile / Tool Auth**: Authorization should bind to environment/tool, not individual apps. Avoid repetitive auth across agents.

### 6. Creator vs Consumer Separation
- Three entry layers: Admin Console / Creator Portal / Consumer Portal
- **Creator**: Assembles agent versions, environment, skills, workflows, tools, review & publish.
- **Consumer**: Focuses on conversation, session, outputs, auth status, current environment.
- Key change: Don't force everyone to Studio first. Let most users directly consume organizational capabilities.

### 7. Capability Crystallization Loop
- Business expert discovers errors/new experience while using agent
- Submits to Creator for review
- Gets crystallized into skill / workflow / tool
- Published back into agent's environment
- Dify crystallizes **organizational capabilities**, not just documents.
- Three capability forms: **skill**, **tool/CLI**, **workflow**

### 8. Workflow's Future Role
- Workflow is NOT being killed. It remains Dify's foundation.
- But Workflow ≠ the entire product anymore.
- Workflow = deterministic capability engine
- Agent = new top-level product form
- Future product may only have two main types: **Workflow** and **Agent**

### 9. The Real Design Judgment
- New top-level: Agent consumption + capability management platform
- Super Window is the default entry
- Environment and CLI are the foundation
- Drive is the file asset abstraction
- Publish Agent and Long-term Agent are parallel duals
- Workflow preserved but no longer the sole protagonist
- Users manage **capabilities and tasks**, not a list of discrete app sessions

### 10. Core Abstraction: Window Agent = Unified Session UI (NOT an Agent)

**Critical insight: "Meta Agent" doesn't exist as a middleman. Window Agent is just a GUI shell that unifies all sessions. No telephone game (传话筒). User always talks directly to the executor.**

**Three modes of using Window Agent:**

```
Window Agent (unified session UI, not an agent)
│
├── General Mode
│   User picks an Environment → uses built-in default Provider
│   → talks directly to the LLM, works in that environment
│   → session belongs to that environment
│
├── Publish Agent (Micro Agent / Microservice)
│   User picks a Publish Agent → agent is dispatched INTO current environment
│   → user talks directly to the agent (no middleman)
│   → agent inherits the session's environment, brings its own skills
│   → stateless: once done, agent leaves, environment persists
│
└── Long-term Agent
    User picks a Long-term Agent → automatically enters its environment
    → user talks directly to the agent
    → agent HAS its own environment (1:1 binding)
    → session automatically belongs to that agent's environment
```

**Key design rules:**
- No routing layer. No middleman. Direct connection always.
- "Meta Agent" routing only makes sense for cross-task orchestration, NOT for this GUI
- The GUI's purpose = unify sessions across environments, not route messages
- Built-in Provider as default (no manual provider selection in chat)
- Environment selection happens BEFORE chatting (for General + Publish Agent modes)

### 10b. Session Sidebar Grouping (follows from 10)

```
📁 project-alpha (My Env)     ← General + Micro Agent sessions in this env
   ├─ General: brainstorm...
   ├─ 🟩 Code Agent: fix bug
   └─ ✍️ Writer Agent: docs

📁 Finance Agent (Long-term)  ← Long-term Agent = its own env
   ├─ Submit March expenses
   └─ Q1 report review

🌐 General (default env)      ← no specific env selected
   └─ Quick question
```

- Environments created by user → show as folders
- Long-term Agents → show as their own env group (agent IS env)
- General/default → fallback for unscoped conversations

### 10c. Collaboration Model: Long-term Agent = Shared Digital Employee

Long-term Agent collaboration is NOT "human-to-human handoff." It's **"many humans → one agent"**:
- Everyone submits requests to the same Long-term Agent in the same Environment
- The agent accumulates context from all submissions (like a shared employee inbox)
- NOT session-isolated: the agent's memory and files are shared across all users
- Example: "Everyone sends expense reports to the Finance Agent, it consolidates monthly"
- Example: "All team members submit daily updates, the Agent manages the weekly report"

**Two-layer privacy model:**

| Layer | Private | Shared |
|-------|---------|--------|
| Meta Agent (Window Agent) | ✅ per person | ❌ |
| General sessions | ✅ only you | ❌ |
| Environment | ❌ | ✅ team-shared |
| Long-term Agent | ❌ | ✅ lives in env, all authorized users interact |
| Environment sessions | ❌ | ✅ team-visible (like Slack channel) |
| Drive files | Personal folders private | Team/org folders shared |

**Design implication**: Collaboration is not a feature — it's an emergent property of shared Environments. Path = permission = collaboration boundary.

### 11. Environment as First-Class Citizen (Competitive Research)

**Environment sources:**
- **Drive folder**: Personal or team-shared folders in Dify's built-in Drive. Each folder can be an environment mount point. Agents store/retrieve materials in folders.
- **GitHub repo**: A repo can serve as a cloud environment.
- **Local machine**: Any local directory, requires establishing a long connection (like Slock AI's "Add Machine" / Claude Code's "Local" option).

**Environment config happens DURING agent creation** — not as a separate step. Users don't understand "environment" as a technical concept; they just want to create an agent. But Environment has its own first-class identity once created.

**CLI Provider landscape (from CloudCLI UI pattern):**
- Multi-model CLIs: Cursor, OpenCode (support many models)
- Single-model CLIs: Claude Code (Anthropic only), Codex (OpenAI only)
- All CLIs can be wrapped into chat-like interactive interfaces running inside an environment

**Agent creation minimal flow:**
1. Name your agent
2. Pick a provider/CLI runtime (Claude Code / Cursor / Codex / Gemini / OpenCode / Kimi)
3. Select model (filtered by provider compatibility)
4. Set up environment (Drive folder / GitHub repo / Local machine)
5. Done — advanced config (skills, tools, documents, sub-agents) comes later

### 11. Open Questions (To Be Resolved)
- Meta Agent memory / context / routing mechanism design
- Long-term Agent sharing boundaries: shared environment, shared resources, which memories are shared
- Whether Workflow is directly exposed or wrapped by a higher-level Agent entry
- How Data Store becomes a formal object alongside Drive
- Whether consumer-side is a single Super Window or Super Window + favorites/directory

---

## MVP Scope (Current Implementation)

### Kept
- Workflow engine (full backend + canvas frontend)
- Tools (Built-in + MCP)
- Plugins / Marketplace
- Model Provider
- Auth / Account / Billing
- Web App / Chat sharing

### Removed
- RAG pipeline & Knowledge base (entire stack)
- Explore page
- Agent app type (legacy)
- Custom Tools / API Extension / Bundles
- Data Source integration

### Frontend Demo (`/demo`)
- Super Window entry ("Window Agent") with classic chat UI
- Studio with Create Workflow + Create Custom Agent (placeholder)
- Collapsible sidebar navigation
- Integrations: Model Provider / Tools (Built-in | MCP) / Trigger

---

The codebase is split into:

- **Backend API** (`/api`): Python Flask application organized with Domain-Driven Design
- **Frontend Web** (`/web`): Next.js application using TypeScript and React
- **Docker deployment** (`/docker`): Containerized deployment configurations

## Backend Workflow

- Read `api/AGENTS.md` for details
- Run backend CLI commands through `uv run --project api <command>`.
- Integration tests are CI-only and are not expected to run in the local environment.

## Frontend Workflow

- Read `web/AGENTS.md` for details

## Testing & Quality Practices

- Follow TDD: red → green → refactor.
- Use `pytest` for backend tests with Arrange-Act-Assert structure.
- Enforce strong typing; avoid `Any` and prefer explicit type annotations.
- Write self-documenting code; only add comments that explain intent.

## Language Style

- **Python**: Keep type hints on functions and attributes, and implement relevant special methods (e.g., `__repr__`, `__str__`).
- **TypeScript**: Use the strict config, rely on ESLint (`pnpm lint:fix` preferred) plus `pnpm type-check:tsgo`, and avoid `any` types.

## General Practices

- Prefer editing existing files; add new documentation only when requested.
- Inject dependencies through constructors and preserve clean architecture boundaries.
- Handle errors with domain-specific exceptions at the correct layer.

## Project Conventions

- Backend architecture adheres to DDD and Clean Architecture principles.
- Async work runs through Celery with Redis as the broker.
- Frontend user-facing strings must use `web/i18n/en-US/`; avoid hardcoded text.
