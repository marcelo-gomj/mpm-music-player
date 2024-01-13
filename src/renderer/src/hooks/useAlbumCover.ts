import { useEffect, useMemo, useState } from "react";

type CoverSizesProps = { height: number, width: number };

const useAlbumCover = (path : string, coverSizes : CoverSizesProps ) => {
  const [srcUrlImage, setSrcUrlImage] = useState<null | string>(null)

  const getBase64ImageSrc = async () => {
    const { checkPath } = window.api;
    const { image, meta } = await checkPath(path, coverSizes);
    
    if(image){
      setSrcUrlImage(`data:${meta};base64,${image}`);     
    }
  }

  useEffect(() => {
    getBase64ImageSrc()
  }, [path])

  return srcUrlImage
}


export default useAlbumCover;