import { useState, useEffect, useMemo } from 'react'
import { getBlogPosts, getAllCategories } from '@/lib/contentful'
import type { BlogPostEntry } from '@/types/blog'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { BlogPostCardSkeleton } from '@/components/blog/BlogPostCardSkeleton'
import { SearchBar } from '@/components/blog/SearchBar'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { ErrorState } from '@/components/blog/ErrorState'
import { EmptyState } from '@/components/blog/EmptyState'
import { MissingCredentials } from '@/components/blog/MissingCredentials'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [posts, setPosts] = useState<BlogPostEntry[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPostEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const hasCredentials =
    import.meta.env.VITE_CONTENTFUL_SPACE_ID &&
    import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

  const fetchData = async () => {
    if (!hasCredentials) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [postsData, categoriesData] = await Promise.all([
        getBlogPosts(),
        getAllCategories(),
      ])
      setPosts(postsData)
      setCategories(categoriesData)
    } catch (err: any) {
      console.error('Error fetching data:', err)
      
      let errorMessage = 'Failed to load blog posts. '
      
      if (err.message?.includes('Unknown content type')) {
        errorMessage = 'Content model not found. Please create the "blogPost" content type in your Contentful space. See contentful-setup.md for instructions.'
      } else if (err.message?.includes('404')) {
        errorMessage = 'Contentful space not found. Please verify your Space ID is correct.'
      } else if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        errorMessage = 'Invalid credentials. Please check your Access Token.'
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.'
      } else {
        errorMessage += 'Please check your Contentful setup and try again.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredPosts = useMemo(() => {
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

  if (!hasCredentials) {
    return <MissingCredentials />
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8 md:px-12 md:py-12">
          <h1 className="mb-2 font-display text-4xl font-bold text-foreground md:text-5xl">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground">
            Stories, insights, and ideas from our team
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:px-12 md:py-20">
        {error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
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

            {loading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <BlogPostCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
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
        )}
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground md:px-12">
          <p>Powered by Contentful</p>
        </div>
      </footer>
    </div>
  )
}

export default App