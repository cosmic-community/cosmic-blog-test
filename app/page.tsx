import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeaturedPosts from '@/components/FeaturedPosts'
import PostGrid from '@/components/PostGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getFeaturedPosts()
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Featured Posts */}
        {featuredPosts && featuredPosts.length > 0 && (
          <section className="bg-white border-b border-gray-200">
            <div className="container py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Posts</h2>
              <FeaturedPosts posts={featuredPosts as Post[]} />
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="py-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar with Categories */}
              <aside className="lg:w-1/4">
                <div className="sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <CategoryFilter 
                    categories={categories as Category[]}
                    selectedCategory={null}
                    onCategoryChange={() => {}}
                  />
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
                <PostGrid posts={posts as Post[]} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}