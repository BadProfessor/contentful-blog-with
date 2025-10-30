# Contentful Blog App - Setup Instructions

This is a React + Vite blog application that uses Contentful as a headless CMS backend.

## Prerequisites

- Node.js 18+ installed
- A Contentful account (free tier available at https://www.contentful.com/)

## Getting Your Contentful Credentials

1. **Log in to Contentful**: Visit https://app.contentful.com/
2. **Select or Create a Space**: Choose an existing space or create a new one
3. **Get Your Credentials**:
   - Go to **Settings** → **API keys**
   - Click **Add API key** (or use an existing key)
   - You'll need:
     - **Space ID**: Found at the top of the API keys page
     - **Content Delivery API - access token**: The token for the Content Delivery API

## Setting Up Environment Variables

1. **Open the `.env.local` file** in the root directory
2. **Add your Contentful credentials**:

```env
VITE_CONTENTFUL_SPACE_ID=your_actual_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

3. **Save the file**

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Contentful Content Model Setup

Your Contentful space should have a **Blog Post** content type with these fields:

### Required Fields:
- **Title** (Short text) - Field ID: `title`
- **Slug** (Short text) - Field ID: `slug`
- **Excerpt** (Long text) - Field ID: `excerpt`
- **Content** (Rich text) - Field ID: `content`
- **Published Date** (Date & time) - Field ID: `publishedDate`
- **Featured Image** (Media - Single file) - Field ID: `featuredImage`

### Optional Fields:
- **Author** (Short text) - Field ID: `author`
- **Category** (Short text) - Field ID: `category`
- **Tags** (Short text, list) - Field ID: `tags`

### Creating the Content Model in Contentful:

1. Go to **Content model** in your Contentful space
2. Click **Add content type**
3. Name it "Blog Post" (API identifier will be `blogPost`)
4. Add the fields listed above with their respective types
5. Save the content type

## Installing Dependencies

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Creating Sample Content

1. Go to **Content** in your Contentful space
2. Click **Add entry** → **Blog Post**
3. Fill in the required fields:
   - Add a title
   - Create a URL-friendly slug (e.g., "my-first-post")
   - Write an excerpt (summary)
   - Add rich content
   - Upload a featured image
   - Set a published date
   - Add author name and category
4. Click **Publish** in the top right
5. Repeat to create 3-5 sample posts

## Troubleshooting

### "Missing Contentful credentials" Error
- Check that `.env.local` exists and has valid credentials
- Ensure the file is in the root directory (same level as `package.json`)
- Restart the dev server after adding credentials

### No Posts Appearing
- Verify posts are **published** (not just saved as drafts) in Contentful
- Check the browser console for API errors
- Verify your access token has read permissions

### API Rate Limits
- Free Contentful tier has rate limits
- If you hit limits, wait a few minutes and try again

## Project Structure

```
src/
├── components/
│   ├── blog/              # Blog-specific components
│   │   ├── BlogPostCard.tsx
│   │   ├── BlogPostDetail.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── RichTextRenderer.tsx
│   └── ui/                # shadcn components (pre-installed)
├── lib/
│   ├── contentful.ts      # Contentful client setup
│   └── utils.ts
├── types/
│   └── blog.ts            # TypeScript types for blog data
├── App.tsx                # Main application component
└── index.css              # Tailwind styles and theme
```

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **CMS**: Contentful
- **Icons**: Phosphor Icons
- **Fonts**: Playfair Display + Inter (Google Fonts)

## Support

For Contentful-specific questions: https://www.contentful.com/help/
For app issues: Check the browser console for errors
