# Modern Blog Platform

![Modern Blog Platform](https://imgix.cosmicjs.com/d605b200-fe58-11f0-a969-0bcd7c3c4c42-photo-1677442136019-21780ecad995-1769831794730.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated, magazine-style blog platform built with Next.js 16 and Cosmic CMS. Features a stunning editorial design with featured posts, category filtering, author profiles, and real-time search.

## Features

- 🌟 **Featured Posts Section** - Hero display for highlighted articles
- 🔍 **Search Functionality** - Real-time search across all content
- 🏷️ **Category Filtering** - Browse by Technology, Lifestyle, or Business
- 👤 **Author Profiles** - Individual pages with bio and article listings
- 📱 **Responsive Design** - Beautiful on all devices
- ⚡ **Server-Side Rendering** - Optimized performance with Next.js 16
- 📖 **Reading Time** - Automatic calculation for each post
- 🎨 **Magazine Layout** - Professional editorial aesthetic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=697d7cab168f6301f399602f&clone_repository=697d84b9168f6301f3996039)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> "A modern blog website with homepage, post listings, category filtering, and author pages. Next.js. Featured posts section on homepage. Search functionality. Category filtering/browsing. Author profile pages. Magazine/editorial style."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **CMS:** [Cosmic](https://www.cosmicjs.com/docs)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Typography:** [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Language:** TypeScript
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   bun dev
   ```

### Environment Variables

Create a `.env.local` file with:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Posts with Related Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured posts only
const { objects: featured } = await cosmic.objects
  .find({ 
    type: 'blog-posts',
    'metadata.is_featured': true 
  })
  .depth(1)
```

### Querying by Category

```typescript
// Get posts in a specific category
const { objects: techPosts } = await cosmic.objects
  .find({ 
    type: 'blog-posts',
    'metadata.categories': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following Cosmic Object Types:

- **blog-posts** - Articles with content, images, author, and categories
- **authors** - Writer profiles with avatars and social links
- **categories** - Content organization with custom colors

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

Built with [Cosmic](https://www.cosmicjs.com) 💫

<!-- README_END -->