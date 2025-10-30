# Contentful Content Model Setup Guide

This guide walks you through setting up the Blog Post content model in Contentful.

## Method 1: Using the Contentful Web Interface (Easiest)

### Step 1: Create Content Type

1. Log in to [Contentful](https://app.contentful.com/)
2. Select your space
3. Go to **Content model** in the navigation
4. Click **Add content type**
5. Enter:
   - **Name**: `Blog Post`
   - **API identifier**: `blogPost` (should auto-populate)
   - **Description**: `Blog post entries with rich content`
6. Click **Create**

### Step 2: Add Fields

Now add each field to your Blog Post content type:

#### Field 1: Title
1. Click **Add field** → **Text** → **Short text**
2. Configure:
   - **Name**: `Title`
   - **Field ID**: `title`
3. Go to **Validations** tab:
   - Check **Required field**
   - Set **Character limit**: Min 1, Max 200
4. Click **Create and configure**

#### Field 2: Slug
1. Click **Add field** → **Text** → **Short text**
2. Configure:
   - **Name**: `Slug`
   - **Field ID**: `slug`
   - **Help text**: `URL-friendly version of the title (e.g., "my-first-post")`
3. Go to **Validations** tab:
   - Check **Required field**
   - Check **Unique field**
   - **Matches a pattern**: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (URL-safe slug)
4. Click **Create and configure**

#### Field 3: Excerpt
1. Click **Add field** → **Text** → **Long text**
2. Configure:
   - **Name**: `Excerpt`
   - **Field ID**: `excerpt`
   - **Help text**: `Brief summary of the post (200-300 characters)`
3. Go to **Validations** tab:
   - Check **Required field**
   - Set **Character limit**: Min 50, Max 500
4. Click **Create and configure**

#### Field 4: Content
1. Click **Add field** → **Rich text**
2. Configure:
   - **Name**: `Content`
   - **Field ID**: `content`
   - **Help text**: `Main article content with formatting`
3. Go to **Validations** tab:
   - Check **Required field**
4. Click **Create and configure**

#### Field 5: Published Date
1. Click **Add field** → **Date and time**
2. Configure:
   - **Name**: `Published Date`
   - **Field ID**: `publishedDate`
   - **Format**: `Date and time`
   - **Help text**: `When this post was published`
3. Go to **Validations** tab:
   - Check **Required field**
4. Click **Create and configure**

#### Field 6: Featured Image
1. Click **Add field** → **Media** → **One file**
2. Configure:
   - **Name**: `Featured Image`
   - **Field ID**: `featuredImage`
   - **Help text**: `Main image for the post (recommended: 1200x675px, 16:9 ratio)`
3. Go to **Validations** tab:
   - Check **Accept specified file types**
   - Select: `image/jpeg`, `image/png`, `image/webp`
   - Set **File size**: Max 5 MB
4. Click **Create and configure**

#### Field 7: Author
1. Click **Add field** → **Text** → **Short text**
2. Configure:
   - **Name**: `Author`
   - **Field ID**: `author`
   - **Help text**: `Author name`
3. Go to **Appearance** tab:
   - Select **Dropdown** (if you want predefined authors)
   - Or leave as **Single line** for free text
4. Click **Create and configure**

#### Field 8: Category
1. Click **Add field** → **Text** → **Short text**
2. Configure:
   - **Name**: `Category`
   - **Field ID**: `category`
   - **Help text**: `Post category (e.g., Technology, Design, Business)`
3. Go to **Appearance** tab:
   - Select **Dropdown**
   - Add predefined values:
     - `Technology`
     - `Design`
     - `Business`
     - `Announcements`
     - `Tutorials`
4. Click **Create and configure**

#### Field 9: Tags
1. Click **Add field** → **Text** → **Short text, list**
2. Configure:
   - **Name**: `Tags`
   - **Field ID**: `tags`
   - **Help text**: `Topic tags for this post`
3. Click **Create and configure**

### Step 3: Configure Entry Display

1. Click **Settings** (top right of content model)
2. In **Entry title**:
   - Select field: `Title`
3. In **Entry description**:
   - Select field: `Excerpt`
4. Click **Save**

### Step 4: Save Content Model

1. Click **Save** in the top right
2. Your Blog Post content model is now ready!

## Method 2: Using Contentful CLI (Advanced)

### Prerequisites

```bash
npm install -g contentful-cli
```

### Step 1: Login to Contentful

```bash
contentful login
```

This will open your browser to authenticate.

### Step 2: Select Your Space

```bash
contentful space use
```

Select your space from the list.

### Step 3: Create Content Model JSON

Create a file `blog-post-content-type.json`:

```json
{
  "name": "Blog Post",
  "displayField": "title",
  "description": "Blog post entries with rich content",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": "Symbol",
      "required": true,
      "validations": [
        {
          "size": { "min": 1, "max": 200 }
        }
      ]
    },
    {
      "id": "slug",
      "name": "Slug",
      "type": "Symbol",
      "required": true,
      "validations": [
        {
          "unique": true
        },
        {
          "regexp": {
            "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
          }
        }
      ]
    },
    {
      "id": "excerpt",
      "name": "Excerpt",
      "type": "Text",
      "required": true,
      "validations": [
        {
          "size": { "min": 50, "max": 500 }
        }
      ]
    },
    {
      "id": "content",
      "name": "Content",
      "type": "RichText",
      "required": true
    },
    {
      "id": "publishedDate",
      "name": "Published Date",
      "type": "Date",
      "required": true
    },
    {
      "id": "featuredImage",
      "name": "Featured Image",
      "type": "Link",
      "linkType": "Asset",
      "validations": [
        {
          "linkMimetypeGroup": ["image"]
        }
      ]
    },
    {
      "id": "author",
      "name": "Author",
      "type": "Symbol"
    },
    {
      "id": "category",
      "name": "Category",
      "type": "Symbol"
    },
    {
      "id": "tags",
      "name": "Tags",
      "type": "Array",
      "items": {
        "type": "Symbol"
      }
    }
  ]
}
```

### Step 4: Import Content Model

```bash
contentful space import --content-model-only --content-file blog-post-content-type.json
```

## Creating Sample Blog Posts

### Sample Post 1: Welcome Post

1. Go to **Content** → **Add entry** → **Blog Post**
2. Fill in:
   - **Title**: `Welcome to Our Blog`
   - **Slug**: `welcome-to-our-blog`
   - **Excerpt**: `We're excited to share our journey, insights, and stories with you. Discover what we're passionate about and join our community.`
   - **Content**: Add rich text with headings, paragraphs, and formatting
   - **Published Date**: Today's date
   - **Featured Image**: Upload a hero image
   - **Author**: `Editorial Team`
   - **Category**: `Announcements`
   - **Tags**: `welcome`, `introduction`
3. Click **Publish**

### Sample Post 2: Technical Tutorial

1. **Title**: `Getting Started with Modern Web Development`
2. **Slug**: `getting-started-modern-web-development`
3. **Excerpt**: `Learn the fundamentals of modern web development, from HTML and CSS to JavaScript frameworks and deployment strategies.`
4. **Published Date**: Yesterday
5. **Category**: `Tutorials`
6. **Tags**: `web-development`, `beginners`, `javascript`

### Sample Post 3: Design Article

1. **Title**: `The Art of Minimalist Design`
2. **Slug**: `art-of-minimalist-design`
3. **Excerpt**: `Explore how less is more in design. Discover principles of minimalism that create elegant, user-friendly experiences.`
4. **Published Date**: 3 days ago
5. **Category**: `Design`
6. **Tags**: `design`, `minimalism`, `ui-ux`

### Sample Post 4: Business Insights

1. **Title**: `Building a Sustainable Tech Startup`
2. **Slug**: `building-sustainable-tech-startup`
3. **Excerpt**: `Key lessons learned from building a tech startup. From product-market fit to scaling your team, here's what worked for us.`
4. **Published Date**: 1 week ago
5. **Category**: `Business`
6. **Tags**: `startups`, `entrepreneurship`, `scaling`

## Tips for Great Blog Posts

### Images

- **Recommended size**: 1200x675px (16:9 ratio)
- **Format**: JPEG for photos, PNG for graphics with text
- **Optimization**: Use tools like TinyPNG to compress before uploading
- **Alt text**: Add descriptive alt text in Contentful for accessibility

### Content Structure

Good blog post structure:
1. **Engaging intro** (1-2 paragraphs)
2. **Clear headings** (H2, H3) to break up content
3. **Short paragraphs** (2-4 sentences)
4. **Lists** for scannable content
5. **Images** to illustrate points
6. **Conclusion** with call-to-action

### SEO Best Practices

- **Title**: 50-60 characters, include keywords
- **Excerpt**: 150-160 characters (like meta description)
- **Slug**: Short, descriptive, keyword-rich
- **Content**: 800-2000 words for depth
- **Headers**: Use H2, H3 hierarchy with keywords

## Troubleshooting

### "Content type not found" Error

- Verify the content type is named exactly `blogPost` (case-sensitive)
- Check that you're using the correct Space ID
- Ensure the content type is saved and published

### Fields Not Appearing in App

- Confirm field IDs match exactly:
  - `title`, `slug`, `excerpt`, `content`, `publishedDate`
  - `featuredImage`, `author`, `category`, `tags`
- Check that fields are properly configured
- Restart your development server

### Cannot Publish Entry

- Ensure all required fields are filled in
- Check field validations (character limits, format)
- Verify you have publish permissions in Contentful

## Next Steps

1. ✅ Create the Blog Post content model
2. ✅ Add 3-5 sample blog posts
3. ✅ Publish all entries
4. ✅ Return to the app and refresh

Your blog should now display all published posts!

---

**Need more help?** Visit the [Contentful Documentation](https://www.contentful.com/developers/docs/)
