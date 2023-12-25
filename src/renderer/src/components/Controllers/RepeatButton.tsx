import { ContextHowl } from "@renderer/types/howlerType";

//@ts-ignore
import Repeat from "../../assets/repeat.svg?react"
import { useState } from "react";
import { indexOf, keys} from "ramda";

//@ts-ignore
import Infinite from '../../assets/infinite.svg?react';
//@ts-ignore
import OneTurn from '../../assets/one-turn.svg?react';

// type RepeatMode  = 'one-turn'  | 'repeat' | 'repeat-one';

function ReapeatButton({} : ContextHowl){
  const { api: { config } } = window;
  const [repeatState, setRepeatState] = useState(config("repeat_mode") || "one_turn");


  const iconsState = {
    'one_turn' : OneTurn,
    'repeat' : Infinite,
    'repeat_one' : Repeat
  }


  const CurrentStateIcon = iconsState[repeatState];

  return (
    <div
      onClick={updateIconState}
    >
      <CurrentStateIcon />
    </div>
  )


  function flipIndex(index: number){
    return index > 2 ? 0 : index;
  }

  function updateIconState(){
    const states = keys(iconsState);

    const indexMode = indexOf(repeatState, states) + 1;
    const mode = states[flipIndex(indexMode)]
  
    config("repeat_mode", mode)
    setRepeatState(
      mode
    )
  }
}

export default ReapeatButton;