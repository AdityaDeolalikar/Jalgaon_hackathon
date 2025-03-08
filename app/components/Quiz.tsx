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
import { usePoints } from '../context/PointsContext'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  type?: 'text' | 'image'
  imageUrl?: string
  emoji?: string
}

const domains = {
  technical: [
    { id: 1, name: 'Technology', icon: '🚀' },
    { id: 2, name: 'Science', icon: '🔬' },
    { id: 3, name: 'Visual Programming', icon: '👨‍💻' }
  ],
  nonTechnical: [
    { id: 4, name: 'Art & Design', icon: '🎨' },
    { id: 5, name: 'Nature', icon: '🌿' },
    { id: 6, name: 'General Knowledge', icon: '🌍' },
  ]
}

const difficultyLevels = [
  { id: 1, name: 'Easy', icon: '🟢' },
  { id: 2, name: 'Medium', icon: '🟡' },
  { id: 3, name: 'Hard', icon: '🔴' },
]

const sampleQuestions: Record<string, QuizQuestion[]> = {
  'Technology': [
    {
      id: 1,
      type: 'image',
      question: 'What programming language is represented by this logo?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
      options: ['Java', 'Python', 'JavaScript', 'PHP'],
      correctAnswer: 'Python',
      emoji: '🐍'
    },
    {
      id: 2,
      type: 'image',
      question: 'Which tech company\'s headquarters is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Apple_Park_at_Night.jpg',
      options: ['Google', 'Microsoft', 'Apple', 'Meta'],
      correctAnswer: 'Apple',
      emoji: '🏢'
    },
    {
      id: 3,
      type: 'image',
      question: 'What type of computer component is shown here?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Crucial_8GB_DDR4_RAM_Module.jpg',
      options: ['CPU', 'RAM', 'GPU', 'SSD'],
      correctAnswer: 'RAM',
      emoji: '💾'
    },
    {
      id: 4,
      question: 'Which protocol is used for secure internet browsing?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correctAnswer: 'HTTPS',
      emoji: '🔒'
    },
    {
      id: 5,
      question: 'What does AI stand for?',
      options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Interface', 'Automated Interface'],
      correctAnswer: 'Artificial Intelligence',
      emoji: '🤖'
    }
  ],
  'Science': [
    {
      id: 1,
      type: 'image',
      question: 'What type of celestial body is shown in this image?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_%28NASA-med%29.jpg',
      options: ['Planet', 'Star', 'Galaxy', 'Nebula'],
      correctAnswer: 'Galaxy',
      emoji: '🌌'
    },
    {
      id: 2,
      type: 'image',
      question: 'Which type of cell structure is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Plant_cell_structure_svg.svg/1024px-Plant_cell_structure_svg.svg.png',
      options: ['Animal Cell', 'Plant Cell', 'Bacteria', 'Virus'],
      correctAnswer: 'Plant Cell',
      emoji: '🌱'
    },
    {
      id: 3,
      type: 'image',
      question: 'What chemical reaction is shown here?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Photosynthesis_en.svg',
      options: ['Combustion', 'Photosynthesis', 'Oxidation', 'Fermentation'],
      correctAnswer: 'Photosynthesis',
      emoji: '☀️'
    },
    {
      id: 4,
      question: 'What is the atomic number of Carbon?',
      options: ['4', '6', '8', '12'],
      correctAnswer: '6',
      emoji: '⚛️'
    },
    {
      id: 5,
      question: 'Which law of motion states that "For every action, there is an equal and opposite reaction"?',
      options: ['First Law', 'Second Law', 'Third Law', 'Fourth Law'],
      correctAnswer: 'Third Law',
      emoji: '🔄'
    }
  ],
  'Visual Programming': [
    {
      id: 1,
      type: 'image',
      question: 'What type of diagram is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Flowchart_example.svg/1024px-Flowchart_example.svg.png',
      options: ['Flowchart', 'Mind Map', 'UML', 'ERD'],
      correctAnswer: 'Flowchart',
      emoji: '📊'
    },
    {
      id: 2,
      type: 'image',
      question: 'Which design pattern is represented in this diagram?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Observer_w_update.svg/1024px-Observer_w_update.svg.png',
      options: ['Singleton', 'Observer', 'Factory', 'Decorator'],
      correctAnswer: 'Observer',
      emoji: '👀'
    },
    {
      id: 3,
      type: 'image',
      question: 'What type of sorting algorithm is visualized here?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif',
      options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
      correctAnswer: 'Bubble Sort',
      emoji: '🔄'
    },
    {
      id: 4,
      question: 'Which data structure follows LIFO principle?',
      options: ['Queue', 'Stack', 'Array', 'Tree'],
      correctAnswer: 'Stack',
      emoji: '📚'
    },
    {
      id: 5,
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctAnswer: 'O(log n)',
      emoji: '⏱️'
    }
  ],
  'Art & Design': [
    {
      id: 1,
      type: 'image',
      question: 'Which art movement does this famous painting belong to?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
      options: ['Impressionism', 'Post-Impressionism', 'Cubism', 'Surrealism'],
      correctAnswer: 'Post-Impressionism',
      emoji: '🎨'
    },
    {
      id: 2,
      type: 'image',
      question: 'What type of typeface is shown here?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Times_New_Roman_sample.svg',
      options: ['Sans-serif', 'Serif', 'Script', 'Display'],
      correctAnswer: 'Serif',
      emoji: '✒️'
    },
    {
      id: 3,
      type: 'image',
      question: 'Which principle of design is demonstrated in this image?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Gestalt_similarity.svg/1024px-Gestalt_similarity.svg.png',
      options: ['Balance', 'Contrast', 'Similarity', 'Movement'],
      correctAnswer: 'Similarity',
      emoji: '👥'
    },
    {
      id: 4,
      question: 'What are the primary colors?',
      options: ['Red, Blue, Green', 'Red, Blue, Yellow', 'Red, Green, Yellow', 'Blue, Green, Yellow'],
      correctAnswer: 'Red, Blue, Yellow',
      emoji: '🎨'
    },
    {
      id: 5,
      question: 'Which file format is best for logos with transparency?',
      options: ['JPG', 'PNG', 'BMP', 'TIFF'],
      correctAnswer: 'PNG',
      emoji: '🖼️'
    }
  ],
  'Nature': [
    {
      id: 1,
      type: 'image',
      question: 'What type of cloud formation is shown in this image?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Cumulus_clouds_panorama.jpg',
      options: ['Stratus', 'Cumulus', 'Cirrus', 'Nimbus'],
      correctAnswer: 'Cumulus',
      emoji: '☁️'
    },
    {
      id: 2,
      type: 'image',
      question: 'Which type of tree is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg',
      options: ['Oak', 'Maple', 'Ash', 'Birch'],
      correctAnswer: 'Ash',
      emoji: '🌳'
    },
    {
      id: 3,
      type: 'image',
      question: 'What type of rock formation is shown here?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Giants_causeway_closeup.jpg',
      options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Composite'],
      correctAnswer: 'Igneous',
      emoji: '🗿'
    },
    {
      id: 4,
      question: 'What causes the Northern Lights?',
      options: [
        'Solar wind interacting with Earth\'s magnetosphere',
        'Light reflection from ice crystals',
        'Volcanic eruptions',
        'Ocean bioluminescence'
      ],
      correctAnswer: 'Solar wind interacting with Earth\'s magnetosphere',
      emoji: '✨'
    },
    {
      id: 5,
      question: 'Which is the largest species of penguin?',
      options: ['King Penguin', 'Emperor Penguin', 'Gentoo Penguin', 'Royal Penguin'],
      correctAnswer: 'Emperor Penguin',
      emoji: '🐧'
    }
  ],
  'General Knowledge': [
    {
      id: 1,
      type: 'image',
      question: 'Which famous landmark is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Taj_Mahal_SB.jpg',
      options: ['Petra', 'Taj Mahal', 'Colosseum', 'Parthenon'],
      correctAnswer: 'Taj Mahal',
      emoji: '🏛️'
    },
    {
      id: 2,
      type: 'image',
      question: 'Which country\'s flag is this?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
      options: ['Japan', 'China', 'South Korea', 'Vietnam'],
      correctAnswer: 'South Korea',
      emoji: '🏁'
    },
    {
      id: 3,
      type: 'image',
      question: 'What musical instrument family does this belong to?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cello_front_side.jpg',
      options: ['Woodwind', 'Brass', 'Strings', 'Percussion'],
      correctAnswer: 'Strings',
      emoji: '🎻'
    },
    {
      id: 4,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
      emoji: '🔴'
    },
    {
      id: 5,
      question: 'Who wrote "The Theory of Relativity"?',
      options: ['Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'Niels Bohr'],
      correctAnswer: 'Albert Einstein',
      emoji: '👨‍🔬'
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
  const { addPoints } = usePoints()

  const calculatePointsForQuiz = (score: number, difficulty: string): number => {
    const basePoints = 100
    const difficultyMultiplier = {
      'Easy': 1,
      'Medium': 2,
      'Hard': 3
    }[difficulty] || 1

    return Math.round((score / 100) * basePoints * difficultyMultiplier)
  }

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
      ).length + (answer === sampleQuestions[selectedDomain][currentQuestionIndex].correctAnswer ? 1 : 0)
      const totalQuestions = sampleQuestions[selectedDomain].length
      const finalScore = (correctAnswers / totalQuestions) * 100
      setScore(finalScore)

      // Award points based on score and difficulty
      const pointsEarned = calculatePointsForQuiz(finalScore, selectedDifficulty)
      addPoints(pointsEarned)
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
          className={`p-6 rounded-xl border-2 ${
            level.name === 'Easy' ? 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50' :
            level.name === 'Medium' ? 'border-amber-200 hover:border-amber-400 hover:bg-amber-50' :
            'border-rose-200 hover:border-rose-400 hover:bg-rose-50'
          } transition-all duration-200 shadow-sm hover:shadow-md`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-4xl mb-3">{level.icon}</div>
          <h3 className={`text-xl font-semibold ${
            level.name === 'Easy' ? 'text-emerald-700' :
            level.name === 'Medium' ? 'text-amber-700' :
            'text-rose-700'
          }`}>{level.name}</h3>
        </motion.button>
      ))}
    </div>
  )

  const renderDomainSelection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">Technical Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.technical.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() => handleDomainSelect(domain.name)}
              className="p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{domain.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-700">{domain.name}</h3>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-violet-700">Non-Technical Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {domains.nonTechnical.map((domain) => (
            <motion.button
              key={domain.id}
              onClick={() => handleDomainSelect(domain.name)}
              className="p-6 rounded-xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-3">{domain.icon}</div>
              <h3 className="text-xl font-semibold text-violet-700">{domain.name}</h3>
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
            <div className="text-6xl mb-6 animate-bounce">
              {score >= 90 ? '🏆' : score >= 70 ? '🎉' : score >= 50 ? '💪' : '📚'}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-indigo-700">Quiz Complete!</h3>
            <p className="text-xl mb-6">
              Your score: <span className={`font-bold ${
                score >= 80 ? 'text-emerald-600' :
                score >= 60 ? 'text-amber-600' :
                'text-rose-600'
              }`}>{score.toFixed(1)}%</span>
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg"
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
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-indigo-600 mt-2 font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border border-indigo-100">
          {currentQuestion.emoji && (
            <div className="text-4xl mb-4 animate-bounce">{currentQuestion.emoji}</div>
          )}
          <h3 className="text-xl font-medium mb-6 text-indigo-900">{currentQuestion.question}</h3>
          
          {currentQuestion.type === 'image' && currentQuestion.imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={currentQuestion.imageUrl} 
                alt="Question Image"
                className="w-full h-64 object-contain bg-gray-50"
              />
            </div>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left rounded-lg border-2 border-indigo-100 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 hover:shadow-md"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b bg-gradient-to-r from-indigo-50 to-violet-50">
          <DialogTitle className="text-indigo-900">
            {step === 'difficulty' && 'Select Difficulty Level'}
            {step === 'domain' && 'Choose Quiz Domain'}
            {step === 'quiz' && selectedDomain}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {step === 'difficulty' && renderDifficultySelection()}
          {step === 'domain' && renderDomainSelection()}
          {step === 'quiz' && renderQuiz()}
        </div>
      </DialogContent>
    </Dialog>
  )
} 