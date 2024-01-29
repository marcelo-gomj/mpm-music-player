import { musics } from "@prisma/client";
import { last, split } from "ramda";

export function defaultTitleCheck(content: musics, isMusic?: boolean) {
  return (isMusic ? content.title : content.album) || content.path
}
