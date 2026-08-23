export type Package = {
  id: string;
  title: string;
  subtitle: string;
  from: string;
  days: number;
  price: string;
  duration?: string;
  route?: string;
  para?: string;
  gallery: string[];
  journey: string;
  quote?: string;
  highlights: string[];
  itinerary: { dayNum: number; title: string; details: string[]; meals?: string }[];
  includes: string[];
  excludes: string[];
  whatToBring?: string[];
  wonderful?: string;
  meetingPoint?: string;
  tourStart?: string;
  tourEnd?: string;
};

const img = (name: string) => `/images/${name}`

export const packages: Package[] = [
  {
    id: "masai-mara",
    title: "Masai Mara Safari",
    subtitle: "Kenya's most iconic wildlife destination",
    from: "Nairobi", days: 3, price: "1150",
    gallery: [img("safari-1.jpg"), img("safari-2.jpg")],
    journey: "Explore the world-famous Masai Mara National Reserve, home to the Big Five.",
    highlights: ["Big Five game drives", "Great Migration (seasonal)", "Professional guide"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Masai Mara", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Drive to Masai Mara"] },
      { dayNum: 2, title: "Full Day Game Drives", details: ["Early morning game drive", "Optional visit to Masai Village"] },
      { dayNum: 3, title: "Masai Mara to Nairobi", details: ["Final morning game drive", "Drive back to Nairobi"] },
    ],
    includes: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees"],
    excludes: ["Personal expenses", "Tips & gratuities"],
  },
  {
    id: "lake-nakuru",
    title: "Lake Nakuru Safari",
    subtitle: "Flamingos, rhinos & breathtaking lake views",
    from: "Nairobi", days: 2, price: "510",
    gallery: [img("lake-nakuru-national-park-1.jpg")],
    journey: "Lake Nakuru National Park is one of Kenya's most beautiful parks.",
    highlights: ["Flamingos & over 450 bird species", "Rhino sanctuary"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Lake Nakuru & Back", details: ["Morning pickup from JKIA Airport, hotel, or city"] },
    ],
    includes: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees"],
    excludes: ["Personal expenses", "Lunch & drinks"],
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya Trek",
    subtitle: "Summit Africa's second-highest mountain",
    from: "Nairobi", days: 4, price: "1500",
    gallery: [img("mount-kenya-day-hike.jpg")],
    journey: "A thrilling mountain adventure through alpine landscapes.",
    highlights: ["High-altitude trekking", "Mount Lenana summit"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Old Moses Camp", details: ["Pickup from Nairobi hotel", "Drive to Sirimon Gate"] },
      { dayNum: 2, title: "Old Moses to Shipton's Camp", details: ["Hike through moorland zones"] },
      { dayNum: 3, title: "Point Lenana Summit", details: ["Pre-dawn summit hike to Point Lenana 4985m"] },
      { dayNum: 4, title: "Descent to Nairobi", details: ["Morning descent to Sirimon Gate", "Transfer back to Nairobi"] },
    ],
    includes: ["Professional mountain guide", "Park entry fees"],
    excludes: ["Personal expenses", "Tips & gratuities"],
  },
  // --- NEW IDs that your homepage uses ---
  {
    id: "mt-kenya-4day",
    title: "Mt Kenya 4-Day Trek - Sirimon Route",
    subtitle: "Summit Point Lenana in 4 days",
    from: "Nairobi", days: 4, price: "1500",
    gallery: [img("mount-kenya-day-hike.jpg"), img("safari-1.jpg")],
    journey: "4-day rapid ascent via Sirimon route to Point Lenana (4985m).",
    highlights: ["Sirimon route", "Point Lenana summit", "Alpine lakes"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Old Moses", details: ["Drive to Nanyuki", "Hike to Old Moses Camp"] },
      { dayNum: 2, title: "To Shipton's", details: ["Trek to Shipton's Camp 4200m"] },
      { dayNum: 3, title: "Summit & Down", details: ["Midnight summit attempt", "Descend to Old Moses"] },
      { dayNum: 4, title: "To Nairobi", details: ["Descend to gate", "Drive to Nairobi"] },
    ],
    includes: ["Guide, porter, park fees", "Meals on mountain"],
    excludes: ["Sleeping bag", "Tips"],
  },
  {
    id: "mt-kenya-day-hike",
    title: "Mt Kenya Day Hike",
    subtitle: "Best for acclimatization & views",
    from: "Nairobi", days: 1, price: "280",
    gallery: [img("mount-kenya-day-hike.jpg")],
    journey: "Day hike in Mt Kenya National Park up to 3300m.",
    highlights: ["No technical climbing", "Great for acclimatization"],
    itinerary: [{ dayNum: 1, title: "Day Hike", details: ["Drive to park gate", "Hike 6-7 hours", "Return to Nairobi"] }],
    includes: ["Transport", "Guide", "Park fees"],
    excludes: ["Lunch", "Tips"],
  },
  {
    id: "nairobi-culture-heritage-day",
    title: "Nairobi Culture & Heritage Day",
    subtitle: "Discover Nairobi in one day",
    from: "Nairobi", days: 1, price: "120",
    gallery: [img("nairobi.jpg")],
    journey: "Explore National Museum, Karen Blixen, and Bomas of Kenya.",
    highlights: ["National Museum", "Karen Blixen Museum", "Bomas"],
    itinerary: [{ dayNum: 1, title: "City Culture Day", details: ["Museum tour", "Karen Blixen", "Bomas dances"] }],
    includes: ["Entrance fees", "Guide"],
    excludes: ["Lunch"],
  },
];

export const getPackage = (id: string) => {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();
  return packages.find(p => p.id.toLowerCase() === cleanId);
};
