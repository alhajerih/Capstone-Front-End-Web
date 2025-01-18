"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CardShowcase = () => {
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

  return (
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
          className="w-48 h-32"
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
          className="w-48 h-32"
        >
          <Image
            src="/Nomo1.png"
            alt="Nomo Card"
            width={192}
            height={128}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Additional cards... */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          animate={{
            ...slideAnimation,
            transition: { ...slideAnimation.transition, delay: 0.2 },
          }}
          className="w-48 h-32"
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
          className="w-48 h-32"
        >
          <Image
            src="/PremiummasterCard.png"
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
          className="w-48 h-32"
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

          {/* App Interface */}
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
  );
};

export default CardShowcase;
