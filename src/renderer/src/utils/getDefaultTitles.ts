import { musics } from "@prisma/client";
import { last, split } from "ramda";

export function defaultTitleCheck(content: musics) {
  return content.album || last(split("\\", content.folder))
}
