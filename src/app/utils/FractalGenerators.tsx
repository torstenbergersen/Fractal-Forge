import * as THREE from "three";
import { color } from "three/webgpu";

export function createFractalMaterial(
  // max iterations for the fractal algorithm, higher values for more detail
  maxIterations: number = 100,
  // radius at which a point has 'escaped'
  escapeRadius: number = 4,
  // for fractal coloring
  colorScale: number = 10
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      // uniforms to pass data from JS to GLSL
      maxIterations: { value: maxIterations },
      escapeRadius: { value: escapeRadius },
      colorScale: { value: colorScale },
    },
    // GLSL code follows within backticks, used for computation of fractals directly on GPU
    vertexShader: `
        /* 
        this function passes UV coordinated to the fragment shader and transforms the vertices of the geometry from 3D to 2D space.
        */
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        // precision specifiers
        precision highp float;
        precision highp int;

        // uniform declarations
        uniform float maxIterations;
        uniform float escapeRadius;
        uniform float colorScale;
        varying vec2 vUv;
        
        // following function converts HSV color to RGB
        vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        void main() {
            // main fractal computation
            vec2 c = (vUv - 0.5) * 4.0; // map UV to complex plane
            vec2 z = vec2(0.0);
            float i;
            for (i = 0.0; i < maxIterations; i++) {
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c; // z = z^2 + c
                if (dot(z, z) > escapeRadius) break; // check if point has escaped
            }   
            
            // coloring
            if (i == maxIterations) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // black for points in the set
            } else {
                float hue = i / maxIterations;
                vec3 color = hsv2rgb(vec3(hue * colorScale, 1.0, 1.0));
                gl_FragColor = vec4(color, 1.0);
            }
        }
    `,
  });
}
