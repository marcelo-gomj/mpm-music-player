import { HowlerGlobalProps } from "@renderer/types/howlerType";
import { suffleList, unsuffleList } from "@renderer/utils/suffle";
import { ReactNode, createContext, useState } from "react";

type PlayerProviderProps = {
  children: ReactNode
}

type CurrentMusicProps = number | null;
type QueueGlobalProps = string[];
type PlayQueueFunction = (music: number, queue : string[]) => void;

export type PlayerHandler = {  
  playQueue: PlayQueueFunction,
  howlerGlobal:  HowlerGlobalProps,
  currentMusic: CurrentMusicProps,
  handleCurrentMusic: (isNext: boolean) => void,
  queueGlobal: QueueGlobalProps
  checkIsSuffleList: (isSuffle: boolean) => void
}

const PlayerContext = createContext({} as PlayerHandler);

function PlayerProvider({ children } : PlayerProviderProps ){
  const [queueGlobal, setQueueGlobal] = useState<QueueGlobalProps>([]);
  const [currentMusic, setCurrentMusic] = useState<CurrentMusicProps>(null)
  const [howlerGlobal, setHowlerGlobal] = useState<HowlerGlobalProps>(null);
  const { createHandlerHowler, handleSuffleMode, } = window.api.howler;
  const { config } = window.api


  return (
    <PlayerContext.Provider 
      value={{
        playQueue,
        howlerGlobal,
        checkIsSuffleList,
        currentMusic,
        queueGlobal,
        handleCurrentMusic
      }}
    >
      { children }
    </PlayerContext.Provider>
  )

  // play list musics
  function playQueue(music: number, queue : string[]){    

    const context = createHandlerHowler(
      { 
        currentQueue: queue, currentMusicIndex: music 
      },
      setHowlerGlobal,
      setCurrentMusic as any
    );


    setHowlerGlobal(() =>  context );
    setCurrentMusic( music );
    setQueueGlobal(queue);
  }

  function handleCurrentMusic(isNext: boolean){
    const { handleNextMusic } = window.api.howler;
    if(howlerGlobal && currentMusic !== null){
      let nextStep = isNext ? (currentMusic + 1) : (currentMusic - 1);

      if(config("repeat_mode") === "repeat"){
        if(nextStep > (queueGlobal.length - 1)){
          nextStep = 0
        }

        if(nextStep < 0){
          nextStep = (queueGlobal.length - 1) 
        }
      }

      if(queueGlobal[nextStep]){
        setCurrentMusic(nextStep);
  
        howlerGlobal(
          handleNextMusic,
          undefined,
          {updateMusicIndex : nextStep}
        )
      }
    }
  }

  function checkIsSuffleList( suffle: boolean ){
    if(!howlerGlobal || currentMusic === null) return;
    let index : number
    let queueUpdated : string[] = [];

    if(suffle){
      const randomList = suffleList(queueGlobal, currentMusic);
      
      index = 0;
      queueUpdated = randomList;

    }else{
      const { newIndex, orderList } = unsuffleList(queueGlobal, currentMusic);

      index = newIndex;
      queueUpdated = orderList;
    } 

    setCurrentMusic(index);
    setQueueGlobal(queueUpdated);

    howlerGlobal(
      handleSuffleMode,
      undefined,
      { updateQueue : queueUpdated, updateMusicIndex: index }
    )
  }
}

export {
  PlayerContext,
  PlayerProvider
}

