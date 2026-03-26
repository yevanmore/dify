'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { ComponentType } from 'react'
import { useCallback } from 'react'
import {
  RiHome3Fill,
  RiHome3Line,
  RiPlugLine,
  RiPlugFill,
  RiShoppingBag4Line,
  RiShoppingBag4Fill,
  RiApps2AddLine,
  RiApps2AddFill,
} from '@remixicon/react'
import Avatar from '@/app/components/base/avatar'
import DifyLogo from '@/app/components/base/logo/dify-logo'
import { Plan } from '@/app/components/billing/type'
import WorkplaceSelector from '@/app/components/header/account-dropdown/workplace-selector'
import { ACCOUNT_SETTING_TAB } from '@/app/components/header/account-setting/constants'
import PlanBadge from '@/app/components/header/plan-badge'
import { useAppContext } from '@/context/app-context'
import { useGlobalPublicStore } from '@/context/global-public-context'
import { useModalContext } from '@/context/modal-context'
import { useProviderContext } from '@/context/provider-context'
import { WorkspaceProvider } from '@/context/workspace-context'
import { cn } from '@/utils/classnames'

type NavItemConfig = {
  key: string
  label: string
  href: string
  segments: string[]
  Icon: ComponentType<{ className?: string }>
  ActiveIcon: ComponentType<{ className?: string }>
}

const navItems: NavItemConfig[] = [
  {
    key: 'home',
    label: 'Home',
    href: '/apps',
    segments: ['apps'],
    Icon: RiHome3Line,
    ActiveIcon: RiHome3Fill,
  },
  {
    key: 'studio',
    label: 'Studio',
    href: '/apps',
    segments: ['app'],
    Icon: RiApps2AddLine,
    ActiveIcon: RiApps2AddFill,
  },
  {
    key: 'integrations',
    label: 'Integrations',
    href: '/tools',
    segments: ['tools'],
    Icon: RiPlugLine,
    ActiveIcon: RiPlugFill,
  },
  {
    key: 'marketplace',
    label: 'Marketplace',
    href: '/plugins',
    segments: ['plugins'],
    Icon: RiShoppingBag4Line,
    ActiveIcon: RiShoppingBag4Fill,
  },
]

const Sidebar = () => {
  const selectedSegment = useSelectedLayoutSegment()
  const { enableBilling, plan } = useProviderContext()
  const { setShowPricingModal, setShowAccountSettingModal } = useModalContext()
  const { userProfile } = useAppContext()
  const systemFeatures = useGlobalPublicStore(s => s.systemFeatures)
  const isFreePlan = plan.type === Plan.sandbox
  const isBrandingEnabled = systemFeatures.branding.enabled

  const handlePlanClick = useCallback(() => {
    if (isFreePlan)
      setShowPricingModal()
    else
      setShowAccountSettingModal({ payload: ACCOUNT_SETTING_TAB.BILLING })
  }, [isFreePlan, setShowAccountSettingModal, setShowPricingModal])

  return (
    <div className="flex h-full w-[240px] shrink-0 flex-col bg-background-body">
      {/* Header: Logo + ⌘K */}
      <div className="flex items-center justify-between pb-2 pl-4 pr-2 pt-4">
        <Link href="/apps" className="flex items-center">
          {isBrandingEnabled && systemFeatures.branding.workspace_logo
            ? (
              <img
                src={systemFeatures.branding.workspace_logo}
                className="block h-[22px] w-auto object-contain"
                alt="logo"
              />
            )
            : <DifyLogo />}
        </Link>
      </div>

      {/* Workspace Selector + Credits */}
      <div className="px-2 pb-1">
        <div className="rounded-xl border border-components-panel-border bg-components-panel-bg p-1.5 shadow-xs">
          <div className="flex items-center gap-1.5">
            <WorkspaceProvider>
              <WorkplaceSelector />
            </WorkspaceProvider>
          </div>
          {enableBilling && (
            <div className="mt-1 flex items-center justify-between border-t border-divider-subtle px-2 pt-2 pb-1">
              <span className="text-xs text-text-tertiary">
                {plan.type === Plan.sandbox ? '10,000 credits' : 'Pro plan'}
              </span>
              <PlanBadge
                sandboxAsUpgrade
                plan={plan.type}
                onClick={handlePlanClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-0.5 px-2 py-2">
        {navItems.map((item) => {
          const isActive = item.segments.includes(selectedSegment || '')
          const IconComponent = isActive ? item.ActiveIcon : item.Icon
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-state-accent-active text-text-accent shadow-xs'
                  : 'text-components-main-nav-nav-button-text hover:bg-state-base-hover',
              )}
            >
              <IconComponent className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: User profile + Help */}
      <div className="px-3 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-full px-1 py-1 hover:bg-state-base-hover"
          onClick={() => setShowAccountSettingModal({ payload: ACCOUNT_SETTING_TAB.MEMBERS })}
        >
          <Avatar avatar={userProfile.avatar_url} name={userProfile.name} size={28} />
          <span className="min-w-0 truncate text-sm font-medium text-components-main-nav-nav-button-text">
            {userProfile.name}
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
