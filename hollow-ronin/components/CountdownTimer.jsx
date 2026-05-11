'use client';
import { useState, useEffect } from 'react';

const TARGET = new Date('2026-05-17T00:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function getTime() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  const total = Math.floor(diff / 1000);
  return {
    d: pad(Math.floor(total / 86400)),
    h: pad(Math.floor((total % 86400) / 3600)),
    m: pad(Math.floor((total % 3600) / 60)),
    s: pad(total % 60),
    live: diff <= 0,
  };
}

const V = {
  fontFamily: "var(--font-bebas-hero, 'Bebas Neue', sans-serif)",
  fontSize: '20px',
  letterSpacing: '0.12em',
  color: '#C9A84C',
  lineHeight: 1,
};
const L = {
  fontFamily: "var(--font-rajdhani-hero, 'Rajdhani', sans-serif)",
  fontSize: '8px',
  fontWeight: 600,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: 'rgba(201,168,76,0.6)',
};

export default function CountdownTimer() {
  const [t, setT] = useState({ d: '00', h: '00', m: '00', s: '00', live: false });

  useEffect(() => {
    setT(getTime());
    const id = setInterval(() => setT(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  if (t.live) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#DC143C',
            display: 'inline-block', animation: 'blink 1.2s step-end infinite', flexShrink: 0,
          }} />
          <span style={{ ...V, fontSize: '13px', letterSpacing: '0.18em' }}>DROP IS LIVE</span>
        </div>
        <span style={L}>Access Now</span>
      </div>
    );
  }

  const units = [
    { v: t.d, l: 'DD' },
    { v: t.h, l: 'HH' },
    { v: t.m, l: 'MM' },
    { v: t.s, l: 'SS' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
        {units.map(({ v, l }, i) => (
          <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
            {i > 0 && (
              <span style={{ ...V, opacity: 0.3, paddingTop: '1px' }}>/</span>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={V}>{v}</span>
              <span style={L}>{l}</span>
            </div>
          </div>
        ))}
      </div>
      <span style={{ ...L, letterSpacing: '0.25em' }}>Time Remaining</span>
    </div>
  );
}
