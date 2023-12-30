import HomeIcon from "../assets/Header/HomePlay.svg?react";
import ConfigIcon from "../assets/Header/Settings.svg?react";
import LibraryIcon from "../assets/Header/Library.svg?react";
import SearchIcon from "../assets/Header/Search.svg?react";
import MiniPlayerIcon from "../assets/Header/Radio.svg?react";

import { map } from "ramda";
import { useContext } from "react";
import { RouterContext } from "../contexts/Router";

type TypeHeaderItems = [string, any, (() => void) | undefined]

function Header() {
  const { setRoute, currentPath } = useContext(RouterContext);
  const HEADER_ITEMS : TypeHeaderItems[] = [
    ['player', HomeIcon, handleClickHome],
    ['library', LibraryIcon, handleClickLibrary],
    ['search', SearchIcon, undefined],
    ['mini-player', MiniPlayerIcon, undefined],
    ['config', ConfigIcon, undefined],
  ]

  return (
    <header className="flex flex-col gap-2 justify-center items-center h-full">
      {
        map(([ title, Icon, handleClick ]) => {
          const currentHeaderSelected = currentPath === title;
          return (
            <div
              className="relative group cursor-pointer hover:opacity-100 py-4 mx-1 px-3.5 " 
              key={title}
              onClick={handleClick}
            >
              <Icon className={`w-[1.5rem] h-[1.5rem] ${currentHeaderSelected ? "" : "opacity-40"}`}/>
              
              <div className="absolute hidden group-active:hidden group-hover:block right-1 top-[50%] translate-y-[-50%] h-3 rounded-xl w-1 bg-white"></div>
            </div>
          )
        }, HEADER_ITEMS)
      }
    </header>
  )

  function handleClickLibrary(){
    setRoute("library")
  }

  function handleClickHome(){
    setRoute("player")
  }
}

export default Header;