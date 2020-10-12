import { Table, Collapse, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
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
  LegendPayload,
} from 'recharts';
import { IPeriodFE } from '@outreader/core';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

export function PeriodComponent(period: IPeriodFE) {
  const modeColumns: ColumnsType<Object> = [
    {
      title: '振型',
      dataIndex: 'modeID',
      align: 'right',
    },
    {
      title: '周期',
      dataIndex: 'period',
      align: 'right',
    },
    {
      title: '转角',
      dataIndex: 'angle',
      align: 'right',
    },
    {
      title: '平动系数X',
      dataIndex: 'factorX',
      align: 'right',
    },
    {
      title: '平动系数Y',
      dataIndex: 'factorY',
      align: 'right',
    },
    {
      title: '扭转系数Z',
      dataIndex: 'factorZ',
      align: 'right',
    },
  ];
  const periodModeTableData = [];
  for (let i = 0; i < period.modeCoupling.modeID.length; i++) {
    periodModeTableData.push({
      key: i,
      modeID: period.modeCoupling.modeID[i],
      period: period.modeCoupling.period[i].toFixed(3),
      angle: period.modeCoupling.angle[i].toFixed(0),
      factorX: period.modeCoupling.factorX[i].toFixed(2),
      factorY: period.modeCoupling.factorY[i].toFixed(2),
      factorZ: period.modeCoupling.factorZ[i].toFixed(2),
    });
  }

  const periodSeismicTableData = [];
  for (let i = 0; i < period.modeSeismic.modeID.length; i++) {
    periodSeismicTableData.push({
      key: i,
      modeID: period.modeSeismic.modeID[i],
      period: period.modeSeismic.period[i].toFixed(3),
      angle: period.modeSeismic.angle[i].toFixed(0),
      factorX: period.modeSeismic.factorX[i].toFixed(2),
      factorY: period.modeSeismic.factorY[i].toFixed(2),
      factorZ: period.modeSeismic.factorZ[i].toFixed(2),
    });
  }

  const periodMassColumns: ColumnsType<Object> = [
    {
      title: '振型',
      dataIndex: 'modeID',
      align: 'right',
    },
    {
      title: 'X',
      dataIndex: 'factorX',
      align: 'right',
    },
    {
      title: '累计X',
      dataIndex: 'sumX',
      align: 'right',
    },
    {
      title: 'Y',
      dataIndex: 'factorY',
      align: 'right',
    },
    {
      title: '累计Y',
      dataIndex: 'sumY',
      align: 'right',
    },
    {
      title: 'Z',
      dataIndex: 'factorZ',
      align: 'right',
    },
    {
      title: '累计Z',
      dataIndex: 'sumZ',
      align: 'right',
    },
  ];

  const periodMassTableData = [];
  const modeMassX = [];
  const modeMassY = [];
  const modeMassZ = [];
  let sumX: number = 0;
  let sumY: number = 0;
  let sumZ: number = 0;
  for (let i = 0; i < period.modeMass.modeID.length; i++) {
    sumX += period.modeMass.factorX[i];
    sumY += period.modeMass.factorY[i];
    sumZ += period.modeMass.factorZ[i];
    periodMassTableData.push({
      key: i,
      modeID: period.modeMass.modeID[i],
      factorX: period.modeMass.factorX[i].toFixed(2),
      sumX: sumX.toFixed(2),
      factorY: period.modeMass.factorY[i].toFixed(2),
      sumY: sumY.toFixed(2),
      factorZ: period.modeMass.factorZ[i].toFixed(2),
      sumZ: sumZ.toFixed(2),
    });
    modeMassX.push({
      x: period.modeMass.modeID[i],
      y: sumX.toFixed(2),
    });
    modeMassY.push({
      x: period.modeMass.modeID[i],
      y: sumY.toFixed(2),
    });
    modeMassZ.push({
      x: period.modeMass.modeID[i],
      y: sumZ.toFixed(2),
    });
  }

  const customLegend: LegendPayload[] = [
    {
      id: 1,
      value: `X: ${period.modeMass.sumX.toFixed(2)}`,
      type: 'cross',
      color: '#0099CC',
    },
    {
      id: 2,
      value: `Y: ${period.modeMass.sumY.toFixed(2)}`,
      type: 'circle',
      color: '#99CCCC',
    },
    {
      id: 3,
      value: `Z: ${period.modeMass.sumZ.toFixed(2)}`,
      type: 'diamond',
      color: '#FFCC99',
    },
  ];

  const { Panel } = Collapse;
  const Period = (
    <div>
      <h3>考虑扭转耦联时的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodModeTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
          />
        </Panel>
      </Collapse>
      <h3>地震最大作用方向的动力特性</h3>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={modeColumns}
            dataSource={periodSeismicTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <ContextMenuTrigger id="CM-质量参与系数">
        <Row justify="space-around">
          <div id="质量参与系数" className="charts">
            <ScatterChart
              width={600}
              height={360}
              margin={{
                top: 10,
                right: 10,
                bottom: 30,
                left: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name=""
                unit=""
                domain={[0, (dataMax) => Math.ceil(dataMax / 5) * 5]}
              >
                <Label value="振型" offset={0} position="bottom" />
              </XAxis>
              <YAxis type="number" dataKey="y" name="" unit="">
                <Label
                  value="质量参与系数"
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
              <Scatter
                name={'X: ' + period.modeMass.sumX.toFixed(2)}
                data={modeMassX}
                fill="#8884D8"
                line={{ strokeWidth: 2 }}
                shape="cross"
              />
              <Scatter
                name={'Y: ' + period.modeMass.sumY.toFixed(2)}
                data={modeMassY}
                fill="#82CA9D"
                line={{ strokeWidth: 2 }}
                shape="circle"
              />
              <Scatter
                name={'Z: ' + period.modeMass.sumZ.toFixed(2)}
                data={modeMassZ}
                fill="#FFCC99"
                line={{ strokeWidth: 2 }}
                shape="diamond"
              />
            </ScatterChart>
          </div>
        </Row>
      </ContextMenuTrigger>
      <ContextMenu id="CM-质量参与系数">
        <MenuItem>
          <a onClick={() => downloadSVG('质量参与系数')}>下载 SVG</a>
        </MenuItem>
        <MenuItem>
          <a onClick={() => downloadPNG('质量参与系数')}>下载 PNG</a>
        </MenuItem>
        <MenuItem divider />
      </ContextMenu>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={periodMassColumns}
            dataSource={periodMassTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
            scroll={{ y: 'calc(100vh - 12.5rem)' }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Period;
}
