'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SWATCH_HEX } from '@/lib/colors';

/*
 * Interactive product grid card.
 *
 * Receives a precomputed `colors` array (built server-side in ProductShellPage
 * via cardHoverImage / fs-existsSync checks) so this client component does no
 * filesystem work. Clicking a swatch swaps:
 *   - hero image (and hover image)
 *   - color chip badge
 *   - card Link href (so click-anywhere-else lands on the selected color's PDP)
 *
 * Decorative dots become real buttons with proper aria + 32px touch target.
 */

export default function ProductGridCard({ family, colors, initialColor, animationDelay }) {
  const [selected, setSelected] = useState(initialColor);
  const active = colors.find((c) => c.color === selected) ?? colors[0];
  const hasMultiple = colors.length > 1;

  return (
    <Link
      href={`/products/${active.handle}`}
      prefetch={false}
      className="hr-card hr-card-link"
      style={{ animationDelay }}
      aria-label={
        hasMultiple
          ? `${family.name} · available in ${colors.length} colors`
          : family.name
      }
    >
      <div className="hr-card-img">
        <span className="hr-drop-badge">{family.label}</span>

        <Image
          key={`def-${active.color}`}
          className="hr-mock-default"
          src={active.defaultUrl}
          alt={active.defaultAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        <Image
          key={`hov-${active.color}`}
          className="hr-mock-reveal"
          src={active.hoverUrl}
          alt={active.hoverAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />

        <span className="hr-bracket hr-bracket-tl" />
        <span className="hr-bracket hr-bracket-tr" />
        <span className="hr-bracket hr-bracket-bl" />
        <span className="hr-bracket hr-bracket-br" />

        <span className="hr-color-chip">{active.color}</span>
      </div>

      <div className="hr-card-info">
        <span className="hr-kanji">{family.kanji || family.japaneseName}</span>
        <span className="hr-romaji">{family.name}</span>

        <div className="hr-info-row">
          <span className="hr-price">${active.price.toFixed(2)}</span>
          <span className="hr-arrow" aria-hidden="true">→</span>
        </div>

        {hasMultiple && (
          <div
            className="hr-swatch-row"
            role="group"
            aria-label={`${family.name} color options`}
          >
            {colors.map((c) => {
              const isSel = c.color === selected;
              return (
                <button
                  key={c.color}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelected(c.color);
                  }}
                  className={`hr-swatch${isSel ? ' is-selected' : ''}`}
                  aria-label={`Show ${c.color.toLowerCase()} variant`}
                  aria-pressed={isSel}
                >
                  <span
                    className="hr-swatch-dot"
                    style={{ background: SWATCH_HEX[c.color] ?? '#1a1a1a' }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
