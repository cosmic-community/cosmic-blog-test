// app/categories/[slug]/page.tsx
import { getAllCategories, getPostsByCategory } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostGrid from '@/components/PostGrid'
import CategoryBadge from '@/components/CategoryBadge'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find((cat) => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const typedCategory = category as Category
  const typedPosts = posts as Post[]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="container py-12">
            <div className="max-w-3xl">
              <CategoryBadge category={typedCategory} className="mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {typedCategory.metadata?.name || typedCategory.title}
              </h1>
              {typedCategory.metadata?.description && (
                <p className="text-xl text-gray-600">
                  {typedCategory.metadata.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container">
            {typedPosts.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  {typedPosts.length} {typedPosts.length === 1 ? 'Post' : 'Posts'} in {typedCategory.metadata?.name || typedCategory.title}
                </h2>
                <PostGrid posts={typedPosts} />
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No posts found</h2>
                <p className="text-gray-600">
                  There are no posts in the {typedCategory.metadata?.name || typedCategory.title} category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}