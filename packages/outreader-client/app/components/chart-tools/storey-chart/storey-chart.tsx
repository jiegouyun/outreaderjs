import React from 'react';
import { downloadImg } from '@outreader/core';
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
  LegendPayload,
} from 'recharts';
import { Menu, Dropdown } from 'antd';
import { IData, IDescribe } from '../../../interfaces';

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
  const { labels, describes, datas } = props;
  const customLegend: LegendPayload[] = describes.map((desc, i) => {
    return {
      id: i,
      value: desc.name,
      type: desc.shape,
      color: desc.fill,
    };
  });

  const menu = (
    <Menu
      onClick={({ item, key }) => downloadImg(labels.xLabel, key as string)}
    >
      <Menu.Item key="svg">下载 SVG</Menu.Item>
      <Menu.Item key="png">下载 PNG</Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div id={labels.xLabel} className="charts">
          <ScatterChart
            key={labels.xLabel}
            width={390}
            height={520}
            margin={{
              top: 10,
              right: 10,
              bottom: 30,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="" unit="">
              <Label value={labels.xLabel} offset={0} position="bottom" />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name=""
              unit=""
              domain={[0, (dataMax: number) => Math.ceil(dataMax / 5) * 5]}
            >
              <Label
                value={labels.yLabel || '楼层'}
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
              iconSize={8}
              payload={customLegend}
            />
            {datas.map((data, i) => {
              return (
                <Scatter
                  key={labels.xLabel + i}
                  name={describes[i].name}
                  data={data}
                  fill={describes[i].fill}
                  line={{ strokeWidth: 2 }}
                  shape={describes[i].shape}
                />
              );
            })}
          </ScatterChart>
        </div>
      </Dropdown>
    </React.Fragment>
  );
}
