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
  const [sending, setSending] = useState(false);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  const [form, setForm] = useState({ name:"", guests:"2", date:"", inquiry:"", email:"", whatsapp:"" });

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
  const paybillNo = packageData.paybillNo || "522533";
  const paybillAcc = "MASAI MARA";
  const paybillName = "MASAI MARA";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD`;

  const days = [
    { day:"DAY 1", title:"Nairobi to Masai Mara", story:"We pick you early from your hotel or JKIA. You ride in our 4x4 Land Cruiser with open roof. Drive through Great Rift Valley with photo stop. By lunch you are inside Mara and you start seeing animals on the way to camp. Evening game drive then dinner and rest under stars." },
    { day:"DAY 2", title:"Full Day in the Mara", story:"This is the main day. Early sunrise drive when lions and cheetahs are active. We track Big Five all day. Between July and October you see the wildebeest crossing at Mara River. Picnic lunch by the river with hippos. Optional Masai village visit. A full day you will remember for long." },
    { day:"DAY 3", title:"Mara to Nairobi", story:"Last sunrise drive with soft golden light. Good time for final photos. Breakfast at camp then drive back to Nairobi with game viewing on the way out. Drop at JKIA or hotel around five in the evening. You leave with stories and many photos." },
  ];

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      // USING FORMSUBMIT - goes straight to your email. Replace with your email below
      const res = await fetch("https://formsubmit.co/ajax/jumaadventuresandsafaris@gmail.com", {
        method: "POST",
        headers: { "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({
          subject: `New Mara Booking - ${form.name}`,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          guests: form.guests,
          date: form.date,
          message: form.inquiry,
          package: packageData.title,
        })
      });
      if(res.ok){
        globalThis.alert("Booking sent! We will reply on WhatsApp in 15 mins.");
        setShowBooking(false);
      } else throw new Error();
    } catch {
      // fallback mailto if API fails
      globalThis.location.href = `mailto:jumaadventuresandsafaris@gmail.com?subject=Booking ${form.name}&body=Guests:${form.guests} Date:${form.date} Inquiry:${form.inquiry} Email:${form.email} WhatsApp:${form.whatsapp}`;
    }
    setSending(false);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* HOME - SAME STYLE YOU LIKED */}
      <div className="relative h-[92vh] bg-black overflow-hidden">
        {validGallery.map((img: string, i: number) => (
          <img key={i} src={img} alt="Masai Mara" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${i===current?'opacity-100':'opacity-0'}`} />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[#F5B400] font-black tracking-[0.35em] text-[12px]">MASAI MARA NATIONAL RESERVE</p>
          <h1 className="mt-4 text-white font-black leading-[0.9] text-[42px] md:text-[68px]">Masai Mara Safari<br/><span className="text-[#F5B400]">That Changes You</span></h1>
          <div className="mt-5 bg-[#0B6A2B] px-6 py-2.5 rounded-full"><p className="text-white font-bold text-[14px]">Kenya's most iconic wildlife destination</p></div>
          {/* ORANGE EXPLORE = GATE */}
          <button onClick={()=>{ setShowItinerary(true); setTimeout(()=>itineraryRef.current?.scrollIntoView({behavior:'smooth'}),100)}} className="mt-8 w-full max-w-[340px] bg-[#F66E0D] text-white py-4 rounded-full font-black text-[15px]">EXPLORE ↓</button>
          <button onClick={()=>setShowBooking(true)} className="mt-4 w-full max-w-[340px] bg-white text-black py-4 rounded-full font-black text-[15px]">BOOK NOW — USD {full}</button>
          <p className="mt-4 text-white/70 text-[11px]">Deposit ${dep} secures slot • Paybill {paybillNo} • {paybillName}</p>
        </div>
      </div>

      {showItinerary && (
        <div ref={itineraryRef} className="max-w-[1100px] mx-auto px-5 md:px-10 py-14">
          <div className="text-center"><p className="text-[#0B6A2B] font-black tracking-[0.3em] text-[11px]">YOUR 3 DAY JOURNEY</p><h2 className="mt-3 text-[28px] md:text-[40px] font-black leading-[0.95]">Experience Masai Mara<br/>day by day</h2></div>
          <div className="mt-8 relative overflow-hidden rounded-[24px] bg-white border border-black/5"
            onTouchStart={(e)=>touchStart.current=e.touches[0].clientX}
            onTouchEnd={(e)=>{ const diff=touchStart.current-e.changedTouches[0].clientX; if(diff>50)setDaySlide(p=>Math.min(days.length-1,p+1)); if(diff<-50)setDaySlide(p=>Math.max(0,p-1)); }}>
            <div className="flex transition-transform duration-500" style={{transform:`translateX(-${daySlide*100}%)`}}>
              {days.map((d,i)=><div key={i} className="min-w-full p-7 md:p-10"><p className="text-[#F66E0D] font-black text-[11px] tracking-widest">{d.day}</p><h3 className="mt-2 text-[22px] md:text-[28px] font-black">{d.title}</h3><p className="mt-4 text-[14px] leading-7 text-black/65 font-light">{d.story}</p></div>)}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">{days.map((_,i)=><button key={i} onClick={()=>setDaySlide(i)} className={`h-2 rounded-full ${i===daySlide?'w-8 bg-black':'w-2 bg-black/20'}`} />)}</div>
        </div>
      )}

      {/* BOOKING MODAL - FORM + PAY NOW + PACKING */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/85 z-[100] p-3 flex justify-center items-start md:items-center overflow-y-auto">
          <div className="bg-white w-full max-w-[760px] rounded-[28px] overflow-hidden mt-4 md:mt-0 max-h-[94vh] overflow-y-auto">
            <div className="bg-black text-white p-6">
              <div className="flex justify-between"><div><p className="text-[#F5B400] font-black text-[10px] tracking-[0.4em]">BOOKING</p><h3 className="mt-1 text-[22px] font-black">Book your Masai Mara safari</h3></div><button onClick={()=>setShowBooking(false)} className="w-9 h-9 bg-white/10 rounded-full">✕</button></div>
              <form onSubmit={sendEmail} className="mt-6 space-y-3">
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Full name" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black outline-none" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required type="email" placeholder="Email" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black" />
                  <input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} required placeholder="WhatsApp number" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black"><option>1 Person</option><option>2 Persons</option><option>3 Persons</option><option>4 Persons</option><option>5+ Persons</option></select>
                  <input value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required type="date" className="w-full rounded-full px-5 py-3.5 text-[14px] bg-white text-black" />
                </div>
                <textarea value={form.inquiry} onChange={e=>setForm({...form,inquiry:e.target.value})} placeholder="Any other instructions or inquiry?" className="w-full rounded-2xl px-5 py-3.5 text-[14px] bg-white text-black h-20"></textarea>
                <button disabled={sending} className="w-full bg-[#F66E0D] text-white py-4 rounded-full font-black text-[14px]">{sending?"Sending...":"SEND BOOKING TO EMAIL"}</button>
              </form>
            </div>

            <div className="p-6">
              <h4 className="font-black text-[14px]">You can pay now to secure your slot</h4>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a href={paypalDep} target="_blank" rel="noreferrer" className="bg-black text-white py-3.5 rounded-full font-black text-center text-[13px]">PayPal Deposit ${dep}</a>
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-[#F5B400] text-black py-3.5 rounded-full font-black text-center text-[13px]">PayPal Full ${full}</a>
              </div>
              <div className="mt-4 bg-[#FAF7F2] border rounded-2xl p-4">
                <p className="text-[11px] font-black tracking-widest text-black/40">M-PESA</p>
                <p className="text-[14px] mt-1">Paybill <b className="text-[#F5B400]">{paybillNo}</b> • Account No: <b>MASAI MARA</b></p>
                <p className="text-[13px]">Account Name: <b>MASAI MARA</b></p>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6 text-[12px] leading-6">
                <div>
                  <p className="font-black text-[13px]">What to carry</p>
                  <ul className="mt-2 space-y-1 text-black/70 list-disc ml-4">
                    <li>Neutral colors - khaki, beige, olive, brown</li>
                    <li>Warm fleece for morning, light shirts for day</li>
                    <li>Closed walking shoes + sandals for camp</li>
                    <li>Hat, sunglasses, sunscreen SPF30</li>
                    <li>Binoculars, camera with zoom, power bank</li>
                    <li>Small daypack, reusable water bottle</li>
                  </ul>
                </div>
                <div>
                  <p className="font-black text-[13px]">What NOT to carry</p>
                  <ul className="mt-2 space-y-1 text-black/70 list-disc ml-4">
                    <li>Bright colors, white, camouflage military wear</li>
                    <li>Hard suitcase - use soft duffel under 15kg</li>
                    <li>Plastic bags banned in Kenya</li>
                    <li>Heavy perfume - attracts insects</li>
                    <li>High heels, heavy boots</li>
                  </ul>
                </div>
                <div>
                  <p className="font-black text-[13px]">Dress code</p>
                  <p className="mt-2 text-black/70">Light breathable during day, warm layer morning and evening. Long trousers for village visits. Casual evening - no formal wear needed at campfire.</p>
                </div>
                <div>
                  <p className="font-black text-[13px]">Luggage type</p>
                  <p className="mt-2 text-black/70">Soft-sided bag only, max 15kg plus small hand bag. Fits well in 4x4 Land Cruiser. Laundry service available at camp so pack for 3 days only.</p>
                </div>
              </div>
              <p className="mt-6 text-[11px] text-black/40 text-center">Deposit ${dep} reserves your 4x4 Land Cruiser. Balance 7 days before. Account Name MASAI MARA.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
