import { addIndex, map } from "ramda";
import { useEffect, useState } from "react";

function SectionAlbums() {
  const {
    TypeMusic,
    findMany,
    queryMusicsByGroups,
  } = window.api.prisma;


  type AlbumsProps = typeof TypeMusic[] | [];
  const [albums, setAlbums] = useState<AlbumsProps>([])

  useEffect(queryAllAlbums, []);

  return (
    <div className="grid grid-cols-4 gap-6 justify-between p-8 w-full h-full">
      {
        map(item => {
          const keyUnique = item.album || item.folder;

          return (
            <div className="flex flex-col w-32 gap-10">
              <AlbumItem
                id={item.id}
                path={item.path}
              />

              <p className="text-center text-[0.9rem]">{keyUnique}</p>
            </ div>
          )
        }, albums)
      }
    </div>
  )

  function queryAllAlbums() {
    if (!albums.length) {
      queryMusicsByGroups(100, 0, ["album", "folder"])
        .then(albums => {
          setAlbums(albums)
        })
    }
  }
}

function AlbumItem({ path, id }: { path: string, id: number }) {
  const [coverAlbum, setCoverAlbum] = useState<any>(null as { mimeType: string, srcBase64: string });

  useEffect(() => {
    if(!coverAlbum) getAlbumCover()
  }, [path]);

  return (
    <div key={id} className="w-32 text-center text-[0.9rem] cursor-pointer line-clamp-4 bg-base-500 rounded-md h-32 hover:ring-2 ring-white">
      {coverAlbum?.srcBase64 ?
        <img
          className="h-full w-full rounded-md"
          src={`data:${'image/jpeg'};base64,${coverAlbum.srcBase64}`}
        /> :
        <div className="w-full h-full"></div>
      }
    </div>
  )

  function getAlbumCover() {
    const { checkPath } = window.api;
    const albumsSizes = { height: 128, width: 128 } 
    checkPath(path, albumsSizes).then(
      ({ image, meta }) => {
        setCoverAlbum({ MimeType: meta, srcBase64: image })
      }
    )
  }
}

export default SectionAlbums;
