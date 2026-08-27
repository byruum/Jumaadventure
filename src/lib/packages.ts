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
      { dayNum: 1, title: "Nairobi – Masai Mara", details: ["Pick-up in Nairobi, drive via the Great Rift Valley to Masai Mara", "Lunch at Sentrim Mara Lodge", "Afternoon game drive", "Dinner & overnight at lodge"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full-Day Safari", details: ["Full-day game drive with picnic lunch", "Visit the Mara River—home to hippos, crocodiles, and the Great Migration (seasonal)", "Return to lodge for dinner & overnight"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Game Drive & Maasai Village", details: ["Morning game drive", "Visit a Maasai village to experience culture and traditions", "Optional afternoon game drive", "Dinner & overnight at lodge"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Masai Mara – Nairobi", details: ["Sunrise game drive, breakfast, and return drive to Nairobi with lunch en route", "Drop-off at hotel or airport transfer for onward flight"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Snacks & Drinking water bottle", "Private Guide", "Private Transportation", "Park entrance fees - Tickets", "Food Drinks Snacks", "Accommodation: Bed & meals @ Oldarpoi Lodge / Sentrim Mara Lodge"],
    excludes: ["Personal expenses"],
    meetingPoint: "Nairobi Airport / Hotel",
    cancellationPolicy: "1. Cancellation 15 days before the tour date entitled to full refund.\n2. Cancellation 7 days before the tour, entitled to 50% refund.\n3. No refund within 7 days before commencing tour date."
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
    // FIXED: Removed Kilimanjaro image, use real Mt Kenya Point Lenana signage images
    gallery: [img("mt-kenya-point-lenana-sign.jpg"), img("mt-kenya-4day-1.jpg"), img("mt-kenya-4day-2.jpg"), img("mt-kenya-summit.jpg")],
    journey: "Mt. Kenya, one of Africa's most iconic volcanic mountains, stands proudly along the equator yet remains snow-capped year-round. Its stunning peaks — Batian (5,199m) - highest, Nelion (5,188m) - second highest, and Point Lenana (4,985m) - third highest — promise an unforgettable adventure for hikers and nature lovers. Trek through diverse ecosystems, from lush forests to alpine meadows and icy summits, while learning about the mountain's rich history, geology, and unique vegetation.",
    quote: "Guided by a passionate, experienced, and safety-trained mountain guide, you'll enjoy more than just a climb — you'll experience friendship, inspiration, and care. I treat every guest like family, ensuring comfort, safety, and unforgettable memories on Africa's second-highest Mountain.",
    highlights: ["Hiking on glaciers and rocks", "Explore the ecosystem of mountain vegetation from lower to upper rock", "View beautiful gorges, valleys", "View Batian Peak-1 (5,199m), Nelion Peak-2 (5,188m), Point Lenana-3 (4,985m) closely", "Real Mt Kenya signage at Point Lenana", "New model Hybrid Noah Voxy"],
    itinerary: [
      { dayNum: 1, title: "Nanyuki Tour Itinerary", details: ["The journey starts in the morning with a drive from Nanyuki town to Mt Kenya National Park and check in at the Narumoru gate", "Then drive 10km to end off road at the met station before we start a hike", "The hiking will take at least 5 hrs on the mountain to be able to view beautiful gorges, valleys, mountain vegetation and view mountains closely", "Later on, come down to the met station and then drive down at the gate to check out", "If you have any special interests, please let me know"], meals: "Not Included" }
    ],
    includes: ["Private Guide", "Private Transportation / Category: Minivan — New model Hybrid Noah Voxy"],
    excludes: ["Personal expenses - Park tickets fee 52 USD per person", "Accommodation", "Equipment", "Tickets", "Food Drinks Snacks"],
    meetingPoint: "Nyeri - Nanyuki Road, Nanyuki, Laikipia County, Kenya — Hotel pickup on request",
    tourStart: "Nanyuki",
    tourEnd: "Nanyuki",
    whatToBring: ["Hiking boots", "Warm jacket", "Rain jacket", "Hat", "Water 2L"],
    cancellationPolicy: "1. Cancellation 15 days before the tour date entitled to full refund.\n2. Cancellation 7 days before the tour, entitled to 50% refund.\n3. No refund within 7 days before commencing tour date."
  },
  {
    id: "big-5-lake-nakuru",
    title: "Big 5 and Lake Nakuru, enjoy the nature and wildlife of Africa",
    subtitle: "3 Days Private Safari • 1-2 People",
    from: "Nairobi",
    days: 3,
    price: "850",
    deposit: "100",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "3 Days",
    route: "Nairobi - Masai Mara - Lake Nakuru - Nairobi",
    gallery: [img("lake-nakuru-flamingos.jpg"), img("masai-mara-1.jpg"), img("big-5-rhino.jpg")],
    journey: "Short 3-day private safari for Big 5 — Masai Mara and Lake Nakuru National Park.",
    highlights: ["Big 5 sightings", "Lake Nakuru flamingos & rhinos", "Great Rift Valley viewpoint"],
    itinerary: [
      { dayNum: 1, title: "Nairobi – Masai Mara", details: ["Pick-up via Great Rift Valley viewpoint", "Afternoon game drive in Masai Mara"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Masai Mara Full Day", details: ["Full-day game drive with picnic lunch", "Mara River area"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Masai Mara – Lake Nakuru – Nairobi", details: ["Drive to Lake Nakuru, game drive for rhinos & flamingos", "Return to Nairobi drop-off"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Private Guide Dennis J", "Private Transportation", "Park entrance fees", "Accommodation bed & meals", "Food Drinks Snacks", "Drinking water"],
    excludes: ["Personal expenses", "Tips"],
    meetingPoint: "Embakasi, Nairobi — hotel pickup on request",
    cancellationPolicy: "1. Cancellation 15 days before the tour date entitled to full refund.\n2. Cancellation 7 days before the tour, entitled to 50% refund.\n3. No refund within 7 days before commencing tour date."
  },
  {
    id: "mt-kenya-4-days",
    title: "Mt Kenya, idyllic landscapes and primeval wilderness - 4-days of true hiking experience",
    subtitle: "Private 1-2 people • Tour Ref 583394 • Nanyuki • Summit Point Lenana (3rd highest)",
    from: "Nanyuki / Embakasi, Nairobi",
    days: 4,
    price: "1540",
    deposit: "200",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 days",
    route: "Nairobi - Nanyuki - Mt Kenya - Nairobi",
    pace: "Moderate - 9km Day 1, Summit 03:30 Day 3",
    // FIXED: Removed Kilimanjaro image
    gallery: [img("mt-kenya-point-lenana-sign.jpg"), img("mt-kenya-4day-1.jpg"), img("mt-kenya-4day-2.jpg"), img("mt-kenya-summit.jpg")],
    journey: "True 4-day hiking experience in Mt Kenya's primeval wilderness. We summit the third highest point which is Point Lenana (4,985m). Mt Kenya has three main peaks: Batian Peak-1 (5,199m) highest, Nelion Peak-2 (5,188m) second highest, Point Lenana-3 (4,985m) third highest and the highest trekking peak reachable without technical climbing. From lush forests to alpine meadows and icy summits, explore with passionate, experienced mountain guide Dennis J.",
    quote: "Every journey is a story — let’s make yours unforgettable. Karibu Kenya hakuna matata!",
    highlights: ["Summit Point Lenana - 3rd highest point (4,985m)", "Batian Peak-1 (5,199m) highest, Nelion Peak-2 (5,188m) second, Point Lenana-3 (4,985m) third", "9 km trek on first day", "Summit hike starts at 03:30 hrs on third day", "Idyllic landscapes & primeval wilderness", "Real Mt Kenya Point Lenana signage photo", "New model Hybrid Noah Voxy Nairobi - Mt Kenya - Nairobi"],
    itinerary: [
      { dayNum: 1, title: "Nairobi - Nanyuki - Met Station (3,050m) - 9km Trek", details: ["Pickup Embakasi / Nairobi hotel or airport, drive to Narumoru Gate check-in", "Drive 10km to Met Station, start 9km trek through forest and moorland", "Dinner & overnight mountain accommodation (bed & meals included)"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Met Station - Mackinder's Camp (4,200m)", details: ["Moderate-level hiking over moorland", "View beautiful gorges, valleys and mountain vegetation closely", "Accommodation on mountain as per itinerary"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Mackinder's - Point Lenana Summit (4,985m) - 3rd Highest Peak - Met Station", details: ["Wake up 03:30 hrs for summit attempt to Point Lenana (4,985m) - the third highest point of Mt Kenya for sunrise", "Point Lenana is the third highest after Batian Peak-1 (5,199m) and Nelion Peak-2 (5,188m)", "View Batian and Nelion peaks closely, photos at summit signage", "Descend to Mackinder's for breakfast then continue down to Met Station"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Met Station - Nanyuki - Nairobi", details: ["Final descent, checkout at Narumoru Gate", "Private transport Hybrid Noah Voxy back to Nanyuki / Nairobi — ends back in Nairobi after descending on fourth day"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Porters", "Food", "Water bottles", "Accommodation on the mountain for up to five clients", "Private Guide - Dennis J, passionate & experienced mountain guide", "Private Transportation - New model Hybrid Noah Voxy, comfort throughout Nairobi to Mt Kenya and back", "Food Drinks Snacks as per itinerary (bed & meals included)"],
    excludes: ["Personal expenses such as park fees $52 per person", "Souvenirs", "Tips", "Personal hiking gear"],
    whatToBring: ["Sturdy hiking boots", "Warm clothing for cold summit", "Rain gear", "Sunscreen, hat, sunglasses", "Water 2L"],
    meetingPoint: "Embakasi, Nairobi, Kenya — You can request specific meeting location (your hotel) during checkout. Flexible meeting options such as hotel or airport. Ends back in Nairobi Day 4.",
    tourStart: "Nanyuki / Embakasi, Nairobi",
    tourEnd: "Nairobi",
    cancellationPolicy: "1. Cancellation 15 days before the tour date entitled to full refund.\n2. Cancellation 7 days before the tour, entitled to 50% refund.\n3. No refund within 7 days before commencing tour date."
  }
];

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase().replace(/_/g, "-")
  const direct = packages.find((p) => p.id.toLowerCase() === cleanId)
  if (direct) return direct
  const aliases: Record<string, string> = { "mt-kenya": "mount-kenya", "masai-mara-safari": "masai-mara", "mt-kenya-4days": "mt-kenya-4-days", "big-5": "big-5-lake-nakuru" }
  const aliasedId = aliases[cleanId]
  if (aliasedId) return packages.find((p) => p.id.toLowerCase() === aliasedId)
  return undefined
}
