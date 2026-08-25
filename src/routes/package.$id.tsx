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
  const [showBooking, setShowBooking] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);

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

  const isMara = packageData.id === "masai-mara";
  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "522533";
  const paybillAcc = packageData.paybillAcc || "MARAMARA";
  const paybillName = "JUMA ADVENTURES AND SAFARIS";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD`;

  const days = [
    {
      n: "Day 1",
      title: "Nairobi to Masai Mara",
      story: "We pick you early from your hotel or airport. You ride in our 4x4 Land Cruiser with pop up roof. The road takes you through the Great Rift Valley where you stop for photos. By lunch time you are in Masai Mara. You start seeing animals on the way to camp. Lions resting, elephants walking. In the evening we do a short game drive then you rest at the camp.",
    },
    {
      n: "Day 2",
      title: "Full day in Masai Mara",
      story: "This is the main day. We wake up before sunrise. Coffee then drive. Morning is best time to see cats hunting. We follow the Big Five. If you come between July and October you will see the great migration at Mara River. We have lunch near the river where hippos stay. In the evening you can visit a Masai village if you want. You come back to camp tired but happy.",
    },
    {
      n: "Day 3",
      title: "Mara back to Nairobi",
      story: "Last morning in Mara. We go for sunrise drive. Light is soft and animals are still active. You take last photos. Then we have breakfast and start drive back to Nairobi. You still see animals on the way out. We drop you at your hotel or airport around five in the evening. You leave with a lot of stories to tell back home.",
    }
  ];

  if (!isMara) return <div className="p-8">{packageData.title}</div>;

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* HERO */}
      <div className="relative h-[92vh] bg-black overflow-hidden">
        {validGallery.map((img: string, i: number) => (
          <img key={i} src={img} alt="" onError={(e)=>{(e.currentTarget as HTMLImageElement).src=fallbackMara[0]}} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${i===current?'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[#F5B400] tracking-[0.5em] text-[10px] font-black">KENYA MASAI MARA</p>
          <h1 className="mt-6 font-black text-white leading-[0.85] tracking-tight text-[44px] md:text-[86px]">Masai<br/>Mara</h1>
          <p className="mt-5 text-white/70 text-[15px] max-w-[500px] leading-6 font-light">Three days with private 4x4 Land Cruiser, good guide and real bush experience. No rush.</p>
          <div className="mt-10 flex items-center gap-4">
            <button onClick={()=>itineraryRef.current?.scrollIntoView({behavior:'smooth'})} className="bg-[#F66E0D] text-white px-9 py-[14px] rounded-full font-black text-[13px] tracking-wide">EXPLORE ITINERARY</button>
            <button onClick={()=>setShowBooking(true)} className="bg-white text-black px-9 py-[14px] rounded-full font-black text-[13px]">BOOK USD {full}</button>
          </div>
          <p className="mt-4 text-white/40 text-[11px]">Deposit ${dep} to book • Paybill {paybillNo} • {paybillName}</p>
        </div>
      </div>

      {/* SLIDE ITINERARY UNDER EXPLORE */}
      <div ref={itineraryRef} className="max-w-[1100px] mx-auto px-6 md:px-10 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.4em] font-black text-black/30">YOUR TRIP</p>
            <h2 className="mt-3 text-[32px] md:text-[46px] font-black leading-[0.9] tracking-tight">How your three<br/>days will be</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={()=>setDaySlide((p)=> Math.max(0,p-1))} className="w-11 h-11 rounded-full border border-black/10 bg-white font-black">‹</button>
            <button onClick={()=>setDaySlide((p)=> Math.min(days.length-1,p+1))} className="w-11 h-11 rounded-full bg-black text-white font-black">›</button>
          </div>
        </div>

        <div className="mt-10 relative overflow-hidden rounded-[28px] bg-white border border-black/5">
          <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${daySlide*100}%)`}}>
            {days.map((d, idx)=>(
              <div key={idx} className="min-w-full p-8 md:p-12 grid md:grid-cols-[88px_1fr_240px] gap-6">
                <div className="text-[52px] font-black leading-none text-black/[0.06]">{String(idx+1).padStart(2,'0')}</div>
                <div>
                  <p className="text-[#F66E0D] font-black text-[11px] tracking-[0.2em]">{d.n}</p>
                  <h3 className="mt-2 text-[24px] md:text-[30px] font-black tracking-tight leading-tight">{d.title}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-black/60 font-light">{d.story}</p>
                  <div className="mt-6 flex gap-2 md:hidden">
                    <button onClick={()=>setDaySlide((p)=> Math.max(0,p-1))} className="w-10 h-10 rounded-full border bg-white">‹</button>
                    <button onClick={()=>setDaySlide((p)=> Math.min(days.length-1,p+1))} className="w-10 h-10 rounded-full bg-black text-white">›</button>
                  </div>
                </div>
                <div className="md:border-l md:border-black/10 md:pl-8 pt-2">
                  <p className="text-[10px] font-black tracking-widest text-black/30">WHAT IS INCLUDED</p>
                  <p className="mt-3 text-[13px] leading-6 text-black/70">
                    {idx===0 && "4x4 Land Cruiser, driver guide, park fees, lunch, dinner, camp"}
                    {idx===1 && "Full day drive in 4x4 Land Cruiser, park fees, picnic lunch, water, guide"}
                    {idx===2 && "Sunrise drive, breakfast, drive back to Nairobi, lunch, drop off"}
                  </p>
                  <p className="mt-6 text-[11px] text-black/40">Day {idx+1} of 3</p>
                  <div className="mt-2 flex gap-1.5">
                    {days.map((_,i)=><span key={i} className={`h-1 rounded-full transition-all ${i===daySlide?'w-6 bg-black':'w-3 bg-black/15'}`} />)}
                  </div>
                  <button onClick={()=>setShowBooking(true)} className="mt-6 w-full bg-black text-white rounded-full py-3 text-xs font-black">BOOK THIS TRIP</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-black/30">Swipe left or right to see all days. Tap arrows.</p>
      </div>

      {/* BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/80 z-[100] p-4 overflow-y-auto flex justify-center">
          <div className="bg-white w-full max-w-[760px] rounded-[28px] overflow-hidden my-10">
            <div className="bg-black text-white p-8">
              <div className="flex justify-between gap-6">
                <div>
                  <p className="text-[#F5B400] font-black text-[10px] tracking-[0.4em]">PAY NOW</p>
                  <h3 className="mt-2 text-[26px] font-black leading-tight">Pay to secure your safari</h3>
                  <p className="mt-2 text-white/50 text-[13px] max-w-[420px]">When you pay deposit now, we start planning your safari. We book your 4x4 Land Cruiser, camp and park ticket. You can relax.</p>
                </div>
                <button onClick={()=>setShowBooking(false)} className="w-9 h-9 bg-white/10 rounded-full shrink-0">x</button>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-7">
                <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black py-4 rounded-full font-black text-center text-[13px]">PayPal Deposit ${dep}</a>
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-white text-black py-4 rounded-full font-black text-center text-[13px]">PayPal Full ${full}</a>
              </div>
              <div className="mt-4 bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                <p className="text-[11px] font-black tracking-widest text-white/40">M-PESA ACCOUNT NAME</p>
                <p className="mt-2 text-[14px]">Paybill <b className="text-[#F5B400] text-lg">{paybillNo}</b> Acc <b>{paybillAcc}</b></p>
                <p className="text-[13px]">Name: <b className="text-[#F5B400]">{paybillName}</b></p>
              </div>
            </div>
            <div className="p-8 grid md:grid-cols-[1.1fr_0.9fr] gap-10">
              <form onSubmit={(e)=>{e.preventDefault(); globalThis.alert("Booking sent"); setShowBooking(false);}} className="space-y-3">
                <h4 className="font-black">Booking form</h4>
                <input required placeholder="Full name" className="w-full border border-black/10 rounded-full px-5 py-3 text-sm" />
                <input required type="email" placeholder="Email" className="w-full border border-black/10 rounded-full px-5 py-3 text-sm" />
                <input required placeholder="WhatsApp number" className="w-full border border-black/10 rounded-full px-5 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="date" className="w-full border border-black/10 rounded-full px-5 py-3 text-sm" />
                  <input required type="number" min={1} placeholder="Guests" className="w-full border border-black/10 rounded-full px-5 py-3 text-sm" />
                </div>
                <button className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black text-sm mt-2">SEND BOOKING REQUEST</button>
              </form>
              <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-black/5">
                <h5 className="font-black text-sm">Payment and return</h5>
                <div className="mt-3 text-[12px] leading-6 text-black/60 space-y-3">
                  <p><b className="text-black">Deposit:</b> Paying deposit of ${dep} lets us book your 4x4 Land Cruiser and camp.</p>
                  <p><b className="text-black">Payment:</b> Pay balance seven days before or cash on arrival.</p>
                  <p><b className="text-black">Refund:</b> Full refund 14 days before. Half refund 7 to 13 days. No refund within 7 days because we already paid park and camp.</p>
                  <p className="text-red-600"><b>Cancellation cost:</b> Once your trip is booked and confirmed, if you cancel there will be a small cost to cover park fees and lodge we already paid for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
