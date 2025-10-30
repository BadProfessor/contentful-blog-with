# Contentful Blog Platform - Recreation Prompt

Use this prompt to recreate this Contentful blog application in a new GitHub Spark environment.

---

## Prompt for GitHub Spark

```
Create a modern, elegant blog platform that integrates with Contentful CMS. This should be a beautiful, editorial-style reading experience with search and filtering capabilities.

### Core Features:

1. **Contentful Integration**
   - Fetch blog posts from Contentful CMS using the Contentful SDK
   - Use environment variables (VITE_CONTENTFUL_SPACE_ID, VITE_CONTENTFUL_ACCESS_TOKEN, VITE_CONTENTFUL_ENVIRONMENT) for API credentials
   - Display clear error messages if credentials are missing
   - Support flexible content model with fallbacks for common field name variations

2. **Blog Post Display**
   - Grid layout of blog post cards (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Each card shows: featured image, title, excerpt, author, category badge, and published date
   - Click on a card to view full post detail with rich text content rendering
   - Support for Contentful's rich text format with proper rendering of headings, paragraphs, lists, images, and embedded content

3. **Search & Filtering**
   - Real-time search bar that filters posts by title, excerpt, and author
   - Category filter dropdown to filter posts by category
   - Display active filters and result count
   - Elegant empty states when no results match filters

4. **Loading & Error States**
   - Skeleton loaders while fetching posts from API
   - Error state with retry button for API failures
   - Missing credentials state with setup instructions
   - Empty state when no posts exist

5. **User Experience**
   - Smooth transitions between list and detail views
   - Back button on detail view returns to blog list
   - Responsive design that works beautifully on all screen sizes
   - Fast loading with optimized images
   - Scroll to top when opening post details

### Design Requirements:

**Color Palette (Editorial/Magazine Style):**
- Use a warm, sophisticated palette with sage green accents
- Background: Soft ivory/cream (oklch(0.99 0.002 85))
- Foreground: Deep charcoal (oklch(0.25 0.01 270))
- Primary: Medium purple-gray (oklch(0.38 0.13 285))
- Accent: Sage green (oklch(0.65 0.08 150)) for interactive elements and category badges
- Muted: Warm grays for secondary text
- Cards: Pure white with subtle shadows

**Typography:**
- Use Inter font for all text (already available)
- Clear typographic hierarchy with generous line spacing
- Refined, readable text sizes appropriate for long-form reading

**Layout:**
- Generous whitespace and padding (px-6 py-12 on mobile, px-12 py-20 on desktop)
- Clean header with logo and tagline
- Container with max-width for comfortable reading
- Grid layout with gap-8 spacing between cards

**Components to Use:**
- Card, Button, Input, Badge, Separator from shadcn
- Use Toaster (sonner) for notifications
- Skeleton components for loading states
- Use Phosphor icons (MagnifyingGlass for search, ArrowLeft for back navigation, FunnelSimple for filters, etc.)

### Technical Implementation:

**File Structure:**
- `/src/components/blog/` - All blog-specific components
  - BlogPostCard.tsx - Card component for post preview
  - BlogPostDetail.tsx - Full post view with rich text
  - BlogPostCardSkeleton.tsx - Loading skeleton
  - SearchBar.tsx - Search input component
  - CategoryFilter.tsx - Category filter dropdown
  - RichTextRenderer.tsx - Contentful rich text renderer
  - EmptyState.tsx - No results state
  - ErrorState.tsx - Error display with retry
  - MissingCredentials.tsx - Setup instructions
  - Logo.tsx - Site logo component
- `/src/lib/contentful.ts` - Contentful client and API functions
- `/src/types/blog.ts` - TypeScript interfaces for blog data

**Key Functions:**
- `getBlogPosts()` - Fetch all posts from Contentful, sort by date descending
- `transformBlogPost()` - Transform Contentful entry to app format with flexible field mapping
- Rich text rendering using @contentful/rich-text-react-renderer
- Real-time filtering using useMemo for performance

**Environment Variables:**
Create a `.env.example` file with:
```
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

