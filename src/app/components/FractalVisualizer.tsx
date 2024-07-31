"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { createFractalMaterial } from "../utils/FractalGenerators";
import { color, max } from "three/webgpu";

// renders fractal plane
function FractalPlane() {
  // reference to mesh for direct manipulation
  const meshRef = useRef<THREE.Mesh>(null);

  // state variable for fractal parameters
  const [maxIterations, setMaxIterations] = useState(100);
  const [escapeRadius, setEscapeRadius] = useState(4);
  const [colorScale, setColorScale] = useState(10);

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
  return (
    // container for fractal visualization
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls enableRotate={false} /> {/* add controls fro panning */}
        <FractalPlane /> {/* render fractal */}
      </Canvas>
    </div>
  );
};

export default FractalVisualizer;
