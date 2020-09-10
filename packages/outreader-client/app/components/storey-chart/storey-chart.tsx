import React from 'react';
import { downloadSVG, downloadPNG } from '@outreader/core';
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
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
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
  return (
    <div>
      <ContextMenuTrigger id={`CM-${props.labels.xLabel}`}>
        <div id={props.labels.xLabel} className="charts">
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
            <Legend
              align="right"
              verticalAlign="top"
              iconSize={20}
              iconType="line"
            />
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
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={`CM-${props.labels.xLabel}`}>
        <MenuItem>
          <a onClick={() => downloadSVG(props.labels.xLabel)}>下载 SVG</a>
        </MenuItem>
        <MenuItem>
          <a onClick={() => downloadPNG(props.labels.xLabel)}>下载 PNG</a>
        </MenuItem>
        <MenuItem divider />
      </ContextMenu>
    </div>
  );
}
