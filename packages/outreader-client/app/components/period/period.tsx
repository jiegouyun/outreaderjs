import { Descriptions, Table, Collapse } from 'antd';
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
import { IPeriodFE } from '@outreader/core';

export function PeriodComponent(period: IPeriodFE) {
  const modeColumns = [
    {
      title: '振型',
      dataIndex: 'modeID',
    },
    {
      title: '周期',
      dataIndex: 'period',
    },
    {
      title: '转角',
      dataIndex: 'angle',
    },
    {
      title: '平动系数X',
      dataIndex: 'factorX',
    },
    {
      title: '平动系数Y',
      dataIndex: 'factorY',
    },
    {
      title: '扭转系数Z',
      dataIndex: 'factorZ',
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

  const periodMassColumns = [
    {
      title: '振型',
      dataIndex: 'modeID',
    },
    {
      title: 'X',
      dataIndex: 'factorX',
    },
    {
      title: 'Y',
      dataIndex: 'factorY',
    },
    {
      title: 'Z',
      dataIndex: 'factorZ',
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
    periodMassTableData.push({
      key: i,
      modeID: period.modeMass.modeID[i],
      factorX: period.modeMass.factorX[i].toFixed(2),
      factorY: period.modeMass.factorY[i].toFixed(2),
      factorZ: period.modeMass.factorZ[i].toFixed(2),
    });
    sumX += period.modeMass.factorX[i];
    sumY += period.modeMass.factorY[i];
    sumZ += period.modeMass.factorZ[i];
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
          />
        </Panel>
      </Collapse>
      <h3>质量参与系数</h3>
      <ScatterChart
        width={550}
        height={350}
        margin={{
          top: 10,
          right: 10,
          bottom: 30,
          left: 0,
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
          iconSize={20}
          iconType="line"
        />
        <Scatter
          name={'X: ' + period.modeMass.sumX.toFixed(2)}
          data={modeMassX}
          fill="#0099CC"
          line={{ strokeWidth: 2 }}
          shape="cross"
        />
        <Scatter
          name={'Y: ' + period.modeMass.sumY.toFixed(2)}
          data={modeMassY}
          fill="#CCCCFF"
          line={{ strokeWidth: 2 }}
          shape="circle"
        />
        <Scatter
          name={'Z: ' + period.modeMass.sumZ.toFixed(2)}
          data={modeMassZ}
          fill="#99CCCC"
          line={{ strokeWidth: 2 }}
          shape="diamond"
        />
      </ScatterChart>
      <Collapse ghost>
        <Panel header="详细数据" key="1">
          <Table
            columns={periodMassColumns}
            dataSource={periodMassTableData}
            bordered
            size="small"
            pagination={false}
            style={{ marginBottom: 20 }}
          />
        </Panel>
      </Collapse>
    </div>
  );

  return Period;
}
