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
function Shirt({
  designUrl,
  shirtColor,
}: {
  designUrl: string
  shirtColor: 'Black' | 'White'
}) {
  const { scene } = useGLTF('/models/tshirt.glb') as any;
  const backTex   = useTexture(designUrl);
  const frontTex  = useTexture('/images/logo-mask.png');

  const data = useMemo(() => {
    let m: THREE.Mesh | null = null;
    scene.traverse((o: THREE.Object3D) => {
      if (!m && o instanceof THREE.Mesh) m = o;
    });
    if (!m) return null;

    // GLB ships Z-UP. Clone + rotate -90° around X so the rest of the math
    // can speak normal Y-UP (top = +Y, front = +Z, back = -Z).
    const geom = (m as THREE.Mesh).geometry.clone();
    geom.rotateX(-Math.PI / 2);
    geom.computeBoundingBox();

    const box    = geom.boundingBox!;
    const center = box.getCenter(new THREE.Vector3());
    const size   = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fitScale = 1.0 / maxDim;

    return { geom, center, size, fitScale };
  }, [scene]);

  if (!data) return null;

  backTex.colorSpace  = THREE.SRGBColorSpace;
  backTex.anisotropy  = 8;
  frontTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = 8;

  const { geom, center, size, fitScale } = data;

  const isWhite      = shirtColor === 'White';
  const fabricColor  = isWhite ? '#ece9e2' : '#141414';
  const fabricRough  = isWhite ? 0.78    : 0.92;
  const frontTint    = isWhite ? '#181818' : '#ffffff'; // invert logo on white shirt

  // Y-UP decal positions
  const backPos : [number, number, number] = [
    center.x,
    center.y + size.y * 0.10,         // chest height — upper-mid back
    center.z - size.z * 0.55,         // sit behind back surface
  ];
  const frontPos : [number, number, number] = [
    center.x - size.x * 0.22,         // left-of-center chest
    center.y + size.y * 0.30,         // upper chest
    center.z + size.z * 0.55,         // in front of chest surface
  ];

  // Scale = projection volume size. Z must be > shirt depth so the box
  // pierces the surface from front-to-back.
  const backScale  : [number, number, number] = [
    size.x * 0.62,
    size.y * 0.55,
    size.z * 2.2,
  ];
  const frontScale : [number, number, number] = [
    size.x * 0.14,
    size.x * 0.14,
    size.z * 2.2,
  ];

  const meshPos : [number, number, number] = [-center.x, -center.y, -center.z];

  return (
    <group scale={fitScale}>
      <mesh
        castShadow
        receiveShadow
        geometry={geom}
        position={meshPos}
      >
        <meshStandardMaterial
          color={fabricColor}
          roughness={fabricRough}
          metalness={0}
        />

        {/* Big back print */}
        <Decal
          position={backPos}
          rotation={[0, Math.PI, 0]}
          scale={backScale}
          map={backTex}
        />

        {/* Front-left chest logo — color tinted for shirt color contrast */}
        <Decal
          position={frontPos}
          rotation={[0, 0, 0]}
          scale={frontScale}
          map={frontTex}
        >
          <meshStandardMaterial
            map={frontTex}
            color={frontTint}
            transparent
            polygonOffset
            polygonOffsetFactor={-2}
            roughness={0.85}
            metalness={0}
          />
        </Decal>
      </mesh>
    </group>
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
  designUrl  = '/designs/torii-ronin.png',
  shirtColor = 'Black',
}: {
  designUrl?:  string;
  shirtColor?: 'Black' | 'White';
}) {
  return (
    <div className="w-full h-full min-h-[600px] cursor-grab active:cursor-grabbing"
      style={{ position: 'relative', background: '#080808' }}
    >
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        camera={{ position: [0, 0.05, 1.75], fov: 36 }}
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
            <Shirt designUrl={designUrl} shirtColor={shirtColor} />
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -0.55, 0]}
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
