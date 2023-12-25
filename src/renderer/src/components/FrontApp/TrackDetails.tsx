//@ts-ignore
import Star from "../../assets/star.svg?react";

type TrackDetailsProps = {
  music: {
    title ?: string,
    track ?: number | null,
    album ?: string,
    artist ?: string
  } | null
}

function TrackDetails({
  music
} : TrackDetailsProps ){
  return (
    <section className="flex justify-between my-8 w-full">
      <div>
        <p className="text-white font-medium line-clamp-1">
          {music?.track ? music.track + ". " : ""} { music?.title || "Sem titúlo"}
        </p>

        <p className="text-neutral-500 text-[0.9rem] line-clamp-1">{music?.album || "Sem album"}{", " + music?.artist || ""}</p>
      </div>
      
      <div className="flex align-top">
        <Star className="w-8" />
      </div>
    </section>
  )
}

export default TrackDetails;