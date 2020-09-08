import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
export function downloadSVG(elementID: string) {
  const chartSVG = document.getElementById(elementID) || new HTMLElement();
  const svgXML = new XMLSerializer().serializeToString(chartSVG);
  const svgBlob = new Blob([svgXML], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(svgBlob, `${elementID}.svg`);
}

export function downloadPNG(elementID: string) {
  const chartSVG = document.getElementById(elementID) || new HTMLElement();
  domtoimage.toBlob(chartSVG, { bgcolor: '#ffffff' }).then((blob) => {
    saveAs(blob, `${elementID}.png`);
  });
}
