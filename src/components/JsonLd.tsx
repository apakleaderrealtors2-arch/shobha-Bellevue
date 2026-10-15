import { site } from "@/lib/content";

export function JsonLd() {
  const absolute = (path: string) =>
    path.startsWith("http") ? path : `${site.siteUrl}${path}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.siteUrl}/#website`,
        url: site.siteUrl,
        name: site.name,
        description:
          "Luxury 3 and 4 bed apartments and residences by SOBHA in Feroke, Kozhikode (Kozhikkode), Kerala. Contact +91 99464 50723.",
        inLanguage: "en-IN",
        publisher: { "@id": `${site.siteUrl}/#organization` },
      },
      {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        "@id": `${site.siteUrl}/#organization`,
        name: site.name,
        alternateName: ["SOBHA Bellevue", "Bellevue Kozhikode", "Bellevue Kozhikkode"],
        url: site.siteUrl,
        telephone: site.phoneE164,
        image: absolute(site.hero),
        priceRange: site.priceFrom,
        areaServed: [
          {
            "@type": "City",
            name: "Kozhikode",
            alternateName: "Kozhikkode",
          },
          {
            "@type": "Place",
            name: "Feroke",
          },
          {
            "@type": "AdministrativeArea",
            name: "Kerala",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Feroke",
          addressLocality: "Kozhikode",
          addressRegion: "Kerala",
          postalCode: "673363",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phoneE164,
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Malayalam", "Hindi"],
          },
        ],
      },
      {
        "@type": "ApartmentComplex",
        "@id": `${site.siteUrl}/#apartment-complex`,
        name: site.name,
        description: `${site.overview} For apartments in Kozhikode / Kozhikkode, contact ${site.phoneDisplay}.`,
        url: site.siteUrl,
        image: [
          absolute(site.hero),
          absolute(site.overviewImage),
          absolute("/media/gallery/living.jpg"),
        ],
        telephone: site.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Feroke",
          addressLocality: "Kozhikode",
          addressRegion: "Kerala",
          postalCode: "673363",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 11.1809,
          longitude: 75.8276,
        },
        numberOfAccommodationUnits: site.units,
        petsAllowed: false,
        amenityFeature: site.amenities.map((item) => ({
          "@type": "LocationFeatureSpecification",
          name: item.title,
          value: true,
        })),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "32100000",
          offerCount: String(site.units),
          availability: "https://schema.org/PreOrder",
          url: `${site.siteUrl}/#enquire`,
          seller: { "@id": `${site.siteUrl}/#organization` },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.siteUrl}/#faq`,
        mainEntity: site.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
