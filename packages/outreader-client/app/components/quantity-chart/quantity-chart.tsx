import React from 'react';
import { downloadSVG, downloadPNG } from '@outreader/core';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

/**
 * @description draw quantity chart by area chaer;
 * @param storeyID number, y axis data;
 * @param wall number, x axis wall data;
 * @param column number, x axis column data;
 * @param beam number, x axis beam data;
 * @param floor number, x axis floor data;
 * @param xLabel strind, x axis label.
 */
export function QuantityChart(props: {
  data: {
    storeyID: number;
    wall: number;
    column: number;
    beam: number;
    floor: number;
  }[];
  xLabel: string;
}) {
  return (
    <div>
      <ContextMenuTrigger id={`CM-${props.xLabel}`}>
        <div id={props.xLabel} className="charts">
          <AreaChart
            layout="vertical"
            width={300}
            height={400}
            data={props.data}
            margin={{
              top: 10,
              right: 10,
              bottom: 30,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="" name="" unit="">
              <Label value={props.xLabel} offset={0} position="bottom" />
            </XAxis>
            <YAxis
              type="number"
              dataKey="storeyID"
              name=""
              unit=""
              domain={[0, (dataMax) => Math.ceil(dataMax / 5) * 5]}
              reversed
            >
              <Label
                value="楼层"
                angle={-90}
                offset={10}
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
            <Area
              type="monotone"
              name="墙"
              dataKey="wall"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              name="柱"
              dataKey="column"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              name="梁"
              dataKey="beam"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
            <Area
              type="monotone"
              name="板"
              dataKey="floor"
              stackId="1"
              stroke="#FF8042"
              fill="#FF8042"
            />
          </AreaChart>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id={`CM-${props.xLabel}`}>
        <MenuItem>
          <a onClick={() => downloadSVG(props.xLabel)}>下载 SVG</a>
        </MenuItem>
        <MenuItem>
          <a onClick={() => downloadPNG(props.xLabel)}>下载 PNG</a>
        </MenuItem>
        <MenuItem divider />
      </ContextMenu>
    </div>
  );
}
