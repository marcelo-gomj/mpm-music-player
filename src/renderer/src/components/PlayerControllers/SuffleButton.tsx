import { ContextHowl } from "../../types/howlerType";

import Suffle from "../../assets/Controllers/Suffle.svg?react";
import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

function SuffleButton({ }: ContextHowl) {
  const { checkIsSuffleList } = useContext(PlayerContext);
  const { config } = window.api;
  const [isSuffle, setIsSuffle] = useState(false);


  return (
    <div
      onClick={() => activeSuffle()}
      className={`${isSuffle ? "" : "opacity-25"}`}
    >
      <Suffle className="w-7 h-7" />
    </div>
  )

  function activeSuffle() {
    const suffle = !isSuffle;

    setIsSuffle(suffle);
    config("is_suffle", suffle);
    checkIsSuffleList(suffle)
  }
}

export default SuffleButton;
