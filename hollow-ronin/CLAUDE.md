# Hollow Ronin — 3D Shirt Viewer

## Context

This is **Hollow Ronin**, a drop-based streetwear brand. Stack: Next.js + Tailwind CSS.
Brand colors: `#080808` background, `#cc2222` crimson accent, `#ffffff` text.
Typography: Georgia/Times New Roman serif for display, monospace for UI labels.

## Task

Build a production-grade 3D shirt product viewer and product page using React Three Fiber.
The GLB file `oversized_t-shirt.glb` is already in the project root.
Follow every step below in order. Do not skip any step.

---

## Step 1 — Install dependencies

```bash
npm install @react-three/fiber @react-three/drei three
npm install --save-dev @types/three
```

---

## Step 2 — Move the GLB file into place

```bash
mkdir -p public/models
mv oversized_t-shirt.glb public/models/oversized_t-shirt.glb
```

---

## Step 3 — Create `src/components/three/ShirtViewer.tsx`

Create the directory `src/components/three/` if it does not exist, then create this file exactly:

```tsx
'use client'

/**
 * HOLLOW RONIN — ShirtViewer.tsx
 *
 * GLB facts (from binary analysis — do not change these values):
 *   Meshes   : Object_2, Object_3, Object_4, Object_5  (4 parts, 1 shared material)
 *   Material : 'Material.001' — white, roughness=1, metalness=1  → must override
 *   Textures : 3 embedded PNGs (AO / normal / roughness)
 *   Axis     : Z-UP, body center at Z ≈ 1.27  → needs rotation + recentering
 */

import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from '@react-three/drei'
import * as THREE from 'three'

// ─── Logo canvas texture ──────────────────────────────────────────────────────
// Generates the HOLLOW RONIN wordmark as a transparent canvas texture.
// To use a real PNG instead: import { useTexture } from '@react-three/drei'
// then replace this hook with: const logo = useTexture('/textures/logo.png')

function useLogoTexture(): THREE.Texture {
  return useMemo(() => {
    const canvas  = document.createElement('canvas')
    canvas.width  = 1024
    canvas.height = 512
    const ctx     = canvas.getContext('2d')!

    ctx.clearRect(0, 0, 1024, 512)

    // Divider lines
    ctx.strokeStyle = '#cc2222'
    ctx.lineWidth   = 3
    ctx.beginPath(); ctx.moveTo(90,  138); ctx.lineTo(934, 138); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(90,  374); ctx.lineTo(934, 374); ctx.stroke()

    // HOLLOW — white
    ctx.fillStyle    = '#ffffff'
    ctx.font         = 'bold 152px Georgia, serif'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('HOLLOW', 512, 212)

    // RONIN — crimson
    ctx.fillStyle = '#cc2222'
    ctx.fillText('RONIN', 512, 336)

    // Katana cross mark
    ctx.strokeStyle = 'rgba(200,200,200,0.55)'
    ctx.lineWidth   = 4
    ctx.lineCap     = 'round'
    ctx.beginPath(); ctx.moveTo(512, 392); ctx.lineTo(512, 444); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(484, 418); ctx.lineTo(540, 418); ctx.stroke()

    const tex       = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])
}

// ─── Shirt mesh ───────────────────────────────────────────────────────────────

function ShirtModel({ logo }: { logo: THREE.Texture }) {
  const { scene } = useGLTF('/models/oversized_t-shirt.glb') as any

  useEffect(() => {
    scene.traverse((obj: THREE.Object3D) => {
      if (!(obj instanceof THREE.Mesh)) return
      obj.material = new THREE.MeshStandardMaterial({
        color:           new THREE.Color('#161616'),
        roughness:       0.88,
        metalness:       0.0,
        envMapIntensity: 0.35,
      })
      obj.castShadow    = true
      obj.receiveShadow = true
    })
  }, [scene])

  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.27, 0]}
    >
      <primitive object={scene} dispose={null} />

      {/*
       * Logo plane — sits in front of the chest.
       * Adjust if needed after visual check:
       *   position Y  → moves up/down on the shirt
       *   position Z  → moves closer/further from surface (increase if clipping)
       *   planeGeometry args → changes logo size [width, height]
       */}
      <mesh position={[0, 0.38, 0.18]}>
        <planeGeometry args={[0.52, 0.26]} />
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

// ─── Lighting ─────────────────────────────────────────────────────────────────

function Lights() {
  const keyRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (keyRef.current) {
      keyRef.current.intensity = 5.5 + Math.sin(clock.elapsedTime * 0.75) * 0.7
    }
  })

  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight ref={keyRef}  position={[2.5,  4,   3.5]} color="#ff3333" intensity={5.5} distance={16} castShadow />
      <pointLight               position={[-3,   1,   2.5]} color="#ddeeff" intensity={1.1} distance={10} />
      <pointLight               position={[0,    0,  -4]}   color="#550000" intensity={4}   distance={10} />
      <spotLight                position={[0,    7,   2]}   color="#ffffff" intensity={1.8} angle={0.32} penumbra={0.88} distance={12} castShadow shadow-mapSize={[1024, 1024]} />
    </>
  )
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function Loader() {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#080808',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
    }}>
      <div style={{ position: 'relative', width: 36, height: 36 }}>
        <span style={{ position: 'absolute', inset: 0,  borderRadius: '50%', border: '1px solid rgba(204,34,34,0.3)',  animation: 'hr-ping 1.4s ease-in-out infinite' }} />
        <span style={{ position: 'absolute', inset: 6,  borderRadius: '50%', border: '1px solid rgba(204,34,34,0.55)' }} />
        <span style={{ position: 'absolute', inset: 11, borderRadius: '50%', background: '#cc2222' }} />
      </div>
      <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, color: 'rgba(255,255,255,0.18)', fontFamily: 'monospace', textTransform: 'uppercase' }}>
        Loading
      </p>
      <style>{`@keyframes hr-ping { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:0;transform:scale(1.8)} }`}</style>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ShirtViewer() {
  const logo                  = useLogoTexture()
  const [hinting, setHinting] = useState(true)

  return (
    <div
      onPointerDown={() => setHinting(false)}
      style={{ position: 'relative', width: '100%', height: '100%', background: '#080808', overflow: 'hidden' }}
    >
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 0.5, 3.2], fov: 38 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
          shadows
        >
          <Lights />
          <Environment preset="night" />
          <Float speed={1.3} rotationIntensity={0} floatIntensity={0.28}>
            <ShirtModel logo={logo} />
          </Float>
          <ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={5} blur={3.5} color="#550000" resolution={512} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.55}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.75}
            enableDamping
            dampingFactor={0.06}
          />
        </Canvas>
      </Suspense>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, #080808 100%)',
      }} />

      <p style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        margin: 0, fontSize: 9, letterSpacing: 5, fontFamily: 'monospace',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', pointerEvents: 'none',
        transition: 'opacity 0.7s ease', opacity: hinting ? 1 : 0,
      }}>
        ← drag to rotate →
      </p>
    </div>
  )
}

useGLTF.preload('/models/oversized_t-shirt.glb')
```

