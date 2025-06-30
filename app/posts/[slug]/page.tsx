// app/posts/[slug]/page.tsx
import { getPost } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostContent from '@/components/PostContent'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const typedPost = post as Post

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <article className="py-12">
          <div className="container max-w-4xl">
            {/* Post Header */}
            <header className="mb-8">
              {typedPost.metadata?.category && (
                <div className="mb-4">
                  <CategoryBadge category={typedPost.metadata.category} />
                </div>
              )}
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {typedPost.title}
              </h1>

              {typedPost.metadata?.excerpt && (
                <p className="text-xl text-gray-600 mb-6">
                  {typedPost.metadata.excerpt}
                </p>
              )}

              {/* Featured Image */}
              {typedPost.metadata?.featured_image && (
                <div className="mb-8">
                  <img
                    src={`${typedPost.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                    alt={typedPost.title}
                    width={1200}
                    height={600}
                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Author Info */}
              {typedPost.metadata?.author && (
                <div className="mb-8">
                  <AuthorCard author={typedPost.metadata.author} />
                </div>
              )}
            </header>

            {/* Post Content */}
            <PostContent content={typedPost.metadata?.content || ''} />

            {/* Tags */}
            {typedPost.metadata?.tags && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {typedPost.metadata.tags.split(',').map((tag) => (
                    <span
                      key={tag.trim()}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}