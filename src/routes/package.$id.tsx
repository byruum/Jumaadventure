import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  loader: ({ params }) => ({ packageData: getPackage(params.id) }),
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current, setCurrent] = useState(0);
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    if (!packageData?.gallery?.length) return;
    const id = setInterval(() => setCurrent(p => (p+1) % packageData.gallery.length), 4000);
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
        <div className="relative h-[78vh] bg-black overflow-hidden">
          {packageData.gallery.map((img: string, idx: number) => (
            <img key={idx} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ${idx===current?'opacity-100':'opacity-0'}`} alt="" />
          ))}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute top-[64px] left-0 right-0 bg-black/70 border-y border-[#F5B400]/30">
            <div className="overflow-hidden whitespace-nowrap py-2">
              <p className="animate-marquee inline-block text-[#F5B400] text-[10px] tracking-[0.3em] font-bold">
                MASAI MARA SAFARI • BIG FIVE • GREAT MIGRATION • HOT AIR BALLOON • LIONS • ELEPHANTS • SUNSET GAME DRIVE • MASAI VILLAGE • MASAI MARA SAFARI • BIG FIVE • GREAT MIGRATION •
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
              <span className="bg-[#F5B400] text-black text-[10px] font-black px-3 py-1 rounded-full">{packageData.from.toUpperCase()}</span>
              <h1 className="text-white text-[42px] md:text-[64px] font-black leading-[0.9] mt-4">{packageData.title}</h1>
              <p className="text-white/80 mt-3 max-w-xl text-[15px]">{packageData.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.2fr_0.5fr] gap-8 mt-8">
          <div>
            <div className="bg-white rounded-[20px] p-6 md:p-8 border shadow-sm">
              <h2 className="font-black text-xl">The Journey</h2>
              <p className="text-gray-600 text-[14px] leading-6 mt-3">{packageData.journey}</p>
            </div>

            <div className="bg-white rounded-[20px] p-6 md:p-8 border shadow-sm mt-6">
              <h2 className="font-black text-xl mb-1">Detailed Itinerary</h2>
              <p className="text-[12px] text-gray-400 mb-6">Your day-by-day experience in Masai Mara</p>
              <div className="relative border-l-2 border-[#F5B400]/30 ml-4 pl-8 space-y-10">
                {packageData.itinerary.map((day) => (
                  <div key={day.dayNum} className="relative">
                    <div className="absolute -left-[42px] top-0 w-7 h-7 bg-[#0B6A2B] rounded-full border-4 border-white shadow flex items-center justify-center text-[11px] text-white font-black">{day.dayNum}</div>
                    <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#F5B400]/20">
                      <div className="flex justify-between items-center">
                        <h3 className="font-black text-[15px]">Day {day.dayNum}: {day.title}</h3>
                        <span className="bg-black text-white text-[10px] px-2.5 py-1 rounded-full">{day.meals || 'Meals included'}</span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {day.details.map((d: string, j: number) => (
                          <li key={j} className="text-[13px] text-gray-700 flex gap-3">
                            <span className="w-5 h-5 bg-[#F5B400] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
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
              <p className="text-[11px] tracking-widest font-bold text-gray-400">FROM</p>
              <p className="text-4xl font-black">USD {full}</p>
              <p className="text-[12px] text-gray-500">Deposit USD {dep} secures slot</p>
              <button onClick={()=>setShowPay(true)} className="w-full mt-5 bg-[#F66E0D] text-white py-4 rounded-full font-black">Pay Now — Choose Method</button>
              <div className="mt-4 text-[11px] text-gray-500 text-center">PayPal: {paypalEmail}<br/>Paybill: {paybillNo} Acc: {paybillAcc}</div>
            </div>
          </div>
        </div>

        {showPay && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[420px] rounded-[24px] p-6">
              <div className="flex justify-between"><h3 className="font-black text-lg">Pay Now</h3><button onClick={()=>setShowPay(false)} className="w-8 h-8 bg-gray-100 rounded-full">✕</button></div>
              <a href={paypalDep} target="_blank" rel="noreferrer" className="block mt-5 bg-[#F5B400] text-black text-center py-4 rounded-full font-black">Secure with ${dep} Deposit via PayPal</a>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-black text-white text-center py-3.5 rounded-full font-bold text-[13px]">PayPal Full ${full}</a>
                <div className="bg-[#0B6A2B] text-white text-center py-3.5 rounded-full font-bold text-[13px]">M-Pesa<br/><span className="text-[10px]">{paybillNo}</span></div>
              </div>
              <div className="mt-4 bg-[#FAF7F2] border rounded-xl p-3 text-[11px]"><p className="font-bold">M-Pesa Direct:</p><p>Paybill <b>{paybillNo}</b> Acc <b>{paybillAcc}</b> Amount <b>${dep}</b></p></div>
            </div>
          </div>
        )}

        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation:marquee 20s linear infinite; padding-left:100%}`}</style>
      </div>
    )
  }

  return <div className="p-8">Other package old design</div>
}
