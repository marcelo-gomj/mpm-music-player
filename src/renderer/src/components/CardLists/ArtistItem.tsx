import { musics } from "@prisma/client";
import UserIcon from "../../assets/User.svg?react";

type ArtistItemProps = {
  item: musics
}

function ArtistItem({ item }: ArtistItemProps) {
  return (
    <div className=" h-full w-full justify-center   w-full">
      <div
        className="flex group gap-10 py-6 flex-col items-center px-4 text-center rounded-3xl hover:bg-base-500 cursor-pointer"
      >
        <div className="shrink-0 group-hover:opacity-100 opacity-75">
          <UserIcon />        
        </div>

        <p>{item.artist || "Sem Artista"}</p>
      </div>

    </div>
  )
}

export default ArtistItem;
