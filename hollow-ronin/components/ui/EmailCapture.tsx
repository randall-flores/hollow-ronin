'use client';
import { useState } from 'react';

function validateEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'already'>('idle');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) return;
    const key = 'hr_subscribers';
    const stored: string[] = JSON.parse(localStorage.getItem(key) || '[]');
    if (stored.includes(email.toLowerCase())) {
      setStatus('already');
      return;
    }
    stored.push(email.toLowerCase());
    localStorage.setItem(key, JSON.stringify(stored));
    setStatus('sent');
  }

  return (
    <section style={{ padding: "96px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "64px", background: "#131313" }} className="email-capture-section">
      <div>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c0001e", display: "block", marginBottom: "16px" }}>
          PROTOCOL_SUBSCRIPTION
        </span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#f0ede6", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "32px" }}>
          JOIN THE HOLLOW<br />RECEIVE TRANSMISSIONS
        </h2>

        {status === 'idle' && (
          <form onSubmit={submit} style={{ display: "flex", maxWidth: "420px", borderBottom: "1px solid #f0ede6", paddingBottom: "8px" }}>
            <input
              type="email"
              placeholder="ENTER_EMAIL_ADDRESS"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#f0ede6", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em",
              }}
            />
            <button type="submit" style={{
              background: "#c0001e", color: "#f0ede6", border: "none", padding: "8px 20px",
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer",
            }}>JOIN</button>
          </form>
        )}

        {status === 'sent' && (
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#DC143C", maxWidth: "420px", lineHeight: 1.8 }}>
            TRANSMISSION RECEIVED. YOU ARE NOW IN THE NETWORK.
          </p>
        )}

        {status === 'already' && (
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", maxWidth: "420px", lineHeight: 1.8 }}>
            ALREADY ENLISTED.
          </p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }} className="email-capture-right">
        <div style={{ width: "280px", height: "280px", border: "1px solid rgba(192,0,30,0.3)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {["top-left","top-right","bottom-left","bottom-right"].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: "8px", height: "8px", background: "#c0001e",
              top: pos.includes("top") ? 0 : "auto",
              bottom: pos.includes("bottom") ? 0 : "auto",
              left: pos.includes("left") ? 0 : "auto",
              right: pos.includes("right") ? 0 : "auto",
            }} />
          ))}
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b6b6b", textAlign: "center", padding: "0 32px", lineHeight: 1.8 }}>
            DATA_PACK_01: EXCLUSIVE RELEASES, STUDIO UPDATES, AND ACCESS TO THE ARCHIVE.
          </p>
        </div>
      </div>
    </section>
  );
}
