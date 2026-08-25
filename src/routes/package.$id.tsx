import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current, setCurrent] = useState(0);
  const [daySlide, setDaySlide] = useState(0);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  const fallbackMara = [
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920",
  ];
  const rawGallery = packageData?.gallery?? fallbackMara;
  const validGallery = rawGallery.map((g: string) => g.includes("masai-mara-1") || g.includes("masai-mara-2")? fallbackMara[0] : g);

  useEffect(() => {
    const t = globalThis.setInterval(() => setCurrent((p: number) => (p + 1) % validGallery.length), 5000);
    return () => globalThis.clearInterval(t);
  }, [validGallery.length]);

  if (!packageData) return <div className="p-8 text-center">Not found</div>;

  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "PENDING";
  const paybillAcc = "MASAI MARA";
  const paybillName = "MASAI MARA";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD`;

  const days = [
    {
      day: "DAY 1",
      title: "Nairobi to Masai Mara",
      story: "We pick you early from your hotel or JKIA and you start your journey in our 4x4 Land Cruiser with open roof. The drive through the Great Rift Valley is scenic and you stop for photos. By afternoon you are inside Masai Mara. Animals start to appear before you reach the camp. You have an evening game drive then dinner and rest at your camp under stars. This is your first night in the wild.",
      include: "4x4 Land Cruiser, professional guide, park entry, lunch and dinner, camp stay"
    },
    {
      day: "DAY 2",
      title: "Full Day in Masai Mara",
      story: "This is the day you came for. We leave early at sunrise when lions and cheetahs are active. Our guide knows the best areas for Big Five and we track them all day. Between July and October you see the great migration crossing at Mara River. We stop for picnic lunch near the river with hippos nearby. You can also visit a Masai village if you wish. A full day in Mara that you will remember for long.",
      include: "Full day in 4x4 Land Cruiser, park fees, picnic lunch, bottled water, guide"
    },
    {
      day: "DAY 3",
      title: "Masai Mara to Nairobi",
      story: "Last sunrise in Mara. We go for an early drive while light is still golden. This is good time for photos and last sightings. We return to camp for breakfast then start the drive back to Nairobi with game viewing on the way out. We drop you at JKIA or your hotel around five in the evening. You leave Mara with great memories and many photos.",
      include: "Sunrise game drive, breakfast, return drive, lunch en route, airport drop"
    }
  ];

  const handleExplore = () => {
    setShowItinerary(true);
    globalThis.setTimeout(() => itineraryRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* HOME SECTION - EXACT LIKE SCREENSHOT */}
      <div className="relative h-[92vh] bg-black overflow-hidden">
        {validGallery.map((img: string, i: number) => (
          <img key={i} src={img} alt="Masai Mara" onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackMara[0] }} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${i === current? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5B400] font-black tracking-[0.35em] text-[12px] md:text-[13px]">MASAI MARA NATIONAL RESERVE</p>
          <h1 className="mt-4 text-white font-black leading-[0.9] text-[42px] md:text-[68px]">
            Masai Mara Safari<br /><span className="text-[#F5B400]">That Changes You</span>
          </h1>
          <div className="mt-5 bg-[#0B6A2B] px-6 py-2.5 rounded-full">
            <p className="text-white font-bold text-[14px] md:text-[15px]">Kenya's most iconic wildlife destination</p>
          </div>
          <button onClick={handleExplore} className="mt-8 w-full max-w-[340px] md:max-w-[360px] bg-white text-black py-4 rounded-full font-black text-[15px] tracking-wide">EXPLORE ITINERARY ↓</button>
          <button onClick={() => setShowBooking(true)} className="mt-4 w-full max-w-[340px] md:max-w-[360px] bg-[#F66E0D] text-white py-4 rounded-full font-black text-[15px]">BOOK NOW — USD {full}</button>
          <p className="mt-4 text-white/70 text-[11px] md:text-[12px] max-w-[360px]">Deposit ${dep} secures slot • Paybill {paybillNo} • {paybillName}</p>
        </div>
      </div>

      {/* ITINERARIES - GATE KEPT BY EXPLORE, SWIPE HAND + CLICK DESKTOP */}
      {showItinerary && (
        <div ref={itineraryRef} className="max-w-[1120px] mx-auto px-5 md:px-10 py-14">
          <div className="text-center">
            <p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">YOUR 3 DAY JOURNEY</p>
            <h2 className="mt-3 text-[28px] md:text-[40px] font-black leading-[0.95]">Experience Masai Mara<br />day by day</h2>
          </div>

          <div className="mt-8 relative">
            {/* Desktop clickers */}
            <button onClick={() => setDaySlide((p) => Math.max(0, p - 1))} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black text-white items-center justify-center font-black">‹</button>
            <button onClick={() => setDaySlide((p) => Math.min(days.length - 1, p + 1))} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black text-white items-center justify-center font-black">›</button>

            <div className="overflow-hidden rounded-[24px] bg-white border border-black/5"
              onTouchStart={(e) => touchStart.current = e.touches[0].clientX}
              onTouchEnd={(e) => {
                const diff = touchStart.current - e.changedTouches[0].clientX;
                if (diff > 50) setDaySlide((p) => Math.min(days.length - 1, p + 1));
                if (diff < -50) setDaySlide((p) => Math.max(0, p - 1));
              }}
            >
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${daySlide * 100}%)` }}>
                {days.map((d, idx) => (
                  <div key={idx} className="min-w-full p-7 md:p-10">
                    <p className="text-[#F66E0D] font-black text-[11px] tracking-widest">{d.day}</p>
                    <h3 className="mt-2 text-[22px] md:text-[28px] font-black tracking-tight">{d.title}</h3>
                    <p className="mt-4 text-[14px] md:text-[15px] leading-7 text-black/65 font-light">{d.story}</p>
                    <div className="mt-6 bg-[#FAF7F2] rounded-2xl p-4 border border-black/5">
                      <p className="text-[10px] font-black tracking-widest text-black/30">INCLUDED IN {d.day}</p>
                      <p className="mt-1 text-[13px] text-black/70 leading-5">{d.include}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-center items-center gap-3">
              <span className="text-[12px] font-black text-black/30">Swipe to see next</span>
              <div className="flex gap-2">
                {days.map((_, i) => (
                  <button key={i} onClick={() => setDaySlide(i)} className={`h-2 rounded-full transition-all ${i === daySlide? 'w-8 bg-black' : 'w-2 bg-black/20'}`} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
              <button onClick={() => setDaySlide((p) => Math.max(0, p - 1))} className="md:hidden border border-black/10 bg-white rounded-full py-3 font-black text-sm">← Previous</button>
              <button onClick={() => setDaySlide((p) => Math.min(days.length - 1, p + 1))} className="md:hidden bg-black text-white rounded-full py-3 font-black text-sm">Next →</button>
            </div>

            <div className="mt-10 bg-black rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="text-white font-black">Ready to secure this trip?</h4>
                <p className="text-white/50 text-[13px] mt-1">Deposit ${dep} books your 4x4 Land Cruiser and camp.</p>
              </div>
              <button onClick={() => setShowBooking(true)} className="bg-[#F66E0D] text-white px-8 py-4 rounded-full font-black text-sm">BOOK NOW — USD {full}</button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/80 z-[100] p-4 overflow-y-auto flex justify-center">
          <div className="bg-white w-full max-w-[760px] rounded-[28px] overflow-hidden my-10">
            <div className="bg-black text-white p-8">
              <div className="flex justify-between gap-6">
                <div>
                  <p className="text-[#F5B400] font-black text-[10px] tracking-[0.4em]">PAY NOW</p>
                  <h3 className="mt-2 text-[24px] font-black">Secure your safari today</h3>
                  <p className="mt-2 text-white/50 text-[13px] max-w-[420px]">By paying deposit now you enable us to plan your safari well. We reserve your 4x4 Land Cruiser and camp. You are rest assured.</p>
                </div>
                <button onClick={() => setShowBooking(false)} className="w-9 h-9 bg-white/10 rounded-full">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-7">
                <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black py-4 rounded-full font-black text-center text-[13px]">PayPal ${dep}</a>
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-white text-black py-4 rounded-full font-black text-center text-[13px]">PayPal ${full}</a>
              </div>
              <div className="mt-4 bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                <p className="text-[11px] font-black tracking-widest text-white/40">M-PESA ACCOUNT NAME</p>
                <p className="mt-2 text-[15px]">Paybill <b className="text-[#F5B400] text-xl">{paybillNo}</b></p>
                <p className="text-[14px] mt-1">Account No: <b className="text-white">{paybillAcc}</b></p>
                <p className="text-[14px]">Account Name: <b className="text-[#F5B400]">{paybillName}</b></p>
                <p className="text-[11px] text-white/40 mt-2">Enter MASAI MARA as account name when paying.</p>
              </div>
            </div>
            <div className="p-8 grid md:grid-cols-[1.1fr_0.9fr] gap-10">
              <form onSubmit={(e) => { e.preventDefault(); globalThis.alert("Booking sent"); setShowBooking(false); }} className="space-y-3">
                <h4 className="font-black">Booking form</h4>
                <input required placeholder="Full name" className="w-full border rounded-full px-5 py-3 text-sm" />
                <input required type="email" placeholder="Email" className="w-full border rounded-full px-5 py-3 text-sm" />
                <input required placeholder="WhatsApp" className="w-full border rounded-full px-5 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="date" className="w-full border rounded-full px-5 py-3 text-sm" />
                  <input required type="number" min={1} placeholder="Guests" className="w-full border rounded-full px-5 py-3 text-sm" />
                </div>
                <button className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black text-sm">SEND BOOKING</button>
              </form>
              <div className="bg-[#FAF7F2] rounded-2xl p-6 border">
                <h5 className="font-black text-sm">Payment and return policy</h5>
                <div className="mt-3 text-[12px] leading-6 text-black/60 space-y-3">
                  <p><b className="text-black">Deposit:</b> Paying deposit ${dep} enables us to plan your wonderful safari.</p>
                  <p><b className="text-black">Account Name:</b> MASAI MARA - enter exactly as shown on M-Pesa.</p>
                  <p><b className="text-black">Refund:</b> Full 14 days before, half 7 to 13 days, no refund within 7 days.</p>
                  <p className="text-red-600"><b>Cancellation cost:</b> Once booked and confirmed, cancellation will attract cost to cover park fees and camp we already paid for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
