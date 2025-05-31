import { createFileRoute } from '@tanstack/react-router'
import { setSidebarMenuActive } from '@/lib/utils'

export const Route = createFileRoute('/customers')({
  component: RouteComponent,
})

function RouteComponent() {
  setSidebarMenuActive('/customers')
  return <div>Hello "/customers"!</div>
}
