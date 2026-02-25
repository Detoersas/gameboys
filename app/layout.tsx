import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'GameBOYS REPO',
  description: 'Your gateway to games, proxies, and apps',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/zna2c-tscrf-001.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/zna2c-tscrf-001.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/zna2c-tscrf-001.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: 'zna2c-tscrf-001.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
