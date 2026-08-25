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
    const id = setInterval(() => setCurrent((p) => (p + 1) % packageData.gallery.length), 4000);
    return () => clearInterval(id);
  }, [packageData]);

  if (!packageData) return <div className="p-8 text-center">Not found</div>;

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
        {/* HERO - EXACT SAME AS HOME jumaadventures.co.ke */}
        <div className="relative h-[84vh] bg-black overflow-hidden">
          {packageData.gallery.map((img: string, idx: number) => (
            <img key={idx} src={img} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ${idx===current?'opacity-100 scale-105':'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* CENTERED 3-LINE LYRICS - SAME AS HOME HERO */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[#F5B400] font-black tracking-[0.35em] text-[11px] md:text-[13px]">MASAI MARA NATIONAL RESERVE</p>
            <h1 className="text-white font-black text-[38px] md:text-[68px] leading-[0.9] mt-4">Masai Mara Safari</h1>
            <p className="mt-5 bg-[#0B6A2B] text-white px-6 py-2 rounded-full text-[12px] md:text-[14px] font-bold">Kenya&apos;s most iconic wildlife destination</p>
            <button onClick={()=>setShowPay(true)} className="mt-8 bg-[#F66E0D] text-white px-8 py-3.5 rounded-full font-black text-sm">Pay Now — USD {full} • Deposit ${dep}</button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/40 border-t border-white/10 py-2 overflow-hidden">
            <p className="animate-marquee whitespace-nowrap text-white/50 text-[10px] tracking-[0.25em]">BIG FIVE • GREAT MIGRATION • BALLOON SAFARI • LIONS • ELEPHANTS • SUNSET GAME DRIVE • MASAI VILLAGE • </p>
          </div>
        </div>

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
                {packageData.itinerary.map((day) => (
                  <div key={day.dayNum} className="relative">
                    <div className="absolute -left-[40px] w-7 h-7 bg-[#0B6A2B] rounded-full border-4 border-white shadow text-white text-[11px] font-black flex items-center justify-center">{day.dayNum}</div>
                    <div className="bg-[#FAF7F2] rounded-xl p-4 border">
                      <div className="flex justify-between gap-2"><h3 className="font-black text-[14px]">Day {day.dayNum}: {day.title}</h3><span className="bg-black text-white text-[10px] px-2 py-1 rounded-full shrink-0">{day.meals}</span></div>
                      <ul className="mt-3 space-y-2">{day.details.map((d:string,j:number)=><li key={j} className="text-[13px] text-gray-700 flex gap-2"><span className="text-[#F5B400]">•</span>{d}</li>)}</ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 border"><h4 className="font-bold text-green-700 text-sm">Included</h4><ul className="text-[12px] mt-2 space-y-1">{packageData.includes.map((x:string,i:number)=><li key={i}>✓ {x}</li>)}</ul></div>
              <div className="bg-white rounded-xl p-4 border"><h4 className="font-bold text-red-700 text-sm">Excluded</h4><ul className="text-[12px] mt-2 space-y-1">{packageData.excludes.map((x:string,i:number)=><li key={i}>✗ {x}</li>)}</ul></div>
            </div>
          </div>

          <div className="md:sticky md:top-24 h-fit">
            <div className="bg-white rounded-[20px] p-6 shadow-xl border">
              <p className="text-[10px] tracking-widest font-bold text-gray-400">FROM</p>
              <p className="text-4xl font-black">USD {full}</p>
              <p className="text-[12px] text-gray-500">Deposit USD {dep} secures slot</p>
              <button onClick={()=>setShowPay(true)} className="w-full mt-5 bg-[#F66E0D] text-white py-4 rounded-full font-black">Pay Now — Choose Method</button>
            </div>
          </div>
        </div>

        {showPay && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-[24px] p-6">
              <div className="flex justify-between items-center"><h3 className="font-black text-lg">Pay Now</h3><button onClick={()=>setShowPay(false)} className="w-8 h-8 bg-gray-100 rounded-full">✕</button></div>
              <a href={paypalDep} target="_blank" rel="noreferrer" className="block mt-5 bg-[#F5B400] text-black text-center py-4 rounded-full font-black">Secure with ${dep} Deposit via PayPal</a>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-black text-white text-center py-3.5 rounded-full font-bold text-[13px]">PayPal Full ${full}</a>
                <div className="bg-[#0B6A2B] text-white text-center py-3.5 rounded-full font-bold text-[13px]">M-Pesa<br/><span className="text-[10px]">Paybill {paybillNo}</span></div>
              </div>
              <div className="mt-4 bg-[#FAF7F2] border rounded-xl p-3 text-[11px]"><p className="font-bold">M-Pesa Direct:</p><p>Paybill <b>{paybillNo}</b> Acc <b>{paybillAcc}</b> Amount <b>${dep}</b></p><p className="text-[10px] text-gray-500 mt-1">PayPal: {paypalEmail}</p></div>
            </div>
          </div>
        )}

        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation:marquee 20s linear infinite; padding-left:100%}`}</style>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pb-24 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">{(packageData.gallery?? []).map((img:string,i:number)=><img key={i} src={img} alt={packageData.title} className="w-full h-48 object-cover rounded-lg" />)}</div>
      <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
      <p className="text-gray-600 mb-4">{packageData.subtitle}</p>
      <p className="whitespace-pre-line text-gray-700 mb-6">{packageData.journey}</p>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center border-t z-30"><div><p className="text-sm text-gray-500">From</p><p className="text-2xl font-bold">USD {packageData.price}</p></div><button onClick={() => window.location.href='/contact'} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold">Book Now</button></div>
    </div>
  );
}
