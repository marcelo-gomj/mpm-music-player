
export const suffleList = (queueList: string[]) => {
  return queueList.reduceRight((_, music, index, currentList) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    
    currentList[index] = currentList[randomIndex];
    currentList[randomIndex] = music;

    return currentList;
  }, [] as string[])
}

