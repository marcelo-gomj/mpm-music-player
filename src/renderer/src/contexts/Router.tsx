import Player from "../components/FrontApp/Player";
import Layout from "../components/Layout";
import LIbrarySection from "../components/Libraries/Library";
import { createContext, useState } from "react";
import { ModalProvider } from "./ModalContainer";


const ROUTES = {
  "player": Player,
  "library": LIbrarySection,
}

type RoutePaths = keyof typeof ROUTES;
type RouterContextProps = {
  currentPath: RoutePaths,
  setRoute: (path: RoutePaths) => void
}

export const RouterContext = createContext({} as RouterContextProps);

export function RouterProvider() {
  const [path, setPath] = useState<RoutePaths>('player');

  const Page = ROUTES[path];

  return (
    <RouterContext.Provider value={{ setRoute, currentPath: path }}>
        <ModalProvider>
          <Layout>
              <Page />
          </Layout>
        </ModalProvider>
    </RouterContext.Provider>
  )

  function setRoute(path: RoutePaths) {
    setPath(path);
  }
}
