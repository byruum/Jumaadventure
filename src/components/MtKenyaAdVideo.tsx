import { Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const reviews = [
  "⭐⭐⭐⭐⭐ Dennis was amazing! Summit unforgettable! - Sarah",
  "🔥 MT KENYA DAY HIKE - 100% Recommended - Juma Adventures",
  "✅ Guide Dennis Juma - Safety First - Book Now!",
  "🏔️ Best day hike in Kenya! Worth it - James K.",
]

export default function MtKenyaAdVideo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % reviews.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="w-full bg-black flex justify-center">
      <div className="relative w-full max-w-[420px] aspect-[9/16] overflow-hidden bg-black">

        {/* YOUR SAME VIDEO - NO RENAME */}
        <video
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline controls preload="metadata"
          src="/videos/VID-20260819-WA0016.mov"
        >
          <source src="/videos/VID-20260819-WA0016.mov" type="video/quicktime" />
        </video>

        {/* TOP RUNNING AD */}
        <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-[11px] font-black py-1 overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • 5 STAR REVIEWS • BOOK TODAY • </span>
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • 5 STAR REVIEWS • BOOK TODAY • </span>
          </motion.div>
        </div>

        {/* FLOATING LYRIC IN MIDDLE - CHANGES EVERY 3 SEC */}
        <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white text-[13px] font-bold bg-black/50 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/20"
            >
              {reviews[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BOTTOM CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-[11px] font-bold">Mt Kenya Live Guest Review</p>
          <Link to="/" className="mt-1 inline-flex bg-emerald-500 text-white text-xs font-black px-4 py-2 rounded-full">
            Book Now →
          </Link>
        </div>

      </div>
    </section>
  );
}
