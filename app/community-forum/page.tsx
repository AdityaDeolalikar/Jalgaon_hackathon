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
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <main className="container mx-auto py-8">
        <div className="text-center max-w-3xl mx-auto mb-12 mt-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Mentor</h1>
          <p className="text-gray-600 text-lg">
            Connect with experienced professionals who can guide you through your learning journey
          </p>
        </div>
        <MentorSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="mt-12">
          <MentorGrid mentors={filteredMentors} />
        </div>
      </main>
    </div>
  )
}

export default Page
