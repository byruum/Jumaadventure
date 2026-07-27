import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export const Route = createFileRoute('/post')({
  component: PostPage,
})
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ezkejiawykqfxllvbzjm.supabase.co'
const SUPABASE_KEY = 'sb_publishable_uWwptcdqC9-Yb-mYKqGuag_7dWYE1g7'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default function PostPage() {
  const [status, setStatus] = useState('')
  const [preview, setPreview] = useState<string[]>([])

  const handleFiles = (e: any) => {
    const files = Array.from(e.target.files)
    setPreview(files.map((f: any) => URL.createObjectURL(f)))
  }

  const publishPost = async () => {
    setStatus('Uploading...')
    const author = (document.getElementById('author') as HTMLInputElement).value
    const caption = (document.getElementById('caption') as HTMLTextAreaElement).value
    const files = (document.getElementById('images') as HTMLInputElement).files
    
    const imageUrls = []
    for (let i = 0; i < files!.length; i++) {
      const file = files![i]
      const fileName = Date.now() + '-' + file.name
      await supabase.storage.from('posts').upload(fileName, file)
      const { data } = supabase.storage.from('posts').getPublicUrl(fileName)
      imageUrls.push(data.publicUrl)
    }

    await supabase.from('posts').insert({ caption, image: imageUrls, author })
    setStatus('POSTED! ✅ Go check your site')
  }

  return (
    <div style={{maxWidth:600, margin:'50px auto', padding:20}}>
      <h1>Post to Juma Adventures</h1>
      <input id="author" placeholder="Your Name" style={{width:'100%', padding:12, margin:'10px 0'}}/>
      <textarea id="caption" placeholder="Write your caption..." style={{width:'100%', padding:12, margin:'10px 0'}}/>
      <input id="images" type="file" multiple accept="image/*" onChange={handleFiles}/>
      <div>{preview.map(src => <img key={src} src={src} style={{maxWidth:100}}/> )}</div>
      <button onClick={publishPost} style={{width:'100%', padding:12, background:'#4CAF50', color:'white'}}>POST NOW</button>
      <p>{status}</p>
    </div>
  )
      }
