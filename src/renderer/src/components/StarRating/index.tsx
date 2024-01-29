import { map, range } from "ramda";
import useRatingMusic from "../../hooks/useRatingMusic";
import { useContext } from "react";
import { SharePlaylistContext } from "../../contexts/SharePlaylist";

type StarRatingProps = { reated: number, index: number }

function StarRating({ reated, index }: StarRatingProps) {
  const { setStatePlaylist } = useContext(SharePlaylistContext);

  return (
    <div className="flex text-[1rem] h-full pl-2">
      {map((star) => (
        <span
          key={star}
          className={`h-full ${star < reated ? "" : "opacity-15"}`}
          onClick={() => useRatingMusic(setStatePlaylist, index, star)}
        >
          ★
        </span>
      ), range(0, 5))
      }
    </div>
  )
}

export default StarRating;