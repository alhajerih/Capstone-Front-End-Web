"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

const LandingPage = () => {
  const cardVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    hover: { y: -12, transition: { duration: 0.2 } },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideAnimation = {
    x: [-10, 10],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className=" bg-gray-50 relative overflow-hidden py-6 ">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-bold text-black">
                One Card,
                <br />
                <span className="text-purple-600">Endless</span>
                <br />
                Possibilities
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Combine all your cards into one secure digital wallet.
                Experience seamless payments and complete control over your
                finances.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-full hover:bg-purple-700 transition-colors"
                >
                  Get Started
                </Link>
                <button
                  onClick={() => scrollToSection("features")}
                  className="inline-flex items-center px-8 py-4 border-2 border-purple-600 text-purple-600 text-lg font-medium rounded-full hover:bg-purple-50 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right content - Animated Cards */}
            <div className="relative h-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-30" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30" />

                  {/* Cards Stack */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* First Card */}
                    <motion.div
                      className="absolute"
                      animate={{
                        rotate: [0, 5, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src="/UnifyCard.png"
                        alt="Card 1"
                        className="w-[380px] h-[220px] rounded-3xl shadow-2xl"
                      />
                    </motion.div>

                    {/* Second Card */}
                    <motion.div
                      className="absolute"
                      animate={{
                        rotate: [0, -5, 0],
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    >
                      <img
                        src="/UnifyCard.png"
                        alt="Card 2"
                        className="w-[380px] h-[220px] rounded-3xl shadow-2xl"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[600px] relative">
            {/* Single row of bank cards */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="absolute flex gap-6 transform"
            >
              {/* Boubyan Visa Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                animate={slideAnimation}
                className="w-48 h-32 "
              >
                <Image
                  src="/BoubyanVisa.png"
                  alt="Boubyan Visa Card"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Nomo Card */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                animate={{
                  ...slideAnimation,
                  transition: { ...slideAnimation.transition, delay: 0.1 },
                }}
                className="w-48 h-32 "
              >
                <Image
                  src="/Nomo1.png"
                  alt="Nomo Card"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Additional Boubyan Cards */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                animate={{
                  ...slideAnimation,
                  transition: { ...slideAnimation.transition, delay: 0.2 },
                }}
                className="w-48 h-32 "
              >
                <Image
                  src="/BoubyanVisa.png"
                  alt="Boubyan Card"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                animate={{
                  ...slideAnimation,
                  transition: { ...slideAnimation.transition, delay: 0.3 },
                }}
                className="w-48 h-32 "
              >
                <Image
                  src="/Nomo1.png"
                  alt="Boubyan Card"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
                animate={{
                  ...slideAnimation,
                  transition: { ...slideAnimation.transition, delay: 0.4 },
                }}
                className="w-48 h-32 "
              >
                <Image
                  src="/BoubyanMasterCard.png"
                  alt="Boubyan Card"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* iPhone frame - centered */}
            <div className="relative z-20">
              <div className="w-[280px] h-[570px] border-[8px] border-black rounded-[3rem] relative">
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-3 bg-black rounded-b-3xl z-20"></div>

                {/* App Interface - removed background and blur effects */}
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center mt-60">
                    <div className="w-16 h-16 rounded-full border-4 border-black/80 flex items-center justify-center mb-4">
                      <div className="text-4xl text-black/80">✓</div>
                    </div>
                    <div className="text-xl text-black/80">Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Follow these steps to combine your cards and create wallets using
            the app:
          </p>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute inset-x-0 top-[25px] h-0.5 bg-black ml-40"></div>

            <div className="grid grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 relative z-10">
                  1
                </div>
                <div className="bg-gray-200 rounded-3xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Step 1: Add Your Cards
                  </h3>
                  <p className="text-gray-800 text-sm">
                    Easily add all your existing cards to the app by entering
                    your civil ID .
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 relative z-10">
                  2
                </div>
                <div className="bg-gray-200 rounded-3xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Step 2: Create Wallets
                  </h3>
                  <p className="text-gray-800 text-sm">
                    Organize your cards into different wallets based on your
                    preferences and needs. Customize each wallet with a unique
                    name and color.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 relative z-10">
                  3
                </div>
                <div className="bg-gray-200 rounded-3xl p-6">
                  <h3 className="text-lg font-semibold mb-2 text-black">
                    Step 3: Manage Transactions
                  </h3>
                  <p className="text-gray-800 text-sm">
                    Track and manage your transactions within each wallet.
                    Monitor your spending and stay on top of your finances
                    effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Travels Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image on the left */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/AllInOneCard1.png"
                  alt="Safe Travels"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content on the right */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl px-6 py-5">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Safe Travels, Everywhere
              </h2>
              <p className="text-gray-600 mb-8">
                Travel with confidence knowing your cards are protected. Our
                advanced security features ensure your transactions are safe, no
                matter where you are in the world.
              </p>
              <div className="space-y-4">
                {/* Feature points */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Real-time transaction monitoring and instant notifications
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Fraud detection and prevention systems
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 text-blue-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    24/7 customer support for peace of mind
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black hover:text-red-500"
                >
                  Get Unify
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
