import { motion } from 'framer-motion'

interface Course {
  id: string
  title: string
  provider: string
  rating: number
  duration: string
  level: string
  description: string
  imageUrl: string
  price: string
  link: string
}

interface CourseRecommendationsProps {
  domain: string
  score: number
}

const sampleCourses: Record<string, Course[]> = {
  'Psychological': [
    {
      id: 'psych-1',
      title: 'Introduction to Psychology',
      provider: 'Coursera',
      rating: 4.8,
      duration: '8 weeks',
      level: 'Beginner',
      description: 'Learn the fundamentals of psychology and human behavior',
      imageUrl: 'https://placehold.co/600x400',
      price: 'Free',
      link: 'https://coursera.org'
    },
    {
      id: 'psych-2',
      title: 'Cognitive Psychology Specialization',
      provider: 'edX',
      rating: 4.7,
      duration: '12 weeks',
      level: 'Intermediate',
      description: 'Deep dive into cognitive processes and mental functions',
      imageUrl: 'https://placehold.co/600x400',
      price: '$49',
      link: 'https://edx.org'
    },
    {
      id: 'psych-3',
      title: 'Social Psychology',
      provider: 'Udemy',
      rating: 4.6,
      duration: '6 weeks',
      level: 'Advanced',
      description: 'Understanding human social behavior and interactions',
      imageUrl: 'https://placehold.co/600x400',
      price: '$29.99',
      link: 'https://udemy.com'
    }
  ],
  'Academic': [
    {
      id: 'acad-1',
      title: 'Learning How to Learn',
      provider: 'Coursera',
      rating: 4.9,
      duration: '4 weeks',
      level: 'Beginner',
      description: 'Powerful mental tools to help you master tough subjects',
      imageUrl: 'https://placehold.co/600x400',
      price: 'Free',
      link: 'https://coursera.org'
    },
    {
      id: 'acad-2',
      title: 'Critical Thinking and Problem Solving',
      provider: 'edX',
      rating: 4.7,
      duration: '6 weeks',
      level: 'Intermediate',
      description: 'Develop essential critical thinking skills',
      imageUrl: 'https://placehold.co/600x400',
      price: '$59',
      link: 'https://edx.org'
    },
    {
      id: 'acad-3',
      title: 'Research Methods and Academic Writing',
      provider: 'Udemy',
      rating: 4.6,
      duration: '8 weeks',
      level: 'Advanced',
      description: 'Master academic research and writing techniques',
      imageUrl: 'https://placehold.co/600x400',
      price: '$39.99',
      link: 'https://udemy.com'
    }
  ],
  'General Knowledge': [
    {
      id: 'gen-1',
      title: 'World History and Cultures',
      provider: 'Coursera',
      rating: 4.8,
      duration: '10 weeks',
      level: 'Beginner',
      description: 'Comprehensive overview of world history and cultural diversity',
      imageUrl: 'https://placehold.co/600x400',
      price: 'Free',
      link: 'https://coursera.org'
    },
    {
      id: 'gen-2',
      title: 'Current Affairs and Global Issues',
      provider: 'edX',
      rating: 4.7,
      duration: '6 weeks',
      level: 'Intermediate',
      description: 'Stay updated with global events and their impact',
      imageUrl: 'https://placehold.co/600x400',
      price: '$49',
      link: 'https://edx.org'
    },
    {
      id: 'gen-3',
      title: 'Critical Analysis of Information',
      provider: 'Udemy',
      rating: 4.6,
      duration: '4 weeks',
      level: 'Advanced',
      description: 'Learn to analyze and verify information effectively',
      imageUrl: 'https://placehold.co/600x400',
      price: '$29.99',
      link: 'https://udemy.com'
    }
  ],
  'Technology': [
    {
      id: 'tech-1',
      title: 'Computer Science Fundamentals',
      provider: 'Coursera',
      rating: 4.9,
      duration: '12 weeks',
      level: 'Beginner',
      description: 'Essential concepts in computer science and programming',
      imageUrl: 'https://placehold.co/600x400',
      price: 'Free',
      link: 'https://coursera.org'
    },
    {
      id: 'tech-2',
      title: 'Web Development Bootcamp',
      provider: 'edX',
      rating: 4.8,
      duration: '16 weeks',
      level: 'Intermediate',
      description: 'Full-stack web development with modern technologies',
      imageUrl: 'https://placehold.co/600x400',
      price: '$199',
      link: 'https://edx.org'
    },
    {
      id: 'tech-3',
      title: 'AI and Machine Learning',
      provider: 'Udemy',
      rating: 4.7,
      duration: '10 weeks',
      level: 'Advanced',
      description: 'Advanced concepts in AI and machine learning',
      imageUrl: 'https://placehold.co/600x400',
      price: '$89.99',
      link: 'https://udemy.com'
    }
  ],
  'Science': [
    {
      id: 'sci-1',
      title: 'Introduction to Scientific Thinking',
      provider: 'Coursera',
      rating: 4.8,
      duration: '6 weeks',
      level: 'Beginner',
      description: 'Learn the scientific method and critical analysis',
      imageUrl: 'https://placehold.co/600x400',
      price: 'Free',
      link: 'https://coursera.org'
    },
    {
      id: 'sci-2',
      title: 'Data Analysis for Scientists',
      provider: 'edX',
      rating: 4.7,
      duration: '8 weeks',
      level: 'Intermediate',
      description: 'Statistical analysis and data interpretation',
      imageUrl: 'https://placehold.co/600x400',
      price: '$79',
      link: 'https://edx.org'
    },
    {
      id: 'sci-3',
      title: 'Advanced Research Methods',
      provider: 'Udemy',
      rating: 4.6,
      duration: '10 weeks',
      level: 'Advanced',
      description: 'Advanced research techniques and methodologies',
      imageUrl: 'https://placehold.co/600x400',
      price: '$69.99',
      link: 'https://udemy.com'
    }
  ]
}

export default function CourseRecommendations({ domain, score }: CourseRecommendationsProps) {
  const courses = sampleCourses[domain] || []
  const recommendedLevel = score < 50 ? 'Beginner' : score < 80 ? 'Intermediate' : 'Advanced'
  
  return (
    <div className="space-y-6 max-h-[600px] overflow-hidden flex flex-col">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Recommended Courses</h3>
        <p className="text-gray-600">
          Based on your quiz performance, we recommend these {recommendedLevel.toLowerCase()}-level courses
        </p>
      </div>

      <div className="overflow-y-auto pr-4 flex-1 space-y-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row"
          >
            <div className="relative h-48 md:h-auto md:w-64 rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden flex-shrink-0">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                {course.price}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {course.provider}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
              <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.duration}</span>
                <span>{course.level}</span>
              </div>
              
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Course
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 