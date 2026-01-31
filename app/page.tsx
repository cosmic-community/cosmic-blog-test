import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import FeaturedPosts from '@/components/FeaturedPosts'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import SearchBar from '@/components/SearchBar'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])
  
  // Filter out featured posts from the main list
  const featuredIds = new Set(featuredPosts.map(p => p.id))
  const regularPosts = posts.filter(p => !featuredIds.has(p.id))
  
  return (
    <div>
      {/* Hero Section with Featured Posts */}
      {featuredPosts.length > 0 && (
        <FeaturedPosts posts={featuredPosts} />
      )}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
          <CategoryFilter categories={categories} />
        </div>
        
        {/* Latest Articles */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          
          {regularPosts.length === 0 ? (
            <p className="text-gray-600 text-center py-12">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}