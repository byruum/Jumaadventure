import { Link } from "react-router-dom";

/**
 * MtKenyaAdVideo - FIXED for vertical phone video
 */
export default function MtKenyaAdVideo() {
  return (
    <section className="relative w-full flex justify-center bg-black rounded-2xl overflow-hidden">
      {/* Vertical container - no more black bars */}
      <div className="relative w-full max-w-[480px] aspect-[9/16] max-h-[80vh]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/VID-20260819-WA0016.mov"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster="/images/mt-kenya-ad.jpg"
        >
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Overlay content */}
        <div className="absolute inset-x-0 bottom-12 flex flex-col gap-3 p-4 sm:p-6">
          <p className="max-w-xl text-sm font-medium leading-snug text-white drop-shadow-md sm:text-base">
            Mt Kenya Day Hike — Guest Review — Juma Adventures — Guide Dennis Juma
          </p>

          <Link
            to="/tours/mt-kenya"
            className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600"
          >
            Book This Hike
          </Link>
        </div>
      </div>
    </section>
  );
}
