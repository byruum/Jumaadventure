import MtKenyaAdVideo from "../components/MtKenyaAdVideo"
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
    img: "/IMG-20260115-WA0016(1).jpg", 
    title: "Wildlife Safari", 
    subtitle: "Masai Mara Adventures", 
    description: "Experience the Great Migration, spot the Big 5, and sleep under African stars with expert guides.",
    type: "image" 
  },
  { 
    img: "/IMG-20260726-WA3768.jpg", 
    title: "Where do you want to go?", 
    subtitle: "", 
    description: "",
    type: "location" 
  },
]

const gallery = [
  "/mt-kenya.jpg",
  "/mount-kenya-day-trip-hike.jpg",
  "/IMG-20260115-WA0016(1).jpg",
  "/maasai-mara-national-reserve (1).jpg",
  "/lake-nakuru-national-park(1).jpg",
  "/Nairobi National Park-Wildlife roaming freely just_.jpg",
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

      <div className="container-page relative flex min-h-[86vh] flex-col justify-center py-24 text-white">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-white/10 hover:bg-white/20 transition"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F97316]">
            <span className="font-serif text-4xl font-bold text-white leading-none">J</span>
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-4xl font-medium text-[#2C1B0F] leading-tight">
              Juma Adventures
            </h2>
            <p className="font-serif text-xs md:text-base text-[#B8860B] tracking-wide">
              Authentic Safari & Wildlife Experiences
            </p>
          </div>
        </Link>

        <span className="eyebrow text-white/80">KENYA • EAST AFRICA</span>
        
        <motion.h1
          key={heroIndex + "title"}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
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
            className="mt-6 max-w-xl text-lg text-white/85"
          >
            {heroSlides[heroIndex].description}
          </motion.p>
        )}
        
        <div className="mt-8 flex gap-3">
          <Link to="/packages" className="btn-primary">Explore Tours</Link>
          <Link to="/contact" className="btn-outline">Book Your Adventure</Link>
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

        <div className="mt-14 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/20 pt-6 text-white/90">
          <div>
            <div className="font-display text-3xl font-bold">10+</div>
            <div className="text-xs uppercase tracking-wider opacity-70">Years guiding</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold">15+</div>
            <div className="text-xs uppercase tracking-wider opacity-70">Destinations</div>
          </div>
          <div>
            <div className="font-display text-3xl font-bold">500+</div>
            <div className="text-xs uppercase tracking-wider opacity-70">Happy guests</div>
          </div>
        </div>
      </div>
    </section>

    {/* VIDEO AD - LIVE */}
    <section className="bg-black py-8">
      <div className="container-page">
        <MtKenyaAdVideo />
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

      {/* Paste your other sections here: destinations, about, included, reviews, gallery, booking */}
      
    </>
  );
}
