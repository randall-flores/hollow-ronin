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
  ContactShadows,
  Float,
} from '@react-three/drei'
import * as THREE from 'three'

// ─── Logo canvas texture ──────────────────────────────────────────────────────
function useLogoTexture(): THREE.Texture {
  return useMemo(() => {
    const canvas  = document.createElement('canvas')
    canvas.width  = 1024
    canvas.height = 512
    const ctx     = canvas.getContext('2d')!

    ctx.clearRect(0, 0, 1024, 512)

    ctx.strokeStyle = '#cc2222'
    ctx.lineWidth   = 3
    ctx.beginPath(); ctx.moveTo(90,  138); ctx.lineTo(934, 138); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(90,  374); ctx.lineTo(934, 374); ctx.stroke()

    ctx.fillStyle    = '#ffffff'
    ctx.font         = 'bold 152px Georgia, serif'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('HOLLOW', 512, 212)

    ctx.fillStyle = '#cc2222'
    ctx.fillText('RONIN', 512, 336)

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
      <ambientLight intensity={0.35} />
      <pointLight ref={keyRef}  position={[2.5,  4,   3.5]} color="#ff3333" intensity={5.5} distance={16} castShadow />
      <pointLight               position={[-3,   1,   2.5]} color="#ddeeff" intensity={1.8} distance={10} />
      <pointLight               position={[0,    0,  -4]}   color="#550000" intensity={4}   distance={10} />
      <spotLight                position={[0,    7,   2]}   color="#ffffff" intensity={2.5} angle={0.32} penumbra={0.88} distance={12} castShadow shadow-mapSize={[1024, 1024]} />
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
          camera={{ position: [0, 0, 2.8], fov: 42 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
          shadows={{ type: THREE.PCFShadowMap }}
        >
          <Lights />
          <Float speed={1.3} rotationIntensity={0} floatIntensity={0.28}>
            <ShirtModel logo={logo} />
          </Float>
          <ContactShadows position={[0, -0.75, 0]} opacity={0.5} scale={4} blur={3} color="#550000" resolution={512} />
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
