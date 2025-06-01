import { Apple, LayoutDashboard, NotepadText, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
  {
    group: 'Application',
    menus: [
      {
        title: 'Solution',
        url: '/',
        icon: Apple,
      },
    ],
  },
  {
    group: 'Miscellaneous',
    menus: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Customers',
        url: '/customers',
        icon: Users,
      },
      {
        title: 'Orders',
        url: '/orders',
        icon: NotepadText,
      },
    ],
  },
]

export function AppSideBar() {
  const sidebarActiveMenuState = useSelector(
    (state: RootState) => state.SidebarActiveMenu,
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {items.map((item) => (
          <SidebarGroup>
            <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.menus.map((menu) => (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={menu.url == sidebarActiveMenuState.route}
                    >
                      <Link to={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
