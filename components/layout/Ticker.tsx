export default function Ticker() {
  const words = ["BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING","BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING"];
  return (
    <div className="w-full bg-red py-3 overflow-hidden border-y border-red/30">
      <div className="flex whitespace-nowrap animate-ticker" style={{ width: "max-content" }}>
        {words.map((w, i) => (
          <span key={i} className="font-mono text-[10px] tracking-[0.2em] text-cream mx-8 uppercase">
            {w} //
          </span>
        ))}
      </div>
    </div>
  );
}
