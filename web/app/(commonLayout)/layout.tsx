import type { ReactNode } from 'react'
import * as React from 'react'
import { AppInitializer } from '@/app/components/app-initializer'
import AmplitudeProvider from '@/app/components/base/amplitude'
import GA, { GaType } from '@/app/components/base/ga'
import Zendesk from '@/app/components/base/zendesk'
import GotoAnything from '@/app/components/goto-anything'
import ReadmePanel from '@/app/components/plugins/readme-panel'
import Sidebar from '@/app/components/sidebar'
import { AppContextProvider } from '@/context/app-context'
import { EventEmitterContextProvider } from '@/context/event-emitter'
import { ModalContextProvider } from '@/context/modal-context'
import { ProviderContextProvider } from '@/context/provider-context'
import PartnerStack from '../components/billing/partner-stack'
import Splash from '../components/splash'
import RoleRouteGuard from './role-route-guard'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GA gaType={GaType.admin} />
      <AmplitudeProvider />
      <AppInitializer>
        <AppContextProvider>
          <EventEmitterContextProvider>
            <ProviderContextProvider>
              <ModalContextProvider>
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 overflow-auto">
                    <RoleRouteGuard>
                      {children}
                    </RoleRouteGuard>
                  </div>
                </div>
                <PartnerStack />
                <ReadmePanel />
                <GotoAnything />
                <Splash />
              </ModalContextProvider>
            </ProviderContextProvider>
          </EventEmitterContextProvider>
        </AppContextProvider>
        <Zendesk />
      </AppInitializer>
    </>
  )
}
export default Layout
