'use client'
import React from 'react';
import { FiSearch, FiFilter, FiMapPin, FiStar, FiClock } from 'react-icons/fi';

interface FilterState {
  expertise: string[];
  experience: string;
  location: string;
  availability: string;
  rating: number;
}

interface MentorSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const MentorSearch: React.FC<MentorSearchProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const expertiseAreas = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'AI/ML',
    'Cloud Computing',
    'Cybersecurity',
    'UI/UX Design',
  ];

  const experienceLevels = [
    '0-2 years',
    '3-5 years',
    '5-10 years',
    '10+ years',
  ];

  const handleExpertiseChange = (area: string) => {
    setFilters({
      ...filters,
      expertise: filters.expertise.includes(area)
        ? filters.expertise.filter(item => item !== area)
        : [...filters.expertise, area],
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors by name, expertise, or keywords..."
            className="w-full px-6 py-4 rounded-l-lg focus:outline-none"
          />
          <button className="px-6 py-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
        >
          <FiFilter className="w-5 h-5" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Expertise Areas */}
          <div>
            <h3 className="font-semibold mb-3">Expertise Areas</h3>
            <div className="flex flex-wrap gap-2">
              {expertiseAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => handleExpertiseChange(area)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filters.expertise.includes(area)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors duration-300`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <h3 className="font-semibold mb-3">Experience Level</h3>
            <div className="flex flex-wrap gap-2">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setFilters({ ...filters, experience: level })}
                  className={`px-4 py-2 rounded-full text-sm ${
                    filters.experience === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors duration-300`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Location Search */}
          <div>
            <h3 className="font-semibold mb-3">Location</h3>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                placeholder="Enter location..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="flex gap-3">
              {['Available Now', 'This Week', 'Next Week'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, availability: option })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    filters.availability === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors duration-300`}
                >
                  <FiClock className="w-4 h-4" />
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="flex gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters({ ...filters, rating })}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                    filters.rating === rating
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors duration-300`}
                >
                  <FiStar className={`w-4 h-4 ${filters.rating === rating ? 'fill-current' : ''}`} />
                  {rating}+
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSearch; 