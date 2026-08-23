export type Package = {
  id: string;
  title: string;
  subtitle: string;
  from: string;
  days: number;
  price: string;
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
};

const img = (name: string) => {
  if (!name) return "/Images/og-image.png"
  if (name.startsWith("http")) return name
  if (name.startsWith("/")) return name
  return `/Images/${name}`
}

export const packages: Package[] = [
  {
    id: "masai-mara",
    title: "Masai Mara Safari",
    subtitle: "Kenya's most iconic wildlife destination",
    from: "Masai Mara National Reserve",
    days: 3,
    price: "1500",
        gallery: [img("/mt-kenya.jpg")],
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
    id: "lake-nakuru",
    title: "Lake Nakuru Safari",
    subtitle: "Flamingos, rhinos & breathtaking lake views",
    from: "Lake Nakuru National Park",
    days: 1,
    price: "510",
    gallery: [img("lake-nakuru-national-park-1.jpg")],
    journey: "Lake Nakuru National Park is one of Kenya's most beautiful parks, famous for its flamingos, rhino sanctuary, and diverse birdlife.",
    highlights: ["Flamingos & over 400 bird species", "Rhino sanctuary (black & white rhinos)", "Scenic lake views", "Guided game drive", "Professional safari guide"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Lake Nakuru & Back", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Drive to Lake Nakuru National Park", "Game drive: rhinos, flamingos, lions & lake views", "Picnic lunch in the park", "Drive back to Nairobi and drop off"], meals: "Lunch" }
    ],
    includes: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees", "Bottled drinking water"],
    excludes: ["Personal expenses", "Lunch & drinks", "Tips & gratuities"],
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya Trek",
    subtitle: "Summit Africa's second-highest mountain",
    from: "Mount Kenya National Park",
    days: 4,
    price: "1500",
    gallery: [img("mount-kenya-day-trip-hike.jpg")],
    journey: "A thrilling mountain adventure through alpine landscapes, scenic trails and breathtaking views on Africa's second-highest mountain.",
    highlights: ["High-altitude trekking", "Point Lenana summit", "Experienced mountain guides", "Scenic alpine landscapes"],
    itinerary: [
      { dayNum: 1, title: "Nanyuki to Old Moses Camp", details: ["Pickup from Nanyuki hotel", "Drive to Sirimon Gate for registration", "Hike through rainforest to Old Moses Camp 3300m", "Acclimatization walk"], meals: "Dinner" },
      { dayNum: 2, title: "Old Moses to Shipton's Camp", details: ["Hike through moorland zone", "Lunch with views of peaks", "Arrive at Shipton's Camp 4200m"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Point Lenana Summit", details: ["Pre-dawn summit hike to Point Lenana 4985m", "Sunrise at the summit", "Descent back to Shipton's Camp"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Descent to Nanyuki", details: ["Morning descent to Sirimon Gate", "Transfer back to Nanyuki hotel & drop off"], meals: "Breakfast" }
    ],
    includes: ["Professional mountain guide", "Park entry fees", "Accommodation during trek", "Meals as per itinerary"],
    excludes: ["Personal expenses", "Tips & gratuities", "Travel insurance"],
  },
  {
    id: "lake-naivasha",
    title: "Lake Naivasha Safari",
    subtitle: "Boat rides, birdlife & Crescent Island",
    from: "Lake Naivasha, Rift Valley",
    days: 1,
    price: "480",
    gallery: [img("IMG-20260111-WA0018.jpg")],
    journey: "Enjoy a relaxing safari experience at Lake Naivasha, famous for its birdlife, hippos and scenic landscapes.",
    highlights: ["Boat ride on Lake Naivasha", "Bird watching & hippo viewing", "Crescent Island walking safari", "Professional tour guide"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Lake Naivasha & Back", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Drive to Lake Naivasha", "Boat ride: hippos & bird watching", "Walking safari at Crescent Island", "Drive back to Nairobi and drop off"], meals: "Lunch" }
    ],
    includes: ["Transport from Nairobi", "Professional tour guide", "Boat ride fees", "Park entry fees"],
    excludes: ["Personal expenses", "Meals & drinks"],
  },
  {
    id: "diani-beach",
    title: "Diani Beach Tour",
    subtitle: "White sands & the warm Indian Ocean",
    from: "Diani, Kenyan Coast",
    days: 3,
    price: "1500",
        gallery: [img("/Diani.png.jpg")],
    journey: "Relax on the stunning beaches of Diani, enjoy the warm Indian Ocean, water sports, marine life and rich coastal culture.",
    highlights: ["Kenya's most beautiful white-sand beaches", "Snorkeling & water sports", "Marine life & reef exploration", "Coastal culture & cuisine"],
    itinerary: [
      { dayNum: 1, title: "Nairobi to Diani", details: ["Flight or drive to Mombasa", "Transfer to Diani Beach hotel", "Relax at the beach"], meals: "Dinner" },
      { dayNum: 2, title: "Diani Water Activities", details: ["Snorkeling & water sports", "Dolphin watching - optional", "Relax on white sand beaches"], meals: "Breakfast, Dinner" },
      { dayNum: 3, title: "Diani to Nairobi", details: ["Morning at leisure", "Transfer to Mombasa Airport", "Flight back to Nairobi"], meals: "Breakfast" }
    ],
    includes: ["Beach transfers", "Guide services", "Selected activities"],
    excludes: ["Flights to Mombasa", "Meals unless specified", "Personal expenses"],
  },
  {
    id: "nairobi-wildlife-day",
    title: "Nairobi Wildlife & Orphanage Day",
    subtitle: "Max 2 people",
    from: "Nairobi",
    days: 1,
    price: "480",
    duration: "8 Hours",
    route: "Round trip from Nairobi",
    pace: "Easy pace",
        gallery: [img("/lake-nakuru-national-park-1.jpg")],
    journey: "Experience Nairobi's wild side with a morning game drive, baby elephants, and giraffe feeding.",
    quote: "From the savannah to conservation - Nairobi in one day.",
    highlights: ["Morning game drive in Nairobi National Park", "Visit baby elephants at David Sheldrick Orphanage", "Feed Rothschild giraffes at Giraffe Centre", "360° panoramic views from KICC Tower"],
    itinerary: [
      { dayNum: 1, title: "Nairobi National Park + Sheldrick + Giraffe Centre", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Game drive at Nairobi National Park", "Visit Sheldrick Elephant Orphanage 11am-12pm", "Giraffe Centre feeding experience", "KICC Tower panoramic views", "Return transfer to hotel or JKIA"], meals: "Not Included" }
    ],
    includes: ["Private airport or hotel pickup and drop-off", "Transport in a comfortable private tour van", "Professional licensed guide", "Bottled drinking water and snacks", "Entry fees to Park, Sheldrick & Giraffe Centre", "All taxes and service charges"],
    excludes: ["International flights", "Meals and drinks unless specified", "Personal expenses and souvenirs", "Tips for guide and driver"],
    whatToBring: ["Comfortable walking shoes", "Camera", "Sunglasses", "Light jacket"],
    meetingPoint: "JKIA Airport NBO or your hotel lobby",
    tourStart: "Nairobi, Kenya",
    tourEnd: "Drop-off at your hotel or JKIA Airport"
  },
  {
    id: "nairobi-culture-day",
    title: "Nairobi Culture & Heritage Day",
    subtitle: "Max 2 people",
    from: "Nairobi",
    days: 1,
    price: "480",
    duration: "8 Hours",
    route: "Round trip from Nairobi",
    pace: "Easy pace",
    gallery: [img("/IMG-20260726-WA3768.jpg")],
    journey: "Discover Nairobi's culture, history and traditions at Blixen Museum, National Museum and Bomas of Kenya.",
    quote: "History, culture and rhythm - the heart of Nairobi.",
    highlights: ["Visit Karen Blixen Museum", "Explore Nairobi National Museum", "Cultural dances at Bomas of Kenya", "Shop for crafts at Maasai Market"],
    itinerary: [
      { dayNum: 1, title: "Blixen Museum + National Museum + Bomas", details: ["Morning pickup from JKIA Airport, hotel, or city location", "Visit Karen Blixen Museum", "Explore Nairobi National Museum", "Lunch break", "Cultural show at Bomas of Kenya", "Shopping at Maasai Market", "Return transfer to hotel or JKIA"], meals: "Not Included" }
    ],
    includes: ["Private airport or hotel pickup and drop-off", "Transport in a comfortable private tour van", "Professional licensed guide", "Bottled drinking water and snacks", "Entry fees to Blixen, Museum & Bomas", "All taxes and service charges"],
    excludes: ["International flights", "Meals and drinks unless specified", "Personal expenses and souvenirs", "Tips for guide and driver"],
    whatToBring: ["Comfortable walking shoes", "Camera", "Cash for shopping"],
    meetingPoint: "JKIA Airport NBO or your hotel lobby",
    tourStart: "Nairobi, Kenya",
    tourEnd: "Drop-off at your hotel or JKIA Airport"
  }, 
  {
    id: "mt-kenya-4day",
    title: "Mt Kenya, idyllic landscapes and primeval wilderness",
    subtitle: "4-days of true hiking experience",
    from: "Nanyuki, Kenya",
    days: 4,
    price: "2190",
    duration: "4 Days",
    route: "Round trip from Nanyuki via Sirimon",
    pace: "Moderate to Challenging",
    gallery: [
      "https://cdn.toursbylocals.com/photos/253e27ef-8221-4f55-b44b-ffbddb6128b8.JPG",
      "https://cdn.toursbylocals.com/photos/4c657c57-b993-499f-8b9f-673051cc3149.JPG"
    ],
    journey: "Experience 4 days of true hiking through Mt Kenya's primeval wilderness via Sirimon Route, alpine lakes, and breathtaking landscapes to Point Lenana 4985m ASL.",
    quote: "Summit Africa's second-highest peak with a licensed guide",
    highlights: [
      "Summit Point Lenana 4985m via Sirimon Route",
      "Alpine lakes, glaciers & giant lobelias",
      "Professional licensed guide - Dennis J. #35393",
      "All meals during trek included",
      "Private transportation from Nanyuki",
    ],
    itinerary: [
      { dayNum: 1, title: "Nanyuki to Old Moses Camp via Sirimon Gate", details: ["Drive to Mt Kenya Sirimon Gate", "Park registration and briefing", "Hike through rainforest to Old Moses Camp 3300m", "Acclimatization walk"], meals: "Dinner" },
      { dayNum: 2, title: "Old Moses Camp to Shipton's Camp", details: ["Hike through moorland zone", "Lunch with views of peaks", "Arrive at Shipton's Camp 4200m"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 3, title: "Point Lenana Summit & Descent to Shipton's", details: ["Pre-dawn summit hike to Point Lenana 4985m", "Sunrise at the summit", "Descent back to Shipton's Camp after lunch"], meals: "Breakfast, Lunch, Dinner" },
      { dayNum: 4, title: "Shipton's Camp to Sirimon Gate & Nanyuki", details: ["Morning after breakfast we descend to Sirimon Gate", "Transfer back to Nanyuki hotel"], meals: "Breakfast" }
    ],
    includes: ["Professional licensed guide - Dennis J.", "Park entry fees", "Accommodation in mountain huts", "All meals on trek", "Private transportation", "Porters and cooking gear"],
    excludes: ["Personal hiking gear", "Tips for guide and porters", "Travel insurance", "Accommodation before/after trek"],
    whatToBring: ["Hiking boots", "Warm jacket", "Sleeping bag", "Headlamp", "Waterproof gear"],
    meetingPoint: "Nanyuki Town Hotel",
    tourStart: "Nanyuki, Kenya",
    tourEnd: "Drop-off in Nanyuki",
  },
  {
    id: "mt-kenya-day-hike",
    title: "Hike Mount Kenya, National Park - Full Day Tour",
    subtitle: "With local expert guide Dennis J.",
    from: "Nanyuki, Kenya",
    days: 1,
    price: "199",
    duration: "6 Hours",
    route: "Round trip from Nanyuki via Narumoru Gate",
    pace: "Moderate",
    gallery: [img("mount-kenya-day-trip-hike.jpg")],
    journey: "Enjoy hiking on glaciers and rocks, explore the ecosystem of mountain vegetation from lower to upper rock. Trek through diverse ecosystems, from lush forests to alpine meadows.",
    quote: "Every journey is a story — let's make yours unforgettable",
    highlights: ["Full day hike to Met Station 5 hours", "View beautiful gorges, valleys & mountain vegetation", "Licensed guide with 14 years experience - Dennis J. #35393", "Private transportation in Hybrid Noah Voxy", "Perfect for beginners and families"],
    itinerary: [
      { dayNum: 1, title: "Nanyuki to Met Station & Back", details: ["Morning pickup from Nanyuki town", "Drive to Mt Kenya National Park - Narumoru Gate for check-in", "Drive 10km to end of road at Met Station", "5 hour hike to view gorges, valleys & mountain vegetation", "Descend back to Met Station", "Drive down to gate for check out & return to Nanyuki"], meals: "Not Included" }
    ],
    includes: ["Private licensed guide - Dennis J.", "Private transportation in Hybrid Noah Voxy", "Park registration assistance"],
    excludes: ["Park entry fees: $52 per person", "Personal expenses", "Food, drinks & snacks", "Hiking equipment", "Accommodation"],
    whatToBring: ["Hiking boots", "Water", "Snacks", "Jacket", "Camera", "Sun hat"],
    meetingPoint: "Nyeri - Nanyuki Road, Nanyuki, Laikipia County, Kenya",
    tourStart: "Nanyuki, Kenya",
    tourEnd: "Drop-off in Nanyuki",
  }
]; 

export const getPackage = (id: string) => {
  if (!id) return undefined
  const cleanId = id.trim().toLowerCase()
  return packages.find((p) => p.id.toLowerCase() === cleanId)
}
