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
 * @description draw element chart by area chaer;
 * @param storeyID number, y axis data;
 * @param range number[], x axis data, min and max;
 * @param xLabel strind, x axis label.
 */
export function ElementChart(props: {
  data: {
    storeyID: number;
    range: number[];
  }[];
  xLabel: string;
}) {
  return (
    <div>
      <ContextMenuTrigger id={`CM-${props.xLabel}`}>
        <div id={props.xLabel} className="charts">
          <AreaChart
            layout="vertical"
            width={390}
            height={520}
            data={props.data}
            margin={{
              top: 10,
              right: 10,
              bottom: 30,
              left: 10,
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
              name="分布区间"
              dataKey="range"
              stroke="#8884d8"
              fill="#8884d8"
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
