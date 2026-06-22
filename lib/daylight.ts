export type DaylightPhase = "dawn" | "day" | "dusk" | "night";

// Boundaries: dawn 05–08, day 08–17, dusk 17–20, night 20–05.
export function phaseForHour(hour: number): DaylightPhase {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

// Blocking <head> script: set data-light before first paint (no FOUC).
// Kept dependency-free and inlined as a string so it runs during HTML parse.
export const DAYLIGHT_INLINE_SCRIPT = `(function(){try{var h=new Date().getHours();var p=(h>=5&&h<8)?"dawn":(h>=8&&h<17)?"day":(h>=17&&h<20)?"dusk":"night";document.documentElement.setAttribute("data-light",p)}catch(e){}})()`;
