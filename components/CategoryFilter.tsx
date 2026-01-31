import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map(category => {
        const color = category.metadata?.color || '#3B82F6'
        const name = category.metadata?.name || category.title
        
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all hover:scale-105"
            style={{ 
              borderColor: color,
              color: color
            }}
          >
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {name}
          </Link>
        )
      })}
    </div>
  )
}