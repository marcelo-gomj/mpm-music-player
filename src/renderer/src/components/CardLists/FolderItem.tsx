import { musics } from "@prisma/client";
import { last, split } from "ramda";

type FolderItemProps = {
  item: musics
}

function FolderItem({ item } : FolderItemProps){
  return (
    <div>{cleanPathFolder(item.folder)}</div>
  )

  function cleanPathFolder(folder: string){
    return last(split("\\", folder))
  }
}


export default FolderItem;