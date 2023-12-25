import { PlayerHandler } from "@renderer/contexts/PlayerContext";

const { createHandlerHowler  } = window.api.howler

type setHowlerGlobal = ReturnType<typeof createHandlerHowler>;
export type ContextHowl = { ctx: PlayerHandler };
export type StateFunctionProp <T> = ((arg: T) => void);
export type HandlerHowl <T> = ((howl: Howl, state : StateFunctionProp<T>) => void) | null;

type MusicQueueProps = {
  currentQueue : string[],
  currentMusicIndex : number
}

export type HandlerCurrentMusic = { 
  currentQueue: MusicQueueProps,
};

export type HowlerGlobalProps = 
setHowlerGlobal | null;