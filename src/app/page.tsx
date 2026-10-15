import Image from "next/image";
import { site } from "@/lib/content";
import { EnquireForm } from "@/components/EnquireForm";
import { HeroMedia } from "@/components/HeroMedia";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { DownloadButton } from "@/components/DownloadButton";
import { AmenityCard } from "@/components/AmenityCard";
import { ResidenceCard } from "@/components/ResidenceCard";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="bg-ink">
          <div
            id="hero-film"
            className="relative mx-auto aspect-[9/16] w-[min(100%,calc(100dvh*9/16))] overflow-hidden md:aspect-video md:w-[min(100%,calc(82vh*16/9))]"
          >
            <HeroMedia
              poster={site.hero}
              mobileVideo={site.heroVideo}
              desktopVideo={site.heroVideoDesktop}
            />
          </div>
          <div id="hero-intro" className="container-page flex flex-col gap-6 py-8 text-white md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm tracking-[0.2em] text-white/70 uppercase">
                {site.location.split("–")[0].trim()}
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                {site.name}
              </h1>
              <p className="mt-2 text-white/80">{site.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#enquire"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-sand"
              >
                Book a site visit
              </a>
              <DownloadButton document="brochure" variant="hero" />
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section className="border-b border-line bg-sand-deep/50">
          <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:gap-8 md:py-12">
            {[
              { label: "Residences", value: String(site.units) },
              { label: "Land area", value: site.landArea },
              { label: "Homes", value: "3 & 4 Bed" },
              { label: "Starting from", value: site.priceFrom },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display text-2xl text-ink md:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-mute">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="py-20 md:py-28">
          <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-sm tracking-[0.18em] text-teal uppercase">
                The project
              </p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
                Experience Beyond
              </h2>
              <p className="mt-6 text-base leading-relaxed text-mute md:text-lg">
                {site.overview}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-mute">Size</dt>
                  <dd className="mt-1 font-medium text-ink">{site.sizeRange}</dd>
                </div>
                <div>
                  <dt className="text-mute">Completion</dt>
                  <dd className="mt-1 font-medium text-ink">{site.completion}</dd>
                </div>
                <div>
                  <dt className="text-mute">Configuration</dt>
                  <dd className="mt-1 font-medium text-ink">{site.configs}</dd>
                </div>
                <div>
                  <dt className="text-mute">RERA</dt>
                  <dd className="mt-1 font-medium text-ink">
                    <a
                      href={site.reraUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-line underline-offset-4 hover:text-teal"
                    >
                      {site.rera}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <DownloadButton document="floorPlan" />
                <DownloadButton document="masterPlan" />
                <DownloadButton document="brochure" />
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-deep">
              <Image
                src={site.overviewImage}
                alt="Aerial view of Bellevue by SOBHA beside the Chaliyar River"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Homes */}
        <section id="homes" className="bg-sand-deep/40 py-20 md:py-28">
          <div className="container-page">
            <p className="text-sm tracking-[0.18em] text-teal uppercase">
              Residences
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              Choose your home
            </h2>
            <p className="mt-4 max-w-2xl text-mute">
              Limited-edition 3 and 4 bed residences — clear sizes, clear
              pricing, crafted for light and view.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {site.residences.map((home, index) => (
                <ResidenceCard
                  key={home.title}
                  title={home.title}
                  size={home.size}
                  image={home.image}
                  points={home.points}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="py-20 md:py-28">
          <div className="container-page">
            <p className="text-sm tracking-[0.18em] text-teal uppercase">
              Lifestyle
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              Amenities
            </h2>
            <p className="mt-4 max-w-2xl text-mute">
              Clubhouse, pools, landscapes, and quiet green — designed for daily
              life, not just weekends.
            </p>
            <div className="amenity-stage mt-12 grid gap-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {site.amenities.map((a) => (
                <AmenityCard key={a.title} title={a.title} image={a.image} />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-ink py-20 text-white md:py-28">
          <div className="container-page">
            <p className="text-sm tracking-[0.18em] text-white/50 uppercase">
              Gallery
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              See Bellevue
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {site.gallery.map((g) => (
                <div
                  key={g.src}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location + FAQ */}
        <section id="location" className="py-20 md:py-28">
          <div className="container-page grid gap-14 md:grid-cols-2">
            <div>
              <p className="text-sm tracking-[0.18em] text-teal uppercase">
                Location
              </p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
                Feroke, Kozhikode
              </h2>
              <p className="mt-5 text-mute leading-relaxed">
                {site.location}. Near the Chaliyar River, with views toward
                Beypore Beach and the Western Ghats — connected, yet calm.
              </p>
              <a
                href="#enquire"
                className="mt-8 inline-flex rounded-full bg-teal px-5 py-3 text-sm text-white hover:bg-teal-deep"
              >
                Book a site visit
              </a>
            </div>
            <div>
              <p className="text-sm tracking-[0.18em] text-teal uppercase">
                Good to know
              </p>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {site.faq.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                      <span className="flex items-center justify-between gap-4">
                        {item.q}
                        <span className="text-mute transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-mute">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="border-y border-line bg-sand-deep/40 py-16">
          <div className="container-page max-w-3xl">
            <p className="text-sm tracking-[0.18em] text-teal uppercase">
              About SOBHA
            </p>
            <p className="mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
              {site.about}
            </p>
          </div>
        </section>

        {/* Enquire */}
        <section id="enquire" className="py-20 md:py-28">
          <div className="container-page grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-sm tracking-[0.18em] text-teal uppercase">
                Enquire
              </p>
              <h2 className="mt-3 font-display text-4xl text-ink">
                Talk to us
              </h2>
              <p className="mt-4 text-mute">
                Share your details for a private consultation, site visit, or
                brochure.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.phoneTel}
                  className="rounded-full bg-teal px-5 py-2.5 text-sm text-white transition hover:bg-teal-deep"
                >
                  Call
                </a>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-teal px-5 py-2.5 text-sm text-teal transition hover:bg-teal hover:text-white"
                >
                  WhatsApp
                </a>
              </div>
              <p className="mt-4 text-sm text-mute">
                Enquiries:{" "}
                <a href={site.phoneTel} className="text-teal underline-offset-4 hover:underline">
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
            <div className="min-w-0 md:col-span-7 md:col-start-6">
              <EnquireForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-ink py-12 text-white/70">
        <div className="container-page flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-white/40 uppercase">
              {site.brand}
            </p>
            <p className="mt-1 font-display text-2xl text-white">
              {site.shortName}
            </p>
            <p className="mt-2 text-sm">{site.location}</p>
            <p className="mt-3 text-sm">
              Call / WhatsApp{" "}
              <a href={site.phoneTel} className="text-white underline-offset-4 hover:underline">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
          <div className="max-w-md text-xs leading-relaxed">
            <p>{site.disclaimer}</p>
            <p className="mt-3">CIN {site.cin}</p>
            <p className="mt-2">APAK</p>
          </div>
        </div>
      </footer>
    </>
  );
}
