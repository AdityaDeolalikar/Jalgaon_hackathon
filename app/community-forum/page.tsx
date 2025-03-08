'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import MentorSearch from '../components/MentorSearch'
import MentorGrid from '../components/MentorGrid'
import { sampleMentors, Mentor } from '../data/sampleMentors'

interface FilterState {
  expertise: string[];
  experience: string;
  location: string;
  availability: string;
  rating: number;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    expertise: [],
    experience: '',
    location: '',
    availability: '',
    rating: 0,
  });

  const filteredMentors = sampleMentors.filter((mentor: Mentor) => {
    // Search query filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchLower) ||
        mentor.title.toLowerCase().includes(searchLower) ||
        mentor.expertise.some((skill: string) => skill.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Expertise filter
    if (filters.expertise.length > 0) {
      const hasMatchingExpertise = filters.expertise.some(expertise =>
        mentor.expertise.some((skill: string) => skill.toLowerCase().includes(expertise.toLowerCase()))
      );
      if (!hasMatchingExpertise) return false;
    }

    // Experience filter
    if (filters.experience) {
      const yearsMatch = mentor.experience.toLowerCase().includes(filters.experience.toLowerCase());
      if (!yearsMatch) return false;
    }

    // Location filter
    if (filters.location) {
      const locationMatch = mentor.location.toLowerCase().includes(filters.location.toLowerCase());
      if (!locationMatch) return false;
    }

    // Availability filter
    if (filters.availability) {
      const availabilityMatch = mentor.availability.toLowerCase().includes(filters.availability.toLowerCase());
      if (!availabilityMatch) return false;
    }

    // Rating filter
    if (filters.rating > 0) {
      if (mentor.rating < filters.rating) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
      <Navbar/>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16 mt-24 relative">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            Find Your Next Guide
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Find Your Perfect Mentor
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Connect with experienced professionals who can guide you through your learning journey
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-12">
          <MentorSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="mt-12">
          <MentorGrid mentors={filteredMentors} />
        </div>
      </main>
    </div>
  )
}

export default Page
