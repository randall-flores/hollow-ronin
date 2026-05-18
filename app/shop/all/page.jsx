import { getAllFamilies } from '@/lib/product-merge';
import { cardHoverImage } from '@/lib/card-images';
import { colorToFolder } from '@/lib/colors';
import ProductGridCard from '@/components/ProductGridCard';
import ProductCardStyles from '@/components/ProductCardStyles';

export const metadata = {
  title: "The Full Armory · Hollow Ronin",
  description: "Every piece, every drop. The complete Hollow Ronin armory.",
  alternates: { canonical: "/shop/all" },
};

export const revalidate = 3600;

const DROP_ORDER = { 'DROP 004': 0, 'CORE': 0, 'DROP 003': 1, 'DROP 002': 2, 'DROP 001': 3 };

export default async function ShopAllPage() {
  let families = [];
  try {
    families = await getAllFamilies();
  } catch (err) {
    console.error('[shop/all] Shopify fetch failed:', err);
  }

  families = [...families].sort((a, b) => {
    const ao = DROP_ORDER[a.label] ?? 99;
    const bo = DROP_ORDER[b.label] ?? 99;
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <ProductCardStyles />
      <style>{`
        .hr-grid-all {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 64px;
        }
        @media (max-width: 1023px) { .hr-grid-all { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 639px)  { .hr-grid-all { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; padding: 0 20px; } }
      `}</style>

      <section style={{
        padding: 'clamp(96px, 16vw, 140px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 80px)',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(201,169,97,0.10) 0%, #080808 65%)',
        borderBottom: '1px solid rgba(201,169,97,0.25)',
      }}>
        <p style={{
          margin: '0 0 18px', fontSize: 10, letterSpacing: 8,
          color: '#c9a961', fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase',
        }}>
          ⟁ &nbsp; THE FULL ARMORY &nbsp; ⟁
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(64px, 9vw, 124px)',
          color: '#f0ede6',
          letterSpacing: '0.14em',
          margin: 0, lineHeight: 1,
          textShadow: '0 0 40px rgba(201,169,97,0.18)',
        }}>
          ALL PIECES
        </h1>
        <p style={{
          marginTop: 22, fontSize: 11, letterSpacing: '0.4em',
          color: '#888', fontFamily: "'Space Mono', monospace",
          textTransform: 'uppercase',
        }}>
          {families.length} Pieces · Every Drop
        </p>
      </section>

      <section style={{ padding: '64px 0 120px' }}>
        <div className="hr-grid-all">
          {families.map((family, i) => {
            const isBackHero =
              family.category === 'shirts' ||
              family.category === 'tees' ||
              family.category === 'hoodies' ||
              family.category === 'masked-hoodies';

            const colors = family.variants.map((v) => {
              const folderColor = colorToFolder(v.color);
              const defaultUrl = isBackHero
                ? `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-back-${folderColor}.png`
                : `/mockups/${family.imageFolder}/${folderColor}/tee-${family.imageFolder}-front-${folderColor}.png`;
              const defaultAlt = isBackHero
                ? `${family.name} — back design`
                : `${family.name} — front view`;
              const hover = cardHoverImage({
                imageFolder: family.imageFolder,
                color:       v.color,
                name:        family.name,
                fallback:    { url: defaultUrl, alt: defaultAlt },
              });
              const inStockSizes = v.sizes.filter((s) => s.available).length;
              return {
                color:        v.color,
                handle:       v.handle,
                price:        v.price,
                available:    inStockSizes > 0,
                inStockSizes,
                totalSizes:   v.sizes.length,
                defaultUrl,
                defaultAlt,
                hoverUrl:     hover.url,
                hoverAlt:     hover.alt,
              };
            });

            const familyInfo = {
              name:         family.name,
              kanji:        family.kanji,
              japaneseName: family.japaneseName,
              label:        family.label,
            };

            return (
              <ProductGridCard
                key={family.designFamily}
                family={familyInfo}
                colors={colors}
                initialColor={family.lead.color}
                animationDelay={`${i * 0.04}s`}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
