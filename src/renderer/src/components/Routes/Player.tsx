import { MusicMetadata } from "../../types/metadatas";
import { useContext, useEffect, useState } from "react";
import AlbumCover from "../PlayerComponents/AlbumCover";
import TrackDetails from "../PlayerComponents/TrackDetails";
import PlayerController from "../PlayerComponents/PlayerController";
import { PlayerContext } from "../../contexts/PlayerContext";

type MusicProps = MusicMetadata | null;

function Player() {
	const { currentMusic, queueGlobal, howlerGlobal } = useContext(PlayerContext);
	const [music, setMusic] = useState<MusicProps>();

	useEffect(() => {
		if (currentMusic !== null) {
			getMetadataAlbum(queueGlobal[currentMusic])
		}
	}, [howlerGlobal]);

	const musicStatus = music ? {
		title: music.title,
		track: music.track,
		album: music.album,
		artist: music.artist,
		duration: music.duration
	} : null;

	return (
		<section className="flex flex-col justify-between pb-0 h-full rounded-md ">
			<div className="flex relative justify-between h-full  my-2 mx-4 gap-8 p-3">
				<div className="flex flex-col gap-6 relativew-[50%] p-8 rounded-2xl">
					<AlbumCover
						srcBase64={music?.srcCover}
						mimeType={music?.mimeType}
					/>

					<TrackDetails
						music={musicStatus}
					/>
				</div>
				<div className="flex flex-col gap-1.5 list-none w-[50%] h-full">
					<li>1. Música</li>
					<li>2. Música</li>
					<li>3. Música</li>
					<li>4. Música</li>
					<li>5. Música</li>
					<li>6. Música</li>
				</div>
			</div>
			<div className="mt-6 mb-2">
				<PlayerController durationTotal={music?.duration} />
			</div>
		</section>
	)

	async function getMetadataAlbum(path: string) {
		const { checkPath } = window.api;
		const { meta, image } = await checkPath(path, { height: 128, width: 128 });


		if (meta) {
			const {
				common: { title, album, artist, track, picture }
			} = meta;

			setMusic({
				title,
				album,
				artist,
				// mimeType: picture ? picture[0].format : picture,
				track: track.no,
				duration: meta.format.duration,
				srcCover: image
			})
		}
	}
}

export default Player;
