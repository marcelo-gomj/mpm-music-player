// @ts-ignore
import { useState } from "react";
// @ts-ignore
import MiniPlayer from "../../assets/mini-player.svg?react";
// @ts-ignore
import Subtitles from "../../assets/subtitles.svg?react";

type AlbumCoverProps = {
  srcBase64 ?: string | null,
  mimeType ?: string
}

function AlbumCover({
  srcBase64,
  mimeType,
}: AlbumCoverProps) {
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  return (
    <section
      onMouseEnter={handleShowOptionsWhenOverCover}
      onMouseLeave={handleRemoveOptions}
      className="flex relative justify-center py-2"
    >
      <div className="cursor-pointer">
        { srcBase64 ?
          <img

            className="w-[180px] h-[180px] rounded-xl shadow-[2px_0px_20px_rgb(6,6,6)]"
            src={`data:${mimeType};base64,${srcBase64}`}
          /> :
          <div
            className="flex items-center justify-center bg-base-400 w-[180px] h-[180px] rounded-xl shadow-[2px_0px_20px_rgb(6,6,6)]"
          >
            Sem capa
          </div>
        }
      </div>
      
      { showExtraOptions ?
        <div className="absolute right-0 bottom-4 space-y-4">
          <Subtitles 
            className="w-8 h-8 opacity-50 hover:opacity-100 cursor-pointer" 
          />
          <MiniPlayer
            className="w-8 h-8 opacity-50 hover:opacity-100 cursor-pointer" 
          />
        </div>

        : null
      }
    </section>
  )

  function handleShowOptionsWhenOverCover(){
    setShowExtraOptions(true);
  }

  function handleRemoveOptions(){
    setShowExtraOptions(false);
  }
}

export default AlbumCover;
