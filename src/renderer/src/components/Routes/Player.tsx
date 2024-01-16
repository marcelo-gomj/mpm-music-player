import { useContext } from "react";
import TrackDetails from "../PlayerComponents/TrackDetails";
import { PlayerContext } from "../../contexts/PlayerContext";
import ListMusics from "../MusicLists/ListMusics";
import useAlbumCover from "../../hooks/useAlbumCover";

function Player() {
	const { currentMusic, queueGlobal } = useContext(PlayerContext);
	const currentMusicPlayer = queueGlobal[currentMusic];
	const data = useAlbumCover(currentMusicPlayer?.path, { width: 200, height: 200 })

	return (
		<section className="grid px-2 py-6 grid-cols-[40%_60%] h-full">
			<div className="flex items-center w-full flex-col gap-6 relative p-8">
				<img
					className="rounded-lg w-[200px] h-[200px]"
					src={data}
				/>

				<TrackDetails
					music={currentMusicPlayer}
				/>
			</div>

			<div className="overflow-y-scroll px-6 bar-scroll h-full">
				{queueGlobal.length ?
					<ListMusics
						musicsList={queueGlobal}
						orderByAlbum={false}
						noHeaderAlbum={true}
					/> :
					null
				}
			</div>

		</section>
	)
}

export default Player;
