import { contextBridge } from "electron";
import config from "./Services/ElectronStore";
import howler from "./Services/Howler";
import { verifyFoldersAndUpdateDatabase } from "./Services/Metadata";
import { checkPath } from "./utils/AlbumCover";
import {
  TypeMusic,
  hasDatabaseContent,
  findMany,
  queryMusicsByGroups
} from "./Services/Prisma";
import OpenFolders from "./utils/OpenFoldersSystem";
import { prisma } from "./Services/PrismaClient";

prisma.$connect();

console.log("1. OK")

const api = {
  electron: {
    OpenFolders
  },
  prisma : {
    TypeMusic,
    hasDatabaseContent,
    queryMusicsByGroups,
    findMany
  },
  howler,
  config,
  checkPath,
  verifyFoldersAndUpdateDatabase,
}

declare global {
  interface Window {
    api : typeof api
  }
}

contextBridge.exposeInMainWorld("api", api)