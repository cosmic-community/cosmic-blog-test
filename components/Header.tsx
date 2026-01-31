import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-bold text-gray-900">ModernBlog</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/categories/technology"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Technology
            </Link>
            <Link 
              href="/categories/lifestyle"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Lifestyle
            </Link>
            <Link 
              href="/categories/business"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Business
            </Link>
          </nav>
          
          {/* Search Link */}
          <Link 
            href="/search"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>
        </div>
      </div>
    </header>
  )
}