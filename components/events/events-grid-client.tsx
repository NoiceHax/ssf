"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SiteEvent } from "@/src/data/events";
import { EventCard } from "./event-card";
import { Button } from "@/components/ui/button";

const INITIAL_COUNT = 8;
const CHUNK = 8;

export function EventsGridClient({ events }: { events: SiteEvent[] }) {
  const [visible, setVisible] = useState(
    Math.min(INITIAL_COUNT, events.length)
  );

  const shown = events.slice(0, visible);
  const remaining = events.length - visible;

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 md:grid-cols-2 md:gap-gutter lg:gap-10"
      >
        {shown.map((event, i) => (
          <li key={event.id} className="flex w-full min-w-0">
            <EventCard event={event} priority={i < 2} />
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <div className="mt-12 flex justify-center md:mt-16">
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              setVisible((v) => Math.min(events.length, v + CHUNK))
            }
            aria-label={`Load ${Math.min(CHUNK, remaining)} older events`}
          >
            View Older Events
            <ChevronDown size={18} className="ml-2" />
            <span className="ml-3 font-body text-label-md uppercase tracking-widest opacity-70">
              {remaining} left
            </span>
          </Button>
        </div>
      )}
    </>
  );
}
