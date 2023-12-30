import { useContext, useEffect, useState } from "react";
import CircleProgressBar from "./CircleProgressBar";
import { ModalContext } from "../../contexts/ModalContainer";
import { RouterContext } from "../../contexts/Router";
import { Optional } from "@prisma/client/runtime/library";
import { includes } from "ramda";

type UpdateStateProps = {
  paths: string[],
  setIsUpdating: (update?: boolean) => boolean
}

type Status = "INITIAL" | "SCANNING" | "CHECK_FILES" | "UPDATING" | "COMPLETED";
type LoggerProps = {
  status: Status,
  musicsTotal: number,
  updateds: number,
  erros: string[]
}

function UpdateState({ paths, setIsUpdating }: UpdateStateProps) {
  const { handleCustomizeModal, handleContentModal } = useContext(ModalContext);
  const { setRoute } = useContext(RouterContext);
  const [logger, setLogger] = useState<LoggerProps>({
    status: "INITIAL",
    musicsTotal: 0,
    updateds: 0,
    erros: []
  });

  useEffect(() => {
    handleCustomizeModal({
      buttonLeft: undefined,
      buttonRigth: ["Iniciar Verificacão", () => {
        InitialScanningFolders()
      }]
    })
  }, []);

  useEffect(() => {
    showButtonFinal()
  }, [logger.status])

  const isScanning = includes( logger.status, ["SCANNING", "UPDATING"]);
  const [radiusProgress, progress] = calcProgressStatus();

  return (
    <div className="relative">
      <div
        className="flex relative justify-center items-center h-[50vh] w-full"
      >
        {
          isScanning ?
            null :
            <div className="absolute  flex justify-center items-center left-0 top-0 h-full w-full">
              <div className="text-[3rem] font-medium text-[white]">{progress || 0}%</div>
            </div>
        }

        <CircleProgressBar
          isScanning={isScanning}
          radiusProgress={radiusProgress}
        />
      </div>

      <div className="animation-move text-center font-medium text-neutral-400">
        {showUpdatingStatus(logger.status)}
      </div>
    </div>
  )

  function calcProgressStatus() {
    const currentProgress = Math.ceil((63 / logger.musicsTotal) * logger.updateds);
    const porcetagem = Math.trunc((currentProgress / 63) * 100);

    return [currentProgress, porcetagem];
  }

  function updateStateLogger(updateLogger: Optional<LoggerProps>) {
    setLogger((oldLogger) => ({ ...oldLogger, ...updateLogger }))
  }

  function showUpdatingStatus(status: Status) {
    return {
      "INITIAL": "",
      "SCANNING": `${logger.musicsTotal} arquivos de músicas verificados`,
      "CHECK_FILES": `Adicionando ${logger.updateds} de ${logger.musicsTotal}`,
      "UPDATING": `Adicionando ${logger.updateds} no Database`,
      "COMPLETED": `${logger.updateds} músicas adicionados`,
    }[status]
  }

  function InitialScanningFolders() {
    handleCustomizeModal({
      title: "Atualizando músicas",
      buttonLeft: undefined,
      buttonRigth: ["Cancelar", () => setIsUpdating(false)]
    })

    if(logger.status === "INITIAL"){
      updateStateLogger({ status : "SCANNING" });
      
      window.api.verifyFoldersAndUpdateDatabase(
        paths,
        true,
        updateStateLogger
      )
    }
  }

  function routeForLibrary() {
    setRoute('library');
    handleContentModal(null);
  }

  function showButtonFinal() {
    if (logger.status === "COMPLETED") {
      handleCustomizeModal({
        buttonLeft: ["Adicionar mais", () => setIsUpdating(false)],
        buttonRigth: ["Ir pra Bibiblioteca", routeForLibrary]
      })
    }

    if(includes(logger.status, ["SCANNING", "CHECK_FILES", "UPDATING"])){
      handleCustomizeModal({
        buttonRigth: ["Cancelar", () => setIsUpdating(false)],
        buttonLeft: undefined
      })
    }
  }

}

export default UpdateState;