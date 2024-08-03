"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { createFractalMaterial } from "../utils/FractalGenerators";
import { color, max } from "three/webgpu";
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

  // create fractal material, memoized to prevent unnecessary recalculations
  const material = useMemo(
    () => createFractalMaterial(maxIterations, escapeRadius, colorScale),
    [maxIterations, escapeRadius, colorScale]
  );

  // update the material on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material = material;
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
