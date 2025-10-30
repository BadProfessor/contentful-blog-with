import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import type { Options } from '@contentful/rich-text-react-renderer'

interface RichTextRendererProps {
  content: Document | any
}

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 text-lg leading-relaxed text-foreground">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-6 mt-8 font-display text-4xl font-bold leading-tight text-foreground">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-4 mt-8 font-display text-3xl font-semibold leading-snug text-foreground">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mb-3 mt-6 font-display text-2xl font-semibold leading-snug text-foreground">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold text-foreground">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="mb-2 mt-4 text-lg font-semibold text-foreground">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="mb-2 mt-4 text-base font-semibold text-foreground">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-lg text-foreground">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-lg text-foreground">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="my-6 border-l-4 border-accent pl-6 italic text-secondary">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-border" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const target = node?.data?.target
      if (!target || !target.fields) return null
      
      const { file, title, description } = target.fields
      const url = file?.url ? `https:${file.url}` : ''
      
      if (!url) return null
      
      return (
        <figure className="my-8">
          <img
            src={url}
            alt={description || title || ''}
            className="w-full rounded-lg"
          />
          {(title || description) && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {description || title}
            </figcaption>
          )}
        </figure>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
      >
        {children}
      </a>
    ),
  },
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) {
    return <p className="text-muted-foreground">No content available.</p>
  }

  if (typeof content === 'string') {
    return (
      <div className="prose max-w-none">
        <p className="mb-4 text-lg leading-relaxed text-foreground">{content}</p>
      </div>
    )
  }

  if (!content.nodeType || content.nodeType !== 'document') {
    return <p className="text-muted-foreground">No content available.</p>
  }

  try {
    return <div className="prose max-w-none">{documentToReactComponents(content, options)}</div>
  } catch (error) {
    console.error('Error rendering rich text:', error)
    return <p className="text-muted-foreground">Error rendering content.</p>
  }
}
