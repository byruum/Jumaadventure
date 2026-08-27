import { createFileRoute } from '@tanstack/react-router'
import { getPackage, WHATSAPP_NUMBER } from "../lib/packages";
import { useState } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [showBooking, setShowBooking] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState(1);
  const [tourDate, setTourDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [form, setForm] = useState({ name:"", guests:"2 Persons", date:"", inquiry:"", email:"", whatsapp:"" });
  const [activeIdx, setActiveIdx] = useState(0);

  if (!packageData) return <div className="p-8 text-center">Package not found</div>;

  const gallery = packageData.gallery?.length? packageData.gallery : ["/og-image.png"];
  const heroImg = gallery[activeIdx] || gallery[0];
  const full = packageData.price;
  const dep = packageData.deposit || "200";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  const next = () => setActiveIdx(i => (i + 1) % gallery.length);
  const prev = () => setActiveIdx(i => (i - 1 + gallery.length) % gallery.length);

  const isDayTrip = packageData.days === 1 || packageData.duration.toLowerCase().includes("1 day") || packageData.title.toLowerCase().includes("day trip");
  const cancellationPolicy = `1. Cancellation 15 days before the tour date entitled to full refund.\n2. Cancellation 7 days before the tour, entitled to 50% refund.\n3. No refund within 7 days before commencing tour date.`;

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${paypalEmail}`, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ subject: `Booking ${packageData.title} $${full} - ${party} pax - ${tourDate} ${startTime}`,...form, tourDate, startTime, party, package: packageData.title })
      });
      if (res.ok) { setSent(true); setTimeout(()=>{ setShowBooking(false); setSent(false); }, 4000); }
    } catch {
      globalThis.location.href=`mailto:${paypalEmail}?subject=Booking ${form.name} ${party}pax`;
    }
    setSending(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-10">
      <div className="w-full h-[52vh] md:h-[70vh] relative bg-black">
        <img src={heroImg} alt={packageData.title} className="w-full h-full object-cover cursor-pointer" onClick={next} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* CLICKABLE ARROWS */}
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white bg-black/30 text-white flex items-center justify-center text-xl z-10">‹</button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white bg-black/30 text-white flex items-center justify-center text-xl z-10">›</button>

        {/* CLICKABLE COUNTER 1/12 */}
        <button onClick={next} className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-[12px] font-bold z-10">
          {activeIdx + 1}/{gallery.length}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 pointer-events-none">
          <p className="text-[#F5B400] font-black text-[10px] tracking-[0.3em]">{packageData.from.toUpperCase()} • {packageData.duration}</p>
          <h1 className="mt-2 text-white font-black text-[26px] md:text-[46px] leading-[0.95] max-w-[800px]">{packageData.title}</h1>
          <p className="mt-2 text-white/80 text-[13px] max-w-[700px]">{packageData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-4">
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory">
          {gallery.map((img:string, i:number)=>(
            <img
              key={i}
              src={img}
              alt={`gal ${i}`}
              onClick={()=>setActiveIdx(i)}
              className={`w-[200px] md:w-[280px] h-[130px] md:h-[180px] object-cover rounded-[12px] flex-shrink-0 snap-start border-2 cursor-pointer ${i===activeIdx? "border-black" : "border-transparent"}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-8 grid md:grid-cols-[1.3fr_0.7fr] gap-8">
        <div className="order-2 md:order-1 space-y-6">
          <div className="bg-white rounded-[20px] p-6 border">
            <p className="text-[11px] font-black tracking-widest text-[#0B6A2B]">FULL AMOUNT ${full} • {packageData.duration} {isDayTrip? "• DAY TRIP ONLY" : ""}</p>
            <p className="mt-3 text-[14px] leading-6 text-black/70">{packageData.journey}</p>
            <h3 className="mt-5 font-black text-[14px]">Highlights</h3>
            <ul className="mt-2 list-disc ml-5 text-[13px] space-y-1">{packageData.highlights.map((h,i)=><li key={i}>{h}</li>)}</ul>
          </div>

          <div className="bg-white rounded-[20px] p-6 border">
            <h3 className="font-black text-[18px]">Itinerary - List Style</h3>
            <div className="mt-4 space-y-5">
              {packageData.itinerary.map((it:any)=>(
                <div key={it.dayNum} className="border-l-4 border-[#0B6A2B] pl-4 py-1">
                  <p className="font-black text-[#F66E0D] text-[10px]">DAY {it.dayNum}</p>
                  <p className="font-black text-[15px] mt-1">{it.title}</p>
                  <ul className="mt-2 space-y-1">{(Array.isArray(it.details)? it.details : [it.details]).map((d:string,k:number)=><li key={k} className="text-[13px] leading-6 text-black/60 list-disc ml-4">{d}</li>)}</ul>
                  {it.meals && <p className="mt-2 text-[11px] font-bold bg-[#FAF7F2] px-2 py-1 rounded-full inline-block">Meals: {it.meals}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-6 border">
            <div className="grid md:grid-cols-2 gap-6 text-[13px]"><div><p className="font-black">Includes</p><ul className="list-disc ml-4 mt-2 text-black/60">{packageData.includes.map((a,i)=><li key={i}>{a}</li>)}</ul></div><div><p className="font-black">Excludes</p><ul className="list-disc ml-4 mt-2 text-black/60">{packageData.excludes.map((a,i)=><li key={i}>{a}</li>)}</ul></div></div>
            <div id="cancel" className="mt-6 bg-[#FAF7F2] p-3 rounded-xl text-[11px]"><p className="font-black">Cancellation Policy</p><p className="mt-1 text-black/60 whitespace-pre-line">{cancellationPolicy}</p></div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="bg-white rounded-[16px] border shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-5 sticky top-5">
            <p className="text-center font-black text-[28px]">${Number(full).toLocaleString()}.00 USD</p>
            <div className="mt-2 flex justify-center">
              {isDayTrip? (
                <span className="bg-[#F5B400] text-black px-3 py-1 rounded-full text-[10px] font-black tracking-widest">DAY TRIP ONLY • $330</span>
              ) : (
                <span className="bg-[#0B6A2B] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">{packageData.duration.toUpperCase()} • ${full}</span>
              )}
            </div>
            <div className="mt-4 space-y-2 text-[13px] text-black/60"><div>🕒 {packageData.duration}</div><div>🚗 Private transportation</div><div>👥 Private tour for 1-2 people</div></div>
            <div className="mt-4 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center">
              <span className="font-bold text-[14px]">Your party size</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={()=>setParty(p=>Math.max(1,p-1))} className="w-7 h-7 rounded-full border flex items-center justify-center">−</button>
                <span className="font-black text-[#0B8A5B]">{party}</span>
                <button type="button" onClick={()=>setParty(p=>Math.min(6,p+1))} className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">+</button>
              </div>
            </div>
            <label className="mt-3 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center cursor-pointer hover:border-black">
              <span className="font-bold text-[14px]">Tour date</span>
              <input type="date" value={tourDate} onChange={e=>{ setTourDate(e.target.value); setForm({...form, date: e.target.value}) }} className="bg-transparent outline-none text-[13px] cursor-pointer" />
            </label>
            <label className="mt-3 border border-black/20 rounded-full px-4 py-3 flex justify-between items-center cursor-pointer hover:border-black">
              <span className="font-bold text-[14px]">Start time</span>
              <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} className="bg-transparent outline-none text-[13px] cursor-pointer" />
            </label>
            <button onClick={()=>setShowBooking(true)} className="mt-4 w-full bg-[#0B8A5B] text-white py-4 rounded-full font-black">Book Now</button>
            <a href="#cancel" className="mt-4 flex items-center gap-2 text-[13px] underline font-bold"><span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">✓</span> View our cancellation policies</a>
          </div>
        </div>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/80 z-[100] p-3 flex justify-center items-center">
          <div className="bg-white w-full max-w-[520px] rounded-[24px] overflow-hidden">
            {!sent? (
              <form onSubmit={sendEmail} className="p-6 space-y-3">
                <div className="flex justify-between"><h3 className="font-black">Book ${full} • {party} pax {isDayTrip? "• DAY TRIP" : ""}</h3><button type="button" onClick={()=>setShowBooking(false)} className="w-8 h-8 bg-black/10 rounded-full">✕</button></div>
                <p className="text-[12px]">Date: {tourDate || "Select"} • Time: {startTime} • Full: ${full}</p>
                <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <input required value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="WhatsApp" className="w-full border rounded-full px-4 py-3 text-[13px]" />
                <button disabled={sending} className="w-full bg-[#0B8A5B] text-white py-3 rounded-full font-black">{sending?"Sending...":"Confirm $"+full}</button>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Booking%20${encodeURIComponent(packageData.title)}%20$${full}%20${party}pax%20${tourDate}%20${startTime}`} className="block text-center bg-[#25D366] py-3 rounded-full font-black text-[13px]">WhatsApp • {party} pax • {tourDate}</a>
                <div className="grid grid-cols-2 gap-2"><a href={paypalDep} target="_blank" className="bg-black text-white py-3 rounded-full text-center text-[12px] font-black">Deposit ${dep}</a><a href={paypalFull} target="_blank" className="bg-[#F5B400] text-black py-3 rounded-full text-center text-[12px] font-black">Full ${full}</a></div>
              </form>
            ) : (
              <div className="p-8 text-center"><p className="w-10 h-10 bg-[#0B6A2B] text-white rounded-full flex items-center justify-center mx-auto">✓</p><h3 className="mt-3 font-black">Booking received</h3></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
