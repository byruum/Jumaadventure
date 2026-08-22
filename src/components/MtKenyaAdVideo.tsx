import { Link } from "@tanstack/react-router";

export default function MtKenyaAdVideo() {
  return (
    <section className="w-full bg-black py-0">
      <div className="relative w-full max-w-[480px] md:max-w-5xl mx-auto
                      aspect-[9/16] md:aspect-video
                      overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          poster="/mt-kenya.jpg"
          src="/videos/VID-20260119-WA0016.mov"
        />

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-bold text-sm md:text-2xl">
            Mt Kenya Day Hike — Guest Review — Juma Adventures — Guide Dennis Juma
          </h3>
          <Link
            to="/packages"
            className="inline-block mt-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full"
          >
            Book This Hike
          </Link>
        </div>
      </div>
    </section>
  );
}
