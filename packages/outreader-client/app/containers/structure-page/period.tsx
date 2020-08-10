import { Descriptions, Table } from 'antd';
import React from 'react';
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
      modeID: period.modeCoupling.modeID[i],
      period: period.modeCoupling.period[i],
      angle: period.modeCoupling.angle[i],
      factorX: period.modeCoupling.factorX[i],
      factorY: period.modeCoupling.factorY[i],
      factorZ: period.modeCoupling.factorZ[i],
    });
  }

  const periodSeismicTableData = [];
  for (let i = 0; i < period.modeSeismic.modeID.length; i++) {
    periodSeismicTableData.push({
      modeID: period.modeSeismic.modeID[i],
      period: period.modeSeismic.period[i],
      angle: period.modeSeismic.angle[i],
      factorX: period.modeSeismic.factorX[i],
      factorY: period.modeSeismic.factorY[i],
      factorZ: period.modeSeismic.factorZ[i],
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
  for (let i = 0; i < period.modeMass.modeID.length; i++) {
    periodMassTableData.push({
      modeID: period.modeMass.modeID[i],
      factorX: period.modeMass.factorX[i],
      factorY: period.modeMass.factorY[i],
      factorZ: period.modeMass.factorZ[i],
    });
  }

  const Period = (
    <div>
      <Descriptions title="考虑扭转耦联时的动力特性"></Descriptions>
      <Table
        columns={modeColumns}
        dataSource={periodModeTableData}
        bordered
        pagination={{ pageSize: 30 }}
        scroll={{ y: 240 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="地震最大作用方向的动力特性"></Descriptions>
      <Table
        columns={modeColumns}
        dataSource={periodSeismicTableData}
        bordered
        pagination={{ pageSize: 30 }}
        scroll={{ y: 240 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="质量参与系数"></Descriptions>
      <Table
        columns={periodMassColumns}
        dataSource={periodMassTableData}
        bordered
        pagination={{ pageSize: 30 }}
        scroll={{ y: 240 }}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Period;
}
