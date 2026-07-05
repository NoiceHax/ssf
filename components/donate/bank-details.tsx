"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, ChevronDown, Copy, QrCode, ShieldCheck } from "lucide-react";
import { bankDetails } from "@/lib/donate";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Row = { label: string; value: string; copyable?: boolean };

const rows: Row[] = [
  { label: "Account Name", value: bankDetails.accountName },
  { label: "Account Number", value: bankDetails.accountNumber, copyable: true },
  { label: "Bank", value: bankDetails.bank },
  { label: "Branch", value: bankDetails.branch },
  { label: "IFSC", value: bankDetails.ifsc, copyable: true },
];

export function BankDetails() {
  return (
    <section id="bank-details" className="bg-surface py-20 md:py-28 lg:py-section-gap scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-gutter">
          <div className="lg:col-span-5">
            <h2 className="mb-4 font-headline text-3xl md:text-4xl lg:text-headline-lg text-primary">
              Bank Details
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Donations are accepted via direct bank transfer, NEFT/IMPS, or
              UPI. Please mention the donor name in the transaction note and,
              if possible, email us a confirmation so we can issue your 80G
              receipt.
            </p>
            <div className="mt-8 inline-flex items-start gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-5">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-secondary" />
              <p className="font-body text-body-md text-on-surface">
                All donations to {brand.name} are eligible for{" "}
                <strong>{brand.registration.taxExemption}</strong>. Receipts
                are issued within 7 working days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <dl className="divide-y divide-outline-variant overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
              {rows.map((row) => (
                <BankRow key={row.label} row={row} />
              ))}
            </dl>

            <UpiQr />
          </div>
        </div>
      </div>
    </section>
  );
}

function UpiQr() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls="upi-qr-panel"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-container-low sm:px-8"
      >
        <span className="flex items-center gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-fixed text-primary">
            <QrCode size={20} />
          </span>
          <span>
            <span className="block font-headline text-lg text-primary md:text-xl">
              Pay via UPI
            </span>
            <span className="block font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              {open ? "QR code shown below" : "Tap to reveal QR code"}
            </span>
          </span>
        </span>
        <ChevronDown
          size={22}
          className={cn(
            "shrink-0 text-on-surface-variant transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        id="upi-qr-panel"
        hidden={!open}
        className="border-t border-outline-variant px-6 py-8 sm:px-8"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-xl border border-outline-variant bg-white p-3 sm:h-64 sm:w-64">
            <Image
              src="/upi-qr.png"
              alt="UPI QR code for Sneha Sammilana Foundation"
              fill
              sizes="256px"
              className="object-contain"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-body text-body-md text-on-surface-variant">
              Scan with any UPI app (Google Pay, PhonePe, Paytm, BHIM) to
              donate directly to the foundation&rsquo;s verified account.
            </p>
            <p className="mt-4 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
              Beneficiary
            </p>
            <p className="font-headline text-lg text-primary">
              {bankDetails.accountName}
            </p>
            <p className="mt-4 font-body text-body-md text-on-surface-variant">
              Please share a screenshot to{" "}
              <a
                href={`mailto:${brand.contact.email}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {brand.contact.email}
              </a>{" "}
              so we can issue your 80G receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BankRow({ row }: { row: Row }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(row.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked, silently ignore */
    }
  }

  return (
    <div className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-5">
      <dt className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
        {row.label}
      </dt>
      <dd className="flex items-center gap-3">
        <span className="font-body text-body-md font-medium text-primary md:text-lg">
          {row.value}
        </span>
        {row.copyable && (
          <button
            type="button"
            onClick={copy}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant text-on-surface-variant transition-colors",
              copied
                ? "border-secondary bg-secondary-fixed text-secondary"
                : "hover:border-primary hover:text-primary"
            )}
            aria-label={copied ? `${row.label} copied` : `Copy ${row.label}`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
      </dd>
    </div>
  );
}
