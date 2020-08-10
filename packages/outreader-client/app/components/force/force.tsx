import { Descriptions, Table } from 'antd';
import React from 'react';
import { IForceFE } from '@outreader/core';

export function ForceComponent(force: IForceFE) {
  const forceColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '外力X',
      dataIndex: 'forceX',
    },
    {
      title: '剪力X',
      dataIndex: 'shearX',
    },
    {
      title: '弯矩X',
      dataIndex: 'momentX',
    },
    {
      title: '外力Y',
      dataIndex: 'forceY',
    },
    {
      title: '剪力Y',
      dataIndex: 'shearY',
    },
    {
      title: '弯矩Y',
      dataIndex: 'momentY',
    },
  ];

  const forceAlongWindTableData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceAlongWindTableData.push({
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceAlongX[i],
      shearX: force.wind.shearAlongX[i],
      momentX: force.wind.momentAlongX[i],
      forceY: force.wind.forceAlongY[i],
      shearY: force.wind.shearAlongY[i],
      momentY: force.wind.momentAlongY[i],
    });
  }

  const forceCrossWindTableData = [];
  for (let i = 0; i < force.wind.storeyID.length; i++) {
    forceCrossWindTableData.push({
      storeyID: force.wind.storeyID[i],
      towerID: force.wind.towerID[i],
      forceX: force.wind.forceCrossX[i],
      shearX: force.wind.shearCrossX[i],
      momentX: force.wind.momentCrossX[i],
      forceY: force.wind.forceCrossY[i],
      shearY: force.wind.shearCrossY[i],
      momentY: force.wind.momentCrossY[i],
    });
  }

  const forceSeismicTableData = [];
  for (let i = 0; i < force.seismic.storeyID.length; i++) {
    forceSeismicTableData.push({
      storeyID: force.seismic.storeyID[i],
      towerID: force.seismic.towerID[i],
      forceX: force.seismic.forceX[i],
      shearX: force.seismic.shearX[i],
      momentX: force.seismic.momentX[i],
      forceY: force.seismic.forceY[i],
      shearY: force.seismic.shearY[i],
      momentY: force.seismic.momentY[i],
    });
  }

  const Force = (
    <div>
      <Descriptions title="顺风向风荷载"></Descriptions>
      <Table
        columns={forceColumns}
        dataSource={forceAlongWindTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="横风向风荷载"></Descriptions>
      <Table
        columns={forceColumns}
        dataSource={forceCrossWindTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="地震作用"></Descriptions>
      <Table
        columns={forceColumns}
        dataSource={forceSeismicTableData}
        bordered
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Force;
}
