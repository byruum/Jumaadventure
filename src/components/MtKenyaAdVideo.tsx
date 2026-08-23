import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lyrics = [
  "Taking a moment to breathe and re-energize for the next climb...",
  "My client paused to take in this view — our best encounter yet.",
  "Want to experience this feeling yourself?",
  "Look no further. Explore packages or Book Now to start your journey.",
]

export default function MtKenyaAdVideo() {
  const [i, setI] = useState(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % lyrics.length), 4000)
    return () => clearInterval(t)
  }, [])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted =!muted
      setMuted(!muted)
    }
  }

  const goBook = () => {
    window.location.href = "/packages"
  }

  return (
    <section className="w-full bg-black">
      <div className="relative w-full aspect-[9/16] md:aspect-video md:max-h-[600px] overflow-hidden bg-black">

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay muted={muted} loop playsInline preload="metadata"
          src="/videos/VID-20260819-WA0016.mov"
        />

        {/* TOP TICKER */}
        <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-black text-[11px] md:text-sm font-black py-1.5 overflow-hidden whitespace-nowrap z-10">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • BREATHE • RE-ENERGIZE • BOOK TODAY • </span>
            <span className="pr-8">🔥 MT KENYA DAY HIKE • GUIDE DENNIS JUMA • BREATHE • RE-ENERGIZE • BOOK TODAY • </span>
          </motion.div>
        </div>

        {/* SOUND BUTTON */}
        <button
          onClick={toggleSound}
          className="absolute top-10 right-3 z-20 bg-black/60 backdrop-blur text-white p-2.5 rounded-full border border-white/20 cursor-pointer"
        >
          {muted? "🔇" : "🔊"}
        </button>

        {/* HUMANIZED FLOATING LYRICS */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white text-[14px] md:text-2xl font-medium leading-relaxed bg-black/50 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 shadow-xl"
            >
              {lyrics[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* FIXED BOOK NOW - NOW WORKS */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent z-20">
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-[10px] md:text-sm">Mt Kenya with Dennis Juma</p>
            <button
              onClick={goBook}
              className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs md:text-sm font-black px-6 py-2.5 rounded-full cursor-pointer pointer-events-auto"
            >
              Book Now →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
