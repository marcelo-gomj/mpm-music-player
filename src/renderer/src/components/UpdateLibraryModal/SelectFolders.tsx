//@ts-ignore
import DeletePathIcon from "../../assets/Close.svg?react";
import { ModalContext } from "@renderer/contexts/ModalContainer";
import { useContext, useEffect, useState } from "react";

type SelectFoldersProps = {
  pathsFolders: string[],
  addFolders: () => void,
  updateLibrarySource: (update ?: boolean) => boolean,
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
        pathsFolders.map((path, index) => {
          return (
            <PathItem
              removePath={() => removePath(index)}
              key={index}
              path={path}
            />
          )
        })
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
      className="group flex gap-2 justify-between relative hover:text-white cursor-pointer"
    >
      <p className="line-clamp-3 text-[0.92rem]">{path}</p>
      {closeIcon ?
        <div className="h-full">
          <div className="flex items-center relative h-full bg-base-100">
            <DeletePathIcon className="w-5 h-5" />
          </div>
        </div>

        : <span className="w-5"></span>
      }
    </div>
  )
}

export default SelectFolders;