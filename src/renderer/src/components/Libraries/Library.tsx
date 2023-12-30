import AlbumIcon from "../../assets/album.svg?react"
import ArtistIcon from "../../assets/artist.svg?react"
import CurrentAlbumIcon from "../../assets/current-album.svg?react"
import ListIcon from "../../assets/list.svg?react"
import FoldersIcon from "../../assets/folders.svg?react"
import StarListIcon from "../../assets/magic-list.svg?react"

import NoSourceLibrary from "./NoSourceLibrary";

import { map, toPairs } from "ramda";
import { useContext, useEffect, useState } from "react"
import HeaderLibraryButton from "./HeaderLibraryButton"
import { RouterContext } from "../../contexts/Router"
import SectionAlbums from "./SectionAlbums"

const HEADERS_ITEMS = {
  "current": [CurrentAlbumIcon, <div>current</div>],
  "album": [AlbumIcon, <SectionAlbums />],
  "artist": [ArtistIcon, <div>artist</div>],
  "folders": [FoldersIcon, <div>folders</div>],
  "starlist": [StarListIcon, <div>starlist</div>],
  "list": [ListIcon, <div>list</div>],
};

type CheckSourceStatus = "PENDING" | "NO_DATA" | "DATA_OK";

type pathProps = keyof typeof HEADERS_ITEMS;

function LIbrarySection() {
  const { setRoute, currentPath } = useContext(RouterContext);
  const [statusDatabase, setStatusDatabase] = useState<CheckSourceStatus>("PENDING");
  const [libraryPath, setLibraryPath] = useState<pathProps>('current');
  const { prisma } = window.api;

  useEffect(checkDatabaseSources, [])

  const sections = toPairs(HEADERS_ITEMS);
  const [_, PathComponent] = HEADERS_ITEMS[libraryPath];

  return (
    <section
      className="flex flex-col h-full w-full"
    >
      <div
        className="flex justify-center gap-10 py-3 "
      >
        <div className="flex gap-10 px-5 py-1 bg-base-400 rounded-3xl">
          {map(([path, [Icon]]) => (
            <HeaderLibraryButton
              key={path}
              isCurrentPath={path === libraryPath}
              setPath={() => setLibraryPath(path)}
              Icon={Icon}
              path={path}
            />
          ),
            sections
          )}
        </div>
      </div>

      <div className="flex bar-scroll justify-center items-center flex-col h-full w-full overflow-y-scroll">
        {/* @ts-ignore */}
        {generateLibraryContent()}
      </div>
    </section>
  )

  function checkDatabaseSources(){
    prisma.hasDatabaseContent().then(totalItems => {
      setStatusDatabase(totalItems ? "DATA_OK" : "NO_DATA" );
    })
  }

  function generateLibraryContent() {
    return {
      "PENDING": <div className="h-full to-base-200 w-full"></div>,
      "DATA_OK": PathComponent,
      "NO_DATA": <NoSourceLibrary />,
    }[statusDatabase]
  }
}

export default LIbrarySection;
