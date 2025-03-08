'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featuresDropdown, setFeaturesDropdown] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    'AI Motivation Tracking',
    'Adaptive Learning Paths',
    'Gamification',
    'Public Speaking & Confidence Building',
    'Mental Well-Being & Focus',
    'Community & Peer Learning',
  ];

  const community = [
    'Leaderboards',
    'Live Webinars & Events',
    'Study Groups & Peer Challenges',
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              PeakMindAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`text-gray-700 hover:text-purple-600 transition-colors ${
                pathname === '/' ? 'text-purple-600' : ''
              }`}
            >
              Home
            </Link>

            {/* Features Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                onMouseEnter={() => setFeaturesDropdown(true)}
                onMouseLeave={() => setFeaturesDropdown(false)}
              >
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {featuresDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2"
                    onMouseEnter={() => setFeaturesDropdown(true)}
                    onMouseLeave={() => setFeaturesDropdown(false)}
                  >
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        href={`/features/${feature.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        {feature}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Community Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors"
                onMouseEnter={() => setCommunityDropdown(true)}
                onMouseLeave={() => setCommunityDropdown(false)}
              >
                <span>Community</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {communityDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2"
                    onMouseEnter={() => setCommunityDropdown(true)}
                    onMouseLeave={() => setCommunityDropdown(false)}
                  >
                    {community.map((item, index) => (
                      <Link
                        key={index}
                        href={`/community/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/blog"
              className={`text-gray-700 hover:text-purple-600 transition-colors ${
                pathname === '/blog' ? 'text-purple-600' : ''
              }`}
            >
              Blog & Resources
            </Link>

            <Link 
              href="/contact"
              className={`text-gray-700 hover:text-purple-600 transition-colors ${
                pathname === '/contact' ? 'text-purple-600' : ''
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Auth Buttons */}
          

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
              >
                Home
              </Link>

              {/* Mobile Features */}
              <div>
                <button
                  onClick={() => setFeaturesDropdown(!featuresDropdown)}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${featuresDropdown ? 'rotate-180' : ''}`} />
                </button>
                {featuresDropdown && (
                  <div className="pl-4">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        href={`/features/${feature.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                      >
                        {feature}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Community */}
              <div>
                <button
                  onClick={() => setCommunityDropdown(!communityDropdown)}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                >
                  <span>Community</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${communityDropdown ? 'rotate-180' : ''}`} />
                </button>
                {communityDropdown && (
                  <div className="pl-4">
                    {community.map((item, index) => (
                      <Link
                        key={index}
                        href={`/community/${item.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
              >
                Blog & Resources
              </Link>

              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md"
              >
                Contact Us
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
