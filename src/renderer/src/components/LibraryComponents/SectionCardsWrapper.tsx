import { musics } from "@prisma/client";
import { map } from "ramda";
import { useEffect, useRef, useState } from "react";
import AlbumItem from "../CardLists/AlbumItem";
import ArtistItem from "../CardLists/ArtistItem";
import FolderItem from "../CardLists/FolderItem";

function SectionCards({ index, itemsSection, path }: {
  index: number,
  path: string,
  itemsSection: musics[]
}) {
  const [settingCard, setSettingCard] = useState({
    lazyCover: false,
    visibility: false
  });

  const refWrapper = useRef<any>(null)

  useEffect(observerWrapperView, [])

  const CardByPath = {
    "artist": ArtistItem,
    "album": AlbumItem,
    "folder": FolderItem
  }[path]

  return (
    <div
      ref={refWrapper}
      key={index}
      style={{ visibility: settingCard.visibility ? "visible" : "hidden" }}
      className={`flex flex-wrap justify-between w-full h-[calc(256px_*_2)]`}
    >
      {
        map(item => (
          <div key={item.id} className="flex flex-col items-center w-40 h-64">
            {settingCard.lazyCover ?
              <CardByPath
                item={item}
              /> :
              null
            }
          </div>
        ), itemsSection)
      }
    </div>
  )

  function observerCallback(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setSettingCard({
        lazyCover: true,
        visibility: true
      })
    } else {
      setSettingCard(setting => ({ ...setting, visibility: false }))
    }
  }

  function observerWrapperView() {

    if (refWrapper.current) {
      const observer = new IntersectionObserver(observerCallback);
      observer.observe(refWrapper.current)
    }
  }
}


export default SectionCards;