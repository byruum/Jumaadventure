import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current][setCurrent] = useState(0);
  const [showPay][setShowPay] = useState(false);
  const [textIndex][setTextIndex] = useState(0);

  // FALLBACK IMAGES - until you upload masai-mara-1.jpg to /public
  const fallbackMara = [
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920",
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1920",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1920",
  ];

  const gallery = packageData?.gallery?.length? packageData.gallery : fallbackMara;
  // Filter out broken local images
  const validGallery = gallery.map(g => g.includes("masai-mara-1") || g.includes("masai-mara-2") || g.includes("masai-mara-balloon")? fallbackMara[0] : g);

  useEffect(() => {
    if (!validGallery.length) return;
    const t1 = setInterval(() => setCurrent(p => (p+1) % validGallery.length), 4000);
    const t2 = setInterval(() => setTextIndex(p => (p+1) % 3), 2500);
    return () => { clearInterval(t1); clearInterval(t2); }
  }, [validGallery.length]);

  if (!packageData) return <div className="p-8">Not found</div>;

  const isMara = packageData.id === "masai-mara";
  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "PENDING";
  const paybillAcc = packageData.paybillAcc || "MARAMARA";
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title)} Deposit&amount=${dep}&currency_code=USD`;
  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title)} Full&amount=${full}&currency_code=USD`;

  if (isMara) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen pb-28">
        <div className="relative h-[88vh] bg-black overflow-hidden">
          {validGallery.map((img: string, idx: number) => (
            <img key={idx} src={img} alt="" onError={(e) => (e.currentTarget.src = fallbackMara[0])} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ${idx===current?'opacity-100 scale-105':'opacity-0 scale-100'}`} />
          ))}
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {/* PLAYING WORDS ANIMATION - like home */}
            <p className="text-[#F5B400] font-black tracking-[0.35em] text-[11px] md:text-[13px] animate-word">
              {["MASAI MARA NATIONAL RESERVE","WILDEBEEST MIGRATION • BIG FIVE","ADVENTURE OF A LIFETIME"][textIndex]}
            </p>
            <h1 className="text-white font-black text-[36px] md:text-[68px] leading-[0.9] mt-4 animate-word delay-100">Masai Mara Safari</h1>
            <div className="mt-5 h-[32px] overflow-hidden">
              <p className="bg-[#0B6A2B] text-white px-6 py-2 rounded-full text-[12px] font-bold animate-word delay-200">Kenya&apos;s most iconic wildlife destination</p>
            </div>
            <button onClick={()=>setShowPay(true)} className="mt-8 bg-[#F66E0D] text-white px-8 py-3.5 rounded-full font-black animate-bounceSoft">Pay Now — USD {full} • Deposit ${dep}</button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/60 border-t border-white/10 py-2.5 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-12">
              <span className="text-white/70 text-[10px] tracking-[0.3em]">BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • LIONS • ELEPHANTS • SUNSET GAME DRIVE • MASAI VILLAGE • BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • </span>
              <span className="text-white/70 text-[10px] tracking-[0.3em]">BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • LIONS • ELEPHANTS • SUNSET GAME DRIVE • MASAI VILLAGE • BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.2fr_0.5fr] gap-8 mt-8">
          <div>
            <div className="bg-white rounded-[20px] p-8 border"><h2 className="font-black text-xl">The Journey</h2><p className="text-[14px] text-gray-600 mt-3">{packageData.journey}</p></div>
            <div className="bg-white rounded-[20px] p-8 border mt-6"><h2 className="font-black text-xl">Detailed Itinerary</h2><div className="mt-6 border-l-2 border-[#F5B400]/30 ml-3 pl-8 space-y-8">{packageData.itinerary.map((d:any)=><div key={d.dayNum} className="relative"><div className="absolute -left-[40px] w-7 h-7 bg-[#0B6A2B] rounded-full border-4 border-white text-white text-[11px] font-black flex items-center justify-center">{d.dayNum}</div><div className="bg-[#FAF7F2] rounded-xl p-4 border"><h3 className="font-black text-[14px]">Day {d.dayNum}: {d.title}</h3><ul className="mt-3">{d.details.map((x:string,i:number)=><li key={i} className="text-[13px]">• {x}</li>)}</ul></div></div>)}</div></div>
          </div>
          <div className="md:sticky md:top-24 h-fit"><div className="bg-white rounded-[20px] p-6 shadow-xl border"><p className="text-4xl font-black">USD {full}</p><button onClick={()=>setShowPay(true)} className="w-full mt-5 bg-[#F66E0D] text-white py-4 rounded-full font-black">Pay Now</button></div></div>
        </div>

        {showPay && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-[24px] p-6">
              <div className="flex justify-between"><h3 className="font-black">Pay Now</h3><button onClick={()=>setShowPay(false)} className="w-8 h-8 bg-gray-100 rounded-full">✕</button></div>
              <a href={paypalDep} target="_blank" rel="noreferrer" className="block mt-5 bg-[#F5B400] text-black text-center py-4 rounded-full font-black">Secure ${dep} via PayPal</a>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-black text-white text-center py-3.5 rounded-full font-bold text-[13px]">PayPal Full ${full}</a>
                <div className="bg-[#0B6A2B] text-white text-center py-3.5 rounded-full font-bold text-[13px]">M-Pesa {paybillNo}</div>
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes wordIn{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}}
         .animate-word{animation:wordIn 0.7s ease both}
         .delay-100{animation-delay:0.1s}.delay-200{animation-delay:0.2s}
          @keyframes bounceSoft{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
         .animate-bounceSoft{animation:bounceSoft 2s ease-in-out infinite}
          @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
         .animate-marquee{animation:marquee 18s linear infinite; width:max-content}
        `}</style>
      </div>
    )
  }
  return <div className="p-8">Package: {packageData.title}</div>
}
