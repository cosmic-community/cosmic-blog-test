import { Suspense } from 'react'
import Link from 'next/link'
import { searchPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import SearchBar from '@/components/SearchBar'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''
  const posts = query ? await searchPosts(query) : []
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Home
        </Link>
      </nav>
      
      {/* Search Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Search</h1>
        <div className="max-w-xl">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar initialValue={query} />
          </Suspense>
        </div>
      </header>
      
      {/* Results */}
      {query && (
        <section>
          <p className="text-gray-600 mb-8">
            {posts.length === 0 
              ? `No results found for "${query}"`
              : `Found ${posts.length} result${posts.length === 1 ? '' : 's'} for "${query}"`
            }
          </p>
          
          {posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      )}
      
      {!query && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Enter a search term to find articles.</p>
        </div>
      )}
    </div>
  )
}