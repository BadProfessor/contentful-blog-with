# Planning Guide

A modern, elegant blog platform powered by Contentful CMS that delivers beautiful content experiences with seamless navigation and responsive design.

**Experience Qualities**:
1. **Refined** - Clean typography and generous spacing create a premium reading experience
2. **Effortless** - Intuitive navigation and smooth transitions make content discovery natural
3. **Inviting** - Warm colors and thoughtful details encourage exploration and engagement

**Complexity Level**: Light Application (multiple features with basic state)
  - Fetches and displays blog posts from Contentful CMS with list and detail views, search functionality, and category filtering

## Essential Features

### Blog Post List View
- **Functionality**: Displays a grid of blog post cards with featured images, titles, excerpts, publication dates, and author information
- **Purpose**: Provides users with an overview of available content and enables quick scanning
- **Trigger**: Landing on the home page or navigating back from a post detail
- **Progression**: User loads app → Posts fetch from Contentful → Grid displays with loading states → User can scroll and browse
- **Success criteria**: All published posts load within 2 seconds, images display correctly, excerpts are properly truncated

### Blog Post Detail View
- **Functionality**: Renders full blog post content with rich text formatting, images, metadata, and related posts
- **Purpose**: Delivers the complete reading experience with proper typography and formatting
- **Trigger**: Clicking on a post card from the list view
- **Progression**: User clicks post → Route changes → Detail view loads → Full content renders with proper formatting → Related posts appear at bottom
- **Success criteria**: Content renders with correct formatting, images load properly, markdown/rich text displays correctly

### Search Functionality
- **Functionality**: Real-time search that filters posts by title and content
- **Purpose**: Helps users quickly find specific content they're interested in
- **Trigger**: User types in the search input field
- **Progression**: User types query → Posts filter in real-time → Results update immediately → Clear search resets view
- **Success criteria**: Search responds within 100ms, matches are highlighted, no results state displays appropriately

### Category Filtering
- **Functionality**: Filter posts by category tags with visual indicators
- **Purpose**: Enables users to explore content by topic area
- **Trigger**: Clicking a category badge or filter button
- **Progression**: User selects category → Posts filter to show only matching items → Active filter displays visually → Click again to clear
- **Success criteria**: Filters apply instantly, active state is clear, multiple filters can be combined

### Environment Configuration
- **Functionality**: Secure storage of Contentful API credentials via environment variables
- **Purpose**: Keeps sensitive API keys secure and enables easy deployment across environments
- **Trigger**: Application startup reads from .env.local file
- **Progression**: Developer adds credentials to .env.local → Vite loads variables → App initializes Contentful client → API calls authenticate
- **Success criteria**: Clear documentation provided, environment variables properly prefixed, helpful error messages if credentials missing

## Edge Case Handling

- **Missing Environment Variables**: Display clear error message with instructions for adding Contentful credentials
- **Network Failures**: Show retry button with friendly error message when API calls fail
- **Empty Content**: Display elegant empty state when no posts exist or search returns no results
- **Slow Loading**: Show skeleton loaders during initial fetch to maintain perceived performance
- **Malformed Content**: Gracefully handle missing fields (images, excerpts) with fallbacks
- **Long Content**: Properly handle very long blog posts with smooth scrolling and reading progress indicators

## Design Direction

The design should feel refined and editorial, like a premium digital magazine - elegant yet approachable with generous whitespace and sophisticated typography. A minimal interface serves the content, letting beautiful imagery and well-crafted writing take center stage.

## Color Selection

Analogous (adjacent colors on color wheel) - A sophisticated palette of warm neutrals with sage green accents creates a calm, inviting reading environment that feels both modern and timeless.

