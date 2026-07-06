"use client";

import { useState } from "react";
import { Check, Copy, ShieldCheck, Smartphone } from "lucide-react";
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
    <section id="bank-details" className="section-py bg-surface scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-gutter">
          <div className="lg:col-span-5">
            <h2 className="mb-3 font-headline text-3xl md:mb-4 md:text-4xl lg:text-headline-lg text-primary">
              Bank Details
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Donations are accepted via direct bank transfer, NEFT/IMPS, or
              UPI. Please mention the donor name in the transaction note and,
              if possible, email us a confirmation so we can issue your 80G
              receipt.
            </p>
            <div className="mt-6 inline-flex items-start gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-4 md:mt-8 md:p-5">
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

            <UpiPay />
          </div>
        </div>
      </div>
    </section>
  );
}

function UpiPay() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest md:mt-6">
      <div className="flex items-start gap-4 border-b border-outline-variant px-5 py-4 sm:px-6 md:px-8">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Smartphone size={18} />
        </span>
        <div>
          <h3 className="font-headline text-lg text-primary md:text-xl">
            Pay via UPI
          </h3>
          <p className="mt-1 font-body text-body-sm text-on-surface-variant md:text-body-md">
            Open any UPI app and send to the ID below. Mention your name in the
            payment note.
          </p>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6 md:px-8 md:py-6">
        <p className="font-body text-label-md uppercase tracking-widest text-on-surface-variant">
          UPI ID
        </p>
        <UpiIdRow id={bankDetails.upiId} />
        <p className="mt-4 font-body text-label-md uppercase tracking-widest text-on-surface-variant">
          Beneficiary
        </p>
        <p className="font-headline text-lg text-primary">{bankDetails.accountName}</p>
        <p className="mt-4 font-body text-body-sm text-on-surface-variant md:text-body-md">
          Share a screenshot to{" "}
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
  );
}

function UpiIdRow({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="mt-1 flex flex-wrap items-center gap-3">
      <span className="font-headline text-xl text-primary md:text-2xl">{id}</span>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-outline-variant px-3 font-body text-label-md uppercase tracking-widest transition-colors",
          copied
            ? "border-secondary bg-secondary-fixed text-secondary"
            : "text-on-surface-variant hover:border-primary hover:text-primary"
        )}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
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
    <div className="flex flex-col gap-1.5 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4 md:px-8 md:py-5">
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
