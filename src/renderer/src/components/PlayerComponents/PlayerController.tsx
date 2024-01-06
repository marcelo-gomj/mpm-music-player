import { useContext } from "react"
import { PlayerContext } from "../../contexts/PlayerContext"

import PlayButton from "../PlayerControllers/PlayButton"
import PreviousButton from "../PlayerControllers/PreviousButton";
import SuffleButton from "../PlayerControllers/SuffleButton";
import ReapeatButton from "../PlayerControllers/RepeatButton";
import NextButton from "../PlayerControllers/NextButton";
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
      className="mr-14 px-16 py-2 rounded-full"
    >
      <ProgressBar durationTotal={durationTotal} />

      <ul 
        className="flex pt-4 justify-center gap-8 items-center w-full"
      >
        { map( GenerateButtons, buttons ) }
      </ul>

    </section>
  )

  function GenerateButtons([ title, ControllerItem ] : typeof buttons[0]) {
    return (
      <li
        className="cursor-pointer transition-all p-1.5 duration-100 hover:bg-base-500 rounded-lg active:bg-base-700"
        key={title}
      >
        <ControllerItem ctx={PlayerHandler} />
      </li>
    )
  }
}

export default PlayerController;