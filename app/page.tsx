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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30" />
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/20 to-purple-300/20 dark:from-indigo-800/20 dark:to-purple-800/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-300/20 to-pink-300/20 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-36 relative">
            <div className="text-center space-y-10 mb-16">
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                    Unlock Your Full
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
                    Learning Potential
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transform your educational journey with AI-powered motivation tracking, personalized learning paths, and a supportive community that helps you achieve your goals.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link 
                  href="/signup" 
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
               
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div 
              className="absolute top-10 left-10 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">AI-Powered ✨</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-40 right-10 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-pink-600 dark:text-pink-400 font-semibold">Smart Learning 🚀</span>
              </div>
            </motion.div>

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
