// import { Promise } from "node-id3";
import { parseFile } from "music-metadata";
import { head, last, split } from "ramda";
import sharp from "sharp";

type ImageSizes = { width: number, height: number }

export const checkPath = async (
  path: string, 
  { width, height }: ImageSizes
) => {
  const meta = await parseFile(path);
  const pictures = meta.common.picture;
  const [image] =  pictures;

  if(image){
    const resizedBufferImage = await sharp(image.data)
    .pipelineColorspace("rgb16")
    .resize(width, height)
    .toBuffer()

    return {
      meta: image.format, 
      image: resizedBufferImage.toString("base64")
    }
  }
  // @ts-ignore
  // if(pictures) meta.common.picture[0].data = []
  
}