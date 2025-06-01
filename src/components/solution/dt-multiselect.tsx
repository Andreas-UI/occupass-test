import { Check } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { useEffect, useState, type JSX } from 'react'

interface MultiSelectItemProps {
  value: string
  label: string
}

interface DTMultiSelectProps {
  items: MultiSelectItemProps[]
  title: string
  onChange: (value: string[]) => void
  icon?: JSX.Element
  className?: string
}

export function DTMultiSelect({
  items,
  title,
  onChange,
  icon,
  className,
}: DTMultiSelectProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    onChange(Array.from(selectedItems))
  }, [selectedItems])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className}>
          {icon}
          {title}
          {selectedItems.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedItems.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedItems.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedItems.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedItems)
                    .map((value) => items.find((i) => i.value === value))
                    .filter(Boolean)
                    .map((item) => (
                      <Badge
                        variant="secondary"
                        key={item!.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {item!.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                const isSelected = selectedItems.has(item.value)
                return (
                  <CommandItem
                    key={item.value}
                    onSelect={() => {
                      setSelectedItems((prev) => {
                        const newSet = new Set(prev)
                        if (newSet.has(item.value)) {
                          newSet.delete(item.value)
                        } else {
                          newSet.add(item.value)
                        }
                        return newSet
                      })
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded-[4px] border',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-input [&_svg]:invisible',
                      )}
                    >
                      <Check className="text-primary-foreground size-3.5" />
                    </div>
                    <span>{item.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedItems.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => setSelectedItems(new Set())}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
