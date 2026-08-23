import { Link } from "@tanstack/react-router"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const reviews = [
  "⭐⭐⭐⭐⭐ Dennis was amazing! Summit unforgettable! - Sarah",
  "🔥 MT KENYA DAY HIKE - 100% Recommended",
  "✅ Guide Dennis Juma - Safety First",
  "🏔️ Best day hike in Kenya! - James K.",
]

export default function MtKenyaAdVideo() {
  const [i, setI] = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % reviews.length), 3000)
    return () => clearInterval(t)
  }, [])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted =!muted
      setMuted(!muted)
    }
  }

  return (
    <section className="w-full bg-black">
      {/* DESKTOP: full width 16:9, PHONE: 9:16 */}
      <div className="relative w-full aspect-[9/16] md:aspect-video md:max-h-[600px] overflow-hidden bg-black">

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          src="/videos/VID-20260819-WA0016.mov"
        />

        {/* TOP TICKER */}
        <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-[11px] md:text-sm font-black py-1.5 overflow-hidden whitespace-nowrap z-10">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • 5 STAR • BOOK TODAY • </span>
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • 5 STAR • BOOK TODAY • </span>
          </motion.div>
        </div>

        {/* MUTE / UNMUTE BUTTON */}
        <button
          onClick={toggleSound}
          className="absolute top-10 right-3 z-20 bg-black/60 backdrop-blur text-white p-2.5 rounded-full border border-white/20"
        >
          {muted? "🔇" : "🔊"}
        </button>

        {/* FLOATING LYRIC */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 pointer-events-none z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white text-sm md:text-2xl font-bold bg-black/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20"
            >
              {reviews[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BOTTOM CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
          <div className="flex items-center justify-between">
            <p className="text-white font-bold text-xs md:text-lg">Mt Kenya Live Guest Review</p>
            <Link to="/" className="bg-emerald-500 text-white text-xs md:text-sm font-black px-5 py-2.5 rounded-full">
              Book Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
