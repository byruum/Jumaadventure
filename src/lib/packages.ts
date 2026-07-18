export type Package = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  duration: string;
  priceFrom: string;
  image: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary?: string[];
};

export const packages: Package[] = [
  {
    slug: "masai-mara",
    name: "Masai Mara Safari",
    tagline: "Kenya's most iconic wildlife destination",
    location: "Masai Mara National Reserve",
    duration: "3 – 5 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/masai-mara/masai-mara-national-reserve.jpg",
    overview:
      "Explore the world-famous Masai Mara National Reserve, home to the Big Five and the spectacular Great Wildebeest Migration. This safari offers breathtaking landscapes, thrilling game drives, and unforgettable wildlife encounters.",
    highlights: [
      "Big Five wildlife viewing",
      "Great Migration (seasonal)",
      "Unlimited game drives",
      "Professional safari guide",
      "Scenic savannah landscapes",
    ],
    included: [
      "Safari vehicle & fuel",
      "Professional tour guide",
      "Park entry fees",
      "Accommodation (as per package)",
      "Bottled drinking water",
    ],
    excluded: ["Personal expenses", "Alcoholic drinks", "Tips & gratuities"],
  },
  {
    slug: "lake-nakuru",
    name: "Lake Nakuru Safari",
    tagline: "Flamingos, rhinos & breathtaking lake views",
    location: "Lake Nakuru National Park",
    duration: "1 – 2 Days",
    priceFrom: "From $350",
    image:
      "https://jumaadventure.webtool.co.ke/images/lake-nakuru-national-park/lake-nakuru-national-park-1.jpg",
    overview:
      "Lake Nakuru National Park is one of Kenya's most beautiful parks, famous for its flamingos, rhino sanctuary, and diverse birdlife. A perfect short wildlife escape with stunning lake scenery.",
    highlights: [
      "Flamingos & over 400 bird species",
      "Rhino sanctuary (black & white rhinos)",
      "Scenic lake views",
      "Guided game drive",
      "Professional safari guide",
    ],
    included: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees", "Bottled drinking water"],
    excluded: ["Personal expenses", "Lunch & drinks", "Tips & gratuities"],
  },
  {
    slug: "mount-kenya",
    name: "Mount Kenya Trek",
    tagline: "Summit Africa's second-highest mountain",
    location: "Mount Kenya National Park",
    duration: "4 – 6 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/file_00000000b8a0722f94b276953bf7dc5d.png",
    overview:
      "A thrilling mountain adventure through alpine landscapes, scenic trails and breathtaking views on Africa's second-highest mountain. Reach Point Lenana with experienced mountain guides.",
    highlights: [
      "High-altitude trekking",
      "Point Lenana summit",
      "Experienced mountain guides",
      "Scenic alpine landscapes",
    ],
    included: [
      "Professional mountain guide",
      "Park entry fees",
      "Accommodation during trek",
      "Meals as per itinerary",
    ],
    excluded: ["Personal expenses", "Tips & gratuities", "Travel insurance"],
  },
  {
    slug: "lake-naivasha",
    name: "Lake Naivasha Safari",
    tagline: "Boat rides, birdlife & Crescent Island",
    location: "Lake Naivasha, Rift Valley",
    duration: "1 – 2 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/lake-naivasha.jpg",
    overview:
      "Enjoy a relaxing safari experience at Lake Naivasha, famous for its birdlife, hippos and scenic landscapes. Ideal for nature lovers and photography enthusiasts.",
    highlights: [
      "Boat ride on Lake Naivasha",
      "Bird watching & hippo viewing",
      "Crescent Island walking safari",
      "Professional tour guide",
    ],
    included: ["Transport from Nairobi", "Professional tour guide", "Boat ride fees", "Park entry fees"],
    excluded: ["Personal expenses", "Meals & drinks"],
  },
  {
    slug: "diani-beach",
    name: "Diani Beach Tour",
    tagline: "White sands & the warm Indian Ocean",
    location: "Diani, Kenyan Coast",
    duration: "3 – 5 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/diani.jpg",
    overview:
      "Relax on the stunning beaches of Diani, enjoy the warm Indian Ocean, water sports, marine life and rich coastal culture with a professional guide from Juma Adventures.",
    highlights: [
      "Kenya's most beautiful white-sand beaches",
      "Snorkeling & water sports",
      "Marine life & reef exploration",
      "Coastal culture & cuisine",
    ],
    included: ["Beach transfers", "Guide services", "Selected activities"],
    excluded: ["Flights to Mombasa", "Meals unless specified", "Personal expenses"],
  },
  {
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

    journey: `Experience the best of Kenya’s capital with Juma Adventures on this full-day Nairobi City Tour. 
    Nairobi is one of the most unique cities in the world, home to a national park within city limits, rich 
    history, vibrant markets, and incredible wildlife conservation centers.
    
    Begin with panoramic views from the KICC rooftop, explore Kenya’s heritage at the Nairobi Museum, and 
    walk through the city’s green spaces and memorials. In the afternoon, get up close with endangered wildlife 
    at the Sheldrick Elephant Orphanage and Giraffe Centre. Travel in comfort with Dennis Juma, a licensed 
    Kenya Tourism Board guide with over 14 years of experience. This tour is perfect for first-time visitors, 
    layovers, and anyone who wants to see the real Nairobi in one day.`,

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
          "Morning pickup from JKIA Airport, your hotel, or city location in a comfortable private vehicle",
          "Drive through Nairobi CBD and view the Parliament Buildings and city architecture",
          "Visit Kenyatta International Conference Centre KICC for breathtaking views over the city",
          "Tour Nairobi National Museum to learn about Kenya's history, culture, and art",
          "Stop at Nairobi City Park and August 7th Memorial Park for photos",
          "Visit Maasai Market to shop for handmade jewelry, carvings, and fabrics",
          "Afternoon visit to David Sheldrick Wildlife Trust to see baby elephants being fed",
          "Visit Giraffe Centre to feed and take photos with endangered Rothschild giraffes",
          "Optional lunch stop at Carnivore Restaurant",
          "Return transfer to your hotel or JKIA to end the tour"
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
      "This tour is fully private and can be customized to your interests",
      "Maasai Market operates in different locations on different days",
      "Wear comfortable shoes as there will be light walking"
    ],

    meetingPoint: "JKIA Airport NBO, Embakasi, Nairobi or your hotel lobby",
    tourStart: "Nairobi, Kenya",
    tourEnd: "Tour ends with drop-off at your hotel or JKIA Airport"
  },

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
