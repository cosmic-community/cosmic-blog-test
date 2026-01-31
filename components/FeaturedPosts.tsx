import Link from 'next/link'
import { BlogPost } from '@/types'
import { calculateReadingTime, formatDate } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostsProps {
  posts: BlogPost[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }
  
  const mainPost = posts[0]
  const sidePosts = posts.slice(1, 3)
  
  if (!mainPost) {
    return null
  }
  
  const mainImage = mainPost.metadata?.featured_image
  const mainCategories = mainPost.metadata?.categories || []
  const mainDate = mainPost.metadata?.published_date
  const mainReadingTime = calculateReadingTime(mainPost.metadata?.content || '')
  
  return (
    <section className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
          Featured Stories
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Post */}
          <div className="lg:col-span-2">
            <Link href={`/posts/${mainPost.slug}`} className="group block relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              {mainImage && (
                <img
                  src={`${mainImage.imgix_url}?w=1600&h=1000&fit=crop&auto=format,compress`}
                  alt={mainPost.title}
                  width={800}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                {mainCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {mainCategories.map(category => (
                      <CategoryBadge key={category.id} category={category} />
                    ))}
                  </div>
                )}
                
                <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {mainPost.title}
                </h3>
                
                {mainPost.metadata?.excerpt && (
                  <p className="text-gray-300 mb-4 line-clamp-2 hidden lg:block">
                    {mainPost.metadata.excerpt}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  {mainDate && <span>{formatDate(mainDate)}</span>}
                  <span>•</span>
                  <span>{mainReadingTime} min read</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Side Featured Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map(post => {
              const image = post.metadata?.featured_image
              const categories = post.metadata?.categories || []
              const date = post.metadata?.published_date
              const readingTime = calculateReadingTime(post.metadata?.content || '')
              
              return (
                <Link 
                  key={post.id} 
                  href={`/posts/${post.slug}`}
                  className="group relative h-[200px] lg:h-[240px] rounded-xl overflow-hidden"
                >
                  {image && (
                    <img
                      src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {categories.slice(0, 1).map(category => (
                          <CategoryBadge key={category.id} category={category} size="small" />
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-gray-400 text-xs">
                      {date && <span>{formatDate(date)}</span>}
                      <span>•</span>
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}