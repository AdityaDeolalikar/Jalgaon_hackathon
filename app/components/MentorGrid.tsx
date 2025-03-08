import React from 'react';
import MentorCard from './MentorCard';
import { Mentor } from '../data/sampleMentors';

interface MentorGridProps {
  mentors: Mentor[];
}

const MentorGrid: React.FC<MentorGridProps> = ({ mentors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {mentors.map((mentor, index) => (
        <MentorCard key={index} {...mentor} />
      ))}
    </div>
  );
};

export default MentorGrid; 