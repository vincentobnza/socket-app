export function getRandomColor({
  type = 'text',
}: { type?: 'text' | 'bg' }): string {
  const colors = [
    'red-500',
    'green-500',
    'blue-500',
    'yellow-500',
    'purple-500',
    'pink-500',
    'orange-500',
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]
  return type === 'text' ? `text-${color}` : `bg-${color}`
}

export function getInitials(title: string): string {
  const words = title
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0 && /[a-zA-Z]/.test(w))
  if (words.length >= 2) {
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase()
  }
  const first = title.trim()
  return first.slice(0, 2).toUpperCase() || first.charAt(0).toUpperCase()
}
