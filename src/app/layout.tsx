import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import CssBaseline from '@mui/material/CssBaseline'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Real Estate Investment Analysis Tool',
  description: 'Analyze real estate investments with comprehensive tools and visualizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CssBaseline />
          {children}
        </Providers>
      </body>
    </html>
  )
}
