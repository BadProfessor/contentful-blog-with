# Planning Guide

A modern blog platform showcasing Contentful's CMS capabilities with the company's signature branding, delivering professional content experiences with seamless navigation and responsive design.

**Experience Qualities**:
1. **Professional** - Clean, modern design language that communicates reliability and technical excellence
2. **Effortless** - Intuitive navigation and smooth transitions make content discovery natural
3. **Branded** - Contentful's signature purple palette and cohesive design system create instant brand recognition

**Complexity Level**: Light Application (multiple features with basic state)
  - Displays blog posts from Contentful CMS with list and detail views, search functionality, and category filtering

## Essential Features

### Contentful Integration
- **Functionality**: Connects to Contentful CMS to fetch real blog posts with credentials from environment variables
- **Purpose**: Enables content management through Contentful's interface with real-time updates
- **Trigger**: Application startup, fetches posts from Contentful API
- **Progression**: App loads → Credentials validated → API request to Contentful → Transform data → Display posts
- **Success criteria**: Connection succeeds, posts load within 2s, graceful error handling for missing credentials or API failures

### Blog Post List View
- **Functionality**: Displays a grid of blog post cards fetched from Contentful with featured images, titles, excerpts, publication dates, and author information
- **Purpose**: Provides users with an overview of available content and enables quick scanning
- **Trigger**: Landing on the home page or navigating back from a post detail, after successful Contentful fetch
- **Progression**: User loads app → Posts load from Contentful API → Loading skeletons display → Grid displays posts → User can scroll and browse
- **Success criteria**: All posts display correctly, images load with proper CDN URLs, excerpts are properly truncated

### Blog Post Detail View
- **Functionality**: Renders full blog post content with rich text formatting, images, metadata
- **Purpose**: Delivers the complete reading experience with proper typography and formatting
- **Trigger**: Clicking on a post card from the list view
- **Progression**: User clicks post → Detail view loads → Full content renders with proper formatting
- **Success criteria**: Content renders with correct formatting, images load properly, rich text displays correctly

### Search Functionality
- **Functionality**: Real-time search that filters posts by title, excerpt, and author
- **Purpose**: Helps users quickly find specific content they're interested in
- **Trigger**: User types in the search input field
- **Progression**: User types query → Posts filter in real-time → Results update immediately → Clear search resets view
- **Success criteria**: Search responds within 100ms, matches update instantly, no results state displays appropriately

### Category Filtering
- **Functionality**: Filter posts by category tags with visual indicators
- **Purpose**: Enables users to explore content by topic area
- **Trigger**: Clicking a category in the filter dropdown
- **Progression**: User selects category → Posts filter to show only matching items → Active filter displays visually → Clear filter to show all
- **Success criteria**: Filters apply instantly, active state is clear, filter combines with search

### Data Persistence
- **Functionality**: Blog posts are fetched from Contentful CMS via REST API using configured credentials
- **Purpose**: Provides dynamic content management through Contentful's interface with professional CMS features
- **Trigger**: Application startup validates credentials and fetches posts
- **Progression**: App loads → Check env variables → Initialize Contentful client → Fetch posts → Display content or error
- **Success criteria**: Credentials validate correctly, API calls succeed, loading states display, errors show helpful messages

## Edge Case Handling

- **Empty Search Results**: Display elegant empty state when search returns no results with helpful message
- **No Category Match**: Show empty state when filtering by category with no matching posts
- **Long Content**: Properly handle very long blog posts with smooth scrolling
- **Missing Data**: Gracefully handle posts without optional fields (images, authors, tags) with appropriate fallbacks
- **Missing Credentials**: Show setup guide with clear instructions when Contentful credentials are not configured
- **API Errors**: Display error state with retry button when Contentful API fails or content type doesn't exist
- **Loading States**: Show skeleton loaders while fetching posts from Contentful
- **No Published Posts**: Show empty state when Contentful space has no published blog posts

## Design Direction

The design should embody Contentful's professional, modern brand identity - clean, purposeful, and technical yet approachable. The interface should feel like a premium SaaS product with sharp UI elements and Contentful's signature purple and indigo color palette that communicates innovation and reliability.

## Color Selection

Custom palette matching Contentful's official brand colors from their website - sophisticated purples create a professional, modern technology brand aesthetic.

- **Primary Color**: Contentful Purple (oklch(0.38 0.13 285)) - The official brand color for primary actions and key UI elements, matching contentful.com
- **Secondary Colors**: Light Purple (oklch(0.95 0.01 285)) for secondary actions and supporting elements
- **Accent Color**: Medium Purple (oklch(0.68 0.15 285)) for hover states and highlights
- **Foreground/Background Pairings**:
  - Background (Off-White oklch(0.99 0 0)): Dark text (oklch(0.18 0.01 285)) - Ratio 13.8:1 ✓
  - Card (White #FFFFFF): Dark text (oklch(0.18 0.01 285)) - Ratio 14.2:1 ✓
  - Primary (Contentful Purple): White text (#FFFFFF) - Ratio 6.1:1 ✓
  - Accent (Medium Purple): White text (#FFFFFF) - Ratio 4.5:1 ✓
  - Muted (Light Gray): Medium text - Ratio 8.4:1 ✓

## Font Selection

Typography should be clean and professional with excellent readability - Inter for all text creates a modern, cohesive brand experience that aligns with Contentful's design system.

- **Typographic Hierarchy**:
  - H1 (Logo/Brand): Inter SemiBold/20px/tight letter-spacing - lowercase "contentful" to match official brand
  - H2 (Post Title in List): Inter SemiBold/20px/tight leading-snug
  - H3 (Section Headings): Inter SemiBold/18px/normal leading-snug
  - Body (Post Content): Inter Regular/16px/relaxed leading-relaxed
  - Small (Metadata): Inter Regular/12px/normal text-muted-foreground
  - Caption (Dates): Inter Regular/12px/normal text-muted-foreground

## Animations

Animations should be subtle and purposeful, enhancing the feeling of quality without drawing attention to themselves - gentle fades and smooth transitions create a refined, polished experience.

- **Purposeful Meaning**: Smooth page transitions and gentle hover states reinforce the premium, editorial feel while guiding attention naturally
- **Hierarchy of Movement**: Post cards subtly lift on hover (most important), search results fade in/out smoothly (secondary), skeleton loaders pulse gently (functional feedback)

## Component Selection

- **Components**: 
  - Card component for post previews with hover effects
  - Input for search with clear button
  - Badge for category tags
  - ScrollArea for content overflow
  - Separator for visual breaks
  - Button for actions and navigation
  - Select for category filtering
  
- **Customizations**: 
  - Custom BlogPostCard component combining Card with image, metadata, and excerpt
  - Custom RichTextRenderer for rich text content formatting
  - Custom SearchBar with debounced input
  - Custom CategoryFilter with dropdown select
  - Custom EmptyState for no results
  
- **States**: 
  - Buttons: Subtle scale on hover (98%), opacity change (90%) on press
  - Cards: Shadow lift and subtle scale (102%) on hover with smooth 200ms transition
  - Inputs: Border color change to accent on focus with 150ms transition
  
- **Icon Selection**: 
  - MagnifyingGlass for search
  - X for clearing search/filters
  - Article for empty blog post state
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
