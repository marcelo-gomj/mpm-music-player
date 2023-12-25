import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const hasDatabaseContent = () => {
  return prisma.music.count()
}


export default {
  hasDatabaseContent,
}