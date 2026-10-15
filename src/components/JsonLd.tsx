import { site } from "@/lib/content";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ApartmentComplex",
        name: site.name,
        description: site.overview,
        url: site.siteUrl,
        image: [
          `${site.siteUrl}${site.hero}`,
          `${site.siteUrl}${site.overviewImage}`,
          `${site.siteUrl}/media/gallery/living.jpg`,
        ],
        telephone: "+919946450723",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Feroke",
          addressLocality: "Kozhikode",
          addressRegion: "Kerala",
          postalCode: "673363",
          addressCountry: "IN",
        },
        numberOfAccommodationUnits: site.units,
        amenityFeature: site.amenities.map((item) => ({
          "@type": "LocationFeatureSpecification",
          name: item.title,
          value: true,
        })),
      },
      {
        "@type": "FAQPage",
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
