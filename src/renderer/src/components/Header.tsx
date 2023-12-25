//@ts-ignore
import HomeIcon from "../assets/play.svg?react";
//@ts-ignore
import ConfigIcon from "../assets/config.svg?react";
//@ts-ignore
import LibraryIcon from "../assets/library.svg?react";
//@ts-ignore
import SearchIcon from "../assets/search.svg?react";
//@ts-ignore
import MiniPlayerIcon from "../assets/mini-player.svg?react";

import { map } from "ramda";
import { useContext } from "react";
import { RouterContext } from "@renderer/contexts/Router";

type TypeHeaderItems = [string, any, (() => void) | undefined]

function Header() {
  const { setRoute } = useContext(RouterContext);
  const headerItems : TypeHeaderItems[] = [
    ['home', HomeIcon, undefined],
    ['library', LibraryIcon, handleClickLibrary],
    ['search', SearchIcon, undefined],
    ['mini-player', MiniPlayerIcon, undefined],
    ['config', ConfigIcon, undefined],
  ]

  return (
    <header className="flex flex-col justify-center items-center gap-10 h-full px-5 pr-6">
      {
        map(([title, Icon, handleClick]) => (
          <div
            className="cursor-pointer opacity-75 hover:opacity-100" 
            key={title}
            onClick={handleClick}
          >
            <Icon className="w-6 h-6"/>
          </div>
        ), headerItems)
      }
    </header>
  )

  function handleClickLibrary(){
    setRoute("library")
  }
}

export default Header;