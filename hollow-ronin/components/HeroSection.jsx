'use client';

// TODO: replace with Higgsfield video background once generated — swap <Image> for <video autoPlay muted loop playsInline>

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bebas_Neue, Rajdhani } from 'next/font/google';
import styles from './HeroSection.module.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-hero',
});

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani-hero',
});

const PETAL_COLORS = [
  'rgba(255,182,193,0.70)',
  'rgba(255,105,135,0.60)',
  'rgba(220, 20, 60,0.50)',
  'rgba(255,192,203,0.65)',
  'rgba(199, 21,133,0.45)',
];

function makePetal(w, h, fromTop = false) {
  return {
    x: Math.random() * w,
    y: fromTop ? -20 - Math.random() * 80 : Math.random() * h,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 0.6 + Math.random() * 1.4,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.05,
    rx: 4 + Math.random() * 6,
    ry: 2 + Math.random() * 3,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
    wobbleAmp: 0.3 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    alpha: 0.3 + Math.random() * 0.7,
  };
}

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: 60 }, () =>
      makePetal(canvas.width, canvas.height, false)
    );

    function draw() {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      for (const p of petals) {
        p.wobble += p.wobbleSpeed;
        p.vx += Math.sin(p.wobble) * p.wobbleAmp * 0.01;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.y > h + 20) {
          Object.assign(p, makePetal(w, h, true));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={`${styles.hero} ${bebas.variable} ${rajdhani.variable}`}>

      {/* Ken Burns background */}
      <div className={styles.kenBurns}>
        <Image
          src="/images/hero.jpg"
          alt="Hollow Ronin — Cyber Samurai Editorial"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Dark gradient: transparent → #040408 88% */}
      <div className={styles.gradientOverlay} />
      {/* Radial vignette */}
      <div className={styles.vignetteOverlay} />
      {/* Crimson tint pulse */}
      <div className={styles.crimsonPulse} />

      {/* SVG grain, opacity 0.04 */}
      <svg className={styles.grain} xmlns="http://www.w3.org/2000/svg">
        <filter id="hr-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hr-grain)" />
      </svg>

      {/* Cherry blossom particles */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Nav */}
      <nav className={styles.nav}>
        <a href="/" className={styles.logo}>HR</a>
        <ul className={styles.navLinks}>
          {['Drops', 'Lookbook', 'About', 'Shop'].map(l => (
            <li key={l}>
              <a href={`/${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Live drop badge */}
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        <span className={styles.badgeText}>Drop 001 — Live Now</span>
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <p className={styles.tagline}>— The Void Collection —</p>

        <h1 className={styles.title}>
          HOLLOW
          <span className={styles.titleOutline}>RONIN</span>
        </h1>

        <p className={styles.subtitle}>
          Fabricated in the void.<br />
          Designed for the resistance.
        </p>

        <div className={styles.divider} />

        <div className={styles.buttons}>
          <a href="/shop" className={styles.btnPrimary}>Shop Drop 001</a>
          <a href="/about" className={styles.btnGhost}>Our Story</a>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.stats}>
        {[
          { value: '001', label: 'Current Drop' },
          { value: '48H', label: 'Time Remaining' },
          { value: '∞',   label: 'No Master'       },
        ].map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
