import media from "../../migration/media-manifest.json";

const dimensions = new Map(media.map((item) => [item.src, item]));
export function getMediaDimensions(src: string) {
  const item = dimensions.get(src) as
    { width?: number; height?: number } | undefined;
  return item?.width && item.height
    ? { width: item.width, height: item.height }
    : undefined;
}
