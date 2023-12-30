/// <reference types="vite-plugin-svgr/client" />

import { PlayerProvider } from "./src/contexts/PlayerContext";
import { RouterProvider } from "./src/contexts/Router";
import "./global.css";

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <RouterProvider />
    </PlayerProvider>
  )
}

export default App