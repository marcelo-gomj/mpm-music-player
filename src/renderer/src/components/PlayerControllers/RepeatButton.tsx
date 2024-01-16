import { ContextHowl } from "../../types/howlerType";

import NoRepeat from "../../assets/Controllers/No-Repeat.svg?react"
import Repeat from '../../assets/Controllers/Repeat2.svg?react';
import RepeatOne from '../../assets/Controllers/Repeat-One.svg?react';

import { useState } from "react";
import { indexOf, keys} from "ramda";


// type RepeatMode  = 'one-turn'  | 'repeat' | 'repeat-one';

function ReapeatButton({} : ContextHowl){
  const { api: { config } } = window;
  const [repeatState, setRepeatState] = useState(config("repeat_mode") || "one_turn");


  const iconsState = {
    'one_turn' : NoRepeat,
    'repeat' : Repeat,
    'repeat_one' : RepeatOne
  }


  const CurrentStateIcon = iconsState[repeatState];

  return (
    <div
      onClick={updateIconState}
    >
      <CurrentStateIcon  className="w-7 h-7" />
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