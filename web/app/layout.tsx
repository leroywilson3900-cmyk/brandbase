import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrandBase — All-in-One Business Platform',
  description: 'Your complete online presence. Website, email, social media, leads, quotes, and AI — all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  )
}
