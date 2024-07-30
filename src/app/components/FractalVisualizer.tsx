"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const FractalVisualizer: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <mesh>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="yellow" side={2} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default FractalVisualizer;
