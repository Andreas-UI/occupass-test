import { createFileRoute } from '@tanstack/react-router'
import { setSidebarMenuActive } from '@/lib/utils'
import { MainHeader } from '@/components/main-header'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})

function RouteComponent() {
  setSidebarMenuActive('/customers')
  return (
    <>
      <MainHeader text="Customers" />
    </>
  )
}
