import React from 'react';
import { downloadImg } from '@outreader/core';
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
import { Menu, Dropdown } from 'antd';

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
  const { data, yLabel } = props;

  const menu = (
    <Menu onClick={({ item, key }) => downloadImg(yLabel, key as string)}>
      <Menu.Item key="svg">下载 SVG</Menu.Item>
      <Menu.Item key="png">下载 PNG</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div id={yLabel} className="charts">
          <BarChart
            width={600}
            height={360}
            data={data}
            margin={{
              top: 10,
              right: 10,
              bottom: 30,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" name="" unit="">
              <Label value="" offset={10} position="bottom" />
            </XAxis>
            <YAxis>
              <Label
                value={yLabel}
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
      </Dropdown>
    </React.Fragment>
  );
}
