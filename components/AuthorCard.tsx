import { AuthorCardProps } from '@/types'

export default function AuthorCard({ author, className = '' }: AuthorCardProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Avatar */}
      {author.metadata?.avatar ? (
        <img
          src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
          alt={author.metadata?.name || author.title}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-medium text-sm">
            {(author.metadata?.name || author.title).charAt(0)}
          </span>
        </div>
      )}

      {/* Author Info */}
      <div>
        <p className="text-sm font-medium text-gray-900">
          {author.metadata?.name || author.title}
        </p>
        {author.metadata?.bio && (
          <p className="text-xs text-gray-500 line-clamp-1">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </div>
  )
}