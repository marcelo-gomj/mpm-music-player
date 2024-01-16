import { musics } from "@prisma/client";
import * as R from "ramda";

export const suffleList = (queueList: musics[], currentIndexMusic: number) => {
  const queueSchedule = R.remove(currentIndexMusic, 1, queueList);

  const randomList = queueSchedule.reduceRight((_, music, index, currentList) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    currentList[index] = currentList[randomIndex];
    currentList[randomIndex] = music;

    return currentList;
  }, [] as musics[])

  return [queueList[currentIndexMusic], ...randomList];
}

export const unsuffleList = (
  queueList: musics[], currentIndexMusic: number
) => {
  const randonList = [...queueList];
  const currentList = queueList.sort();

  const newIndex = R.findIndex(
    (music) => randonList[currentIndexMusic] === music,
    currentList
  );

  const orderList = queueList.sort()

  return { newIndex, orderList }
}

