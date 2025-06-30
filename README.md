<!-- README_START -->
# Cosmic Blog

A modern, responsive blog platform built with Next.js 15 and Tailwind CSS, powered by your existing Cosmic content. Features a clean design with category filtering, author profiles, and optimized images.

<img src="https://imgix.cosmicjs.com/946325c0-556c-11f0-a051-23c10f41277a-photo-1677442136019-21780ecad995-1751258525314.jpg?w=1200&h=600&fit=crop&auto=format,compress" alt="Cosmic Blog" width="600" height="300" />

## Features

- 📱 Fully responsive design optimized for all devices
- 🎨 Modern UI with Tailwind CSS and custom color themes
- 📝 Dynamic blog posts with rich content and featured images
- 👤 Author profiles with social media links
- 🏷️ Category-based content organization with color coding
- 🔍 Category filtering functionality
- ⚡ Optimized images with imgix integration
- 🚀 Built with Next.js 15 App Router for optimal performance
- 📊 Featured posts highlighting
- 🎯 SEO-friendly with proper meta tags

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=test-ai-production)

## Original Prompt

This application was built based on the following request:

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" to cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 18](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS
- [Bun](https://bun.sh/) - Fast package manager and runtime

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- A Cosmic account with the bucket slug and API keys

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd cosmic-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching All Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Posts by Category
```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post
```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: postSlug
  })
  .depth(1)
```

## Cosmic CMS Integration

This application leverages your existing Cosmic content structure:

### Content Types
- **Posts**: Blog articles with content, excerpts, featured images, authors, and categories
- **Authors**: Author profiles with bios, avatars, and social media links  
- **Categories**: Content categories with descriptions and color themes

### Key Features
- Content is fetched server-side for optimal SEO and performance
- Images are optimized using Cosmic's imgix integration
- Related content is efficiently loaded using Cosmic's depth parameter
- Real-time content updates when published in Cosmic

For more information about the Cosmic SDK, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Build your project: `bun run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)
3. Add your environment variables in the Netlify dashboard

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

Make sure to set your environment variables in your hosting platform's dashboard:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`
<!-- README_END -->