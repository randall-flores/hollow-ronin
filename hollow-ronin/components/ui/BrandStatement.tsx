export default function BrandStatement() {
  return (
    <section className="relative px-page py-24 md:py-section border-y border-red/20 overflow-hidden">
      {/* Red grid lines background */}
      <div className="absolute inset-0 grid-lines opacity-20" style={{
        backgroundSize: "80px 80px"
      }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-2 md:space-y-4">
        <h2 className="font-bebas text-cream uppercase"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9 }}>
          We exist in the silence
        </h2>
        <h2 className="font-bebas text-stroke-cream uppercase"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9 }}>
          Between the signal and
        </h2>
        <h2 className="font-bebas text-red uppercase"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9 }}>
          The absolute void
        </h2>
      </div>

      <div className="mt-16 flex justify-center">
        <span className="font-mono text-[10px] tracking-[0.5em] text-gray-dim">
          ESTABLISHED_001 // TOKYO_LONDON_VOID
        </span>
      </div>
    </section>
  );
}
