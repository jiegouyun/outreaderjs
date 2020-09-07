import { saveAs } from 'file-saver';
export function downloadIMG(elementID: string) {
  const chartSVG = document.getElementById(elementID) || new HTMLElement();
  const svgXML = new XMLSerializer().serializeToString(chartSVG);
  const svgBlob = new Blob([svgXML], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(svgBlob, `${elementID}.svg`);
}
