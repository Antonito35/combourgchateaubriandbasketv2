"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function BouncingBasketball() {
  const [isPlaying, setIsPlaying] = useState(true)

  // Reset animation when clicked
  const handleClick = () => {
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 10)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgb(42, 67, 99)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Loading text with animation */}
        <motion.div
          className="text-center relative z-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chargement
          </motion.h2>
          <motion.p
            className="text-orange-400 text-lg sm:text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            Combourg Châteaubriand Basket
          </motion.p>
        </motion.div>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-orange-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Basketball animation */}
        {isPlaying && (
          <motion.div
            className="relative z-20"
            animate={{
              y: [0, 120, 0, 95, 0, 70, 0, 50, 0, 30, 0, 15, 0],
            }}
            transition={{
              duration: 3.5,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
            onClick={handleClick}
          >
            <motion.div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer relative overflow-hidden shadow-2xl"
              animate={{
                scaleY: [1, 0.75, 1, 0.82, 1, 0.88, 1, 0.93, 1, 0.97, 1, 0.99, 1],
                scaleX: [1, 1.15, 1, 1.1, 1, 1.06, 1, 1.03, 1, 1.01, 1, 1.005, 1],
                rotate: [0, 0, 180, 180, 360, 360, 540, 540, 720, 720, 900, 900, 1080],
              }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            >
              {/* Basketball with realistic gradient and lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 220">
                <defs>
                  {/* Dégradé radial pour le volume */}
                  <radialGradient id="basketballGradient" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#ffd199" />
                    <stop offset="40%" stopColor="#ff7a00" />
                    <stop offset="100%" stopColor="#cc5500" />
                  </radialGradient>
                </defs>
                
                {/* Ballon avec dégradé */}
                <circle cx="110" cy="110" r="110" fill="url(#basketballGradient)"/>
                
                {/* Ligne verticale centrale */}
                <line x1="110" y1="0" x2="110" y2="220" stroke="black" strokeWidth="3" opacity="0.8"/>
                
                {/* Ligne horizontale centrale */}
                <line x1="0" y1="110" x2="220" y2="110" stroke="black" strokeWidth="3" opacity="0.8"/>
                
                {/* Courbe latérale gauche */}
                <path d="M 55 0 A 110 110 0 0 0 55 220" fill="none" stroke="black" strokeWidth="3" opacity="0.8"/>
                
                {/* Courbe latérale droite */}
                <path d="M 165 0 A 110 110 0 0 1 165 220" fill="none" stroke="black" strokeWidth="3" opacity="0.8"/>
                
                {/* Reflet réaliste (ellipse) */}
                <ellipse 
                  cx="65" 
                  cy="65" 
                  rx="18" 
                  ry="12" 
                  fill="rgba(255,255,255,0.4)" 
                  transform="rotate(-30 65 65)"
                />
              </svg>
            </motion.div>

            {/* Shadow */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-black opacity-30 rounded-full blur-md"
              animate={{
                scale: [1, 0.3, 1, 0.4, 1, 0.5, 1, 0.6, 1, 0.7, 1, 0.8, 1],
                opacity: [0.3, 0.1, 0.3, 0.12, 0.3, 0.15, 0.3, 0.18, 0.3, 0.2, 0.3, 0.25, 0.3],
              }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 1],
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            />
          </motion.div>
        )}

        {/* Progress bar */}
        <motion.div
          className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden relative z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl" />
    </div>
  )
}

