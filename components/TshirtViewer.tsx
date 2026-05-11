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
import { Suspense, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Loads the oversized t-shirt GLB and applies two decals:
 *   - Large back-print of the product design (designUrl)
 *   - Small front-left chest logo-mask
 *
 * GLB facts (verified by reading the JSON chunk):
 *   - node name:     Object_2
 *   - mesh name:     Object_0
 *   - material name: Material.001
 * useGLTF's `nodes` indexes by NODE name, so we walk the scene to pull the
 * first Mesh — works regardless of which name was used.
 */
function Shirt({ designUrl }: { designUrl: string }) {
  const { scene, materials } = useGLTF('/models/tshirt.glb') as any;
  const backTex   = useTexture(designUrl);
  const frontTex  = useTexture('/images/logo-mask.png');

  const mesh = useMemo<THREE.Mesh | null>(() => {
    let found: THREE.Mesh | null = null;
    scene.traverse((obj: THREE.Object3D) => {
      if (!found && obj instanceof THREE.Mesh) found = obj;
    });
    return found;
  }, [scene]);

  if (!mesh) return null;

  backTex.colorSpace  = THREE.SRGBColorSpace;
  backTex.anisotropy  = 8;
  frontTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = 8;

  const material = (materials?.['Material.001'] as THREE.Material | undefined) ?? mesh.material;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={mesh.geometry}
      material={material}
      material-roughness={0.85}
      material-metalness={0}
      dispose={null}
    >
      {/* Big back print — facing -Z */}
      <Decal
        position={[0, 1.32, -0.14]}
        rotation={[0, Math.PI, 0]}
        scale={[0.35, 0.42, 0.35]}
        map={backTex}
      />

      {/* Small front-left chest logo */}
      <Decal
        position={[-0.07, 1.43, 0.13]}
        rotation={[0, 0, 0]}
        scale={[0.09, 0.09, 0.09]}
        map={frontTex}
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
