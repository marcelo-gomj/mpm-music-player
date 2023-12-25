import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Previous from "../../assets/previous.svg?react"
import { useEffect, useState } from "react";

function PreviousButton({ ctx : { handleCurrentMusic, currentMusic, queueGlobal } } : ContextHowl){
  const [_, setHasPrevious] = useState(false);
  const config = window.api.config;

  useEffect(checkPreviousIsEnable, [currentMusic])

  const isEnablePrevious = (currentMusic !== null ? queueGlobal[currentMusic -= 1] : currentMusic) || config("repeat_mode") === "repeat";

  return (
    <div
      className={isEnablePrevious ? '' : "opacity-25"}
      onClick={handleClickPrevious}
    >
      <Previous />
    </div>
  )

  function handleClickPrevious(){
    handleCurrentMusic(false);
  }

  function checkPreviousIsEnable(){
    if(
      currentMusic === null ||
      (currentMusic -= 1) > (queueGlobal.length - 1) 
    ) return;
    
    setHasPrevious(true);
  }
}

export default PreviousButton;
