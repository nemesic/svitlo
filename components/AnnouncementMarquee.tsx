"use client";

import { useStore } from "@/app/store-provider";
import type { MessageKey } from "@/lib/i18n";

const KEYS: MessageKey[] = ["marquee.1", "marquee.2", "marquee.3", "marquee.4"];

export default function AnnouncementMarquee() {
  const { t } = useStore();
  const track = (
    <span className="inline-flex items-center py-[9px] font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
      {KEYS.map((k) => (
        <span key={k} className="inline-flex items-center">
          <span className="px-[26px]">{t(k)}</span>
          <span className="opacity-35">·</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-line bg-bg">
      <div className="inline-flex animate-[svMarquee_42s_linear_infinite] will-change-transform hover:[animation-play-state:paused]">
        {track}
        <span aria-hidden="true">{track}</span>
      </div>
    </div>
  );
}
