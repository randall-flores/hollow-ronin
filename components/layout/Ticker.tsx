export default function Ticker() {
  const words = ["BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING","BORN IN THE VOID","NO MASTER NO RULES","ARCHITECTURAL DISCIPLINE","CYBERNETIC SOUL","DROP 001 INCOMING"];
  return (
    <div style={{
      width: "100%",
      background: "#0a0a0a",
      padding: "10px 0",
      overflow: "hidden",
      borderTop: "1px solid rgba(201,169,97,0.35)",
      borderBottom: "1px solid rgba(201,169,97,0.35)",
    }}>
      <div className="animate-ticker" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {words.map((w, i) => (
          <span key={i} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(201,169,97,0.7)",
            margin: "0 32px",
            textTransform: "uppercase",
          }}>
            {w} <span style={{ color: "rgba(201,169,97,0.4)" }}>//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
