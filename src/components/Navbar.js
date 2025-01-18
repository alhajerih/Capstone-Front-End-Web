"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolling down or up
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsVisible(true);
        setIsScrolled(false);
      }

      // Reset to transparent when at top
      if (currentScrollY === 0) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled ? "bg-white/70 shadow-lg" : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold ${
                isScrolled ? "text-gray-800" : "text-black"
              }`}
            >
              <Image
                src="/UnifyLogo.png"
                alt="Nomo Card"
                width={100}
                height={128}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`hover:text-gray-900 ${
                isScrolled ? "text-gray-600" : "text-black"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`hover:text-gray-900 ${
                isScrolled ? "text-gray-600" : "text-black"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className={`hover:text-gray-900 ${
                isScrolled ? "text-gray-600" : "text-black"
              }`}
            >
              Features
            </button>

            <Link
              href="/login"
              className={`px-4 py-2 rounded-md ${
                isScrolled
                  ? " text-black hover:bg-blue-600"
                  : " text-blue-500 hover:bg-gray-100"
              }`}
            >
              Join us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none ${
                isScrolled ? "text-gray-600" : "text-white"
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => scrollToSection("home")}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2"
              >
                Pricing
              </button>
              <Link
                href="/login"
                className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Join us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
