import { createFileRoute } from '@tanstack/react-router'
import { getPackage, WHATSAPP_NUMBER } from "../lib/packages";
import { useState } from "react";
import { ReviewsSection } from "../components/reviews";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [showBooking][setShowBooking] = useState(false);
  const [sending][setSending] = useState(false);
  const [sent][setSent] = useState(false);
  const [party][setParty] = useState(1);
  const [tourDate][setTourDate] = useState("");
  const [startTime][setStartTime] = useState("08:00");
  const [form][setForm] = useState({ name:"", guests:"2 Persons", date:"", inquiry:"", email:"", whatsapp:"" });
  const [activeIdx][setActiveIdx] = useState(0);

  if (!packageData) return <div className="p-8 text-center">Package not found</div>;

  const gallery = Array.from(new Set(packageData.gallery?.length? packageData.gallery : ["/og-image.png"]));
  const heroImg = gallery[activeIdx] || gallery[0];
  const full = packageData.price;
  const dep = packageData.deposit || "200";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Deposit")}&amount=${dep}&currency_code=USD&no_shipping=1`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title + " Full")}&amount=${full}&currency_code=USD&no_shipping=1`;

  const next = () => setActiveIdx(i => (i + 1) % gallery.length);
  const prev = () => setActiveIdx(i => (i - 1 + gallery.length) % gallery.length);

  const isDayTrip = packageData.days === 1 || packageData.duration?.toLowerCase().includes("1 day") || packageData.title.toLowerCase().includes("day trip");

  // FIXED: Use client new cancellation policy from packages.ts - NO WHATSAPP LINK
  const cancellationPolicy = packageData.cancellationPolicy || "";

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
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white bg-black/30 text-white flex items-center justify-center text-xl z-10">‹</button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-white bg-black/30 text-white flex items-center justify-center text-xl z-10">›</button>
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
            <img key={i} src={img} alt={`gal ${i}`} onClick={()=>setActiveIdx(i)} className={`w-[200px] md:w-[280px] h-[130px] md:h-[180px] object-cover rounded-[12px] flex-shrink-0 snap-start border-2 cursor-pointer ${i===activeIdx? "border-black" : "border-transparent"}`} />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-8 grid md:grid-cols-[1.3fr_0.7fr] gap-8">
        <div className="order-2 md:order-1 space-y-6">
          <div className="bg-white rounded-[20px] p-6 border">
            <p className="text-[11px] font-black tracking-widest text-[#0B6A2B]">FULL AMOUNT ${full} • {packageData.duration} {isDayTrip? "• DAY TRIP ONLY" : ""}</p>
            <p className="mt-3 text-[14px] leading-6 text-black/70">{packageData.journey}</p>
            <h3 className="mt-5 font-black text-[14px]">Highlights</h3>
            <ul className="mt-2 list-disc ml-5 text-[13px] space-y-1">{packageData.highlights.map((h:any,i:number)=><li key={i}>{h}</li>)}</ul>
          </div>

          <div className="bg-white rounded-[20px] p-6 border">
            <h3 className="font-black text-[18px]">Itinerary</h3>
            <div className="mt-4 space-y-5">
              {packageData.itinerary.map((it:any, idx:number)=>{
                const titleLower = it.title.toLowerCase();
                const isMorningAfternoon = titleLower.includes('morning') || titleLower.includes('afternoon');
                return (
                  <div key={`${it.dayNum}-${idx}`} className="border-l-4 border-[#0B6A2B] pl-4 py-1">
                    <p className="font-black text-[#F66E0D] text-[10px]">
                      {isMorningAfternoon? it.title.toUpperCase() : `DAY ${it.dayNum}`}
