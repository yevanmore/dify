# Mini Dify — Product Backlog & Ideas

> This file is our shared scratchpad. Evan drops ideas here, Claude helps organize and prioritize.
> Updated: 2026-03-26

---

## Design Principles (Immutable)
1. **Always intuitive** — if it needs explanation, it's wrong
2. **Encapsulate complexity** — advanced agent techniques hidden behind simple surfaces
3. **Easy for everyone** — business users and beginners first, power users second
4. **Config-file-first** — everything expressible as a unified config that agents can modify in Create Mode (voice/text driven, not GUI-mandatory)

---

## Active Discussions (Need Alignment)

### Architecture: Environment vs Drive — What's the Relationship?
- **Environment** = runtime context where an agent executes (sandbox, Docker, local, cloud)
- **Drive** = file storage abstraction (personal folders, team folders, mountable)
- **Open question**: Is Drive a *subset* of Environment? Or a *sibling*?
  - Option A: Environment *contains* a Drive mount point (Environment > Drive)
  - Option B: Drive is independent, Environment *references* a Drive folder
  - Option C: They're the same thing — every Drive folder IS an environment
- **Evan's instinct**: Environment is an "asset" users don't deeply care about. It should be invisible most of the time, configured inline during agent creation, not a standalone page users actively manage.

### Environment Page Design
- Status: **Needs design**
- User doesn't actively manage environments — they're more like infrastructure
- Should feel like an "asset drawer" not a "configuration center"
- Possible UX: Environments auto-created when agents are created, visible in agent settings, manageable from a lightweight list view (not a full dashboard)

### Drive Page Design
- Status: **Needs design after Environment alignment**
- Personal folders per user
- Team/org shared folders
- Folders as environment mount points
- Agent can store/retrieve materials in folders
- File browser UX (simple, not Google Drive complex)

---

## Backlog (Prioritized)

### P0 — Must Do Next
- [ ] Competitive research on Environment/Drive UX (Evan doing this)
- [ ] Align on Environment vs Drive architecture relationship
- [ ] Design Environment page (lightweight asset list)
- [ ] Design Drive page (file browser with folders)
- [ ] Design MCP integration in Agent creation/settings — how does user add MCP servers to an agent?
- [ ] Design Chat Session list — two-level structure (Discord-style)

### P1 — Important, After P0
- [ ] Agent config as unified config file (YAML/JSON/TOML?)
  - Should be editable by Create Mode agent via voice/text
  - Should include: provider, model, environment, skills, tools, documents, MCP servers
- [ ] Agent detail/settings page after creation
  - Skills configuration
  - Documents (SOUL.md, AGENT.md, USER.md, TOOLS.md — like YouClaw pattern)
  - Sub-agent management
  - Environment settings
  - MCP server management
- [ ] Long-term Agent vs Publish Agent — interaction distinction
  - Different creation flows? Or same flow, different toggle?
  - How does memory/state differ in the UI?

### P2 — Nice to Have
- [ ] Super Window sub-agent routing mechanism
- [ ] Capability crystallization loop (expert finds error → Creator reviews → skill/tool/workflow created)
- [ ] Data Store design (structured + unstructured)
- [ ] Creator vs Consumer portal separation

### P3 — Future / Parking Lot
- [ ] Multi-tenant environment sharing boundaries
- [ ] Meta Agent memory/context/routing
- [ ] Workflow exposed directly or wrapped by Agent entry
- [ ] SSH/remote machine environments (like Claude Code)

---

## Design Notes

### Chat Session List — Grouped by Environment (Discord-style)
Session 创建时连接的是 Meta Agent（Window Agent）。开启聊天时选择 Environment。

**二级结构（Environment → Sessions）：**
```
📁 project-alpha              ← Environment
   ├─ 🟩 Fix auth bug         (Code Agent)
   ├─ ✍️ Write API docs       (Writer Agent)
   └─ 🔬 Research tech debt   (Research Agent)

📁 infra                      ← Environment
   ├─ ⚙️ Scale Redis          (Ops Agent, long-term)
   └─ 🟩 Deploy workflow      (Code Agent)

📁 research-notes             ← Environment
   ├─ 🔬 Analyze Q1 data     (Research Agent)
   └─ 🔬 Competitor landscape (Research Agent)

🤖 General                    ← 无 environment 的对话
   ├─ Brainstorm Q2
   └─ Quick question
```

**核心决策（2026-03-26 confirmed）：**
- Agent 是工具，Environment 是上下文
- Session 归属于 Environment，不归属于 Agent
- Agent 只是 session 里的执行者标签（小图标显示）
- 开启新聊天时需要选择 Environment（或 General）
- Meta Agent 自动路由到合适的 Agent

### MCP in Agent — How to Add
- MCP server 是 agent 的能力扩展
- 在 Agent 创建 wizard 里不强制配（保持简单）
- 在 Agent settings/detail 页面的 advanced 区域配置
- 可以从已注册的 MCP server 列表中勾选
- 也可以添加新的 MCP server（URL + auth）
- Config file 里体现为 `mcp_servers: [...]` 字段

---

## Ideas / Raw Notes

### 2026-03-26 — Evan
- YouClaw's document pattern (SOUL.md / AGENT.md / USER.md / TOOLS.md) is interesting but users can't write these initially — they evolve through agent usage
- Config file should be the single source of truth, GUI is just a renderer
- "People want to describe agents with words, not configure them with forms"
- Environment is infrastructure — make it invisible, not a destination page
- Drive folders as first-class mount points is the key insight

### 2026-03-26 — Evan (BREAKTHROUGH)
- **Meta Agent doesn't exist** — Window Agent is just a unified session GUI, not a middleman
- No telephone game (传话筒). User always talks directly to the executor
- Three modes: General (pick env → default provider) / Publish Agent (dispatch into env) / Long-term Agent (enter its env)
- Publish Agent = stateless, inherits session's environment, brings skills
- Long-term Agent = has own environment, session auto-enters it
- "Meta Agent routing" only makes sense for cross-task orchestration, NOT for this GUI
- Drive: only distinguish My Environments vs Shared, mark source type (Local/GitHub/Cloud) per item
- Gall's Law: complex systems evolve from simple effective systems. Start minimal.

---

## Completed
- [x] M1: Backend surgery (RAG/Knowledge/Explore removed)
- [x] M2: Frontend surgery (25+ files fixed)
- [x] M3: UI polish (Window Agent, collapsible sidebars, agent icons)
- [x] M4: Custom Agent wizard (3-step: Name → Provider → Environment)
- [x] CLAUDE.md design principles alignment
- [x] Agent SDK/CLI competitive research
- [x] LobeHub icon sourcing
