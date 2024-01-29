import { musics } from "@prisma/client";
import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

type SetPlaylist = Dispatch<SetStateAction<musics[]>>;
type ContextProps = {
  setStatePlaylist: SetPlaylist
}
type SharePlaylistProps = {
  children: ReactNode,
  setStatePlaylist: SetPlaylist
}

export const SharePlaylistContext = createContext<ContextProps>({
  setStatePlaylist: () => { }
} as ContextProps)


function SharePlaylist({ children, setStatePlaylist }: SharePlaylistProps) {
  return (
    <SharePlaylistContext.Provider
      value={{ setStatePlaylist }}
    >
      {children}
    </SharePlaylistContext.Provider>
  )
}

export default SharePlaylist;