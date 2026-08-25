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

  useEffect(() => {
    if (!packageData?.gallery?.length) return;
    const i = setInterval(() => setCurrent(p => (p+1) % packageData.gallery.length), 4000);
    return () => clearInterval(i);
  }, [packageData]);

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
        {/* HERO - EXACT SAME AS HOME PAGE jumaadventures.co.ke */}
        <div className="relative h-[82vh] bg-black overflow-hidden">
          {packageData.gallery.map((img: string, idx: number) => (
            <img key={idx} src={img} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${idx===current?'opacity-100 scale-105':'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* LYRICS - SAME STYLE, VERSION, FORMAT AS HOME HERO */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[#F5B400] font-black tracking-[0.35em] text-[11px] md:text-[13px] animate-fadeUp">MASAI MARA NATIONAL RESERVE</p>
            <h1 className="text-white font-black text-[38px] md:text-[72px] leading-[0.9] mt-4 animate-fadeUp delay-100">Masai Mara Safari</h1>
            <p className="mt-5 bg-[#0B6A2B]/90 backdrop-blur text-white px-5 py-2 rounded-full text-[12px] md:text-[14px] font-bold tracking-wide animate-fadeUp delay-200">Kenya's most iconic wildlife destination</p>
            <div className="mt-8 flex gap-3 animate-fadeUp delay-300">
              <button onClick={()=>setShowPay(true)} className="bg-[#F66E0D] text-white px-8 py-3.5 rounded-full font-black text-sm">Book Now — USD {full}</button>
              <div className="bg-white/10 backdrop-blur border border-white/20 text-white px-5 py-3.5 rounded-full text-sm font-bold">{packageData.days} Days • Deposit ${dep}</div>
            </div>
          </div>

          {/* Small ticker bottom like home */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 border-t border-white/10 py-2 overflow-hidden">
            <p className="animate-marquee whitespace-nowrap text-white/60 text-[10px] tracking-[0.25em]">BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • LIONS • ELEPHANTS • SUNSET GAME DRIVES • MASAI VILLAGE • </p>
          </div>
        </div>

        {/* PROFESSIONAL ITINERARY */}
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.2fr_0.5fr] gap-8 mt-10">
          <div>
            <div className="bg-white rounded-[20px] p-8 border shadow-sm">
              <h2 className="font-black text-xl">The Journey</h2>
              <p className="text-[14px] text-gray-600 mt-3 leading-6">{packageData.journey}</p>
              <div className="mt-6 flex flex-wrap gap-2">{packageData.highlights.map((h:string,i:number)=><span key={i} className="bg-[#FAF7F2] border text-[11px] font-bold px-3 py-1.5 rounded-full">✓ {h}</span>)}</div>
            </div>

            <div className="bg-white rounded-[20px] p-8 border shadow-sm mt-6">
              <h2 className="font-black text-xl">Detailed Itinerary</h2>
              <div className="mt-6 relative border-l-2 border-[#F5B400]/30 ml-3 pl-8 space-y-8">
                {packageData.itinerary.map((d) => (
                  <div key={d.dayNum} className="relative">
                    <div className="absolute -left-[40px] w-7 h-7 bg-[#0B6A2B] rounded-full border-4 border-white shadow text-white text-[11px] font-black flex items-center justify-center">{d.dayNum}</div>
                    <div className="bg-[#FAF7F2] rounded-xl p-4 border">
                      <div className="flex justify-between"><h3 className="font-black text-[14px]">Day {d.dayNum}: {d.title}</h3><span className="bg-black text-white text-[10px] px-2 py-1 rounded-full">{d.meals}</span></div>
                      <ul className="mt-3 space-y-2">{d.details.map((x:string,i:number)=><li key={i} className="text-[13px] text-gray-700 flex gap-2"><span className="text-[#F5B400] font-bold">•</span>{x}</li>)}</ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:sticky md:top-24 h-fit">
            <div className="bg-white rounded-[20px] p-6 shadow-xl border">
              <p className="text-[10px] tracking-widest font-bold text-gray-400">FROM</p>
              <p className="text-4xl font-black">USD {full}</p>
              <button onClick={()=>setShowPay(true)} className="w-full mt-5 bg-[#F66E0D] text-white py-4 rounded-full font-black">Pay Now</button>
              <p className="text-[11px] text-center text-gray-400 mt-2">M-Pesa & PayPal options</p>
            </div>
          </div>
        </div>

        {showPay && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-[24px] p-6">
              <div className="flex justify-between"><h3 className="font-black">Pay Now</h3><button onClick={()=>setShowPay(false)} className="w-8 h-8 bg-gray-100 rounded-full">✕</button></div>
              <a href={paypalDep} target="_blank" rel="noreferrer" className="block mt-5 bg-[#F5B400] text-black text-center py-4 rounded-full font-black">Secure with ${dep} Deposit via PayPal</a>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-black text-white text-center py-3.5 rounded-full font-bold text-[13px]">PayPal Full ${full}</a>
                <div className="bg-[#0B6A2B] text-white text-center py-3.5 rounded-full font-bold text-[13px]">M-Pesa<br/><span className="text-[10px]">Paybill {paybillNo} • {paybillAcc}</span></div>
              </div>
              <p className="text-[10px] text-center text-gray-500 mt-3">PayPal: {paypalEmail} — Paybill goes direct</p>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
         .animate-fadeUp{animation:fadeUp 0.8s ease both}
         .delay-100{animation-delay:0.1s}.delay-200{animation-delay:0.2s}.delay-300{animation-delay:0.3s}
          @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
         .animate-marquee{animation:marquee 20s linear infinite; padding-left:100%}
        `}</style>
      </div>
    )
  }

  return <div className="p-8">Package: {packageData.title}</div>
}
