import { contextBridge } from "electron/renderer";
import electron from "electron";
import config from "./Services/ElectronStore";
import howler from "./Services/Howler";
import { verifyFoldersAndUpdateDatabase } from "./Services/Metadata";
import { checkPath } from "./utils/AlbumCover";
import prisma from "./Services/Prisma";

const api = {
  electron,
  howler,
  prisma,
  config,
  checkPath,
  verifyFoldersAndUpdateDatabase,
}

declare global {
  interface Window {
    api : typeof api
  }
}

contextBridge.exposeInMainWorld("api", api);