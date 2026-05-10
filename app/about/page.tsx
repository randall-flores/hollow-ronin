'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LINES: { text: string; big: boolean; accent?: boolean; delay: number }[] = [
  { text: 'NO MASTER.',                                         big: true,  delay: 0 },
  { text: 'NO RULES.',                                          big: true,  delay: 0.08 },
  { text: 'NO MERCY.',                                          big: true,  delay: 0.16 },
  { text: 'We are the ones who left the system behind.',         big: false, delay: 0.24 },
  { text: 'Built in the void. Worn by those who understand.',    big: false, delay: 0.32 },
  { text: 'HOLLOW RONIN — DROP 001',                            big: false, accent: true, delay: 0.4 },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      padding: 'clamp(100px, 12vh, 160px) clamp(24px, 6vw, 96px) 120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Minimal logo header */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '24px clamp(24px, 6vw, 48px)', zIndex: 50 }}>
        <Link href="/" style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px',
          color: '#f0ede6', textDecoration: 'none', letterSpacing: '0.1em',
        }}>
          HR
        </Link>
      </div>

      <div style={{ maxWidth: '900px' }}>
        {LINES.map(({ text, big, accent, delay }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.85, delay, ease }}
            style={{
              marginBottom: big ? 'clamp(16px, 3vw, 32px)' : 'clamp(24px, 4vw, 48px)',
            }}
          >
            <span style={{
              display: 'block',
              fontFamily: big
                ? "'Bebas Neue', sans-serif"
                : "'Space Mono', monospace",
              fontSize: big
                ? 'clamp(52px, 10vw, 120px)'
                : 'clamp(13px, 1.4vw, 18px)',
              color: accent ? '#DC143C' : '#f0ede6',
              letterSpacing: big ? '-0.01em' : '0.1em',
              lineHeight: big ? 0.88 : 1.9,
              textTransform: big || accent ? 'uppercase' : 'none',
            }}>
              {text}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease }}
          style={{ marginTop: 'clamp(32px, 6vw, 64px)' }}
        >
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '20px 48px',
              border: '1px solid #DC143C',
              color: '#DC143C',
              textDecoration: 'none',
            }}
          >
            ENTER THE DROP
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
