'use client'

import { ReactNode } from 'react'
import { PointsProvider } from './context/PointsContext'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <PointsProvider>
      {children}
    </PointsProvider>
  )
} 