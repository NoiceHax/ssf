import type { Metadata } from "next";
import { DonateHero } from "@/components/donate/hero";
import { WhyDonations } from "@/components/donate/why-donations";
import { WhatDonationsSupport } from "@/components/donate/what-supports";
import { BankDetails } from "@/components/donate/bank-details";
import { ContactTrustee } from "@/components/donate/contact-trustee";
import { ContactInfo } from "@/components/donate/contact-info";
import { LocationSection } from "@/components/donate/location-section";
import { NgoDetails } from "@/components/donate/ngo-details";

export const metadata: Metadata = {
  title: "Donate & Contact | Sneha Sammilana Foundation",
  description:
    "Support the Sneha Sammilana Foundation through a direct bank transfer or UPI. See where your donation goes, our bank details, and how to reach a trustee.",
};

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <WhyDonations />
      <WhatDonationsSupport />
      <BankDetails />
      <ContactTrustee />
      <ContactInfo />
      <LocationSection />
      <NgoDetails />
    </>
  );
}
