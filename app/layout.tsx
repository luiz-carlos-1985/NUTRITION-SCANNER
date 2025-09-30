import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🍎 Nutrition Scanner',
  description: 'Scan any food product for instant nutrition insights',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%2334d399"/><stop offset="100%" style="stop-color:%2310b981"/></linearGradient><filter id="shadow"><feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="%23000" flood-opacity="0.3"/></filter></defs><circle cx="16" cy="16" r="14" fill="url(%23g)" filter="url(%23shadow)"/><path d="M12 8 Q16 6 20 8 L18 12 Q16 10 14 12 Z" fill="%23fff" opacity="0.95"/><circle cx="15" cy="9" r="1.5" fill="%2310b981"/><path d="M8 18 Q12 16 16 18 Q20 20 24 18" stroke="%23fff" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="14" y="22" width="4" height="6" rx="2" fill="%23fff" opacity="0.9"/><path d="M15 24 L16 26 L17 22" stroke="%2310b981" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="14" r="1" fill="%23fff" opacity="0.7"/><circle cx="22" cy="14" r="1" fill="%23fff" opacity="0.7"/></svg>',
  },
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