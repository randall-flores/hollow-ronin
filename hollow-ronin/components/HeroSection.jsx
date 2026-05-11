'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bebas_Neue, Rajdhani } from 'next/font/google';
import styles from './HeroSection.module.css';
import CountdownTimer from './CountdownTimer';

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
  'rgba(139,0,0,0.65)',
  'rgba(201,168,76,0.55)',
  'rgba(139,0,0,0.50)',
  'rgba(201,168,76,0.45)',
  'rgba(100,0,0,0.60)',
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

      {/* Video background — desktop only */}
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Static fallback — mobile only */}
      <div className={styles.mobileFallback}>
        <Image
          src="/images/hero.jpg"
          alt="Hollow Ronin — Cyber Samurai Editorial"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>

      {/* Gradient overlay */}
      <div className={styles.gradientOverlay} />
      {/* Vignette */}
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

      {/* Live drop badge */}
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        <span className={styles.badgeText}>Drop 001 — Live Now</span>
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <p className={styles.tagline}>— THE VOID COLLECTION —</p>

        <h1 className={styles.title}>
          <span className={styles.titleSolid}>NO MASTER.</span>
          <span className={styles.titleOutline}>NO RULES.</span>
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
        <div className={styles.stat}>
          <span className={styles.statValue}>001</span>
          <span className={styles.statLabel}>Current Drop</span>
        </div>
        <div className={styles.stat}>
          <CountdownTimer />
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>∞</span>
          <span className={styles.statLabel}>No Master</span>
        </div>
      </div>

      {/* Watermark */}
      <Image
        src="/images/hollow-ronin-logo.svg"
        alt=""
        width={90}
        height={90}
        style={{ position: "absolute", bottom: "24px", right: "24px", opacity: 0.1, pointerEvents: "none" }}
      />

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
