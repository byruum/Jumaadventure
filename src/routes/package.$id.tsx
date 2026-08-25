import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";
import { useState, useEffect } from "react";

export const Route = createFileRoute('/package/$id')({
  component: PackagePage,
  errorComponent: ({ error }) => (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold">Couldn't load this tour</h2>
      <p className="text-sm text-red-500 mt-2">{String(error)}</p>
      <button onClick={()=>window.location.href='/'} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Home</button>
    </div>
  ),
  loader: ({ params }) => {
    return { packageData: getPackage(params.id) }
  },
})

function PackagePage() {
  const { packageData } = Route.useLoaderData()
  const [current, setCurrent] = useState(0);
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    if (!packageData?.gallery?.length) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % packageData.gallery.length), 3500);
    return () => clearInterval(id);
  }, [packageData]);

  if (!packageData) {
    return <div className="p-8 text-center">Package not found: {window.location.pathname}</div>;
  }

  const isMara = packageData.id === "masai-mara";
  const full = packageData.price || "1500";
  const dep = packageData.deposit || "500";
  const paypalEmail = packageData.paypalEmail || "jumaadventuresandsafaris@gmail.com";
  const paybillNo = packageData.paybillNo || "PENDING";
  const paybillAcc = packageData.paybillAcc || "MARAMARA";

  const paypalFull = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title)} Full&amount=${full}&currency_code=USD`;
  const paypalDep = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${paypalEmail}&item_name=${encodeURIComponent(packageData.title)} Deposit&amount=${dep}&currency_code=USD`;

  if (isMara) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="relative h-[60vh] overflow-hidden bg-black">
          {packageData.gallery.map((img: string, idx: number) => (
            <img key={idx} src={img} alt={packageData.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[4000ms] ${idx===current? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="overflow-hidden bg-[#F5B400] rounded-full py-1">
              <p className="animate-marquee whitespace-nowrap font-black text-black text-[11px] tracking-[0.2em]">
                {packageData.title.toUpperCase()} • BIG FIVE • MIGRATION • BALLOON • {packageData.highlights.join(" • ").toUpperCase()} •
              </p>
            </div>
            <h1 className="text-white font-black text-4xl mt-3 leading-none">{packageData.title}</h1>
            <p className="bg-[#0B6A2B] inline-block text-white px-3 py-1 rounded-full font-bold text-sm mt-2">{packageData.subtitle}</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-4">
          <h2 className="text-xl font-bold mt-2">The Journey</h2>
          <p className="text-sm text-gray-600 mt-1">{packageData.journey}</p>
          <h2 className="text-xl font-bold mt-6">Highlights</h2>
          <ul className="mt-2 text-sm space-y-1">{packageData.highlights.map((h: string, i: number)=><li key={i}>✓ {h}</li>)}</ul>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-between items-center border-t z-30">
          <div><p className="text-[10px] text-gray-500">From USD {full} • Deposit ${dep}</p><p className="font-black text-xl">USD {full}</p></div>
          <button onClick={()=>setShowPay(true)} className="bg-[#F66E0D] text-white px-7 py-3 rounded-full font-black">Book Now</button>
        </div>

        {showPay && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
            <div className="bg-white w-full max-w-md rounded-t-[24px] p-5">
              <div className="flex justify-between items-center"><h3 className="font-black text-lg">Pay Now</h3><button onClick={()=>setShowPay(false)} className="bg-gray-100 w-8 h-8 rounded-full">✕</button></div>
              <p className="text-xs text-gray-500">Total ${full} • Secure with ${dep} deposit</p>
              <a href={paypalDep} target="_blank" rel="noreferrer" className="block mt-4 bg-[#F5B400] text-black text-center py-4 rounded-full font-black">Secure with ${dep} Deposit via PayPal</a>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <a href={paypalFull} target="_blank" rel="noreferrer" className="bg-black text-white text-center py-3 rounded-full font-bold text-sm">PayPal Full ${full}</a>
                <div className="bg-[#0B6A2B] text-white text-center py-3 rounded-full font-bold text-sm">Paybill {paybillNo}<br/><span className="text-[10px]">Acc {paybillAcc}</span></div>
              </div>
              <div className="bg-gray-100 p-3 rounded-xl mt-4 text-[11px]"><p className="font-bold">M-Pesa (Money goes direct):</p><p>Paybill: <b>{paybillNo}</b> • Acc: <b>{paybillAcc}</b></p><p className="mt-1 text-gray-500">PayPal: {paypalEmail}</p></div>
            </div>
          </div>
        )}
        <style>{`@keyframes marquee{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.animate-marquee{animation:marquee 10s linear infinite}`}</style>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pb-24 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {(packageData.gallery?? []).map((img: string, i: number) => (
          <img key={i} src={img} alt={packageData.title} className="w-full h-48 object-cover rounded-lg" />
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
      <p className="text-gray-600 mb-4">{packageData.subtitle}</p>
      <div className="mb-6"><h2 className="text-2xl font-bold mb-3">The Journey</h2><p className="whitespace-pre-line text-gray-700">{packageData.journey?? ''}</p></div>
      <div className="mb-6"><h2 className="text-2xl font-bold mb-3">Highlights</h2><ul className="space-y-2">{(packageData.highlights?? []).map((h: string, i: number) => (<li key={i}>✓ {h}</li>))}</ul></div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Itinerary</h2>
        {(packageData.itinerary?? []).map((day) => (
          <div key={day.dayNum} className="border p-4 rounded-lg mb-3">
            <h3 className="font-bold">Day {day.dayNum}: {day.title}</h3>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {(day.details?? []).map((d: string, idx: number) => <li key={idx}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6"><div><h3 className="font-bold mb-2 text-green-700">What's Included</h3><ul className="space-y-1">{(packageData.includes?? []).map((item: string, idx: number) => <li key={idx}>✓ {item}</li>)}</ul></div><div><h3 className="font-bold mb-2 text-red-700">What's Excluded</h3><ul className="space-y-1">{(packageData.excludes?? []).map((ex: string, idx: number) => <li key={idx}>✗ {ex}</li>)}</ul></div></div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center border-t z-30"><div><p className="text-sm text-gray-500">From</p><p className="text-2xl font-bold">USD {packageData.price}</p></div><button onClick={() => window.location.href='/contact'} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold">Book Now</button></div>
    </div>
  );
}
