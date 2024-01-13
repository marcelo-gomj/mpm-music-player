import { musics } from "@prisma/client";
import { last, split } from "ramda";
import CoverCard from "./CoverCard";

type FolderItemProps = {
  item: musics
}

function FolderItem({ item }: FolderItemProps) {
  return (
    <div className="relative cursor-pointer w-full flex flex-col items-center px-3 py-4 hover:bg-base-600 transition-[background_100s_ease] rounded-lg">
      <div key={item.id} className="flex flex-col justify-center gap-6
       items-center cursor-pointer ">

        <div className="bg-base-500 rounded-md h-28 w-28">
          <CoverCard path={item.path} />
        </div>

        <p
          className="text-center text-[white] text-[0.9rem] line-clamp-3"
        >
          {cleanPathFolder(item.folder)}
        </p>
      </div>
    </div>
  )

  function cleanPathFolder(folder: string) {
    return last(split("\\", folder))
  }
}


export default FolderItem;