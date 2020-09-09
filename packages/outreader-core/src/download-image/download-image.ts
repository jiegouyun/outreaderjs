import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
export function downloadSVG(elementID: string) {
  const chartSVG = document.getElementById(elementID)?.firstElementChild || new HTMLElement();
  const svgXML = new XMLSerializer().serializeToString(chartSVG);
  const svgBlob = new Blob([svgXML], { type: 'image/svg+xml;charset=utf-8' });
  saveAs(svgBlob, `${elementID}.svg`);
}

export function downloadPNG(elementID: string) {
  const chartSVG = document.getElementById(elementID) || new HTMLElement();
  const scale = 5;
  const style = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: chartSVG.scrollWidth * scale + 'px',
    height: chartSVG.scrollHeight * scale + 'px',
  };
  const param = {
    bgcolor: '#ffffff',
    height: chartSVG.scrollHeight * scale,
    width: chartSVG.scrollWidth * scale,
    style,
  };
  domtoimage.toBlob(chartSVG, param).then((blob) => {
    saveAs(blob, `${elementID}.png`);
  });
}
