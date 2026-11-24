import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.agentName}, channel partner for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="bg-sand text-ink">
      <div className="container-page max-w-3xl py-16 md:py-24">
        <Link href="/" className="text-sm text-teal underline underline-offset-4">
          Back to Bellevue
        </Link>
        <h1 className="mt-6 font-display text-4xl">Privacy Policy</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-mute">
          <p>
            This website is owned and operated by {site.agentName} (Founder:{" "}
            {site.agentFounder}), an authorized channel partner for{" "}
            {site.name}.
          </p>
          <p>
            When you submit an enquiry, download request, or other contact form,
            we collect the details you provide (such as name, phone number, and
            email) so we can respond to your request and share relevant project
            information.
          </p>
          <p>
            By submitting your information, you authorize us to share those
            details with the respective K-RERA registered developer for
            verification and follow-up, and consent to receive project-related
            communications via phone, SMS, WhatsApp, or email.
          </p>
          <p>
            We do not sell your personal information. Access is limited to our
            team and the developer or sales partners needed to fulfil your
            enquiry.
          </p>
          <p>
            For privacy questions, contact us at{" "}
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
