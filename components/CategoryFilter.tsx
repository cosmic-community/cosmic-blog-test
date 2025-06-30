import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory
}: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {/* All Categories Link */}
      <Link
        href="/"
        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
          selectedCategory === null 
            ? 'bg-primary text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        All Categories
      </Link>

      {/* Individual Category Links */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === category.slug 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            {category.metadata?.color && (
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.metadata.color }}
              />
            )}
            <span>{category.metadata?.name || category.title}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}