- **Primary Color**: Deep charcoal (oklch(0.25 0.01 270)) - Conveys sophistication and readability for primary text
- **Secondary Colors**: Warm gray (oklch(0.45 0.01 60)) for secondary text and subtle UI elements; Soft beige (oklch(0.95 0.02 80)) for card backgrounds
- **Accent Color**: Sage green (oklch(0.65 0.08 150)) for interactive elements, links, and category badges - feels fresh and inviting without overwhelming
- **Foreground/Background Pairings**:
  - Background (Ivory #FDFCFB): Deep charcoal text (#3A3A3C) - Ratio 12.1:1 ✓
  - Card (Soft Beige #F8F6F3): Deep charcoal text (#3A3A3C) - Ratio 11.2:1 ✓
  - Primary (Deep Charcoal #3A3A3C): Ivory text (#FDFCFB) - Ratio 12.1:1 ✓
  - Accent (Sage Green #8BAA7F): White text (#FFFFFF) - Ratio 4.6:1 ✓
  - Muted (Warm Gray #9A9A8C): Deep charcoal text (#3A3A3C) - Ratio 4.8:1 ✓

## Font Selection

Typography should feel refined and editorial with excellent readability - a contemporary serif for headings adds personality while a clean sans-serif ensures effortless body text reading.

- **Typographic Hierarchy**:
  - H1 (Page Title): Playfair Display Bold/48px/tight letter-spacing/-0.02em
  - H2 (Post Title in List): Playfair Display SemiBold/32px/tight leading-snug
  - H3 (Section Headings): Playfair Display SemiBold/24px/normal leading-snug
  - Body (Post Content): Inter Regular/18px/relaxed leading-relaxed/letter-spacing normal
  - Small (Metadata): Inter Medium/14px/normal tracking-wide uppercase
  - Caption (Dates): Inter Regular/14px/normal text-muted-foreground

## Animations

Animations should be subtle and purposeful, enhancing the feeling of quality without drawing attention to themselves - gentle fades and smooth transitions create a refined, polished experience.

- **Purposeful Meaning**: Smooth page transitions and gentle hover states reinforce the premium, editorial feel while guiding attention naturally
- **Hierarchy of Movement**: Post cards subtly lift on hover (most important), search results fade in/out smoothly (secondary), skeleton loaders pulse gently (functional feedback)

## Component Selection

- **Components**: 
  - Card component for post previews with hover effects
  - Input for search with clear button
  - Badge for category tags
  - Skeleton for loading states
  - ScrollArea for content overflow
  - Separator for visual breaks
  - Button for actions and navigation
  
- **Customizations**: 
  - Custom BlogPostCard component combining Card with image, metadata, and excerpt
  - Custom RichTextRenderer for Contentful rich text content
  - Custom SearchBar with debounced input
  - Custom CategoryFilter with multi-select capability
  - Custom ErrorBoundary with retry functionality
  
- **States**: 
  - Buttons: Subtle scale on hover (98%), opacity change (90%) on press
  - Cards: Shadow lift and subtle scale (102%) on hover with smooth 200ms transition
  - Inputs: Border color change to accent on focus with 150ms transition
  - Badges: Background darkens on hover, cursor indicates clickability
  
- **Icon Selection**: 
  - MagnifyingGlass for search
  - X for clearing search/filters
  - Article for empty blog post state
  - Warning for error states
  - ArrowLeft for back navigation
  - Tag for categories
  
- **Spacing**: 
  - Container max-width: 1200px with px-6 (mobile) to px-12 (desktop)
  - Card grid: gap-8 (mobile) to gap-12 (desktop)
  - Section spacing: py-12 (mobile) to py-20 (desktop)
  - Card padding: p-6 with inner content spacing of gap-4
  
- **Mobile**: 
  - Single column grid on mobile (<768px), 2 columns on tablet, 3 columns on desktop
  - Stack post metadata vertically on mobile, horizontal on desktop
  - Collapsible category filter bar on mobile
  - Touch-friendly hit areas (44px minimum) for all interactive elements
  - Reduced heading sizes by 25% on mobile while maintaining hierarchy
