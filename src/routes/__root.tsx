import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { QueryClient } from '@tanstack/react-query'
import TanStackQueryLayout from '@/integrations/tanstack-query/layout'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSideBar } from '@/components/app-sidebar'
import { OrderDetailsDialog } from '@/components/order-details-dialog'
import { Toaster } from 'sonner'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <SidebarProvider
        style={{
          // @ts-ignore
          '--sidebar-width': '15rem', 
          '--sidebar-width-mobile': '15rem',
        }}
        open
      >
        <AppSideBar />
        <SidebarInset>
          <Outlet />

          {/* Overlay Components */}
          <Toaster richColors />
          <OrderDetailsDialog />
        </SidebarInset>
      </SidebarProvider>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
})
