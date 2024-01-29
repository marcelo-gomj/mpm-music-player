import { musics } from "@prisma/client";
import { useEffect, useState, DragEvent, useRef, useCallback } from "react"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import { move } from "ramda";
import ItemListFlex from "./ItemListFlex";
import SharePlaylist from "../../contexts/SharePlaylist";

function Playlist() {
  const [playlist, setPlaylist] = useState<musics[]>([]);

  useEffect(getMusicsSample, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <SharePlaylist
        setStatePlaylist={setPlaylist}
      >
        <section
          className="w-full pt-8"
        >
          <ul
            className="w-full px-[5%]"
          >
            {
              playlist.map((music, index) => {

                return (
                  <ItemListFlex
                    handleDragDrop={handleMoveItem}
                    music={music}
                    musicIndex={paddingIndexMusic(index)}
                    index={index}
                  />
                )
              })
            }
          </ul>
        </section>
      </SharePlaylist>
    </DndProvider>
  )

  function getMusicsSample() {
    const { findMany } = window.api.prisma;
    findMany(20).then(musics => {
      setPlaylist(musics);
    })
  }

  function paddingIndexMusic(index: number) {
    return ("" + (index + 1)).padStart(playlist.length.toString().length, "0")
  }

  function handleMoveItem(oldIndex: number, newReplacement: number) {
    setPlaylist(
      move(newReplacement, oldIndex, playlist)
    )
  };
}



export default Playlist;