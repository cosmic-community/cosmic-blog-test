// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// File/Image type
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    avatar?: CosmicFile;
    email?: string;
    twitter?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content: string;
    excerpt?: string;
    featured_image?: CosmicFile;
    author?: Author;
    categories?: Category[];
    published_date?: string;
    is_featured?: boolean;
  };
}

// API Response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}