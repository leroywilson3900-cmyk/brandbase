import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrandBase — CRM for Service Businesses',
  description: 'Leads, quotes, appointments, payments — all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}