/*
 * Shared <style> block for ProductGridCard.
 *
 * Pulled out of ProductShellPage so /shop/all (which renders raw
 * ProductGridCard without ProductShellPage) gets the same card visuals.
 */

export default function ProductCardStyles() {
  return (
    <style>{`
      @keyframes hr-fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .hr-card {
        opacity: 0;
        animation: hr-fade-up 0.8s ease-out forwards;
      }
      .hr-card-link {
        position: relative;
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        border: 1px solid rgba(244, 237, 226, 0.08);
        border-radius: 0;
        color: #f4ede2;
        text-decoration: none;
        overflow: hidden;
        isolation: isolate;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.3s ease,
                    box-shadow 0.3s ease;
      }
      .hr-card-link:hover {
        transform: translateY(-4px);
        border-color: rgba(201, 169, 97, 0.40);
        box-shadow: 0 0 20px rgba(201, 169, 97, 0.15);
      }
      .hr-card-link:hover .hr-arrow { color: #a88b45; }
      .hr-card-link:hover .hr-mock-default { opacity: 0; }
      .hr-card-link:hover .hr-mock-reveal  { opacity: 1; }
      .hr-mock-default,
      .hr-mock-reveal {
        object-fit: cover;
        transition: opacity 0.25s ease;
      }
      .hr-mock-default { opacity: 1; }
      .hr-mock-reveal  { opacity: 0; }
      @media (hover: none) {
        .hr-card-link:hover .hr-mock-default { opacity: 1; }
        .hr-card-link:hover .hr-mock-reveal  { opacity: 0; }
      }

      .hr-card-img {
        position: relative;
        aspect-ratio: 1 / 1.18;
        width: 100%;
        overflow: hidden;
        background: linear-gradient(180deg, #181818 0%, #0c0c0c 100%);
      }
      .hr-card-img::after {
        content: '';
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23g)' opacity='0.55'/></svg>");
        opacity: 0.02;
        mix-blend-mode: overlay;
        pointer-events: none;
        z-index: 4;
      }

      .hr-bracket { position: absolute; width: 10px; height: 10px; z-index: 3; pointer-events: none; }
      .hr-bracket-tl { top: 10px;    left: 10px;    border-top: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
      .hr-bracket-tr { top: 10px;    right: 10px;   border-top: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }
      .hr-bracket-bl { bottom: 10px; left: 10px;    border-bottom: 1px solid rgba(201,169,97,0.50); border-left: 1px solid rgba(201,169,97,0.50); }
      .hr-bracket-br { bottom: 10px; right: 10px;   border-bottom: 1px solid rgba(201,169,97,0.50); border-right: 1px solid rgba(201,169,97,0.50); }

      .hr-drop-badge {
        position: absolute;
        top: 14px; left: 14px;
        z-index: 5;
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: #f4ede2;
        border: 1px solid rgba(244, 237, 226, 0.30);
        padding: 3px 6px;
        text-transform: uppercase;
        background: transparent;
      }
      .hr-color-chip {
        position: absolute;
        right: 14px; bottom: 14px;
        z-index: 5;
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 10px;
        letter-spacing: 0.2em;
        color: #f4ede2;
        border: 1px solid rgba(244, 237, 226, 0.30);
        padding: 3px 6px;
        text-transform: uppercase;
        background: transparent;
      }

      .hr-card-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 18px 18px 20px;
        border-top: 1px solid rgba(244, 237, 226, 0.05);
        position: relative;
        z-index: 2;
      }
      .hr-kanji {
        font-family: 'Noto Sans JP', sans-serif;
        font-weight: 500;
        font-size: 13px;
        color: rgba(244, 237, 226, 0.70);
        line-height: 1;
        letter-spacing: 0.04em;
      }
      .hr-romaji {
        font-family: 'Anton', 'Bebas Neue', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 1.05;
        color: #f4ede2;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .hr-info-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 4px;
      }
      .hr-price {
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 13px;
        color: #f4ede2;
        letter-spacing: 0.04em;
      }
      .hr-arrow {
        font-family: 'JetBrains Mono', 'Space Mono', monospace;
        font-size: 16px;
        line-height: 1;
        color: #c9a961;
        transition: color 0.3s ease;
      }

      .hr-swatch-row { display: flex; gap: 8px; margin-top: 12px; }
      .hr-swatch {
        width: 32px;
        height: 32px;
        padding: 5px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
        color: inherit;
        text-decoration: none;
      }
      .hr-swatch:focus-visible {
        outline: 2px solid #c9a961;
        outline-offset: 2px;
      }
      .hr-swatch-dot {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #1a1a1a;
        box-shadow: 0 0 0 1px rgba(244, 237, 226, 0.12);
        display: block;
        position: relative;
        transition: box-shadow 0.2s ease, transform 0.2s ease;
      }
      .hr-swatch:hover .hr-swatch-dot {
        transform: scale(1.1);
        box-shadow: 0 0 0 2px rgba(201, 169, 97, 0.85);
      }
      .hr-swatch.is-selected .hr-swatch-dot {
        box-shadow: 0 0 0 2px #c9a961, 0 0 12px rgba(201, 169, 97, 0.45);
      }

      /* OOS swatch — strikethrough + muted, no pointer interaction */
      .hr-swatch.is-oos { cursor: not-allowed; opacity: 0.45; }
      .hr-swatch.is-oos:hover .hr-swatch-dot {
        transform: none;
        box-shadow: 0 0 0 1px rgba(244, 237, 226, 0.12);
      }
      .hr-swatch.is-oos .hr-swatch-dot::after {
        content: '';
        position: absolute;
        left: -4px; right: -4px; top: 50%;
        height: 1px;
        background: rgba(244, 237, 226, 0.85);
        transform: rotate(-20deg);
        transform-origin: center;
        pointer-events: none;
      }
    `}</style>
  );
}
