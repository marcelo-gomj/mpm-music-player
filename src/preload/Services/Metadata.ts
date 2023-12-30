import { Stats } from "fs";
import { stat, readdir } from "fs/promises"
import { filter, init, isNotNil, join, or, pipe, split, test } from "ramda";
import { IAudioMetadata, parseFile } from "music-metadata";
import { prisma } from "./PrismaClient";
// import { prisma } from "./Prisma";

type PathsProps = (string | PathsProps | null)[];
type LoggerStateProps = {
  status?: "INITIAL" | "SCANNING" | "CHECK_FILES" | "UPDATING" | "COMPLETED";
  musicsTotal?: number,
  updateds?: number,
  erros?: string[]
}

type LoggerStateFunction = (logger: LoggerStateProps) => void;
type T = any;

const suffixPath = (base: string) =>
  (finalPath: string) => base + "\\" + finalPath;

const sanitazePaths = pipe<T[], T[]>
  (filter(isNotNil));

const arrayForStringField = (list: string[] | undefined) => {
  return join(";", or(list, []));
}

const upsertMetadataDatabase = (
  path: string,
  { common, format }: Omit<IAudioMetadata, "native" | "quality">
) => prisma.musics.upsert({
  update: {},
  where: {
    path
  },
  create: {
    title: common.title,
    album: common.album,
    track: common.track.no,
    year: common.year,
    artist: common.artist,
    genres: arrayForStringField(common.genre),
    duration: format.duration,
    music_artist: arrayForStringField(common.artists),
    label: arrayForStringField(common.label),
    sample_rate: format.sampleRate,
    bitrate: format.bitrate,
    channels: format.numberOfChannels,
    folder: join("\\", init(split("\\", path))),
    path: path,

    current_disc: common.disk.no,
    total_discs: common.disk.of,
  }
})


const extractFileMetadata = async (
  paths: string[],
  setLoggerUpdates: LoggerStateFunction
) => {
  const updateds: ReturnType<typeof upsertMetadataDatabase>[] = []

  setLoggerUpdates({ status: 'CHECK_FILES' });

  for (const path of paths) {
    setLoggerUpdates({ updateds: updateds.length });

    try {
      const {
        common: { picture, ...common },
        format
      } = await parseFile(path);

      updateds.push(
        upsertMetadataDatabase(path, { common, format })
      )

      setLoggerUpdates({ updateds: updateds.length })
    } catch (err) { }
  }

  setLoggerUpdates({ status: 'UPDATING' });

  await prisma.$transaction(updateds);

  setLoggerUpdates({ status: "COMPLETED" })

  return;
}

const matchPathSupportedPaths = (path: string) => {
  const supportedPaths = /\.(MP3|MPEG|OPUS|OGG|OGA|WAV|AAC|CAF|M4A|MP4|WEBA|WEBM|DOLBY|FLAC)$/ig
  return test(supportedPaths, path)
}

const verifyFolderOrFile = async (
  elementStat: Stats,
  relativePath: string,
  subPath: boolean
) => {
  if (elementStat.isDirectory() && subPath) {
    return verifyFolders([relativePath], false, () => { })
  }

  if (elementStat.isFile() && matchPathSupportedPaths(relativePath)) {
    return relativePath
  }

  return null
}


const verifyFolders = async (
  basePath: string[],
  subPath: boolean,
  setLogger: LoggerStateFunction
) => {
  let paths: PathsProps = [];


  for (const path of basePath) {
    const rootPath = suffixPath(path)
    const folderElements = await readdir(path);

    for (const element of folderElements) {
      const relativePath = rootPath(element);
      const currentElement = await stat(relativePath);

      const foldersPaths = await verifyFolderOrFile(
        currentElement,
        relativePath,
        subPath
      )

      paths = [
        ...paths,
        ...(Array.isArray(foldersPaths) ? foldersPaths : [foldersPaths])
      ]

      setLogger({ musicsTotal: paths.length })
    }
  }

  return paths
}

export const verifyFoldersAndUpdateDatabase = async (
  paths: string[],
  subPath = true,
  stateLogger: LoggerStateFunction
) => {
  const sourceMusicsPaths = await verifyFolders(paths, subPath, stateLogger);

  const pathsSanatized = sanitazePaths(sourceMusicsPaths)
  stateLogger({ musicsTotal: pathsSanatized.length })

  extractFileMetadata(
    pathsSanatized,
    stateLogger
  )
}
