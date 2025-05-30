import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Filter,
  FilterX,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import type { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn('flex flex-col items-start', className)}>
      {!column.getCanSort() && !column.getCanFilter() ? (
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
          >
            <span>{title}</span>
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
            >
              <span>{title}</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDown />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp />
              ) : (
                <ChevronsUpDown />
              )}
              {column.getIsFiltered() ? <Filter /> : <FilterX />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {column.getCanSort() && (
              <>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Asc
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                  Desc
                </DropdownMenuItem>
              </>
            )}
            {column.getCanFilter() && (
              <>
                {column.getCanSort() && <DropdownMenuSeparator />}
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <div onKeyDown={(e) => e.stopPropagation()}>
                  <Input
                    placeholder="Search for..."
                    value={(column.getFilterValue() ?? '') as string}
                    onChange={(event) =>
                      column.setFilterValue(event.target.value)
                    }
                  />
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
