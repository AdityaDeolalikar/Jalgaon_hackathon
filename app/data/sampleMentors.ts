export interface Mentor {
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

export const sampleMentors: Mentor[] = [
  {
    name: "Dr. Sarah Chen",
    title: "Senior Software Engineer & AI Specialist",
    expertise: ["Machine Learning", "Python", "Deep Learning", "Data Science"],
    rating: 4.9,
    reviews: 128,
    hourlyRate: 85,
    location: "San Francisco, CA",
    availability: "Available next week",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    experience: "10+ years"
  },
  {
    name: "James Wilson",
    title: "Full Stack Developer & Cloud Architect",
    expertise: ["React", "Node.js", "AWS", "System Design"],
    rating: 4.8,
    reviews: 95,
    hourlyRate: 75,
    location: "London, UK",
    availability: "Available today",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    experience: "8 years"
  },
  {
    name: "Dr. Maya Patel",
    title: "Mobile Development Expert",
    expertise: ["iOS", "Android", "React Native", "Flutter"],
    rating: 4.9,
    reviews: 156,
    hourlyRate: 90,
    location: "Toronto, Canada",
    availability: "Available this week",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    experience: "12 years"
  },
  {
    name: "Alex Thompson",
    title: "DevOps & Security Specialist",
    expertise: ["Kubernetes", "Docker", "CI/CD", "Cloud Security"],
    rating: 4.7,
    reviews: 82,
    hourlyRate: 95,
    location: "Berlin, Germany",
    availability: "Available tomorrow",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    experience: "7 years"
  },
  {
    name: "Emma Rodriguez",
    title: "UX/UI Designer & Frontend Developer",
    expertise: ["UI Design", "UX Research", "React", "Figma"],
    rating: 4.8,
    reviews: 113,
    hourlyRate: 70,
    location: "Barcelona, Spain",
    availability: "Available today",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    experience: "6 years"
  },
  {
    name: "David Kim",
    title: "Blockchain & Web3 Expert",
    expertise: ["Solidity", "Ethereum", "Smart Contracts", "DeFi"],
    rating: 4.9,
    reviews: 76,
    hourlyRate: 100,
    location: "Seoul, South Korea",
    availability: "Available next week",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    experience: "5 years"
  }
]; 