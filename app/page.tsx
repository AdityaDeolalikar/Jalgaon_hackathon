"use client"
import FeatureCards from "./components/FeatureCards";
import Navbar from "./components/Navbar";
import { ArrowRight, Brain, Target, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <main className="pt-16">
        <section className="relative overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-blue-50 dark:from-purple-950/20 dark:via-transparent dark:to-blue-950/20" />
          <div className="absolute w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -top-32 -left-32" />
          <div className="absolute w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -bottom-32 -right-32" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
            <div className="text-center space-y-8 mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Unlock Your Full Learning Potential
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transform your educational journey with AI-powered motivation tracking, personalized learning paths, and a supportive community.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                
              </motion.div>
            </div>

            {/* Key Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Growth</h3>
                <p className="text-gray-600 dark:text-gray-300">Smart recommendations and stress detection to keep you motivated and on track.</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-gray-600 dark:text-gray-300">Adaptive paths and challenges tailored to your unique learning style and goals.</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-gray-600 dark:text-gray-300">Connect with peers, join study groups, and participate in inspiring meetups.</p>
              </div>
            </motion.div>
          </div>
        </section>
        <FeatureCards />
      </main>
    </div>
  );
}
