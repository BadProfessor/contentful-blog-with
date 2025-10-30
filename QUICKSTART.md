# Quick Start Guide - Developer Edition

Get your Contentful blog running in under 10 minutes! ⚡

## Prerequisites
- Node.js 18+ installed
- A Contentful account ([Sign up free](https://www.contentful.com/sign-up/))

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Get Contentful Credentials (2 min)

1. Go to https://app.contentful.com/
2. Select or create a space
3. Navigate to: **Settings** → **API keys**
4. Copy:
   - **Space ID**
   - **Content Delivery API - access token**

## Step 3: Add Environment Variables (1 min)

Open `.env.local` and add your credentials:

```env
VITE_CONTENTFUL_SPACE_ID=abc123xyz
VITE_CONTENTFUL_ACCESS_TOKEN=your_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

## Step 4: Create Content Model (3 min)

In Contentful web app:

1. Go to **Content model** → **Add content type**
2. Name: `Blog Post`, API ID: `blogPost`
3. Add these fields (click Add field for each):

| Field          | Type          | ID              | Required |
|----------------|---------------|-----------------|----------|
| Title          | Short text    | `title`         | ✅       |
| Slug           | Short text    | `slug`          | ✅       |
| Excerpt        | Long text     | `excerpt`       | ✅       |
| Content        | Rich text     | `content`       | ✅       |
| Published Date | Date & time   | `publishedDate` | ✅       |
| Featured Image | Media (one)   | `featuredImage` | ❌       |
| Author         | Short text    | `author`        | ❌       |
| Category       | Short text    | `category`      | ❌       |
| Tags           | Short text, list | `tags`       | ❌       |

4. Save the content type

## Step 5: Add Sample Content (2 min)

1. Go to **Content** → **Add entry** → **Blog Post**
2. Fill in:
   - **Title**: "Welcome to Our Blog"
   - **Slug**: "welcome-to-our-blog"
   - **Excerpt**: "Your blog excerpt here (50+ characters)"
   - **Content**: Add some rich text content
   - **Published Date**: Select today
   - **Featured Image**: Upload an image (optional)
   - **Author**: "Your Name"
   - **Category**: "Announcements"
3. Click **Publish** (top right)
4. Create 2-3 more posts

## Step 6: Run the App (1 min)

```bash
npm run dev
```

Open http://localhost:5173

**Done! 🎉** Your blog should now be running!

---

## Troubleshooting

### "Missing Contentful credentials"
- Check `.env.local` exists and has correct values
- No quotes around values
- Restart dev server

### No posts showing
- Verify posts are **Published** (not saved as draft)
- Check content type is named `blogPost`
- Check browser console for errors

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## Project Structure at a Glance

```
├── .env.local              # Your credentials (DO NOT COMMIT)
├── src/
│   ├── App.tsx            # Main app component
│   ├── components/blog/   # All blog components
│   ├── lib/contentful.ts  # Contentful API client
│   └── types/blog.ts      # TypeScript types
├── README.md              # Full documentation
├── SETUP.md              # Detailed setup guide
├── contentful-setup.md   # Content model guide
└── DEPLOYMENT.md         # Deploy to production
```

---

## What's Included

✅ React 19 + TypeScript  
✅ Vite 6 (fast builds)  
✅ Tailwind CSS 4 (styling)  
✅ shadcn/ui components  
✅ Contentful CMS integration  
✅ Real-time search  
✅ Category filtering  
✅ Responsive design  
✅ Rich text rendering  
✅ Beautiful typography  

---

## Next Steps

### Customize Your Blog

**Colors**: Edit `src/index.css` `:root` variables  
**Fonts**: Update Google Fonts link in `index.html`  
**Content**: Add more posts in Contentful  

### Deploy to Production

Choose a platform:
- **Vercel**: `npm install -g vercel && vercel`
- **Netlify**: `npm install -g netlify-cli && netlify deploy`
- **GitHub Pages**: See `DEPLOYMENT.md`

Remember to add environment variables in your hosting platform!

### Set Up Auto-Deploy

1. Connect GitHub repo to Vercel/Netlify
2. Add Contentful webhook (see `DEPLOYMENT.md`)
3. Publish in Contentful → Site rebuilds automatically!

---

## Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

---

## Resources

- 📖 [Full README](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🎨 [Contentful Setup](./contentful-setup.md)
- 🔧 [Detailed Setup](./SETUP.md)
- 💡 [PRD](./PRD.md) - Design decisions

---

## Getting Help

**Contentful Issues**: https://www.contentful.com/help/  
**React Questions**: https://react.dev/  
**Vite Docs**: https://vite.dev/  

---

**Happy blogging! ✨**

Made with React + Vite + Contentful
