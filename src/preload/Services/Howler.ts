import { Howl } from "howler";
import config from "./ElectronStore";
import React from "react";

type MusicQueueProps = {
  currentQueue : string[],
  currentMusicIndex : number
}

type MusicContextUpdateProps = {
  updateQueue ?: string[],
  updateMusicIndex ?: number,
}

type AudioContextProps = { audioHowlContext: Howl, contextQueue: MusicQueueProps}

type StateHowlerFunction <S> = React.Dispatch<React.SetStateAction<S>>;
// type setHowlerGlobal = ReturnType<typeof createHandlerHowler>

type HandlerHowlerCallback <V> = (
  audioContext : AudioContextProps,
  setStateReact : StateHowlerFunction<V>,
  setHowlerValue ?: V | MusicContextUpdateProps
) => void | MusicQueueProps;

const createAudioContext = (musicPath : string) => {
  return new Howl({
    src: musicPath,
    html5: true,
    volume: 0.1
  })
}

const createHandlerHowler = (
  contextQueue: MusicQueueProps, 
  setStateHowler : StateHowlerFunction<any>,
  setCurrentMusic : StateHowlerFunction<number>
) => {
  const { currentMusicIndex, currentQueue } = contextQueue;
  const audioHowlContext = createAudioContext(
    currentQueue[currentMusicIndex]
  );
  
  audioHowlContext.play();
  audioHowlContext.once("end", scheduleNextMusic(
    contextQueue,
    setStateHowler,
    setCurrentMusic
  ))
  
  return <V>(
    handlerHowler : HandlerHowlerCallback<V>,
    stateReactHandler ?: StateHowlerFunction<V>,
    setHowlerValue ?: V | MusicContextUpdateProps
  ) => {
    const musicContext = handlerHowler(
      { audioHowlContext, contextQueue }, 
      ( stateReactHandler || (() => {})), 
      setHowlerValue
    );

    if(!musicContext) return;
    const context = createHandlerHowler(
      musicContext,
      setStateHowler,
      setCurrentMusic
    );
    setStateHowler(() => context);
  }
}

const scheduleNextMusic = (
  contextQueue: MusicQueueProps, 
  setHowlGlobal : StateHowlerFunction<any>,
  setCurrentMusic: StateHowlerFunction<number>,
) => {
  return () => {
    const { currentQueue, currentMusicIndex } = contextQueue;
    let nextMusic = currentMusicIndex + 1;
    const repeatMode = config("repeat_mode");
  
    if(repeatMode === "repeat_one") nextMusic = currentMusicIndex;
    if(repeatMode === "repeat" && currentQueue[nextMusic] === undefined){
      nextMusic = 0;
    } 
  
    const context = createHandlerHowler(
      { currentQueue, currentMusicIndex: nextMusic },
      setHowlGlobal,
      setCurrentMusic,
    ) 

    setCurrentMusic(nextMusic);
    setHowlGlobal(() => context);
  }
}

const handleNextMusic : HandlerHowlerCallback<MusicContextUpdateProps> = (
  { audioHowlContext, contextQueue }, 
  _, 
  returnValue
)  => {
  if(!returnValue) return;

  audioHowlContext.off("end");
  audioHowlContext.unload();

  const {  updateMusicIndex, updateQueue } = returnValue;
  const contextMusic = {
    currentQueue : updateQueue || contextQueue.currentQueue, 
    currentMusicIndex: updateMusicIndex || contextQueue.currentMusicIndex  
  }
  
  return contextMusic 
}

const setPause: HandlerHowlerCallback<{}> = (
  { audioHowlContext }
) => {
  audioHowlContext.pause();
}

const setPlay: HandlerHowlerCallback<{}> = (
  { audioHowlContext }
) => {
  audioHowlContext.play();
}

const setProgressMusic : HandlerHowlerCallback<number> = (
  {audioHowlContext}, _, newDuration
) => {
  if(typeof newDuration !== "number" ) return;

  audioHowlContext.seek(newDuration)
}

const currentDuration : HandlerHowlerCallback<number> = (
  {audioHowlContext}, setDuration
) => {
  const duration = audioHowlContext.seek()
  setDuration(() => duration)
} 

const handleSuffleMode : HandlerHowlerCallback<MusicContextUpdateProps> = (
  audioContext,
  _,
  musicContext
) => {

  if(musicContext && musicContext.updateQueue){
    audioContext.contextQueue.currentQueue = musicContext.updateQueue
  }
}

export default {
  createHandlerHowler,
  scheduleNextMusic,
  handleNextMusic,
  currentDuration,
  setProgressMusic,
  setPause,
  setPlay,
  handleSuffleMode
}