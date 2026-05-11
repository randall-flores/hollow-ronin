'use client';

import { motion } from 'framer-motion';
import { Bebas_Neue, Cormorant_Garamond } from 'next/font/google';
import styles from './HeroSection.module.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-hero',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant-hero',
});

const ease = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <section className={`${styles.hero} ${bebas.variable} ${cormorant.variable}`}>

      {/* ── VIDEO ─────────────────────────────────── */}
      <motion.video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        poster="/designs/Cyber-Skeleton-Samurai.png"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </motion.video>

      {/* ── OVERLAYS ──────────────────────────────── */}
      {/* 1 — vignette */}
      <div className={styles.vignette} />
      {/* 2 — scanlines */}
      <div className={styles.scanlines} />
      {/* 3 — bottom bleed to black */}
      <div className={styles.bottomFade} />
      {/* 4 — grain */}
      <svg className={styles.grain} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="hr-grain-v2">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hr-grain-v2)" />
      </svg>

      {/* ── CONTENT ───────────────────────────────── */}
      <div className={styles.content}>

        {/* Label */}
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
        >
          <span className={styles.labelRule} />
          <span className={styles.labelText}>COLLECTION 001</span>
        </motion.div>

        {/* Title */}
        <h1 className={styles.title}>
          <motion.span
            className={styles.hollow}
            initial={{ opacity: 0, x: -64 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease, delay: 0.9 }}
          >
            HOLLOW
          </motion.span>
          <motion.span
            className={styles.ronin}
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease, delay: 1.1 }}
          >
            RONIN
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 1.4 }}
        >
          No Master. No Rules. No Mercy.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/shop"
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.8 }}
        >
          ENTER THE DROP
        </motion.a>

      </div>

      {/* ── SCROLL INDICATOR ──────────────────────── */}
      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 2.4 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>SCROLL</span>
      </motion.div>

    </section>
  );
}
