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
**Components to Use:**

- Use Phosphor icons (
### Technical Implementation:
**File Structure:**
  - BlogPostCard.tsx - Card component fo
  - BlogPostCardSkeleton.tsx - Loading skeleton

  - EmptyState.tsx - No resul

- `/src/lib/content

- `getBlogPosts()` - Fetch all posts from Contentful, 
- Rich text rendering using @contentful/rich-text-reac

Create a `.env.example` file with:
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ENVIRONMENT=master

- Validate credentials on app load
- Display clear error messages with retry optio
- Console warnings for debugging
**Contentful Content Model:**
- title (Text)

- publishedDate (D
- author (Text)
- tags (Text, list)
### Additional Polish:
- Smooth fade-in animations for cards and detail vi

- Proper date formatting (
- Keyboard navigation support


- README.md - Full setup guide and feature overview
- CREDENTIALS.md - Where and how t
- P

The following packa
- @contentful/rich-text-react-rend
- date-fns (for date formatting)
All other necessary packages (React, Vite, Tailwind, shadcn compon




   ```bash
   ```
2. Create a C
3. Get API crede
4. Create a `.env.loc
   VITE_CONTENTFUL_SPA
   VITE_CONTENTFUL_ENVI







- ✅ Missing credentials message displays if no .e
- ✅ Search filters posts in real-time
- ✅ Clicking a card opens ful
- ✅ Rich text content renders properly
- ✅ Responsive design works on mobile/tablet/
- ✅ Empty states display when
- ✅ All documentation files are cr

## Design Checklis

- ✅ Warm, editorial color palette (sage g
- ✅ Generous whitespace and padding
- ✅ Card-based layout with subtle shadows
- ✅ Clear typographic hierarchy
- ✅ Professional footer
- ✅ Consistent 44px touch targets




- Updating fonts in `index.ht
- Adjusting layout in component files





















































































