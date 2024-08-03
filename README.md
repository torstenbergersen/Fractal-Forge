# Fractal Forge

Fractal Forge is an ongoing personal project of mine. It is essentially a web app that allows users to explore and manipulate fractal visualizations in real-time. Built with Next.js, React, Three.js, and WebGL, my hope was that this project could offer a seamless and performant experience for fractal enthusiasts.

Try it out here!  -- [Demo](https://fractal-forge.vercel.app/) --

## Features

- **Real-time Fractal Rendering**: Utilizes WebGL shaders for efficient, GPU-accelerated fractal computations.
- **Interactive Controls**: Dynamically adjust fractal parameters such as iterations, escape radius, and color scaling.
- **Smooth Navigation**: Pan and zoom functionality for detailed exploration of fractal structures.
- **Responsive Design**: Adapts to various screen sizes for optimal viewing on different devices.

## Technical Overview of Primary Components

### Fractal Generation (`FractalGenerators.tsx`)

The core of the fractal rendering is implemented in the `createFractalMaterial` function. This function generates a Three.js ShaderMaterial with custom GLSL code for fractal computation. Key aspects include:

- Configurable parameters for maximum iterations, escape radius, and color scaling.
- Vertex shader for geometry transformation.
- Fragment shader for fractal algorithm implementation and coloring.
- Smooth coloring technique for aesthetically pleasing visualizations.

### User Interface (`Controls.tsx`)

The `Controls` component provides an intuitive interface for adjusting fractal parameters:

- Sliders for modifying maximum iterations, escape radius, and color scale.
- Real-time updates reflected in the fractal visualization.

### Visualization Component (`FractalVisualizer.tsx`)

`FractalVisualizer` is the main component that brings everything together:

- Utilizes React Three Fiber for declarative Three.js integration.
- Implements `OrbitControls` for pan and zoom functionality.
- Uses an orthographic camera to maintain consistent view across zoom levels.
- Manages state for fractal parameters and passes them to the `FractalPlane` component.

## Usage

- Use the right mouse button to pan across the fractal.
- Scroll the mouse wheel to zoom in and out.
- Adjust the sliders in the top-left corner to modify fractal parameters:
- Max Iterations: Controls the detail level of the fractal.
- Escape Radius: Affects the boundary condition for the fractal algorithm.
- Color Scale: Modifies the color distribution of the fractal.

## License

This project is licensed under the [MIT License](LICENSE).
