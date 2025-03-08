'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from 'framer-motion'
import CourseRecommendations from './CourseRecommendations'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

const domains = {
  technical: [
    { id: 1, name: 'Technology', icon: '💻' },
    { id: 2, name: 'Science', icon: '🔬' },
  ],
  nonTechnical: [
    { id: 3, name: 'Psychological', icon: '🧠' },
    { id: 4, name: 'Academic', icon: '📚' },
    { id: 5, name: 'General Knowledge', icon: '🌍' },
  ]
}

const difficultyLevels = [
  { id: 1, name: 'Easy', icon: '🟢' },
  { id: 2, name: 'Medium', icon: '🟡' },
  { id: 3, name: 'Hard', icon: '🔴' },
]

const sampleQuestions: Record<string, QuizQuestion[]> = {
  'Psychological': [
    {
      id: 1,
      question: 'Which defense mechanism involves redirecting emotions to a less threatening target?',
      options: ['Displacement', 'Projection', 'Regression', 'Sublimation'],
      correctAnswer: 'Displacement'
    },
    {
      id: 2,
      question: 'What is cognitive dissonance?',
      options: [
        'Mental stress from holding contradictory beliefs',
        'Loss of memory',
        'Fear of social situations',
        'Excessive happiness'
      ],
      correctAnswer: 'Mental stress from holding contradictory beliefs'
    },
    {
      id: 3,
      question: 'Which psychological theory is associated with Maslow?',
      options: [
        'Hierarchy of Needs',
        'Psychoanalysis',
        'Classical Conditioning',
        'Cognitive Behavioral Theory'
      ],
      correctAnswer: 'Hierarchy of Needs'
    },
    {
      id: 4,
      question: 'What is confirmation bias?',
      options: [
        'Tendency to search for information that confirms existing beliefs',
        'Always agreeing with others',
        'Fear of making decisions',
        'Preference for familiar things'
      ],
      correctAnswer: 'Tendency to search for information that confirms existing beliefs'
    },
    {
      id: 5,
      question: 'What is the Dunning-Kruger effect?',
      options: [
        'Overestimating abilities due to limited knowledge',
        'Fear of success',
        'Memory loss under stress',
        'Social anxiety disorder'
      ],
      correctAnswer: 'Overestimating abilities due to limited knowledge'
    }
  ],
  'Academic': [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      id: 2,
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 'William Shakespeare'
    },
    {
      id: 3,
      question: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Fe', 'Au', 'Cu'],
      correctAnswer: 'Au'
    },
    {
      id: 4,
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      correctAnswer: 'Jupiter'
    },
    {
      id: 5,
      question: 'What is the square root of 144?',
      options: ['10', '12', '14', '16'],
      correctAnswer: '12'
    }
  ],
  'General Knowledge': [
    {
      id: 1,
      question: 'Which is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
      correctAnswer: 'Pacific'
    },
    {
      id: 2,
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci'
    },
    {
      id: 3,
      question: 'What is the currency of Japan?',
      options: ['Yuan', 'Won', 'Yen', 'Ringgit'],
      correctAnswer: 'Yen'
    },
    {
      id: 4,
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Korea', 'Japan', 'Thailand'],
      correctAnswer: 'Japan'
    },
    {
      id: 5,
      question: 'Who is known as the father of computers?',
      options: ['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'],
      correctAnswer: 'Charles Babbage'
    }
  ],
  'Technology': [
    {
      id: 1,
      question: 'What does CPU stand for?',
      options: [
        'Central Processing Unit',
        'Computer Personal Unit',
        'Central Program Utility',
        'Computer Processing Unit'
      ],
      correctAnswer: 'Central Processing Unit'
    },
    {
      id: 2,
      question: 'Which programming language is known as the "mother of all languages"?',
      options: ['Python', 'Java', 'C', 'FORTRAN'],
      correctAnswer: 'C'
    },
    {
      id: 3,
      question: 'What is the main function of RAM?',
      options: [
        'Permanent storage',
        'Temporary memory',
        'Processing data',
        'Cooling the computer'
      ],
      correctAnswer: 'Temporary memory'
    },
    {
      id: 4,
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyper Transfer Markup Language',
        'High Text Machine Language'
      ],
      correctAnswer: 'Hyper Text Markup Language'
    },
    {
      id: 5,
      question: 'Which company developed Android?',
      options: ['Apple', 'Microsoft', 'Google', 'Samsung'],
      correctAnswer: 'Google'
    }
  ],
  'Science': [
    {
      id: 1,
      question: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
      correctAnswer: 'Diamond'
    },
    {
      id: 2,
      question: 'What is the process by which plants make their food?',
      options: ['Photosynthesis', 'Respiration', 'Digestion', 'Absorption'],
      correctAnswer: 'Photosynthesis'
    },
    {
      id: 3,
      question: 'What is the smallest unit of matter?',
      options: ['Cell', 'Molecule', 'Atom', 'Electron'],
      correctAnswer: 'Atom'
    },
    {
      id: 4,
      question: 'Which gas makes up the majority of Earth\'s atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      correctAnswer: 'Nitrogen'
    },
    {
      id: 5,
      question: 'What is the speed of light?',
      options: [
        '299,792 kilometers per second',
        '199,792 kilometers per second',
        '399,792 kilometers per second',
        '499,792 kilometers per second'
      ],
      correctAnswer: '299,792 kilometers per second'
    }
  ]
}

