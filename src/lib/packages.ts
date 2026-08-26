export type Package = {
  id: string;
  title: string;
  subtitle: string;
  from: string;
  days: number;
  price: string;
  deposit?: string;
  paypalEmail?: string;
  paybillNo?: string;
  paybillAcc?: string;
  duration?: string;
  route?: string;
  pace?: string;
  gallery: string[];
  journey: string;
  quote?: string;
  highlights: string[];
  itinerary: { dayNum: number; title: string; details: string[]; meals?: string }[];
  includes: string[];
  excludes: string[];
  whatToBring?: string[];
  meetingPoint?: string;
  tourStart?: string;
  tourEnd?: string;
  cancellationPolicy?: string;
  priceCategories?: any[];
};

const img = (name: string) => {
  if (!name) return "/og-image.png"
  if (name.startsWith("http")) return name
  const clean = name.replace(/^\//, "").replace(/^Images\//i, "")
  return `/${clean}`
}

export const WHATSAPP_NUMBER = "254746011254"
export const WHATSAPP_DISPLAY = "+254 746 011254"

export const packages: Package[] = [
  {
    id: "masai-mara",
    title: "4 Days / 3 Nights Masai Mara Safari",
    subtitle: "Accommodation: Sentrim Mara Lodge • Private",
    from: "Masai Mara National Reserve",
    days: 4,
    price: "4950",
    deposit: "500",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 Days / 3 Nights",
    route: "Nairobi - Masai Mara - Nairobi",
    gallery: [img("masai-mara-1.jpg"), img("masai-mara-2.jpg"), img("masai-mara-lions.jpg"), img("sentrim-mara-lodge.jpg")],
    journey: "Enjoy 4 Days / 3 Nights Masai Mara Safari with pick-up & drop-off Nairobi Airport/Hotel. Stay at Sentrim Mara Lodge / Oldarpoi Lodge.",
    quote: "Karibu Kenya hakuna matata!",
    highlights: ["Game drives", "Big Five sightings", "Mara River - hippos, crocodiles, Great Migration (seasonal)", "Masai culture", "Rift Valley views", "Comfortable lodge stay"],
    itinerary: [
      { 
        dayNum: 1, 
        title: "Nairobi – Masai Mara", 
        details: ["Pick-up in Nairobi, drive via the Great Rift Valley to Masai Mara", "Lunch at Sentrim Mara Lodge", "Afternoon game drive", "Dinner & overnight at lodge"], 
        meals: "Lunch, Dinner" 
      },
      { 
        dayNum: 2, 
        title: "Full-Day Safari", 
        details: ["Full-day game drive with picnic lunch", "Visit the Mara River—home to hippos, crocodiles, and the Great Migration (seasonal)", "Return to lodge for dinner & overnight"], 
        meals: "Breakfast, Lunch, Dinner" 
      },
      { 
        dayNum: 3, 
        title: "Game Drive & Maasai Village", 
        details: ["Morning game drive", "Visit a Maasai village to experience culture and traditions", "Optional afternoon game drive", "Dinner & overnight at lodge"], 
        meals: "Breakfast, Lunch, Dinner" 
      },
      { 
        dayNum: 4, 
        title: "Masai Mara – Nairobi", 
        details: ["Sunrise game drive, breakfast, and return drive to Nairobi with lunch en route", "Drop-off at hotel or airport transfer for onward flight"], 
        meals: "Breakfast, Lunch" 
      }
    ],
    includes: ["Snacks & Drinking water bottle", "Private Guide", "Private Transportation", "Park entrance fees - Tickets", "Food Drinks Snacks", "Accommodation: Bed & meals @ Oldarpoi Lodge / Sentrim Mara Lodge"],
    excludes: ["Personal expenses"],
    meetingPoint: "Nairobi Airport / Hotel",
    cancellationPolicy: "Book with a deposit. Secure your tour today and pay balance later."
  },
  {
    id: "mount-kenya",
    title: "Mt Kenya Day Trip (Hiking)",
    subtitle: "Explore the Magic of Mt. Kenya",
    from: "Nanyuki, Laikipia County",
    days: 1,
    price: "330",
    deposit: "50",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "1 Day",
    route: "Nanyuki - Narumoru Gate - Met Station - Mountain - Nanyuki",
    pace: "Moderate",
    gallery: [img("mount-kenya-day-trip-hike.jpg")],
    journey: "Mt. Kenya, one of Africa's most iconic volcanic mountains, stands proudly along the equator yet remains snow-capped year-round. Its stunning peaks — Batian (5,199m), Nelion (5,190m), and Point Lenana (4,985m) — promise an unforgettable adventure for hikers and nature lovers. Trek through diverse ecosystems, from lush forests to alpine meadows and icy summits, while learning about the mountain's rich history, geology, and unique vegetation.",
    quote: "Guided by a passionate, experienced, and safety-trained mountain guide, you'll enjoy more than just a climb — you'll experience friendship, inspiration, and care. I treat every guest like family, ensuring comfort, safety, and unforgettable memories on Africa's second-highest Mountain.",
    highlights: ["Hiking on glaciers and rocks", "Explore the ecosystem of mountain vegetation from lower to upper rock", "View beautiful gorges, valleys", "View Batian, Nelion, Point Lenana closely", "New model Hybrid Noah Voxy"],
    itinerary: [
      { 
        dayNum: 1, 
        title: "Nanyuki Tour Itinerary", 
        details: [
          "The journey starts in the morning with a drive from Nanyuki town to Mt Kenya National Park and check in at the Narumoru gate", 
          "Then drive 10km to end off road at the met station before we start a hike", 
          "The hiking will take at least 5 hrs on the mountain to be able to view beautiful gorges, valleys, mountain vegetation and view mountains closely", 
          "Later on, come down to the met station and then drive down at the gate to check out", 
          "If you have any special interests, please let me know"
        ], 
        meals: "Not Included" 
      }
    ],
    includes: ["Private Guide", "Private Transportation / Category: Minivan — New model Hybrid Noah Voxy"],
    excludes: ["Personal expenses - Park tickets fee 52 USD per person", "Accommodation", "Equipment", "Tickets", "Food Drinks Snacks"],
    meetingPoint: "Nyeri - Nanyuki Road, Nanyuki, Laikipia County, Kenya — Hotel pickup on request",
    tourStart: "Nanyuki",
    tourEnd: "Nanyuki",
    whatToBring: ["Hiking boots", "Warm jacket", "Rain jacket", "Hat", "Water 2L"],
    cancellationPolicy: "Customizable tour — Tell your guide which places matter to you, skip what doesn't, and tailor the experience for your group's needs."
  }
];

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase().replace(/_/g, "-")
  const direct = packages.find((p) => p.id.toLowerCase() === cleanId)
  if (direct) return direct
  const aliases: Record<string, string> = { "mt-kenya": "mount-kenya", "masai-mara-safari": "masai-mara" }
  const aliasedId = aliases[cleanId]
  if (aliasedId) return packages.find((p) => p.id.toLowerCase() === aliasedId)
  return undefined
}
