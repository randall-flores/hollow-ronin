'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Decal,
  useTexture,
  ContactShadows,
  Float,
} from '@react-three/drei';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * GLB: single Mesh, node Object_2, material Material.001.
 * useGLTF returns nodes indexed by NODE name, so we traverse to grab the
 * first Mesh — robust regardless of naming.
 *
 * The bare GLB material is white. We override with dark cotton, then place
 * two Decals using the geometry's own bounding-box so positions scale with
 * whatever model we swap in.
 */
function Shirt({ designUrl }: { designUrl: string }) {
  const { scene } = useGLTF('/models/tshirt.glb') as any;
  const backTex   = useTexture(designUrl);
  const frontTex  = useTexture('/images/logo-mask.png');

  const data = useMemo(() => {
    let m: THREE.Mesh | null = null;
    scene.traverse((o: THREE.Object3D) => {
      if (!m && o instanceof THREE.Mesh) m = o;
    });
    if (!m) return null;

    const geom = (m as THREE.Mesh).geometry;
    geom.computeBoundingBox();
    const box    = geom.boundingBox!;
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());

    return { geom, center, size };
  }, [scene]);

  if (!data) return null;

  backTex.colorSpace  = THREE.SRGBColorSpace;
  backTex.anisotropy  = 8;
  frontTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = 8;

  const { geom, center, size } = data;

  // Position decals in MESH-LOCAL space (geometry's own coords)
  const backPos  : [number, number, number] = [
    center.x,
    center.y + size.y * 0.04,
    center.z - size.z * 0.55,
  ];
  const frontPos : [number, number, number] = [
    center.x - size.x * 0.22,
    center.y + size.y * 0.28,
    center.z + size.z * 0.55,
  ];
  const backScale  : [number, number, number] = [size.x * 0.55, size.y * 0.45, size.x * 0.6];
  const frontScale : [number, number, number] = [size.x * 0.15, size.x * 0.15, size.x * 0.3];

  // Translate mesh so geometry bbox center sits at world origin
  const meshPos : [number, number, number] = [-center.x, -center.y, -center.z];

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={geom}
      position={meshPos}
    >
      <meshStandardMaterial
        color="#141414"
        roughness={0.92}
        metalness={0}
      />

      {/* Back print — design rotated 180° to face -Z */}
      <Decal
        position={backPos}
        rotation={[0, Math.PI, 0]}
        scale={backScale}
        map={backTex}
      />

      {/* Front-left chest logo */}
      <Decal
        position={frontPos}
        rotation={[0, 0, 0]}
        scale={frontScale}
        map={frontTex}
      />
    </mesh>
  );
}

function KeyLight() {
  const ref = useRef<THREE.PointLight>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.intensity = 4.8 + Math.sin(clock.elapsedTime * 0.7) * 0.5;
    }
  });
  return (
    <pointLight
      ref={ref}
      position={[2.5, 3.5, 3]}
      color="#ff3333"
      intensity={4.8}
      distance={14}
      castShadow
    />
  );
}

export default function TshirtViewer({
  designUrl = '/designs/torii-ronin.png',
}: {
  designUrl?: string;
}) {
  return (
    <div className="w-full h-full min-h-[600px] cursor-grab active:cursor-grabbing"
      style={{ position: 'relative', background: '#080808' }}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0.05, 1.05], fov: 38 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <ambientLight intensity={0.45} />
        <KeyLight />
        <pointLight position={[-3, 1, 2.5]} color="#ddeeff" intensity={1.6} distance={10} />
        <pointLight position={[0, 0, -4]}   color="#660000" intensity={3.0} distance={10} />
        <spotLight
          position={[0, 6, 2]}
          color="#ffffff"
          intensity={2.2}
          angle={0.35}
          penumbra={0.85}
          distance={12}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0} floatIntensity={0.22}>
            <Shirt designUrl={designUrl} />
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.55}
          scale={3.5}
          blur={2.8}
          color="#550000"
          resolution={512}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.55}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.75}
          enableDamping
          dampingFactor={0.06}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 45%, #080808 100%)',
        }}
      />
    </div>
  );
}

useGLTF.preload('/models/tshirt.glb');
