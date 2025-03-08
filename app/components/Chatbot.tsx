'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Question {
  id: number
  category: string
  text: string
  emoji?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

const questions: Question[] = [
  // Psychological Stress Indicators
  { id: 1, category: "Psychological", text: "How often do you feel overwhelmed by daily responsibilities?", emoji: "🤯" },
  { id: 2, category: "Psychological", text: "Do you find it difficult to concentrate on tasks?", emoji: "🎯" },
  { id: 3, category: "Psychological", text: "Do you experience frequent mood swings?", emoji: "🔄" },
  { id: 4, category: "Psychological", text: "Do you feel anxious or worried even when there is no immediate problem?", emoji: "😰" },
  { id: 5, category: "Psychological", text: "Do you find yourself overthinking situations?", emoji: "🤔" },
  
  // Physical Stress Indicators
  { id: 6, category: "Physical", text: "Do you experience headaches or muscle tension frequently?", emoji: "🤕" },
  { id: 7, category: "Physical", text: "How often do you have difficulty sleeping or experience disturbed sleep?", emoji: "😴" },
  { id: 8, category: "Physical", text: "Do you feel physically fatigued even after resting?", emoji: "😫" },
  { id: 9, category: "Physical", text: "Do you experience an increased or irregular heartbeat due to stress?", emoji: "💓" },
  { id: 10, category: "Physical", text: "Do you have digestive issues during stressful times?", emoji: "😣" },
  
  // Emotional & Behavioral Stress Indicators
  { id: 11, category: "Emotional", text: "Do you get irritated or frustrated easily?", emoji: "😠" },
  { id: 12, category: "Emotional", text: "Do you avoid social interactions due to stress?", emoji: "🙅" },
  { id: 13, category: "Emotional", text: "Do you rely on unhealthy coping mechanisms?", emoji: "⚠️" },
  { id: 14, category: "Emotional", text: "How often do you feel unmotivated or lose interest in things?", emoji: "😕" },
  { id: 15, category: "Emotional", text: "Do you feel a sense of helplessness or loss of control?", emoji: "😢" },
]

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showQuestionnaire, setShowQuestionnaire] = useState(true)

  const handleAnswer = async (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Calculate stress levels and show results
      setShowQuestionnaire(false)
      setIsLoading(true)

      try {
        // Format responses for the API
        const formattedResponses = questions.map(question => ({
          question: question.text,
          response: getResponseText(answers[question.id])
        }))

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responses: formattedResponses }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()
        setMessages([{ role: 'assistant', content: data.message }])
      } catch (error) {
        console.error('Error:', error)
        setMessages([{ 
          role: 'assistant', 
          content: 'I apologize, but I encountered an error while analyzing your responses. Please try again later.' 
        }])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getResponseText = (value: number): string => {
    switch (value) {
      case 1:
        return "Never"
      case 2:
        return "Rarely"
      case 3:
        return "Sometimes"
      case 4:
        return "Often"
      case 5:
        return "Always"
      default:
        return "Not specified"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.message }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderQuestionnaire = () => {
    const currentQuestion = questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100

    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6">
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{currentQuestion.emoji}</span>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {currentQuestion.category}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-6">{currentQuestion.text}</h3>
            
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestion.id, value)}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:border-primary hover:bg-primary/5
                    ${answers[currentQuestion.id] === value ? 'border-primary bg-primary/10' : 'border-gray-200'}
                  `}
                >
                  <div className="text-center">
                    <div className="text-lg font-medium mb-1">{value}</div>
                    <div className="text-xs text-gray-500">
                      {value === 1 ? 'Never' : value === 5 ? 'Always' : ''}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Stress Level Assessment</DialogTitle>
        </DialogHeader>
        
        {showQuestionnaire ? (
          renderQuestionnaire()
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t p-4 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 