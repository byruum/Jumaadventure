import { Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const reviews = [
  "⭐⭐⭐⭐⭐ \"Dennis was amazing guide! Summit day was unforgettable!\" - Sarah M.",
  "🔥 Mt Kenya Day Hike — 100% Guest Recommended — Juma Adventures",
  "✅ Professional Guide Dennis Juma — Safety First — Book Now",
  "🏔️ \"Best day hike in Kenya! Worth every shilling\" - James K.",
]

const topTicker = "🔥 LIMITED SLOTS • MT KENYA DAY HIKE • GUIDE DENNIS JUMA • 5-STAR REVIEWS • BOOK TODAY • "

export default function MtKenyaAdVideo() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % reviews.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="w-full bg-black flex justify-center">
      <div className="relative w-full max-w-[420px] md:max-w-4xl aspect-[9/16] md:aspect-video overflow-hidden bg-black rounded-none md:rounded-2xl">

        {/* VIDEO */}
        <video
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline controls preload="metadata"
          src="/videos/VID-20260119-WA0016.mov"
        />

        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />

        {/* TOP RUNNING TICKER */}
        <div className="absolute top-0 left-0 right-0 bg-[#10b981] text-black text-[11px] md:text-xs font-black py-1.5 overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <span className="pr-8">{topTicker}{topTicker}{topTicker}</span>
            <span className="pr-8">{topTicker}{topTicker}{topTicker}</span>
          </motion.div>
        </div>

        {/* FLOATING CHANGING REVIEW - MIDDLE */}
        <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white text-sm md:text-xl font-bold leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10"
            >
              {reviews[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BOTTOM CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-white font-bold text-[13px] md:text-lg leading-tight">Mt Kenya Day Hike — Live Guest Review</p>
              <p className="text-white/70 text-[11px] md:text-sm">Guide Dennis Juma • Juma Adventures</p>
            </div>
            <Link to="/" className="shrink-0 inline-flex rounded-full bg-[#10b981] hover:bg-emerald-600 px-5 py-2.5 text-xs md:text-sm font-black text-white shadow-lg animate-pulse">
              Book Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
