export default function Ticker() {
  const words = ["BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING","BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING"];
  return (
    <div style={{ width: "100%", background: "#c0001e", padding: "10px 0", overflow: "hidden", borderTop: "1px solid #7a0012", borderBottom: "1px solid #7a0012" }}>
      <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {words.map((w, i) => (
          <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(240,237,230,0.9)", margin: "0 32px", textTransform: "uppercase" }}>
            {w} <span style={{ color: "#C9A84C" }}>//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
