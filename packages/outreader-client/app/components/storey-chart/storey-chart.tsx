import React from 'react';
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

interface ILabel {
  xLabel: string;
  yLabel?: string;
}

interface IDescribe {
  name: string;
  fill: string;
  shape:
    | 'circle'
    | 'cross'
    | 'diamond'
    | 'square'
    | 'star'
    | 'triangle'
    | 'wye';
}
interface IData {
  x: number;
  y: number;
}

export function StoreyChart(props: {
  labels: ILabel;
  describe: IDescribe[];
  datas: IData[][];
}) {
  return (
    <ScatterChart
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
            name={props.describe[i].name}
            data={data}
            fill={props.describe[i].fill}
            line={{ strokeWidth: 2 }}
            shape={props.describe[i].shape}
          />
        );
      })}
    </ScatterChart>
  );
}
