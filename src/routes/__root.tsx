import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { QueryClient } from '@tanstack/react-query'
import TanStackQueryLayout from '@/integrations/tanstack-query/layout'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSideBar } from '@/components/app-sidebar'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <SidebarProvider open>
        <AppSideBar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
})
