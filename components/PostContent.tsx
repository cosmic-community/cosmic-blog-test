interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text
      // Convert headers
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-gray-900 mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mb-2 mt-4">$1</h3>')
      // Convert bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      // Convert bullet points
      .replace(/^- (.*$)/gm, '<li class="text-gray-700 mb-1">$1</li>')
      // Convert paragraphs
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1') || paragraph.includes('<h2') || paragraph.includes('<h3')) {
          return paragraph
        }
        if (paragraph.includes('<li')) {
          return `<ul class="list-disc list-inside mb-4 space-y-1">${paragraph}</ul>`
        }
        if (paragraph.trim()) {
          return `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph}</p>`
        }
        return ''
      })
      .join('')
  }

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderContent(content) }}
    />
  )
}