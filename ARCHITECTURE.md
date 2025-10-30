# Architecture & Data Flow

Visual guide to understanding how the Contentful blog works.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Blog Application                    │
│                    (React + Vite + Tailwind)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              │ (contentful.js SDK)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Contentful Cloud CMS                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Blog Posts  │  │    Images    │  │   Settings   │     │
│  │  (Content)   │  │   (Assets)   │  │  (Metadata)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagram

```
1. User Opens App
   │
   ▼
2. App.tsx Loads
   │
   ├─► Check Environment Variables (.env.local)
   │   │
   │   ├─► ❌ Missing? → Show MissingCredentials Component
   │   │
   │   └─► ✅ Found? → Continue
   │
   ▼
3. Fetch Data from Contentful
   │
   ├─► getBlogPosts() → Fetch all published posts
   │   └─► Transform & Store in State
   │
   └─► getAllCategories() → Fetch unique categories
       └─► Store in State
   │
   ▼
4. Render Components
   │
   ├─► SearchBar → Filter posts by query
   ├─► CategoryFilter → Filter by category
   └─► BlogPostCard (grid) → Display posts
   │
   ▼
5. User Interactions
   │
   ├─► Search Input → Update filteredPosts
   ├─► Category Click → Filter by category
   └─► Post Click → Show BlogPostDetail
       │
       └─► RichTextRenderer → Format content
```

## 🗂️ Component Hierarchy

```
App.tsx
│
├─── MissingCredentials (if no credentials)
│
└─── Main Application
     │
     ├─── Header
     │    ├─── Title
     │    └─── Tagline
     │
     ├─── Search & Filter Bar
     │    ├─── SearchBar
     │    │    └─── Input (with debounce)
     │    │
     │    └─── CategoryFilter
     │         └─── Badge[] (categories)
     │
     ├─── Content Area
     │    │
     │    ├─── Loading State
     │    │    └─── BlogPostCardSkeleton[] (6x)
     │    │
     │    ├─── Error State
     │    │    └─── ErrorState (with retry)
     │    │
     │    ├─── Empty State
     │    │    └─── EmptyState (no results)
     │    │
     │    ├─── Blog List View
     │    │    └─── BlogPostCard[]
     │    │         ├─── Image
     │    │         ├─── Title
     │    │         ├─── Excerpt
     │    │         ├─── Category Badge
     │    │         └─── Metadata (date, author)
     │    │
     │    └─── Blog Detail View
     │         └─── BlogPostDetail
     │              ├─── Back Button
     │              ├─── Featured Image
     │              ├─── Title
     │              ├─── Metadata
     │              ├─── RichTextRenderer
     │              │    ├─── Headings
     │              │    ├─── Paragraphs
     │              │    ├─── Lists
     │              │    ├─── Images
     │              │    ├─── Links
     │              │    └─── Blockquotes
     │              └─── Tags
     │
     └─── Footer
```

## 🔄 State Management

```
┌─────────────────────────────────────────────────────────┐
│                      App State                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  posts: BlogPostEntry[]                                │
│    └─► All posts from Contentful                       │
│                                                         │
│  categories: string[]                                  │
│    └─► Unique categories from posts                    │
│                                                         │
│  selectedPost: BlogPostEntry | null                    │
│    └─► Currently viewed post (detail view)             │
│                                                         │
│  loading: boolean                                      │
│    └─► API fetch in progress                           │
│                                                         │
│  error: string | null                                  │
│    └─► Error message if fetch fails                    │
│                                                         │
│  searchQuery: string                                   │
│    └─► User's search input (debounced)                 │
│                                                         │
│  selectedCategory: string | null                       │
│    └─► Active category filter                          │
│                                                         │
│  filteredPosts: BlogPostEntry[]                        │
│    └─► Computed from posts + filters                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
Environment Variables (.env.local)
│
├─► VITE_CONTENTFUL_SPACE_ID
├─► VITE_CONTENTFUL_ACCESS_TOKEN
└─► VITE_CONTENTFUL_ENVIRONMENT
    │
    ▼
Vite Build Process
    │
    ├─► Prefix Check (must start with VITE_)
    └─► Inject into import.meta.env
        │
        ▼
    contentful.ts
        │
        ├─► createClient({ space, accessToken })
        └─► Export configured client
            │
            ▼
        API Functions
            │
            ├─► getBlogPosts()
            ├─► getBlogPostBySlug()
            └─► getAllCategories()
                │
                ▼
            Contentful API
                │
                └─► Returns data (or error)
```

## 📦 File Organization

```
src/
│
├── App.tsx                          # Main application component
│   └── Controls: routing, data fetching, state
│
├── components/
│   │
│   ├── blog/                        # Blog-specific components
│   │   ├── BlogPostCard.tsx         # Post preview card
│   │   ├── BlogPostDetail.tsx       # Full post view
│   │   ├── BlogPostCardSkeleton.tsx # Loading placeholder
│   │   ├── SearchBar.tsx            # Search input
│   │   ├── CategoryFilter.tsx       # Category badges
│   │   ├── RichTextRenderer.tsx     # Format Contentful rich text
│   │   ├── ErrorState.tsx           # Error display
│   │   ├── EmptyState.tsx           # No results message
│   │   └── MissingCredentials.tsx   # Setup instructions
│   │
│   └── ui/                          # shadcn components (40+)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
│
├── lib/
│   ├── contentful.ts                # Contentful API client
│   │   ├── createClient()
│   │   ├── transformBlogPost()
│   │   ├── getBlogPosts()
│   │   ├── getBlogPostBySlug()
│   │   └── getAllCategories()
│   │
│   └── utils.ts                     # Utility functions
│       └── cn()                     # Class name merger
│
├── types/
│   └── blog.ts                      # TypeScript interfaces
│       ├── BlogPost                 # Raw Contentful data
│       └── BlogPostEntry            # Transformed data
│
├── index.css                        # Global styles + theme
│   ├── Tailwind imports
│   ├── CSS variables (colors)
│   └── Theme mappings
│
└── main.tsx                         # React app entry point
```

