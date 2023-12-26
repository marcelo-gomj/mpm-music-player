import { ipcRenderer, OpenDialogOptions } from "electron";

const OpenFolders = (options: OpenDialogOptions) => ipcRenderer.invoke("open-dialog", options);

export default OpenFolders;