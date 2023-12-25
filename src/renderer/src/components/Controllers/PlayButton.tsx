import { useEffect, useState } from "react";
import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Play from "../../assets/play.svg?react"
//@ts-ignore
import Pause from "../../assets/pause.svg?react"

import { map } from "ramda";

function PlayButton({ ctx : { playQueue, queueGlobal, howlerGlobal} } : ContextHowl){
  const [isPlaying, setIsPlaying] = useState(false);
  const { setPlay, setPause } = window.api.howler;
  const { libraryChecker } = window.api

  useEffect(() => {
    if(!howlerGlobal) return;

    setIsPlaying(true)

  }, [howlerGlobal])

  return (
    <div 
    >{      
      isPlaying ?
        <div
          onClick={handlePauseButton}
        >
          <Pause /> 
        </div>
      : 
        <div
          onClick={handlePlayButton}
        >
          <Play />
        </div>
      }
    </div>
  )

  function handlePlayButton(){    
    if(!queueGlobal.length){
      const PATH_BASE = 'D:\\lib';

      const paths = map(
        (path) => (PATH_BASE + '\\' + path),
        libraryChecker(PATH_BASE)
      )

      playQueue(0, paths)

      return;
    }

    if(!howlerGlobal) return; 
    
    howlerGlobal(setPlay);
    setIsPlaying(true);
  }

  function handlePauseButton(){
    if(!howlerGlobal) return;
 
    howlerGlobal(setPause)
    setIsPlaying(false)
  }
}

export default PlayButton;
