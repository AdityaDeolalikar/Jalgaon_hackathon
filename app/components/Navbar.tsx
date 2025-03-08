"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
import { usePoints } from "../context/PointsContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { points } = usePoints();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#4D55CC]/95 backdrop-blur-md shadow-lg" : "bg-[#4D55CC]/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              PeakMindAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-white/90 hover:text-white transition-colors ${
                pathname === "/" ? "text-white font-semibold" : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/contact"
              className={`text-white/90 hover:text-white transition-colors ${
                pathname === "/contact" ? "text-white font-semibold" : ""
              }`}
            >
              Contact Us
            </Link>

            {/* Points Display - Desktop */}
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">
                {points.toLocaleString()} pts
              </span>
            </div>
          </div>

          {/* Mobile Points Display */}
          <div className="md:hidden flex items-center mr-2">
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full">
              <Star className="w-3 h-3 text-white" />
              <span className="text-white font-semibold text-sm">
                {points.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/90 hover:text-white transition-colors"
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#4D55CC]"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md"
              >
                Home
              </Link>

              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md"
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
