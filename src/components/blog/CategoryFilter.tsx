import { Badge } from '@/components/ui/badge'
import { X } from '@phosphor-icons/react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
      <Badge
        variant={selectedCategory === null ? 'default' : 'outline'}
        className="cursor-pointer transition-all hover:scale-105"
        onClick={() => onSelectCategory(null)}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className="cursor-pointer transition-all hover:scale-105"
          onClick={() => onSelectCategory(selectedCategory === category ? null : category)}
        >
          {category}
          {selectedCategory === category && (
            <X size={14} className="ml-1" weight="bold" />
          )}
        </Badge>
      ))}
    </div>
  )
}
