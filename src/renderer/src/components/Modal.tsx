import { remove, union } from "ramda";
import { useState } from "react";
import UpdateState from "./ModalUpdateLibrary/UpdateState";
import SelectFolders from "./ModalUpdateLibrary/SelectFolders";
import { OpenDialogOptions } from "electron";

type PathProps = string[];

function UpdateLibrary() {
  const { config } = window.api;
  const { OpenFolders } = window.api.electron;
  const [pathsFolderSource, setPathsFolderSource] = useState<PathProps>(config("library_source"));
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    isUpdating ?
      <UpdateState 
        paths={pathsFolderSource} 
        setIsUpdating={updateLibrarySource} 
      /> 
      :
      <SelectFolders
        pathsFolders={pathsFolderSource}
        addFolders={addFolders}
        updateLibrarySource={updateLibrarySource}
        removePath={removePath}
      />
  )

  async function addFolders() {
    const options : OpenDialogOptions = { properties: ["multiSelections", "openDirectory"] };
    const paths = await OpenFolders(options);
    const uniquePaths = union(pathsFolderSource, paths);

    config("library_source", uniquePaths);
    setPathsFolderSource(uniquePaths);
  }

  function removePath(index: number) {
    const restPaths = remove(index, 1, pathsFolderSource);

    setPathsFolderSource(restPaths);
    config("library_source", restPaths)
  }

  function updateLibrarySource(update ?: boolean) {
    if( update !== undefined ) {
      setIsUpdating(update) 
    }

    return isUpdating
  }
}




export default UpdateLibrary;