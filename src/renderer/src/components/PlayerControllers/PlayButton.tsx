import { useEffect, useState } from "react";
import { ContextHowl } from "../../types/howlerType";

import Play from "../../assets/Controllers/Play.svg?react"
import Pause from "../../assets/Controllers/Pause.svg?react"

function PlayButton({ ctx : { playQueue, queueGlobal, howlerGlobal} } : ContextHowl){
  const [isPlaying, setIsPlaying] = useState(false);
  const { setPlay, setPause } = window.api.howler;

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
          <Pause  className="w-7 h-7" /> 
        </div>
      : 
        <div
          onClick={handlePlayButton}
        >
          <Play  className="w-7 h-7" />
        </div>
      }
    </div>
  )

  function handlePlayButton(){    
    if(!queueGlobal.length){
      const PATH_BASE = 'D:\\lib';

      // const paths = map(
      //   (path) => (PATH_BASE + '\\' + path),
      //   libraryChecker(PATH_BASE)
      // )

      // playQueue(0, paths)

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
