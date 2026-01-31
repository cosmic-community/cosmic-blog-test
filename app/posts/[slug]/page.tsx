// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getPosts, calculateReadingTime, formatDate } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  const readingTime = calculateReadingTime(post.metadata?.content || '')
  const publishedDate = post.metadata?.published_date
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const featuredImage = post.metadata?.featured_image
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Home
        </Link>
      </nav>
      
      {/* Header */}
      <header className="mb-8">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {publishedDate && (
            <time dateTime={publishedDate}>
              {formatDate(publishedDate)}
            </time>
          )}
          <span className="text-gray-400">•</span>
          <span>{readingTime} min read</span>
        </div>
      </header>
      
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="prose-custom mb-12">
        <ReactMarkdown>{post.metadata?.content || ''}</ReactMarkdown>
      </div>
      
      {/* Author Card */}
      {author && (
        <div className="border-t border-gray-200 pt-8">
          <AuthorCard author={author} />
        </div>
      )}
    </article>
  )
}