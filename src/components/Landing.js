"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import CardShowcase from "./CardShowcase";
import { useEffect, useRef } from "react";
import { CreditCard, Wallet2, BarChart3 } from "lucide-react";
function Landing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Animation variables
    let frame = 0;
    const fontSize = Math.min(window.innerWidth / 15, 72); // Larger font size
    const text1 = "One Card,";
    const text2 = "Endless";
    const text3 = "Possibilities";

    function animate() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "left";

      // Calculate text positions
      const margin = canvas.width * 0.1; // 10% margin
      const x = margin;
      const y = canvas.height / 2;

      // Draw first line in black
      ctx.fillStyle = "black";
      ctx.fillText(text1, x, y - fontSize);

      // Draw "Endless" with color wave effect
      const letters1 = text2.split("");
      letters1.forEach((letter, i) => {
        const letterX = x + ctx.measureText(text2.substring(0, i)).width;
        const hue = (frame * 0.5 + i * 8) % 380;
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.fillText(letter, letterX, y);
      });

      // Draw "Possibilities" in black
      ctx.fillStyle = "black";
      ctx.fillText(text3, x, y + fontSize);

      frame++;
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  const steps = [
    {
      number: 1,
      title: "Step 1: Add Your Cards",
      description:
        "Easily add all your existing cards to the app by entering your civil ID .",
      icon: <CreditCard className="size-8" />,
    },
    {
      number: 2,
      title: "Step 2: Create Wallets",
      description:
        "Organize your cards into different wallets based on your preferences and needs. Customize each wallet with a unique name and color.",
      icon: <Wallet2 className="size-8" />,
    },
    {
      number: 3,
      title: "Step 3: Manage Transactions",
      description:
        "Track and manage your transactions within each wallet. Monitor your spending and stay on top of your finances effortlessly.",
      icon: <BarChart3 className="size-8" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-6 mt-8">
        <div className="container mx-auto px-4 justify-center h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
              <div className="h-[300px] relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full absolute inset-0"
                />
              </div>
              <p className="text-xl text-gray-600 max-w-lg">
                Combine all your cards into one secure digital wallet.
                Experience seamless payments and complete control over your
                finances.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center px-8 py-4 bg-purple-600 text-white text-lg font-medium rounded-full hover:bg-purple-700 transition-colors"
                >
                  Get Unify
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
      {/**Phone frame with bank cards behind it */}
      <CardShowcase />

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto px-4 py-16" ref={ref}>
        <motion.div
          key="header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Follow these steps to combine your cards and create wallets using
            the app:
          </p>
        </motion.div>

        <motion.div
          key="steps-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative grid md:grid-cols-3 gap-8 mt-8"
        >
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 hidden md:block ml-40">
            <motion.div
              key="progress-line"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-primary origin-left"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={`step-${step.number}-${isInView}`}
              variants={itemVariants}
              className="relative"
            >
              {/* Step Number */}
              <motion.div
                key={`number-${step.number}-${isInView}`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 mx-auto relative z-10"
              >
                {step.number}
              </motion.div>

              {/* Card */}
              <motion.div
                key={`card-${step.number}-${isInView}`}
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-3xl shadow-lg border border-border h-full transform-gpu"
              >
                <svg className="">{step.icon}</svg>
                <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Safe Travels Section */}
      <section id="features" className="py-20 ">
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
            <div className="w-full md:w-1/2 px-6 py-5">
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
}

export default Landing;
