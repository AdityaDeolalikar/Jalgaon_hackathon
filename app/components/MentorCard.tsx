'use client'
import React from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, Award, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface MentorCardProps {
  name: string;
  title: string;
  expertise: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  availability: string;
  imageUrl: string;
  experience: string;
}

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  title,
  expertise,
  rating,
  reviews,
  hourlyRate,
  location,
  availability,
  imageUrl,
  experience,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600 mb-2">{title}</p>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <Award className="w-4 h-4" />
              <span>{experience}</span>
              <span className="mx-2">•</span>
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{availability}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">${hourlyRate}/hour</span>
                <a 
                  href="https://cal.com/aditya-deolalikar-wqordb/discussion-forum"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>Schedule a Meeting</span>
                </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentorCard; 