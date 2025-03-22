"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FlowerAnimationProps {
  onComplete: () => void
}

export default function FlowerAnimation({ onComplete }: FlowerAnimationProps) {
  const [petalsVisible, setPetalsVisible] = useState(0)
  const [animationCycle, setAnimationCycle] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const totalPetals = 12

  useEffect(() => {
    if (!isAnimating) return

    let currentPetal = 0
    setPetalsVisible(0)

    const interval = setInterval(() => {
      currentPetal += 1
      setPetalsVisible(currentPetal)

      if (currentPetal >= totalPetals) {
        clearInterval(interval)

        // Notificar que la animación está completa
        onComplete()

        // Esperar 5 segundos y luego reiniciar la animación
        setTimeout(() => {
          setIsAnimating(false)

          // Pequeña pausa antes de reiniciar
          setTimeout(() => {
            setAnimationCycle((prev) => prev + 1)
            setIsAnimating(true)
          }, 300)
        }, 5000)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [onComplete, isAnimating, animationCycle])

  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      <AnimatePresence>
        {isAnimating && (
          <>
            {/* Flower center */}
            <motion.div
              key={`center-${animationCycle}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.8 }}
              className="absolute w-20 h-20 rounded-full bg-amber-600 z-10"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Petals */}
            {Array.from({ length: totalPetals }).map((_, index) => {
              const angle = index * 30 * (Math.PI / 180) // 360° / 12 = 30°
              const radius = 50 // Ajusta el "radio"
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <motion.div
                  key={`petal-${index}-${animationCycle}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={index < petalsVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transformOrigin: "center",
                    transform: `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`,
                  }}
                  className="w-20 h-20 bg-yellow-300 rounded-full z-0"
                />
              )
            })}

            {/* Stem */}
            <motion.div
              key={`stem-${animationCycle}`}
              initial={{ height: 0 }}
              animate={{ height: 200 }}
              exit={{ height: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute w-5 bg-green-600 rounded-full"
              style={{
                top: "calc(50% + 10px)",
                left: "59%",
                transform: "translateX(-50%)",
                transformOrigin: "top",
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