---

## Step 4 — Create `src/components/three/ProductPage.tsx`

```tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ShirtViewer = dynamic(() => import('./ShirtViewer'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>Loading</p>
    </div>
  ),
})

const SIZES   = ['XS', 'S', 'M', 'L', 'XL'] as const
type Size     = typeof SIZES[number]

const DETAILS: [string, string][] = [
  ['Material', '100% heavyweight cotton, 250gsm'],
  ['Print',    'DTG front + back, wash-safe ink'],
  ['Fit',      'Oversized — size down if unsure'],
  ['Ships',    '5–8 business days, worldwide'],
  ['Made by',  'Print-on-demand via Printify'],
]

function SizeBtn({ label, selected, onClick }: { label: Size; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 44, height: 44, fontSize: 11, fontFamily: 'monospace', letterSpacing: 1,
      border: `1px solid ${selected ? '#cc2222' : 'rgba(255,255,255,0.12)'}`,
      background: selected ? 'rgba(204,34,34,0.12)' : 'transparent',
      color: selected ? '#ffffff' : 'rgba(255,255,255,0.42)',
      cursor: 'pointer', transition: 'all 0.18s ease', outline: 'none',
    }}>
      {label}
    </button>
  )
}

function Rule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ width: 4, height: 4, background: 'rgba(204,34,34,0.38)', transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

export default function ProductPage() {
  const [size,      setSize]      = useState<Size | null>(null)
  const [qty,       setQty]       = useState(1)
  const [cartState, setCartState] = useState<'idle' | 'added'>('idle')

  const handleAdd = () => {
    if (!size) return
    setCartState('added')
    setTimeout(() => setCartState('idle'), 2200)
    // TODO: wire up Shopify cart mutation here
  }

  return (
    <main style={{ minHeight: '100vh', background: '#080808', color: '#ffffff', display: 'flex', fontFamily: 'Georgia, Times New Roman, serif' }}>

      {/* 3D Viewer — left 58% */}
      <div style={{ position: 'relative', width: '58%', height: '100vh', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 10, pointerEvents: 'none' }}>
          <p style={{ margin: 0, fontSize: 9, letterSpacing: 6, color: 'rgba(255,255,255,0.13)', fontFamily: 'monospace' }}>HOLLOW RONIN</p>
          <p style={{ margin: '5px 0 0', fontSize: 9, letterSpacing: 4, color: 'rgba(204,34,34,0.65)', fontFamily: 'monospace' }}>DROP 001</p>
        </div>
        <ShirtViewer />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(204,34,34,0.18) 40%, rgba(204,34,34,0.18) 60%, transparent)' }} />
      </div>

      {/* Product info — right side */}
      <div style={{ flex: 1, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 52px', gap: 30 }}>

        <div>
          <p style={{ margin: '0 0 14px', fontSize: 9, letterSpacing: 5, color: '#cc2222', fontFamily: 'monospace', textTransform: 'uppercase' }}>Drop 001  ·  Limited Edition</p>
          <h1 style={{ margin: '0 0 18px', fontSize: 42, fontWeight: 700, lineHeight: 1.06, letterSpacing: -0.5 }}>Torii Ronin Tee</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 24, fontFamily: 'monospace' }}>$38.00</span>
            <span style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>USD</span>
          </div>
        </div>

        <Rule />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Size</p>
            {!size && <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(204,34,34,0.5)', fontFamily: 'monospace' }}>Required</p>}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {SIZES.map((s) => <SizeBtn key={s} label={s} selected={size === s} onClick={() => setSize(s)} />)}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ margin: 0, fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase' }}>Quantity</p>
          <div style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.1)' }}>
            {(['−', String(qty), '+'] as const).map((label, i) => (
              <button key={i}
                onClick={i === 0 ? () => setQty(q => Math.max(1, q - 1)) : i === 2 ? () => setQty(q => q + 1) : undefined}
                disabled={i === 1}
                style={{
                  width: 44, height: 44, background: 'transparent', border: 'none',
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  color: i === 1 ? '#ffffff' : 'rgba(255,255,255,0.38)',
                  fontFamily: 'monospace', fontSize: i === 1 ? 14 : 18,
                  cursor: i === 1 ? 'default' : 'pointer', outline: 'none',
                }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAdd} disabled={!size} style={{
          height: 56, width: '100%', outline: 'none', fontFamily: 'monospace',
          fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
          cursor: size ? 'pointer' : 'not-allowed', transition: 'all 0.22s ease',
          border: `1px solid ${!size ? 'rgba(255,255,255,0.08)' : cartState === 'added' ? 'rgba(204,34,34,0.5)' : '#cc2222'}`,
          background: !size ? 'transparent' : cartState === 'added' ? 'rgba(204,34,34,0.1)' : '#cc2222',
          color: !size ? 'rgba(255,255,255,0.16)' : cartState === 'added' ? '#cc2222' : '#ffffff',
        }}>
          {cartState === 'added' ? '✓  Added to Cart' : !size ? 'Select a Size' : 'Add to Cart'}
        </button>

        <Rule />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
          {DETAILS.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <p style={{ margin: 0, fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.26)', fontFamily: 'monospace', textTransform: 'uppercase', width: 56, flexShrink: 0, paddingTop: 2 }}>{label}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{value}</p>
            </div>
          ))}
        </div>

        <p style={{ margin: '8px 0 0', fontSize: 10, letterSpacing: 3, fontFamily: 'monospace', color: 'rgba(255,255,255,0.05)' }}>
          © HOLLOW RONIN  ·  No master. No rules.
        </p>
      </div>
    </main>
  )
}
```

