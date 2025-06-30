import Link from 'next/link'
import { PostCardProps } from '@/types'
import CategoryBadge from './CategoryBadge'
import AuthorCard from './AuthorCard'

export default function PostCard({ 
  post, 
  showAuthor = true, 
  showCategory = true,
  className = '' 
}: PostCardProps) {
  return (
    <article className={`card hover:shadow-lg transition-shadow ${className}`}>
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {showCategory && post.metadata?.category && (
          <div className="mb-3">
            <CategoryBadge category={post.metadata.category} />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.metadata?.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.tags.split(',').slice(0, 3).map((tag) => (
              <span
                key={tag.trim()}
                className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Author */}
        {showAuthor && post.metadata?.author && (
          <AuthorCard author={post.metadata.author} />
        )}

        {/* Read More Link */}
        <div className="mt-4">
          <Link 
            href={`/posts/${post.slug}`}
            className="text-primary hover:text-primary/80 font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}