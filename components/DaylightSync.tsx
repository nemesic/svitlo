"use client";

import { useEffect } from "react";
import { phaseForHour } from "@/lib/daylight";

// Re-applies the phase when an open tab crosses a phase boundary.
// The no-FOUC <head> script handles the initial paint; this keeps a
// long-lived tab in sync without polling.
export default function DaylightSync() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const apply = () => {
      const now = new Date();
      document.documentElement.setAttribute(
        "data-light",
        phaseForHour(now.getHours()),
      );
      // Schedule the next run at the top of the next hour (+1s guard).
      const next = new Date(now);
      next.setHours(now.getHours() + 1, 0, 1, 0);
      timer = setTimeout(apply, next.getTime() - now.getTime());
    };

    apply();
    return () => clearTimeout(timer);
  }, []);

  return null;
}
