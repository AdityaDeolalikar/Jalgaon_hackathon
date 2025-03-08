'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Quiz from '../components/Quiz'
import { motion } from 'framer-motion'

const Page = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 mt-20">
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Smart Learning Hub
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Test your knowledge with our interactive quizzes across various domains
          </motion.p>
          <motion.button
            onClick={() => setIsQuizOpen(true)}
            className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Quiz
          </motion.button>
        </div>

        <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </main>
    </div>
  )
}

export default Page
