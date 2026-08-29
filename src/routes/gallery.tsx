import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Juma Adventures" },
      { name: "description", content: "Real photos from Juma Adventures tours across Kenya" },
    ],
  }),
  component: GalleryPage,
});

type Post = { id: number; name: string; caption: string; image_url: string; created_at: string }

// FIXED: 1 photo = 1 name, no duplicate van photos
const allImages = [
  { src: "/Diani.png.jpg", tour: "Diani Beach" },
  { src: "/lake-nakuru-national-park-1.jpg", tour: "Lake Nakuru" },
  { src: "/IMG-20260827-WA6138.jpg", tour: "Lake Nakuru" },

  { src: "/masai-mara-national-reserve (1).jpg", tour: "Masai Mara" },
  { src: "/IMG-20260827-WA8769.jpg", tour: "Masai Mara" },

  { src: "/IMG-20260827-WA3138.jpg", tour: "Masai Mara Plains" },
  { src: "/IMG-20260827-WA7065.jpg", tour: "Masai Mara Plains" },
  { src: "/IMG-20260827-WA9899.jpg", tour: "Masai Mara Plains" },

  { src: "/hero-safari.png", tour: "Ol Pejeta Conservancy, Nanyuki" },
  { src: "/IMG-20260827-WA1621.jpg", tour: "Ol Pejeta Conservancy, Nanyuki" },

  { src: "/mt.kenya.jpg", tour: "Kilimanjaro Peak" },
  { src: "/IMG-20260726-WA7365.jpg", tour: "Amboseli - Kilimanjaro Views" },

  { src: "/IMG-20260111-WA0016.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA0302.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA2498.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA3807.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA4103.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA5967.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260827-WA7107.jpg", tour: "Mount Kenya" },
];

function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => { fetchPosts(); }, []);
  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("gallery").upload(fileName, file);
    if (error) { alert(error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
    await supabase.from("posts").insert({ name: "Juma Adventures", caption: file.name, image_url: publicUrl });
    alert("Uploaded!");
    fetchPosts();
    setUploading(false);
  };

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-16 text-center">
          <span className="eyebrow text-primary">Gallery</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Real moments from real journeys</h1>
          <p className="mt-3 text-muted-foreground">{allImages.length} photos — tap to view</p>
        </div>
      </section>
      <section className="section">
        <div className="container-page">
          <div className="mb-8 text-center">
            <label className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl cursor-pointer font-bold">
              {uploading? "Uploading..." : "+ Upload Photo"}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          <h2 className="text-2xl font-bold mb-6">New Uploads</h2>
          {loading? <p>Loading...</p> : posts.length === 0? <p className="text-muted-foreground mb-10">No uploads yet.</p> :
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
              {posts.map(p => (
                <div key={p.id} className="group h-[200px] rounded-2xl overflow-hidden cursor-pointer bg-black/5 border" onClick={() => setActive(p.image_url)}>
                  <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" alt="" onError={(e) => (e.currentTarget.src = "/hero-safari.png")} />
                </div>
              ))}
            </div>
          }
          <h2 className="text-2xl font-bold mb-6">Tour Gallery — {allImages.length} Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allImages.map((item, i) => (
              <div key={i} className="group relative h-[180px] md:h-[220px] rounded-2xl overflow-hidden cursor-pointer bg-black/5 border" onClick={() => setActive(item.src)}>
                <img src={encodeURI(item.src)} alt={item.tour} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" onError={(e) => (e.currentTarget.src = "/hero-safari.png")} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-[10px] font-bold truncate">{item.tour}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {active && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <img src={encodeURI(active)} className="max-h-[90vh] max-w-[95vw] object-contain rounded-xl" alt="" />
        </div>
      )}
    </>
  );
}
