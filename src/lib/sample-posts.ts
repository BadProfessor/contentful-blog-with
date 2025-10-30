import type { BlogPostEntry } from '@/types/blog'

export function getSamplePosts(): BlogPostEntry[] {
  const now = new Date()
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  return [
    {
      id: '1',
      title: 'Welcome to Our Blog',
      slug: 'welcome-to-our-blog',
      excerpt: "We're excited to share our journey, insights, and stories with you. Discover what we're passionate about and join our community as we explore new ideas together.",
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'A New Beginning', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  "We're thrilled to launch our blog and share our thoughts with you. This space will be dedicated to exploring ideas, sharing insights, and building a community around the topics we're passionate about.",
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  "Whether you're here to learn, be inspired, or just curious about what we're up to, we hope you'll find something valuable in our posts.",
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'What to Expect', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  "We'll be covering a wide range of topics including technology, design, business insights, and tutorials. Our goal is to provide high-quality content that helps you grow and succeed.",
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: "Stay tuned for regular updates, and don't hesitate to reach out with questions or suggestions!",
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: now.toISOString(),
      author: 'Editorial Team',
      category: 'Announcements',
      tags: ['welcome', 'introduction'],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: '2',
      title: 'Getting Started with Modern Web Development',
      slug: 'getting-started-modern-web-development',
      excerpt: 'Learn the fundamentals of modern web development, from HTML and CSS to JavaScript frameworks and deployment strategies that will set you up for success.',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Introduction', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Modern web development has evolved significantly over the past few years. With new frameworks, tools, and best practices emerging constantly, it can be overwhelming for beginners to know where to start.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'The Foundation: HTML, CSS & JavaScript', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Before diving into frameworks, it\'s crucial to have a solid understanding of the core web technologies: HTML for structure, CSS for styling, and JavaScript for interactivity.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'These three pillars form the foundation of everything you\'ll build on the web, so take the time to master them before moving on to more advanced concepts.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Choosing Your First Framework', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Once you\'re comfortable with the basics, you can explore modern frameworks like React, Vue, or Angular. Each has its strengths, so choose based on your goals and the job market in your area.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'React is currently the most popular choice and offers great career opportunities. Start with the basics, build small projects, and gradually increase complexity as you learn.',
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: dayAgo.toISOString(),
      author: 'Sarah Johnson',
      category: 'Tutorials',
      tags: ['web-development', 'beginners', 'javascript'],
      createdAt: dayAgo.toISOString(),
      updatedAt: dayAgo.toISOString(),
    },
    {
      id: '3',
      title: 'The Art of Minimalist Design',
      slug: 'art-of-minimalist-design',
      excerpt: 'Explore how less is more in design. Discover principles of minimalism that create elegant, user-friendly experiences that stand the test of time.',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Less is More', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Minimalist design isn\'t just about aesthetics—it\'s about creating clarity and focus. By removing unnecessary elements, we can help users accomplish their goals more efficiently.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Key Principles', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  '1. Start with the essential purpose. Every element should serve a function.\n2. Use whitespace strategically to create breathing room and guide attention.\n3. Choose a limited color palette that reinforces your brand and creates harmony.\n4. Typography should be clear, readable, and hierarchical.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Remember: minimalism doesn\'t mean boring or cold. It means intentional, purposeful, and focused design that respects the user\'s time and attention.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Practical Application', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'When designing your next project, start by identifying what\'s truly essential. Then add elements only if they serve a clear purpose. This process of reduction often leads to the most elegant solutions.',
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: threeDaysAgo.toISOString(),
      author: 'Michael Chen',
      category: 'Design',
      tags: ['design', 'minimalism', 'ui-ux'],
      createdAt: threeDaysAgo.toISOString(),
      updatedAt: threeDaysAgo.toISOString(),
    },
    {
      id: '4',
      title: 'Building a Sustainable Tech Startup',
      slug: 'building-sustainable-tech-startup',
      excerpt: 'Key lessons learned from building a tech startup. From product-market fit to scaling your team, here\'s what worked for us and what didn\'t.',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'The Journey Begins', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Starting a tech startup is exhilarating, terrifying, and transformative. After three years of building our company, we\'ve learned invaluable lessons that we wish we knew from day one.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Product-Market Fit', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Finding product-market fit is harder than it looks. We spent six months building features nobody wanted before we finally started listening to our users. The turning point came when we stopped assuming and started asking.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Talk to your users constantly. Build in public. Share your roadmap. The feedback you receive will be worth its weight in gold.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Scaling the Team', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Hiring is one of the most critical decisions you\'ll make. We learned to hire for attitude and aptitude over experience. The best team members are those who are curious, adaptable, and genuinely excited about the mission.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Don\'t rush hiring. A small, aligned team will outperform a large, misaligned one every time.',
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: weekAgo.toISOString(),
      author: 'Alex Rivera',
      category: 'Business',
      tags: ['startups', 'entrepreneurship', 'scaling'],
      createdAt: weekAgo.toISOString(),
      updatedAt: weekAgo.toISOString(),
    },
    {
      id: '5',
      title: 'Mastering React Hooks: A Deep Dive',
      slug: 'mastering-react-hooks-deep-dive',
      excerpt: 'React Hooks revolutionized how we write components. Learn advanced patterns and best practices for using hooks effectively in your applications.',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Understanding Hooks', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'React Hooks were introduced to solve several problems with class components: complex lifecycle methods, reusing stateful logic, and organizing code by feature rather than lifecycle.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Common Patterns', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'useState and useEffect are the most common hooks, but understanding useMemo, useCallback, and useRef will take your React skills to the next level. Each serves a specific purpose in optimizing and organizing your code.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'The key is knowing when to use each hook. Over-optimization can be just as problematic as under-optimization.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Custom Hooks', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Creating custom hooks is where the real power lies. By extracting component logic into reusable functions, you can build a library of hooks specific to your application\'s needs.',
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: twoWeeksAgo.toISOString(),
      author: 'Sarah Johnson',
      category: 'Tutorials',
      tags: ['react', 'javascript', 'hooks', 'web-development'],
      createdAt: twoWeeksAgo.toISOString(),
      updatedAt: twoWeeksAgo.toISOString(),
    },
    {
      id: '6',
      title: 'The Future of AI in Product Design',
      slug: 'future-ai-product-design',
      excerpt: 'How artificial intelligence is transforming the way we design products, from ideation to implementation, and what it means for designers.',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'AI as a Design Partner', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Artificial intelligence is no longer just a buzzword—it\'s actively changing how we approach product design. From generating design variations to predicting user behavior, AI tools are becoming invaluable partners in the creative process.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Current Applications', marks: [] }],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'Today\'s designers are using AI for rapid prototyping, accessibility testing, and even generating design systems. These tools don\'t replace human creativity—they amplify it by handling repetitive tasks and providing data-driven insights.',
                marks: [],
              },
            ],
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'The most successful designers are those who learn to collaborate with AI, using it to enhance rather than replace their unique human perspective.',
                marks: [],
              },
            ],
          },
        ],
      },
      publishedDate: monthAgo.toISOString(),
      author: 'Michael Chen',
      category: 'Technology',
      tags: ['ai', 'design', 'future', 'innovation'],
      createdAt: monthAgo.toISOString(),
      updatedAt: monthAgo.toISOString(),
    },
  ]
}
