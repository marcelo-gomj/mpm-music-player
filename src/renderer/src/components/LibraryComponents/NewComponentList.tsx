import { musics } from "@prisma/client"
import { last, map, join, split } from "ramda";
import { useEffect, useState } from "react"
import CoverCard from "../CardLists/CoverCard";

import DiscIcon from "../../assets/album.svg?react";
import PlayIcon from "../../assets/play.svg?react";
import AlbumCover from "../PlayerComponents/AlbumCover";

function NewComponentList() {
  const { queryMusicsByGroups, findAlbum } = window.api.prisma;
  const [albums, setAlbums] = useState([] as musics[]);
  const [albumSelected, setAlbumSelected] = useState([] as musics[])

  useEffect(queryAlbums, [])

  return (
    <div
      className="flex relative gap-3 h-full w-full"
    >
      <div className="h-[80vh] w-[35%]">
        <div className="py-3">
          <h1 className="text-[1.1rem] font-bold">Todos os albums</h1>
        </div>

        <div
          className="hover:overflow-y-scroll overflow-y-hidden bar-scroll h-[calc(100%_-_2.6rem)]"
        >
          {
            map(
              (albumItem) => {
                const selected = albumItem.album === albumSelected[0]?.album

                return (
                  <div
                    className={`flex gap-4 items-center py-1.5 text-[0.9rem] ${ selected ? "" : "opacity-80"} cursor-pointer font-normal px-2 rounded-lg hover:bg-base-500`}
                    onClick={() => handleClickAlbum(albumItem.album)}
                  >
                    <DiscIcon className="w-6 shrink-0 h-6 opacity-50" />
                    <p>{albumItem.album || last(split("\\", albumItem.folder))}</p>
                  </div>
                )
              }
              , albums)
          }
        </div>
      </div>

      <div className="h-[80vh] w-[65%] bar-scroll rounded-xl py-3 px-5 bg-base-200 hover:overflow-y-scroll overflow-y-hidden shadow-[1px_1px_20px_rgb(16,16,16,0.4)]">

        <div className="mb-4 mt-2">
          <div className="flex items-center gap-8">
            <div className="shrink-0">
              {albumSelected[0] ?
                <CoverCard path={albumSelected[0].path} />
                : null
              }
            </div>

            <p className="text-[1.2rem] font-[700]">{albumSelected[0]?.album || albumSelected[0]?.folder}</p>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          {
            map(
              (albumItem) => (
                <div className="flex group gap-5 py-[0.3rem] items-start hover:bg-base-400 rounded-md px-2 text-[0.90rem] cursor-pointer">
                  <div className="w-6 h-full">
                    <p className="group-hover:hidden opacity-75 text-center">{albumItem.track || "-"}</p>
                    
                    <PlayIcon className="hidden fill-white mx-auto group-hover:block w-[1.2rem] h-full" />
                  </div>

                  <p className="line-clamp-2" title="">
                    {albumItem.title || last(split("\\", albumItem.path))}
                  </p>

                </div>
              ), albumSelected)
          }
        </div>
      </div>
    </div>
  )

  function queryAlbums() {
    queryMusicsByGroups(100, 0, ["album"], { album: "asc" }).then(
      album => setAlbums(album as any)
    )
  }

  function handleClickAlbum(album: string) {
    findAlbum(album).then(
      album => setAlbumSelected(album)
    )
  }
}

export default NewComponentList