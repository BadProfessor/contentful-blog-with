# Contentful Blog Application

> 🎉 **Ready to start?** See **[START.md](./START.md)** for the quickest path to running your blog!

A modern, elegant blog platform built with React, Vite, and Contentful CMS. This application provides a beautiful reading experience with search, filtering, and responsive design.

![Tech Stack](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## 🚀 Quick Links

- **[START.md](./START.md)** - Start here! Overview and next steps
- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 10 minutes
- **[CREDENTIALS.md](./CREDENTIALS.md)** - Where to add your Contentful API keys
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[DOCS.md](./DOCS.md)** - Documentation index

## 🌟 Features

- 📝 **Rich Content Display** - Beautiful typography and formatting for blog posts
- 🔍 **Real-time Search** - Instant search across titles, content, and authors
- 🏷️ **Category Filtering** - Filter posts by category with visual indicators
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Loading** - Skeleton loaders and optimized image loading
- 🎨 **Modern Design** - Clean, minimalist interface with smooth animations
- 🔒 **Secure** - Environment variables for API credentials
- ♿ **Accessible** - WCAG AA compliant color contrast and keyboard navigation

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Contentful

#### Get Your Contentful Credentials

1. Create a free account at [contentful.com](https://www.contentful.com/sign-up/)
2. Create a new space (or use an existing one)
3. Go to **Settings** → **API keys**
4. Click **Add API key** (or select an existing key)
5. Copy your:
   - **Space ID**
   - **Content Delivery API - access token**

#### Add Credentials to Environment Variables

Open the `.env.local` file in the root directory and add your credentials:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

⚠️ **Important**: The `.env.local` file is already included in `.gitignore` and will not be committed to version control.

### 3. Create Content Model in Contentful

#### Option A: Using Contentful CLI (Recommended)

See the `contentful-setup.md` file for detailed CLI setup instructions.

#### Option B: Manual Setup

1. In your Contentful space, go to **Content model**
2. Click **Add content type**
3. Name it **"Blog Post"** (API identifier: `blogPost`)
4. Add the following fields:

| Field Name       | Field ID        | Type           | Required | Notes                          |
|------------------|-----------------|----------------|----------|--------------------------------|
| Title            | title           | Short text     | Yes      | Post title                     |
| Slug             | slug            | Short text     | Yes      | URL-friendly identifier        |
| Excerpt          | excerpt         | Long text      | Yes      | Brief summary (200-300 chars) |
| Content          | content         | Rich text      | Yes      | Main article content           |
| Published Date   | publishedDate   | Date & time    | Yes      | Publication date               |
| Featured Image   | featuredImage   | Media          | No       | Hero image (16:9 recommended) |
| Author           | author          | Short text     | No       | Author name                    |
| Category         | category        | Short text     | No       | Category for filtering         |
| Tags             | tags            | Short text, list | No    | Topic tags                     |

5. **Save** the content type

### 4. Create Sample Content

1. Go to **Content** in your Contentful space
2. Click **Add entry** → **Blog Post**
3. Fill in all the fields:
   - **Title**: "Welcome to Our Blog"
   - **Slug**: "welcome-to-our-blog"
   - **Excerpt**: "Discover amazing stories and insights from our team..."
   - **Content**: Add rich text with headings, paragraphs, images
   - **Published Date**: Select today's date
   - **Featured Image**: Upload an image (1200x675px recommended)
   - **Author**: "Your Name"
   - **Category**: "Announcements"
   - **Tags**: ["welcome", "introduction"]
4. Click **Publish** (not just Save!)
5. Create 3-5 more sample posts for a complete experience

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
/workspaces/spark-template/
├── .env.local                 # Your Contentful credentials (DO NOT COMMIT)
├── .env.example               # Example environment variables
├── SETUP.md                   # Detailed setup instructions
├── PRD.md                     # Product requirements document
├── contentful-setup.md        # Contentful CLI setup guide
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── src/
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles and theme
│   ├── components/
│   │   ├── blog/             # Blog-specific components
│   │   │   ├── BlogPostCard.tsx
│   │   │   ├── BlogPostDetail.tsx
│   │   │   ├── BlogPostCardSkeleton.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── RichTextRenderer.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── MissingCredentials.tsx
│   │   └── ui/               # shadcn UI components
│   ├── lib/
│   │   ├── contentful.ts     # Contentful API client
│   │   └── utils.ts          # Utility functions
│   └── types/
│       └── blog.ts           # TypeScript type definitions
└── vite.config.ts            # Vite configuration
```

## 🎨 Design System

### Colors

The application uses a warm, editorial color palette:

- **Primary**: Deep charcoal for readability
- **Accent**: Sage green for interactive elements
- **Background**: Soft ivory for comfortable reading
- **Muted**: Warm grays for secondary text

### Typography

- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (content)

### Spacing

- Mobile: `px-6`, `py-12`
- Desktop: `px-12`, `py-20`
- Grid gaps: `gap-8` to `gap-12`

## 🔧 Customization

### Changing Colors

Edit `src/index.css` and modify the CSS variables in the `:root` selector:

```css
:root {
  --background: oklch(0.99 0.002 85);
  --foreground: oklch(0.25 0.01 270);
  --accent: oklch(0.65 0.08 150);
  /* ... more variables */
}
```

### Changing Fonts

1. Update the Google Fonts link in `index.html`
2. Update the font family in `src/index.css`:

```css
@theme {
  --font-display: 'Your Display Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Modifying Content Model

If you add/change fields in Contentful:

1. Update `src/types/blog.ts` with new field types
2. Update `src/lib/contentful.ts` to handle new fields
3. Update components to display new fields

## 🐛 Troubleshooting

### "Missing Contentful credentials" Error

- Verify `.env.local` exists in the root directory
- Check that credentials are correct (no quotes, no extra spaces)
- Restart the dev server: Stop with `Ctrl+C`, then run `npm run dev` again

### No Posts Appearing

- Ensure posts are **Published** in Contentful (not just saved as drafts)
- Check browser console (F12) for API errors
- Verify your Space ID and Access Token are correct
- Make sure the content type is named `blogPost` (case-sensitive)

### Images Not Loading

- Check that images are published in Contentful
- Verify image URLs are accessible
- Check browser console for CORS or loading errors

### Search/Filter Not Working

- Clear browser cache and reload
- Check that posts have the required fields (title, excerpt, category)
- Verify JavaScript is enabled in your browser

### API Rate Limits

Contentful free tier has rate limits:
- 55 requests per second
- 500,000 API calls per month

If you exceed limits:
- Wait a few minutes before trying again
- Consider upgrading your Contentful plan for higher limits

## 📚 Additional Resources

- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Contentful Content Model Guide](https://www.contentful.com/developers/docs/concepts/data-model/)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 💡 Tips for Production

### Before Deploying:

1. **Environment Variables**: Set up environment variables in your hosting platform (Vercel, Netlify, etc.)
2. **Content Model**: Ensure all required fields are present and published
3. **Images**: Optimize images in Contentful (use appropriate sizes, formats)
4. **Webhooks**: Set up Contentful webhooks to trigger rebuilds on content changes
5. **Error Tracking**: Consider adding error tracking (Sentry, LogRocket, etc.)
6. **Analytics**: Add analytics to track page views and user behavior

### Deployment Platforms:

This app works great with:
- **Vercel** - Zero config deployment
- **Netlify** - Automatic builds and deploys
- **GitHub Pages** - Free hosting for static sites
- **Railway** - Easy deployment with environment variables

### Contentful Best Practices:

1. Use **validation rules** on fields (e.g., slug format, excerpt length)
2. Set up **workflows** for content approval
3. Use **environments** for staging/production
4. Enable **versioning** to track content changes
5. Create **content templates** for consistent posts

---

**Need Help?** Check the `SETUP.md` file for more detailed instructions or open an issue on GitHub.

**Happy Blogging! ✨**
