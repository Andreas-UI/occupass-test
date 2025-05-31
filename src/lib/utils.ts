import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { ClassValue } from 'clsx'
import { setSidebarActiveMenu } from '@/redux/slice/sidebar-active-menu-slice'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function setSidebarMenuActive(route: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSidebarActiveMenu(route))
  }, [])
}
