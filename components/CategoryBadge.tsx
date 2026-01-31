import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'small' | 'default'
}

export default function CategoryBadge({ category, size = 'default' }: CategoryBadgeProps) {
  const color = category.metadata?.color || '#3B82F6'
  const name = category.metadata?.name || category.title
  
  const sizeClasses = size === 'small' 
    ? 'text-xs px-2 py-1' 
    : 'text-sm px-3 py-1.5'
  
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block rounded-full font-medium text-white transition-opacity hover:opacity-90 ${sizeClasses}`}
      style={{ backgroundColor: color }}
    >
      {name}
    </Link>
  )
}