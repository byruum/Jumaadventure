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
  const clean = name.replace(/^\//, "").replace(/^Images\//i, "").trim()
  return encodeURI(`/${clean}`)
}

export const WHATSAPP_NUMBER = "254746011254"
export const WHATSAPP_DISPLAY = "+254 746 011254"

const CANCELLATION_POLICY = `CANCELLATION POLICY
Cancellation 15 Days or More Before the Tour:
Guests are entitled to a 100% refund of the amount paid.
Cancellation 7-14 Days Before the Tour:
Guests are entitled to a 50% refund of the amount paid.
Cancellation Within 7 Days of the Tour:
No refund will be provided for cancellations made less than 7 days before the scheduled tour commencement date.`;

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
    gallery: [img("hero-safari.png"), img("maasai-mara-national-reserve (1).jpg"), img("lake-nakuru-national-park-1.jpg"), img("Diani.png.jpg")],
    journey: "Enjoy 4 Days / 3 Nights Masai Mara Safari with pick-up & drop-off Nairobi Airport/Hotel. Stay at Sentrim Mara Lodge / Oldarpoi Lodge.",
    quote: "Karibu Kenya hakuna matata!",
    highlights: ["Game drives", "Big Five sightings", "Mara River - hippos, crocodiles, Great Migration (seasonal)", "Masai culture", "Rift Valley views", "Comfortable lodge stay"],
    itinerary: [
      { dayNum: 1, title: "Nairobi – Masai Mara", details: ["Pick-up in Nairobi, drive via the Great Rift Valley to Masai Mara", "Lunch at Sentrim Mara Lodge", "Afternoon game drive", "Dinner & overnight at lodge"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Full-Day Safari", details: ["Full-day game drive with picnic lunch", "Visit the Mara River—home to hippos, crocodiles, and the Great Migration (seasonal)", "Return to lodge for dinner & overnight"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Game Drive & Maasai Village", details: ["Morning game drive", "Visit a Maasai village to experience culture and traditions", "Optional afternoon game drive", "Dinner & overnight at lodge"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Masai Mara – Nairobi", details: ["Sunrise game drive, breakfast, and return drive to Nairobi with lunch en route", "Drop-off at hotel or airport transfer for onward flight"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Snacks & Drinking water bottle", "Professional guide", "Private Transportation", "Park entrance fees - Tickets", "Food Drinks Snacks", "Accommodation: Bed & meals @ Oldarpoi Lodge / Sentrim Mara Lodge"],
    excludes: ["Personal expenses"],
    meetingPoint: "Nairobi Airport / Hotel",
    cancellationPolicy: CANCELLATION_POLICY
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
    gallery: [img("IMG-20260827-WA2489.jpg"), img("IMG-20260827-WA1621.jpg"), img("IMG-20260827-WA7107.jpg"), img("IMG-20260827-WA4703.jpg"), img("IMG-20260827-WA0302.jpg"), img("IMG-20260827-WA3138.jpg"), img("IMG-20260827-WA8769.jpg"), img("IMG-20260827-WA6138.jpg"), img("IMG-20260827-WA7065.jpg"), img("IMG-20260827-WA9899.jpg"), img("IMG-20260827-WA3807.jpg"), img("IMG-20260827-WA5967.jpg")],
    journey: "Mt. Kenya, one of Africa's most iconic volcanic mountains, stands proudly along the equator yet remains snow-capped year-round. Its stunning peaks — Batian (5,199m) - highest, Nelion (5,190m) - second highest, and Point Lenana (4,985m) - third highest — promise an unforgettable adventure for hikers and nature lovers. Trek through diverse ecosystems, from lush forests to alpine meadows and icy summits, while learning about the mountain's rich history, geology, and unique vegetation.",
    quote: "Guided by a passionate, experienced, and safety-trained mountain guide, you'll enjoy more than just a climb — you'll experience friendship, inspiration, and care. I treat every guest like family, ensuring comfort, safety, and unforgettable memories on Africa's second-highest Mountain.",
    highlights: ["Hiking on glaciers and rocks", "Explore the ecosystem of mountain vegetation from lower to upper rock", "View beautiful gorges, valleys", "View Batian Peak-1 (5,199m), Nelion Peak-2 (5,188m), Point Lenana-3 (4,985m) closely", "Real Mt Kenya signage at Point Lenana - THIRD HIGHEST PEAK 4985m", "New model Hybrid Noah Voxy"],
    itinerary: [{ dayNum: 1, title: "Nanyuki Tour Itinerary", details: ["The journey starts in the morning with a drive from Nanyuki town to Mt Kenya National Park and check in at the Narumoru gate", "Then drive 10km to end off road at the met station before we start a hike", "The hiking will take at least 5 hrs on the mountain to be able to view beautiful gorges, valleys, mountain vegetation and view mountains closely", "Later on, come down to the met station and then drive down at the gate to check out", "If you have any special interests, please let me know"], meals: "Not Included" }],
    includes: ["Professional guide", "Private Transportation / Category: Minivan — New model Hybrid Noah Voxy"],
    excludes: ["Personal expenses - Park tickets fee 52 USD per person", "Accommodation", "Equipment", "Tickets", "Food Drinks Snacks"],
    meetingPoint: "Nyeri - Nanyuki Road, Nanyuki, Laikipia County, Kenya — Hotel pickup on request",
    tourStart: "Nanyuki",
    tourEnd: "Nanyuki",
    whatToBring: ["Hiking boots", "Warm jacket", "Rain jacket", "Hat", "Water 2L"],
    cancellationPolicy: CANCELLATION_POLICY
  },
  {
    id: "big-5-lake-nakuru",
    title: "Big 5 and Lake Nakuru, Lake Naivasha 4 Days Safari",
    subtitle: "4 Days Private Safari • Mara Sweet Acacia Lodge • Sarova Lion Hill Hotel",
    from: "Nairobi",
    days: 4,
    price: "4950",
    deposit: "500",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 Days / 3 Nights",
    route: "Nairobi - Masai Mara - Lake Nakuru - Lake Naivasha - Nairobi",
    gallery: [img("lake-nakuru-national-park-1.jpg"), img("maasai-mara-national-reserve (1).jpg"), img("IMG-20260827-WA1621.jpg")],
    journey: "4-day Big 5 private safari covering Masai Mara, Lake Nakuru and Lake Naivasha. Accommodation at Masai Mara put Mara Sweet Acacia Lodge and Sarova Lion Hill Hotel in Lake Nakuru.",
    highlights: ["Big 5 sightings Masai Mara", "Mara Sweet Acacia Lodge", "Lake Nakuru flamingos & rhinos", "Lake Naivasha boat ride - birds and hippos", "Crescent Island walk", "Great Rift Valley viewpoint"],
    itinerary: [
      { dayNum: 1, title: "Nairobi – Masai Mara", details: ["Pick-up in Nairobi via Great Rift Valley viewpoint", "Drive to Masai Mara, check in at Mara Sweet Acacia Lodge", "Afternoon game drive in Masai Mara", "Dinner & overnight at Mara Sweet Acacia Lodge"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Masai Mara Full Day", details: ["Full-day game drive with picnic lunch", "Mara River area - hippos, crocodiles, Great Migration (seasonal)", "Return to Mara Sweet Acacia Lodge"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Masai Mara – Lake Nakuru", details: ["After breakfast, drive to Lake Nakuru", "Check in at Sarova Lion Hill Hotel, followed by an afternoon game drive", "Overnight: Sarova Lion Hill Hotel"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Lake Nakuru – Lake Naivasha – Nairobi", details: ["After breakfast, drive to Lake Naivasha for a boat ride to see birds and hippos, followed by a walk at Crescent Island", "Have lunch at Lake Naivasha Resort before driving to Nairobi to end the tour"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Professional guide", "Private Transportation", "Park entrance fees", "Accommodation: Mara Sweet Acacia Lodge & Sarova Lion Hill Hotel", "Boat ride Lake Naivasha & Crescent Island walk", "Lunch at Lake Naivasha Resort Day 4", "Food Drinks Snacks", "Drinking water"],
    excludes: ["Personal expenses", "Tips"],
    meetingPoint: "Embakasi, Nairobi — hotel pickup on request",
    cancellationPolicy: CANCELLATION_POLICY
  },
  {
    id: "mt-kenya-4-days",
    title: "Mt Kenya, idyllic landscapes and primeval wilderness - 4-days of true hiking experience",
    subtitle: "Private 1-2 people • Tour Ref 583394 • Nanyuki • Summit Point Lenana (3rd highest) • 2 Pax Fullboard",
    from: "Nanyuki / Embakasi, Nairobi",
    days: 4,
    price: "1620",
    deposit: "200",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "4 days",
    route: "Nairobi - Nanyuki - Mt Kenya - Nairobi",
    pace: "Moderate - 9km Day 1, Summit 03:30 Day 3",
    gallery: [img("IMG-20260827-WA2489.jpg"), img("IMG-20260827-WA1621.jpg"), img("IMG-20260827-WA7107.jpg"), img("IMG-20260827-WA4703.jpg"), img("IMG-20260827-WA0302.jpg"), img("IMG-20260827-WA3138.jpg"), img("IMG-20260827-WA8769.jpg"), img("IMG-20260827-WA6138.jpg"), img("IMG-20260827-WA7065.jpg"), img("IMG-20260827-WA9899.jpg"), img("IMG-20260827-WA3807.jpg"), img("IMG-20260827-WA5967.jpg")],
    journey: "True 4-day hiking experience in Mt Kenya's primeval wilderness. We summit the third highest point which is Point Lenana (4,985m). Mt Kenya has three main peaks: Batian Peak-1 (5,199m) highest, Nelion Peak-2 (5,188m) second highest, Point Lenana-3 (4,985m) third highest and the highest trekking peak reachable without technical climbing. From lush forests to alpine meadows and icy summits, explore with a professional mountain guide.",
    quote: "Every journey is a story — let’s make yours unforgettable. Karibu Kenya hakuna matata!",
    highlights: ["Summit Point Lenana - 3rd highest point (4,985m)", "Batian Peak-1 (5,199m) highest, Nelion Peak-2 (5,188m) second, Point Lenana-3 (4,985m) third", "9 km trek on first day", "Summit hike starts at 03:30 hrs on third day", "Idyllic landscapes & primeval wilderness", "Accommodation for 2pax on fullboard (bed & meals)", "New model Hybrid Noah Voxy Nairobi - Mt Kenya - Nairobi"],
    itinerary: [
      { dayNum: 1, title: "Nairobi - Nanyuki - Met Station (3,050m) - 9km Trek", details: ["Pickup Embakasi / Nairobi hotel or airport, drive to Narumoru Gate check-in", "Drive 10km to Met Station, start 9km trek through forest and moorland", "Dinner & overnight mountain accommodation for 2pax on fullboard (bed & meals)"], meals: "Lunch, Dinner" },
      { dayNum: 2, title: "Met Station - Mackinder's Camp (4,200m)", details: ["Moderate-level hiking over moorland", "View beautiful gorges, valleys and mountain vegetation closely", "Accommodation for 2pax on fullboard (bed & meals)"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Mackinder's - Point Lenana Summit (4,985m) - 3rd Highest Peak - Met Station", details: ["Wake up 03:30 hrs for summit attempt to Point Lenana (4,985m) - the third highest point of Mt Kenya for sunrise", "Point Lenana is the third highest after Batian Peak-1 (5,199m) and Nelion Peak-2 (5,188m)", "View Batian and Nelion peaks closely, photos at summit signage", "Descend to Mackinder's for breakfast then continue down to Met Station"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Met Station - Nanyuki - Nairobi", details: ["Final descent, checkout at Narumoru Gate", "Private transport Hybrid Noah Voxy back to Nanyuki / Nairobi — ends back in Nairobi after descending on fourth day"], meals: "Breakfast, Lunch" }
    ],
    includes: ["Transportation pick up and drop off", "All park fees", "Professional mountain guide", "Accommodation for 2pax on fullboard (bed & meals)", "Porters and cook", "Snacks and drinking bottled water"],
    excludes: ["Personal expenses", "Gratitude tips range from $20 per day"],
    whatToBring: ["Sturdy hiking boots", "Warm clothing for cold summit", "Rain gear", "Sunscreen, hat, sunglasses", "Water 2L"],
    meetingPoint: "Embakasi, Nairobi, Kenya — You can request specific meeting location (your hotel) during checkout. Flexible meeting options such as hotel or airport. Ends back in Nairobi Day 4.",
    tourStart: "Nanyuki / Embakasi, Nairobi",
    tourEnd: "Nairobi",
    cancellationPolicy: CANCELLATION_POLICY
  },
  {
    id: "nairobi-national-park-daytrip",
    title: "Nairobi National Park + David Sheldrick + Giraffe Centre - Day Trip",
    subtitle: "Morning Game Drive • Private • Landcruiser Jeep 7 Seater • Pick-up Hotel/Airport",
    from: "Nairobi",
    days: 1,
    price: "556",
    deposit: "100",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    duration: "1 Day - Morning & Afternoon",
    route: "Nairobi Hotel/Airport - Nairobi National Park - David Sheldrick - Giraffe Centre - Hotel",
    pace: "Easy - Landcruiser Jeep safari vehicle (7 seater)",
    gallery: [img("nairobi-national-park.jpg"), img("david-sheldrick.jpg"), img("giraffe-centre.jpg"), img("nairobi-city-skyline.jpg")],
    journey: "Enjoy a full day in Nairobi starting with a morning game drive in Nairobi National Park after pick up from your hotel/airport, with a visit to David Sheldrick orphanage. And later in the afternoon we visit Giraffe Centre before being dropped to your hotel. Transportation is Landcruiser Jeep safari vehicle (7 seater).",
    highlights: ["Nairobi National Park morning game drive - Landcruiser Jeep (7 seater)", "David Sheldrick Elephant Orphanage", "Giraffe Centre", "Private Landcruiser Jeep safari vehicle", "Professional guide"],
    itinerary: [
      { dayNum: 1, title: "Morning: Nairobi N. Park Game Drive + David Sheldrick", details: ["Pick up from hotel/airport early morning with Landcruiser Jeep safari vehicle (7 seater)", "Morning game drive in Nairobi National Park", "Visit David Sheldrick orphanage"], meals: "Not Included" },
      { dayNum: 1, title: "Afternoon: Giraffe Centre", details: ["Visit Giraffe Centre in the afternoon", "Later drive to drop you to your hotel/airport to end the tour"], meals: "Not Included" }
    ],
    includes: ["Transportation - Landcruiser Jeep safari vehicle (7 seater)", "All entry fees", "Professional guide", "Snacks and drinking water", "Transfers pick up/drop off", "All tax fees & processing fees"],
    excludes: ["Personal expenses", "Daily tips ranging from ($20-30) per day"],
    meetingPoint: "Nairobi Hotel / Airport",
    cancellationPolicy: CANCELLATION_POLICY
  },
  {
    id: "nairobi-city-tour",
    title: "Amazing Nairobi City Tour - 8 Hours Cultural Tour",
    subtitle: "8 Hours Private Tour • Starts 07:30am Ends 17:00pm • City Highlights",
    from: "Nairobi, Kenya",
    days: 1,
    price: "420",
    deposit: "100",
    paypalEmail: "jumaadventuresandsafaris@gmail.com",
    paybillNo: "Coming Soon",
    paybillAcc: "JUMA ADVENTURES",
    duration: "8 hours",
    route: "Nairobi - Museum - Archives - Mamba - Giraffe - Carnivore - Blixen - KICC - Hotel/Airport",
    pace: "Easy - 5 seater luxury Noah Voxy vehicle",
    gallery: [img("nairobi-city-skyline.jpg"), img("kicc-nairobi.jpg"), img("nairobi-museums.jpg"), img("giraffe-centre.jpg")],
    journey: "Experience Nairobi City — the largest city in East Africa with historical backgrounds, tallest buildings, green environments, museums, and market cultures. Stand tall on K.I.C.C building for aerial view of the city.",
    quote: "Karibu Nairobi hakuna matata!",
    highlights: ["Nairobi Museum", "Nairobi Archives", "Mamba Village", "Giraffe Centre", "Lunch break at Carnivore Restaurant", "Karen Blixen Museum", "K.I.C.C Building - aerial view of Nairobi"],
    itinerary: [
      { dayNum: 1, title: "Morning Hours", details: ["Pick up 07:30am - Tour Starts", "Visit Nairobi Museum", "Visit Nairobi Archives", "Visit Mamba Village", "Visit Giraffe Centre", "Break for lunch at Carnivore Restaurant"], meals: "Not Included" },
      { dayNum: 2, title: "Afternoon Hours", details: ["Visit Blixen Museum", "Visit K.I.C.C Building", "Later on we drive to end the tour at your hotel/airport - Tour Ends 17:00pm"], meals: "Not Included" }
    ],
    includes: ["Transportation - 5 seater luxury Noah Voxy vehicle", "All entry fees", "Professional guide", "Snacks and drinking water", "Transfers pick up/drop off", "All tax fees & processing fees"],
    excludes: ["Personal expenses", "Daily tips ranging from ($20-30) per day"],
    whatToBring: ["Comfortable shoes", "Hat", "Sunglasses", "Camera"],
    meetingPoint: "JKIA (NBO), Embakasi, Nairobi, Kenya - You can request a specific meeting location (for example, your hotel) during the checkout",
    tourStart: "07:30am",
    tourEnd: "17:00pm",
    cancellationPolicy: CANCELLATION_POLICY
  }
];

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase().replace(/_/g, "-")
  const direct = packages.find((p) => p.id.toLowerCase() === cleanId)
  if (direct) return direct
  const aliases: Record<string, string> = {
    "mt-kenya": "mount-kenya",
    "masai-mara-safari": "masai-mara",
    "mt-kenya-4days": "mt-kenya-4-days",
    "big-5": "big-5-lake-nakuru",
    "nairobi-city": "nairobi-city-tour",
    "nairobi": "nairobi-city-tour",
    "nairobi-park": "nairobi-national-park-daytrip",
    "nairobi-national-park": "nairobi-national-park-daytrip",
    "1124863": "nairobi-city-tour"
  }
  const aliasedId = aliases[cleanId]
  if (aliasedId) return packages.find((p) => p.id.toLowerCase() === aliasedId)
  return undefined
}
