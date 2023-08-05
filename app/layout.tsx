import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'use shadcn ui',
  description: 'shadcn/ui 使用示例',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
