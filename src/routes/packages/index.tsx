import { Link, createFileRoute } from "@tanstack/react-router";
import { packages } from "../../lib/packages";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="eyebrow text-primary">Our Tour Packages</span>
        <h1 className="text-4xl font-bold mt-2">Choose your next Kenyan adventure</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          From wildlife safaris to mountain treks and coastal escapes – pick a package below
        </p>
      </div>

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
    </div>
  );
}
