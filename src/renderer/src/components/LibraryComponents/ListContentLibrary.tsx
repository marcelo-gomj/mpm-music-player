import { splitEvery, uniq } from "ramda";
import { useEffect, useMemo, useState } from "react";
import { musics } from "@prisma/client";
import HeaderLibrary, { OrderProps } from "./HeaderLibrary";
import SectionCards from "./SectionCardsWrapper";

type FieldPaths = keyof musics;
type SectionsAlbumsProps = {
  path: FieldPaths,
  title: string
}

type AlbumsProps = musics[];

function SectionAlbums({ path, title }: SectionsAlbumsProps) {
  const [albums, setAlbums] = useState([] as AlbumsProps)
  const [orderByConfig, setOrderByConfig] = useState({ [path]: "desc" } as OrderProps)

  useEffect(queryAllAlbums, [path, orderByConfig]);

  const itemsList = useMemo(() => {
    return splitEvery(8, albums)
  }, [path, orderByConfig]);

  return (
    <>
      <HeaderLibrary
        title={title}
        mainField={"album"}
        handleOrderByConfig={handleOrderByConfig}
      />

      <div
        className="flex relative flex-col w-full"
      >{
          itemsList.map((itemsSection, index) => (
            <SectionCards
              path={path}
              index={index}
              itemsSection={itemsSection}
            />
          ))
        }</div>
    </>
  )

  function queryAllAlbums () {
    !(async () => {
      const {
        queryMusicsByGroups,
      } = window.api.prisma;
  
      const groupByPath = uniq([path, "folder"]);
  
      const albums : any = await queryMusicsByGroups(100, 0, groupByPath, orderByConfig)
      console.log("ALBUMS", albums);
      setAlbums(albums as musics[]);
    })
  }

  function handleOrderByConfig(orderBy: OrderProps) {
    setOrderByConfig(orderBy)
  }
}

export default SectionAlbums;
