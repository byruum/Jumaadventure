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
  // NEW - for your ToursByLocals tour
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
    gallery: [
      img("masai-mara-1.jpg"),
      img("masai-mara-2.jpg"),
      img("masai-mara-balloon.jpg"),
      img("masai-mara-lions.jpg"),
      img("/lake-nakuru-national-park-1.jpg")
    ],
    journey: "Explore the world-famous Masai Mara National Reserve, home to the Big Five and the spectacular Great Wildebeest Migration.",
    highlights: ["Big Five wildlife viewing", "Great Migration (seasonal)", "Unlimited game drives", "Professional safari guide", "Scenic savannah landscapes"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Masai Mara", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Drive to Masai Mara National Reserve with game en-route", "Afternoon game drive", "Check-in to camp/lodge for dinner & overnight"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full Day Game Drives", details: ["Early morning game drive", "Optional visit to Masai Village", "Afternoon game drive until sunset", "Return to camp/lodge"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Masai Mara to Nairobi", details: ["Final morning game drive", "Drive back to Nairobi", "Drop off at JKIA Airport or Hotel"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees", "Accommodation (as per package)", "Bottled drinking water"],
    excludes: ["Personal expenses", "Alcoholic drinks", "Tips & gratuities"],
  },
  {
    id: "big-5-and-lake-nakuru-enjoy-the-nature-and-wildlife-of-africa-664d246917832fdc0dc3d079",
    title: "Big 5 and Lake Nakuru Safari",
    subtitle: "Private with Dennis Juma — 14 Years",
    from: "Nairobi, Kenya",
    days: 4,
    price: "850",
    deposit: "100",
    originalPrice: "2497",
    rating: "5.0 (1) review",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 Days / 3 Nights",
    route: "Nairobi - Lake Nakuru - Lake Naivasha - Hells Gate - Nairobi",
    pace: "Easy to Moderate",
    gallery: [
      img("lake-nakuru-national-park-1.jpg"),
      img("IMG-20260111-WA0018.jpg"),
      img("lake-nakuru-flamingos.jpg"),
      img("naivasha-boat.jpg"),
      img("hells-gate-gorge.jpg")
    ],
    journey: "Enjoy the nature and wildlife of Africa — Big 5 at Lake Nakuru, boat at Naivasha, gorge walk & cycling at Hells Gate. Led by licensed guide Dennis Juma.",
    quote: "Every journey is a story — let's make yours unforgettable. Karibu Kenya hakuna matata!",
    highlights: [
      "Big 5 — white rhinos, lions, buffalo",
      "Lake Nakuru flamingos & 400+ bird species",
      "Lake Naivasha boat & Crescent Island walk",
      "Hells Gate gorge walking, bicycle, Fishers Tower",
      "Private Land Cruiser pop-up roof"
    ],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Lake Nakuru", details: ["Pickup Embakasi/JKIA/hotel", "Great Rift Valley viewpoint", "Afternoon game drive Lake Nakuru National Park", "Overnight Hotel Waterbuck Nakuru"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full Day Lake Nakuru", details: ["Full day game drive with packed lunch", "White rhinos, lions, buffalo, giraffes, black-maned lion", "Overnight Hotel Waterbuck"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Lake Nakuru to Lake Naivasha", details: ["Drive to Lake Naivasha", "Boat ride & 3km island walk — hippos, pelicans", "Overnight Alphas Homestay Naivasha"], meals: "Breakfast, Dinner" },
      { dayNum: 4, title: "Hells Gate & back to Nairobi", details: ["Hells Gate gorge walk, bicycle cycling, rock climbing Fishers Tower", "Drive back to Nairobi — drop Embakasi/JKIA"], meals: "Breakfast" }
    ],
    includes: [
      "Private Land Cruiser pop-up roof",
      "Professional licensed guide Dennis Juma",
      "Accommodation 2 nights Hotel Waterbuck + 1 night Alphas Homestay",
      "Bottled water, all taxes"
    ],
    excludes: [
      "Park fees: Nakuru $60pp, Hells Gate $26pp, Naivasha boat ~$25pp",
      "Meals not mentioned, tips"
    ],
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
    cancellationPolicy: "View our cancellation policies: Free cancellation up to 7 days before. 50% refund 3-6 days. No refund within 48 hours. Book with a deposit — Secure your tour today and pay balance later. Upgrade for total flexibility with Any Reason Cancellation."
  },
  // KEEP OTHER PACKAGES BELOW SAME AS BEFORE...
  {
    id: "lake-nakuru",
    title: "Lake Nakuru Safari",
    subtitle: "Flamingos, rhinos & breathtaking lake views",
    from: "Lake Nakuru National Park",
    days: 1,
    price: "510",
    gallery: [img("lake-nakuru-national-park-1.jpg")],
    journey: "Lake Nakuru National Park is one of Kenya's most beautiful parks, famous for its flamingos, rhino sanctuary, and diverse birdlife.",
    highlights: ["Flamingos & over 400 bird species", "Rhino sanctuary", "Scenic lake views", "Guided game drive"],
    itinerary: [{ dayNum: 1, title: "Nairobi to Lake Nakuru & Back", details: ["Pickup JKIA/hotel", "Drive to Lake Nakuru", "Game drive: rhinos, flamingos, lions", "Drive back to Nairobi"], meals: "Lunch" }],
    includes: ["Safari vehicle & fuel", "Professional guide", "Park entry", "Water"],
    excludes: ["Personal expenses", "Lunch & drinks", "Tips"],
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya Trek",
    subtitle: "Summit Africa's second-highest mountain",
    from: "Mount Kenya National Park",
    days: 4,
    price: "1500",
    gallery: [img("mount-kenya-day-trip-hike.jpg")],
    journey: "A thrilling mountain adventure through alpine landscapes.",
    highlights: ["High-altitude trekking", "Point Lenana summit", "Experienced guides"],
    itinerary: [
      { dayNum: 1, title: "Nanyuki to Old Moses Camp", details: ["Pickup Nanyuki", "Drive to Sirimon Gate", "Hike to Old Moses Camp 3300m"], meals: "Dinner" },
      { dayNum: 2, title: "Old Moses to Shipton's Camp", details: ["Hike through moorland", "Arrive Shipton's Camp 4200m"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Point Lenana Summit", details: ["Pre-dawn summit 4985m", "Sunrise at summit", "Descent to Shipton's"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Descent to Nanyuki", details: ["Descent to Sirimon Gate", "Transfer to Nanyuki"], meals: "Breakfast" }
    ],
    includes: ["Guide", "Park fees", "Accommodation", "Meals"],
    excludes: ["Personal expenses", "Tips", "Insurance"],
  },
  {
    id: "lake-naivasha",
    title: "Lake Naivasha Safari",
    subtitle: "Boat rides, birdlife & Crescent Island",
    from: "Lake Naivasha, Rift Valley",
    days: 1,
    price: "480",
    gallery: [img("IMG-20260111-WA0018.jpg")],
    journey: "Enjoy Lake Naivasha, birdlife, hippos.",
    highlights: ["Boat ride", "Bird watching", "Crescent Island walk"],
    itinerary: [{ dayNum: 1, title: "Nairobi to Lake Naivasha & Back", details: ["Pickup", "Drive to Naivasha", "Boat ride", "Walking safari", "Drive back"], meals: "Lunch" }],
    includes: ["Transport", "Guide", "Boat fees", "Park fees"],
    excludes: ["Personal expenses", "Meals"],
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
    journey: "Experience Nairobi's wild side.",
    highlights: ["Nairobi National Park", "Sheldrick Orphanage", "Giraffe Centre", "KICC Tower"],
    itinerary: [{ dayNum: 1, title: "Nairobi National Park + Sheldrick + Giraffe Centre", details: ["Pickup JKIA/hotel", "Game drive Nairobi NP", "Sheldrick 11am-12pm", "Giraffe Centre", "KICC Tower"], meals: "Not Included" }],
    includes: ["Pickup and drop-off", "Transport van", "Guide", "Water", "Entry fees", "Taxes"],
    excludes: ["Flights", "Meals", "Personal expenses", "Tips"],
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
    journey: "Discover Nairobi's culture.",
    highlights: ["Karen Blixen Museum", "National Museum", "Bomas of Kenya", "Maasai Market"],
    itinerary: [{ dayNum: 1, title: "Blixen Museum + National Museum + Bomas", details: ["Pickup", "Blixen Museum", "National Museum", "Bomas", "Maasai Market"], meals: "Not Included" }],
    includes: ["Pickup and drop-off", "Transport", "Guide", "Water", "Entry fees", "Taxes"],
    excludes: ["Flights", "Meals", "Personal expenses", "Tips"],
  },
];

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase().replace(/_/g, "-")
  const direct = packages.find((p) => p.id.toLowerCase() === cleanId)
  if (direct) return direct
  const aliases: Record<string, string> = {
    "nairobi-culture-heritage-day": "nairobi-culture-day",
    "nairobi-culture-day-tour": "nairobi-culture-day",
    "nairobi-wildlife": "nairobi-wildlife-day",
    "mt-kenya-4-day": "mt-kenya-4day",
    "mt-kenya": "mount-kenya",
  }
  const aliasedId = aliases[cleanId]
  if (aliasedId) {
    return packages.find((p) => p.id.toLowerCase() === aliasedId)
  }
  return undefined
}
