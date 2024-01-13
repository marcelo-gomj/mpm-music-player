import { musics } from "@prisma/client";
import PlayIcon from "../../assets/play.svg?react";
import { last, range, split, update } from "ramda";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

type MusicItemProps = {
  music: musics,
  index ?: number
}

function MusicItem({ music, index }: MusicItemProps) {
  return (
    <li
      className="flex group items-center pr-2 hover:bg-base-450 rounded-md text-[0.9rem] cursor-pointer"
    >
      <div className="flex pl-1 items-center gap-4 py-[0.3rem] w-full"
        // onClick={handlePlayMusic(index)}
      >
        <div className="w-6 h-full">
          <p className="group-hover:hidden opacity-75 text-center">
            {music.track || "-"}
          </p>

          <PlayIcon className="hidden fill-white mx-auto group-hover:block w-[1.2rem] h-full" />
        </div>

        <p className="line-clamp-2 pr-1" title="">
          {music.title || last(split("\\", music.path))}
        </p>
      </div>

      <div className="flex text-[1rem] h-full pl-2"
        onClick={() => { }}
      >
        {showReatedStarIcons(music.id, music.reated, index)}
      </div>
    </li>
  )

  // function handlePlayMusic(musicIndex: number) {
	// 	return () => playQueue(musicIndex, musicsListSelected.map(music => music.path))
	// }

  function showReatedStarIcons(id: number, reated: number, musicIndex: number) {
		return range(0, 5).map((_, index) => (
			<span
				className={`h-full ${index < reated ? "" : "opacity-15"}`}
				// onClick={handleClickStarReated(id, index + 1, musicIndex)}
			>
				★
			</span>
		));
	}

  
	// function handleClickStarReated(
	// 	id: number,
	// 	reate: number,
	// 	musicIndex: number,
	// ) {
	// 	const { setReatedMusic } = window.api.prisma;
	// 	return () => {
	// 		const music = musicsListSelected[musicIndex];
	// 		music.reated = reate;

	// 		handleMusicsSelected(
  //       update(musicIndex, music, musicsListSelected)
  //     );
	// 		setReatedMusic(id, reate);
	// 	};
	// }
}


export default MusicItem;