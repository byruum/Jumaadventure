import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { getPackage } from "../../packages"

export const Route = createFileRoute('/package/$id')({
  component: PackageDetailPage,
})

function PackageDetailPage() {
  const { id } = useParams({ from: '/package/$id' })
  const pkg = getPackage(id)

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Package not found</h1>
        <Link to="/" className="text-orange-500">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={pkg.gallery[0]} alt={pkg.title} className="w-full h-96 object-cover rounded-xl mb-6"/>
      
      <h1 className="text-4xl font-bold">{pkg.title}</h1>
      <p className="text-gray-600 mt-2">📍 {pkg.from} → {pkg.to}</p>
      
      <div className="flex gap-4 my-4 text-sm">
        <span>⏱️ {pkg.duration}</span>
        <span>👥 {pkg.groupSize}</span>
        <span>★★★ {pkg.rating}</span>
      </div>

      <p className="text-3xl font-bold text-orange-500 mb-6">From USD {pkg.price}</p>
      
      <h2 className="text-2xl font-bold mb-3">What's Included</h2>
      <ul className="list-disc pl-5 mb-6">
        {pkg.included.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2 className="text-2xl font-bold mb-3">Itinerary</h2>
      {pkg.itinerary.map((day) => (
        <div key={day.day} className="mb-4 p-4 border rounded-lg">
          <h3 className="font-bold">Day {day.day}: {day.title}</h3>
          <p className="text-gray-600">{day.description}</p>
        </div>
      ))}
    </div>
  )
}
