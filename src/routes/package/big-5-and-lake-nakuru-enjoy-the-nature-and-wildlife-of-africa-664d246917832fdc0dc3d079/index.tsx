export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO same as masai-mara */}
      <div className="relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1920"
          alt="Big 5 and Lake Nakuru"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 rounded-[12px] bg-orange-500 px-4 py-2 text-white font-bold text-[11px] tracking-widest">
          EXPLORE
        </div>
      </div>

      <div className="p-5 max-w-3xl mx-auto">
        <h1 className="text-[22px] font-bold leading-tight">
          Big 5 and Lake Nakuru — Enjoy The Nature and Wildlife of Africa
        </h1>
        <p className="text-[12px] text-black/50 mt-1">
          Nairobi • 4 Days / 3 Nights • Private Tour for 1-2 people • Same format as Masai Mara
        </p>

        {/* ITINERARY — same component as masai-mara */}
        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border p-4">
            <p className="text-[10px] font-bold text-orange-500">DAY ONE</p>
            <p className="font-semibold text-sm">Nairobi to Lake Nakuru</p>
            <p className="text-[12px] text-black/60 mt-1">Pickup Embakasi. Rift Valley viewpoint. Lunch + first game drive. Overnight Hotel Waterbuck.</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-[10px] font-bold text-orange-500">DAY TWO</p>
            <p className="font-semibold text-sm">Full day Lake Nakuru</p>
            <p className="text-[12px] text-black/60 mt-1">Big 5: white rhinos, lions, buffalo, giraffe. Overnight Hotel Waterbuck.</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-[10px] font-bold text-orange-500">DAY THREE</p>
            <p className="font-semibold text-sm">Lake Naivasha</p>
            <p className="text-[12px] text-black/60 mt-1">Lake & 3km island park. Overnight Alphas Homestay.</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-[10px] font-bold text-orange-500">DAY FOUR</p>
            <p className="font-semibold text-sm">Hells Gate & Nairobi</p>
            <p className="text-[12px] text-black/60 mt-1">Gorge, hiking, bicycle, Fishers Tower. Drive back to Nairobi.</p>
          </div>
        </div>

        {/* PAYMENT — CORRECTED */}
        <div className="mt-6 rounded-2xl border p-4 text-[12px]">
          <p className="font-bold">Booking Details — Same as Masai Mara</p>
          <p className="mt-2">Price: $850 private tour</p>
          <p>Deposit: $100</p>
          <p className="mt-2"><b>PayPal (valid):</b> jumaadventuresandsafaris@gmail.com</p>
          <p><b>M-Pesa Paybill:</b> Coming Soon</p>
          <p className="mt-2 text-[11px] text-black/50">Transport: Private Land Cruiser pop-up roof • Guide: Dennis Juma 14 yrs licensed • 06:00-18:00 EAT</p>
        </div>

        <a href="https://wa.me/254746011254" className="mt-6 block rounded-2xl bg-orange-500 text-center py-4 text-white font-bold">
          BOOK NOW $850 — PayPal
        </a>

        <p className="text-[10px] text-center mt-3 text-black/50">
          Contact: +254 746 011254 • jumaadventuresandsafaris@gmail.com<br/>
          After booking — Juma Adventures will respond shortly<br/>
          <a href="/cancellation-policy" className="underline">Cancellation Policy</a>
        </p>
      </div>
    </div>
  )
      }
