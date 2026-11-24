import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for ${site.agentName}, channel partner for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <main className="bg-sand text-ink">
      <div className="container-page max-w-3xl py-16 md:py-24">
        <Link href="/" className="text-sm text-teal underline underline-offset-4">
          Back to Bellevue
        </Link>
        <h1 className="mt-6 font-display text-4xl">Terms &amp; Conditions</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-mute">
          <p>
            This digital platform is owned and operated by {site.agentName}{" "}
            (Founder: {site.agentFounder}), an authorized real estate channel
            partner registered with K-RERA under Registration No.{" "}
            {site.agentRera}.
          </p>
          <p>
            The contents of this website are published solely for general
            awareness and informational purposes and shall not be treated as a
            formal offer, invitation, or legal commitment to sell.
          </p>
          <p>
            All prices, payment plans, specifications, and unit availabilities
            mentioned here are indicative and remain subject to revision by the
            developer without prior notice. Visual representations, artistic
            impressions, and layout images are for illustrative purposes only
            and may differ from the final delivered project.
          </p>
          <p>
            All text, graphics, and layouts on this site are protected under
            applicable intellectual property laws. Unauthorized copying or
            distribution is strictly prohibited.
          </p>
          <p>
            For verified pricing, current inventory, and official documentation,
            please contact{" "}
            <a href={site.phoneTel} className="text-teal underline underline-offset-4">
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
