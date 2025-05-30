export function MainHeader({ text }: { text: string }) {
  return (
    <header className="flex items-center h-12 border-b">
      <div className="px-4">
        <h1 className="text-base font-medium">{text}</h1>
      </div>
    </header>
  )
}
