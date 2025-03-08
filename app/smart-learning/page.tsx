'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Quiz from '../components/Quiz'
import { motion } from 'framer-motion'

const Page = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const features = [
    {
      title: "Personalized Learning",
      description: "Adaptive learning paths tailored to your unique needs and pace",
      icon: "🎯"
    },
    {
      title: "Interactive Quizzes",
      description: "Engaging assessments to test and reinforce your knowledge",
      icon: "📝"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your growth with detailed performance analytics",
      icon: "📊"
    },
    {
      title: "Instant Feedback",
      description: "Get immediate insights on your answers and areas for improvement",
      icon: "💡"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 mt-20">
          <motion.h1 
            className="text-5xl font-bold text-gray-800 mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Smart Learning Hub
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Embark on a journey of interactive learning where technology meets education.
            Our platform adapts to your learning style, making education more engaging and effective.
          </motion.p>
          <motion.button
            onClick={() => setIsQuizOpen(true)}
            className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Take a Quiz
          </motion.button>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Introduction Section */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Smart Learning?</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Smart Learning represents the future of education, combining cutting-edge technology 
              with proven learning methodologies. Our platform uses artificial intelligence to 
              understand your learning patterns and provide personalized content that matches 
              your pace and style.
            </p>
            <p>
              Whether you're a student, professional, or lifelong learner, our interactive 
              quizzes and assessments help you master new concepts while making learning 
              enjoyable and effective. With real-time feedback and progress tracking, 
              you'll always know where you stand and what to focus on next.
            </p>
          </div>
        </motion.div>

        <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      </main>
    </div>
  )
}

export default Page
