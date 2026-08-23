import { createFileRoute } from '@tanstack/react-router'
import { getPackage } from "../lib/packages";

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
  
  if (!packageData) {
    return <div className="p-8 text-center">Package not found: {window.location.pathname}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pb-24 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {(packageData.gallery ?? []).map((img: string, i: number) => (
          <img key={i} src={img} alt={packageData.title} className="w-full h-48 object-cover rounded-lg" />
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
      <p className="text-gray-600 mb-4">{packageData.subtitle}</p>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">The Journey</h2>
        <p className="whitespace-pre-line text-gray-700">{packageData.journey ?? ''}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Highlights</h2>
        <ul className="space-y-2">
          {(packageData.highlights ?? []).map((h: string, i: number) => (
            <li key={i}>✓ {h}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Itinerary</h2>
        {(packageData.itinerary ?? []).map((day: any) => (
          <div key={day.dayNum} className="border p-4 rounded-lg mb-3">
            <h3 className="font-bold">Day {day.dayNum}: {day.title}</h3>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {(day.details ?? []).map((d: string, i: number) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold mb-2 text-green-700">What's Included</h3>
          <ul className="space-y-1">{(packageData.includes ?? []).map((i: string, idx: number) => <li key={idx}>✓ {i}</li>)}</ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-red-700">What's Excluded</h3>
          <ul className="space-y-1">{(packageData.excludes ?? []).map((e: string, idx: number) => <li key={idx}>✗ {e}</li>)}</ul>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center border-t z-30">
        <div>
          <p className="text-sm text-gray-500">From</p>
          <p className="text-2xl font-bold">USD {packageData.price}</p>
        </div>
        <button onClick={() => window.location.href='/contact'} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold">
          Book Now
        </button>
      </div>
    </div>
  );
}
