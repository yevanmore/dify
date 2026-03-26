'use client'

import type { ComponentType } from 'react'
import {
  RiAddLine,
  RiApps2AddFill,
  RiApps2AddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowRightUpLine,
  RiAttachmentLine,
  RiBarChartBoxLine,
  RiFolder3Fill,
  RiFolder3Line,
  RiFolderLine,
  RiGitRepositoryLine,
  RiHardDriveLine,
  RiHome3Fill,
  RiHome3Line,
  RiMacbookLine,
  RiMoreLine,
  RiPlugFill,
  RiPlugLine,
  RiQuillPenLine,
  RiRobotFill,
  RiRobotLine,
  RiSearchEyeLine,
  RiSearchLine,
  RiSettings3Line,
  RiShoppingBag4Fill,
  RiShoppingBag4Line,
  RiSideBarLine,
  RiTerminalBoxLine,
  RiUploadLine,
  RiWindowFill,
  RiWindowLine,
} from '@remixicon/react'
import { useState } from 'react'
import DifyLogo from '@/app/components/base/logo/dify-logo'

// ─── Dify Brand Tokens ───
const c = {
  blue: '#0033FF',
  blueHover: '#002CD6',
  blueSoft: 'rgba(0, 51, 255, 0.08)',
  blueBorder: 'rgba(0, 51, 255, 0.16)',
  black: '#000000',
  white: '#FFFFFF',
  surface: '#F8F9FB',
  bg: '#F2F4F7',
  textPrimary: '#000000',
  textSecondary: '#333333',
  textMuted: '#666666',
  textPlaceholder: '#999999',
  border: 'rgba(0, 0, 0, 0.05)',
  borderStrong: 'rgba(0, 0, 0, 0.1)',
  divider: 'rgba(0, 0, 0, 0.05)',
}

// ─── Agent icon colors ───
const agentStyles: Record<string, { bg: string, fg: string }> = {
  research: { bg: '#F3E8FF', fg: '#7C3AED' },
  code: { bg: '#DCFCE7', fg: '#16A34A' },
  data: { bg: '#FFF7ED', fg: '#EA580C' },
  writer: { bg: '#DBEAFE', fg: '#2563EB' },
  ops: { bg: '#F1F5F9', fg: '#475569' },
}

const agentIcons: Record<string, ComponentType<{ className?: string, style?: React.CSSProperties }>> = {
  research: RiSearchEyeLine,
  code: RiTerminalBoxLine,
  data: RiBarChartBoxLine,
  writer: RiQuillPenLine,
  ops: RiSettings3Line,
}

// ─── Nav Config ───
type NavItem = {
  key: string
  label: string
  Icon: ComponentType<{ className?: string }>
  ActiveIcon: ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { key: 'home', label: 'Home', Icon: RiHome3Line, ActiveIcon: RiHome3Fill },
  { key: 'window-agent', label: 'Window Agent', Icon: RiWindowLine, ActiveIcon: RiWindowFill },
  { key: 'studio', label: 'Studio', Icon: RiApps2AddLine, ActiveIcon: RiApps2AddFill },
  { key: 'apps', label: 'Instant Apps', Icon: RiTerminalBoxLine, ActiveIcon: RiTerminalBoxLine },
  { key: 'drive', label: 'Drive', Icon: RiFolder3Line, ActiveIcon: RiFolder3Fill },
  { key: 'integrations', label: 'Integrations', Icon: RiPlugLine, ActiveIcon: RiPlugFill },
  { key: 'marketplace', label: 'Marketplace', Icon: RiShoppingBag4Line, ActiveIcon: RiShoppingBag4Fill },
]

// ─── Mock Data ───
const mockApps = [
  { id: '1', name: 'Email Automation', emoji: '📧', type: 'Workflow', desc: 'Automate email responses using AI', updated: '3 min ago' },
  { id: '2', name: 'Data Analysis Pipeline', emoji: '📊', type: 'Workflow', desc: 'Process and analyze CSV data', updated: '1 hour ago' },
  { id: '3', name: 'Code Review Assistant', emoji: '🔍', type: 'Chatflow', desc: 'AI-powered code review bot', updated: '2 hours ago' },
  { id: '4', name: 'Translation Service', emoji: '🌍', type: 'Workflow', desc: 'Multi-language translation pipeline', updated: '5 hours ago' },
  { id: '5', name: 'Content Generator', emoji: '✍️', type: 'Workflow', desc: 'Generate marketing content', updated: '1 day ago' },
  { id: '6', name: 'Customer Support Bot', emoji: '🤖', type: 'Chatflow', desc: 'Handle customer inquiries', updated: '2 days ago' },
]

const _mockAgents = [
  { id: 'research', name: 'Research Agent' },
  { id: 'code', name: 'Code Agent' },
  { id: 'data', name: 'Data Agent' },
  { id: 'writer', name: 'Writer Agent' },
  { id: 'ops', name: 'Ops Agent' },
]

const mockChats = [
  // project-alpha environment
  { id: 'a1', title: 'Fix auth token refresh bug', time: '18:20', preview: 'Found the issue in middleware...', agentId: 'code', envId: 'alpha' },
  { id: 'a2', title: 'Write API documentation', time: 'Yesterday', preview: 'I\'ll draft the docs...', agentId: 'writer', envId: 'alpha' },
  { id: 'a3', title: 'Research tech debt options', time: 'Yesterday', preview: 'Found 3 approaches...', agentId: 'research', envId: 'alpha' },
  // infra environment
  { id: 'i1', title: 'Scale Redis cluster', time: '20:36', preview: 'Checking current capacity...', agentId: 'ops', envId: 'infra' },
  { id: 'i2', title: 'Deploy workflow to prod', time: 'Yesterday', preview: 'Running deployment pipeline...', agentId: 'code', envId: 'infra' },
  // research-notes environment
  { id: 'n1', title: 'Analyze Q1 revenue data', time: '16:30', preview: 'Sure, I can help with that...', agentId: 'research', envId: 'research' },
  { id: 'n2', title: 'Competitor landscape 2026', time: 'Yesterday', preview: 'I found 12 relevant reports...', agentId: 'research', envId: 'research' },
  // General (no environment)
  { id: 'g1', title: 'Quick brainstorm on Q2', time: '21:05', preview: 'Let me help you think through...', agentId: null, envId: null },
  { id: 'g2', title: 'Summarize today\'s meeting', time: '16:30', preview: 'Here are the key takeaways...', agentId: null, envId: null },
]

const envNames: Record<string, string> = {
  alpha: 'project-alpha',
  infra: 'infra',
  research: 'research-notes',
}

// Group chats by Environment (Discord-style two-level)
function groupChatsByEnv(chats: typeof mockChats) {
  const groups: { envId: string | null, envName: string, chats: typeof mockChats }[] = []
  const map = new Map<string | null, typeof mockChats>()

  for (const chat of chats) {
    const key = chat.envId
    const existing = map.get(key)
    if (existing)
      existing.push(chat)
    else map.set(key, [chat])
  }

  // Environments first (alphabetically), then General at bottom
  for (const [envId, envChats] of Array.from(map.entries()).filter(([k]) => k !== null).sort((a, b) => (a[0] || '').localeCompare(b[0] || ''))) {
    groups.push({ envId, envName: envNames[envId!] || envId!, chats: envChats })
  }
  if (map.has(null)) {
    groups.push({ envId: null, envName: 'General', chats: map.get(null)! })
  }
  return groups
}

