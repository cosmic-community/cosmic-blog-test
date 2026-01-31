import Link from 'next/link'
import { BlogPost } from '@/types'
import { calculateReadingTime, formatDate } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const publishedDate = post.metadata?.published_date
  const readingTime = calculateReadingTime(post.metadata?.content || '')
  
  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Image */}
      <Link href={`/posts/${post.slug}`} className="block relative h-48 overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </Link>
      
      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.slice(0, 2).map(category => (
              <CategoryBadge key={category.id} category={category} size="small" />
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/posts/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {post.metadata.excerpt}
          </p>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Author */}
          {author && (
            <Link 
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-600">
                {author.metadata?.name || author.title}
              </span>
            </Link>
          )}
          
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {publishedDate && (
              <time dateTime={publishedDate}>
                {formatDate(publishedDate)}
              </time>
            )}
            <span className="text-gray-300">•</span>
            <span>{readingTime} min</span>
          </div>
        </div>
      </div>
    </article>
  )
}