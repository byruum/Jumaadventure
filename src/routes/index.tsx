import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { packages } from "../lib/packages";

export const Route = createFileRoute("/")({
  component: Index,
});

const heroSlides = [
  {
    img: "/hero-safari.png",
    title: "Discover Kenya",
    subtitle: "like never before",
    description: "Unforgettable safari adventures, breathtaking landscapes and authentic cultural experiences. Guided by Dennis Juma & other trained, licensed professional guides.",
    type: "image"
  },
  {
    img: "/IMG-20260827-WA1621.jpg",
    title: "Wildlife Safari",
    subtitle: "Masai Mara Adventures",
    description: "Experience the Great Migration, spot the Big 5, and sleep under African stars with expert guides.",
    type: "image"
  },
  {
    img: "/IMG-20260827-WA4703.jpg",
    title: "Where do you want to go?",
    subtitle: "",
    description: "",
    type: "location"
  },
]

const gallery = [
  "/IMG-20260827-WA1621.jpg",
  "/IMG-20260827-WA7107.jpg",
  "/IMG-20260827-WA4703.jpg",
  "/IMG-20260827-WA0302.jpg",
  "/IMG-20260827-WA3138.jpg",
  "/IMG-20260827-WA8769.jpg",
  "/IMG-20260827-WA6138.jpg",
  "/IMG-20260827-WA7065.jpg",
  "/IMG-20260827-WA9899.jpg",
  "/IMG-20260827-WA2489.jpg",
  "/IMG-20260827-WA3807.jpg",
  "/IMG-20260827-WA5967.jpg"
];

const reviews = [
  { name: "Sarah M.", text: "Amazing safari and very professional guide. Dennis knew every corner of the Mara." },
  { name: "James K.", text: "Highly recommend Juma Adventures — well organized from pickup to drop-off." },
  { name: "Daniel R.", text: "The best experience I've had in Kenya. Beautifully planned trip." },
];

function Index() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const locations = ["All",...Array.from(new Set(packages.map(p => p.from).filter(Boolean)))];
  const filteredPackages = selectedLocation === "All"? packages : packages.filter(p => p.from === selectedLocation);
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="relative isolate overflow-hidden">
        {heroSlides[heroIndex].type === "image"? (
          <AnimatePresence mode="wait">
            <motion.img
              key={heroIndex}
              src={heroSlides[heroIndex].img}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              alt="Safari"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 flex items-center justify-center"
          >
            <img src={heroSlides[heroIndex].img} alt="Juma Logo Watermark" className="absolute w-[400px] md:w-[600px] opacity-10 object-contain" />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      <div className="container-page relative flex min-h-[75vh] md:min-h-[86vh] flex-col justify-center py-16 md:py-24 text-white">

        {/* REMOVED DOUBLE LOGO CARD - you already have it in header */}

        <span className="eyebrow text-white/80 text-[11px] md:text-sm tracking-[0.2em]">KENYA • EAST AFRICA</span>

        <motion.h1
          key={heroIndex + "title"}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-3 max-w-3xl text-[36px] leading-[1.0] sm:text-[42px] md:text-[56px] lg:text-[64px] font-bold font-['Playfair_Display']"
        >
          {heroSlides[heroIndex].title}<br />
          {heroSlides[heroIndex].subtitle && <span className="text-[#F97316]">{heroSlides[heroIndex].subtitle}</span>}
        </motion.h1>

        {heroSlides[heroIndex].description && (
          <motion.p
            key={heroIndex + "desc"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 max-w-xl text-[15px] md:text-lg text-white/85 leading-relaxed"
          >
            {heroSlides[heroIndex].description}
          </motion.p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/packages" className="btn-primary text-sm px-6 py-3">Explore Tours</Link>
          <Link to="/contact" className="btn-outline text-sm px-6 py-3">Book Your Adventure</Link>
        </div>

        {heroSlides[heroIndex].type === "location" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8"
          >
            <div className="flex flex-wrap gap-3">
              {locations.map((loc, index) => (
                <motion.button
                  key={loc}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedLocation(loc);
                    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-5 py-2.5 rounded-full backdrop-blur-md border transition-all ${
                    selectedLocation === loc
             ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-500/30"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {loc}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/20 pt-5 text-white/90">
          <div>
            <div className="font-display text-2xl md:text-3xl font-bold">10+</div>
            <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Years guiding</div>
          </div>
          <div>
            <div className="font-display text-2xl md:text-3xl font-bold">15+</div>
            <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Destinations</div>
          </div>
          <div>
            <div className="font-display text-2xl md:text-3xl font-bold">500+</div>
            <div className="text-[10px] md:text-xs uppercase tracking-wider opacity-70">Happy guests</div>
          </div>
        </div>
      </div>
    </section>

      <section className="border-b border-border bg-background">
        <div className="container-page py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {packages.slice(0, 5).map((p) => (
              <Link key={p.id} to="/package/$id" params={{ id: p.id }} className="rounded-full border-border bg-card px-4 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
