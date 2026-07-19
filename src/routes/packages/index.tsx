import { Link, createFileRoute } from "@tanstack/react-router";
import { packages } from "../../lib/packages";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="eyebrow text-primary">Our Tour Packages</span>
        <h1 className="text-4xl font-bold mt-2">Choose your next Kenyan adventure</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          From wildlife safaris to mountain treks and coastal escapes – pick a package below
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((p) => (
          <Link
            key={p.id}
            to="/package/$id"
            params={{ id: p.id }}
            className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={p.gallery[0]} 
                alt={p.title} 
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold group-hover:text-primary">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">📍 {p.from} → {p.to}</p>
              <p className="text-sm text-gray-600">⏱️ {p.duration} | 👥 {p.groupSize}</p>
              <p className="text-2xl font-bold text-orange-500 mt-3">From USD {p.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Custom Package CTA */}
      <div className="mt-16 text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-10 text-white">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-3xl font-bold mb-3">Want a Customized Safari Package?</h2>
        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
          Tell us your dream Kenyan adventure. We'll craft a personalized itinerary just for you, 
          your family, or your group with the best rates and experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* WhatsApp Button - CHANGE YOUR NUMBER HERE */}
          <a
            href="https://wa.me/254746011254?text=Hello%20Juma%20Adventures!%20I%20would%20like%20a%20customized%20tour%20package.%20My%20preferred%20destinations%20are:"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            💬 Chat on WhatsApp
          </a>

          {/* Email Button - CHANGE YOUR EMAIL HERE */}
<a
  href="mailto:jumaadventuresandsafaris@gmail.com?subject=Custom%20Tour%20Package%20Request&body=Hello%20Juma%20Adventures,"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-xl font-bold text-lg transition"
>
  ✉️ Email Us
</a>
        </div>
        
        <p className="text-sm mt-4 opacity-80">Response within 2 hours • No obligation</p>
      </div>
    </div>
  );
}
