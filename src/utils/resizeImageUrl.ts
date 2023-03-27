export default function resizeImageUrl(src: string, height: number, width: number, quality: number) {

  const splitter = "//assets.myntassets.com/"
  const placeholder = "h_($height),q_($qualityPercentage),w_($width)/v1/";

  if (!src.includes(placeholder)) {
    src = src.split(splitter).join(splitter + placeholder);
  }

  return src.replace('($height)', height ? height.toString() : '')
    .replace('($width)', width ? width.toString() : '')
    .replace('($qualityPercentage)', quality ? quality.toString() : '');
}