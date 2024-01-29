import { musics } from "@prisma/client";
import PlayIcon from "../../assets/play.svg?react";
import { last, range, split, update } from "ramda";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import StarRating from "../StarRating";
import { SharePlaylistContext } from "../../contexts/SharePlaylist";

type MusicItemProps = {
  music: musics,
  handleMusicsState: any,
  musics: musics[],
  index: number
}

function MusicItem({ music, index, musics, handleMusicsState }: MusicItemProps) {
  const { playQueue, currentMusic, queueGlobal } = useContext(PlayerContext);
  const { setStatePlaylist } = useContext(SharePlaylistContext);
  const isCurrentMusic = queueGlobal[currentMusic]?.id === music.id;

  return (
    <li
      key={music.id}
      className="flex group items-center pr-2 hover:bg-base-450 rounded-md text-[0.85rem] cursor-pointer"
    >
      <div className="flex pl-1 items-center gap-4 py-[0.3rem] w-full"
        onClick={handlePlayMusic(index)}
      >
        <div className="w-6 h-full shrink-0">
          <p className={`group-hover:hidden ${isCurrentMusic ? 'hidden' : ''} opacity-75 text-center`}>
            {music.track || "-"}
          </p>

          <PlayIcon className={`${isCurrentMusic ? 'block' : 'hidden'} fill-white mx-auto group-hover:block w-[1.2rem] h-full`} />
        </div>

        <p className="line-clamp-2 pr-1" title="">
          {music.title || last(split("\\", music.path))}
        </p>
      </div>

      <StarRating
        reated={music.reated}
        index={index}
      />
    </li>
  )

  function handlePlayMusic(musicIndex: number) {
    return () => playQueue(musicIndex, musics)
  }
}



export default MusicItem;