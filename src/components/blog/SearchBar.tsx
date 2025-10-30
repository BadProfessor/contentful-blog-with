import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Search articles...' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="relative w-full max-w-md">
      <MagnifyingGlass
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
        weight="regular"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10 transition-all focus:ring-2 focus:ring-primary"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 hover:bg-primary/10"
          onClick={() => setQuery('')}
        >
          <X size={16} weight="regular" />
        </Button>
      )}
    </div>
  )
}
