import { musics } from "@prisma/client";
import { useEffect, useState } from "react";
import ListResults from "./ListResults";
import SideBarCategories from "./SideBarCategory";
import { includes } from "ramda";


export type fieldsKeys = ("album" | "artist" | "folder" | "genres")
type ListComponentsProps = {
  hasSubCategories: boolean,
  fieldsRoute : fieldsKeys[],
  title: string
}

function ListComponent({ hasSubCategories, fieldsRoute, title } : ListComponentsProps) {
  const { queryMusicsByGroups, findAlbum } = window.api.prisma;
  const [albums, setAlbums] = useState([] as musics[]);
  const [musicsListSelected, setMusicsListSelected] = useState(null as musics[])

  useEffect(queryAlbums, fieldsRoute)

  const selectedContentId = musicsListSelected ? musicsListSelected[0] : null;
  const orderResultByAlbums = fieldsRoute[0] === "album";

  return (
    <section
      className="grid grid-cols-[38%_60%] justify-between h-full w-full"
    >
      <SideBarCategories
        albums={albums}
        getAlbumsByField={handleClickAlbum}
        isSelected={selectedContentId} 
        hasSubCategory={hasSubCategories}
        uniqueField={fieldsRoute[0]} 
        title={title}      
      />

      <ListResults 
        selectedContentId={selectedContentId} 
        musicsListSelected={musicsListSelected}
        albumResults={hasSubCategories}
        handleMusicsSelected={setMusicsListSelected}      
      />
    </section>
  )

  function queryAlbums() {
    const [queryFieldKey] = fieldsRoute;
    queryMusicsByGroups(100, 0, fieldsRoute, { [queryFieldKey]: "asc" })
      .then((albums: musics[]) => {
        setAlbums(albums);

        if (musicsListSelected === null) {
          const [defaultAlbum] = albums;
          handleClickAlbum(defaultAlbum[queryFieldKey]);
        }
      })

    return () => {
      setAlbums([])
      setMusicsListSelected(null);
    }
  }

  function handleClickAlbum(id: string, subField?: fieldsKeys) {
    return () => findAlbum(subField || fieldsRoute[0], id).then(
      musics => setMusicsListSelected(musics)
    )
  }
}

export default ListComponent;
