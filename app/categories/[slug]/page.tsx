// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(category => ({
    slug: category.slug
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }
  
  const posts = await getPostsByCategory(category.id)
  const categoryColor = category.metadata?.color || '#3B82F6'
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Home
        </Link>
      </nav>
      
      {/* Header */}
      <header className="mb-12">
        <div 
          className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-4"
          style={{ backgroundColor: categoryColor }}
        >
          {category.metadata?.name || category.title}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata?.name || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600 max-w-2xl">
            {category.metadata.description}
          </p>
        )}
      </header>
      
      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts in this category yet.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Browse all posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}