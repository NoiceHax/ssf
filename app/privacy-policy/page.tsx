import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy | Sneha Sammilana Foundation",
  description:
    "Learn how Sneha Sammilana Foundation collects, uses, and protects your personal information.",
};

const sections = [
  {
    heading: "1. Information We Collect",
    body: [
      "We may collect the following types of information:",
    ],
    list: [
      "<strong>Personal Information:</strong> Name, email address, phone number, postal address, and other contact details when you donate, volunteer, or contact us.",
      "<strong>Financial Information:</strong> Payment details for processing donations (securely handled by third-party payment processors).",
      "<strong>Website Usage Data:</strong> Information about your interactions with our website, including IP addresses, browser type, and pages visited.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: ["We use the information collected to:"],
    list: [
      "Process donations and provide receipts.",
      "Communicate updates about our programs, events, and activities.",
      "Respond to inquiries and provide support.",
      "Improve our website functionality and user experience.",
      "Comply with legal obligations.",
    ],
  },
  {
    heading: "3. Sharing Your Information",
    body: [
      "We do not sell or share your personal information for marketing purposes.",
    ],
  },
  {
    heading: "4. Data Security",
    body: [
      "We implement robust security measures to protect your data from unauthorized access, alteration, or disclosure. However, no system can be 100% secure, and we encourage users to exercise caution when sharing sensitive information online.",
    ],
  },
  {
    heading: "5. Cookies and Tracking Technologies",
    body: [
      "Our website uses cookies to enhance user experience and analyze website traffic. You can manage cookie preferences through your browser settings.",
    ],
  },
  {
    heading: "6. Third-Party Links",
    body: ["Our website does not link to any third-party websites."],
  },
  {
    heading: "7. Changes to This Policy",
    body: [
      "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.",
    ],
  },
  {
    heading: "8. Contact Us",
    body: [
      "If you have any questions or concerns about this Privacy Policy, please contact us:",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-surface">
      <section className="mx-auto max-w-3xl px-5 pt-20 pb-24 md:px-8 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        <p className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
          Legal
        </p>
        <h1 className="mt-4 font-headline text-3xl leading-tight text-primary md:text-4xl lg:text-headline-lg">
          Privacy Policy
        </h1>
        <p className="mt-4 font-body text-body-md text-on-surface-variant">
          <strong>Effective Date:</strong> 1 January 2025
        </p>
        <p className="mt-6 font-body text-body-md leading-relaxed text-on-surface-variant md:text-body-lg">
          Sneha Sammilana Foundation values your privacy and is committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, store, and share information through our website.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-headline text-xl text-primary md:text-2xl">
                {s.heading}
              </h2>
              {s.body?.map((p, i) => (
                <p
                  key={i}
                  className="mt-3 font-body text-body-md leading-relaxed text-on-surface-variant"
                >
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-body-md leading-relaxed text-on-surface-variant marker:text-secondary">
                  {s.list.map((item, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-outline-variant bg-surface-container-low p-6 md:p-8">
          <p className="font-body text-body-md text-on-surface-variant">
            Email:{" "}
            <a
              href={`mailto:${brand.contact.email}`}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {brand.contact.email}
            </a>
          </p>
          <p className="mt-4 font-body text-body-md text-on-surface-variant">
            By using our website, you agree to this Privacy Policy. Thank you
            for supporting Sneha Sammilana Foundation and our mission to create
            a better future for all.
          </p>
        </div>
      </section>
    </article>
  );
}
