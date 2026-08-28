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

// FIXED: Removed 17 Masai Mara duplicate brochure pages — only real unique tour photos
const allImages = [
  { src: "/Diani.png.jpg", tour: "Diani Beach" },
  { src: "/hero-safari.png", tour: "Masai Mara" },
  { src: "/lake-nakuru-national-park-1.jpg", tour: "Lake Nakuru" },
  { src: "/masai-mara-national-reserve (1).jpg", tour: "Masai Mara" },
  { src: "/mount-Kenya-day-trip-hike.jpg", tour: "Mount Kenya" },
  { src: "/mt.kenya.jpg", tour: "Mount Kenya" },
  { src: "/Nairobi National Park-Wildlife roaming freely just.jpg", tour: "Amazing Nairobi Tour" },
  { src: "/IMG-20260111-WA0016.jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260115-WA0013(1).jpg", tour: "Mount Kenya" },
  { src: "/IMG-20260726-WA7365.jpg", tour: "Safari Moments" },
  // Real tour moments - unique
  { src: "/IMG-20260827-WA0302.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA1621.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA2498.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA3138.jpg", tour: "Amazing Nairobi Tour" },
  { src: "/IMG-20260827-WA3807.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA4103.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA5967.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA6138.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA7065.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA7107.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA8769.jpg", tour: "Juma Adventures Tour" },
  { src: "/IMG-20260827-WA9899.jpg", tour: "Juma Adventures Tour" },
];

function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => { fetchPosts() }, [])
  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('gallery').upload(fileName, file)
    if (error) { alert(error.message); setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName)
    await supabase.from('posts').insert({ name: 'Juma Adventures', caption: file.name, image_url: publicUrl })
    alert('Uploaded!'); fetchPosts(); setUploading(false)
  }

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
              {uploading? 'Uploading...' : '+ Upload Photo'}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
          </div>
          <h2 className="text-2xl font-bold mb-6">New Uploads</h2>
          {loading? <p>Loading...</p> : posts.length === 0? <p className="text-muted-foreground mb-10">No uploads yet.</p> :
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3
