import React from 'react';
import { downloadImg } from '@outreader/core';
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
import { Menu, Dropdown } from 'antd';

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
  const { data, xLabel } = props;

  const menu = (
    <Menu onClick={({ item, key }) => downloadImg(xLabel, key as string)}>
      <Menu.Item key="svg">下载 SVG</Menu.Item>
      <Menu.Item key="png">下载 PNG</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div id={xLabel} className="charts">
          <AreaChart
            layout="vertical"
            width={390}
            height={520}
            data={data}
            margin={{
              top: 10,
              right: 10,
              bottom: 30,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="" name="" unit="">
              <Label value={xLabel} offset={0} position="bottom" />
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
      </Dropdown>
    </React.Fragment>
  );
}