interface QuizProps {
  isOpen: boolean
  onClose: () => void
}

export default function Quiz({ isOpen, onClose }: QuizProps) {
  const [step, setStep] = useState<'difficulty' | 'domain' | 'quiz'>('difficulty')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [selectedDomain, setSelectedDomain] = useState<string>('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [score, setScore] = useState<number | null>(null)

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty)
    setStep('domain')
  }

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain)
    setStep('quiz')
  }

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }))
    
    if (currentQuestionIndex < sampleQuestions[selectedDomain].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Calculate score
      const correctAnswers = sampleQuestions[selectedDomain].filter(
        (q, idx) => answers[idx] === q.correctAnswer
      ).length
      const totalQuestions = sampleQuestions[selectedDomain].length
      setScore((correctAnswers / totalQuestions) * 100)
    }
  }

  const resetQuiz = () => {
    setStep('difficulty')
    setSelectedDifficulty('')
    setSelectedDomain('')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setScore(null)
  }

  const renderDifficultySelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {difficultyLevels.map((level) => (
        <motion.button
          key={level.id}
          onClick={() => handleDifficultySelect(level.name)}
          className="p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-4xl mb-3">{level.icon}</div>
          <h3 className="text-xl font-semibold">{level.name}</h3>
        </motion.button>
      ))}
    </div>
  )

  const renderDomainSelection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Technical Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.technical.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() => handleDomainSelect(domain.name)}
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{domain.icon}</div>
              <h3 className="text-xl font-semibold">{domain.name}</h3>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Non-Technical Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domains.nonTechnical.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() => handleDomainSelect(domain.name)}
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{domain.icon}</div>
              <h3 className="text-xl font-semibold">{domain.name}</h3>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderQuiz = () => {
    const questions = sampleQuestions[selectedDomain]
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    if (score !== null) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
            <p className="text-xl mb-6">Your score: {score.toFixed(1)}%</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Another Quiz
            </button>
          </div>

          <CourseRecommendations domain={selectedDomain} score={score} />
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>
            {step === 'difficulty' && 'Select Difficulty Level'}
            {step === 'domain' && 'Choose Quiz Domain'}
            {step === 'quiz' && selectedDomain}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'difficulty' && renderDifficultySelection()}
          {step === 'domain' && renderDomainSelection()}
          {step === 'quiz' && renderQuiz()}
        </div>
      </DialogContent>
    </Dialog>
  )
} 