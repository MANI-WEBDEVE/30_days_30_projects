"use client"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react"
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

// Type define Confftie
interface ConfitteType {
  height: number;
  width: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

// Define color arrays for candles, balloons, and confetti
const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

function CelebrateWish() {
  const [candleList, setCandleList] = useState<number>(0);
  const [countPopBalloon, setCountPopBallon] = useState<number>(0);
  const [showConfitte, setShowConfitte] = useState<boolean>(false)
  const [sizeWindow, setSizeWindow] = useState<ConfitteType>({ width: 0, height: 0 })
  const [celebrating, setCelebrating] = useState<boolean>(false)

  //total candels and ballon contant;
  const totalCandles: number = 5;
  const totalBalloon: number = 5

  useEffect(() => {
    const handleResize = () => {
      setSizeWindow({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (candleList === totalCandles && countPopBalloon === totalBalloon) {
      setShowConfitte(true);
    }
  }, [candleList, countPopBalloon]);

  const ligthingCandle = (index: number) => {
    if (index === candleList) {
      setCandleList((prev) => prev + 1)
    }
  }

  const popBalloons = (index: number) => {
    if (index === countPopBalloon) {
      setCountPopBallon((prev) => prev + 1)
    }
  }

  const celebrate = () => {
    setCelebrating(true)
    setShowConfitte(true)

    const interval = setInterval(() => {
      setCandleList(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval);
        return prev
      })
    }, 500)
  }


  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold text-black">Happy 18th Birthday!</CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-700/70">Muhammad Inam</CardDescription>
            <p className="text-lg text-gray-500 font-light">December 12</p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <h3 className="text-lg font-semi-bold text-blackmb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index: any) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candleList) || (!celebrating && index < candleList) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        {/* Lit candle */}
                        <FaBirthdayCake
                          className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{ color: candleColors[index % candleColors.length] }}
                          onClick={() => ligthingCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      // Unlit candle
                      <FaBirthdayCake
                        className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => ligthingCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            {/* Balloons section */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-2">
                {/* Map through balloons */}
                {[...Array(totalBalloon)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < countPopBalloon ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Balloon icon */}
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{ color: index < countPopBalloon ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                      onClick={() => popBalloons(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          {/* Card footer with celebrate button */}
          <CardFooter className="flex justify-center">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {/* Confetti component */}
      {showConfitte && (
        <DynamicConfetti
          width={sizeWindow.width}
          height={sizeWindow.height}
          recycle={false}
          numberOfPieces={900}
          colors={confettiColors}
        />
      )}
    </div>
  )
}

export default CelebrateWish

