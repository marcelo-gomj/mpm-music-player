import { musics } from "@prisma/client";
import CoverCard from "../CardLists/CoverCard";
import { __, filter, join } from "ramda";
import { defaultTitleCheck } from "../../utils/getDefaultTitles";
import { ReactNode, useState } from "react";
import { selectFoldersSourcesLibrary } from "src/preload/Library/updateLibrary";

type HeaderMusicListProps = {
  selectedContentId: musics,
  totalDuration: string,
  children: ReactNode,
  hasGroup: boolean,
  showHeader?: boolean
}

function HeaderMusicList({ selectedContentId, totalDuration, showHeader, children, hasGroup }: HeaderMusicListProps) {
  const [listChidrenOpen, setListChidrenOpen] = useState(true)
  return (
    <>
      {showHeader ?
        <div 
          className="flex relative gap-6 items-center rounded-lg"
          onClick={toggleAlbumList}
        >
          <div className="shrink-0">
            {selectedContentId ? (
              <CoverCard path={selectedContentId.path} />
            ) : null}
          </div>

          <div className="flex flex-col justify-center h-[7rem] w-full relative ">
            <div className="text-[1.1rem] font-medium">
              {defaultTitleCheck(selectedContentId)}
            </div>

            <div className="flex absolute bottom-0 left-0 w-full justify-between text-[0.9rem] text-neutral-400">
              <div className="text-[0.9rem]">
                {listInfoContentInline([
                  selectedContentId.year,
                  selectedContentId.genres,
                ])}
              </div>
              <p>{totalDuration}</p>
            </div>
          </div>
        </div> :
        null
      }
      <div className={`${listChidrenOpen ? '' : 'hidden'}`}>
        {children}
      </div>
    </>
  )

  function listInfoContentInline(infos: (string | number)[]) {
    return join(
      ", ",
      filter((info) => !!info, infos),
    );
  }

  function toggleAlbumList(){
    if(hasGroup) setListChidrenOpen(!listChidrenOpen)
  }
}

export default HeaderMusicList;