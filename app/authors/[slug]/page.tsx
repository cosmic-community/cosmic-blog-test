// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map(author => ({
    slug: author.slug
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    notFound()
  }
  
  const posts = await getPostsByAuthor(author.id)
  const avatar = author.metadata?.avatar
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Home
        </Link>
      </nav>
      
      {/* Author Profile */}
      <header className="mb-12 flex flex-col md:flex-row items-start gap-8">
        {/* Avatar */}
        {avatar && (
          <div className="flex-shrink-0">
            <img
              src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              width={150}
              height={150}
              className="w-36 h-36 rounded-full object-cover shadow-lg"
            />
          </div>
        )}
        
        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {author.metadata?.name || author.title}
          </h1>
          
          {author.metadata?.bio && (
            <p className="text-lg text-gray-600 mb-4 max-w-2xl">
              {author.metadata.bio}
            </p>
          )}
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {author.metadata?.email && (
              <a 
                href={`mailto:${author.metadata.email}`}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✉️ {author.metadata.email}
              </a>
            )}
            {author.metadata?.twitter && (
              <a 
                href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                🐦 {author.metadata.twitter}
              </a>
            )}
          </div>
        </div>
      </header>
      
      {/* Posts by Author */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Articles by {author.metadata?.name || author.title}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles by this author yet.</p>
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
      </section>
    </div>
  )
}