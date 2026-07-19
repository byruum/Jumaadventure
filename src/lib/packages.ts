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

export const packages: Package[] = [
  {
    id: "masai-mara",
    title: "Masai Mara Safari",
    subtitle: "Kenya's most iconic wildlife destination",
    from: "Masai Mara National Reserve",
    days: 4,
    price: "350",
    gallery: [
      "https://jumaadventure.webtool.co.ke/images/masai-mara/masai-mara-national-reserve.jpg"
    ],
    journey: "Explore the world-famous Masai Mara National Reserve, home to the Big Five and the spectacular Great Wildebeest Migration.",
    highlights: [
      "Big Five wildlife viewing",
      "Great Migration (seasonal)",
      "Unlimited game drives",
      "Professional safari guide",
      "Scenic savannah landscapes",
    ],
    itinerary: [],
    includes: [
      "Safari vehicle & fuel",
      "Professional tour guide",
      "Park entry fees",
      "Accommodation (as per package)",
      "Bottled drinking water",
    ],
    excludes: ["Personal expenses", "Alcoholic drinks", "Tips & gratuities"],
  },
  {
    id: "lake-nakuru",
    title: "Lake Nakuru Safari",
    subtitle: "Flamingos, rhinos & breathtaking lake views",
    from: "Lake Nakuru National Park",
    days: 2,
    price: "350",
    gallery: [
      "https://jumaadventure.webtool.co.ke/images/lake-nakuru-national-park/lake-nakuru-national-park-1.jpg"
    ],
    journey: "Lake Nakuru National Park is one of Kenya's most beautiful parks, famous for its flamingos, rhino sanctuary, and diverse birdlife.",
    highlights: [
      "Flamingos & over 400 bird species",
      "Rhino sanctuary (black & white rhinos)",
      "Scenic lake views",
      "Guided game drive",
      "Professional safari guide",
    ],
    itinerary: [],
    includes: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees", "Bottled drinking water"],
    excludes: ["Personal expenses", "Lunch & drinks", "Tips & gratuities"],
  },
  {
    id: "mount-kenya",
    title: "Mount Kenya Trek",
    subtitle: "Summit Africa's second-highest mountain",
    from: "Mount Kenya National Park",
    days: 5,
    price: "350",
    gallery: [
      "https://jumaadventure.webtool.co.ke/images/file_00000000b8a0722f94b276953bf7dc5d.png"
    ],
    journey: "A thrilling mountain adventure through alpine landscapes, scenic trails and breathtaking views on Africa's second-highest mountain.",
    highlights: [
      "High-altitude trekking",
      "Point Lenana summit",
      "Experienced mountain guides",
      "Scenic alpine landscapes",
    ],
    itinerary: [],
    includes: [
      "Professional mountain guide",
      "Park entry fees",
      "Accommodation during trek",
      "Meals as per itinerary",
    ],
    excludes: ["Personal expenses", "Tips & gratuities", "Travel insurance"],
  },
  {
    id: "lake-naivasha",
    title: "Lake Naivasha Safari",
    subtitle: "Boat rides, birdlife & Crescent Island",
    from: "Lake Naivasha, Rift Valley",
    days: 2,
    price: "350",
    gallery: [
      "https://jumaadventure.webtool.co.ke/images/lake-naivasha.jpg"
    ],
    journey: "Enjoy a relaxing safari experience at Lake Naivasha, famous for its birdlife, hippos and scenic landscapes.",
    highlights: [
      "Boat ride on Lake Naivasha",
      "Bird watching & hippo viewing",
      "Crescent Island walking safari",
      "Professional tour guide",
    ],
    itinerary: [],
    includes: ["Transport from Nairobi", "Professional tour guide", "Boat ride fees", "Park entry fees"],
    excludes: ["Personal expenses", "Meals & drinks"],
  },
  {
    id: "diani-beach",
    title: "Diani Beach Tour",
    subtitle: "White sands & the warm Indian Ocean",
    from: "Diani, Kenyan Coast",
    days: 4,
    price: "350",
    gallery: [
      "https://jumaadventure.webtool.co.ke/images/diani.jpg"
    ],
    journey: "Relax on the stunning beaches of Diani, enjoy the warm Indian Ocean, water sports, marine life and rich coastal culture.",
    highlights: [
      "Kenya's most beautiful white-sand beaches",
      "Snorkeling & water sports",
      "Marine life & reef exploration",
      "Coastal culture & cuisine",
    ],
    itinerary: [],
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
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46"
    ],
    journey: "Experience Nairobi's wild side with a morning game drive, baby elephants, and giraffe feeding.",
    quote: "From the savannah to conservation - Nairobi in one day.",
    highlights: [
      "Morning game drive in Nairobi National Park",
      "Visit baby elephants at David Sheldrick Orphanage",
      "Feed Rothschild giraffes at Giraffe Centre",
      "360° panoramic views from KICC Tower"
    ],
    itinerary: [
      { 
        dayNum: 1, 
        title: "Nairobi National Park + Sheldrick + Giraffe Centre", 
        details: [
          "Morning pickup from JKIA Airport, hotel, or city location",
          "Game drive at Nairobi National Park",
          "Visit Sheldrick Elephant Orphanage 11am-12pm",
          "Giraffe Centre feeding experience",
          "KICC Tower panoramic views",
          "Return transfer to hotel or JKIA"
        ], 
        meals: "Not Included" 
      }
    ],
    includes: [
      "Private airport or hotel pickup and drop-off",
      "Transport in a comfortable private tour van",
      "Professional licensed guide",
      "Bottled drinking water and snacks",
      "Entry fees to Park, Sheldrick & Giraffe Centre",
      "All taxes and service charges"
    ],
    excludes: [
      "International flights",
      "Meals and drinks unless specified",
      "Personal expenses and souvenirs",
      "Tips for guide and driver"
    ],
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
    gallery: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    ],
    journey: "Discover Nairobi's culture, history and traditions at Blixen Museum, National Museum and Bomas of Kenya.",
    quote: "History, culture and rhythm - the heart of Nairobi.",
    highlights: [
      "Visit Karen Blixen Museum",
      "Explore Nairobi National Museum",
      "Cultural dances at Bomas of Kenya",
      "Shop for crafts at Maasai Market"
    ],
    itinerary: [
      { 
        dayNum: 1, 
        title: "Blixen Museum + National Museum + Bomas", 
        details: [
          "Morning pickup from JKIA Airport, hotel, or city location",
          "Visit Karen Blixen Museum",
          "Explore Nairobi National Museum",
          "Lunch break",
          "Cultural show at Bomas of Kenya",
          "Shopping at Maasai Market",
          "Return transfer to hotel or JKIA"
        ], 
        meals: "Not Included" 
      }
    ],
    includes: [
      "Private airport or hotel pickup and drop-off",
      "Transport in a comfortable private tour van",
      "Professional licensed guide",
      "Bottled drinking water and snacks",
      "Entry fees to Blixen, Museum & Bomas",
      "All taxes and service charges"
    ],
    excludes: [
      "International flights",
      "Meals and drinks unless specified",
      "Personal expenses and souvenirs",
      "Tips for guide and driver"
    ],
    whatToBring: ["Comfortable walking shoes", "Camera", "Cash for shopping"],
    meetingPoint: "JKIA Airport NBO or your hotel lobby",
    tourStart: "Nairobi, Kenya",
     tourStart: "Nairobi, Kenya",
    tourEnd: "Drop-off at your hotel or JKIA Airport"
  },  // <-- ONLY 1 COMMA HERE. DELETE THE EXTRA }, ON LINE 257
  {
    id: "mt-kenya-4day",
    title: "Mt Kenya, idyllic landscapes and primeval wilderness",
    subtitle: "4-days of true hiking experience",
    from: "Nanyuki, Kenya",
    days: 4,
    price: "2190",  // CHANGED
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
      "Private transportation from Nanyuki"
    ],
    itinerary: [
      { 
        dayNum: 1, 
        title: "Nanyuki to Old Moses Camp via Sirimon Gate", 
        details: [
          "Drive to Mt Kenya Sirimon Gate",
          "Park registration and briefing",
          "Hike through rainforest to Old Moses Camp 3300m",
          "Acclimatization walk"
        ], 
        meals: "Dinner" 
      },
      { 
        dayNum: 2, 
        title: "Old Moses Camp to Shipton's Camp", 
        details: [
          "Hike through moorland zone",
          "Lunch with views of peaks",
          "Arrive at Shipton's Camp 4200m"
        ], 
        meals: "Breakfast, Lunch, Dinner" 
      },
      { 
        dayNum: 3, 
        title: "Point Lenana Summit & Descent to Shipton's", 
        details: [
          "Pre-dawn summit hike to Point Lenana 4985m",
          "Sunrise at the summit",
          "Descent back to Shipton's Camp after lunch"
        ], 
        meals: "Breakfast, Lunch, Dinner" 
      },
      { 
        dayNum: 4, 
        title: "Shipton's Camp to Sirimon Gate & Nanyuki", 
        details: [
          "Morning after breakfast we descend to Sirimon Gate",
          "Transfer back to Nanyuki hotel"
        ], 
        meals: "Breakfast" 
      }
    ],
    includes: [
      "Professional licensed guide - Dennis J.",
      "Park entry fees",
      "Accommodation in mountain huts",
      "All meals on trek",
      "Private transportation",
      "Porters and cooking gear"
    ],
    excludes: [
      "Personal hiking gear",
      "Tips for guide and porters",
      "Travel insurance",
      "Accommodation before/after trek"
    ],
    whatToBring: ["Hiking boots", "Warm jacket", "Sleeping bag", "Headlamp", "Waterproof gear"],
    meetingPoint: "Nanyuki Town Hotel",
    tourStart: "Nanyuki, Kenya",
    tourEnd: "Drop-off in Nanyuki"
  }
]; 

export const getPackage = (id: string) => packages.find((p) => p.id === id);
