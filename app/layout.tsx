import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/lib/i18n/LocaleProvider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

import { prefixPath } from '@/lib/prefix-path'

export const metadata: Metadata = {
  title: 'WoundView - Medical Image Gallery',
  description: 'Clinical wound documentation and image gallery',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: prefixPath('/assets/icon-light-32x32.png'),
        media: '(prefers-color-scheme: light)',
      },
      {
        url: prefixPath('/assets/icon-dark-32x32.png'),
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: prefixPath('/assets/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: prefixPath('/assets/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <LocaleProvider>
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
