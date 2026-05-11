# Hollow Ronin — Fix Shirt Position + Listing Page

## Overview
Two fixes needed:
1. 3D shirt renders at the bottom of the canvas — fix by auto-centering the model using its bounding box at runtime
2. Shop listing page shows "COMING SOON" dark cards — replace with real product cards that show designs and link to the product page

Do both fixes, then deploy.

---

## Fix 1 — Auto-center the 3D shirt in ShirtViewer

Open the ShirtViewer component (likely `components/three/ShirtViewer.tsx` or similar path — find it).

Replace the `ShirtModel` function entirely with this version:

```tsx
function ShirtModel({ logo }: { logo: THREE.Texture }) {
  const { scene } = useGLTF('/models/oversized_t-shirt.glb') as any
  const groupRef = useRef<THREE.Group>(null!)

  useEffect(() => {
    // Step 1 — apply dark cotton material to every mesh
    scene.traverse((obj: THREE.Object3D) => {
      if (!(obj instanceof THREE.Mesh)) return
      obj.material = new THREE.MeshStandardMaterial({
        color:           new THREE.Color('#161616'),
        roughness:       0.88,
        metalness:       0.0,
        envMapIntensity: 0.0,
      })
      obj.castShadow    = true
      obj.receiveShadow = true
    })

    // Step 2 — compute bounding box of the raw scene
    const box    = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size   = box.getSize(new THREE.Vector3())

    // Step 3 — shift the scene so its center sits at local origin
    scene.position.set(-center.x, -center.y, -center.z)

    // Log for debugging — remove after confirming shirt is centered
    console.log('[ShirtViewer] bbox center:', center)
    console.log('[ShirtViewer] bbox size:', size)
  }, [scene])

  return (
    <group ref={groupRef}>
      {/*
       * The GLB is Z-UP. Rotating -90° around X converts it to Y-UP (standard Three.js).
       * After auto-centering above, the shirt center is at local (0,0,0).
       * No manual position offset needed — bounding box handles it.
       */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={scene} dispose={null} />
      </group>

      {/*
       * Logo plane — positioned in front of the shirt chest.
       * After auto-centering + rotation, front face of shirt is at approximately Z=0.16.
       * Adjust Y to move up/down, Z to move closer/further from surface.
       */}
      <mesh position={[0, 0.05, 0.18]}>
        <planeGeometry args={[0.48, 0.24]} />
        <meshBasicMaterial
          map={logo}
          transparent
          depthWrite={false}
          alphaTest={0.01}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
```

Also update the Camera and Canvas settings — replace the Canvas props:

```tsx
<Canvas
  camera={{ position: [0, 0, 2.8], fov: 42 }}
  gl={{
    antialias:           true,
    toneMapping:         THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.15,
  }}
  shadows={{ type: THREE.PCFShadowMap }}
>
```

And update ContactShadows to sit just below the shirt:

```tsx
<ContactShadows
  position={[0, -0.75, 0]}
  opacity={0.5}
  scale={4}
  blur={3}
  color="#550000"
  resolution={512}
/>
```

Keep everything else in ShirtViewer exactly as it currently is (Lights, Loader, OrbitControls, Float, vignette overlay, hint text).

---

## Fix 2 — Replace listing page "COMING SOON" cards with real product cards

Find the shop/shirts listing page component. It likely lives at one of:
- `app/shop/page.tsx`
- `app/shirts/page.tsx`  
- `components/ProductShellPage.jsx`

Open it and find where the four "COMING SOON" placeholder cards are rendered.

Replace the entire cards section with this product grid. The four products all link to `/products/torii-ronin-tee` for now (we will create separate product pages per shirt later):

```tsx
const PRODUCTS = [
  {
    id:      1,
    name:    'Torii Ronin Tee',
    tag:     'The Ronin',
    price:   '$38',
    color:   'Black',
    href:    '/products/torii-ronin-tee',
    // front design — dark shirt, samurai helmet logo
    accent:  '#cc2222',
    bg:      '#0f0f0f',
    label:   'DROP 001',
  },
  {
    id:      2,
    name:    'Dragon Tee',
    tag:     'The Dragon',
    price:   '$38',
    color:   'Black',
    href:    '/products/torii-ronin-tee',
    accent:  '#cc2222',
    bg:      '#0a0a0f',
    label:   'DROP 001',
  },
  {
    id:      3,
    name:    'Kitsune Tee',
    tag:     'The Fox Spirit',
    price:   '$38',
    color:   'Black',
    href:    '/products/torii-ronin-tee',
    accent:  '#cc2222',
    bg:      '#0f0a0a',
    label:   'DROP 001',
  },
  {
    id:      4,
    name:    'Tengu Tee',
    tag:     'The Crow Warrior',
    price:   '$38',
    color:   'White',
    href:    '/products/torii-ronin-tee',
    accent:  '#cc2222',
    bg:      '#111111',
    label:   'DROP 001',
  },
]
```

