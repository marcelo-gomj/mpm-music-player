import { PlayerContext } from "../../contexts/PlayerContext";
import { useContext, useEffect, useRef, useState } from "react";
import HandleProgress from "./HandleProgressBar";

type ProgressBarProps = {
  durationTotal?: number
}

function ProgressBar({ durationTotal }: ProgressBarProps) {
  const { howlerGlobal } = useContext(PlayerContext);
  const [duration, setDuration] = useState(0);
  const time = useRef<any>(null);

  useEffect(updateDuration, [howlerGlobal]);

  const calculatedProgress = progressBarUpdates(duration);
  const progressBar = { left: `-${calculatedProgress || 100}%` };
  const progressPointer = { right: `calc(${calculatedProgress || 100}% - 0.5rem)` }

  return (
    <div className="flex items-center gap-6 w-full">
      <p className="text-[0.75rem] text-neutral-400">{
        convertSecondsForMinutes(duration)
      }</p>

      <HandleProgress
        setDuration={pointDuration}
        total={durationTotal}
      >
        <div
          className="relative h-[0.26rem] w-full bg-base-500"
        >
          <div
            className="relative overflow-hidden rounded-md w-full h-full"
          >
            <div
              style={progressBar}
              className="absolute group-hover:bg-white h-full top-0 left-[-100%] w-[100%] bg-neutral-200 rounded-md duration-100 transition-[left]"
            ></div>

          </div>

          <div
            style={progressPointer}
            className={`invisible group-hover:visible right-0 absolute top-[50%] translate-y-[-50%] bg-[white] h-4 w-4 rounded-full duration-75 transition-[right]`}
          ></div>
        </div>
      </HandleProgress>

      {/* <div className="flex justify-between text-[0.8rem] text-neutral-300">
        <p>{
          convertSecondsForMinutes(duration)
        }</p>
        <p>{ convertSecondsForMinutes(durationTotal || 0) }</p>
      </div> */}

      <p className="text-neutral-300 text-[0.75rem]">{convertSecondsForMinutes(durationTotal || 0)}</p>
    </div>
  )

  function fillFirstZeroTime(time: number) {
    return time.toString().padStart(2, "0")
  }

  function convertSecondsForMinutes(seconds: number) {
    return (
      fillFirstZeroTime(Math.trunc(seconds / 60))
      + ":" +
      fillFirstZeroTime(Math.trunc(seconds % 60))
    )
  }

  function updateDuration() {
    if (!howlerGlobal) return;
    const { currentDuration } = window.api.howler;

    clearUpdateDurationSeconds()

    time.current = setInterval(() => {
      howlerGlobal(
        currentDuration,
        setDuration
      )
    }, 1000);

    return () => {
      clearUpdateDurationSeconds()
      setDuration(0)
    }
  }

  function progressBarUpdates(duration: number) {
    return (100 - Number((Math.trunc(duration) / ((durationTotal || 0) / 100)).toFixed(6)))
  }

  function pointDuration(duration: number) {
    setDuration(duration);
  }

  function clearUpdateDurationSeconds() {
    clearInterval(time.current)
  }
}

export default ProgressBar;
