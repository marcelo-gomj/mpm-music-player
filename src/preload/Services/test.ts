import { prisma } from "./PrismaClient";


async function groupTest(){
  const res = await prisma.musics.groupBy({
    by : ["artist", "album", "folder"],
    orderBy: {
      "artist" : "desc"
    }
  })

  console.log(res)
}

export function init(){
  groupTest()
}