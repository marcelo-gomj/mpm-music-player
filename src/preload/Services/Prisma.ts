import { musics, Prisma } from "@prisma/client";
import { prisma } from "./PrismaClient"

const TypeMusic = {} as musics;
export type OrderProps = Prisma.musicsOrderByWithAggregationInput | Prisma.musicsOrderByWithRelationInput[];

const hasDatabaseContent = async () => {
  return prisma.musics.count();
}

const findMany = async (
  pagination: number
) => {
  const data = await prisma.musics.findMany({
    take: pagination,
  })

  return data
}

const queryMusicsByGroups = async (
  pagination: number, 
  skip: number,
  distinct: ("folder" | "album" | "genres" | "artist")[],
  orderBy: OrderProps
) => {
  const res = await prisma.musics.findMany({
    take: pagination,
    select: {
      id: true,
      album: true,
      folder: true,
      artist: true,
      path: true
    },
    skip: skip,
    distinct,
    orderBy
  })

  console.log("GROUPS", res);
  

  return res;
}

const findAlbum = async (whereKey: keyof musics, field: string) => {
  const res = await prisma.musics.findMany({
    where: {
      [whereKey]: field
    },
    orderBy : {
      album: "asc"
    }
  })

  return res
}

const setReatedMusic = async (id: number, reated: number) => {
  await prisma.musics.update({
    where : {
      id
    },
    data: {
      reated
    }
  })
}

export default {
  hasDatabaseContent,
  findMany, 
  findAlbum,
  setReatedMusic,
  queryMusicsByGroups,
  TypeMusic
}
