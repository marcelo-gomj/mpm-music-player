import { parseFile } from "music-metadata";

export async function checkPath(path: string) {
  const meta = await parseFile(path);
  const pictures = meta.common.picture;
  const image =  pictures ? pictures[0].data.toString('base64') : null ;

  // @ts-ignore
  if(pictures) meta.common.picture[0].data = []
  
  return {
    meta, 
    image
  }
}