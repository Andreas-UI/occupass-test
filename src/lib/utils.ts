import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import type { ClassValue } from 'clsx'
import { setSidebarActiveMenu } from '@/redux/slice/sidebar-active-menu-slice'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function parseDate(rawDate?: string) {
  if (!rawDate) return rawDate

  const match = rawDate.match(/\/Date\((\d+)(?:-\d+)?\)\//)

  if (match) {
    const timestamp = parseInt(match[1], 10)
    const date = new Date(timestamp)
    return date.toLocaleDateString()
  }
}

export function setSidebarMenuActive(route: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSidebarActiveMenu(route))
  }, [])
}
