import { useContext } from "react";

import AddButton from "../../assets/plus.svg?react"

import { ModalContext } from "../../contexts/ModalContainer";
import UpdateLibrary from "../UpdateLibraryModal/Modal";
import { RouterContext } from "../../contexts/Router";

function NoSourceLibrary(){
  const { setRoute } = useContext(RouterContext); 
  const { handleContentModal, handleCustomizeModal } = useContext(ModalContext);

  return (
    <section
      className="flex items-center justify-center select-none bg-base-200 h-full w-full"
    >
      <div
        className="flex flex-col items-center h-[25%] gap-y-8"
      >
        <p
          className="text-[1.05rem]"
        >
          Ainda não há nenhum conteúdo adicionado
        </p>
        
        <div
          className="flex items-center gap-6 border-2 border-base-600 hover:border-base-800 active:border-neutral-600 duration-100 font-medium pl-4 pr-8 py-2 rounded-3xl cursor-pointer"
          onClick={handleClickAddSources}
        >
          <AddButton className="h-7 w-7" />
          Adicionar músicas
        </div>
      </div>

      <div
        className="absolute bottom-1 font-medium right-2 px-6 py-4 cursor-pointer"
        onClick={handleSkipUpdateSource}
      >Não quero adicionar ainda</div>
    </section>
  )

  function handleClickAddSources(){
    handleContentModal(UpdateLibrary)
    handleCustomizeModal({ closeModal : () => {
      handleContentModal(null);
    }})
  }

  function handleSkipUpdateSource(){
    setRoute('player');
  }
}

export default NoSourceLibrary;
