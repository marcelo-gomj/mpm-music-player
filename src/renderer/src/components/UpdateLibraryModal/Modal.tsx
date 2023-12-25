

import { remove, union } from "ramda";
import { useState } from "react";
import UpdateState from "./UpdateState";
import SelectFolders from "./SelectFolders";

type PathProps = string[];

function UpdateLibrary() {
  const { config } = window.api;
  const { ipcRenderer } = window.electron;
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
    const options = { properties: ["multiSelections", "openDirectory"] };
    const paths = await ipcRenderer.invoke("open-dialog", options);
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