import { musics } from "@prisma/client";
import { __, addIndex, divide, groupBy, map, pipe, prop, reduce, sum, toPairs } from "ramda";
import { useMemo, memo } from "react";
import MusicItem from "./MusicItem";
import HeaderMusicList from "./HeaderMusicList";
import SharePlaylist from "../../contexts/SharePlaylist";

type ListMusicsProps = {
  musicsList: musics[],
  orderByAlbum: boolean,
  noHeaderAlbum?: boolean
}

function ListMusics({ musicsList, orderByAlbum, noHeaderAlbum }: ListMusicsProps) {
  const subListMusics = useMemo(listMusics, [musicsList])

  return (
    <section
      className={`${checkHeaderAlbumList(1) ? 'space-y-8' : ""}`}
    >
      {addIndex(map)(listComponentByGroups, subListMusics)}
    </section>
  )

  function listMusics(): [string, musics[]][] {
    if (orderByAlbum) {
      return toPairs(groupBy(prop("album"), musicsList));
    }

    const { album, folder } = musicsList[0];
    const albumId = (album || folder)

    return [[albumId, musicsList]]
  }

  function checkHeaderAlbumList(index: number) {
    if (noHeaderAlbum) return false;

    return !index ? true : orderByAlbum
  }

  type groupsType = typeof subListMusics[0];
  function listComponentByGroups([key, list]: groupsType, index: number) {
    return (
      <section
        key={key}
        className="flex flex-col gap-6"
      >
        <HeaderMusicList
          hasGroup={orderByAlbum}
          showHeader={checkHeaderAlbumList(index)}
          selectedContentId={list[0]}
          totalDuration={calcTotalDurationContent(list)}
        >
          <ul key={key}>
            {addIndex(map)(
              (music: musics, index: number) => (
                <MusicItem
                  handleMusicsState={() => { }}
                  index={index}
                  music={music}
                  key={music.id}
                  musics={list}
                />
              ), list)}
          </ul>
        </HeaderMusicList>
      </section>
    )
  }

  function calcTotalDurationContent(musics: musics[]) {
    const totalDuration = sum(map((music) => music.duration, musics));
    const divideTime = divide(__, 60);

    return pipe(
      divideTime,
      (total) => [divideTime(total), total],
      map(Math.trunc),
      ([hours, min]) => `${hours ? `${hours} h ` : ""}${min} min`,
    )(totalDuration);
  }
}

export default ListMusics;