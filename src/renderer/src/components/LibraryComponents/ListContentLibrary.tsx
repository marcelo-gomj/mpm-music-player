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
  const [orderByConfig, setOrderByConfig] = useState({ [path]: "asc" } as OrderProps)

  useEffect(
    queryAllAlbums,
    [path, orderByConfig]
  );

  const itemsList = useMemo(
    splitEveryEigthItems,
    [albums, orderByConfig]
  );

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

  function queryAllAlbums() {
    const {
      queryMusicsByGroups,
    } = window.api.prisma;

    const groupByPath = uniq([path, "folder"]);

    queryMusicsByGroups(100, 0, groupByPath, orderByConfig).then(
      (albums : musics[]) => {
        setAlbums(albums);
      })
  }

  function handleOrderByConfig(orderBy: OrderProps) {
    setOrderByConfig(orderBy)
  }

  function splitEveryEigthItems() {
    return splitEvery(8, albums)
  }
}

export default SectionAlbums;
