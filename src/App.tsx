import { useState, useEffect, useMemo } from 'react'
import type { BlogPostEntry } from '@/types/blog'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { SearchBar } from '@/components/blog/SearchBar'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { EmptyState } from '@/components/blog/EmptyState'
import { ErrorState } from '@/components/blog/ErrorState'
import { MissingCredentials } from '@/components/blog/MissingCredentials'
import { BlogPostCardSkeleton } from '@/components/blog/BlogPostCardSkeleton'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { getBlogPosts, contentfulClient } from '@/lib/contentful'

function App() {
  const [posts, setPosts] = useState<BlogPostEntry[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPostEntry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const fetchedPosts = await getBlogPosts()
      setPosts(fetchedPosts)
      
      if (fetchedPosts.length === 0) {
        toast.info('No blog posts found in Contentful')
      }
    } catch (err: any) {
      console.error('Error loading blog posts:', err)
      setError(err.message || 'Failed to load blog posts')
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const categories = useMemo(() => {
    if (!posts) return []
    const uniqueCategories = new Set<string>()
    posts.forEach(post => {
      if (post.category) {
        uniqueCategories.add(post.category)
      }
    })
    return Array.from(uniqueCategories).sort()
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!posts) return []
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === null || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedPost])

  if (!contentfulClient) {
    return <MissingCredentials />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Toaster />
        <header className="border-b border-border bg-white">
          <div className="container mx-auto px-6 py-6 md:px-12">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                contentful
              </h1>
            </div>
            <p className="mt-4 text-base text-muted-foreground">
              Explore our latest insights, stories, and updates
            </p>
          </div>
        </header>
        <main className="container mx-auto px-6 py-12 md:px-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogPostCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Toaster />
        <header className="border-b border-border bg-white">
          <div className="container mx-auto px-6 py-6 md:px-12">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                contentful
              </h1>
            </div>
            <p className="mt-4 text-base text-muted-foreground">
              Explore our latest insights, stories, and updates
            </p>
          </div>
        </header>
        <main className="container mx-auto px-6 py-12 md:px-12 md:py-20">
          <ErrorState message={error} onRetry={fetchPosts} />
        </main>
      </div>
    )
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Toaster />
        <main className="container mx-auto px-6 py-12 md:px-12 md:py-20">
          <BlogPostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-6 md:px-12">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              contentful
            </h1>
          </div>
          <p className="mt-4 text-base text-muted-foreground">
            Explore our latest insights, stories, and updates
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:px-12 md:py-20">
        <div className="space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <SearchBar onSearch={setSearchQuery} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {(searchQuery || selectedCategory) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}{' '}
                found
              </span>
              <Separator orientation="vertical" className="h-4" />
              {searchQuery && (
                <span>
                  Searching for: <strong className="text-foreground">{searchQuery}</strong>
                </span>
              )}
              {selectedCategory && (
                <span>
                  Category: <strong className="text-foreground">{selectedCategory}</strong>
                </span>
              )}
            </div>
          )}

          {filteredPosts.length === 0 ? (
            <EmptyState
              title={
                searchQuery || selectedCategory
                  ? 'No articles match your filters'
                  : 'No articles yet'
              }
              description={
                searchQuery || selectedCategory
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'Check back soon for new content!'
              }
            />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-white">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground md:px-12">
          <p>&copy; {new Date().getFullYear()} contentful. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App