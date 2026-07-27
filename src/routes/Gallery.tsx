import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

type Post = {
  id: number
  name: string
  caption: string
  image_url: string
  created_at: string
}

function GalleryPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) console.error(error)
      else setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="container-page py-20 text-center">Loading posts...</div>

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Juma Adventures Gallery</h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet. Go post something!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border bg-card overflow-hidden shadow">
              <img src={post.image_url} alt={post.caption} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="font-semibold">{post.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{post.caption}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
