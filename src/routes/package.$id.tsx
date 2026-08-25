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

  const fallbackMara = [
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920",
  ];
  const validGallery = (packageData?.gallery?? fallbackMara).map((g: string) => g.includes("masai-mara-1") || g.includes("masai-mara-2")? fallbackMara[0] : g);

  useEffect(() => {
    const t = globalThis.setInterval(() => setCurrent((p: number) => (p + 1) % validGallery.length), 5000);
    return () => globalThis.clearInterval(t);
  }, [validGallery.length]);

  if (!packageData) return <div className="p-8 text-center">Package not found</div>;

  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "522533";
  const paybillAcc = "MASAI MARA";
  const paybillName = "MASAI MARA";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  const days = [
    { day:"DAY 1", title:"Nairobi to Masai Mara", story:"We pick you early from your hotel or JKIA. You ride in our 4x4 Land Cruiser with open roof. Drive through Great Rift Valley with photo stop. By lunch you are inside Mara and you start seeing animals on the way to camp. Evening game drive then dinner and rest under stars." },
    { day:"DAY 2", title:"Full Day in the Mara", story:"This is the main day. Early sunrise drive when lions and cheetahs are active. We track Big Five all day. Between July and October you see the wildebeest crossing at Mara River. Picnic lunch by the river with hippos. Optional Masai village visit. A full day you will remember for long." },
    { day:"DAY 3", title:"Mara to Nairobi", story:"Last sunrise drive with soft golden light. Good time for final photos. Breakfast at camp then drive back to Nairobi with game viewing on the way out. Drop at JKIA or hotel around five. You leave with stories and many photos." },
  ];

  const infoCards = [
    { title:"What to Carry", text:"Pack light and smart. Neutral colors only - khaki, olive, beige, brown. Two long sleeve shirts, two short sleeve, one warm fleece for morning drive, lightweight trousers, hat and sunglasses. Binoculars, camera with zoom lens, power bank 10000mAh, small daypack." },
    { title:"What NOT to Carry", text:"Avoid bright colors like red, white and black which disturb animals. No camouflage or military style clothes - not allowed in Kenya. No hard suitcase, use soft duffel bag max 15kg. No plastic bags - banned in Kenya. No heavy boots or high heels. No strong perfume." },
    { title:"Dress Code", text:"Safari dress is casual and practical. Morning drives are cold, you need fleece. Afternoon is warm, light breathable shirt. Long trousers for bush walk and Masai village. Evening at camp is relaxed - clean shirt and trousers is enough. No formal wear needed." },
    { title:"Luggage Type", text:"Soft-sided duffel only, max 15kg plus small hand bag. This fits well in our 4x4 Land Cruiser. If you fly to Mara, same limit applies. Laundry service available at camp daily, so you pack for 3 days only. Roll clothes to save space." },
    { title:"Safari Etiquette", text:"Stay inside 4x4 Land Cruiser during game drives. Keep voice low near animals. Do not feed animals. Follow guide instructions at all times. Ask before photographing Masai people. Tip your guide if service was good - recommended $20 per day." },
  ];

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${paypalEmail}`, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({
          subject:`New Mara Booking - ${form.name}`,
          name:form.name,
          email:form.email,
          whatsapp:form.whatsapp,
          guests:form.guests,
          date:form.date,
          inquiry:form.inquiry,
          package:packageData.title,
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
        {validGallery.map((img: string, i: number) => (
          <img key={i} src={img} alt="Masai Mara" onError={(e)=>{(e.currentTarget as HTMLImageElement).src=fallbackMara[0]}} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${i===current?'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5B400] font-black tracking-[0.35em] text-[12px] md:text-[13px]">MASAI MARA NATIONAL RESERVE</p>
          <h1 className="mt-4 text-white font-black leading-[0.9] text-[42px] md:text-[68px]">Masai Mara Safari<br/><span className="text-[#F5B400]">That Changes You</span></h1>
          <div className="mt-5 bg-[#0B6A2B] px-6 py-2.5 rounded-full"><p className="text-white font-bold text-[14px] md:text-[15px]">Kenya's most iconic wildlife destination</p></div>
          <button onClick={()=>{ setShowItinerary(true); setTimeout(()=>itineraryRef.current?.scrollIntoView({behavior:'smooth'}),100); }} className="mt-8 w-full max-w-[200px] bg-[#F66E0D] text-white py-4 rounded-[14px] font-black text-[14px] tracking-widest">EXPLORE</button>
          <button onClick={()=>setShowBooking(true)} className="mt-4 w-full max-w-[340px] bg-white text-black py-4 rounded-full font-black text-[15px]">BOOK NOW — USD {full}</button>
          <p className="mt-4 text-white/70 text-[11px]">Deposit ${dep} secures slot • Paybill {paybillNo} • {paybillName}</p>
        </div>
      </div>

      {showItinerary && (
        <div ref={itineraryRef} className="max-w-[1100px] mx-auto px-5 md:px-10 py-14">
          <div className="text-center">
            <p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">YOUR 3 DAY JOURNEY</p>
            <h2 className="mt-3 text-[28px] md:text-[40px] font-black leading-[0.95]">Experience Masai Mara<br/>day by day</h2>
          </div>
          <div className="mt-8 relative overflow-hidden rounded-[24px] bg-white border border-black/5" onTouchStart={e=>touchStart.current=e.touches[0].clientX} onTouchEnd={e=>{ const d=touchStart.current-e.changedTouches[0].clientX; if(d>50)setDaySlide(p=>Math.min(days.length-1,p+1)); if(d<-50)setDaySlide(p=>Math.max(0,p-1)); }}>
            <div className="flex transition-transform duration-500 ease-out" style={{transform:`translateX(-${daySlide*100}%)`}}>
              {days.map((d,i)=><div key={i} className="min-w-full p-7 md:p-10"><p className="text-[#F66E0D] font-black text-[11px] tracking-widest">{d.day}</p><h3 className="mt-2 text-[22px] md:text-[28px] font-black">{d.title}</h3><p className="mt-4 text-[14px] leading-7 text-black/65 font-light">{d.story}</p></div>)}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">{days.map((_,i)=><button key={i} onClick={()=>setDaySlide(i)} className={`h-2 rounded-full transition-all ${i===daySlide?'w-8 bg-black':'w-2 bg-black/20'}`} />)}</div>

          <div className="mt-20">
            <div className="flex items-end justify-between">
              <div><p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">ESSENTIALS</p><h3 className="mt-2 text-[24px] md:text-[32px] font-black leading-[0.9]">Before you pack</h3></div>
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
            <p className="mt-2 text-center text-[11px] text-black/30">Swipe by hand on mobile, click dots on desktop</p>
          </div>

          <div className="mt-10 bg-black rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left"><h4 className="text-white font-black">Ready for Mara?</h4><p className="text-white/50 text-[13px]">Secure with deposit ${dep} in your 4x4 Land Cruiser</p></div>
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
                    <div><p className="text-[#F5B400] font-black text-[10px] tracking-[0.4em]">BOOKING</p><h3 className="mt-1 text-[22px] font-black leading-tight">Book your safari</h3><p className="mt-1 text-white/50 text-[12px]">Fill this form and Juma Adventures will get back to you shortly</p></div>
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
                    <textarea value={form.inquiry} onChange={e=>setForm({...form,inquiry:e.target.value})} placeholder="Any other instructions or inquiry?" className="w-full rounded-2xl px-5 py-3.5 text-[14px] bg-white text-black h-20 outline-none"></textarea>
                    <button disabled={sending} className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black text-[14px]">{sending?"Sending...":"SEND BOOKING"}</button>
                  </form>
                </div>
                <div className="p-6">
                  <h4 className="font-black text-[14px]">You can pay now to secure your slot</h4>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-black text-white py-3.5 rounded-full font-black text-center text-[13px]">PayPal Deposit ${dep}</a>
                    <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black py-3.5 rounded-full font-black text-center text-[13px]">PayPal Full ${full}</a>
                  </div>
                  <div className="mt-4 bg-[#FAF7F2] border rounded-2xl p-4"><p className="text-[11px] font-black tracking-widest text-black/40">M-PESA</p><p className="text-[14px] mt-1">Paybill <b className="text-[#F5B400]">{paybillNo}</b> • Account No: <b>MASAI MARA</b></p><p className="text-[13px]">Account Name: <b>MASAI MARA</b></p></div>
                  <div className="mt-6 bg-black rounded-2xl p-5 text-white">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div><p className="font-black text-[14px]">Need quick help from Juma Adventures?</p><p className="text-white/60 text-[12px] mt-2 leading-5">Our safari team is available every day from 6AM to 11PM East Africa Time. We confirm your 4x4 Land Cruiser, camp and park fees within minutes. Your booking is secure, licensed and trusted. Reach us directly below for fastest response.</p></div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <a href="https://wa.me/254792639221" target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] text-black px-6 py-3 rounded-full font-black text-[13px]">WhatsApp</a>
                        <a href={`mailto:${paypalEmail}`} className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-black text-[13px]">Email Us</a>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] text-white/30">Official: {paypalEmail} • Response time under 15 minutes</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-10 text-center bg-white">
                <div className="w-16 h-16 bg-[#0B6A2B] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-black">✓</div>
                <h3 className="mt-6 text-[22px] font-black">Booking received</h3>
                <p className="mt-3 text-[14px] leading-6 text-black/60 max-w-[360px] mx-auto">Thank you {form.name}. Juma Adventures will respond shortly via your email and WhatsApp number. Your 4x4 Land Cruiser and camp will be held once you confirm. Karibu Kenya.</p>
                <button onClick={()=>setShowBooking(false)} className="mt-6 bg-black text-white px-8 py-3 rounded-full font-black text-sm">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
