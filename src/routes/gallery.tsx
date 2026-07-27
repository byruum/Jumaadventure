import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Juma Adventures" },
      { name: "description", content: "Real photos from Juma Adventures tours across Kenya — wildlife, mountains, culture and coastal experiences." },
      { property: "og:title", content: "Gallery — Juma Adventures" },
      { property: "og:description", content: "Real moments captured on tour with Juma Adventures." },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: "/Diani.png.jpg", label: "Diani Beach" },
  { src: "/IMG-20260111-WA0016.jpg", label: "Mount Kenya adventure" },
  { src: "/IMG-20260115-WA0073(1).jpg", label: "Point Lenana summit" },
  { src: "/IMG-20260726-WA0718.jpg", label: "Mount Kenya day hike" },
  { src: "/Nairobi National Park-Wildlife roaming freely just .jpg", label: "Nairobi city tour" },
  { src: "/lake-nakuru-national-park-1.jpg", label: "Lake Nakuru Safari" },
  { src: "/masai-mara-national-reserve (1).jpg", label: "Masai Mara Reserve" },
  { src: "/mount-Kenya-day-trip-hike.jpg", label: "Mount Kenya day hike" },
  { src: "/mt.kenya.jpg", label: "Point Lenana summit" },
  { src: "/hero-safari.png", label: "Masai Mara game drive" },
];

function GalleryPage() {
  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20 text-center">
          <span className="eyebrow text-primary">Gallery</span>
          <h1 className="mt-3 text-5xl font-bold">Real moments from real journeys</h1>
          <p className="mx-auto mt-4 max-w-xl opacity-85">
            Every image was taken by Juma Adventures during real safaris across Kenya.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-page columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {photos.map((p) => (
            <figure key={p.src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.src} alt={p.label} className="w-full" loading="lazy" />
              <figcaption className="px-4 py-3 text-sm text-muted-foreground">{p.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
