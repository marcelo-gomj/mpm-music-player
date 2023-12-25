import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Suffle from "../../assets/suffle.svg?react"
import { useContext, useState } from "react";
import { PlayerContext } from "@renderer/contexts/PlayerContext";

function SuffleButton({ } : ContextHowl){
  const { checkIsSuffleList } = useContext(PlayerContext);
  const { config } = window.api;
  const [isSuffle, setIsSuffle] = useState(false);
  
  
  return (
    <div
      onClick={() => activeSuffle()}
      className={`${isSuffle ? "": "opacity-25"}`}
    >
      <Suffle />    
    </div>
  )

  function activeSuffle(){
    const suffle = !isSuffle;

    setIsSuffle(suffle);
    config("is_suffle", suffle);
    checkIsSuffleList(suffle)
    console.log("SUFFLE", suffle);
  }
}

export default SuffleButton;
