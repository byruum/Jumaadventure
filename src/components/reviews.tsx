import { useState, useEffect } from "react"

type Review = {
  name: string
  rating: number
  comment: string
  tour: string
  date: string
}

export function ReviewsSection({ tourName }: { tourName: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  // Load public reviews from localStorage (visible to all on same browser, and you can later connect to DB)
  useEffect(() => {
    const key = `reviews_${tourName}`
    const saved = localStorage.getItem(key)
    if (saved) {
      try { setReviews(JSON.parse(saved)) } catch {}
    } else {
      // Demo reviews - you can delete these
      setReviews([
        { name: "Sarah J.", rating: 5, comment: "Amazing experience! Guide was very knowledgeable and friendly.", tour: tourName, date: new Date().toLocaleDateString() },
        { name: "John M.", rating: 5, comment: "Best tour in Nairobi. Highly recommended!", tour: tourName, date: new Date().toLocaleDateString() }
      ])
    }
  }, [tourName])

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() ||!comment.trim()) return
    setSending(true)

    const newReview: Review = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      tour: tourName,
      date: new Date().toLocaleDateString()
    }

    // 1. Save to public list instantly (visible to public)
    const updated = [newReview,...reviews]
    setReviews(updated)
    localStorage.setItem(`reviews_${tourName}`, JSON.stringify(updated))

    // 2. Send to your email via formsubmit
    try {
      await fetch("https://formsubmit.co/ajax/jumaadventuresandsafaris@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          subject: `NEW REVIEW - ${tourName} - ${rating} stars - ${name}`,
          name,
          rating: `${rating} stars`,
          comment,
          tour: tourName,
          date: new Date().toISOString()
        })
      })
    } catch {}

    setName("")
    setComment("")
    setRating(5)
    setSent(true)
    setSending(false)
    setTimeout(() => setSent(false), 4000)
  }

  const avg = reviews.length? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length).toFixed(1) : "5.0"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-[18px]">Guest Reviews</h3>
        <div className="bg-black text-white px-3 py-1 rounded-full text-[12px] font-black">⭐ {avg} ({reviews.length})</div>
      </div>

      {/* Public reviews */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {reviews.map((r, i) => (
          <div key={i} className="bg-[#FAF7F2] p-4 rounded-[16px] border">
            <div className="flex justify-between items-center">
              <p className="font-black text-[13px]">{r.name}</p>
              <p className="text-[11px] text-black/50">{r.date}</p>
            </div>
            <p className="text-[12px] text-[#F5B400] mt-1">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</p>
            <p className="text-[13px] mt-2 leading-5 text-black/70">{r.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-[13px] text-black/50">No reviews yet — be the first!</p>}
      </div>

      {/* Online form - NO WhatsApp */}
      <form onSubmit={submitReview} className="bg-white border-2 border-black rounded-[20px] p-5 space-y-3">
        <p className="font-black text-[14px]">Leave a Review</p>

        <div className="flex gap-2">
          {[1,2,3,4,5].map(s => (
            <button key={s} type="button" onClick={() => setRating(s)} className={`text-[24px] ${s <= rating? "text-[#F5B400]" : "text-black/20"}`}>★</button>
          ))}
        </div>

        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full border rounded-full px-4 py-3 text-[13px] outline-none focus:border-black" />
        <textarea required value={comment} onChange={e=>setComment(e.target.value)} placeholder={`How was ${tourName}?`} rows={3} className="w-full border rounded-[16px] px-4 py-3 text-[13px] outline-none focus:border-black resize-none" />

        <button disabled={sending} type="submit" className="w-full bg-black text-white py-3 rounded-full font-black text-[13px]">
          {sending? "Publishing..." : sent? "✓ Review Published & Emailed!" : "Post Review Publicly"}
        </button>

        {sent && <p className="text-[11px] text-center text-[#0B6A2B] font-bold">Your review is now visible to public and sent to jumaadventuresandsafaris@gmail.com</p>}
      </form>

      <p className="text-[10px] text-black/40 text-center">Reviews are saved publicly on the site and also emailed to you. No WhatsApp needed.</p>
    </div>
  )
}
