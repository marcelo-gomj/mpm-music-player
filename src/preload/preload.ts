import { contextBridge } from "electron";
import config from "./Services/ElectronStore";
import howler from "./Services/Howler";
import { verifyFoldersAndUpdateDatabase } from "./Services/Metadata";
import { checkPath } from "./utils/AlbumCover";
import prisma from "./Services/Prisma";
import OpenFolders from "./utils/OpenFoldersSystem";
// import { prisma as prismaClient } from "./Services/PrismaClient";


const api = {
  electron: {
    OpenFolders
  },
  prisma,
  howler,
  config,
  checkPath,
  verifyFoldersAndUpdateDatabase,
}

declare global {
  interface Window {
    api: typeof api
  }
}

contextBridge.exposeInMainWorld("api", api)