// ─── Agent Avatar Component ───
function AgentAvatar({ agentId, size = 32 }: { agentId: string, size?: number }) {
  const style = agentStyles[agentId] || { bg: c.bg, fg: c.textMuted }
  const IconComp = agentIcons[agentId] || RiRobotLine
  const iconSize = size * 0.5
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: style.bg }}
    >
      <IconComp className="" style={{ width: iconSize, height: iconSize, color: style.fg }} />
    </div>
  )
}

// ─── Collapsible Sidebar ───
function DemoSidebar({
  activeNav,
  onNavChange,
  collapsed,
  onToggleCollapse,
}: {
  activeNav: string
  onNavChange: (key: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  return (
    <div
      className="flex h-full shrink-0 flex-col transition-all duration-200"
      style={{ width: collapsed ? 56 : 240, backgroundColor: c.bg }}
    >
      {/* Header */}
      <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-4'} pb-2 pt-4`}>
        {!collapsed && <DifyLogo />}
        {!collapsed && (
          <button type="button" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5" style={{ color: c.textPlaceholder }}>
            <RiSearchLine className="h-4 w-4" />
            <span className="rounded border px-1 py-0.5 text-[10px] font-medium" style={{ borderColor: c.borderStrong }}>⌘K</span>
          </button>
        )}
        {collapsed && (
          <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: c.blue }}>
            <span className="text-xs font-bold text-white">D</span>
          </div>
        )}
      </div>

      {/* Workspace card */}
      {!collapsed && (
        <div className="px-2 pb-1">
          <div className="rounded-xl border p-2" style={{ borderColor: c.border, backgroundColor: c.white }}>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white" style={{ background: '#ff4405' }}>S</div>
              <span className="text-[13px] font-medium" style={{ color: c.textPrimary }}>Solar Studio</span>
              <span className="rounded border px-1 py-0.5 text-[10px] font-medium uppercase" style={{ borderColor: c.borderStrong, color: c.textMuted }}>Sandbox</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t px-1 pt-2" style={{ borderColor: c.divider }}>
              <span className="text-xs" style={{ color: c.textMuted }}>10,000 credits</span>
              <span className="text-xs font-semibold uppercase" style={{ color: c.blue }}>Upgrade</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className={`flex flex-col gap-0.5 ${collapsed ? 'items-center px-1' : 'px-2'} py-2`}>
        {navItems.map((item) => {
          const isActive = item.key === activeNav
          const IconComp = isActive ? item.ActiveIcon : item.Icon
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavChange(item.key)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} rounded-xl ${collapsed ? 'h-10 w-10' : 'px-2 py-2'} text-sm font-medium transition-all`}
              style={{
                backgroundColor: isActive ? c.blueSoft : 'transparent',
                color: isActive ? c.blue : c.textSecondary,
                boxShadow: isActive ? `0 0 0 1px ${c.blueBorder}` : 'none',
              }}
            >
              <IconComp className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className="flex-1" />

      {/* Collapse toggle + user */}
      <div className={`flex flex-col gap-2 ${collapsed ? 'items-center px-1' : 'px-3'} py-3`}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <RiSideBarLine className="h-4 w-4" style={{ color: c.textPlaceholder }} />
        </button>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-full px-1 py-1`}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: c.blue }}>E</div>
          {!collapsed && <span className="text-sm font-medium" style={{ color: c.textSecondary }}>Evan Z</span>}
        </div>
      </div>
    </div>
  )
}

// ─── App Card ───
function AppCard({ app }: { app: typeof mockApps[0] }) {
  return (
    <div className="group relative flex cursor-pointer flex-col rounded-xl border p-4 transition-shadow hover:shadow-md" style={{ borderColor: c.border, backgroundColor: c.white }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xl" style={{ backgroundColor: c.surface }}>{app.emoji}</div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: c.textPrimary }}>{app.name}</h3>
            <span className="text-xs" style={{ color: c.textMuted }}>{app.type}</span>
          </div>
        </div>
        <button type="button" className="rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: c.textMuted }}>
          <RiMoreLine className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-xs leading-5" style={{ color: c.textMuted }}>{app.desc}</p>
      <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: c.divider }}>
        <span className="text-xs" style={{ color: c.textPlaceholder }}>
          Updated
          {app.updated}
        </span>
        <RiArrowRightUpLine className="h-3.5 w-3.5" style={{ color: c.textPlaceholder }} />
      </div>
    </div>
  )
}

// ─── Create Cards ───
function CreateWorkflowCard({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all hover:shadow-sm" style={{ borderColor: c.blueBorder }}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: c.blueSoft }}>
        <RiAddLine className="h-6 w-6" style={{ color: c.blue }} />
      </div>
      <span className="mt-3 text-sm font-semibold" style={{ color: c.blue }}>Create Workflow</span>
      <span className="mt-1 text-xs" style={{ color: c.textMuted }}>Build from scratch</span>
    </button>
  )
}

function CreateAgentCard({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all hover:shadow-sm" style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: '#F3E8FF' }}>
        <RiRobotLine className="h-6 w-6" style={{ color: '#7C3AED' }} />
      </div>
      <span className="mt-3 text-sm font-semibold" style={{ color: '#7C3AED' }}>Create Custom Agent</span>
      <span className="mt-1 text-xs" style={{ color: c.textMuted }}>SDK/CLI runtime</span>
    </button>
  )
}

// ─── Mock: Long-term agents (they have their own environment) ───
const mockLongTermAgents = [
  { id: 'finance', name: 'Finance Agent', envName: 'Finance Dept', icon: '💰' },
  { id: 'hr', name: 'HR Agent', envName: 'HR Operations', icon: '👥' },
]

// ─── Mock: Publish agents (microservices, dispatched into any env) ───
const mockPublishAgents = [
  { id: 'research', name: 'Research Agent' },
  { id: 'code', name: 'Code Agent' },
  { id: 'writer', name: 'Writer Agent' },
  { id: 'data', name: 'Data Agent' },
  { id: 'ops', name: 'Ops Agent' },
]

// ─── Mock: User's environments ───
const mockUserEnvs = [
  { id: 'alpha', name: 'project-alpha', source: 'cloud' as const },
  { id: 'infra', name: 'infra', source: 'cloud' as const },
  { id: 'research', name: 'research-notes', source: 'local' as const },
]

