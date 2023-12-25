// @ts-ignore
import Library from "../../assets/playlist.svg?react";
// @ts-ignore
import Eq from "../../assets/equalizer.svg?react";
// @ts-ignore
import Config from "../../assets/setting.svg?react";
// @ts-ignore
import Volume from "../../assets/volume.svg?react";
import { map }from "ramda";
import { useContext } from "react";
import { RouterContext } from "@renderer/contexts/Router";

function MoreTools(){
  const { setRoute } = useContext(RouterContext);
  const tools = [
    {
      title: "library",
      Icon: Library,
      handle: () => {
        setRoute("library")
      }
    },
    {
      title: "Eq",
      Icon: Eq,
      handle: () => {}
    },
    {
      title: "Configurations",
      Icon: Config,
      handle: () => {}
    },
    {
      title: "Volume",
      Icon: Volume,
      handle: () => {}
    },
  ]

  return (
    <section
      className="bg-base-400 px-8"
    >
      <ul
        className="flex justify-around py-4"
      >
        {map( generateToolsButtons, tools)}
      </ul>
    </section>
  )

  function generateToolsButtons({ title, Icon, handle } : typeof tools[0]){
    return (
      <li 
        key={title}
        onClick={handle}
      >
        <Icon
          className="cursor-pointer w-6 h-6 opacity-50 hover:opacity-100" 
        />
      </li>
    )
  }
}


export default MoreTools;