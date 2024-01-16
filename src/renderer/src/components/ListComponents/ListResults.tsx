import { defaultTitleCheck } from "../../utils/getDefaultTitles";
import CoverCard from "../CardLists/CoverCard";
import {
	__,
	addIndex,
	divide,
	filter,
	join,
	juxt,
	last,
	map,
	modulo,
	pipe,
	range,
	reduce,
	split,
	sum,
	update,
} from "ramda";
import { musics } from "@prisma/client";
import PlayIcon from "../../assets/play.svg?react";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import ListMusics from "../MusicLists/ListMusics";

type ListResultsProps = {
	selectedContentId: musics,
	musicsListSelected: musics[],
	albumResults: boolean,
	handleMusicsSelected: (musics: musics[]) => void
};

function ListResults({
	selectedContentId,
	musicsListSelected,
	handleMusicsSelected,
	albumResults
}: ListResultsProps) {
	return (
		<div className="p-4 pl-6 relative h-full bar-scroll overflow-y-scroll border-l-2 border-base-600">
			{selectedContentId ? (
				<section>
					<ListMusics
						musicsList={musicsListSelected}
						orderByAlbum={albumResults}
					/>
				</section>
			) : null}
		</div>
	);
}

export default ListResults;