**Error Handling:**
- Validate credentials on app load
- Show helpful setup instructions if credentials missing
- Display clear error messages with retry options for API failures
- Gracefully handle missing fields with fallbacks
- Console warnings for debugging

**Contentful Content Model:**
The app should be flexible and work with various field names, but the expected model is:
- title (Text)
- slug (Text)
- excerpt (Text)
- content (Rich Text)
- publishedDate (Date)
- featuredImage (Media)
- author (Text)
- category (Text)
- tags (Text, list)

### Additional Polish:

- Smooth fade-in animations for cards and detail views
- Hover effects on cards (subtle lift and shadow)
- Loading states that maintain layout (no content shift)
- Clean footer with copyright
- Proper date formatting (format: "MMM dd, yyyy")
- Responsive images with proper aspect ratios
- Keyboard navigation support
- WCAG AA compliant color contrast

### Documentation:

Create comprehensive documentation files:
- README.md - Full setup guide and feature overview
- SETUP.md - Detailed Contentful setup instructions
- CREDENTIALS.md - Where and how to add API credentials
- contentful-setup.md - Content model creation guide
- PRD.md - Product requirements and design system

### Install Required Packages:

The following packages need to be installed:
- contentful (Contentful SDK)
- @contentful/rich-text-react-renderer (for rendering rich text)
- @contentful/rich-text-types (type definitions)
- date-fns (for date formatting)

All other necessary packages (React, Vite, Tailwind, shadcn components, Phosphor icons, sonner, framer-motion) should already be available in the Spark template.
```

---

## After Recreation Steps

Once the app is created, users will need to:

1. Install the Contentful packages:
   ```bash
   npm install contentful @contentful/rich-text-react-renderer @contentful/rich-text-types date-fns
   ```

2. Create a Contentful account and space at [contentful.com](https://www.contentful.com/sign-up/)

3. Get API credentials from Settings → API keys

4. Create a `.env.local` file in the root with their credentials:
   ```env
   VITE_CONTENTFUL_SPACE_ID=your_actual_space_id
   VITE_CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
   VITE_CONTENTFUL_ENVIRONMENT=master
   ```

5. Create the blog post content model in Contentful (see contentful-setup.md)

6. Create and publish some sample blog posts

7. Run the dev server: `npm run dev`

---

## Key Features to Verify

After recreation, ensure these features work:

- ✅ App loads and shows skeleton loaders
- ✅ Missing credentials message displays if no .env.local
- ✅ Blog posts fetch and display in grid layout
- ✅ Search filters posts in real-time
- ✅ Category filter works correctly
- ✅ Clicking a card opens full post detail
- ✅ Back button returns to blog list
- ✅ Rich text content renders properly
- ✅ Images load and display correctly
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ Error states show retry button
- ✅ Empty states display when appropriate
- ✅ Smooth animations and transitions
- ✅ All documentation files are created

---

## Design Checklist

Ensure the recreated app has:

- ✅ Warm, editorial color palette (sage green accents)
- ✅ Inter font throughout
- ✅ Generous whitespace and padding
- ✅ Clean, minimal header with logo
- ✅ Card-based layout with subtle shadows
- ✅ Smooth hover effects on cards
- ✅ Clear typographic hierarchy
- ✅ Category badges with accent color
- ✅ Professional footer
- ✅ Beautiful empty and error states
- ✅ Consistent 44px touch targets
- ✅ WCAG AA compliant contrast ratios

---

## Customization Notes

The recreated app can be customized by:

- Changing colors in `src/index.css` (CSS variables)
- Updating fonts in `index.html` and `src/index.css`
- Modifying the content model mapping in `src/lib/contentful.ts`
- Adjusting layout in component files
- Adding new features like pagination, related posts, comments, etc.
