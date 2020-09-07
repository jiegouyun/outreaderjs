import React from 'react';
import { downloadIMG } from '../download-image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';

/**
 * @description draw quantity chart by bar chaer;
 * @param model number, x axis data;
 * @param wall number, y axis wall data;
 * @param column number, y axis column data;
 * @param beam number, y axis beam data;
 * @param floor number, y axis floor data;
 * @param yLabel strind, y axis label.
 */
export function CompareQuantityChart(props: {
  data: {
    model: string;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[];
  yLabel: string;
}) {
  return (
    <div>
      <div id={props.yLabel}>
        <BarChart
          width={550}
          height={350}
          data={props.data}
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="model" name="" unit="">
            <Label value="" offset={10} position="bottom" />
          </XAxis>
          <YAxis>
            <Label
              value={props.yLabel}
              angle={-90}
              offset={0}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend
            align="right"
            verticalAlign="top"
            iconSize={20}
            iconType="line"
          />
          <Bar
            name="墙"
            dataKey="wall"
            stackId="1"
            stroke="#0099CC"
            fill="#0099CC"
          />
          <Bar
            name="柱"
            dataKey="column"
            stackId="1"
            stroke="#CCCCFF"
            fill="#CCCCFF"
          />
          <Bar
            name="梁"
            dataKey="beam"
            stackId="1"
            stroke="#99CCCC"
            fill="#99CCCC"
          />
          <Bar
            name="板"
            dataKey="floor"
            stackId="1"
            stroke="#FFCC99"
            fill="#FFCC99"
          />
        </BarChart>
      </div>
      <a style={{ marginLeft: 275 }} onClick={() => downloadIMG(props.yLabel)}>
        下载图片
      </a>
    </div>
  );
}
