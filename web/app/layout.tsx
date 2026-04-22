import type { Metadata } from 'next'
import './globals.css'
import JoshChat from '@/components/JoshChat'

export const metadata: Metadata = {
  title: 'BrandBase — CRM for Service Businesses',
  description: 'Leads, quotes, appointments, payments, AI-powered CRM for roofers, contractors, HVAC, and service businesses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <JoshChat />
      </body>
    </html>
  )
}
