import React from 'react';
// import { saveAs } from 'file-saver';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ZAxis,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import { IData, IDescribe } from '../../interfaces';

interface ILabel {
  xLabel: string;
  yLabel?: string;
}

/**
 * @description draw multiple liens in scatter chart;
 * @param labels {xLabel: string, yLabel : string}, label in x axis and y axis;
 * @param describes {name: string, fill: string, shape: string}[], name is line name in legend,
 *                  fill is line color in ARGB type, shape is line scatter type.
 * @param datas {x: number, y: number}[], lines data.
 */
export function StoreyChart(props: {
  labels: ILabel;
  describes: IDescribe[];
  datas: IData[][];
}) {
  // const svgToPng = (svg: HTMLElement, width: number, height: number) => {

  //   return new Promise((resolve, reject) => {

  //     let canvas = document.createElement('canvas');
  //     canvas.width = width;
  //     canvas.height = height;
  //     let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  //     // Set background to white
  //     ctx.fillStyle = '#ffffff';
  //     ctx.fillRect(0, 0, width, height);

  //     let xml = new XMLSerializer().serializeToString(svg);
  //     let dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(xml);
  //     let img = new Image(width, height);

  //     img.onload = () => {
  //         ctx.drawImage(img, 0, 0);
  //         let imageData = canvas.toDataURL('image/png', 1.0);
  //         resolve(imageData)
  //     }

  //     img.onerror = () => reject();

  //     img.src = dataUrl;
  //   });
  // };

  // const downloadPNG = async () => {
    // let chartSVG = document.getElementById('chart') as HTMLElement;
    // const pngData = await svgToPng(chartSVG, 300, 400);
    // // saveAs(pngData, `${props.labels.xLabel}.png`);
    // console.log('Do what you need with PNG', pngData);
  // };

  const chart = (   
    <div id="chart">
    <ScatterChart      
      key={props.labels.xLabel}
      width={300}
      height={400}
      margin={{
        top: 10,
        right: 10,
        bottom: 30,
        left: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="x" name="" unit="">
        <Label value={props.labels.xLabel} offset={0} position="bottom" />
      </XAxis>
      <YAxis
        type="number"
        dataKey="y"
        name=""
        unit=""
        domain={[0, (dataMax: number) => Math.ceil(dataMax / 5) * 5]}
      >
        <Label
          value={props.labels.yLabel || '楼层'}
          angle={-90}
          offset={10}
          position="insideLeft"
        />
      </YAxis>
      <ZAxis type="number" range={[25]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend align="right" verticalAlign="top" iconSize={20} iconType="line" />
      {props.datas.map(function (data, i) {
        return (
          <Scatter
            key={i}
            name={props.describes[i].name}
            data={data}
            fill={props.describes[i].fill}
            line={{ strokeWidth: 2 }}
            shape={props.describes[i].shape}
          />
        );
      })}
    </ScatterChart> 
    {/* <a style={{ marginLeft: 145 }} onClick={() => downloadPNG()}>下载图片</a> */}
    </div>
  );

  return chart;
}
