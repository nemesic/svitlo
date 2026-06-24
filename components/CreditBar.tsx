export default function CreditBar() {
  return (
    <div className="pointer-events-none sticky bottom-0 z-[60] flex justify-center px-[clamp(18px,5vw,40px)] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
      <span className="pointer-events-auto">
        <span className="sv-shine">Concept &amp; design by</span>{" "}
        <a
          href="https://www.oleksiikobzan.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink hover:opacity-55"
        >
          KOBZAN
        </a>
      </span>
    </div>
  );
}
