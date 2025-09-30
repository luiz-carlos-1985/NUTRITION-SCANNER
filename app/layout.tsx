import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nutrition Scanner',
  description: 'Scan any food product for instant nutrition insights',
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
      </body>
    </html>
  )
}