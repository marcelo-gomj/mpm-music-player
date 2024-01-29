import { musics } from "@prisma/client";
import { useEffect, useState } from "react";
import ListResults from "./ListResults";
import SideBarCategories from "./SideBarCategory";
import { groupBy, head, prop, toPairs, or, reduce, map } from "ramda";
import SharePlaylist from "../../contexts/SharePlaylist";

export type fieldsKeys = ("album" | "artist" | "folder" | "genres")
type ListComponentsProps = {
  hasSubCategories: boolean,
  fieldsRoute: fieldsKeys[],
  title: string
}

export type CategoriesAlbumsType = musics[] | [string, musics[]][]

function ListComponent({ hasSubCategories, fieldsRoute, title }: ListComponentsProps) {
  const { queryMusicsByGroups, findAlbum } = window.api.prisma;
  const [categoriesAlbums, setCategoriesAlbums] = useState<CategoriesAlbumsType>([]);
  const [musicsListSelected, setMusicsListSelected] = useState(null as musics[])
  const uniqueField = head(fieldsRoute);

  useEffect(queryAlbums, [uniqueField])

  const selectedContentId = musicsListSelected ? musicsListSelected[0] : null;
  const orderResultByAlbums = fieldsRoute[0] === "album";

  return (
    <section
      className="grid relative grid-cols-[38%_60%] justify-between w-full h-full"
    >
      <SideBarCategories
        categories={categoriesAlbums}
        getAlbumsByField={handleClickAlbum}
        isSelected={selectedContentId}
        hasSubCategory={hasSubCategories}
        uniqueField={uniqueField}
        title={title}
      />
      <SharePlaylist
        setStatePlaylist={setMusicsListSelected}
      >
        <ListResults
          selectedContentId={selectedContentId}
          musicsListSelected={musicsListSelected}
          albumResults={hasSubCategories}
          handleMusicsSelected={setMusicsListSelected}
        />

      </SharePlaylist>
    </section>
  )

  function queryAlbums() {
    queryMusicsByGroups(100, 0, fieldsRoute, [
      ...map(field => ({ [field]: "asc" }), fieldsRoute)
    ])
      .then(groupByCategoryType)

    return () => {
      setCategoriesAlbums([]);
      setMusicsListSelected(null);
    }
  }

  function groupByCategoryType(albums: musics[]) {

    const defaultAlbum = head(albums);

    if (musicsListSelected === null) {
      handleClickAlbum(defaultAlbum[uniqueField]);
    }

    if (hasSubCategories) {
      setCategoriesAlbums(toPairs(groupBy(prop(uniqueField), albums)));
      return;
    }

    setCategoriesAlbums(albums);
  }

  function handleClickAlbum(id: string, subField?: fieldsKeys) {
    return () => {
      findAlbum(or(subField, uniqueField), id)
        .then(musics => {
          setMusicsListSelected(musics)
        })
    }
  }
}

export default ListComponent;
