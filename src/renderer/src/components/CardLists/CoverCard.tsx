import useAlbumCover from "../../hooks/useAlbumCover";

type CoverCardProps = {
  path: string
}

function CoverCard({ path } : CoverCardProps) {
  const srcImage = useAlbumCover(
    path, { width: 128, height: 128 }
  );

  return (
    <div className="w-28 text-center text-[0.9rem] cursor-pointer line-clamp-4 bg-base-500 rounded-md h-28">
      {srcImage ?
        <img
          className="h-full w-full rounded-md"
          src={srcImage}
        /> :
        <div className="w-full h-full"></div>
      }
    </div>
  )
}

export default CoverCard;
