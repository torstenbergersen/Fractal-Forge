"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { createFractalMaterial } from "../utils/FractalGenerators";

const FractalVisualizer = (): JSX.Element => {
  return (
    // fractual visualization componenent

    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <OrbitControls enableRotate={false} />
        {/* <FractalPlane /> */}
      </Canvas>
    </div>
  );
};

export default FractalVisualizer;
