import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavLayout from '@/components/nav-layout'
import FirebaseUserProvider from '../lib/firebase-user'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Park Cats',
  description: 'There are cats in the park.',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseUserProvider>
          <NavLayout>{children}</NavLayout>
        </FirebaseUserProvider>
      </body>
    </html>
  )
}

export default RootLayout
