//@ts-ignore
import CloseIcon from "../assets/Close.svg?react";

import React, { ReactNode, createContext, useState } from "react";

type ContentModal = (() => ReactNode) | null;
type CustomizeModalProp = {
  title?: string,
  buttonLeft?: ActionButtton,
  buttonRigth?: ActionButtton
  closeModal?: () => void
}
type ModalContextProps = {
  handleContentModal: (content: ContentModal) => void,
  handleCustomizeModal: (customize: CustomizeModalProp) => void
}
type ActionButtton = [string, () => void]

type ModalProvider = {
  children: React.ReactNode
}

export const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({ children } : { children: any  }) {
  const [modalContent, setModalContent] = useState<ContentModal>(null);
  const [customizeModal, setCustomizeModal] = useState<CustomizeModalProp>({})
  const { title, buttonLeft, buttonRigth, closeModal } = customizeModal;

  const Component = modalContent !== null ? modalContent : (() : any => null);

  return (
    <ModalContext.Provider value={{ handleContentModal, handleCustomizeModal }}>
      {children}

      <section
        className={`${modalContent ? 'flex animation-open-modal' : 'hidden'} bg-[rgba(0,0,0,0.5)] items-center absolute h-full w-full top-0 left-0`}
      >
        <div className={`flex relative flex-col items-center border-base-600 px-4 bg-base-100 h-[80vh] w-full mx-8 rounded-lg border-[1px]`}>

            <header
              className="flex relative justify-center items-center py-4 w-full h-12"
            >
              <h1>{title || "Selecione pastas de músicas"}</h1>

              <div
                onClick={closeModal}
                className="absolute right-0 cursor-pointer"
              >
                <CloseIcon className="w-7 h-7" />
              </div>
            </header>

            <div className="relative overflow-y-visible h-[calc(80%_-_1rem)] w-full">
              {
                <Component />
              }
            </div>

            <div className="flex absolute bottom-0 gap-6 justify-center bg-base-100 text-center h-16 w-full">
              {buttonLeft ?
                <div
                  onClick={buttonLeft[1]}
                  className="w-[35%] py-2.5 my-auto cursor-pointer border-base-700 hover:border-2 rounded-3xl "
                >
                  {buttonLeft[0]}
                </div> : null}
              {buttonRigth ?
                <div
                  onClick={buttonRigth[1]}
                  className="w-[35%] py-2.5 my-auto cursor-pointer bg-base-400 border-base-700 rounded-3xl hover:border-2"
                >
                  {buttonRigth[0]}
                </div> : null}
            </div>
        </div>
      </section>
    </ModalContext.Provider>
  )

  function handleContentModal(
    content: ContentModal
  ) {
    setModalContent(() => content)
  }

  function handleCustomizeModal(
    customize: CustomizeModalProp
  ) {
    setCustomizeModal({ ...customizeModal, ...customize })
  }
}
