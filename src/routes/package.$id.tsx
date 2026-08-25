import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

type Day = { dayNum: number; title: string; details: string[]; meals?: string }

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current, setCurrent] = useState(0);
  const [showBooking, setShowBooking] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);

  const fallbackMara = [
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920",
  ];

  const rawGallery = packageData?.gallery?? fallbackMara;
  const validGallery = rawGallery.map((g: string) => g.includes("masai-mara-1") || g.includes("masai-mara-2")? fallbackMara[0] : g);

  useEffect(() => {
    if (!validGallery.length) return;
    const t = globalThis.setInterval(() => setCurrent((p: number) => (p + 1) % validGallery.length), 4500);
    return () => globalThis.clearInterval(t);
  }, [validGallery.length]);

  if (!packageData) return <div className="p-8 text-center">Package not found</div>;

  const isMara = packageData.id === "masai-mara";
  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "PENDING";
  const paybillAcc = packageData.paybillAcc || "MARAMARA";
  const paybillName = "JUMA ADVENTURES AND SAFARIS";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  const narratedItinerary = [
    {
      day: 1,
      hook: "Your adventure begins the moment we pick you up.",
      title: "Nairobi → Masai Mara — Welcome to the Wild",
      story: "Picture this: early morning Nairobi, you hop into our 4x4 Land Cruiser. As we drive through the Great Rift Valley, the city fades and Africa opens up. By afternoon you are inside Masai Mara — lions napping under acacia, elephants crossing your path. This is not a transfer, this is your first game drive. Tonight you sleep to hyenas far away.",
      bullets: ["Pickup JKIA / Hotel 7AM", "Rift Valley scenic stop", "Game en-route to camp", "Sunset game drive", "Dinner & bonfire"]
    },
    {
      day: 2,
      hook: "This is why you came to Kenya.",
      title: "Full Day in Mara — Big Five & Great Migration",
      story: "Wake at 5:30AM, coffee in hand, sunrise over savannah. Today we track the Big Five. Our guide knows where the pride of 20 lions slept. July-Oct you see 1.5M wildebeest crossing Mara River — life and death in front of you. We picnic by the river with hippos. This day will stay with you forever.",
      bullets: ["Sunrise drive 6-9AM", "Big Five tracking", "Migration crossing seasonal", "Bush picnic lunch", "Masai Village optional"]
    },
    {
      day: 3,
      hook: "One last sunrise, one last roar.",
      title: "Mara → Nairobi — Carry Africa With You",
      story: "Last morning drive — golden light, lions still active. You spot what you missed yesterday. We drive back, but you are not the same person who left Nairobi 3 days ago. You have seen Africa raw and real. Drop JKIA / Hotel with 300 photos and a story no one else has.",
      bullets: ["Final sunrise drive", "Breakfast at camp", "Game en-route back", "Drop JKIA 4-5PM", "Lunch included"]
    }
  ];

  if (isMara) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen pb-10">
        <div className="relative h-[92vh] bg-black overflow-hidden">
          {validGallery.map((img: string, idx: number) => (
            <img key={idx} src={img} alt="Masai Mara" onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackMara[0] }} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[4000ms] ${idx===current?'opacity-100 scale-105':'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[#F5B400] font-black tracking-[0.4em] text-[11px]">MASAI MARA NATIONAL RESERVE</p>
            <h1 className="text-white font-black text-[40px] md:text-[72px] leading-[0.9] mt-4">Masai Mara Safari<br/><span className="text-[#F5B400]">That Changes You</span></h1>
            <p className="mt-4 bg-[#0B6A2B]/90 text-white px-6 py-2 rounded-full text-[13px] font-bold">Kenya&apos;s most iconic wildlife destination</p>
            <div className="flex flex-col md:flex-row gap-3 mt-8">
              <button onClick={() => itineraryRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black px-8 py-4 rounded-full font-black text-sm">EXPLORE ITINERARY ↓</button>
              <button onClick={() => setShowBooking(true)} className="bg-[#F66E0D] text-white px-10 py-4 rounded-full font-black text-sm">BOOK NOW — USD {full}</button>
            </div>
            <p className="text-white/60 text-[11px] mt-3">Deposit ${dep} secures slot • Paybill {paybillNo} • {paybillName}</p>
          </div>
        </div>

        <div ref={itineraryRef} className="max-w-5xl mx-auto px-4 mt-16">
          <div className="text-center mb-12">
            <p className="text-[#0B6A2B] font-black tracking-widest text-xs">HOW YOUR 3 DAYS UNFOLD</p>
            <h2 className="text-[32px] md:text-[44px] font-black leading-[0.95] mt-3">Let me walk you through<br/>your safari...</h2>
          </div>
          <div className="space-y-10">
            {narratedItinerary.map((d) => (
              <div key={d.day} className="bg-white rounded-[24px] border p-8">
                <p className="text-[#F66E0D] font-black text-xs">DAY {d.day} — {d.hook}</p>
                <h3 className="font-black text-xl mt-2">{d.title}</h3>
                <p className="text-[15px] text-gray-700 leading-7 mt-3">{d.story}</p>
                <div className="flex flex-wrap gap-2 mt-4">{d.bullets.map((b: string, i: number) => <span key={i} className="bg-[#FAF7F2] border text-[12px] font-bold px-3 py-1.5 rounded-full">✓ {b}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 bg-black text-white rounded-[24px] p-8">
            <h3 className="font-black text-2xl">Ready to see lions tomorrow?</h3>
            <button onClick={() => setShowBooking(true)} className="mt-5 bg-[#F66E0D] text-white px-10 py-4 rounded-full font-black">BOOK NOW — SECURE MY SAFARI</button>
          </div>
        </div>

        {showBooking && (
          <div className="fixed inset-0 bg-black/70 z-[100] overflow-y-auto p-4 flex justify-center">
            <div className="bg-white w-full max-w-[760px] rounded-[28px] overflow-hidden my-8">
              <div className="bg-black text-white p-7">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[#F5B400] font-black text-[10px] tracking-widest">SECURE CHECKOUT</p>
                    <h3 className="font-black text-2xl mt-1">Pay Now & Secure Your Safari</h3>
                    <p className="text-white/60 text-[13px] mt-2 max-w-md">By paying now or deposit, you enable us to plan your wonderful safari — reserve Jeep, camp, park fees. You are rest assured, licensed & trusted.</p>
                  </div>
                  <button onClick={() => setShowBooking(false)} className="w-9 h-9 bg-white/10 rounded-full">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black text-center py-4 rounded-full font-black text-sm">Pay Deposit ${dep} PayPal</a>
                  <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-white text-black text-center py-4 rounded-full font-black text-sm">Pay Full ${full} PayPal</a>
                </div>
                <div className="mt-4 bg-white/10 border border-white/10 rounded-xl p-4 text-[13px]">
                  <p className="font-black text-xs tracking-widest">M-PESA PAYMENT — ACCOUNT NAME</p>
                  <p className="mt-2">Paybill No: <b className="text-[#F5B400] text-lg">{paybillNo}</b></p>
                  <p>Account No: <b>{paybillAcc}</b></p>
                  <p>Account Name: <b className="text-[#F5B400]">{paybillName}</b></p>
                  <p className="text-[11px] text-white/60 mt-2">Lipa na M-Pesa → Paybill → Enter details → Amount ${dep}</p>
                  <p className="text-[10px] text-white/40 mt-1">PayPal Email: {paypalEmail}</p>
                </div>
              </div>

              <div className="p-7 grid md:grid-cols-[1.2fr_0.8fr] gap-8">
                <div>
                  <h4 className="font-black">Booking Form</h4>
                  <form onSubmit={(e) => { e.preventDefault(); globalThis.alert("Booking sent! Check email PayPal."); setShowBooking(false); }} className="mt-4 space-y-3">
                    <input required placeholder="Full Name" className="w-full border rounded-full px-4 py-3 text-sm" />
                    <input required type="email" placeholder="Email" className="w-full border rounded-full px-4 py-3 text-sm" />
                    <input required placeholder="WhatsApp Number" className="w-full border rounded-full px-4 py-3 text-sm" />
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="date" className="w-full border rounded-full px-4 py-3 text-sm" />
                      <input required type="number" min={1} placeholder="Guests" className="w-full border rounded-full px-4 py-3 text-sm" />
                    </div>
                    <textarea placeholder="Pickup: JKIA / Hotel" className="w-full border rounded-2xl px-4 py-3 text-sm h-20"></textarea>
                    <button type="submit" className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black">SEND BOOKING REQUEST</button>
                  </form>
                </div>
                <div className="bg-[#FAF7F2] rounded-2xl p-5 border">
                  <h5 className="font-black text-sm">Payment Policy & Return Policy</h5>
                  <div className="text-[12px] leading-6 mt-3 text-gray-700 space-y-3">
                    <p><b>Deposit Policy:</b> Paying now or deposit USD {dep} enables us to plan your wonderful safari — Jeep, camp, park fees. You are rest assured.</p>
                    <p><b>Payment Policy:</b> Balance 7 days before or cash on arrival. Secure via PayPal & M-Pesa to Account Name {paybillName}.</p>
                    <p><b>Return / Refund Policy:</b> Full refund 14+ days before. 50% refund 7-13 days. No refund within 7 days — camps already paid.</p>
                    <p><b className="text-red-600">Cancellation Cost:</b> Trip once booked, confirmed and processed will humbly attract cost upon cancellation to cover park fees & lodge commitments paid on your behalf.</p>
                    <p><b>Our Promise:</b> If we cancel, 100% refund or free date change.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  return <div className="p-8">Package: {packageData.title}</div>
}
