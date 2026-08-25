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
  const [infoSlide, setInfoSlide] = useState(0);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
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
  const originalPrice = (packageData as any).originalPrice || "";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "522533";
  const paybillAcc = packageData.paybillAcc || packageData.title.toUpperCase();
  const paybillName = packageData.paybillAcc || packageData.title.toUpperCase();

  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  // DYNAMIC DAYS - from packages.ts, not hardcoded Mara
  const days = (packageData.itinerary || []).map((it: any) => ({
    day: `DAY ${it.dayNum}`,
    title: it.title,
    story: Array.isArray(it.details)? it.details.join(". ") : it.details,
    meals: it.meals,
  }));

  const priceCategories = (packageData as any).priceCategories || [];
  const cancellationPolicy = (packageData as any).cancellationPolicy || "View our cancellation policies — Upgrade for total flexibility with Any Reason Cancellation. Free cancellation up to 7 days before. 50% refund 3-6 days. No refund within 48 hours. Book with a deposit — Secure your tour today and pay balance later.";

  const infoCards = [
    { title: "What to Carry", text: packageData.whatToBring? packageData.whatToBring.join(", ") : "Neutral colors khaki, olive, beige, fleece for morning, hat, sunglasses, binoculars, camera with zoom, power bank." },
    { title: "What NOT to Carry", text: "No bright red/white/black, no camouflage/military (not allowed Kenya), no hard suitcase — soft duffel max 15kg, no plastic bags banned." },
    { title: "Includes", text: packageData.includes? packageData.includes.join(", ") : "Private transportation" },
    { title: "Excludes", text: packageData.excludes? packageData.excludes.join(", ") : "Park fees, tips" },
    { title: "Cancellation Policy", text: cancellationPolicy },
  ];

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${paypalEmail}`, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({
          subject: `New Booking - ${packageData.title} - ${form.name}`,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          guests: form.guests,
          date: form.date,
          inquiry: form.inquiry,
          package: packageData.title,
        })
      });
      if (res.ok) {
        setSent(true);
        setTimeout(()=>{ setShowBooking(false); setSent(false); setForm({name:"",guests:"2 Persons",date:"",inquiry:"",email:"",whatsapp:""}); }, 5000);
      }
    } catch {
      globalThis.location.href=`mailto:${paypalEmail}?subject=Booking ${form.name}&body=Guests:${form.guests} Date:${form.date} WhatsApp:${form.whatsapp} Inquiry:${form.inquiry}`;
    }
    setSending(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-10">
      <div className="relative h-[92vh] bg-black overflow-hidden">
        {gallery.map((img: string, i: number) => (
          <img key={i} src={img} alt={packageData.title} onError={(e)=>{(e.currentTarget as HTMLImageElement).src=fallback[0]}} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${i===current?'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5B400] font-black tracking-[0.35em] text-[12px] md:text-[13px]">{(packageData.from || "KENYA").toUpperCase()} • {(packageData as any).rating || "5.0 (1) review"} • {packageData.duration}</p>
          <h1 className="mt-4 text-white font-black leading-[0.9] text-[28px] md:text-[52px]">{packageData.title}<br/><span className="text-[#F5B400]">{packageData.subtitle}</span></h1>

          {originalPrice && <p className="mt-3 text-white/50 line-through text-[16px]">${originalPrice}.00 USD total on ToursByLocals</p>}
          <p className="mt-1 text-white font-black text-[20px]">Direct USD {full} • {packageData.days} days • Private tour for 1-2 people</p>

          <div className="mt-4 bg-[#0B6A2B] px-6 py-2.5 rounded-full"><p className="text-white font-bold text-[13px]">Private transportation • {packageData.route}</p></div>

          <button onClick={()=>{ setShowItinerary(true); setTimeout(()=>itineraryRef.current?.scrollIntoView({behavior:'smooth'}),100); }} className="mt-6 w-full max-w-[200px] bg-[#F66E0D] text-white py-4 rounded-[14px] font-black text-[14px] tracking-widest">EXPLORE</button>
          <button onClick={()=>setShowBooking(true)} className="mt-4 w-full max-w-[360px] bg-white text-black py-4 rounded-full font-black text-[15px]">BOOK NOW — USD {full}</button>
          <p className="mt-3 text-white/70 text-[11px]">Deposit ${dep} • Paybill {paybillNo} • {paybillName} • View cancellation policies</p>
        </div>
      </div>

      {priceCategories.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-8">
          <div className="bg-white rounded-[20px] border border-black/5 p-5">
            <div className="flex justify-between items-center">
              <p className="font-black text-[11px] tracking-widest">YOUR PARTY SIZE • PRICE BY GROUP — $2,497.00 USD as per screenshot</p>
              <p className="font-black text-[11px] text-[#0B6A2B]">Your party size 1</p>
            </div>
            <div className="mt-3 grid gap-2">
              {priceCategories.map((pc:any,i:number)=>(
                <div key={i} className="flex justify-between items-center bg-[#FAF7F2] rounded-full px-5 py-3">
                  <span className="text-[13px] font-bold">{pc.pax}</span>
                  <span className="text-[13px] font-black">${pc.perPerson || pc.price} pp {pc.total? `• total $${pc.total}` : ""} {pc.note? `• ${pc.note}` : ""}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-black/40">Tour date • Start time • Book with a deposit • Secure your tour today and pay balance later</p>
          </div>
        </div>
      )}

      {showItinerary && (
        <div ref={itineraryRef} className="max-w-[1100px] mx-auto px-5 md:px-10 py-14">
          <div className="text-center">
            <p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">YOUR {packageData.days} DAY JOURNEY • {packageData.days} days • Private transportation</p>
            <h2 className="mt-3 text-[28px] md:text-[40px] font-black leading-[0.95]">Experience {packageData.title}<br/>day by day</h2>
          </div>
          <div className="mt-8 relative overflow-hidden rounded-[24px] bg-white border border-black/5" onTouchStart={e=>touchStart.current=e.touches[0].clientX} onTouchEnd={e=>{ const d=touchStart.current-e.changedTouches[0].clientX; if(d>50)setDaySlide(p=>Math.min(days.length-1,p+1)); if(d<-50)setDaySlide(p=>Math.max(0,p-1)); }}>
            <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${daySlide*100}%)`}}>
              {days.map((d,i)=><div key={i} className="min-w-full p-7 md:p-10"><p className="text-[#F66E0D] font-black text-[11px] tracking-widest">{d.day}</p><h3 className="mt-2 text-[22px] md:text-[28px] font-black">{d.title}</h3><p className="mt-4 text-[14px] leading-7 text-black/65 font-light">{d.story}</p>{d.meals && <p className="mt-3 text-[11px] font-black">Meals: {d.meals}</p>}</div>)}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">{days.map((_,i)=><button key={i} onClick={()=>setDaySlide(i)} className={`h-2 rounded-full transition-all ${i===daySlide?'w-8 bg-black':'w-2 bg-black/20'}`} />)}</div>

          <div className="mt-20">
            <div className="flex items-end justify-between">
              <div><p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">ESSENTIALS & CANCELLATION</p><h3 className="mt-2 text-[24px] md:text-[32px] font-black leading-[0.9]">Before you pack</h3></div>
              <div className="hidden md:flex gap-2">
                <button onClick={()=>setInfoSlide(p=>Math.max(0,p-1))} className="w-10 h-10 rounded-full border border-black/10 bg-white font-black">‹</button>
                <button onClick={()=>setInfoSlide(p=>Math.min(infoCards.length-1,p+1))} className="w-10 h-10 rounded-full bg-black text-white font-black">›</button>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-[24px] bg-black text-white" onTouchStart={e=>infoTouch.current=e.touches[0].clientX} onTouchEnd={e=>{ const d=infoTouch.current-e.changedTouches[0].clientX; if(d>50)setInfoSlide(p=>Math.min(infoCards.length-1,p+1)); if(d<-50)setInfoSlide(p=>Math.max(0,p-1)); }}>
              <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${infoSlide*100}%)`}}>
                {infoCards.map((c,i)=><div key={i} className="min-w-full p-8 md:p-10"><p className="text-[#F5B400] font-black text-[11px] tracking-widest">{String(i+1).padStart(2,'0')}</p><h4 className="mt-2 text-[20px] md:text-[26px] font-black">{c.title}</h4><p className="mt-4 text-[14px] leading-7 text-white/70 font-light">{c.text}</p></div>)}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-2">{infoCards.map((_,i)=><button key={i} onClick={()=>setInfoSlide(i)} className={`h-2 rounded-full transition-all ${i===infoSlide?'w-8 bg-[#F66E0D]':'w-2 bg-black/20'}`} />)}</div>
            <p className="mt-2 text-center text-[11px] text-black/30">Swipe by hand on mobile — View our cancellation policies • Book with a deposit</p>
          </div>

          <div className="mt-10 bg-black rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left"><h4 className="text-white font-black">Ready for {packageData.title}?</h4><p className="text-white/50 text-[13px]">Secure with deposit ${dep} • Dennis J. • 5.0 rating • 7 hrs avg response</p></div>
            <button onClick={()=>setShowBooking(true)} className="bg-[#F66E0D] text-white px-8 py-4 rounded-full font-black text-sm">BOOK NOW — USD {full}</button>
          </div>
        </div>
      )}

      {showBooking && (
        <div className="fixed inset-0 bg-black/85 z-[100] p-3 flex justify-center items-start md:items-center overflow-y-auto">
          <div className="bg-white w-full max-w-[720px] rounded-[28px] overflow-hidden mt-4 md:mt-0 max-h-[94vh] overflow-y-auto">
            {!sent? (
              <>
                <div className="bg-black text-white p-6">
                  <div className="flex justify-between gap-4">
                    <div><p className="text-[#F5B400] font-black text-[10px] tracking-[0.4em]">BOOKING • {packageData.days} days • Private for 1-2 people</p><h3 className="mt-1 text-[22px] font-black leading-tight">Book {packageData.title}</h3><p className="mt-1 text-white/50 text-[12px]">Your party size • Tour date • Start time</p></div>
                    <button onClick={()=>setShowBooking(false)} className="w-9 h-9 bg-white/10 rounded-full">✕</button>
                  </div>
                  <form onSubmit={sendEmail} className="mt-6 space-y-3">
                    <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Full name" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none" />
                    <div className="grid grid-cols-2 gap-3">
                      <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required type="email" placeholder="Email address" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none" />
                      <input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} required placeholder="WhatsApp number" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none"><option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4 Persons</option><option>5+ Persons</option></select>
                      <input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required type="date" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none" />
                    </div>
                    <textarea value={form.inquiry} onChange={e=>setForm({...form,inquiry:e.target.value})} placeholder="Your party size and inquiry?" className="w-full rounded-2xl px-5 py-3.5 text-[14px] bg-white text-black h-20 outline-none"></textarea>
                    <button disabled={sending} className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black text-[14px]">{sending?"Sending...":"SEND BOOKING"}</button>
                  </form>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-[14px]">Pay now — Book with a deposit</h4>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-black text-white py-3.5 rounded-full font-black text-center text-[13px]">PayPal Deposit ${dep}</a>
                    <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black py-3.5 rounded-full font-black text-center text-[13px]">PayPal Full ${full}</a>
                  </div>
                  <div className="mt-4 bg-[#FAF7F2] border rounded-2xl p-4"><p className="text-[11px] font-black tracking-widest text-black/40">M-PESA</p><p className="text-[14px] mt-1">Paybill <b className="text-[#F5B400]">{paybillNo}</b> • Account No: <b>{paybillAcc}</b></p><p className="text-[13px]">Account Name: <b>{paybillName}</b></p></div>
                  <div className="mt-4 bg-[#FAF7F2] border rounded-2xl p-4">
                    <p className="font-black text-[12px] underline">View our cancellation policies</p>
                    <p className="text-[12px] mt-2 text-black/60 leading-5">{cancellationPolicy}</p>
                    <p className="font-black text-[12px] mt-3 underline">Book with a deposit — Secure your tour today and pay your balance later</p>
                  </div>
                  <div className="mt-6 bg-black rounded-2xl p-5 text-white">
                    <p className="font-black text-[14px]">Dennis J. • 5.0 Guide rating • 5 Reviews • 14 Tours delivered • 7 hrs Avg response</p>
                    <p className="text-white/60 text-[12px] mt-2">Hello, I am Dennis Juma, licensed professional guide registered with Kenya Tourism Board, over 14 years. Team available 6AM-11PM EAT. Response under 15 min.</p>
                    <div className="flex gap-2 mt-4">
                      <a href="https://wa.me/254792639221" target="_blank" className="bg-[#25D366] text-black px-6 py-3 rounded-full font-black text-[13px]">WhatsApp</a>
                      <a href={`mailto:${paypalEmail}`} className="bg-white text-black px-6 py-3 rounded-full font-black text-[13px]">Email Us</a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-10 text-center bg-white">
                <div className="w-16 h-16 bg-[#0B6A2B] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black">✓</div>
                <h3 className="mt-6 text-[22px] font-black">Booking received</h3>
                <p className="mt-3 text-[14px] leading-6 text-black/60 max-w-[360px] mx-auto">Thank you {form.name}. Juma Adventures will respond shortly.</p>
                <button onClick={()=>setShowBooking(false)} className="mt-6 bg-black text-white px-8 py-3 rounded-full font-black text-sm">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
