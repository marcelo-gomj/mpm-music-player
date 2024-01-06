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
  distinct: any,
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

  console.log("ORDER ", orderBy)

  return res;
}

export default {
  hasDatabaseContent,
  findMany, 
  queryMusicsByGroups,
  TypeMusic
}
