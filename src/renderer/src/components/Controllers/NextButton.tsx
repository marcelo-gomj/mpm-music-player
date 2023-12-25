import { ContextHowl } from "@renderer/types/howlerType";

// @ts-ignore
import Next from "../../assets/next.svg?react"
import { useEffect, useState } from "react";

function NextButton({ ctx : { handleCurrentMusic, currentMusic, queueGlobal }} : ContextHowl){
  const [hasNextMusic, setHasNextMusic] = useState(false);
  const config = window.api.config

  useEffect(checkNextIsEnable, [currentMusic]);

  const isEnableNext = (currentMusic !== null ? queueGlobal[currentMusic += 1] : currentMusic) || config("repeat_mode") === "repeat";


  return (
    <div
      className={`${isEnableNext ? '' : 'opacity-25'}`}
      onClick={isEnableNextMusic}
    >
      <Next />
    </div>
  )

  function checkNextIsEnable(){
    if(
      currentMusic === null ||
      (currentMusic += 1) > (queueGlobal.length - 1) 
    ) return;
    
    setHasNextMusic(true);
  }

  function isEnableNextMusic(){
    if(hasNextMusic) handleCurrentMusic(true)
  }
}

export default NextButton;