// ─── Window Agent Page (Unified Session UI — NOT an agent) ───
function WindowAgentPage() {
  const [chatCollapsed, setChatCollapsed] = useState(false)
  const [showNewChat, setShowNewChat] = useState(false)
  const [currentEnv, setCurrentEnv] = useState<string | null>(null)
  const [dispatchedAgent, setDispatchedAgent] = useState<string | null>(null)
  const [showAgentPicker, setShowAgentPicker] = useState(false)

  const envLabel = currentEnv
    ? (mockUserEnvs.find(e => e.id === currentEnv)?.name || mockLongTermAgents.find(a => a.id === currentEnv)?.envName || currentEnv)
    : null

  return (
    <div className="flex h-full" style={{ backgroundColor: c.white }}>
      {/* Chat History Sidebar — collapsible */}
      {!chatCollapsed && (
        <div className="flex w-[280px] shrink-0 flex-col border-r" style={{ borderColor: c.divider, backgroundColor: c.surface }}>
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-base font-semibold" style={{ color: c.textPrimary }}>Sessions</span>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-lg p-1.5 hover:bg-black/5">
                <RiSearchLine className="h-4 w-4" style={{ color: c.textMuted }} />
              </button>
              <button type="button" onClick={() => setShowNewChat(true)} className="rounded-lg p-1.5 hover:bg-black/5">
                <RiAddLine className="h-4 w-4" style={{ color: c.textMuted }} />
              </button>
              <button type="button" onClick={() => setChatCollapsed(true)} className="rounded-lg p-1.5 hover:bg-black/5">
                <RiArrowLeftSLine className="h-4 w-4" style={{ color: c.textMuted }} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-1.5">
            {groupChatsByEnv(mockChats).map(group => (
              <div key={group.envId || 'general'} className="mb-0.5">
                <div className="flex items-center gap-2 px-2 pb-0.5 pt-3">
                  {group.envId
                    ? <RiFolderLine className="h-3 w-3" style={{ color: c.textPlaceholder }} />
                    : <RiRobotLine className="h-3 w-3" style={{ color: c.textPlaceholder }} />}
                  <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>
                    {group.envName}
                  </span>
                  <span className="rounded-full px-1.5 text-[10px]" style={{ backgroundColor: c.bg, color: c.textPlaceholder }}>{group.chats.length}</span>
                </div>
                {group.chats.map(chat => (
                  <button key={chat.id} type="button" className="mb-px flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-black/5">
                    {chat.agentId && <AgentAvatar agentId={chat.agentId} size={18} />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-[13px] font-medium" style={{ color: c.textPrimary }}>{chat.title}</span>
                        <span className="ml-2 shrink-0 text-[10px]" style={{ color: c.textPlaceholder }}>{chat.time}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs" style={{ color: c.textMuted }}>{chat.preview}</p>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expand strip */}
      {chatCollapsed && (
        <button type="button" onClick={() => setChatCollapsed(false)} className="flex w-8 shrink-0 items-center justify-center border-r hover:bg-black/5" style={{ borderColor: c.divider }}>
          <RiArrowRightSLine className="h-4 w-4" style={{ color: c.textMuted }} />
        </button>
      )}

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Environment bar (shows current env context) */}
        {currentEnv && (
          <div className="flex items-center gap-2 border-b px-4 py-2" style={{ borderColor: c.divider, backgroundColor: c.surface }}>
            <RiFolderLine className="h-3.5 w-3.5" style={{ color: c.textMuted }} />
            <span className="text-xs font-medium" style={{ color: c.textSecondary }}>{envLabel}</span>
            {dispatchedAgent && (
              <>
                <span className="text-xs" style={{ color: c.textPlaceholder }}>·</span>
                <AgentAvatar agentId={dispatchedAgent} size={16} />
                <span className="text-xs font-medium" style={{ color: agentStyles[dispatchedAgent]?.fg || c.textSecondary }}>
                  {mockPublishAgents.find(a => a.id === dispatchedAgent)?.name}
                </span>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setCurrentEnv(null)
                setDispatchedAgent(null)
              }}
              className="ml-auto text-[10px] hover:underline"
              style={{ color: c.textPlaceholder }}
            >
              Change
            </button>
          </div>
        )}

        {/* Empty state — pick environment or long-term agent */}
        {!currentEnv
          ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: c.blueSoft }}>
                  <RiWindowFill className="h-7 w-7" style={{ color: c.blue }} />
                </div>
                <h2 className="mt-4 text-lg font-semibold" style={{ color: c.textPrimary }}>Start a session</h2>
                <p className="mt-1 text-center text-sm" style={{ color: c.textMuted }}>Pick an environment to work in, or connect to a Long-term Agent.</p>

                {/* Environment cards */}
                <div className="mt-6 w-full max-w-[480px]">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Your environments</p>
                  <div className="flex flex-col gap-1.5">
                    {mockUserEnvs.map(env => (
                      <button key={env.id} type="button" onClick={() => setCurrentEnv(env.id)} className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm" style={{ borderColor: c.border, backgroundColor: c.white }}>
                        <RiFolderLine className="h-5 w-5 shrink-0" style={{ color: c.textMuted }} />
                        <div className="flex-1">
                          <span className="text-sm font-medium" style={{ color: c.textPrimary }}>{env.name}</span>
                        </div>
                        <span className="rounded border px-1.5 py-0.5 text-[10px]" style={{ borderColor: c.borderStrong, color: c.textPlaceholder }}>
                          {env.source === 'local' ? '💻 Local' : env.source === 'github' ? '🐙 GitHub' : '☁️ Cloud'}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Long-term Agents</p>
                  <div className="flex flex-col gap-1.5">
                    {mockLongTermAgents.map(agent => (
                      <button key={agent.id} type="button" onClick={() => setCurrentEnv(agent.id)} className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm" style={{ borderColor: c.border, backgroundColor: c.white }}>
                        <span className="text-lg">{agent.icon}</span>
                        <div className="flex-1">
                          <span className="text-sm font-medium" style={{ color: c.textPrimary }}>{agent.name}</span>
                          <p className="text-xs" style={{ color: c.textMuted }}>{agent.envName}</p>
                        </div>
                        <span className="rounded border px-1.5 py-0.5 text-[10px]" style={{ borderColor: '#BBF7D0', color: '#16A34A' }}>Long-term</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          : (
              <>
                {/* Active session — ready to chat */}
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: c.blueSoft }}>
                    <RiRobotFill className="h-7 w-7" style={{ color: c.blue }} />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold" style={{ color: c.textPrimary }}>
                    {dispatchedAgent
                      ? `Chatting with ${mockPublishAgents.find(a => a.id === dispatchedAgent)?.name}`
                      : `Working in ${envLabel}`}
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: c.textMuted }}>
                    {dispatchedAgent ? 'Agent dispatched into your environment' : 'Type a message or dispatch an agent'}
                  </p>
                </div>

                {/* Input area */}
                <div className="px-6 pb-6">
                  <div className="rounded-2xl border" style={{ borderColor: c.borderStrong, backgroundColor: c.white }}>
                    <div className="min-h-[56px] px-4 pb-1 pt-3">
                      <p className="text-sm" style={{ color: c.textPlaceholder }}>Type a message... (Shift+Enter for new line)</p>
                    </div>

                    <div className="flex items-center justify-between px-3 pb-3">
                      <div className="flex items-center gap-2">
                        {/* Attachment */}
                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5" title="Add attachment">
                          <RiAttachmentLine className="h-4 w-4" style={{ color: c.textMuted }} />
                        </button>

                        {/* Dispatch agent button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowAgentPicker(!showAgentPicker)}
                            className="flex h-8 items-center gap-1.5 rounded-full border-[0.5px] px-3 text-xs font-medium"
                            style={{
                              borderColor: dispatchedAgent ? agentStyles[dispatchedAgent]?.fg || c.blue : c.borderStrong,
                              color: dispatchedAgent ? agentStyles[dispatchedAgent]?.fg || c.blue : c.textSecondary,
                              backgroundColor: dispatchedAgent ? (agentStyles[dispatchedAgent]?.bg || c.blueSoft) : 'transparent',
                            }}
                          >
                            {dispatchedAgent
                              ? <AgentAvatar agentId={dispatchedAgent} size={14} />
                              : <RiRobotLine className="h-3.5 w-3.5" />}
                            <span>{dispatchedAgent ? mockPublishAgents.find(a => a.id === dispatchedAgent)?.name : 'Dispatch agent'}</span>
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          </button>

                          {showAgentPicker && (
                            <div className="absolute bottom-10 left-0 z-50 w-[220px] rounded-xl border-[0.5px] p-1" style={{ backgroundColor: c.white, borderColor: c.border, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
                              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Publish Agents</p>
                              {mockPublishAgents.map(agent => (
                                <button
                                  key={agent.id}
                                  type="button"
                                  onClick={() => {
                                    setDispatchedAgent(dispatchedAgent === agent.id ? null : agent.id)
                                    setShowAgentPicker(false)
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-black/5"
                                  style={{ color: dispatchedAgent === agent.id ? agentStyles[agent.id]?.fg || c.blue : c.textSecondary }}
                                >
                                  <AgentAvatar agentId={agent.id} size={20} />
                                  <span>{agent.name}</span>
                                  {dispatchedAgent === agent.id && <span className="ml-auto text-xs" style={{ color: agentStyles[agent.id]?.fg || c.blue }}>✓</span>}
                                </button>
                              ))}
                              <div className="my-1 h-px" style={{ backgroundColor: c.divider }} />
                              <button
                                type="button"
                                onClick={() => {
                                  setDispatchedAgent(null)
                                  setShowAgentPicker(false)
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-black/5"
                                style={{ color: c.textMuted }}
                              >
                                <span className="text-xs">✕</span>
                                {' '}
                                No agent (General)
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Send */}
                      <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: c.blue }}>
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none"><path d="M3 13V3l10 5-10 5z" fill="currentColor" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
      </div>

      {/* New Chat modal — pick environment */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] rounded-2xl p-6" style={{ backgroundColor: c.white }}>
            <h2 className="text-lg font-semibold" style={{ color: c.textPrimary }}>New Session</h2>
            <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Select an environment to work in.</p>

            <div className="mt-4 flex flex-col gap-1.5">
              {mockUserEnvs.map(env => (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => {
                    setCurrentEnv(env.id)
                    setDispatchedAgent(null)
                    setShowNewChat(false)
                  }}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left hover:shadow-sm"
                  style={{ borderColor: c.border }}
                >
                  <RiFolderLine className="h-4 w-4" style={{ color: c.textMuted }} />
                  <span className="flex-1 text-sm font-medium" style={{ color: c.textPrimary }}>{env.name}</span>
                  <span className="text-[10px]" style={{ color: c.textPlaceholder }}>{env.source === 'local' ? '💻' : '☁️'}</span>
                </button>
              ))}
            </div>

            <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Long-term Agents</p>
            <div className="flex flex-col gap-1.5">
              {mockLongTermAgents.map(agent => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => {
                    setCurrentEnv(agent.id)
                    setDispatchedAgent(null)
                    setShowNewChat(false)
                  }}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left hover:shadow-sm"
                  style={{ borderColor: c.border }}
                >
                  <span>{agent.icon}</span>
                  <span className="flex-1 text-sm font-medium" style={{ color: c.textPrimary }}>{agent.name}</span>
                  <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>Long-term</span>
                </button>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button type="button" onClick={() => setShowNewChat(false)} className="rounded-lg border px-4 py-2 text-sm font-medium" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Studio Page ───
function StudioPage({ onCreateWorkflow, onCreateAgent }: { onCreateWorkflow: () => void, onCreateAgent: () => void }) {
  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: c.surface }}>
      <div className="flex items-center justify-between px-8 py-5">
        <h1 className="text-xl font-semibold" style={{ color: c.textPrimary }}>Studio</h1>
        <button type="button" onClick={onCreateWorkflow} className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90" style={{ backgroundColor: c.blue }}>
          <RiAddLine className="h-4 w-4" />
          Create
        </button>
      </div>
      <div className="flex items-center gap-3 border-b px-8 pb-4" style={{ borderColor: c.divider }}>
        <div className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>All Types</div>
        <div className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>All Tags</div>
        <div className="flex flex-1 items-center gap-2 rounded-lg border px-3 py-1.5" style={{ borderColor: c.borderStrong }}>
          <RiSearchLine className="h-3.5 w-3.5" style={{ color: c.textPlaceholder }} />
          <span className="text-xs" style={{ color: c.textPlaceholder }}>Search apps...</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-4 gap-4">
          <CreateWorkflowCard onClick={onCreateWorkflow} />
          <CreateAgentCard onClick={onCreateAgent} />
          {mockApps.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      </div>
    </div>
  )
}

// ─── Home Page — 「最近」视图 ───
const recentAgents = [
  { id: 'finance', name: 'Finance Agent', icon: '💰', type: 'long-term' as const, lastUsed: '2 hours ago' },
  { id: 'code', name: 'Code Agent', icon: '💻', type: 'publish' as const, lastUsed: '1 hour ago' },
  { id: 'writer', name: 'Writer Agent', icon: '✍️', type: 'publish' as const, lastUsed: 'Yesterday' },
  { id: 'ops', name: 'Ops Agent', icon: '⚙️', type: 'publish' as const, lastUsed: '3 days ago' },
]

const recentSessions = [
  { id: '1', title: 'Fix auth token refresh bug', env: 'project-alpha', agent: 'Code Agent', agentIcon: '💻', time: '18:20' },
  { id: '2', title: 'Submit March expenses', env: 'Finance Agent', agent: null, agentIcon: '💰', time: 'Yesterday' },
  { id: '3', title: 'Scale Redis cluster', env: 'infra', agent: 'Ops Agent', agentIcon: '⚙️', time: '20:36' },
  { id: '4', title: 'Write API documentation', env: 'research-notes', agent: 'Writer Agent', agentIcon: '✍️', time: 'Yesterday' },
]

const recentApps = [
  { id: '1', name: 'Expense Report Generator', icon: '🧾', lastUsed: '2 hours ago' },
  { id: '2', name: 'Weekly Standup Summary', icon: '📋', lastUsed: 'Yesterday' },
  { id: '3', name: 'API Docs Writer', icon: '📝', lastUsed: '3 days ago' },
]

function HomePage() {
  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: c.surface }}>
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold" style={{ color: c.textPrimary }}>Welcome back, Evan 👋</h1>
        <p className="mt-1 text-sm" style={{ color: c.textMuted }}>What if… this is where your next idea begins.</p>

        {/* Recent Agents */}
        <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Recent Agents</h2>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {recentAgents.map(agent => (
            <div key={agent.id} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-shadow hover:shadow-md" style={{ borderColor: c.border, backgroundColor: c.white }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg text-lg" style={{ backgroundColor: c.bg }}>{agent.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" style={{ color: c.textPrimary }}>{agent.name}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className="rounded px-1 py-0.5 text-[9px] font-semibold"
                    style={{
                      backgroundColor: agent.type === 'long-term' ? '#F0FDF4' : c.blueSoft,
                      color: agent.type === 'long-term' ? '#16A34A' : c.blue,
                    }}
                  >
                    {agent.type === 'long-term' ? 'LT' : 'Pub'}
                  </span>
                  <span className="text-[10px]" style={{ color: c.textPlaceholder }}>{agent.lastUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Sessions */}
        <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Recent Sessions</h2>
        <div className="mt-3 flex flex-col gap-1">
          {recentSessions.map(session => (
            <div key={session.id} className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-shadow hover:shadow-sm" style={{ borderColor: c.border, backgroundColor: c.white }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-sm" style={{ backgroundColor: c.bg }}>{session.agentIcon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" style={{ color: c.textPrimary }}>{session.title}</p>
                <p className="mt-0.5 text-xs" style={{ color: c.textMuted }}>
                  {session.env}
                  {session.agent && ` · ${session.agent}`}
                </p>
              </div>
              <span className="shrink-0 text-xs" style={{ color: c.textPlaceholder }}>{session.time}</span>
            </div>
          ))}
        </div>

        {/* Recent Apps */}
        <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Recent Apps</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {recentApps.map(app => (
            <div key={app.id} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-shadow hover:shadow-md" style={{ borderColor: c.border, backgroundColor: c.white }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg text-lg" style={{ backgroundColor: c.bg }}>{app.icon}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: c.textPrimary }}>{app.name}</p>
                <p className="text-[10px]" style={{ color: c.textPlaceholder }}>{app.lastUsed}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Drive Mock Data ───
type DriveFolder = {
  id: string
  name: string
  files: number
  env: string | null
  children?: DriveFolder[]
}

type DriveFile = {
  name: string
  type: string
  size: string
  modified: string
}

const driveSections: { id: string, name: string, icon: string, folders: DriveFolder[] }[] = [
  { id: 'my', name: 'My Drive', icon: '👤', folders: [
    { id: 'research', name: 'research-notes', files: 12, env: null },
    { id: 'alpha', name: 'project-alpha', files: 8, env: 'Code Agent' },
    { id: 'drafts', name: 'drafts', files: 3, env: null },
  ] },
  { id: 'team', name: 'CE Team', icon: '👥', folders: [
    { id: 'infra', name: 'infra', files: 24, env: 'Ops Agent' },
    { id: 'design', name: 'design', files: 15, env: null },
    { id: 'docs', name: 'documentation', files: 42, env: null },
  ] },
  { id: 'org', name: 'Dify Org', icon: '🏢', folders: [
    { id: 'templates', name: 'templates', files: 6, env: null },
    { id: 'shared', name: 'shared-resources', files: 31, env: null },
  ] },
]

const mockFilesByFolder: Record<string, DriveFile[]> = {
  research: [
    { name: 'Q1-revenue-analysis.md', type: 'markdown', size: '12 KB', modified: '2 hours ago' },
    { name: 'competitor-report-2026.pdf', type: 'pdf', size: '2.4 MB', modified: 'Yesterday' },
    { name: 'user-interviews-notes.md', type: 'markdown', size: '8 KB', modified: '3 days ago' },
    { name: 'market-sizing-model.csv', type: 'csv', size: '156 KB', modified: '1 week ago' },
  ],
  alpha: [
    { name: 'README.md', type: 'markdown', size: '4 KB', modified: '1 hour ago' },
    { name: 'architecture.md', type: 'markdown', size: '18 KB', modified: '5 hours ago' },
    { name: 'api-spec.yaml', type: 'yaml', size: '22 KB', modified: 'Yesterday' },
    { name: '.env.example', type: 'env', size: '1 KB', modified: '2 days ago' },
  ],
  infra: [
    { name: 'deploy-checklist.md', type: 'markdown', size: '6 KB', modified: '30 min ago' },
    { name: 'terraform-main.tf', type: 'terraform', size: '14 KB', modified: '1 hour ago' },
    { name: 'monitoring-dashboard.json', type: 'json', size: '45 KB', modified: 'Yesterday' },
    { name: 'incident-log-2026-03.md', type: 'markdown', size: '28 KB', modified: '2 days ago' },
    { name: 'runbook-redis-scaling.md', type: 'markdown', size: '9 KB', modified: '1 week ago' },
  ],
}

const fileTypeIcons: Record<string, string> = {
  markdown: '📝',
  pdf: '📕',
  csv: '📊',
  yaml: '⚙️',
  env: '🔒',
  json: '📋',
  terraform: '🏗️',
}

// ─── Drive Page ───
// ─── Instant Apps Page ───
const mockInstantApps = [
  { id: '1', name: 'Expense Report Generator', desc: 'Upload receipts, get a formatted report', icon: '🧾', agent: 'Finance Agent', status: 'live' as const },
  { id: '2', name: 'Weekly Standup Summary', desc: 'Collects team updates, generates digest', icon: '📋', agent: 'HR Agent', status: 'live' as const },
  { id: '3', name: 'API Docs Writer', desc: 'Reads your codebase, writes OpenAPI docs', icon: '📝', agent: 'Code Agent', status: 'draft' as const },
  { id: '4', name: 'Competitor Monitor', desc: 'Tracks competitor changes weekly', icon: '🔭', agent: 'Research Agent', status: 'live' as const },
]

function AppsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: c.bg }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: c.textPrimary }}>Instant Apps</h1>
          <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Ask an agent to build you an app — no code required</p>
        </div>
        <button type="button" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: c.blue }}>
          <RiAddLine className="h-4 w-4" />
          New App
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockInstantApps.map(app => (
          <div key={app.id} className="group cursor-pointer rounded-xl border p-5 transition-shadow hover:shadow-md" style={{ borderColor: c.border, backgroundColor: c.white }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg text-xl" style={{ backgroundColor: c.surface }}>{app.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: c.textPrimary }}>{app.name}</h3>
                  <span className="text-xs" style={{ color: c.textMuted }}>
                    by
                    {app.agent}
                  </span>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${app.status === 'live' ? '' : ''}`}
                style={{
                  backgroundColor: app.status === 'live' ? '#F0FDF4' : c.surface,
                  color: app.status === 'live' ? '#16A34A' : c.textPlaceholder,
                }}
              >
                {app.status === 'live' ? '● Live' : 'Draft'}
              </span>
            </div>
            <p className="mt-3 text-xs leading-5" style={{ color: c.textMuted }}>{app.desc}</p>
            <div className="mt-4 flex items-center gap-2">
              <button type="button" className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>
                Open
              </button>
              <button type="button" className="rounded-lg px-3 py-1.5 text-xs font-medium text-white" style={{ backgroundColor: c.blue }}>
                Chat
              </button>
            </div>
          </div>
        ))}

        {/* Create placeholder */}
        <button type="button" className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all hover:shadow-sm" style={{ borderColor: c.blueBorder }}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: c.blueSoft }}>
            <RiAddLine className="h-6 w-6" style={{ color: c.blue }} />
          </div>
          <span className="mt-3 text-sm font-semibold" style={{ color: c.blue }}>Build an App</span>
          <span className="mt-1 text-center text-xs" style={{ color: c.textMuted }}>Describe what you need, an agent builds it</span>
        </button>
      </div>
    </div>
  )
}

function DrivePage() {
  const [_selectedSection, setSelectedSection] = useState('my')
  const [selectedFolder, setSelectedFolder] = useState<string | null>('research')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['my', 'team', 'org']))

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Find the current folder and its parent section
  const currentFolder = driveSections.flatMap(s => s.folders).find(f => f.id === selectedFolder)
  const currentSection = driveSections.find(s => s.folders.some(f => f.id === selectedFolder))
  const files = selectedFolder ? (mockFilesByFolder[selectedFolder] || []) : []

  return (
    <div className="flex h-full" style={{ backgroundColor: c.surface }}>
      {/* Folder tree sidebar */}
      <div className="flex w-[240px] shrink-0 flex-col border-r" style={{ borderColor: c.divider, backgroundColor: c.white }}>
        <div className="flex items-center justify-between px-4 py-4">
          <h2 className="text-base font-semibold" style={{ color: c.textPrimary }}>Drive</h2>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg p-1.5 hover:bg-black/5" title="Search files">
              <RiSearchLine className="h-4 w-4" style={{ color: c.textMuted }} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {driveSections.map(section => (
            <div key={section.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-black/5"
              >
                <span className="text-sm">{section.icon}</span>
                <span className="flex-1 text-[12px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>
                  {section.name}
                </span>
                <svg className={`h-3 w-3 transition-transform ${expandedSections.has(section.id) ? 'rotate-90' : ''}`} viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 3l3 3-3 3" stroke={c.textPlaceholder} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {expandedSections.has(section.id) && section.folders.map(folder => (
                <button
                  key={folder.id}
                  type="button"
                  onClick={() => {
                    setSelectedFolder(folder.id)
                    setSelectedSection(section.id)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg py-1.5 pl-7 pr-2 text-left transition-colors hover:bg-black/5"
                  style={{
                    backgroundColor: selectedFolder === folder.id ? c.blueSoft : 'transparent',
                    color: selectedFolder === folder.id ? c.blue : c.textSecondary,
                  }}
                >
                  <RiFolderLine className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 truncate text-[13px] font-medium">{folder.name}</span>
                  {folder.env && (
                    <span className="shrink-0 rounded-full px-1 py-0.5 text-[9px] font-medium" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
                      Env
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Add source buttons */}
        <div className="border-t px-3 py-3" style={{ borderColor: c.divider }}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: c.textPlaceholder }}>Connect source</p>
          <div className="flex flex-col gap-1">
            <button type="button" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium hover:bg-black/5" style={{ color: c.textSecondary }}>
              <RiGitRepositoryLine className="h-3.5 w-3.5" />
              {' '}
              GitHub Repo
            </button>
            <button type="button" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium hover:bg-black/5" style={{ color: c.textSecondary }}>
              <RiMacbookLine className="h-3.5 w-3.5" />
              {' '}
              Local Folder (Sync)
            </button>
          </div>
        </div>
      </div>

      {/* File list area */}
      <div className="flex flex-1 flex-col">
        {/* Breadcrumb + actions */}
        <div className="flex items-center justify-between border-b px-6 py-3" style={{ borderColor: c.divider }}>
          <div className="flex items-center gap-1.5 text-sm">
            <span style={{ color: c.textPlaceholder }}>{currentSection?.name || 'Drive'}</span>
            {currentFolder && (
              <>
                <span style={{ color: c.textPlaceholder }}>/</span>
                <span className="font-medium" style={{ color: c.textPrimary }}>{currentFolder.name}</span>
              </>
            )}
            {currentFolder?.env && (
              <span className="ml-2 rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                🟢 Env:
                {' '}
                {currentFolder.env}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-black/5" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>
              <RiAddLine className="h-3.5 w-3.5" />
              {' '}
              New Folder
            </button>
            <button type="button" className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-black/5" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>
              <RiUploadLine className="h-3.5 w-3.5" />
              {' '}
              Upload
            </button>
            {currentFolder && !currentFolder.env && (
              <button type="button" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white" style={{ backgroundColor: '#7C3AED' }}>
                <RiHardDriveLine className="h-3.5 w-3.5" />
                {' '}
                Mount as Environment
              </button>
            )}
          </div>
        </div>

        {/* File table */}
        {selectedFolder && files.length > 0
          ? (
              <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-[11px] font-medium uppercase tracking-wide" style={{ borderColor: c.divider, color: c.textPlaceholder }}>
                      <th className="px-6 py-2.5">Name</th>
                      <th className="px-4 py-2.5">Type</th>
                      <th className="px-4 py-2.5">Size</th>
                      <th className="px-4 py-2.5">Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, i) => (
                      <tr key={i} className="cursor-pointer border-b transition-colors hover:bg-black/[0.02]" style={{ borderColor: c.divider }}>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-base">{fileTypeIcons[file.type] || '📄'}</span>
                            <span className="text-sm font-medium" style={{ color: c.textPrimary }}>{file.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase" style={{ borderColor: c.borderStrong, color: c.textMuted }}>
                            {file.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: c.textMuted }}>{file.size}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: c.textPlaceholder }}>{file.modified}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          : (
              <div className="flex flex-1 flex-col items-center justify-center">
                <RiFolder3Line className="h-12 w-12" style={{ color: c.bg }} />
                <p className="mt-3 text-sm" style={{ color: c.textMuted }}>
                  {selectedFolder ? 'This folder is empty' : 'Select a folder to view files'}
                </p>
              </div>
            )}

        {/* Path-based permission hint */}
        {currentFolder && (
          <div className="border-t px-6 py-2" style={{ borderColor: c.divider }}>
            <p className="font-mono text-[10px]" style={{ color: c.textPlaceholder }}>
              /
              {currentSection?.id === 'my' ? 'evan' : currentSection?.id === 'team' ? 'dify/ce' : 'dify'}
              /
              {currentFolder.name}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Integrations Page ───
// ─── Mock MCP Servers ───
const mockMcpServers = [
  { id: '1', name: 'Notion MCP', status: 'connected' as const, tools: 12, desc: 'Read/write Notion pages and databases' },
  { id: '2', name: 'GitHub MCP', status: 'connected' as const, tools: 8, desc: 'Manage repos, issues, and PRs' },
  { id: '3', name: 'Slack MCP', status: 'error' as const, tools: 5, desc: 'Send messages and manage channels' },
  { id: '4', name: 'Linear MCP', status: 'connected' as const, tools: 6, desc: 'Track issues and projects' },
]

const mockSkills = [
  { id: '1', name: 'Web Search', desc: 'Search the web for real-time information', source: 'built-in' as const },
  { id: '2', name: 'Code Interpreter', desc: 'Execute Python code in a sandbox', source: 'built-in' as const },
  { id: '3', name: 'Browser Automation', desc: 'Navigate websites and fill forms', source: 'built-in' as const },
  { id: '4', name: 'File Analysis', desc: 'Parse PDFs, CSVs, and documents', source: 'built-in' as const },
  { id: '5', name: 'Deploy to Vercel', desc: 'Deploy apps to Vercel via CLI', source: 'custom' as const },
  { id: '6', name: 'Generate Report', desc: 'Create formatted PDF/XLSX reports', source: 'custom' as const },
]

function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('mcp')
  const tabs = [
    { key: 'mcp', label: 'MCP Servers' },
    { key: 'skills', label: 'Skills' },
  ]

  return (
    <div className="flex h-full" style={{ backgroundColor: c.surface }}>
      <div className="flex w-[200px] shrink-0 flex-col border-r p-4" style={{ borderColor: c.divider, backgroundColor: c.white }}>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: c.textPrimary }}>Integrations</h2>
        <div className="flex flex-col gap-0.5">
          {tabs.map(tab => (
            <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className="rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors" style={{ backgroundColor: activeTab === tab.key ? c.blueSoft : 'transparent', color: activeTab === tab.key ? c.blue : c.textSecondary }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'mcp' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold" style={{ color: c.textPrimary }}>MCP Servers</h2>
                <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Connect external tools via Model Context Protocol</p>
              </div>
              <button type="button" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: c.blue }}>
                <RiAddLine className="h-4 w-4" />
                {' '}
                Add Server
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              {mockMcpServers.map(server => (
                <div key={server.id} className="flex items-center gap-4 rounded-xl border px-5 py-4" style={{ borderColor: c.border, backgroundColor: c.white }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: c.surface }}>
                    <RiPlugLine className="h-5 w-5" style={{ color: c.textMuted }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>{server.name}</span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: server.status === 'connected' ? '#16A34A' : '#EF4444' }} />
                    </div>
                    <p className="mt-0.5 text-xs" style={{ color: c.textMuted }}>{server.desc}</p>
                  </div>
                  <span className="rounded border px-2 py-0.5 text-xs" style={{ borderColor: c.borderStrong, color: c.textPlaceholder }}>
                    {server.tools}
                    {' '}
                    tools
                  </span>
                  <button type="button" className="rounded-lg p-1.5 hover:bg-black/5">
                    <RiSettings3Line className="h-4 w-4" style={{ color: c.textMuted }} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'skills' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold" style={{ color: c.textPrimary }}>Skills</h2>
                <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Capabilities that agents can use to get work done</p>
              </div>
              <button type="button" className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: c.blue }}>
                <RiAddLine className="h-4 w-4" />
                {' '}
                Create Skill
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {mockSkills.map(skill => (
                <div key={skill.id} className="flex items-start gap-3 rounded-xl border px-5 py-4" style={{ borderColor: c.border, backgroundColor: c.white }}>
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: skill.source === 'built-in' ? c.blueSoft : '#F3E8FF' }}>
                    <RiTerminalBoxLine className="h-4 w-4" style={{ color: skill.source === 'built-in' ? c.blue : '#7C3AED' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: c.textPrimary }}>{skill.name}</span>
                      <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: skill.source === 'built-in' ? c.surface : '#F3E8FF', color: skill.source === 'built-in' ? c.textPlaceholder : '#7C3AED' }}>
                        {skill.source === 'built-in' ? 'Built-in' : 'Custom'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs" style={{ color: c.textMuted }}>{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── CLI Provider Data ───
const cliProviders = [
  { id: 'claude-code', name: 'Claude Code', by: 'Anthropic', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claudecode-color.svg', models: ['Claude 4.6 Opus (Thinking)', 'Claude 4.5 Sonnet', 'Claude 4.5 Opus'], multiModel: false },
  { id: 'cursor', name: 'Cursor', by: 'AI Code Editor', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/cursor.svg', models: ['Claude 4.6 Opus (Thinking)', 'GPT-5.3', 'Gemini 3 Pro', 'Claude 4.5 Sonnet', 'Auto'], multiModel: true },
  { id: 'codex', name: 'Codex', by: 'OpenAI', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/codex-color.svg', models: ['GPT-5.3 Codex', 'GPT-5.2 High', 'GPT-5.1'], multiModel: false },
  { id: 'gemini', name: 'Gemini CLI', by: 'Google', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini-color.svg', models: ['Gemini 3 Pro', 'Gemini 2.5 Flash', 'Gemini 2.5 Pro'], multiModel: false },
  { id: 'opencode', name: 'OpenCode', by: 'Open Source', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/opencode.svg', models: ['Any model (bring your own key)'], multiModel: true },
  { id: 'kimi', name: 'Kimi Code', by: 'Moonshot AI', icon: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/kimi-color.svg', models: ['Kimi K2.5', 'Kimi K2'], multiModel: false },
]

const envTypes = [
  { id: 'drive', name: 'Drive Folder', desc: 'Use a Dify Drive folder as environment', icon: '📁' },
  { id: 'github', name: 'GitHub Repo', desc: 'Connect a GitHub repository', icon: '🐙' },
  { id: 'local', name: 'Local Machine', desc: 'Run on your computer (requires connection)', icon: '💻' },
]

// ─── Create Agent Wizard (3-step) ───
function CreateAgentWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [agentName, setAgentName] = useState('')
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null)

  const provider = cliProviders.find(p => p.id === selectedProvider)

  const canNext = () => {
    if (step === 1)
      return agentName.trim().length > 0
    if (step === 2)
      return selectedProvider && selectedModel
    if (step === 3)
      return selectedEnv
    return false
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[560px] rounded-2xl" style={{ backgroundColor: c.white }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: c.divider }}>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: c.textPrimary }}>Create Custom Agent</h2>
            <p className="mt-0.5 text-xs" style={{ color: c.textPlaceholder }}>
              Step
              {step}
              {' '}
              of 3
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-black/5">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={c.textMuted} strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: s <= step ? c.blue : c.bg }} />
          ))}
        </div>

        {/* Step content */}
        <div className="px-6 py-5">
          {/* Step 1: Name */}
          {step === 1 && (
            <div>
              <h3 className="text-sm font-semibold" style={{ color: c.textPrimary }}>Name your agent</h3>
              <p className="mt-1 text-xs" style={{ color: c.textMuted }}>Give your agent a name and optional description.</p>
              <div className="mt-4">
                <label className="text-xs font-medium" style={{ color: c.textSecondary }}>Agent Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={e => setAgentName(e.target.value)}
                  placeholder="e.g. Research Assistant"
                  className="mt-1.5 w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-all focus:ring-2"
                  style={{ borderColor: c.borderStrong, ['--tw-ring-color' as string]: c.blueBorder }}
                />
              </div>
              <div className="mt-3">
                <label className="text-xs font-medium" style={{ color: c.textSecondary }}>
                  Description
                  <span style={{ color: c.textPlaceholder }}>(optional)</span>
                </label>
                <textarea
                  placeholder="What does this agent do?"
                  rows={2}
                  className="mt-1.5 w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: c.borderStrong }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Provider + Model */}
          {step === 2 && (
            <div>
              <h3 className="text-sm font-semibold" style={{ color: c.textPrimary }}>Choose a runtime provider</h3>
              <p className="mt-1 text-xs" style={{ color: c.textMuted }}>Select the CLI/SDK that will power your agent.</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {cliProviders.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedProvider(p.id)
                      setSelectedModel(p.models[0])
                    }}
                    className="relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:shadow-sm"
                    style={{
                      borderColor: selectedProvider === p.id ? c.blue : c.border,
                      backgroundColor: selectedProvider === p.id ? c.blueSoft : c.white,
                    }}
                  >
                    {selectedProvider === p.id && (
                      <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: c.blue }}>
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                      </div>
                    )}
                    <img src={p.icon} alt={p.name} className="h-8 w-8" />
                    <div className="text-center">
                      <p className="text-xs font-semibold" style={{ color: c.textPrimary }}>{p.name}</p>
                      <p className="text-[10px]" style={{ color: c.textPlaceholder }}>{p.by}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Model selection */}
              {provider && (
                <div className="mt-4">
                  <label className="text-xs font-medium" style={{ color: c.textSecondary }}>Select Model</label>
                  <select
                    value={selectedModel || ''}
                    onChange={e => setSelectedModel(e.target.value)}
                    className="mt-1.5 w-full appearance-none rounded-lg border bg-white px-3 py-2.5 text-sm outline-none"
                    style={{ borderColor: c.borderStrong }}
                  >
                    {provider.models.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {provider.multiModel && (
                    <p className="mt-1.5 text-[10px]" style={{ color: c.textPlaceholder }}>
                      {provider.name}
                      {' '}
                      supports multiple model providers.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Environment */}
          {step === 3 && (
            <div>
              <h3 className="text-sm font-semibold" style={{ color: c.textPrimary }}>Set up environment</h3>
              <p className="mt-1 text-xs" style={{ color: c.textMuted }}>Where will your agent run and store files?</p>
              <div className="mt-4 flex flex-col gap-2">
                {envTypes.map(env => (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setSelectedEnv(env.id)}
                    className="flex items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition-all hover:shadow-sm"
                    style={{
                      borderColor: selectedEnv === env.id ? c.blue : c.border,
                      backgroundColor: selectedEnv === env.id ? c.blueSoft : c.white,
                    }}
                  >
                    <span className="text-2xl">{env.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: c.textPrimary }}>{env.name}</p>
                      <p className="text-xs" style={{ color: c.textMuted }}>{env.desc}</p>
                    </div>
                    {selectedEnv === env.id && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: c.blue }}>
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Contextual config hint */}
              {selectedEnv === 'drive' && (
                <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: c.surface }}>
                  <p className="text-xs" style={{ color: c.textMuted }}>You can select or create a Drive folder after creation.</p>
                </div>
              )}
              {selectedEnv === 'github' && (
                <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: c.surface }}>
                  <p className="text-xs" style={{ color: c.textMuted }}>Connect your GitHub account to select a repository.</p>
                </div>
              )}
              {selectedEnv === 'local' && (
                <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: c.surface }}>
                  <p className="text-xs" style={{ color: c.textMuted }}>A persistent connection will be established with your machine.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4" style={{ borderColor: c.divider }}>
          <button
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
            style={{ borderColor: c.borderStrong, color: c.textSecondary }}
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <div className="flex items-center gap-3">
            {step < 3
              ? (
                  <button
                    type="button"
                    onClick={() => canNext() && setStep(step + 1)}
                    className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-opacity"
                    style={{ backgroundColor: c.blue, opacity: canNext() ? 1 : 0.4 }}
                  >
                    Next
                  </button>
                )
              : (
                  <button
                    type="button"
                    onClick={() => canNext() && onClose()}
                    className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-opacity"
                    style={{ backgroundColor: '#7C3AED', opacity: canNext() ? 1 : 0.4 }}
                  >
                    Create Agent
                  </button>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Marketplace Page ───
function MarketplacePage() {
  return (
    <div className="flex h-full flex-col p-8" style={{ backgroundColor: c.surface }}>
      <h1 className="text-xl font-semibold" style={{ color: c.textPrimary }}>Marketplace</h1>
      <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Discover plugins and templates</p>
      <div className="mt-6 rounded-xl border p-12 text-center" style={{ borderColor: c.border, backgroundColor: c.white }}>
        <p className="text-sm" style={{ color: c.textMuted }}>Connect to backend to browse the marketplace</p>
      </div>
    </div>
  )
}

// ─── Main Demo Page ───
export default function DemoPage() {
  const [activeNav, setActiveNav] = useState('home')
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAgentPlaceholder, setShowAgentPlaceholder] = useState(false)

  const renderContent = () => {
    switch (activeNav) {
      case 'home': return <HomePage />
      case 'window-agent': return <WindowAgentPage />
      case 'studio': return <StudioPage onCreateWorkflow={() => setShowCreateModal(true)} onCreateAgent={() => setShowAgentPlaceholder(true)} />
      case 'apps': return <AppsPage />
      case 'drive': return <DrivePage />
      case 'integrations': return <IntegrationsPage />
      case 'marketplace': return <MarketplacePage />
      default: return <HomePage />
    }
  }

  return (
    <div className="flex h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <DemoSidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        collapsed={navCollapsed}
        onToggleCollapse={() => setNavCollapsed(!navCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {renderContent()}
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[480px] rounded-2xl p-6" style={{ backgroundColor: c.white }}>
            <h2 className="text-lg font-semibold" style={{ color: c.textPrimary }}>Create New Workflow</h2>
            <p className="mt-1 text-sm" style={{ color: c.textMuted }}>Build an automated workflow from scratch</p>
            <div className="mt-6">
              <label className="text-sm font-medium" style={{ color: c.textSecondary }}>Name</label>
              <input type="text" placeholder="My Workflow" className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm outline-none" style={{ borderColor: c.borderStrong }} />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium" style={{ color: c.textSecondary }}>Description</label>
              <textarea placeholder="Describe what this workflow does..." rows={3} className="mt-1.5 w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none" style={{ borderColor: c.borderStrong }} />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-lg border px-4 py-2 text-sm font-medium" style={{ borderColor: c.borderStrong, color: c.textSecondary }}>Cancel</button>
              <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: c.blue }}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Agent Wizard */}
      {showAgentPlaceholder && (
        <CreateAgentWizard onClose={() => setShowAgentPlaceholder(false)} />
      )}
    </div>
  )
}
