"use client"

import { useState } from "react"
import FlowerAnimation from "@/components/flower-animation"
import FlipCards from "@/components/flip-cards"
import { motion } from "framer-motion"

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false)

  // Ya no necesitamos el useEffect con timer aquí, ya que la animación
  // se maneja dentro del componente FlowerAnimation

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-amber-800 mb-4">Para Mi Amor</h1>
          <p className="text-lg md:text-xl text-amber-700">Con todo mi cariño, esta flor amarilla para ti</p>
        </motion.div>

        <div className="w-full max-w-md mb-12">
          <FlowerAnimation onComplete={() => setAnimationComplete(true)} />
        </div>

        {animationComplete && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <FlipCards />
          </motion.div>
        )}
      </div>
    </main>
  )
}

