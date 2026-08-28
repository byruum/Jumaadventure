import { useState, useEffect } from "react";

type Review = {
  id: string;
  name: string;
  tour: string;
  rating: number;
  comment: string;
  date: string;
};

export function ReviewsSection({ tourName }: { tourName: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const saved = localStorage.getItem(`reviews-${tourName}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [tourName]);

  const submit = () => {
    if (!form.name || !form.comment) return alert("Please fill name and review");
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: form.name,
      tour: tourName,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toLocaleDateString(),
    };
    
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${tourName}`, JSON.stringify(updated));
    
    // Send to your WhatsApp for approval
    const msg = `NEW REVIEW for ${tourName}%0AName: ${form.name}%0ARating: ${form.rating} stars%0AReview: ${form.comment}`;
    window.open(`https://wa.me/254768118951?text=${msg}`, "_blank");
    
    setOpen(false);
    setForm({ name: "", rating: 5, comment: "" });
    alert("Thank you! Your review has been received.");
  };

  return (
    <div className="mt-16 border-t pt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Guest Reviews - {tourName}</h3>
        <button onClick={() => setOpen(true)} className="bg-[#1a2e1a] text-white px-6 py-2.5 rounded-full font-bold hover:bg-black">
          Write a Review
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {reviews.length === 0 ? (
          <p className="text-neutral-500 bg-[#f5f2ed] p-6 rounded-2xl">No reviews yet. Be the first to review this tour!</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="bg-[#f5f2ed] p-5 rounded-2xl border">
              <div className="flex justify-between">
                <span className="font-bold">{r.name}</span>
                <span className="text-[#D4A574]">{"★".repeat(r.rating)}</span>
              </div>
              <p className="mt-2 text-neutral-700">{r.comment}</p>
              <span className="text-xs text-neutral-500 mt-2 block">{r.date}</span>
            </div>
          ))
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h4 className="text-xl font-bold">Write a review for {tourName}</h4>
            <input placeholder="Your Name" className="mt-4 w-full border rounded-xl px-4 py-2.5" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <select className="mt-3 w-full border rounded-xl px-4 py-2.5" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})}>
              <option value={5}>★★★★★ - Excellent</option>
              <option value={4}>★★★★ - Very Good</option>
              <option value={3}>★★★ - Good</option>
              <option value={2}>★★ - Fair</option>
              <option value={1}>★ - Poor</option>
            </select>
            <textarea placeholder="Your experience..." rows={4} className="mt-3 w-full border rounded-xl px-4 py-2.5" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
            <div className="mt-5 flex gap-3">
              <button onClick={() => setOpen(false)} className="flex-1 border rounded-full py-2.5">Cancel</button>
              <button onClick={submit} className="flex-1 bg-[#1a2e1a] text-white rounded-full py-2.5 font-bold">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                
