import { musics } from "@prisma/client";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { formatDuration } from "../../utils/format";
import { defaultTitleCheck } from "../../utils/getDefaultTitles";
import StarRating from "../StarRating";

function ItemListFlex(
  { music, index, handleDragDrop, musicIndex }:
    { music: musics, index: number, musicIndex: string, handleDragDrop: (current: number, replaceIndex: number) => void }
) {
  const [, drag] = useDrag({
    type: "list",
    item: { id: music.id, index }
  })

  const [{ isHover }, drop] = useDrop({
    accept: "list",
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop: dropHandler,
  })

  return (
    <li
      ref={(node) => drag(drop(node))}
      className={`flex relative gap-8 text-[0.85rem] py-1.5 animate-[all_0.4s_ease]  transition-[padding-bottom_0.5s_linear] hover:bg-base-500 rounded-md px-6 cursor-pointer ${isHover ? 'opacity-35 bg-base-500' : ''}`}
      key={music.id}
    >
      <p className="opacity-70">{musicIndex}</p>
      <p>{defaultTitleCheck(music, true)}</p>
      <p>-</p>
      <p className="opacity-50">{(music.album || "")}</p>
      <StarRating
        index={index}
        reated={music.reated}
      />
      <p className="absolute right-5">{formatDuration(music.duration)}</p>
    </li>
  )

  function dropHandler(item: { id: number, index: number }) {
    if (item.index !== index) {
      handleDragDrop(index, item.index);
    }
  }
}

export default ItemListFlex;