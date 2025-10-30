# 🔑 WHERE TO ADD YOUR CONTENTFUL CREDENTIALS

## Quick Answer

**Open this file: `.env.local`** (in the root directory)

Add your credentials like this:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master
```

**That's it!** Then restart your dev server.

---

## Step-by-Step Instructions

### 1. Locate the File

The `.env.local` file is in the **root directory** of this project:

```
/workspaces/spark-template/
├── .env.local          ← THIS FILE (open in VS Code)
├── package.json
├── src/
└── ...
```

### 2. Get Your Contentful Credentials

1. Go to: https://app.contentful.com/
2. Select your space (or create one)
3. Click: **Settings** → **API keys**
4. Click: **Add API key** (or use existing)
5. Copy these two values:
   - **Space ID** (looks like: `abc123xyz456`)
   - **Content Delivery API - access token** (looks like: `xyx789abc123...`)

### 3. Add to .env.local

Open `.env.local` in VS Code and replace the placeholder values:

**Before:**
```env
VITE_CONTENTFUL_SPACE_ID=
VITE_CONTENTFUL_ACCESS_TOKEN=
VITE_CONTENTFUL_ENVIRONMENT=master
```

**After (with your actual values):**
```env
VITE_CONTENTFUL_SPACE_ID=abc123xyz456
VITE_CONTENTFUL_ACCESS_TOKEN=xyz789abc123def456ghi789
VITE_CONTENTFUL_ENVIRONMENT=master
```

### 4. Restart the Dev Server

1. Stop the server: Press `Ctrl+C` in the terminal
2. Start it again: `npm run dev`
3. Open: http://localhost:5173

---

## Important Notes

### ⚠️ Security

- ✅ `.env.local` is already in `.gitignore` (won't be committed)
- ✅ Never share this file publicly
- ✅ Use different credentials for production
- ❌ Don't add quotes around the values
- ❌ Don't commit credentials to GitHub

### 🔍 Checking if It Worked

**If credentials are correct:**
- App loads normally
- You see your blog posts from Contentful

**If credentials are missing/wrong:**
- You see a big error screen with instructions
- Check the values in `.env.local`
- Make sure there are no extra spaces or quotes

---

## Example .env.local File

Here's what a complete, working `.env.local` looks like:

```env
VITE_CONTENTFUL_SPACE_ID=xyz789abc123
VITE_CONTENTFUL_ACCESS_TOKEN=abcdefghijklmnopqrstuvwxyz123456789
VITE_CONTENTFUL_ENVIRONMENT=master
```

**Note**: 
- No quotes around values
- No spaces before or after the `=` sign
- Each variable on its own line

---

## Troubleshooting

### "Missing Contentful credentials" Error

**Problem**: The app shows an error screen about missing credentials

**Solution**:
1. Open `.env.local`
2. Make sure you added your actual Space ID and Access Token
3. Save the file
4. Restart dev server: `Ctrl+C` then `npm run dev`

### Environment Variables Not Loading

**Problem**: You added credentials but still get errors

**Solutions**:
1. **Check file name**: Must be exactly `.env.local` (starts with a dot)
2. **Check location**: File must be in root directory (same level as `package.json`)
3. **Restart server**: Stop with `Ctrl+C` and run `npm run dev` again
4. **Check format**: No quotes, no extra spaces
5. **Check prefix**: All variables must start with `VITE_`

### Can't Find .env.local File

**Problem**: Can't see `.env.local` in VS Code file explorer

**Solution**:
- The file exists! It's already created for you
- Look in the root directory
- If you still can't see it, create it manually:
  1. Right-click in root directory
  2. New File
  3. Name it exactly: `.env.local`
  4. Add the credentials

---

## Need More Help?

- **Quick setup**: See [QUICKSTART.md](./QUICKSTART.md)
- **Detailed guide**: See [SETUP.md](./SETUP.md)
- **Contentful help**: See [contentful-setup.md](./contentful-setup.md)

---

## For Deployment (Later)

When you deploy to production (Vercel, Netlify, etc.), you'll add these same variables through their dashboard:

**Vercel**: Project Settings → Environment Variables
**Netlify**: Site Settings → Build & deploy → Environment
**Railway**: Project → Variables

Same three variables:
- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_ACCESS_TOKEN`
- `VITE_CONTENTFUL_ENVIRONMENT`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

---

**That's all you need to know! Just add your credentials to `.env.local` and you're ready to go! 🚀**
