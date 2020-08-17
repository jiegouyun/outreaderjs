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

export function StoreyChart(props: {
  // data1: { x: number; y: number }[];
  // data2: { x: number; y: number }[];
  xLabel: string;
  [data: string]: { x: number; y: number }[] | string;
}) {  
  const {xLabel, ...rests} = props;
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
        <Label value={props.xLabel} offset={0} position="bottom" />
      </XAxis>
      <YAxis
        type="number"
        dataKey="y"
        name=""
        unit=""
        domain={[0, (dataMax) => Math.ceil(dataMax / 5) * 5]}
      >
        <Label value="楼层" angle={-90} offset={10} position="insideLeft" />
      </YAxis>
      <ZAxis type="number" range={[25]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend align="right" verticalAlign="top" iconSize={20} iconType="line" />
      <Scatter
        name="X向"
        data={rests[`data${1}`]}
        fill="#8884d8"
        line={{ strokeWidth: 2 }}
        shape="cross"
      />
      <Scatter
        name="Y向"
        data={rests[`data${2}`]}
        fill="#82ca9d"
        line={{ strokeWidth: 2 }}
        shape="cicle"
      />
    </ScatterChart>
  );
}
