import { Post } from '@/types'
import PostCard from './PostCard'

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  // Show up to 3 featured posts
  const featuredPosts = posts.slice(0, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {featuredPosts.map((post, index) => (
        <PostCard 
          key={post.id} 
          post={post}
          showAuthor={true}
          showCategory={true}
          className={index === 0 ? 'lg:col-span-2' : ''}
        />
      ))}
    </div>
  )
}