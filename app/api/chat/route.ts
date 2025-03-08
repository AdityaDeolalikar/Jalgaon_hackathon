import { NextResponse } from 'next/server'

const GEMINI_API_KEY ="AIzaSyAdyNO4vYkMY3jAYVXhsfFmg6-Gh2Cu-3I"
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

interface StressResponse {
  question: string
  response: string
}

export async function POST(request: Request) {
  try {
    const { responses } = await request.json()
    
    // Format the responses into the desired prompt structure
    const formattedResponses = responses.map((response: StressResponse) => ({
      question: response.question,
      response: response.response
    }))

    const prompt = `You are an AI-powered motivational and productivity coach designed to provide a personalized response based on the user's stress indicators. You will receive a structured JSON input containing a list of questions and the user's responses. Your task is to analyze the responses and generate an empathetic, constructive, and solution-oriented message. the response must not be exceed 50 words.

Input: ${JSON.stringify(formattedResponses, null, 2)}`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to get response from Gemini API')
    }

    const data = await response.json()
    const message = data.candidates[0].content.parts[0].text

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 