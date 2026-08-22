import { Link } from "@tanstack/react-router"

export default function MtKenyaAdVideo() {
  return (
    <section className="w-full flex justify-center bg-black">
      {/* No black bars — vertical on phone */}
      <div className="relative w-full max-w-[420px] md:max-w-4xl aspect-[9/16] md:aspect-video overflow-hidden bg-black">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          // CHANGE THIS TO EXACT NAME YOU UPLOADED
          src="/videos/VID-20260119-WA0016.mov"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-white text-[13px] md:text-lg font-semibold leading-tight">
            Mt Kenya Day Hike — Guest Review — Juma Adventures — Guide Dennis Juma
          </p>
          <Link
            to="/"
            className="inline-flex mt-3 rounded-full bg-[#10b981] px-5 py-2.5 text-xs font-bold text-white"
          >
            Book This Hike
          </Link>
        </div>
      </div>
    </section>
  );
}
