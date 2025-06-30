import Link from 'next/link'
import { CategoryBadgeProps } from '@/types'

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const categoryColor = category.metadata?.color || '#6b7280'
  
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-80 transition-opacity ${className}`}
      style={{ backgroundColor: categoryColor }}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}