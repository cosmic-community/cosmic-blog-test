import { Post } from '@/types'
import PostCard from './PostCard'

interface PostGridProps {
  posts: Post[];
  className?: string;
}

export default function PostGrid({ posts, className = '' }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
        <p className="text-gray-600">Check back later for new content.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post}
          showAuthor={true}
          showCategory={true}
        />
      ))}
    </div>
  )
}