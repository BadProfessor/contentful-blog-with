# Deployment Guide

This guide covers deploying your Contentful blog to various hosting platforms.

## 🚀 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ Contentful content model is set up correctly
- ✅ You have published blog posts in Contentful
- ✅ App works locally with your Contentful credentials
- ✅ All dependencies are listed in `package.json`
- ✅ Build command works: `npm run build`

## Platform-Specific Deployment

### 1. Vercel (Recommended)

Vercel offers the easiest deployment with zero configuration.

#### Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add VITE_CONTENTFUL_SPACE_ID
   vercel env add VITE_CONTENTFUL_ACCESS_TOKEN
   vercel env add VITE_CONTENTFUL_ENVIRONMENT
   ```

5. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

#### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add **Environment Variables**:
   - `VITE_CONTENTFUL_SPACE_ID`
   - `VITE_CONTENTFUL_ACCESS_TOKEN`
   - `VITE_CONTENTFUL_ENVIRONMENT` (set to `master`)
6. Click **Deploy**

#### Automatic Deployments

- Connect your GitHub repository
- Every push to main branch triggers automatic deployment
- Preview deployments for pull requests

---

### 2. Netlify

#### Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Initialize**:
   ```bash
   netlify init
   ```

4. **Add Environment Variables**:
   ```bash
   netlify env:set VITE_CONTENTFUL_SPACE_ID "your_space_id"
   netlify env:set VITE_CONTENTFUL_ACCESS_TOKEN "your_token"
   netlify env:set VITE_CONTENTFUL_ENVIRONMENT "master"
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

#### Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect to Git repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add **Environment Variables** in Site settings → Build & deploy:
   - `VITE_CONTENTFUL_SPACE_ID`
   - `VITE_CONTENTFUL_ACCESS_TOKEN`
   - `VITE_CONTENTFUL_ENVIRONMENT`
6. Click **Deploy site**

#### Set up Contentful Webhooks (Optional)

Trigger rebuilds when content changes:

1. In Netlify, go to **Site settings** → **Build & deploy** → **Build hooks**
2. Create a build hook, copy the URL
3. In Contentful, go to **Settings** → **Webhooks**
4. Create webhook:
   - **Name**: "Netlify Deploy"
   - **URL**: Your Netlify build hook URL
   - **Triggers**: Select "Entry publish" and "Entry unpublish"
5. Save webhook

Now your site rebuilds automatically when you publish/unpublish content!

---

### 3. GitHub Pages

#### Using GitHub Actions

1. **Create workflow file** `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        env:
          VITE_CONTENTFUL_SPACE_ID: ${{ secrets.VITE_CONTENTFUL_SPACE_ID }}
          VITE_CONTENTFUL_ACCESS_TOKEN: ${{ secrets.VITE_CONTENTFUL_ACCESS_TOKEN }}
          VITE_CONTENTFUL_ENVIRONMENT: ${{ secrets.VITE_CONTENTFUL_ENVIRONMENT }}
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Add secrets** in GitHub:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Add repository secrets:
     - `VITE_CONTENTFUL_SPACE_ID`
     - `VITE_CONTENTFUL_ACCESS_TOKEN`
     - `VITE_CONTENTFUL_ENVIRONMENT`

3. **Update `vite.config.ts`** for GitHub Pages:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  base: '/your-repo-name/', // Add this line
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

4. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/root`
   - Save

5. **Push to trigger deployment**

---

### 4. Railway

