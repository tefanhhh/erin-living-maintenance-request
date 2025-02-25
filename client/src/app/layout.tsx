import { Inter } from 'next/font/google'
import '@/assets/css/globals.css'
import '@/assets/css/form.css'
import Providers from '@/components/Providers'

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
      <body className={`${inter.variable} min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
