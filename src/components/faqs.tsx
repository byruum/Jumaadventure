import { useState } from "react"

type FAQ = { q: string; a: string }

const faqsData: FAQ[] = [
  {
    q: "Who is this private tour in Nairobi best suited for?",
    a: "This private tour is best for solo travelers, couples, families, and small groups (1-2 people private, up to 6 max). Ideal if you want a flexible, safe, and personalized experience with a passionate local guide who treats you like family. Whether it's your first time in Nairobi or you have a layover, we adapt to your pace."
  },
  {
    q: "What should I bring or wear?",
    a: "Comfortable walking shoes, hat, sunglasses, sunscreen, camera, and light jacket. For Nairobi City Tour: casual wear is fine. For National Park tours: neutral colors, binoculars if you have. For Mt Kenya: hiking boots, warm jacket, rain jacket, 2L water. Water and snacks are provided."
  },
  {
    q: "Can this private tour be customized to focus on what I want to see and skip places I've already visited?",
    a: "YES, 100% customizable. It's your private tour. Tell me during checkout what you want to focus on (e.g., only museums, only wildlife, only Giraffe Centre) and what you want to skip. I will re-plan the route, timing, and lunch stop at Carnivore for you. No extra charge for customization."
  },
  {
    q: "How long is the tour, and can the start time or duration be adjusted?",
    a: "Nairobi City Tour: 8 Hours (07:30 - 17:00) - can start earlier/later. Nairobi National Park Day Trip: 1 Day Morning & Afternoon - early morning pickup ~6am. Amboseli 3 Days: 3 Days/2 Nights. Masai Mara 4 Days, 12 Days Kenya/Tanzania. Yes, start time and duration are flexible - just request in checkout."
  },
  {
    q: "Where does the tour start and end?",
    a: "All tours start and end in Nairobi. Pickup and drop-off from your hotel, Airbnb, or JKIA airport (Embakasi, Nairobi). You can request a specific meeting location during checkout. For Mt Kenya tours: starts/ends in Nanyuki or Nairobi on request."
  },
  {
    q: "Is transportation included?",
    a: "Yes, private transportation is included. Category: For $420 Nairobi City Tour - 5 seater luxury Noah Voxy Hybrid. For $556 Nairobi National Park Day Trip - Landcruiser Jeep safari vehicle (7 seater) with pop-up roof as per client update. For Masai Mara, Amboseli, 12 Days - Off Roader 4WD Landcruiser Jeep with pop-up roof. No sharing with strangers."
  },
  {
    q: "What happens if a site is closed, crowded, or the weather changes?",
    a: "I monitor sites in real-time. If a site like David Sheldrick or a museum is closed, crowded, or weather is bad, I will replace it with an alternative (e.g., Nairobi National Museum, Karen Blixen, KICC, Kazuri Beads) or adjust timing to avoid crowds. Your satisfaction and safety come first. No extra cost."
  },
  {
    q: "What languages is this tour offered in?",
    a: "All tours are offered in English with a professional English-speaking guide. Swahili is also spoken. Other languages can be arranged on request - tell us in advance and we will try to provide a guide or translator."
  }
]

export function FAQsSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="bg-[#FAF7F2] rounded-[24px] p-6 space-y-2">
      <h3 className="font-black text-[18px] mb-4">FAQs</h3>
      {faqsData.map((f, i) => (
        <div key={i} className="border-b border-black/10 py-3">
          <button
            onClick={() => setOpen(open === i? null : i)}
            className="w-full flex justify-between items-start text-left gap-4"
          >
            <span className="font-medium text-[14px] leading-5">{f.q}</span>
            <span className="text-[18px] shrink-0">{open === i? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="mt-3 text-[13px] leading-6 text-black/70">{f.a}</p>
          )}
        </div>
      ))}
      <p className="text-[11px] text-black/40 pt-3">Confirmed by your guide Dennis J. - Juma Adventures & Safaris</p>
    </div>
  )
}
export const FAQSection = FAQsSection;
