"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { createFractalMaterial } from "../utils/FractalGenerators";
// import { color, max } from "three/webgpu";
import Controls from "./Controls";

interface FractalPlaneProps {
  maxIterations: number;
  escapeRadius: number;
  colorScale: number;
}

// renders fractal plane
function FractalPlane({
  maxIterations,
  escapeRadius,
  colorScale,
}: FractalPlaneProps) {
  // reference to mesh for direct manipulation
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // create fractal material, memoized to prevent unnecessary recalculations
  const material = useMemo(
    () => createFractalMaterial(maxIterations, escapeRadius, colorScale),
    [maxIterations, escapeRadius, colorScale]
  );

  // update the material on each frame
  // use orthographic camera to fix blackout on zoom
  useFrame(() => {
    if (meshRef.current && camera instanceof THREE.OrthographicCamera) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.zoom.value = camera.zoom;
      material.uniforms.center.value = new THREE.Vector2(
        camera.position.x,
        camera.position.y
      );
    }
  });

  // render a mesh with the fractal merial
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3]} /> {/* create a 3x3 plane */}
      <primitive object={material} attach="material" />{" "}
      {/* attach fractal material to the mesh */}
    </mesh>
  );
}
// fractual visualization componenent
const FractalVisualizer = (): JSX.Element => {
  // state for fractal parameters
  const [maxIterations, setMaxIterations] = useState(100);
  const [escapeRadius, setEscapeRadius] = useState(4);
  const [colorScale, setColorScale] = useState(10);

  return (
    // container for fractal visualizer
    <div className="w-full h-screen relative">
      {/* three.js canvas for rendering fractal */}
      <Canvas camera={{ position: [0, 0, 1], near: 0.01, far: 1000 }}>
        {/* controls for panning view (rotations disabled) */}
        <OrbitControls enableRotate={false} />
        <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={200} />
        {/* render fractal */}
        <FractalPlane
          maxIterations={maxIterations}
          escapeRadius={escapeRadius}
          colorScale={colorScale}
        />
      </Canvas>
      {/* ui controls for adjusting fractal parameters */}
      <Controls
        maxIterations={maxIterations}
        setMaxIterations={setMaxIterations}
        escapeRadius={escapeRadius}
        setEscapeRadius={setEscapeRadius}
        colorScale={colorScale}
        setColorScale={setColorScale}
      />
    </div>
  );
};

export default FractalVisualizer;
