import { Inter } from 'next/font/google'
import '@/app/assets/css/globals.css'
import '@/app/assets/css/form.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen`}>{children}</body>
    </html>
  )
}
