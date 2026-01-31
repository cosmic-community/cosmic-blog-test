import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio
  const twitter = author.metadata?.twitter
  
  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gray-50 rounded-xl">
      {/* Avatar */}
      <Link href={`/authors/${author.slug}`} className="flex-shrink-0">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover shadow-md hover:shadow-lg transition-shadow"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
            👤
          </div>
        )}
      </Link>
      
      {/* Info */}
      <div className="flex-1">
        <Link 
          href={`/authors/${author.slug}`}
          className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {name}
        </Link>
        
        {bio && (
          <p className="text-gray-600 mt-2 line-clamp-3">
            {bio}
          </p>
        )}
        
        {twitter && (
          <a
            href={`https://twitter.com/${twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-blue-500 hover:text-blue-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            {twitter}
          </a>
        )}
      </div>
    </div>
  )
}