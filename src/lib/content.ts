export const site = {
  name: "Bellevue by SOBHA",
  shortName: "Bellevue",
  brand: "SOBHA",
  tagline: "Luxury residences in Feroke, Kozhikode",
  location: "Feroke, Kozhikode – 673363, Kerala",
  configs: "3 & 4 Bed Luxury Residences",
  sizeRange: "2,243 – 3,331 Sq.Ft.",
  priceFrom: "INR 3.21 Cr.*",
  units: 298,
  landArea: "4.31 acres",
  completion: "December 2033",
  rera: "K-RERA/PRJ/KKD/135/2026",
  reraUrl: "https://rera.kerala.gov.in/",
  cin: "L45201KA1995PLC018475",
  phoneTel: "tel:+919946450723",
  whatsappUrl:
    "https://wa.me/919946450723?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Bellevue%20by%20SOBHA.",
  overview:
    "Bellevue by SOBHA presents 298 limited-edition residences with views of the Chaliyar River, Beypore Beach, and the Western Ghats. Away from the city’s bustle yet well connected, it brings expansive homes, curated amenities, and an international lifestyle.",
  documents: {
    brochure: { label: "Brochure", file: "brochure.pdf" },
    floorPlan: { label: "Floor plans", file: "floorplans.pdf" },
    masterPlan: { label: "Master plan", file: "masterplan.pdf" },
  },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.sobha.com/kozhikode/sobha-bellevue",
  hero: "/media/hero-still.jpg",
  heroVideo: "/media/hero-vertical.mp4",
  heroVideoDesktop: "/media/hero-desktop.mp4",
  overviewImage: "/media/gallery/photo-05.jpg",
  residences: [
    {
      title: "3 Bed Residences",
      size: "From 2,243 Sq.Ft.",
      image: "/media/gallery/living.jpg",
      points: ["Open living and dining", "Premium kitchen", "Balcony vistas"],
    },
    {
      title: "4 Bed Residences",
      size: "Up to 3,331 Sq.Ft.",
      image: "/media/gallery/bedroom.jpg",
      points: ["Master suite", "Walk-in wardrobe", "Grand proportions"],
    },
  ],
  amenities: [
    { title: "The Club", image: "/media/gallery/photo-16.jpg" },
    { title: "Entrance Plaza", image: "/media/gallery/entrance-plaza.jpg" },
    { title: "Lap & Leisure Pool", image: "/media/gallery/photo-11.jpg" },
    { title: "Landscape Water Feature", image: "/media/gallery/bio-pond.jpg" },
    { title: "Lawn & Outdoor Seating", image: "/media/gallery/photo-15.jpg" },
    { title: "Riverfront Setting", image: "/media/gallery/photo-07.jpg" },
  ],
  gallery: [
    { src: "/media/gallery/photo-01.jpg", alt: "Bellevue twin towers, aerial day view" },
    { src: "/media/gallery/photo-19.jpg", alt: "Bellevue twin towers beside the river at dusk" },
    { src: "/media/gallery/elevation-front.jpg", alt: "Front elevation of Bellevue by SOBHA" },
    { src: "/media/gallery/entrance-plaza.jpg", alt: "Illuminated entrance plaza" },
    { src: "/media/gallery/photo-11.jpg", alt: "Lap and leisure pool between the towers" },
    { src: "/media/gallery/photo-16.jpg", alt: "Double-height club lobby" },
    { src: "/media/gallery/balcony.jpg", alt: "Residence balcony overlooking the landscape" },
    { src: "/media/gallery/living.jpg", alt: "Living and dining area" },
    { src: "/media/gallery/dining.jpg", alt: "Dining area" },
    { src: "/media/gallery/photo-12.jpg", alt: "Residence kitchen" },
    { src: "/media/gallery/bedroom.jpg", alt: "Master bedroom" },
    { src: "/media/gallery/photo-15.jpg", alt: "Landscaped lawn and outdoor seating" },
  ],
  faq: [
    {
      q: "Where is Bellevue located?",
      a: "Feroke, Kozhikode – 673363, Kerala.",
    },
    {
      q: "How many homes are there?",
      a: "298 residences, in 3 and 4 bed configurations.",
    },
    {
      q: "What is the land area?",
      a: "4.31 acres.",
    },
    {
      q: "When is completion expected?",
      a: "December 2033.",
    },
  ],
  about:
    "SOBHA has crafted 595 projects across residential, commercial and contractual spaces, totalling 154.23 million sq. ft. — 30 years of passion at work.",
  disclaimer:
    "Price starting from INR 3.21 Cr.* is indicative and subject to change. Images are artist’s impressions unless stated otherwise. Please verify details independently. RERA: K-RERA/PRJ/KKD/135/2026.",
} as const;
