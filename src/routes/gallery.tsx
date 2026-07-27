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

type Post = {
  id: number
  name: string
  caption: string
  image_url: string
  created_at: string
}

const fixedPhotos = [
  { src: "/Diani.png.jpg", label: "Diani Beach" },
  { src: "/IMG-20260111-WA0016.jpg", label: "Mount Kenya adventure" },
  { src: "/IMG-20260115-WA0073(1).jpg", label: "Point Lenana summit" },
  { src: "/IMG-20260726-WA0718.jpg", label: "Mount Kenya day hike" },
  { src: "/Nairobi National Park-Wildlife roaming freely just.jpg", label: "Nairobi city tour" },
  { src: "/lake-nakuru-national-park-1.jpg", label: "Lake Nakuru Safari" },
  { src: "/masai-mara-national-reserve (1).jpg", label: "Masai Mara Reserve" },
  { src: "/mount-Kenya-day-trip-hike.jpg", label: "Mount Kenya day hike" },
  { src: "/mt.kenya.jpg", label: "Point Lenana summit" },
  { src: "/hero-safari.png", label: "Masai Mara game drive" },
];

function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    
    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
     .from('gallery') // CHANGE THIS if your bucket is called 'photos'
     .upload(fileName, file)

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
     .from('gallery')
     .getPublicUrl(fileName)

    // 3. Save to posts table
    const { error: dbError } = await supabase.from('posts').insert({
      name: 'Juma Adventures',
      caption: file.name,
      image_url: publicUrl
    })

    if (dbError) {
      alert('DB Save failed: ' + dbError.message)
    } else {
      alert('Uploaded successfully!')
      fetchPosts() // refresh gallery
    }
    setUploading(false)
  }

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20 text-center">
          <span className="eyebrow text-primary">Gallery</span>
          <h1 className="mt-3 text-5xl font-bold">Real moments from real journeys</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          
          {/* UPLOAD BUTTON ADDED HERE */}
          <div className="mb-8 text-center">
            <label className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition">
              {uploading? 'Uploading...' : '+ Upload Photo'}
              <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
            </label>
          </div>

          <h2 className="text-2xl font-bold mb-6">New Posts</h2>
          {loading? <p>Loading...</p> : posts.length === 0? 
            <p className="text-muted-foreground">No posts yet. Upload your first photo above!</p> :
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {posts.map((post) => (
                <div key={post.id} className="rounded-2xl border bg-card overflow-hidden">
                  <img src={post.image_url} alt={post.caption} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <p className="font-semibold">{post.name}</p>
                    <p className="text-sm text-muted-foreground">{post.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          }

          <h2 className="text-2xl font-bold mb-6">Kenya Collection</h2>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {fixedPhotos.map((p) => (
              <figure key={p.src} className="mb-4 break-inside-avoid rounded-2xl border bg-card overflow-hidden">
                <img src={p.src} alt={p.label} className="w-full" loading="lazy" />
                <figcaption className="px-4 py-3 text-sm">{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
