export default function EmailCapture() {
  return (
    <section className="px-page py-24 md:py-section grid grid-cols-1 md:grid-cols-2 items-center gap-16">
      {/* Left */}
      <div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-red block mb-4">
          PROTOCOL_SUBSCRIPTION
        </span>
        <h2 className="font-bebas text-cream mb-8 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          JOIN THE HOLLOW<br />RECEIVE TRANSMISSIONS
        </h2>
        <div className="flex max-w-md border-b border-cream pb-2">
          <input
            type="email"
            placeholder="ENTER_EMAIL_ADDRESS"
            className="bg-transparent border-none outline-none text-cream font-mono text-[10px] tracking-widest placeholder:text-gray-dim/50 w-full"
          />
          <button className="bg-red text-cream px-6 py-2 font-mono text-[10px] tracking-widest hover:brightness-125 transition-all shrink-0">
            JOIN
          </button>
        </div>
      </div>

      {/* Right — decorative box */}
      <div className="flex justify-center md:justify-end">
        <div className="w-72 h-72 border border-red/30 flex items-center justify-center relative">
          {/* Corner dots */}
          {["top-0 left-0","top-0 right-0","bottom-0 left-0","bottom-0 right-0"].map((pos,i) => (
            <div key={i} className={`absolute ${pos} w-2 h-2 bg-red`} />
          ))}
          <p className="font-mono text-[10px] tracking-[0.15em] text-gray-dim text-center px-8 leading-relaxed">
            DATA_PACK_01: EXCLUSIVE RELEASES, STUDIO UPDATES, AND ACCESS TO THE ARCHIVE.
          </p>
        </div>
      </div>
    </section>
  );
}
