"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface CardProps {
  frontImage: string
  backMessage: string
}

const cards: CardProps[] = [
  {
    frontImage: "/image1.jpeg?height=300&width=300",
    backMessage: "Cada día a tu lado es un regalo que atesoro con todo mi corazón.",
  },
  {
    frontImage: "/image2.jpeg?height=300&width=300",
    backMessage: "Tu sonrisa ilumina mi mundo más que todas las estrellas del cielo.",
  },
  {
    frontImage: "/image3.jpeg?height=300&width=300",
    backMessage: "Quisiera darte todo pero a veces no me es posible, aun así intento siempre demostrarlo.",
  },
  {
    frontImage: "/image4.jpeg?height=300&width=300",
    backMessage: "Contigo, cada momento se convierte en un recuerdo hermoso.",
  },
  {
    frontImage: "/image5.jpeg?height=300&width=300",
    backMessage: "Mi amor por ti crece cada día, como esta flor que nunca se marchitará.",
  },
  {
    frontImage: "/image6.jpeg?height=300&width=300",
    backMessage: "Eres la melodía más hermosa en la sinfonía de mi vida.",
  },
]

function FlipCard({ frontImage, backMessage }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full h-64 cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-yellow-200 rounded-xl shadow-lg flex items-center justify-center p-4">
          <div className="w-full h-full rounded-lg overflow-hidden bg-yellow-100 flex items-center justify-center">
            <img src={frontImage || "/placeholder.svg"} alt="Yellow flower" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-amber-100 rounded-xl shadow-lg flex items-center justify-center p-6 rotate-y-180">
          <p className="text-center text-amber-800 font-medium text-lg">{backMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default function FlipCards() {
  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-amber-800 text-center mb-8">Mensajes Para Ti</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FlipCard frontImage={card.frontImage} backMessage={card.backMessage} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

