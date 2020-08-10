import { Descriptions, Table } from 'antd';
import React from 'react';
import { IFactorFE } from '@outreader/core';

export function FactorComponent(factor: IFactorFE) {
  const WeakColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: '放大系数',
      dataIndex: 'factor',
    },
  ];

  const weakTableData = [];
  for (let i = 0; i < factor.stiffness.storeyID.length; i++) {
    weakTableData.push({
      storeyID: factor.stiffness.storeyID[i],
      towerID: factor.stiffness.towerID[i],
      factor: factor.stiffness.weakStoreyFactor[i],
    });
  }

  const factorColumns = [
    {
      title: '层号',
      dataIndex: 'storeyID',
    },
    {
      title: '塔号',
      dataIndex: 'towerID',
    },
    {
      title: 'X向',
      dataIndex: 'factorX',
    },
    {
      title: 'Y向',
      dataIndex: 'factorY',
    },
  ];

  const shearTableData = [];
  for (let i = 0; i < factor.shearWeightRatioModify.storeyID.length; i++) {
    shearTableData.push({
      storeyID: factor.shearWeightRatioModify.storeyID[i],
      towerID: factor.shearWeightRatioModify.towerID[i],
      factorX: factor.shearWeightRatioModify.factorX[i],
      factorY: factor.shearWeightRatioModify.factorY[i],
    });
  }

  const v02qTableData = [];
  for (let i = 0; i < factor.v02qFactor.storeyID.length; i++) {
    v02qTableData.push({
      storeyID: factor.v02qFactor.storeyID[i],
      towerID: factor.v02qFactor.towerID[i],
      factorX: factor.v02qFactor.factorX[i],
      factorY: factor.v02qFactor.factorY[i],
    });
  }

  const Factor = (
    <div>
      <Descriptions title="薄弱层剪力放大系数"></Descriptions>
      <Table
        columns={WeakColumns}
        dataSource={weakTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="剪重比调整系数"></Descriptions>
      <Table
        columns={factorColumns}
        dataSource={shearTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
      <Descriptions title="0.2V0调整系数"></Descriptions>
      <Table
        columns={factorColumns}
        dataSource={v02qTableData}
        bordered
        pagination={{ pageSize: 50 }}
        scroll={{ y: 480 }}
        style={{ marginBottom: 20 }}
      />
    </div>
  );

  return Factor;
}
