import { createFileRoute } from '@tanstack/react-router'
import { setSidebarMenuActive } from '@/lib/utils'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  setSidebarMenuActive('/orders')
  return <div>Hello "/orders"!</div>
}