## 🎨 Styling System

```
index.css (CSS Variables)
│
├── :root
│   ├── --background
│   ├── --foreground
│   ├── --primary
│   ├── --accent
│   └── ... more variables
│
└── @theme (Tailwind Mapping)
    ├── --color-background: var(--background)
    ├── --color-foreground: var(--foreground)
    └── ... mapped to Tailwind utilities
        │
        ▼
    Tailwind Classes
        │
        ├── bg-background
        ├── text-foreground
        ├── bg-primary
        └── text-accent
            │
            ▼
        Component Styles
            │
            └── Applied in JSX className props
```

## 🔄 Search & Filter Logic

```
User Input
│
├── SearchBar
│   ├── onChange event
│   ├── debounce (300ms)
│   └── setSearchQuery()
│
└── CategoryFilter
    ├── onClick event
    └── setSelectedCategory()
        │
        ▼
    useMemo Hook (filteredPosts)
        │
        ├── Filter by searchQuery
        │   └── Match: title, excerpt, author
        │
        └── Filter by selectedCategory
            └── Match: post.category
            │
            ▼
        Filtered Results
            │
            └── Render BlogPostCard[]
```

## 🚀 Build & Deploy Process

```
Development
│
├── npm run dev
│   ├── Vite dev server starts
│   ├── Loads .env.local
│   ├── Hot module reload enabled
│   └── App runs at localhost:5173
│
Production Build
│
└── npm run build
    ├── TypeScript compilation
    ├── Vite optimization
    ├── Asset bundling
    ├── Code splitting
    └── Output to /dist
        │
        ▼
    Deploy to Hosting
        │
        ├── Vercel
        ├── Netlify
        ├── GitHub Pages
        └── Railway
            │
            └── Add Environment Variables
                │
                ├── VITE_CONTENTFUL_SPACE_ID
                ├── VITE_CONTENTFUL_ACCESS_TOKEN
                └── VITE_CONTENTFUL_ENVIRONMENT
```

## 📡 API Request Flow

```
Component Needs Data
│
└── Call getBlogPosts()
    │
    ├── lib/contentful.ts
    │   └── contentfulClient.getEntries({
    │         content_type: 'blogPost',
    │         order: '-fields.publishedDate'
    │       })
    │
    ▼
Contentful API
    │
    ├── Authenticate (access token)
    ├── Query database
    └── Return results
    │
    ▼
Transform Data
    │
    └── transformBlogPost()
        │
        ├── Extract fields
        ├── Format image URLs
        ├── Parse dates
        └── Return BlogPostEntry[]
        │
        ▼
    Update React State
        │
        ├── setPosts()
        └── Trigger re-render
            │
            ▼
        Display in UI
```

## 🎯 Performance Optimization

```
Initial Load
│
├── Code Splitting
│   └── Lazy load components
│
├── Image Optimization
│   ├── Contentful image API
│   └── ?w=1200&q=80&fm=webp
│
└── API Optimization
    ├── Fetch only required fields
    └── Order by date (server-side)
    │
    ▼
User Interaction
    │
    ├── Debounced Search (300ms)
    ├── Memoized Filtering (useMemo)
    └── Skeleton Loading States
    │
    ▼
Production Build
    │
    ├── Minification
    ├── Tree shaking
    ├── Gzip compression
    └── CDN caching
```

## 🔒 Security Model

```
Credentials (.env.local)
│
├── Local Development
│   ├── Stored in .env.local
│   ├── In .gitignore (not committed)
│   └── Loaded by Vite
│
└── Production Deployment
    ├── Stored in hosting platform
    ├── Injected at build time
    └── Never exposed to client
    │
    ▼
API Communication
    │
    ├── HTTPS only
    ├── Read-only token (Content Delivery API)
    └── No sensitive data in frontend
```

---

## 📊 Content Model Schema

```
Contentful Space
│
└── Content Type: "blogPost"
    │
    ├── title: String (required)
    │   └── Max 200 characters
    │
    ├── slug: String (required, unique)
    │   └── Pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$
    │
    ├── excerpt: Text (required)
    │   └── 50-500 characters
    │
    ├── content: RichText (required)
    │   ├── Headings (H1-H6)
    │   ├── Paragraphs
    │   ├── Lists (ordered, unordered)
    │   ├── Links
    │   ├── Images (embedded)
    │   └── Blockquotes
    │
    ├── publishedDate: DateTime (required)
    │
    ├── featuredImage: Asset (optional)
    │   └── Image file (JPEG, PNG, WebP)
    │
    ├── author: String (optional)
    │
    ├── category: String (optional)
    │
    └── tags: String[] (optional)
```

---

## 🎨 Design System Hierarchy

```
Theme Variables (index.css)
│
├── Colors (oklch values)
├── Radius (border radius)
└── Fonts (Google Fonts)
    │
    ▼
Tailwind Configuration
    │
    └── Map to utility classes
        │
        ▼
    shadcn Components
        │
        └── Pre-styled with theme
            │
            ▼
        Custom Components
            │
            └── Compose shadcn + custom styles
                │
                ▼
            Final UI
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Type-safe data flow
- ✅ Reusable components
- ✅ Scalable structure
- ✅ Secure credential management
- ✅ Optimized performance
