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
  knowBefore?: string[];
  meetingPoint?: string;
  tourStart?: string;
  tourEnd?: string;
  originalPrice?: string;
  rating?: string;
  cancellationPolicy?: string;
  priceCategories?: { pax: string; perPerson?: string; price?: string; total?: string; note?: string }[];
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
    title: "Masai Mara Safari",
    subtitle: "Kenya's most iconic wildlife destination",
    from: "Masai Mara National Reserve",
    days: 3,
    price: "1500",
    deposit: "500",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "PENDING",
    paybillAcc: "MARAMARA",
    duration: "3 Days / 2 Nights",
    route: "Nairobi - Masai Mara - Nairobi",
    gallery: [img("masai-mara-1.jpg"), img("masai-mara-2.jpg"), img("masai-mara-balloon.jpg"), img("masai-mara-lions.jpg")],
    journey: "Explore the world-famous Masai Mara National Reserve, home to the Big Five and the Great Migration.",
    highlights: ["Big Five viewing", "Great Migration (seasonal)", "Unlimited game drives", "Professional guide"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Masai Mara", details: ["Pickup JKIA/hotel", "Drive to Mara with game en-route", "Afternoon game drive", "Check-in camp"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full Day Game Drives", details: ["Early morning game drive", "Optional Masai Village", "Afternoon game drive"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Mara to Nairobi", details: ["Final morning drive", "Drive back to Nairobi"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Safari vehicle & fuel", "Professional guide", "Park entry fees", "Accommodation", "Water"],
    excludes: ["Personal expenses", "Alcoholic drinks", "Tips"],
  },
  {
    id: "big-5-and-lake-nakuru-enjoy-the-nature-and-wildlife-of-africa-664d246917832fdc0dc3d079",
    title: "Big 5 and Lake Nakuru Safari",
    subtitle: "Private 4 Days with Dennis Juma — 14 Years",
    from: "Nairobi, Kenya",
    days: 4,
    price: "850",
    deposit: "100",
    originalPrice: "2497",
    rating: "5.0 (1) review • 14 tours delivered",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 Days / 3 Nights",
    route: "Nairobi - Lake Nakuru - Lake Naivasha - Hells Gate - Nairobi",
    pace: "Easy to Moderate",
    gallery: [
      img("lake-nakuru-national-park-1.jpg"),
      img("IMG-20260111-WA0018.jpg"),
      img("IMG-20260726-WA3768.jpg"),
      img("masai-mara-1.jpg"),
      img("mount-kenya-day-trip-hike.jpg")
    ],
    journey: "Big 5 at Lake Nakuru, boat at Naivasha, gorge walk & cycling at Hells Gate. Licensed guide Dennis Juma.",
    quote: "Every journey is a story — let's make yours unforgettable. Karibu Kenya!",
    highlights: ["Big 5 — white rhinos, lions, buffalo", "Lake Nakuru flamingos", "Naivasha boat & Crescent Island", "Hells Gate gorge walk & cycling", "Private Land Cruiser pop-up roof"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Lake Nakuru", details: ["Pickup Embakasi/JKIA/hotel", "Rift Valley viewpoint", "Afternoon game drive Lake Nakuru NP", "Overnight Hotel Waterbuck"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full Day Lake Nakuru", details: ["Full day game drive with packed lunch", "White rhinos, lions, buffalo, giraffes", "Overnight Hotel Waterbuck"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Lake Nakuru to Lake Naivasha", details: ["Drive to Lake Naivasha", "Boat ride & island walk — hippos, pelicans", "Overnight Alphas Homestay"], meals: "Breakfast, Dinner" },
      { dayNum: 4, title: "Hells Gate & back to Nairobi", details: ["Hells Gate gorge walk, bicycle, Fishers Tower climb", "Drive back to Nairobi — drop Embakasi/JKIA"], meals: "Breakfast" }
    ],
    includes: ["Private Land Cruiser pop-up roof", "Professional licensed guide Dennis Juma", "Accommodation 2 nights Hotel Waterbuck + 1 night Alphas Homestay", "Bottled water, all taxes"],
    excludes: ["Park fees: Nakuru $60pp, Hells Gate $26pp, Naivasha boat ~$25pp", "Meals not mentioned, tips"],
    whatToBring: ["Comfortable shoes", "Camera", "Sun hat", "Jacket"],
    meetingPoint: "Embakasi, Nairobi / JKIA / Hotel",
    tourStart: "Nairobi, Kenya",
    tourEnd: "Nairobi",
    priceCategories: [
      { pax: "1 Person — Private Solo", perPerson: "1200", total: "1200" },
      { pax: "2 Persons — Private", perPerson: "850", total: "1700", note: "Most popular" },
      { pax: "3 Persons", perPerson: "750", total: "2250" },
      { pax: "4-6 Persons", perPerson: "650", total: "2600" },
    ],
    cancellationPolicy: "Free cancellation up to 7 days before. 50% refund 3-6 days. No refund within 48 hours. Book with a deposit — Secure your tour today and pay balance later. Upgrade for total flexibility with Any Reason Cancellation."
  },
  {
    id: "lake-nakuru",
    title: "Lake Nakuru Safari",
    subtitle: "Flamingos, rhinos & lake views",
    from: "Lake Nakuru National Park",
    days: 1,
    price: "510",
    gallery: [img("lake-nakuru-national-park-1.jpg")],
    journey: "Famous for flamingos, rhino sanctuary.",
    highlights: ["Flamingos", "Rhino sanctuary", "Lake views"],
    itinerary: [{ dayNum: 1, title: "Nairobi to Lake Nakuru & Back", details: ["Pickup", "Drive to Nakuru", "Game drive", "Drive back"], meals: "Lunch" }],
    includes: ["Vehicle & fuel", "Guide", "Park entry", "Water"],
    excludes: ["Personal expenses", "Tips"],
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya Trek",
    subtitle: "Summit Africa's second-highest",
    from: "Mount Kenya National Park",
    days: 4,
    price: "1500",
    gallery: [img("mount-kenya-day-trip-hike.jpg")],
    journey: "Mountain adventure.",
    highlights: ["Trekking", "Point Lenana", "Guides"],
    itinerary: [
      { dayNum: 1, title: "Nanyuki to Old Moses", details: ["Drive to Sirimon Gate", "Hike to Old Moses 3300m"], meals: "Dinner" },
      { dayNum: 2, title: "Old Moses to Shipton's", details: ["Moorland hike", "Shipton's 4200m"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Summit Lenana", details: ["Summit 4985m", "Sunrise"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Descent", details: ["Descent to Nanyuki"], meals: "Breakfast" }
    ],
    includes: ["Guide", "Park fees", "Accommodation", "Meals"],
    excludes: ["Personal", "Tips", "Insurance"],
  },
  {
    id: "lake-naivasha",
    title: "Lake Naivasha Safari",
    subtitle: "Boat rides & Crescent Island",
    from: "Lake Naivasha",
    days: 1,
    price: "480",
    gallery: [img("IMG-20260111-WA0018.jpg")],
    journey: "Birdlife, hippos.",
    highlights: ["Boat ride", "Bird watching", "Crescent Island"],
    itinerary: [{ dayNum: 1, title: "Nairobi to Naivasha & Back", details: ["Pickup", "Drive", "Boat ride", "Walk", "Back"], meals: "Lunch" }],
    includes: ["Transport", "Guide", "Boat", "Park fees"],
    excludes: ["Personal", "Meals"],
  },
  {
    id: "nairobi-wildlife-day",
    title: "Nairobi Wildlife & Orphanage Day",
    subtitle: "Max 2 people",
    from: "Nairobi",
    days: 1,
    price: "480",
    duration: "8 Hours",
    gallery: [img("/lake-nakuru-national-park-1.jpg")],
    journey: "Nairobi wild side.",
    highlights: ["Nairobi NP", "Sheldrick", "Giraffe Centre"],
    itinerary: [{ dayNum: 1, title: "Nairobi NP + Sheldrick + Giraffe", details: ["Pickup", "Game drive", "Sheldrick", "Giraffe Centre"], meals: "Not Included" }],
    includes: ["Pickup", "Van", "Guide", "Water", "Entry fees"],
    excludes: ["Flights", "Meals", "Tips"],
  },
  {
    id: "nairobi-culture-day",
    title: "Nairobi Culture & Heritage Day",
    subtitle: "Max 2 people",
    from: "Nairobi",
    days: 1,
    price: "480",
    duration: "8 Hours",
    gallery: [img("/IMG-20260726-WA3768.jpg")],
    journey: "Culture and history.",
    highlights: ["Blixen Museum", "National Museum", "Bomas", "Maasai Market"],
    itinerary: [{ dayNum: 1, title: "Blixen + Museum + Bomas", details: ["Pickup", "Blixen", "Museum", "Bomas", "Market"], meals: "Not Included" }],
    includes: ["Pickup", "Transport", "Guide", "Water", "Fees"],
    excludes: ["Flights", "Meals", "Tips"],
  },
];

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase().replace(/_/g, "-")
  const direct = packages.find((p) => p.id.toLowerCase() === cleanId)
  if (direct) return direct
  const aliases: Record<string, string> = {
    "nairobi-culture-heritage-day": "nairobi-culture-day",
    "nairobi-wildlife": "nairobi-wildlife-day",
    "mt-kenya-4-day": "mt-kenya-4day",
    "mt-kenya": "mount-kenya",
  }
  const aliasedId = aliases[cleanId]
  if (aliasedId) return packages.find((p) => p.id.toLowerCase() === aliasedId)
  return undefined
}
