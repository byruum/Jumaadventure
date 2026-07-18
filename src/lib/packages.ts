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
    id: "nairobi-city-tour-dennis",
    title: "1-Day Amazing Nairobi City Tour",
    subtitle: "History, Culture, Wildlife and City Views",
    from: "Nairobi",
    days: 1,
    price: "363",
    duration: "8 Hours",
    route: "Round trip from Nairobi",
    pace: "Easy pace",

    gallery: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587", // KICC
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0", // Sheldrick
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46", // Giraffe
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e"  // Nairobi Skyline
    ],

    journey: `Experience the best of Kenya’s capital with Juma Adventures on this full-day Nairobi City Tour...`,

    quote: "From skyscrapers to giraffes - see all sides of Nairobi in 8 hours.",

    highlights: [
      "360° panoramic views of Nairobi from KICC Tower",
      "Explore Kenya's history and culture at Nairobi National Museum",
      "Visit August 7th Memorial Park and Nairobi City Park",
      "Shop for authentic African crafts at Maasai Market",
      "Meet and feed baby elephants at Sheldrick Wildlife Trust",
      "Get face-to-face with Rothschild giraffes at Giraffe Centre"
    ],

    itinerary: [
      { 
        dayNum: 1, 
        title: "Nairobi City Tour - From Skyscrapers to Wildlife", 
        details: [
          "Morning pickup from JKIA Airport, your hotel, or city location",
          "Visit KICC, National Museum, City Park, Maasai Market",
          "Sheldrick Elephant Orphanage 11am-12pm",
          "Giraffe Centre feeding experience",
          "Return transfer to hotel or JKIA"
        ], 
        meals: "Not Included" 
      }
    ],

    includes: [
      "Private airport or hotel pickup and drop-off",
      "Transport in a comfortable private tour van",
      "Professional licensed guide: Dennis Juma",
      "Bottled drinking water and snacks during tour",
      "Entry fees to Sheldrick Elephant Orphanage and Giraffe Centre",
      "All taxes and service charges"
    ],

    excludes: [
      "International flights",
      "Meals and drinks unless specified",
      "Personal expenses and souvenirs",
      "Accommodation",
      "Nairobi National Park entry fees for Sheldrick access",
      "Tips for guide and driver"
    ],

    whatToBring: [
      "Comfortable walking shoes",
      "Light jacket or sweater for morning",
      "Camera and binoculars",
      "Sunglasses, hat, and sunscreen",
      "Cash for shopping and optional lunch"
    ],

    knowBefore: [
      "Sheldrick Elephant Orphanage visiting hours are 11:00am to 12:00pm daily",
      "Pickup location can be customized to your hotel during booking",
      "This tour is fully private and can be customized to your interests"
    ],

    meetingPoint: "JKIA Airport NBO, Embakasi, Nairobi or your hotel lobby",
    tourStart: "Nairobi, Kenya",
    tourEnd: "Tour ends with drop-off at your hotel or JKIA Airport"
  }
];

export const getPackage = (id: string) => packages.find((p) => p.id === id);
