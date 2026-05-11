'use client';

import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Decal,
  useTexture,
  Environment,
  Center,
} from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

/**
 * Loads the oversized t-shirt GLB.
 * Model structure (verified):
 *   - mesh:     "Object_0"
 *   - material: "Material.001"
 */
function Shirt({ designUrl }: { designUrl: string }) {
  const { nodes, materials } = useGLTF('/models/tshirt.glb') as any;
  const texture = useTexture(designUrl);

  // sRGB color space so the design's colors render correctly
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Object_0.geometry}
      material={materials['Material.001']}
      material-roughness={0.85}
      material-metalness={0}
      dispose={null}
    >
      {/*
        Decal positioning notes for THIS model:
        - model bounds Y: 0.92 → 1.63 (sitting above ground)
        - chest area sits roughly y=1.30, z=0.13
        - tweak position/scale to taste once you can see it on screen
      */}
      <Decal
        position={[0, 1.32, 0.14]}
        rotation={[0, 0, 0]}
        scale={0.22}
        map={texture}
      />
    </mesh>
  );
}

export default function TshirtViewer({
  designUrl = '/designs/torii-ronin.png',
}: {
  designUrl?: string;
}) {
  return (
    <div className="w-full h-full min-h-[600px] cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 1.3, 1.4], fov: 30 }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Center>
            <Shirt designUrl={designUrl} />
          </Center>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/tshirt.glb');
