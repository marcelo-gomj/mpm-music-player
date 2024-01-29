import { musics } from "@prisma/client"
import { update } from "ramda";
import { Dispatch, SetStateAction } from "react"

type handleListStateFunction = Dispatch<SetStateAction<musics[]>>

async function useRatingMusic(
  handleListState: handleListStateFunction,
  index: number,
  reate: number
) {
  const { setReatedMusic } = window.api.prisma;

  handleListState((list) => {
    const music = list[index];
    const reated = reate + 1;


    setReatedMusic(music.id, reated);
    music.reated = reated;
    return update(index, music, list);
  })


}

export default useRatingMusic;