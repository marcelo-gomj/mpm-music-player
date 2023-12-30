import DeletePathIcon from "../../assets/Close.svg?react";
import FolderIcon from "../../assets/folders.svg?react";

import { ModalContext } from "../../contexts/ModalContainer";
import { useContext, useEffect, useState } from "react";

type SelectFoldersProps = {
  pathsFolders: string[],
  addFolders: () => void,
  updateLibrarySource: (update?: boolean) => boolean,
  removePath: (index: number) => void
}

function SelectFolders({
  pathsFolders,
  addFolders,
  updateLibrarySource,
  removePath
}: SelectFoldersProps) {
  const { handleCustomizeModal } = useContext(ModalContext);

  useEffect(setModalActions, []);

  return (
    <div
      className="flex flex-col gap-4 overflow-y-scroll p-3 w-full h-full text-neutral-400 bar-scroll"
    >
      {
        pathsFolders.length ?
          pathsFolders.map((path, index) => {
            return (
              <PathItem
                removePath={() => removePath(index)}
                key={index}
                path={path}
              />
            )
          }) :

          <div className="flex items-center justify-center text-[1.1rem] w-full h-full ">
            <p className="">Nenhuma pasta selecionada</p>
          </div>
      }
    </div>
  )

  function setModalActions() {
    handleCustomizeModal({
      title: 'Seleciona as pasta de músicas',
      buttonLeft: ['Adicionar pastas', addFolders],
      buttonRigth: ['Atualizar', () => updateLibrarySource(true)]
    })
  }
}

function PathItem(
  { path, removePath }:
    { path: string, removePath: () => void, }
) {
  const [closeIcon, setCloseIcon] = useState(false);
  return (
    <div
      title={path}
      onMouseOver={() => setCloseIcon(true)}
      onMouseOut={() => setCloseIcon(false)}
      onClick={removePath}
      className="group flex gap-6 relative hover:text-white cursor-pointer"
    >
      <div className="h-full">
        <div className="flex items-center relative h-full bg-base-100">
          
          {closeIcon ? 
            <DeletePathIcon className="w-5 h-5 fill-[red]" /> : 
            <FolderIcon className="w-5 h-5 opacity-60" /> }
        </div>
      </div>



      <p className="line-clamp-3 text-[0.92rem]">{path}</p>

    </div>
  )
}

export default SelectFolders;