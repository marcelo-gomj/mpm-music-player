//@ts-ignore
import AlbumIcon from "../../assets/album.svg?react"
//@ts-ignore
import ArtistIcon from "../../assets/artist.svg?react"
//@ts-ignore
import CurrentAlbumIcon from "../../assets/current-album.svg?react"
//@ts-ignore
import ListIcon from "../../assets/list.svg?react"
//@ts-ignore
import FoldersIcon from "../../assets/folders.svg?react"
//@ts-ignore
import StarListIcon from "../../assets/magic-list.svg?react"

import NoSourceLibrary from "./NoSourceLibrary";

import { map, toPairs } from "ramda";
import { useContext, useEffect, useState } from "react"
import HeaderLibraryButton from "./HeaderLibraryButton"
import { RouterContext } from "@renderer/contexts/Router"

const headerIcons = {
  "current": [CurrentAlbumIcon, <div>current</div>],
  "album": [AlbumIcon, <div>album</div>],
  "artist": [ArtistIcon, <div>artist</div>],
  "folders": [FoldersIcon, <div>folders</div>],
  "starlist": [StarListIcon, <div>starlist</div>],
  "list": [ListIcon, <div>list</div>],
};

type pathProps = keyof typeof headerIcons;

function LIbrarySection() {
  const { setRoute, currentPath } = useContext(RouterContext);
  const [hasSourceDatabase, setHasSourceDatabase] = useState(false);
  const [libraryPath, setLibraryPath] = useState<pathProps>('current');
  const { prisma } = window.api;

  useEffect(checkHasDatabaseContent, [currentPath])

  const sections = toPairs(headerIcons);
  const currentHeaderPath = headerIcons[libraryPath];
  const [_, PathComponent] = currentHeaderPath;

  return false ? (
    <section
      className="flex flex-col h-full w-full bg-base-300"
    >
      <div
        className="flex justify-around py-3"
      >
        {map(([path, [Icon]]) => (
          <HeaderLibraryButton
            isCurrentPath={path === libraryPath}
            setPath={() => setLibraryPath(path)}
            Icon={Icon}
            path={path}
          />
        ),
          sections
        )}
      </div>

      <div className="flex flex-col h-full">
        <div className="mx-3 my-1 h-full">
          {PathComponent}
        </div>

        <div
          className="flex items-center gap-2 py-2 w-[25%] text-center cursor-pointer rounded-full my-2 mx-4 "
          onClick={() => setRoute('player')}
        >
          <AlbumIcon className="w-7 h-7" />
          Voltar
        </div>
      </div>
    </section>
  )
  
  : <NoSourceLibrary />;

  function checkHasDatabaseContent() {
    prisma.hasDatabaseContent().then(
      ItemsTotal => setHasSourceDatabase(!!ItemsTotal)
    )
  }
}

export default LIbrarySection;
