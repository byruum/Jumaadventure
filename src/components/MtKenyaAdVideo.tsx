import { Link } from "react-router-dom";

/**
 * MtKenyaAdVideo
 * Autoplaying, muted, looping testimonial ad video for the homepage.
 * Video file expected at: /videos/mt-kenya-ad.mp4 (in the public folder)
 */
export default function MtKenyaAdVideo() {
  return (
    <section className="relative w-full aspect-video max-h-[80vh] overflow-hidden rounded-2xl bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/VID-20260819-WA0016.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:p-6 md:p-8">
        <p className="max-w-xl text-sm font-medium leading-snug text-white drop-shadow-md sm:text-base md:text-lg lg:text-xl">
          Mt Kenya Day Hike &mdash; Guest Review &mdash; Juma Adventures &mdash; Guide Dennis Juma
        </p>

        <Link
          to="/tours/mt-kenya"
          className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black sm:px-6 sm:py-3 sm:text-base"
        >
          Book This Hike
        </Link>
      </div>
    </section>
  );
}
