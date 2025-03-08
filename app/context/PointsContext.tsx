'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PointsContextType {
  points: number
  addPoints: (amount: number) => void
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export function PointsProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0)

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount)
  }

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider')
  }
  return context
} 