1. **Create account** at [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Railway auto-detects Vite
5. Add **Variables**:
   - `VITE_CONTENTFUL_SPACE_ID`
   - `VITE_CONTENTFUL_ACCESS_TOKEN`
   - `VITE_CONTENTFUL_ENVIRONMENT`
6. Deploy automatically

---

### 5. Cloudflare Pages

1. **Login** to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Pages** → **Create a project**
3. Connect to Git repository
4. Configure build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add **Environment variables**:
   - `VITE_CONTENTFUL_SPACE_ID`
   - `VITE_CONTENTFUL_ACCESS_TOKEN`
   - `VITE_CONTENTFUL_ENVIRONMENT`
6. Click **Save and Deploy**

---

## 🔒 Security Best Practices

### Environment Variables

✅ **DO**:
- Use platform-specific environment variable settings
- Keep `.env.local` in `.gitignore`
- Use different credentials for staging/production
- Rotate tokens periodically

❌ **DON'T**:
- Commit `.env.local` to Git
- Share credentials in plain text
- Use production credentials for development
- Hardcode API keys in source code

### Contentful API Keys

- Use **Content Delivery API** tokens (read-only) for production
- Never use **Content Management API** tokens in frontend
- Create separate tokens for different environments
- Monitor API usage in Contentful dashboard

### Content Security

- Review Contentful access permissions
- Use Contentful environments (master, staging)
- Enable entry workflows for content approval
- Set up roles for different team members

---

## 🔄 Continuous Deployment

### Automated Workflow

1. **Developer workflow**:
   ```
   Developer → Commits code → GitHub
                              ↓
                         Vercel/Netlify
                              ↓
                    Automatic deployment
   ```

2. **Content workflow**:
   ```
   Editor → Publishes in Contentful → Webhook
                                       ↓
                                 Vercel/Netlify
                                       ↓
                              Automatic rebuild
   ```

### Setting Up Webhooks

#### Contentful → Vercel

1. Get Vercel deploy hook URL:
   - Vercel dashboard → Project → Settings → Git → Deploy Hooks
   - Create hook named "Contentful Updates"

2. Add webhook in Contentful:
   - Settings → Webhooks → Add webhook
   - URL: Your Vercel deploy hook URL
   - Triggers: Entry publish, Entry unpublish

#### Contentful → Netlify

Same process as above, use Netlify build hook URL

---

## 📊 Performance Optimization

### Build Optimization

```json
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'contentful': ['contentful'],
        }
      }
    }
  }
})
```

### Image Optimization

In Contentful, use image transformations:
```typescript
// Add parameters to image URLs
const optimizedUrl = `${post.featuredImageUrl}?w=1200&q=80&fm=webp`
```

### Caching

Configure cache headers in your hosting platform:
- HTML: `max-age=0, must-revalidate`
- JS/CSS: `max-age=31536000, immutable`
- Images: `max-age=31536000, immutable`

---

## 🐛 Troubleshooting Deployment

### Build Fails

**Check**:
- All dependencies in `package.json`
- Environment variables are set correctly
- Build works locally: `npm run build`
- Node version matches (use `.nvmrc` file)

### Environment Variables Not Working

**Verify**:
- Variables are prefixed with `VITE_`
- No quotes around values in platform UI
- Variables are set for production environment
- Redeploy after adding variables

### Content Not Showing

**Check**:
- Contentful credentials are correct
- Posts are published (not drafts)
- Content type is named `blogPost`
- API access token has correct permissions

### Images Not Loading

**Verify**:
- Image URLs start with `https://`
- CORS settings allow your domain
- Images are published in Contentful
- Image file formats are supported

---

## 📈 Monitoring

### Analytics

Add analytics to track usage:

**Google Analytics**:
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

**Plausible Analytics** (privacy-friendly):
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Error Tracking

**Sentry** (recommended):
```bash
npm install @sentry/react @sentry/vite-plugin
```

### Performance Monitoring

Use Vercel Analytics or:
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Speedcurve](https://www.speedcurve.com/)

---

## 🎯 Post-Deployment Checklist

- ✅ Site loads without errors
- ✅ All blog posts display correctly
- ✅ Search functionality works
- ✅ Category filtering works
- ✅ Images load properly
- ✅ Mobile responsive design works
- ✅ Links open correctly
- ✅ Performance is acceptable (Lighthouse score > 90)
- ✅ SEO meta tags are present
- ✅ Analytics tracking works
- ✅ Error tracking is configured

---

**Congratulations! Your blog is now live! 🎉**

For ongoing maintenance, monitor:
- Contentful API usage
- Site performance metrics
- Error rates
- User analytics
