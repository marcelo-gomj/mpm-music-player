import { useContext } from "react"
import { PlayerContext } from "@renderer/contexts/PlayerContext"

import PlayButton from "../Controllers/PlayButton"
import PreviousButton from "../Controllers/PreviousButton";
import SuffleButton from "../Controllers/SuffleButton";
import ReapeatButton from "../Controllers/RepeatButton";
import NextButton from "../Controllers/NextButton";
import ProgressBar from "./ProgressBar";
import { map } from "ramda";

type PlayerControllerProps = {
  durationTotal: number | undefined
}

type ButtonsProps = [string, any][]

function PlayerController({ durationTotal } : PlayerControllerProps){
  const PlayerHandler = useContext(PlayerContext);
  
  const buttons : ButtonsProps = [
    [ 'suffle', SuffleButton ],
    [ 'previous', PreviousButton ],
    [ 'play', PlayButton ],
    [ 'next', NextButton ],
    [ 'repeat', ReapeatButton ],
  ]

  return (
    <section
      className="pr-16 space-y-2"
    >
      <ul 
        className="flex justify-center gap-8 items-center w-full"
      >
        { map( GenerateButtons, buttons ) }
      </ul>

      <ProgressBar durationTotal={durationTotal} />
    </section>
  )

  function GenerateButtons([ title, ControllerItem ] : typeof buttons[0]) {
    return (
      <li
        className="cursor-pointer transition-all duration-100 hover:bg-base-500 rounded-xl active:bg-base-700"
        key={title}
      >
        <ControllerItem ctx={PlayerHandler} />
      </li>
    )
  }
}

export default PlayerController;