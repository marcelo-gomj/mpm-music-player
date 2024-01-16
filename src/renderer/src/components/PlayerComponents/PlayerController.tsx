import { useContext } from "react"
import { PlayerContext } from "../../contexts/PlayerContext"

import PlayButton from "../PlayerControllers/PlayButton"
import PreviousButton from "../PlayerControllers/PreviousButton";
import SuffleButton from "../PlayerControllers/SuffleButton";
import ReapeatButton from "../PlayerControllers/RepeatButton";
import NextButton from "../PlayerControllers/NextButton";
import ProgressBar from "./ProgressBar";
import { map } from "ramda";
import { RouterContext } from "../../contexts/Router";

type PlayerControllerProps = {
  durationTotal: number | undefined
}

type ButtonsProps = [string, any][]

function PlayerController({ durationTotal }: PlayerControllerProps) {
  const PlayerHandler = useContext(PlayerContext);
  const { currentMusic, queueGlobal } = PlayerHandler;
  const { currentPath, setRoute } = useContext(RouterContext);

  const buttons: ButtonsProps = [
    ['suffle', SuffleButton],
    ['previous', PreviousButton],
    ['play', PlayButton],
    ['next', NextButton],
    ['repeat', ReapeatButton],
  ]

  const isPlayerRoute = currentPath === 'player';

  return (
    <section className={`transition-[height_0.2s_ease_1s] ${isPlayerRoute ? 'absolute h-[4.5rem] bottom-0' : 'hover:h-[4.5rem] hover:absolute'} flex relative group bg-base-300 left-0 bottom-0 items-start w-full border-t-[1.5px] pt-1.5 border-base-450`}>

      <div className={`${isPlayerRoute ? '' : 'line-clamp-1 group-hover:line-clamp-2'} w-[25%]  text-[0.82rem] px-4`}>
        {queueGlobal[currentMusic]?.title}
      </div>

      <div className="flex gap-1 transition-all duration-200 relative flex-col h-full justify-start px-3 w-[50%]">

        <div className="">
          <ProgressBar
            durationTotal={queueGlobal[currentMusic]?.duration || 0}
          />
        </div>

        <ul
          className={`${isPlayerRoute ? 'flex' : 'group-hover:flex hidden'} justify-center gap-8 items-center w-full`}
        >
          {map(GenerateButtons, buttons)}
        </ul>
      </div>

      <div className="w-[25%]"></div>

    </section>
  )

  function GenerateButtons([title, ControllerItem]: typeof buttons[0]) {
    return (
      <li
        className="cursor-pointer transition-all p-1 duration-100 hover:bg-base-500 rounded-md active:bg-base-700"
        key={title}
      >
        <ControllerItem ctx={PlayerHandler} />
      </li>
    )
  }
}

export default PlayerController;