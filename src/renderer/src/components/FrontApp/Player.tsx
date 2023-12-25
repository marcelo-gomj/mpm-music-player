import { MusicMetadata } from "@renderer/types/metadatas";
import { useContext, useEffect, useState } from "react";
import AlbumCover from "./AlbumCover";
import TrackDetails from "./TrackDetails";
import PlayerController from "./PlayerController";
import MoreTools from "./MoreTools";
import { PlayerContext } from "@renderer/contexts/PlayerContext";

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
			<div className="flex relative flex-col justify-between h-full gap-2 p-3">
				<div className="flex gap-12">
					<AlbumCover
						srcBase64={music?.srcCover}
						mimeType={music?.mimeType}
					/>

					<TrackDetails
						music={musicStatus}
					/>

				</div>

				<div className="px-1">
					<PlayerController durationTotal={music?.duration} />
				</div>
			</div>
		</section>
	)

	async function getMetadataAlbum(path: string) {
		const { checkPath } = window.api;
		const { meta, image } = await checkPath(path);

		console.log("META", meta);

		if (meta) {
			const {
				common: { title, album, artist, track, picture }
			} = meta;

			setMusic({
				title,
				album,
				artist,
				mimeType: picture ? picture[0].format : picture,
				track: track.no,
				duration: meta.format.duration,
				srcCover: image
			})
		}
	}
}

export default Player;
