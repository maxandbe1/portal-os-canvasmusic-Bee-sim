// src/App.tsx
import { CanvasMusicView } from "./views/CanvasMusicView";

function App() {
  const trackUrl =
    "https://example.com/audio.mp3"; // real upstream audio
  const proxyUrl = `/audio?url=${encodeURIComponent(trackUrl)}`;

  return (
    <div className="app">
      <CanvasMusicView proxyUrl={proxyUrl} />
    </div>
  );
}

export default App;