---

## Step 5 — Create the route

Create `src/app/products/torii-ronin-tee/page.tsx`:

```tsx
export { default } from '@/components/three/ProductPage'
```

---

## Step 6 — Patch `next.config.js`

Open `next.config.js` (or `next.config.ts`). Add the webpack GLB rule.
If the file already has a `webpack` function, merge the rule into it — do not replace the file.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig
```

---

## Step 7 — Run dev and verify

```bash
npm run dev
```

Open `http://localhost:3000/products/torii-ronin-tee`

**Expected:**
- Dark `#080808` scene loads, crimson pulse loader visible while GLB streams
- Shirt appears dark charcoal — matte, not white or shiny
- Shirt auto-rotates slowly with a gentle float
- Crimson key light pulses subtly on the fabric
- Crimson shadow beneath the shirt
- `HOLLOW RONIN` logo visible on the front chest
- Mouse drag rotates 360° horizontal, clamped vertical
- Hint text disappears on first interaction

---

## Important rules for Claude Code

- Do NOT use `any` types except the single `as any` cast on `useGLTF`
- Do NOT convert inline styles to Tailwind — values are pixel-precise from the design spec
- Do NOT increase `rotationIntensity` on `Float` — it is `0` intentionally to keep the logo plane aligned
- Do NOT add an animation mixer — this GLB has no animations
- If TypeScript throws on drei imports, add `/// <reference types="three" />` at the top of `ShirtViewer.tsx`
- If `@react-three/fiber` causes SSR errors, confirm `ssr: false` is set in the dynamic import in `ProductPage.tsx`
