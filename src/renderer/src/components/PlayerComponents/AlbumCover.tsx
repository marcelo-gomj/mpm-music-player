import { useState } from "react";
import MiniPlayer from "../../assets/mini-player.svg?react";
import Subtitles from "../../assets/subtitles.svg?react";
import NoMusicIcon from "../../assets/FrontIcons/NoDisc.svg?react";

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

            className="w-[160px] h-[160px] rounded-xl shadow-[2px_0px_20px_rgb(6,6,6)]"
            src={`data:${mimeType};base64,${srcBase64}`}
          /> :
          <div
            className="flex items-center justify-center w-[160px] h-[160px]"
          >
            <NoMusicIcon className="h-full w-full opacity-5" />
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