Replace the card JSX with this (adapt to whatever framework/syntax the file uses — React, JSX, TSX):

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.06)',
}}>
  {PRODUCTS.map((product) => (
    <a
      key={product.id}
      href={product.href}
      style={{
        display:         'flex',
        flexDirection:   'column',
        background:      product.bg,
        textDecoration:  'none',
        color:           '#ffffff',
        cursor:          'pointer',
        transition:      'background 0.2s ease',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Image / preview area */}
      <div style={{
        height:          340,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        background:      `radial-gradient(ellipse at center, ${product.accent}18 0%, transparent 70%)`,
        borderBottom:    '1px solid rgba(255,255,255,0.05)',
        position:        'relative',
      }}>
        {/* Drop label */}
        <span style={{
          position:    'absolute',
          top:         16,
          left:        16,
          fontSize:    9,
          letterSpacing: 4,
          fontFamily:  'monospace',
          color:       product.accent,
          opacity:     0.8,
        }}>
          {product.label}
        </span>

        {/* Shirt color badge */}
        <span style={{
          position:      'absolute',
          top:           16,
          right:         16,
          fontSize:      9,
          letterSpacing: 3,
          fontFamily:    'monospace',
          color:         'rgba(255,255,255,0.3)',
        }}>
          {product.color}
        </span>

        {/* Placeholder art — large stylized letter */}
        <div style={{
          fontSize:    120,
          fontFamily:  'Georgia, serif',
          fontWeight:  700,
          color:       'rgba(255,255,255,0.04)',
          userSelect:  'none',
          lineHeight:  1,
        }}>
          侍
        </div>

        {/* Center tag */}
        <div style={{
          position:    'absolute',
          display:     'flex',
          flexDirection: 'column',
          alignItems:  'center',
          gap:         6,
        }}>
          <div style={{
            width:       32,
            height:      1,
            background:  product.accent,
            opacity:     0.6,
          }} />
          <span style={{
            fontSize:    10,
            letterSpacing: 4,
            fontFamily:  'monospace',
            color:       'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
          }}>
            {product.tag}
          </span>
          <div style={{
            width:       32,
            height:      1,
            background:  product.accent,
            opacity:     0.6,
          }} />
        </div>
      </div>

      {/* Card footer */}
      <div style={{
        padding:         '20px 24px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
      }}>
        <div>
          <p style={{
            margin:        0,
            fontSize:      15,
            fontWeight:    600,
            fontFamily:    'Georgia, serif',
            color:         '#ffffff',
            marginBottom:  4,
          }}>
            {product.name}
          </p>
          <p style={{
            margin:        0,
            fontSize:      11,
            fontFamily:    'monospace',
            color:         'rgba(255,255,255,0.35)',
            letterSpacing: 2,
          }}>
            {product.price}
          </p>
        </div>
        <div style={{
          fontSize:      9,
          letterSpacing: 4,
          fontFamily:    'monospace',
          color:         product.accent,
          textTransform: 'uppercase',
          border:        `1px solid ${product.accent}`,
          padding:       '6px 12px',
        }}>
          View
        </div>
      </div>
    </a>
  ))}
</div>
```

If the file uses Tailwind classes instead of inline styles, convert the above to the equivalent Tailwind classes. If it uses a Link component from Next.js, replace `<a href>` with `<Link href>`.

---

## Step 3 — Build and deploy

```bash
npm run build 2>&1 | tail -40
```

Fix any TypeScript or build errors. Then deploy:

```bash
npx vercel --prod
```

---

## What to verify after deploy

1. Go to `/products/torii-ronin-tee` — shirt should be centered in the left panel, not at the bottom
2. Open the browser console — confirm the bbox center log shows values near (0,0,0) for X and Y
3. Go to `/shop` or `/shirts` (wherever the listing page lives) — four product cards should be visible with names, prices, and VIEW buttons
4. Click any card — it should navigate to `/products/torii-ronin-tee`

---

## Rules

- Do not touch any files not listed in this document
- Do not remove OrbitControls, Float, Lights, or the vignette overlay from ShirtViewer
- Do not change the product detail page layout
- If the listing page uses a different component structure than expected, adapt the card JSX to match — do not rewrite the whole page
