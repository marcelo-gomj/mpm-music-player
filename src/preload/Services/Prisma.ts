import { musics } from "@prisma/client";
import { map, reduce } from "ramda";
import { prisma } from "./PrismaClient"

const TypeMusic = {} as musics;


const hasDatabaseContent = async () => {
  return prisma.musics.count();
}

const findMany = async (
  pagination: number
) => {
  const data = await  prisma.musics.findMany({
    take: pagination,
  })

  console.log("GROUP BY",
    await prisma.musics.groupBy({
      by: ["folder", "album"],
      orderBy: {
        album: "asc"
      }
    })
  )

  return data
}

const queryMusicsByGroups = async (
  pagination: number, 
  skip: number,
  groups: (keyof musics)[]
) => {
  const [groupOrder] = groups;
  const res = await prisma.musics.findMany({
    take: pagination,
    skip: skip,
    distinct: groups,
    orderBy: reduce( 
      (grouped, field) => ({...grouped, [field] : "desc"}),
      {}, [groupOrder]
    )
  })

  return res;
}

export {
  hasDatabaseContent,
  findMany, 
  queryMusicsByGroups,
  TypeMusic
}
