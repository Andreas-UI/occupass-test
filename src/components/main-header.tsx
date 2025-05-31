import { Separator } from './ui/separator'
import { SidebarTrigger, useSidebar } from './ui/sidebar'

export function MainHeader({ text }: { text: string }) {
  const { isMobile } = useSidebar()
  return (
    <header className="flex gap-2 items-center h-12 px-4 border-b">
      {isMobile && (
        <>
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </>
      )}
      <div>
        <h1 className="text-base font-medium">{text}</h1>
      </div>
    </header>
  )
}
