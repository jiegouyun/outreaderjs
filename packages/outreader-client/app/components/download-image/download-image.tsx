import { saveAs } from 'file-saver';
export function downloadIMG(elementID: string) {
  const chartSVG = document.getElementById(elementID) || new HTMLElement();
  const svgURL = new XMLSerializer().serializeToString(chartSVG);
  const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(svgBlob, `${elementID}.svg`);
}
