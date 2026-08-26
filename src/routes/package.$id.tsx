import { createFileRoute } from '@tanstack/react-router'
import { getPackage, WHATSAPP_NUMBER } from "../lib/packages";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current, setCurrent] = useState(0);
  const [daySlide, setDaySlide] = useState(0);
  const [infoSlide, setInfoSlide] = useState(0);
  const [showItinerary, setShowItinerary] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [party, setParty] = useState(2);
  const [startTime, setStartTime] = useState("08:00");
  const itineraryRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const infoTouch = useRef(0);
  const [form, setForm] = useState({ name:"", guests:"2 Persons", date:"", inquiry:"", email:"", whatsapp:"" });

  const fallback = [
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920",
  ];

  if (!packageData) return <div className="p-8 text-center">Package not found</div>;

  const gallery = packageData.gallery && packageData.gallery.length > 0? packageData.gallery : fallback;

  useEffect(() => {
    const t = globalThis.setInterval(() => setCurrent((p) => (p + 1) % gallery.length), 5000);
    return () => globalThis.clearInterval(t);
  }, [gallery.length]);

  const full = packageData.price || "1500";
  const dep = packageData.deposit || "100";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "Coming Soon";
  const paybillAcc = packageData.paybillAcc || "JUMA ADVENTURES";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  const days = (packageData.itinerary || []).map((it: any) => ({
    day: `DAY ${it.dayNum}`,
    title: it.title,
    story: Array.isArray(it.details)? it.details.join(". ") : it.details,
    meals: it.meals
  }));

  // JUMA ADVENTURES POLICIES ONLY - NO TOURSBYLOCALS
  const cancellationPolicy = (packageData as any).cancellationPolicy || `Juma Adventures Standard Policy: Cancel up to 15 days before start date and get full refund including all fees. 7-14 days 50% refund. Less than 7 days no refund. Book with deposit $${dep}. Contact Juma Adventures: WhatsApp +254 746 011254 / ${paypalEmail}`;

  const infoCards = [
    { title: "What to Carry", text: packageData.whatToBring?.join(", ") || "Neutral colors, fleece, hat, binoculars, camera, power bank, hiking boots, warm jacket, rain jacket." },
    { title: "Cancellation Policy", text: cancellationPolicy },
    { title: "Includes", text: packageData.includes?.join(", ") || "Private transport, guide" },
    { title: "Excludes", text: packageData.excludes?.join(", ") || "Park fees $52, personal expenses" },
  ];

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${paypalEmail}`, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ subject: `New Booking - ${packageData.title} - ${form.name} - Party ${party}`,...form, party, startTime, package: packageData.title })
      });
      if (res.ok) { setSent(true); setTimeout(()=>{ setShowBooking(false); setSent(false); setForm({name:"",guests:"2 Persons",date:"",inquiry:"",email:"",whatsapp:""}); }, 4000); }
    } catch {
      globalThis.location.href=`mailto:${paypalEmail}?subject=Booking ${form.name} Party ${party}&body=Guests:${form.guests} Date:${form.date} Time:${startTime}`;
    }
    setSending(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-10">
      <div className="relative h-[88vh] bg-black overflow-hidden">
        {gallery.map((img: string, i: number) => (
          <img key={i} src={img} alt={packageData.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${i===current?'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5B400] font-bold tracking-[0.25em] text-[11px]">{packageData.from.toUpperCase()} • {packageData.duration}</p>
          <h1 className="mt-3 text-white font-black leading-[0.95] text-[30px] md:text-[52px] max-w-[720px]">{packageData.title}</h1>
          <p className="mt-3 text-[#F5B400] font-bold text-[15px] md:text-[18px] max-w-[680px]">{packageData.subtitle}</p>
          <div className="mt-4 bg-[#0B6A2B] px-5 py-2 rounded-full max-w-[90%]">
            <p className="text-white font-bold text-[11px] leading-4">{packageData.route}</p>
          </div>

          {/* BOOKING CARD INLINE - ToursByLocals style */}
          <div className="mt-6 bg-white rounded-[24px] p-4 w-full max-w-[360px] text-black text-left shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <p className="text-center text-[26px] font-black">${full}.00 USD</p>
            <div className="mt-2 flex items-center justify-between border border-black/15 rounded-full px-4 py-2.5">
              <span className="font-bold text-[13px]">Your party size</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={()=>setParty(p=>Math.max(1,p-1))} className="w-7 h-7 rounded-full border flex items-center justify-center">−</button>
                <span className="font-black text-[#0B6A2B] w-3 text-center">{party}</span>
                <button type="button" onClick={()=>setParty(p=>Math.min(6,p+1))} className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">+</button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="border border-black/15 rounded-full px-4 py-2.5 text-[12px] font-bold">Tour date: {form.date || "Select"} ⌄</div>
              <div className="border border-black/15 rounded-full px-4 py-2.5 text-[12px] font-bold">Start: {startTime} ⌄</div>
            </div>
          </div>

          <button onClick={()=>{ setShowItinerary(true); setTimeout(()=>itineraryRef.current?.scrollIntoView({behavior:'smooth'}),100); }} className="mt-5 w-[180px] bg-[#F66E0D] text-white py-3.5 rounded-[12px] font-black text-[13px] tracking-widest">EXPLORE</button>
          <button onClick={()=>setShowBooking(true)} className="mt-3 w-[300px] bg-white text-black py-3.5 rounded-full font-black text-[14px]">BOOK NOW — USD {full} • {party} Pax</button>
          <p className="mt-3 text-white/60 text-[10px]">Deposit ${dep} • {paybillAcc} • Juma Adventures Business</p>
        </div>
      </div>

      {showItinerary && (
        <div ref={itineraryRef} className="max-w-[1100px] mx-auto px-5 md:px-10 py-12">
          <div className="text-center">
            <p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[10px]">YOUR {packageData.days} DAY JOURNEY - LIST VIEW</p>
            <h2 className="mt-2 text-[26px] md:text-[36px] font-black">Day by day - scroll</h2>
          </div>
          {/* Masai Mara & Big 5 LIST - UNTOUCHED SWIPE */}
          <div className="mt-6 rounded-[20px] bg-white border overflow-hidden" onTouchStart={e=>touchStart.current=e.touches[0].clientX} onTouchEnd={e=>{ const d=touchStart.current-e.changedTouches[0].clientX; if(d>50)setDaySlide(p=>Math.min(days.length-1,p+1)); if(d<-50)setDaySlide(p=>Math.max(0,p-1)); }}>
            <div className="flex transition-transform duration-500" style={{transform:`translateX(-${daySlide*100}%)`}}>
              {days.map((d,i)=><div key={i} className="min-w-full p-6"><p className="text-[#F66E0D] font-black text-[10px]">{d.day}</p><h3 className="mt-1 text-[18px] font-black">{d.title}</h3><p className="mt-3 text-[13px] leading-6 text-black/60">{d.story}</p>{d.meals && <p className="mt-2 text-[11px] font-bold">Meals: {d.meals}</p>}</div>)}
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2">{days.map((_,i)=><button key={i} onClick={()=>setDaySlide(i)} className={`h-2 rounded-full ${i===daySlide?'w-6 bg-black':'w-2 bg-black/20'}`} />)}</div>

          <div className="mt-12 rounded-[20px] bg-black text-white overflow-hidden" onTouchStart={e=>infoTouch.current=e.touches[0].clientX} onTouchEnd={e=>{ const d=infoTouch.current-e.changedTouches[0].clientX; if(d>50)setInfoSlide(p=>Math.min(infoCards.length-1,p+1)); if(d<-50)setInfoSlide(p=>Math.max(0,p-1)); }}>
            <div className="flex transition-transform duration-500" style={{transform:`translateX(-${infoSlide*100}%)`}}>
              {infoCards.map((c,i)=><div key={i} className="min-w-full p-6"><p className="text-[#F5B400] font-black text-[10px]">0{i+1}</p><h4 className="mt-1 text-[18px] font-black">{c.title}</h4><p className="mt-3 text-[13px] leading-6 text-white/60">{c.text}</p></div>)}
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-2">{infoCards.map((_,i)=><button key={i} onClick={()=>setInfoSlide(i)} className={`h-2 rounded-full ${i===infoSlide?'w-6 bg-[#F66E0D]':'w-2 bg-black/20'}`} />)}</div>

          <div className="mt-8 bg-black rounded-[20px] p-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white font-bold text-[13px]">Ready? Secure with ${dep} deposit • Party {party}</p>
            <button onClick={()=>setShowBooking(true)} className="bg-[#F66E0D] text-white px-6 py-3 rounded-full font-black text-[13px]">BOOK NOW — USD {full}</button>
          </div>
        </div>
      )}

      {showBooking && (
        <div className="fixed inset-0 bg-black/80 z-[100] p-3 flex justify-center items-start md:items-center overflow-y-auto">
          <div className="bg-white w-full max-w-[640px] rounded-[24px] overflow-hidden max-h-[92vh] overflow-y-auto">
            {!sent? (
              <>
                <div className="bg-black text-white p-5">
                  <div className="flex justify-between"><div><p className="text-[#F5B400] font-black text-[9px] tracking-[0.3em]">BOOKING • {packageData.duration} • {party} PAX</p><h3 className="text-[20px] font-black">Book {packageData.title}</h3><p className="text-[12px] text-white/60">${full}.00 USD • Deposit ${dep}</p></div><button onClick={()=>setShowBooking(false)} className="w-8 h-8 bg-white/10 rounded-full">✕</button></div>

                  <form onSubmit={sendEmail} className="mt-5 space-y-3">
                    <div className="bg-white/10 rounded-2xl p-3 grid grid-cols-2 gap-3">
                      <div><p className="text-[11px] font-bold">Party Size</p><div className="flex items-center gap-3 mt-1"><button type="button" onClick={()=>setParty(p=>Math.max(1,p-1))} className="w-8 h-8 rounded-full bg-white text-black">−</button><span className="font-black text-[#F5B400]">{party}</span><button type="button" onClick={()=>setParty(p=>Math.min(6,p+1))} className="w-8 h-8 rounded-full bg-white text-black">+</button></div></div>
                      <div><p className="text-[11px] font-bold">Start Time</p><select value={startTime} onChange={e=>setStartTime(e.target.value)} className="mt-1 w-full rounded-full px-3 py-2 text-black text-[12px]"><option>06:00</option><option>07:00</option><option>08:00</option><option>09:00</option></select></div>
                    </div>
                    <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Full name" className="w-full rounded-full px-5 py-3 text-[13px] bg-white text-black outline-none" />
                    <div className="grid grid-cols-2 gap-2">
                      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required type="email" placeholder="Email" className="w-full rounded-full px-4 py-3 text-[13px] bg-white text-black outline-none" />
                      <input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} required placeholder="WhatsApp" className="w-full rounded-full px-4 py-3 text-[13px] bg-white text-black outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} className="w-full rounded-full px-4 py-3 text-[13px] bg-white text-black outline-none"><option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4 Persons</option><option>5+ Persons</option></select>
                      <input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required type="date" className="w-full rounded-full px-4 py-3 text-[13px] bg-white text-black outline-none" />
                    </div>
                    <textarea value={form.inquiry} onChange={e=>setForm({...form,inquiry:e.target.value})} placeholder={`Party of ${party} - any special request?`} className="w-full rounded-2xl px-4 py-3 text-[13px] bg-white text-black h-16 outline-none"></textarea>
                    <button disabled={sending} className="w-full bg-[#F66E0D] text-white py-3 rounded-full font-black text-[13px]">{sending?"Sending...":"SEND BOOKING"}</button>
                  </form>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-2">
                    <a href={paypalDep} target="_blank" className="bg-black text-white py-3 rounded-full font-black text-center text-[12px]">Deposit ${dep} • {party} pax</a>
                    <a href={paypalFull} target="_blank" className="bg-[#F5B400] text-black py-3 rounded-full font-black text-center text-[12px]">Full ${full}</a>
                  </div>
                  <div className="mt-3 bg-[#FAF7F2] border rounded-xl p-3 text-[11px]"><p className="font-black">Juma Adventures Cancellation Policy</p><p className="text-black/60 mt-1">{cancellationPolicy}</p></div>
                  <div className="mt-3 bg-black rounded-xl p-4 text-white flex justify-between items-center">
                    <div><p className="text-[12px] font-bold">Juma Adventures • Business</p><p className="text-[10px] text-white/50">+254 746 011254 • 06:00-18:00 EAT</p></div>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Juma%20I%20want%20to%20book%20${encodeURIComponent(packageData.title)}%20for%20${party}%20people%20on%20${form.date}%20at%20${startTime}`} target="_blank" className="bg-[#25D366] text-black px-4 py-2 rounded-full font-black text-[11px]">WhatsApp • {party} pax</a>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center"><div className="w-12 h-12 bg-[#0B6A2B] text-white rounded-full flex items-center justify-center mx-auto font-black">✓</div><h3 className="mt-4 text-[18px] font-black">Booking received • {party} pax</h3><p className="mt-2 text-[13px] text-black/60">Thank you {form.name}. We'll reply shortly on WhatsApp.</p><button onClick={()=>setShowBooking(false)} className="mt-4 bg-black text-white px-6 py-2 rounded-full font-black text-[12px]">Close</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
