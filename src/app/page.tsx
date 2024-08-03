import FractalVisualizer from "./components/FractalVisualizer";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden relative">
      <h1 className="top-4 text-center bottom-4 left-1/2 text-5xl font-bold">
        Fractal Visualizer
      </h1>
      <FractalVisualizer />

      {/* control instructions */}
      <div className="absolute top-12 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg z-10">
        <p className="text-sm">
          <strong>Controls:</strong>
          <br />
          Right mouse button: Pan
          <br />
          Scroll wheel: Zoom
        </p>
      </div>
    </main>
  );
}
