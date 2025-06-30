// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug?: string;
  created_at: string;
  modified_at: string;
}

// Specific object types with properly typed metadata
export interface Post extends CosmicObject {
  type_slug: 'posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    featured?: boolean;
  };
}

export interface Category extends CosmicObject {
  type_slug: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

export interface Author extends CosmicObject {
  type_slug: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type_slug === 'posts';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type_slug === 'categories';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type_slug === 'authors';
}

// Component prop types
export interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

export interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export interface AuthorCardProps {
  author: Author;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}